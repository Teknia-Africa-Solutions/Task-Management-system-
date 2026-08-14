import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutGrid,
  CheckSquare,
  FolderKanban,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BarChart2,
  Bell,
  Menu,
  Activity,
  Timer,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/my-tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/tracker", label: "Tracker", icon: Timer },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/team", label: "Team", icon: Users, staffOnly: true },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/files", label: "Files", icon: FileText },
  { to: "/reports", label: "Reports", icon: BarChart2 },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar({ open, setOpen }) {
  const { user } = useAuth();
  const isStaff = user?.accessRole === "admin" || user?.accessRole === "manager";
  const visibleNav = navItems.filter((item) => !item.staffOnly || isStaff);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`bg-sidebar text-white w-64 shrink-0 flex flex-col fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-[17px] leading-none">TaskFlow</p>
            <p className="text-[10px] tracking-widest text-primary-400 font-semibold mt-1">
              DASHBOARD
            </p>
          </div>
        </div>

        <button
          className="md:hidden text-white/70 px-6 pb-4 self-start"
          onClick={() => setOpen(false)}
        >
          <Menu size={20} />
        </button>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {visibleNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-white/70 hover:bg-sidebar-hover hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {user && (
          <div className="p-3 mx-3 mb-4 rounded-xl bg-primary-500/90 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center text-sm font-semibold shrink-0">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">
                {user.name}
              </p>
              <p className="text-xs text-white/80 truncate">{user.email}</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
