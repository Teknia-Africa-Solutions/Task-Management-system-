import { verifyToken } from "../utils/auth.js";
import { query } from "../db.js";

// Pulls the Bearer token, verifies it, loads the user, attaches req.user.
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = verifyToken(token);
    const rows = await query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [payload.sub]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "User no longer exists" });
    }
    req.user = rows[0]; // full row (includes access_role, supervisor_id, etc.)
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Gate for admin-only endpoints. Enforced on the SERVER, not just hidden in UI.
export function requireAdmin(req, res, next) {
  if (req.user?.access_role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

// Gate for admin+manager endpoints (project managers need to see the roster
// to assign tasks, but shouldn't get full admin powers).
export function requireStaff(req, res, next) {
  if (!["admin", "manager"].includes(req.user?.access_role)) {
    return res.status(403).json({ error: "Admin or manager access required" });
  }
  next();
}