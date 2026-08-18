import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Square, Clock, CheckCircle2, NotebookPen, ArrowRight, History } from "lucide-react";
import Layout from "../components/Layout";
import { useTracker } from "../context/TrackerContext";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import { PriorityBadge, StatusBadge } from "../components/ui";

export default function Tracker() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const {
    clockedIn,
    clockedOutToday,
    elapsedLabel,
    history,
    notes,
    clockIn,
    clockOut,
    logNote,
    formatDuration,
  } = useTracker();

  const [error, setError] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [note, setNote] = useState("");

  const myTasks = tasks.filter((t) => t.assignee === user?.name && t.status !== "DONE");
  const activeTask = myTasks.find((t) => t.id === activeTaskId) || myTasks[0] || null;

    async function handleClockIn() {
    const res = await clockIn();
    if (!res.ok) setError(res.message);
    else setError("");
  }

  async function handleClockOut() {
    const res = await clockOut();
    if (!res.ok) setError(res.message);
    else setError("");
  }
  function handleLogNote(e) {
    e.preventDefault();
    if (!activeTask || !note.trim()) return;
    logNote(activeTask.title, note);
    setNote("");
  }

  return (
    <Layout title="Tracker" subtitle="Clock in, work a task, then wrap up with your report">
      {/* Clock in/out card */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              clockedIn ? "bg-primary-50 text-primary-600" : "bg-black/5 text-slate2-500"
            }`}
          >
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
              {clockedIn ? "Clocked in" : clockedOutToday ? "Clocked out" : "Not clocked in"}
            </p>
            <p className="text-2xl font-extrabold text-sidebar">{elapsedLabel}</p>
          </div>
        </div>

        {!clockedIn && !clockedOutToday && (
          <button
            onClick={handleClockIn}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <Play size={16} /> Clock In
          </button>
        )}
        {clockedIn && (
          <button
            onClick={handleClockOut}
            className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <Square size={16} /> Clock Out
          </button>
        )}
        {clockedOutToday && (
          <span className="flex items-center gap-2 text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2.5 rounded-full">
            <CheckCircle2 size={16} /> Done for today
          </span>
        )}
      </div>

      {error && (
        <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-2.5 mb-6">
          {error}
        </p>
      )}

      {/* Once clocked out: nudge to update the weekly report */}
      {clockedOutToday && (
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-sidebar">Nice work today.</p>
            <p className="text-sm text-slate2-500">
              Now's a good time to update your weekly report with what you got done.
            </p>
          </div>
          <Link
            to="/reports"
            className="flex items-center gap-1.5 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold px-4 py-2.5 rounded-full whitespace-nowrap"
          >
            Update Report <ArrowRight size={15} />
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Task progress logging, only usable while clocked in */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
          <h3 className="font-bold text-sidebar flex items-center gap-2 mb-4">
            <NotebookPen size={16} className="text-primary-500" />
            Log progress on a task
          </h3>

          {myTasks.length === 0 ? (
            <p className="text-sm text-slate2-500">You have no open tasks assigned right now.</p>
          ) : !clockedIn ? (
            <p className="text-sm text-slate2-500">Clock in to start logging progress on a task.</p>
          ) : (
            <form onSubmit={handleLogNote} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                  Task
                </label>
                <select
                  value={activeTask?.id}
                  onChange={(e) => setActiveTaskId(Number(e.target.value))}
                  className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500 bg-white"
                >
                  {myTasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
                {activeTask && (
                  <div className="flex gap-2 mt-2">
                    <PriorityBadge priority={activeTask.priority} />
                    <StatusBadge status={activeTask.status} />
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                  What did you just do?
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="e.g. Finished the API integration for login"
                  className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                Log Progress
              </button>
            </form>
          )}

          {notes.length > 0 && (
            <div className="mt-5 pt-4 border-t border-black/5 space-y-3">
              {notes.slice(0, 5).map((n) => (
                <div key={n.id} className="text-sm">
                  <p className="font-semibold text-sidebar">{n.taskTitle}</p>
                  <p className="text-slate2-500">{n.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent clock-in history */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
          <h3 className="font-bold text-sidebar flex items-center gap-2 mb-4">
            <History size={16} className="text-primary-500" />
            Recent sessions
          </h3>
          {history.length === 0 ? (
            <p className="text-sm text-slate2-500">Your completed sessions will show up here.</p>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <div
                  key={h.date}
                  className="flex items-center justify-between rounded-xl border border-black/5 px-4 py-2.5 text-sm"
                >
                  <span className="font-medium text-sidebar">{h.date}</span>
                                    <span className="text-slate2-500">
                    {h.durationMinutes != null
                      ? formatDuration(h.durationMinutes * 60000)
                      : "In progress"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
