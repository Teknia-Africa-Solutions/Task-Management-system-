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
import { TrendingUp, TrendingDown } from "lucide-react";
import Layout from "../components/Layout";
import { completionTrend } from "../data/mockData";

const stats = [
  { label: "Task Completion Rate", value: "87%", delta: "12% from last month", trend: "up" },
  { label: "Avg. Task Duration", value: "2.4d", delta: "8% from last month", trend: "down" },
  { label: "Team Productivity", value: "92%", delta: "5% from last month", trend: "up" },
];

export default function Reports() {
  return (
    <Layout title="Reports">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-black/5 shadow-sm p-5"
          >
            <p className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
              {s.label}
            </p>
            <p className="text-3xl font-extrabold text-sidebar mt-2">{s.value}</p>
            <p
              className={`flex items-center gap-1 text-xs font-medium mt-2 ${
                s.trend === "down" ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {s.trend === "down" ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sidebar flex items-center gap-2">
            <TrendingUp size={16} className="text-primary-500" />
            Task Completion &amp; Pending Trend
          </h3>
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
                stroke="#B25940"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#B25940" }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                name="pending"
                stroke="#D98A6B"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 3, fill: "#D98A6B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
