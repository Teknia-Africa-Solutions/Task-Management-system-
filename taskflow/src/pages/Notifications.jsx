import { Bell, Sparkles, CheckCircle2, AlertCircle, X } from "lucide-react";
import Layout from "../components/Layout";
import { useNotifications } from "../context/NotificationsContext";

const typeStyles = {
  info: {
    Icon: Sparkles,
    bg: "bg-primary-50",
    border: "border-primary-200",
    iconColor: "text-primary-500",
  },
  success: {
    Icon: CheckCircle2,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
  },
  warning: {
    Icon: AlertCircle,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-600",
  },
};

export default function Notifications() {
  const { notifications, dismiss } = useNotifications();

  return (
    <Layout title="Notifications">
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 max-w-2xl">
        <h3 className="font-bold text-sidebar flex items-center gap-2 mb-4">
          <Bell size={16} className="text-primary-500" />
          Recent Notifications
        </h3>

        <div className="space-y-3">
          {notifications.length === 0 && (
            <p className="text-sm text-slate2-500 py-6 text-center">
              You're all caught up.
            </p>
          )}
          {notifications.map((n) => {
            const { Icon, bg, border, iconColor } = typeStyles[n.type] || typeStyles.info;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-xl border ${border} ${bg} p-4`}
              >
                <Icon size={18} className={`${iconColor} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sidebar">{n.title}</p>
                  <p className="text-xs text-slate2-500 mt-0.5">{n.description}</p>
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  className="text-slate2-400 hover:text-sidebar shrink-0"
                  aria-label="Dismiss"
                >
                  <X size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
