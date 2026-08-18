import { useState } from "react";
import { Search, Filter, Bell, Plus, ChevronDown, Menu, LogOut, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationsContext";
import { useTasks } from "../context/TasksContext";

const FILTER_OPTIONS = ["ALL", "HIGH", "MEDIUM", "LOW"];

export default function Topbar({ title, subtitle, onMenuClick, onNewTask }) {
  const { user, logout } = useAuth();
  const { notifications } = useNotifications();
  const { priorityFilter, setPriorityFilter, searchQuery, setSearchQuery } = useTasks();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const isStaff = user?.accessRole === "admin" || user?.accessRole === "manager";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-8 py-5 border-b border-black/5 bg-cream">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-sidebar"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-sidebar">{title}</h1>
            {subtitle && (
              <span className="text-sm text-slate2-500">{subtitle}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 ml-auto">
        <div className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 w-full sm:w-56 lg:w-72">
          <Search size={16} className="text-slate2-400 shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate2-400"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className={`flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5 ${
              priorityFilter !== "ALL"
                ? "bg-primary-50 border-primary-200 text-primary-700"
                : "bg-white border-black/10 text-sidebar"
            }`}
          >
            <Filter size={15} />
            {priorityFilter === "ALL" ? "Filter" : `Priority: ${priorityFilter}`}
          </button>

          {filterOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-black/5 py-1 z-20">
                <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate2-400">
                  Priority
                </p>
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setPriorityFilter(opt);
                      setFilterOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-sidebar hover:bg-black/5"
                  >
                    {opt === "ALL" ? "All priorities" : opt}
                    {priorityFilter === opt && <Check size={14} className="text-primary-600" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => navigate("/notifications")}
          className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white border border-black/10 hover:bg-black/5"
          aria-label="Notifications"
        >
          <Bell size={16} className="text-sidebar" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {notifications.length}
            </span>
          )}
        </button>

        {isStaff && (
          <button
            onClick={onNewTask}
            className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Task</span>
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-semibold">
              {user?.initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-sidebar leading-tight">
                {user?.name}
              </p>
              <p className="text-xs text-slate2-500 leading-tight">
                {user?.role}
              </p>
            </div>
            <ChevronDown size={16} className="text-slate2-500 hidden md:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-black/5 py-1 z-20">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-sidebar hover:bg-black/5"
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}