import { Router } from "express";
import { query, pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

function shapeEvent(r) {
  return { id: r.id, date: r.event_date, title: r.title, color: r.color };
}

// GET /api/calendar
router.get("/", async (_req, res) => {
  const rows = await query("SELECT * FROM calendar_events ORDER BY event_date");
  res.json(rows.map(shapeEvent));
});

// POST /api/calendar
router.post("/", async (req, res) => {
  const { date, title, color } = req.body || {};
  if (!date || !title) return res.status(400).json({ error: "date and title are required" });
  const [result] = await pool.execute(
    "INSERT INTO calendar_events (event_date, title, color, created_by) VALUES (?, ?, ?, ?)",
    [date, title, color || "rust", req.user.id]
  );
  const rows = await query("SELECT * FROM calendar_events WHERE id = ?", [result.insertId]);
  res.status(201).json(shapeEvent(rows[0]));
});

// DELETE /api/calendar/:id
router.delete("/:id", async (req, res) => {
  await pool.execute("DELETE FROM calendar_events WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

export default router;
