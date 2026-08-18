import { Router } from "express";
import { query, pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

function isStaffRole(role) {
  return role === "admin" || role === "manager";
}

// Map a joined DB row to the shape the frontend expects.
function shapeTask(r) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    priority: r.priority,
    status: r.status,
    due: r.due_date,                 // "YYYY-MM-DD" (dateStrings)
    assignee: r.assignee_name || "Unassigned",
    assigneeId: r.assignee_id ?? null,
    projectId: r.project_id ?? null,
  };
}

const SELECT_TASK = `
  SELECT t.*, u.name AS assignee_name
  FROM tasks t
  LEFT JOIN users u ON u.id = t.assignee_id
`;

// GET /api/tasks
//  - admin/manager: all tasks
//  - member: only tasks assigned to them
router.get("/", async (req, res) => {
  const isStaff = isStaffRole(req.user.access_role);
  const rows = isStaff
    ? await query(`${SELECT_TASK} ORDER BY t.created_at DESC`)
    : await query(`${SELECT_TASK} WHERE t.assignee_id = ? ORDER BY t.created_at DESC`, [req.user.id]);
  res.json(rows.map(shapeTask));
});

// POST /api/tasks
//  - admin/manager: may assign to anyone (including themselves)
//  - member: task is force-assigned to themselves (can't assign to others)
router.post("/", async (req, res) => {
  const isStaff = isStaffRole(req.user.access_role);
  const { title, category, priority, status, due, projectId } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "title is required" });

  let assigneeId = req.user.id;
  if (isStaff && req.body.assigneeId) assigneeId = req.body.assigneeId;

  const [result] = await pool.execute(
    `INSERT INTO tasks (title, category, priority, status, due_date, project_id, assignee_id, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title.trim(),
      category || "General",
      priority || "MEDIUM",
      status || "TODO",
      due || null,
      projectId || null,
      assigneeId,
      req.user.id,
    ]
  );
  console.log("Task Insert Result:",{ insertId: result.insertId, affectedRows: result.affectedRows, assigneeId, title: title.trim() });
  const rows = await query(`${SELECT_TASK} WHERE t.id = ?`, [result.insertId]);
  res.status(201).json(shapeTask(rows[0]));
});

// Helper: load a task and enforce edit permission (admin/manager OR the assignee).
async function loadEditableTask(req, res) {
  const rows = await query("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
  if (rows.length === 0) {
    res.status(404).json({ error: "Task not found" });
    return null;
  }
  const task = rows[0];
  const isStaff = isStaffRole(req.user.access_role);
  if (!isStaff && task.assignee_id !== req.user.id) {
    res.status(403).json({ error: "You can only modify tasks assigned to you" });
    return null;
  }
  return task;
}

// PATCH /api/tasks/:id  (edit fields; only admin/manager may reassign)
router.patch("/:id", async (req, res) => {
  const task = await loadEditableTask(req, res);
  if (!task) return;
  const isStaff = isStaffRole(req.user.access_role);

  const next = {
    title: req.body.title ?? task.title,
    category: req.body.category ?? task.category,
    priority: req.body.priority ?? task.priority,
    status: req.body.status ?? task.status,
    due_date: req.body.due ?? task.due_date,
    // Only admins/managers can change the assignee.
    assignee_id: isStaff && req.body.assigneeId !== undefined
      ? req.body.assigneeId
      : task.assignee_id,
  };

  await pool.execute(
    `UPDATE tasks SET title=?, category=?, priority=?, status=?, due_date=?, assignee_id=? WHERE id=?`,
    [next.title, next.category, next.priority, next.status, next.due_date, next.assignee_id, task.id]
  );
  const rows = await query(`${SELECT_TASK} WHERE t.id = ?`, [task.id]);
  res.json(shapeTask(rows[0]));
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  const task = await loadEditableTask(req, res);
  if (!task) return;
  await pool.execute("DELETE FROM tasks WHERE id = ?", [task.id]);
  res.json({ ok: true });
});

export default router;