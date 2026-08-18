import { Router } from "express";
import { query, pool } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

function shapeProject(r) {
  return {
    id: r.id,
    name: r.name,
    description: r.description,
    startDate: r.start_date,
    endDate: r.end_date,
    status: r.status,
    progress: r.progress,
    doneCount: r.done_count,
    totalCount: r.total_count,
    icon: r.icon,
    barColor: r.bar_color,
    buttonColor: r.button_color,
  };
}

// GET /api/projects
//  - admin: all projects
//  - member: only projects they belong to (via project_members)
router.get("/", async (req, res) => {
  const isAdmin = req.user.access_role === "admin";
  const rows = isAdmin
    ? await query("SELECT * FROM projects ORDER BY id")
    : await query(
        `SELECT p.* FROM projects p
         JOIN project_members pm ON pm.project_id = p.id
         WHERE pm.user_id = ? ORDER BY p.id`,
        [req.user.id]
      );
  res.json(rows.map(shapeProject));
});

// GET /api/projects/mine -> the member's primary project (name, timeline, duration)
// Used by the member dashboard. Falls back to the first project for admins.
router.get("/mine", async (req, res) => {
  const isAdmin = req.user.access_role === "admin";
  const rows = isAdmin
    ? await query("SELECT * FROM projects ORDER BY id LIMIT 1")
    : await query(
        `SELECT p.* FROM projects p
         JOIN project_members pm ON pm.project_id = p.id
         WHERE pm.user_id = ? ORDER BY p.id LIMIT 1`,
        [req.user.id]
      );
  res.json(rows[0] ? shapeProject(rows[0]) : null);
});

// POST /api/projects  (admin only)
router.post("/", requireAdmin, async (req, res) => {
  const { name, description, startDate, endDate, status, progress, icon, barColor, buttonColor } =
    req.body || {};
  if (!name) return res.status(400).json({ error: "name is required" });
  const [result] = await pool.execute(
    `INSERT INTO projects (name, description, start_date, end_date, status, progress, icon, bar_color, button_color, owner_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      description || null,
      startDate || null,
      endDate || null,
      status || "Active",
      progress || 0,
      icon || "folder",
      barColor || "bg-rust-500",
      buttonColor || "bg-rust-500 hover:bg-rust-600",
      req.user.id,
    ]
  );
  const rows = await query("SELECT * FROM projects WHERE id = ?", [result.insertId]);
  res.status(201).json(shapeProject(rows[0]));
});

export default router;
