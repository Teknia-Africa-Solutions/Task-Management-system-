// Thin wrapper around the Socket.IO server instance so any route can emit
// events without importing the whole server. index.js calls setIO() at boot.
let io = null;

export function setIO(instance) {
  io = instance;
}

// Broadcast a clock-in/clock-out change to everyone watching the admin monitor.
// The frontend admin dashboard joins the "admins" room; members' own timers
// also update from the HTTP response, but this keeps the monitor live for all.
export function emitTimelogUpdate(payload) {
  if (!io) return;
  io.to("admins").emit("timelog:update", payload);
}

export function emitNotification(payload) {
  if (!io) return;
  // Targeted notifications go to that user's room; globals go to everyone.
  if (payload.userId) io.to(`user:${payload.userId}`).emit("notification:new", payload);
  else io.emit("notification:new", payload);
}
