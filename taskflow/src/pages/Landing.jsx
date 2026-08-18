import { Link } from "react-router-dom";
import { Activity, ArrowRight, Sparkles } from "lucide-react";
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
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-sidebar hover:text-primary-600 transition-colors px-4 py-2.5"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      {/* Hero section with gradient background */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(11,94,18,0.08), transparent 45%), radial-gradient(circle at 80% 0%, rgba(150,175,37,0.10), transparent 40%), radial-gradient(circle at 50% 100%, rgba(11,94,18,0.06), transparent 50%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
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
        </div>
      </section>

      {/* Our Story section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-10 text-center">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={18} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-bold mb-3">Our Story</h2>
          <p className="text-slate2-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            TaskFlow started as a class project for our Software Engineering
            course — six students frustrated with juggling spreadsheets,
            group chats, and sticky notes to manage a single project. We
            decided to build the tool we actually wanted to use: something
            simple, real-time, and built for how student teams really work.
            What began as a class requirement has grown into a platform we're
            genuinely proud of.
          </p>
        </div>
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