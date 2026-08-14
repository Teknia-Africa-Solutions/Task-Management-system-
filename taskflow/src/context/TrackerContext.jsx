import { createContext, useContext, useState, useEffect, useCallback } from "react";

const TrackerContext = createContext(null);

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function formatDuration(ms) {
  const totalMin = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function TrackerProvider({ children }) {
  // `today` holds today's clock-in state: { date, clockInAt, clockOutAt } | null
  const [today, setToday] = useState(null);
  // `history` holds past days' completed sessions, most recent first.
  const [history, setHistory] = useState([]);
  // `notes` are progress notes logged against tasks during a session.
  const [notes, setNotes] = useState([]);
  const [now, setNow] = useState(Date.now());

  // Tick every 30s while clocked in, purely to keep the live timer fresh.
  useEffect(() => {
    if (!today || today.clockOutAt) return;
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, [today]);

  const alreadyClockedInToday = today?.date === todayKey();
  const clockedIn = alreadyClockedInToday && !today.clockOutAt;
  const clockedOutToday = alreadyClockedInToday && !!today.clockOutAt;

  const clockIn = useCallback(() => {
    if (alreadyClockedInToday) return { ok: false, message: "You already clocked in today." };
    const entry = { date: todayKey(), clockInAt: Date.now(), clockOutAt: null };
    setToday(entry);
    setNow(Date.now());
    return { ok: true };
  }, [alreadyClockedInToday]);

  const clockOut = useCallback(() => {
    if (!clockedIn) return { ok: false, message: "You're not clocked in." };
    const clockOutAt = Date.now();
    const finished = { ...today, clockOutAt };
    setToday(finished);
    setHistory((prev) => [finished, ...prev].slice(0, 14));
    return { ok: true };
  }, [clockedIn, today]);

  const logNote = useCallback((taskTitle, note) => {
    if (!note?.trim()) return;
    setNotes((prev) => [
      { id: Date.now(), taskTitle, note: note.trim(), at: Date.now() },
      ...prev,
    ]);
  }, []);

  const elapsedMs = today ? (today.clockOutAt || now) - today.clockInAt : 0;

  return (
    <TrackerContext.Provider
      value={{
        today,
        history,
        notes,
        clockedIn,
        clockedOutToday,
        elapsedMs,
        elapsedLabel: formatDuration(elapsedMs),
        clockIn,
        clockOut,
        logNote,
        formatDuration,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  return useContext(TrackerContext);
}
