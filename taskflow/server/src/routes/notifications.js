import { Router } from "express";
import { query, pool } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { createNotification } from "../utils/notify.js";
import { emitNotification } from "../realtime.js";

const router = Router();
router.use(requireAuth);

function shape(r) {
  return {
    id: r.id,
    type: r.type,
    title: r.title,
    description: r.description,
    scope: r.user_id ? "personal" : "global",
  };
}

// GET /api/notifications
// Returns notifications that are global (user_id NULL) OR targeted at me,
// and not yet dismissed (read_at IS NULL).
router.get("/", async (req, res) => {
  const rows = await query(
    `SELECT * FROM notifications
     WHERE (user_id IS NULL OR user_id = ?) AND read_at IS NULL
     ORDER BY created_at DESC`,
    [req.user.id]
  );
  res.json(rows.map(shape));
});

// POST /api/notifications  (admin only)
//  { type, title, description, userId? }  -> userId omitted = global
router.post("/", requireAdmin, async (req, res) => {
  const { type, title, description, userId } = req.body || {};
  if (!title) return res.status(400).json({ error: "title is required" });
  const row = await createNotification({
    userId: userId ?? null,
    type: type || "info",
    title,
    description: description ?? null,
  });
  // Push it live: to the targeted user's room, or broadcast if global.
  emitNotification({ ...shape(row), userId: row.user_id });
  res.status(201).json(shape(row));
});

// DELETE /api/notifications/:id  -> dismiss (soft: sets read_at)
router.delete("/:id", async (req, res) => {
  await pool.execute("UPDATE notifications SET read_at = NOW() WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

export default router;
