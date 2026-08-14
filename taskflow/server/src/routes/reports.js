import { Router } from "express";
import { query, pool } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// Monday (ISO week start) for a given "YYYY-MM-DD" date, as "YYYY-MM-DD".
function mondayOf(dateStr) {
  const d = dateStr ? new Date(dateStr + "T00:00:00") : new Date();
  const day = (d.getDay() + 6) % 7; // 0 = Monday
  d.setDate(d.getDate() - day);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function shapeReport(r) {
  return {
    id: r.id,
    userId: r.user_id,
    userName: r.user_name,
    projectId: r.project_id,
    weekStart: r.week_start,
    summary: r.summary,
    blockers: r.blockers,
    hoursLogged: Number(r.hours_logged),
    createdAt: r.created_at,
  };
}

const SELECT_REPORT = `
  SELECT r.*, u.name AS user_name
  FROM weekly_reports r JOIN users u ON u.id = r.user_id
`;

// GET /api/reports/mine
router.get("/mine", async (req, res) => {
  const rows = await query(
    `${SELECT_REPORT} WHERE r.user_id = ? ORDER BY r.week_start DESC`,
    [req.user.id]
  );
  res.json(rows.map(shapeReport));
});

// GET /api/reports/week-hours?weekStart=YYYY-MM-DD
// Sum of clocked minutes in that week (to pre-fill the report's hours).
router.get("/week-hours", async (req, res) => {
  const ws = mondayOf(req.query.weekStart);
  const [{ minutes }] = await query(
    `SELECT COALESCE(SUM(duration_minutes),0) AS minutes
     FROM time_logs
     WHERE user_id = ? AND work_date >= ? AND work_date < DATE_ADD(?, INTERVAL 7 DAY)`,
    [req.user.id, ws, ws]
  );
  res.json({ weekStart: ws, hours: Math.round((Number(minutes) / 60) * 10) / 10 });
});

// POST /api/reports  { weekStart?, summary, blockers?, hoursLogged?, projectId? }
// Upsert: one report per member per week.
router.post("/", async (req, res) => {
  const { summary, blockers, hoursLogged, projectId } = req.body || {};
  if (!summary || !summary.trim()) {
    return res.status(400).json({ error: "summary is required" });
  }
  const ws = mondayOf(req.body?.weekStart);
  await pool.execute(
    `INSERT INTO weekly_reports (user_id, project_id, week_start, summary, blockers, hours_logged)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       summary = VALUES(summary),
       blockers = VALUES(blockers),
       hours_logged = VALUES(hours_logged),
       project_id = VALUES(project_id)`,
    [req.user.id, projectId || null, ws, summary.trim(), blockers || null, Number(hoursLogged) || 0]
  );
  const rows = await query(`${SELECT_REPORT} WHERE r.user_id = ? AND r.week_start = ?`, [
    req.user.id,
    ws,
  ]);
  res.status(201).json(shapeReport(rows[0]));
});

// GET /api/reports/all  (admin) -> every member's weekly reports
router.get("/all", requireAdmin, async (_req, res) => {
  const rows = await query(`${SELECT_REPORT} ORDER BY r.week_start DESC, u.name`);
  res.json(rows.map(shapeReport));
});

// GET /api/reports/stats -> aggregate numbers + weekly hours trend for charts
router.get("/stats", async (req, res) => {
  const isAdmin = req.user.access_role === "admin";

  // Completion rate over tasks (scoped for members to their own tasks).
  const taskWhere = isAdmin ? "" : "WHERE assignee_id = ?";
  const taskParams = isAdmin ? [] : [req.user.id];
  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM tasks ${taskWhere}`, taskParams);
  const [{ done }] = await query(
    `SELECT COUNT(*) AS done FROM tasks ${taskWhere ? taskWhere + " AND" : "WHERE"} status='DONE'`,
    taskParams
  );
  const completionRate = Number(total) ? Math.round((Number(done) / Number(total)) * 100) : 0;

  // Average clocked session length (hours), and weekly hours trend (last 12 weeks).
  const trendWhere = isAdmin ? "" : "AND user_id = ?";
  const trendParams = isAdmin ? [] : [req.user.id];
  const trendRows = await query(
    `SELECT YEARWEEK(work_date, 3) AS yw,
            MIN(work_date) AS week_start,
            ROUND(COALESCE(SUM(duration_minutes),0)/60, 1) AS hours,
            COUNT(*) AS sessions
     FROM time_logs
     WHERE duration_minutes IS NOT NULL ${trendWhere}
     GROUP BY yw ORDER BY yw DESC LIMIT 12`,
    trendParams
  );
  const trend = trendRows.reverse().map((r) => ({
    week: r.week_start,
    hours: Number(r.hours),
    sessions: Number(r.sessions),
  }));

  const [{ avgMin }] = await query(
    `SELECT ROUND(AVG(duration_minutes),0) AS avgMin FROM time_logs
     WHERE duration_minutes IS NOT NULL ${trendWhere}`,
    trendParams
  );

  res.json({
    completionRate,
    totalTasks: Number(total),
    doneTasks: Number(done),
    avgSessionHours: avgMin ? Math.round((Number(avgMin) / 60) * 10) / 10 : 0,
    trend,
  });
});

export default router;
