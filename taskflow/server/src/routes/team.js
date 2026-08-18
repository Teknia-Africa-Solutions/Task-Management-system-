import { Router } from "express";
import { query } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { toPublicUser } from "../utils/auth.js";

const router = Router();
router.use(requireAuth);

// GET /api/team  -> full roster. ADMIN ONLY.
// Members must not see other members, so this route is gated server-side.
router.get("/", requireAdmin, async (_req, res) => {
  const rows = await query("SELECT * FROM users ORDER BY id");
  res.json(rows.map(toPublicUser));
});

// GET /api/team/monitor  -> aggregate team-progress numbers. ADMIN ONLY.
router.get("/monitor", requireAdmin, async (_req, res) => {
  const members = await query("SELECT * FROM users");
  const totalCapacity = members.length
    ? Math.round(members.reduce((s, m) => s + m.capacity, 0) / members.length)
    : 0;

  // Active tasks + completed counts from the tasks table.
  const [{ activeTasks }] = await query(
    "SELECT COUNT(*) AS activeTasks FROM tasks WHERE status <> 'DONE'"
  );
  const [{ completed }] = await query(
    "SELECT COUNT(*) AS completed FROM tasks WHERE status = 'DONE'"
  );
  const denom = Number(activeTasks) + Number(completed);
  const completionRate = denom ? Math.round((completed / denom) * 100) : 0;

  // Per-member active-task counts, for the capacity breakdown bars.
  const perMember = await query(`
    SELECT u.id, u.name, u.initials, u.color, u.capacity,
           SUM(CASE WHEN t.status <> 'DONE' THEN 1 ELSE 0 END) AS active_tasks,
           SUM(CASE WHEN t.status =  'DONE' THEN 1 ELSE 0 END) AS completed
    FROM users u
    LEFT JOIN tasks t ON t.assignee_id = u.id
    GROUP BY u.id ORDER BY u.name
  `);

  res.json({
    avgCapacity: totalCapacity,
    activeTasks: Number(activeTasks),
    completionRate,
    members: perMember.map((m) => ({
      id: m.id,
      name: m.name,
      initials: m.initials,
      color: m.color,
      capacity: m.capacity,
      activeTasks: Number(m.active_tasks || 0),
      completed: Number(m.completed || 0),
    })),
  });
});

export default router;
