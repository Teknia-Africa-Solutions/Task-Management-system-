import { Router } from "express";
import { query, pool } from "../db.js";
import {
  hashPassword,
  verifyPassword,
  signToken,
  toPublicUser,
  initialsFor,
} from "../utils/auth.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/register
// Self-registration ALWAYS creates a 'member' (never an admin). Optionally
// the new member can pick a supervisor from the existing admins.
router.post("/register", async (req, res) => {
  const { name, email, password, jobTitle, supervisorId } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email and password are required" });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const existing = await query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
  if (existing.length > 0) {
    return res.status(409).json({ error: "An account with that email already exists" });
  }

  // If a supervisor was requested, make sure it's a real admin.
  let supId = null;
  if (supervisorId) {
    const sup = await query(
      "SELECT id FROM users WHERE id = ? AND access_role IN ('admin','manager') LIMIT 1",
      [supervisorId]
    );
    if (sup.length === 0) {
      return res.status(400).json({ error: "Selected supervisor is not valid" });
    }
    supId = sup[0].id;
  } else {
    // Default: assign the first admin as supervisor, if any exists.
    const firstAdmin = await query(
      "SELECT id FROM users WHERE access_role IN ('admin','manager') ORDER BY id LIMIT 1"
    );
    supId = firstAdmin[0]?.id ?? null;
  }

  const hash = await hashPassword(password);
  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password_hash, access_role, job_title, supervisor_id, initials)
     VALUES (?, ?, ?, 'member', ?, ?, ?)`,
    [name, email, hash, jobTitle || "Team Member", supId, initialsFor(name)]
  );

  const rows = await query("SELECT * FROM users WHERE id = ?", [result.insertId]);
  const user = rows[0];
  const token = signToken(user);
  res.status(201).json({ token, user: toPublicUser(user) });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const rows = await query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
  const user = rows[0];
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = signToken(user);
  res.json({ token, user: toPublicUser(user) });
});

// GET /api/auth/me  -> current user + their supervisor (for the member dashboard)
router.get("/me", requireAuth, async (req, res) => {
  const me = toPublicUser(req.user);
  let supervisor = null;
  if (req.user.supervisor_id) {
    const rows = await query("SELECT * FROM users WHERE id = ?", [req.user.supervisor_id]);
    supervisor = toPublicUser(rows[0]);
  }
  res.json({ user: me, supervisor });
});

// GET /api/auth/supervisors -> list of admins (used by the register form)
router.get("/supervisors", async (_req, res) => {
  const rows = await query(
    "SELECT id, name, job_title, initials, color FROM users WHERE access_role IN ('admin','manager') ORDER BY name"
  );
  res.json(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.job_title,
      initials: r.initials,
      color: r.color,
    }))
  );
});

export default router;
