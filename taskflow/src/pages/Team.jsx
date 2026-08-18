import { Mail, Phone, ShieldCheck, Users } from "lucide-react";
import Layout from "../components/Layout";
import { teamMembers } from "../data/mockData";
import { PresenceBadge } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function Team() {
  const { user } = useAuth();
  const isAdmin = user?.accessRole === "admin";
  const isManager = user?.accessRole === "manager";

  const totalCapacity = Math.round(
    teamMembers.reduce((sum, m) => sum + m.capacity, 0) / teamMembers.length
  );
  const totalActive = teamMembers.reduce((sum, m) => sum + m.activeTasks, 0);
  const totalCompleted = teamMembers.reduce((sum, m) => sum + m.completed, 0);
  const completionRate = Math.round(
    (totalCompleted / (totalCompleted + totalActive)) * 100
  );

  return (
    <Layout title="Team">
      {isAdmin && (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-primary-500" />
            <h3 className="font-bold text-sidebar">Team Progress Monitor</h3>
            <span className="text-[10px] font-bold uppercase tracking-wide bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">
              Admin only
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <div>
              <p className="text-xs text-slate2-500">Avg. Capacity</p>
              <p className="text-2xl font-extrabold text-sidebar">{totalCapacity}%</p>
            </div>
            <div>
              <p className="text-xs text-slate2-500">Active Tasks (team)</p>
              <p className="text-2xl font-extrabold text-sidebar">{totalActive}</p>
            </div>
            <div>
              <p className="text-xs text-slate2-500">Completion Rate</p>
              <p className="text-2xl font-extrabold text-sidebar">{completionRate}%</p>
            </div>
          </div>

          <div className="space-y-2">
            {teamMembers.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate2-500 w-28 truncate">
                  {m.name}
                </span>
                <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${m.capacity}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-sidebar w-9 text-right">
                  {m.capacity}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isManager && (
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-secondary-600" />
          <h3 className="font-bold text-sidebar">Each member, individually</h3>
          <span className="text-[10px] font-bold uppercase tracking-wide bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full">
            Project manager view
          </span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {teamMembers.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-black/5 shadow-sm p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${m.color} text-white font-semibold flex items-center justify-center shrink-0`}
                >
                  {m.initials}
                </div>
                <div>
                  <p className="font-semibold text-sidebar">{m.name}</p>
                  <p className="text-sm text-primary-500 font-medium">{m.role}</p>
                </div>
              </div>
              <PresenceBadge status={m.status} />
            </div>

            <div className="space-y-1 mb-4 text-xs text-slate2-500">
              <p className="flex items-center gap-2">
                <Mail size={13} /> {m.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={13} /> {m.phone}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate2-500 font-medium">Capacity</span>
              <span className="font-bold text-sidebar">{m.capacity}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/5 mb-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${m.color}`}
                style={{ width: `${m.capacity}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm pt-3 border-t border-black/5">
              <div>
                <p className="text-xs text-slate2-500">Active Tasks</p>
                <p className="font-bold text-sidebar">{m.activeTasks}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate2-500">Completed</p>
                <p className="font-bold text-sidebar">{m.completed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
