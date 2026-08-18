import { pool, query } from "../db.js";

// Create a notification. userId=null => global broadcast to everyone.
export async function createNotification({ userId = null, type = "info", title, description = null }) {
  const [result] = await pool.execute(
    "INSERT INTO notifications (user_id, type, title, description) VALUES (?, ?, ?, ?)",
    [userId, type, title, description]
  );
  const rows = await query("SELECT * FROM notifications WHERE id = ?", [result.insertId]);
  return rows[0];
}
