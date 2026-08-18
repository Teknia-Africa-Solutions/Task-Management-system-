import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ListChecks, Clock, Activity, CheckCircle2, Flag, CalendarDays, PartyPopper, TrendingUp } from "lucide-react";
import Layout from "../components/Layout";
import { StatCard } from "../components/ui";
import { taskOverviewData, upcomingDeadlines } from "../data/mockData";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { tasks, isLoading,error,retryLoadTasks } = useTasks();
  const { user } = useAuth();
  const isStaff = user?.accessRole === "admin" || user?.accessRole === "manager";
  const visibleTasks = isStaff ? tasks : tasks.filter((t) => t.assignee === user?.name);

  const total = visibleTasks.length;
  const pending = visibleTasks.filter((t) => t.status === "TODO").length;
  const inProgress = visibleTasks.filter((t) => t.status === "IN PROGRESS").length;
  const completed = visibleTasks.filter((t) => t.status === "DONE").length;
// ---- Error state ----
  if (error) {
    return (
      <Layout
        title="Dashboard"
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            Welcome Back, {user?.name}
            <PartyPopper size={15} className="text-secondary-600" />
          </span>
        }
      >
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
            <span className="text-red-500 text-xl">!</span>
          </div>
          <p className="font-semibold text-sidebar">Something went wrong</p>
          <p className="text-sm text-slate2-500 mt-1 mb-4">{error}</p>
          <button
            onClick={retryLoadTasks}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }
  // ---- Loading state ----
  if (isLoading) {
    return (
      <Layout
        title="Dashboard"
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            Welcome Back, {user?.name}
            <PartyPopper size={15} className="text-secondary-600" />
          </span>
        }
      >
        <p className="text-sm text-slate2-500 -mt-4 mb-6">
          Here's what's happening with your tasks today.
        </p>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-2xl bg-slate-100 border border-black/5 animate-pulse"
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-96 rounded-2xl bg-slate-100 border border-black/5 animate-pulse" />
          <div className="h-96 rounded-2xl bg-slate-100 border border-black/5 animate-pulse" />
        </div>
      </Layout>
    );
  }

  // ---- Loaded state ----
  return (
    <Layout
      title="Dashboard"
      subtitle={
        <span className="inline-flex items-center gap-1.5">
          Welcome Back, {user?.name}
          <PartyPopper size={15} className="text-secondary-600" />
        </span>
      }
    >
      <p className="text-sm text-slate2-500 -mt-4 mb-6">
        Here's what's happening with your tasks today.
      </p>

      {total === 0 ? (
        // ---- Empty state ----
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-10 text-center mb-6">
          <ListChecks size={32} className="mx-auto text-slate2-300 mb-3" />
          <p className="font-semibold text-sidebar">No tasks yet</p>
          <p className="text-sm text-slate2-500 mt-1">
            {isStaff
              ? "Create a task to get your team started."
              : "You haven't been assigned any tasks yet."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="Total Tasks"
              value={total}
              delta="12% from last week"
              icon={ListChecks}
              iconBg="bg-primary-100"
              iconColor="text-primary-600"
            />
            <StatCard
              label="Pending Tasks"
              value={pending}
              delta="5% from last week"
              icon={Clock}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
            />
            <StatCard
              label="In Progress"
              value={inProgress}
              delta="8% from last week"
              icon={Activity}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              label="Completed"
              value={completed}
              delta="20% from last week"
              icon={CheckCircle2}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-black/5 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sidebar flex items-center gap-2">
                  <Activity size={16} className="text-primary-500" />
                  Task Overview
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate2-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-500" /> Completed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-500" /> Created
                  </span>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskOverviewData} barGap={4}>
                    <CartesianGrid vertical={false} stroke="#EFE9DF" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "#7C8B99" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#7C8B99" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(11,94,18,0.06)" }}
                      contentStyle={{
                        borderRadius: 10,
                        border: "1px solid #EFE9DF",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="completed" fill="#0B5E12" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="created" fill="#96AF25" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
              <h3 className="font-bold text-sidebar flex items-center gap-2 mb-4">
                <CalendarDays size={16} className="text-primary-500" />
                Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-3 rounded-xl border border-black/5 p-3"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary-50 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold text-primary-500 leading-none">
                        {d.month}
                      </span>
                      <span className="text-sm font-extrabold text-primary-600 leading-none mt-0.5">
                        {d.day}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-sidebar truncate">
                        {d.title}
                      </p>
                      <p className="text-xs text-slate2-500">{d.note}</p>
                    </div>
                    <Flag size={14} className="text-slate2-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}