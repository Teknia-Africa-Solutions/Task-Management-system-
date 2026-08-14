import { Link } from "react-router-dom";
import { Activity, ArrowRight } from "lucide-react";
import { teamPreview, teamMembers } from "../data/mockData";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream text-sidebar">
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg">TaskFlow</span>
        </div>
        <Link
          to="/login"
          className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          Go to Dashboard
          <ArrowRight size={15} />
        </Link>
      </header>

      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
        <p className="uppercase tracking-widest text-xs font-semibold text-primary-500 mb-4">
          Student Development Team
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Manage Projects &amp; Tasks Together
        </h1>
        <p className="text-slate2-500 text-base md:text-lg max-w-2xl mx-auto mb-10">
          A collaborative platform for student teams to manage projects, track
          tasks, and build amazing software together. From idea to
          deployment, we've got you covered.
        </p>

        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="flex -space-x-3">
            {teamPreview.map((m, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full ${m.color} text-white text-xs font-semibold flex items-center justify-center ring-4 ring-cream`}
              >
                {m.initials}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-white text-sidebar text-xs font-semibold flex items-center justify-center ring-4 ring-cream border border-black/10">
              +1
            </div>
          </div>
        </div>
        <p className="text-sm text-slate2-500">6 passionate students</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold">Student Team Workspace</h2>
              <p className="text-sm text-slate2-500 mt-1">
                Software Engineering Class · Spring 2026
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-primary-500">
                Current Sprint
              </p>
              <p className="text-xs text-slate2-500">6 active tasks</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-black/5 p-4 flex items-center gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-full ${m.color} text-white text-xs font-semibold flex items-center justify-center shrink-0`}
                >
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{m.name}</p>
                  <p className="text-xs text-slate2-500 truncate">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary-500 flex items-center justify-center">
            <Activity size={13} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-none">TaskFlow</p>
            <p className="text-xs text-slate2-500">
              Student development team workspace.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate2-500">
          © 2026 TaskFlow. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
