import { useState } from "react";
import { Eye, CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import Layout from "../components/Layout";
import { PriorityBadge, StatusBadge } from "../components/ui";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import { teamMembers } from "../data/mockData";
import { useToast } from "../context/ToastContext";

const tabs = ["ALL", "TODO", "IN PROGRESS", "REVIEW", "DONE"];

export default function MyTasks() {
  const { tasks, toggleDone, editTask, deleteTask, priorityFilter,searchQuery } = useTasks();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.accessRole === "admin";
  const isStaff = isAdmin || user?.accessRole === "manager";
  const [activeTab, setActiveTab] = useState("ALL");
  const [preview, setPreview] = useState(null);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Members only ever see tasks assigned to them; staff (admin/manager) see everyone's.
const visibleTasks = isStaff ? tasks : tasks.filter((t) => t.assignee === user?.name);

  const filtered = visibleTasks
    .filter((t) => activeTab === "ALL" || t.status === activeTab)
    .filter((t) => priorityFilter === "ALL" || t.priority === priorityFilter)
    .filter((t) => !searchQuery.trim() || t.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  return (
    <Layout title="My Tasks">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
                activeTab === tab
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-black/10 text-slate2-500 hover:bg-black/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm divide-y divide-black/5">
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-slate2-500">
            No tasks in this view yet.
          </p>
        )}
        {filtered.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-4 p-4 md:p-5 hover:bg-black/[0.02]"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="font-semibold text-sidebar text-sm">{t.title}</p>
                <PriorityBadge priority={t.priority} />
                <StatusBadge status={t.status} />
              </div>
              <p className="text-xs text-slate2-500">
                Category: {t.category} · Due {t.due} · Assignee: {t.assignee}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setPreview(t)}
                className="text-slate2-400 hover:text-primary-500"
                aria-label="Preview task"
              >
                <Eye size={17} />
              </button>
              {(isStaff || t.assignee === user?.name) && (
                <>
                  <button
                    onClick={() => setEditing(t)}
                    className="text-slate2-400 hover:text-primary-500"
                    aria-label="Edit task"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(t)}
                    className="text-slate2-400 hover:text-rose-500"
                    aria-label="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
             <button
  onClick={() => {
    toggleDone(t.id);
    showToast(t.status === "DONE" ? "Task marked as not done" : "Task completed ");
  }}
  className={t.status === "DONE" ? "text-emerald-600" : "text-slate2-400 hover:text-emerald-600"}
  aria-label="Toggle done"
>
  {t.status === "DONE" ? (
    <CheckCircle2 size={19} />
  ) : (
    <Circle size={19} />
  )}
</button>
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-sidebar mb-2">{preview.title}</h3>
            <div className="flex gap-2 mb-3">
              <PriorityBadge priority={preview.priority} />
              <StatusBadge status={preview.status} />
            </div>
            <p className="text-sm text-slate2-500">Category: {preview.category}</p>
            <p className="text-sm text-slate2-500">Due: {preview.due}</p>
            <p className="text-sm text-slate2-500">Assignee: {preview.assignee}</p>
            <button
              onClick={() => setPreview(null)}
              className="mt-5 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-sidebar mb-4">Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editTask(editing.id, editing);
                setEditing(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                  Task title
                </label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                    Priority
                  </label>
                  <select
                    value={editing.priority}
                    onChange={(e) => setEditing({ ...editing, priority: e.target.value })}
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
                    value={editing.status}
                    onChange={(e) => setEditing({ ...editing, status: e.target.value })}
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
                  value={editing.assignee}
                  onChange={(e) => setEditing({ ...editing, assignee: e.target.value })}
                  disabled={!isStaff}
                  className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500 bg-white disabled:bg-black/5 disabled:text-slate2-400"
                >
                  {teamMembers.map((m) => (
                    <option key={m.id}>{m.name}</option>
                  ))}
                </select>
                {!isStaff && (
                  <p className="text-[11px] text-slate2-400 mt-1">
                    Only admins and project managers can reassign tasks.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="flex-1 border border-black/10 text-sidebar font-semibold py-2.5 rounded-lg hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )};
      {confirmDelete && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
    onClick={() => setConfirmDelete(null)}
  >
    <div
      className="bg-white rounded-2xl w-full max-w-sm p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="font-bold text-sidebar mb-2">Delete this task?</h3>
      <p className="text-sm text-slate2-500 mb-5">
        "{confirmDelete.title}" will be permanently deleted. This can't be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setConfirmDelete(null)}
          className="flex-1 border border-black/10 text-sidebar font-semibold py-2.5 rounded-lg hover:bg-black/5"
        >
          Cancel
        </button>
        <button
          onClick={() => {
  deleteTask(confirmDelete.id);
  setConfirmDelete(null);
  showToast("Task deleted");
}}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </Layout>
  );
}
