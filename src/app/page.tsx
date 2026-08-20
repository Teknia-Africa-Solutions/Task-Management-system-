// src/app/page.tsx - Landing Page (NEVER redirects)
import Link from 'next/link';
import { Activity, Sparkles, Code2, GraduationCap } from 'lucide-react';

export default function LandingPage() {
  // ✅ This page NEVER redirects - always shows the landing page

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#0B5E12]/10 text-[#0B5E12]">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">TaskFlow</span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-gray-700 hover:text-[#0B5E12] transition px-3 py-2"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-semibold text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B5E12]/10 text-[#0B5E12] text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Student Development Team
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                Manage Projects & 
                <span className="text-[#0B5E12]"> Tasks Together</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                A collaborative platform for student teams to manage projects, track tasks, 
                and build amazing software together.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link 
                  href="/signup" 
                  className="px-8 py-3 text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
                >
                  Get Started
                </Link>
                <Link 
                  href="/login" 
                  className="px-8 py-3 text-gray-700 border-2 border-gray-300 hover:border-[#0B5E12] rounded-xl font-semibold transition"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#0B5E12]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#96AF25]"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                  <span className="text-xs text-gray-500">Student Team Workspace</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { name: 'Alex Chen', role: 'Frontend Lead', avatar: 'AC', color: 'bg-[#0B5E12]' },
                    { name: 'Maria Rodriguez', role: 'Backend Dev', avatar: 'MR', color: 'bg-[#96AF25]' },
                    { name: 'James Kim', role: 'UI/UX Designer', avatar: 'JK', color: 'bg-[#D5966C]' },
                    { name: 'Sarah Patel', role: 'Project Manager', avatar: 'SP', color: 'bg-[#4f6d7a]' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${member.color}`}>
                        {member.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">{member.name}</p>
                        <p className="text-[8px] text-gray-500 truncate">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3 bg-[#0B5E12]/5 rounded-xl border border-[#0B5E12]/20">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#0B5E12]" />
                    <span className="text-xs font-semibold text-gray-900">Current Sprint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs text-gray-500">6 active tasks</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#0B5E12]" />
                    <span className="text-xs text-gray-500">Software Engineering Class</span>
                  </div>
                  <span className="text-xs font-semibold text-[#0B5E12]">Spring 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-[#0B5E12]/20 text-[#0B5E12]">
              <Activity className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">TaskFlow</span>
          </div>
          <p className="text-sm text-gray-500">Student development team workspace.</p>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-600">
            © 2026 TaskFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}