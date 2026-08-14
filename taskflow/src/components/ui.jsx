import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ label, value, delta, trend = "up", icon: Icon, iconBg, iconColor }) {
  const TrendIcon = trend === "down" ? TrendingDown : TrendingUp;
  const trendColor = trend === "down" ? "text-rose-600" : "text-emerald-600";
  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
          {label}
        </p>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          <Icon size={16} className={iconColor} />
        </div>
      </div>
      <p className="text-3xl font-extrabold text-sidebar mt-2">{value}</p>
      {delta && (
        <p className={`flex items-center gap-1 text-xs font-medium mt-2 ${trendColor}`}>
          <TrendIcon size={12} />
          {delta}
        </p>
      )}
    </div>
  );
}

const priorityStyles = {
  HIGH: "bg-amber-100 text-amber-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  LOW: "bg-sky-100 text-sky-700",
};

export function PriorityBadge({ priority }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        priorityStyles[priority] || "bg-black/5 text-slate2-500"
      }`}
    >
      {priority}
    </span>
  );
}

const statusStyles = {
  TODO: "bg-white text-slate2-500 border border-black/10",
  "IN PROGRESS": "bg-blue-100 text-blue-700",
  REVIEW: "bg-violet-100 text-violet-700",
  DONE: "bg-emerald-100 text-emerald-700",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        statusStyles[status] || "bg-black/5 text-slate2-500"
      }`}
    >
      {status}
    </span>
  );
}

const presenceStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  "In Meeting": "bg-amber-100 text-amber-700",
  Busy: "bg-rose-100 text-rose-600",
  Offline: "bg-black/5 text-slate2-500",
};

export function PresenceBadge({ status }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 w-fit ${
        presenceStyles[status] || "bg-black/5 text-slate2-500"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
