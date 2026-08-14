import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import { config } from "./config.js";
import { pool } from "./db.js";
import { setIO } from "./realtime.js";
import { verifyToken } from "./utils/auth.js";

import authRoutes from "./routes/auth.js";
import teamRoutes from "./routes/team.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import calendarRoutes from "./routes/calendar.js";
import messageRoutes from "./routes/messages.js";
import fileRoutes from "./routes/files.js";
import notificationRoutes from "./routes/notifications.js";
import timelogRoutes from "./routes/timelogs.js";
import reportRoutes from "./routes/reports.js";

const app = express();

app.use(cors({ origin: config.clientOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check.
app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "up" });
  } catch (e) {
    res.status(500).json({ ok: false, db: "down", error: e.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/timelogs", timelogRoutes);
app.use("/api/reports", reportRoutes);

// 404 for unknown API routes.
app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

// Central error handler (so thrown errors don't crash the process).
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

// ---- HTTP + Socket.IO ----
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: config.clientOrigins, credentials: true },
});
setIO(io);

// Authenticate socket connections with the same JWT, then place each client
// into rooms: their personal room, and (if admin) the "admins" room that
// receives live clock-in/out updates for the whole team.
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));
    const payload = verifyToken(token);
    socket.user = payload;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  socket.join(`user:${socket.user.sub}`);
  if (socket.user.role === "admin") socket.join("admins");
});

server.listen(config.port, () => {
  console.log(`TaskFlow API listening on http://localhost:${config.port}`);
  console.log(`Allowed origins: ${config.clientOrigins.join(", ")}`);
});
