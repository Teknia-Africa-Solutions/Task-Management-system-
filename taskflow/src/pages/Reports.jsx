import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, AlertTriangle, ListChecks, CheckCircle2 } from "lucide-react";
import Layout from "../components/Layout";
import { completionTrend, teamMembers } from "../data/mockData";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";

function isOverdue(t) {
  if (!t.due || t.status === "DONE") return false;
  return new Date(t.due) < new Date(new Date().toDateString());
}

export default function Reports() {
  const { tasks } = useTasks();
  const { user } = useAuth();
  const isStaff = user?.accessRole === "admin" || user?.accessRole === "manager";

  // Staff see the whole team's real progress (including their own tasks);
  // a member sees only their own — same visibility rule used everywhere else.
  const visibleTasks = isStaff ? tasks : tasks.filter((t) => t.assignee === user?.name);

  const total = visibleTasks.length;
  const completed = visibleTasks.filter((t) => t.status === "DONE").length;
  const inProgress = visibleTasks.filter((t) => t.status === "IN PROGRESS").length;
  const overdue = visibleTasks.filter(isOverdue).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "Task Completion Rate",
      value: `${completionRate}%`,
      icon: CheckCircle2,
      tone: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: ListChecks,
      tone: "text-blue-600 bg-blue-50",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      tone: overdue > 0 ? "text-rose-600 bg-rose-50" : "text-slate2-500 bg-black/5",
    },
  ];

  // Per-person breakdown — this is the piece that actually lets a PM see
  // everyone's real progress (including their own) in one place, computed
  // live from the same task list rather than a separate static source.
  const perPerson = teamMembers.map((m) => {
    const mine = tasks.filter((t) => t.assignee === m.name);
    const done = mine.filter((t) => t.status === "DONE").length;
    return {
      ...m,
      total: mine.length,
      completed: done,
      overdue: mine.filter(isOverdue).length,
      rate: mine.length > 0 ? Math.round((done / mine.length) * 100) : 0,
    };
  });

  return (
    <Layout title="Reports">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-black/5 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                {s.label}
              </p>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.tone}`}>
                <s.icon size={15} />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-sidebar">{s.value}</p>
          </div>
        ))}
      </div>

      {isStaff && (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 mb-6">
          <h3 className="font-bold text-sidebar flex items-center gap-2 mb-4">
            <ListChecks size={16} className="text-primary-500" />
            Progress by person
          </h3>
          <div className="space-y-3">
            {perPerson.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full ${m.color} text-white text-xs font-semibold flex items-center justify-center shrink-0`}
                >
                  {m.initials}
                </div>
                <span className="text-sm font-medium text-sidebar w-28 truncate shrink-0">
                  {m.name}
                </span>
                <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${m.rate}%` }}
                  />
                </div>
                <span className="text-xs text-slate2-500 w-16 text-right shrink-0">
                  {m.completed}/{m.total} done
                </span>
                {m.overdue > 0 && (
                  <span className="text-xs font-semibold text-rose-600 shrink-0">
                    {m.overdue} overdue
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sidebar flex items-center gap-2">
            <TrendingUp size={16} className="text-primary-500" />
            Task Completion &amp; Pending Trend
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wide bg-black/5 text-slate2-500 px-2 py-0.5 rounded-full">
            Sample trend
          </span>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={completionTrend}>
              <CartesianGrid vertical={false} stroke="#EFE9DF" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fill: "#7C8B99" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#7C8B99" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #EFE9DF",
                  fontSize: 12,
                }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: "#7C8B99" }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                name="completed"
                stroke="#0B5E12"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#0B5E12" }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                name="pending"
                stroke="#96AF25"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 3, fill: "#96AF25" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}