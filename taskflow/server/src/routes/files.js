import { Router } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import { query, pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^\w.\-]+/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50 MB

function guessType(filename) {
  const ext = String(filename).split(".").pop().toLowerCase();
  if (ext === "sql") return "sql";
  if (["xlsx", "xls", "csv"].includes(ext)) return "xlsx";
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) return "image";
  return "pdf";
}

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function shapeFile(r) {
  return {
    id: r.id,
    kind: r.kind,
    name: r.name,
    url: r.url,
    size: r.size_label,
    uploadedBy: r.uploader_name || "Unknown",
    type: r.file_type,
  };
}

const SELECT_FILE = `
  SELECT f.*, u.name AS uploader_name
  FROM files f LEFT JOIN users u ON u.id = f.uploaded_by
`;

// GET /api/files
router.get("/", async (_req, res) => {
  const rows = await query(`${SELECT_FILE} ORDER BY f.created_at DESC`);
  res.json(rows.map(shapeFile));
});

// POST /api/files/url  { name, url }  -> share a deployment / folder link
router.post("/url", async (req, res) => {
  const { name, url } = req.body || {};
  if (!name || !url) return res.status(400).json({ error: "name and url are required" });
  const [result] = await pool.execute(
    `INSERT INTO files (kind, name, url, file_type, uploaded_by) VALUES ('url', ?, ?, 'url', ?)`,
    [name, url, req.user.id]
  );
  const rows = await query(`${SELECT_FILE} WHERE f.id = ?`, [result.insertId]);
  res.status(201).json(shapeFile(rows[0]));
});

// POST /api/files/upload  (multipart form field: "file")  -> upload any format
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const [result] = await pool.execute(
    `INSERT INTO files (kind, name, stored_path, size_label, file_type, uploaded_by)
     VALUES ('file', ?, ?, ?, ?, ?)`,
    [
      req.file.originalname,
      req.file.filename,
      humanSize(req.file.size),
      guessType(req.file.originalname),
      req.user.id,
    ]
  );
  const rows = await query(`${SELECT_FILE} WHERE f.id = ?`, [result.insertId]);
  res.status(201).json(shapeFile(rows[0]));
});

// GET /api/files/:id/download  -> stream a stored file
router.get("/:id/download", async (req, res) => {
  const rows = await query("SELECT * FROM files WHERE id = ?", [req.params.id]);
  const f = rows[0];
  if (!f) return res.status(404).json({ error: "Not found" });
  if (f.kind === "url") return res.redirect(f.url);
  const abs = path.join(UPLOAD_DIR, f.stored_path);
  if (!fs.existsSync(abs)) return res.status(404).json({ error: "File missing on disk" });
  res.download(abs, f.name);
});

// DELETE /api/files/:id
router.delete("/:id", async (req, res) => {
  const rows = await query("SELECT * FROM files WHERE id = ?", [req.params.id]);
  const f = rows[0];
  if (f && f.kind === "file" && f.stored_path) {
    const abs = path.join(UPLOAD_DIR, f.stored_path);
    fs.existsSync(abs) && fs.unlinkSync(abs);
  }
  await pool.execute("DELETE FROM files WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

export default router;
