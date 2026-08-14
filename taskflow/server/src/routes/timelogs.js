import { Router } from "express";
import { query, pool } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { emitTimelogUpdate } from "../realtime.js";

const router = Router();
router.use(requireAuth);

// Local calendar date "YYYY-MM-DD" for "today".
function today() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function shapeLog(r) {
  return {
    id: r.id,
    userId: r.user_id,
    userName: r.user_name,
    initials: r.initials,
    color: r.color,
    date: r.work_date,
    clockInAt: r.clock_in_at,
    clockOutAt: r.clock_out_at,
    durationMinutes: r.duration_minutes,
    note: r.note,
    active: !!r.clock_in_at && !r.clock_out_at,
  };
}

const SELECT_LOG = `
  SELECT tl.*, u.name AS user_name, u.initials, u.color
  FROM time_logs tl JOIN users u ON u.id = tl.user_id
`;

// GET /api/timelogs/today  -> my clock-in state for today (or null)
router.get("/today", async (req, res) => {
  const rows = await query(`${SELECT_LOG} WHERE tl.user_id = ? AND tl.work_date = ?`, [
    req.user.id,
    today(),
  ]);
  res.json(rows[0] ? shapeLog(rows[0]) : null);
});

// GET /api/timelogs/mine  -> my recent logs
router.get("/mine", async (req, res) => {
  const rows = await query(
    `${SELECT_LOG} WHERE tl.user_id = ? ORDER BY tl.work_date DESC LIMIT 60`,
    [req.user.id]
  );
  res.json(rows.map(shapeLog));
});

// GET /api/timelogs/active  (admin) -> everyone currently clocked in (live monitor)
router.get("/active", requireAdmin, async (_req, res) => {
  const rows = await query(
    `${SELECT_LOG} WHERE tl.work_date = ? ORDER BY tl.clock_in_at DESC`,
    [today()]
  );
  res.json(rows.map(shapeLog));
});

// POST /api/timelogs/clock-in
// One clock-in per calendar day, enforced by UNIQUE(user_id, work_date).
router.post("/clock-in", async (req, res) => {
  const day = today();
  const existing = await query(
    "SELECT * FROM time_logs WHERE user_id = ? AND work_date = ?",
    [req.user.id, day]
  );
  if (existing.length > 0) {
    return res.status(409).json({
      error: "You already clocked in today. You can clock in again tomorrow.",
    });
  }
  const [result] = await pool.execute(
    "INSERT INTO time_logs (user_id, work_date, clock_in_at, note) VALUES (?, ?, NOW(), ?)",
    [req.user.id, day, req.body?.note || null]
  );
  const rows = await query(`${SELECT_LOG} WHERE tl.id = ?`, [result.insertId]);
  const log = shapeLog(rows[0]);
  emitTimelogUpdate({ event: "clock-in", log }); // live update for admin monitor
  res.status(201).json(log);
});

// POST /api/timelogs/clock-out  -> stop today's timer, record duration
router.post("/clock-out", async (req, res) => {
  const day = today();
  const rows = await query(
    "SELECT * FROM time_logs WHERE user_id = ? AND work_date = ?",
    [req.user.id, day]
  );
  const log = rows[0];
  if (!log) return res.status(400).json({ error: "You haven't clocked in today." });
  if (log.clock_out_at) return res.status(409).json({ error: "You already clocked out today." });

  await pool.execute(
    `UPDATE time_logs
     SET clock_out_at = NOW(),
         duration_minutes = TIMESTAMPDIFF(MINUTE, clock_in_at, NOW())
     WHERE id = ?`,
    [log.id]
  );
  const updated = await query(`${SELECT_LOG} WHERE tl.id = ?`, [log.id]);
  const shaped = shapeLog(updated[0]);
  emitTimelogUpdate({ event: "clock-out", log: shaped });
  res.json(shaped);
});

export default router;
