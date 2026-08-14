import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import { teamMembers } from "../data/mockData";

export default function NewTaskModal({ open, onClose }) {
  const { addTask } = useTasks();
  const { user } = useAuth();
  const isStaff = user?.accessRole === "admin" || user?.accessRole === "manager";
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("TODO");
  const [assignee, setAssignee] = useState(teamMembers[0].name);
  const [due, setDue] = useState("");

  // Members can never assign work to anyone but themselves, even if this
  // modal is reached directly — the New Task button is already hidden for
  // them in the Topbar, this is a second line of defense.
  useEffect(() => {
    if (open && !isStaff && user?.name) setAssignee(user.name);
  }, [open, isStaff, user?.name]);

  if (!open) return null;
  if (!isStaff && !user?.name) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title: title.trim(),
      category,
      priority,
      status,
      assignee,
      due: due || "2026-06-01",
    });
    setTitle("");
    setDue("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate2-500 hover:text-sidebar"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-sidebar mb-5">New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
              Task title
            </label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wireframe onboarding flow"
              className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                Category
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                Due date
              </label>
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500 bg-white"
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500 bg-white"
              >
                <option>TODO</option>
                <option>IN PROGRESS</option>
                <option>REVIEW</option>
                <option>DONE</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
              Assignee
            </label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              disabled={!isStaff}
              className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500 bg-white disabled:bg-black/5 disabled:text-slate2-400"
            >
              {teamMembers.map((m) => (
                <option key={m.id}>{m.name}</option>
              ))}
            </select>
            {!isStaff && (
              <p className="text-[11px] text-slate2-400 mt-1">
                Tasks you create are assigned to you.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
