import { Router } from "express";
import { query, pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

function fmtTime(dt) {
  // dt is "YYYY-MM-DD HH:MM:SS" (dateStrings). Show "HH:MM AM/PM".
  const d = new Date(String(dt).replace(" ", "T"));
  return isNaN(d)
    ? ""
    : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// GET /api/messages/contacts
//  - member: just their supervisor (who they message for help/issues)
//  - admin: every member (so a supervisor can reply to anyone)
router.get("/contacts", async (req, res) => {
  const isAdmin = req.user.access_role === "admin";
  let rows;
  if (isAdmin) {
    rows = await query(
      "SELECT id, name, initials, color, status FROM users WHERE id <> ? ORDER BY name",
      [req.user.id]
    );
  } else if (req.user.supervisor_id) {
    rows = await query(
      "SELECT id, name, initials, color, status FROM users WHERE id = ?",
      [req.user.supervisor_id]
    );
  } else {
    rows = [];
  }
  res.json(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      initials: r.initials,
      color: r.color,
      online: r.status === "Active",
    }))
  );
});

// GET /api/messages/:userId  -> conversation between me and :userId
router.get("/:userId", async (req, res) => {
  const other = Number(req.params.userId);
  const rows = await query(
    `SELECT * FROM messages
     WHERE (sender_id = ? AND recipient_id = ?)
        OR (sender_id = ? AND recipient_id = ?)
     ORDER BY created_at ASC`,
    [req.user.id, other, other, req.user.id]
  );
  // Mark messages sent TO me as read.
  await pool.execute(
    "UPDATE messages SET read_at = NOW() WHERE recipient_id = ? AND sender_id = ? AND read_at IS NULL",
    [req.user.id, other]
  );
  res.json(
    rows.map((m) => ({
      id: m.id,
      from: m.sender_id === req.user.id ? "me" : "them",
      text: m.body,
      time: fmtTime(m.created_at),
    }))
  );
});

// POST /api/messages  { toUserId, body }
router.post("/", async (req, res) => {
  const { toUserId, body } = req.body || {};
  if (!toUserId || !body || !body.trim()) {
    return res.status(400).json({ error: "toUserId and body are required" });
  }
  const [result] = await pool.execute(
    "INSERT INTO messages (sender_id, recipient_id, body) VALUES (?, ?, ?)",
    [req.user.id, toUserId, body.trim()]
  );
  const rows = await query("SELECT * FROM messages WHERE id = ?", [result.insertId]);
  const m = rows[0];
  res.status(201).json({ id: m.id, from: "me", text: m.body, time: fmtTime(m.created_at) });
});

export default router;
