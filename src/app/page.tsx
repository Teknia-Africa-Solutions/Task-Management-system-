'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar as CalendarIcon,
  Users,
  FileText,
  Bell,
  Settings,
  User,
  Folder,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  X,
  Activity,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Smartphone,
  LogOut,
  Download,
  Trash2,
  Upload,
  FileCode,
  FileSpreadsheet,
  Image as ImageIcon,
  HardDrive,
  Eye
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

// Mock Data
const INITIAL_TASKS = [
  { id: 1, title: 'Design Glassmorphism UI Components', category: 'UI/UX Design', status: 'IN_PROGRESS', priority: 'HIGH', due: '2026-08-10' },
  { id: 2, title: 'Configure MySQL Connection Pool', category: 'Database', status: 'COMPLETED', priority: 'URGENT', due: '2026-08-08' },
  { id: 3, title: 'Setup JWT Auth & Cookie Handling', category: 'Backend', status: 'PENDING', priority: 'MEDIUM', due: '2026-08-12' },
  { id: 4, title: 'Implement Recharts Analytics View', category: 'Frontend', status: 'IN_PROGRESS', priority: 'LOW', due: '2026-08-15' },
];

const CALENDAR_EVENTS = [
  { id: 1, title: 'MySQL Connection Pool', date: '2026-08-08', category: 'Database', priority: 'URGENT' },
  { id: 2, title: 'UI Review', date: '2026-08-10', category: 'UI/UX Design', priority: 'HIGH' },
  { id: 3, title: 'JWT Auth Implementation', date: '2026-08-12', category: 'Backend', priority: 'MEDIUM' },
  { id: 4, title: 'Deploy Staging Server v2.4', date: '2026-08-14', category: 'DevOps', priority: 'URGENT' },
  { id: 5, title: 'Recharts Analytics View', date: '2026-08-15', category: 'Frontend', priority: 'LOW' },
  { id: 6, title: 'Team Sprint Planning', date: '2026-08-18', category: 'Management', priority: 'HIGH' },
  { id: 7, title: 'Security Compliance Audit', date: '2026-08-22', category: 'Security', priority: 'URGENT' },
  { id: 8, title: 'Mobile Refactor Sync', date: '2026-08-25', category: 'Mobile', priority: 'MEDIUM' },
];

const TASKS_DUE_THIS_WEEK = [
  { id: 101, title: 'Deploy Staging Server v2.4', category: 'DevOps', status: 'IN_PROGRESS', priority: 'URGENT', due: 'Wed, 5:00 PM' },
  { id: 102, title: 'Fix Auth Cookie Expiry Bug', category: 'Backend', status: 'PENDING', priority: 'HIGH', due: 'Thu, 6:30 PM' },
  { id: 103, title: 'Review Figma Component Specs', category: 'UI/UX Design', status: 'COMPLETED', priority: 'MEDIUM', due: 'Tue, 2:00 PM' },
  { id: 104, title: 'Update API Documentation', category: 'Docs', status: 'PENDING', priority: 'LOW', due: 'Fri, 8:00 PM' },
];

const INITIAL_FILES = [
  { id: 1, name: 'Database_Schema_v2.sql', size: '2.4 MB', type: 'code', uploader: 'Mike', date: '2026-08-05', icon: FileCode, color: 'text-amber-500 bg-amber-50' },
  { id: 2, name: 'Q3_Financial_Forecast.xlsx', size: '1.8 MB', type: 'spreadsheet', uploader: 'Elina', date: '2026-08-04', icon: FileSpreadsheet, color: 'text-emerald-500 bg-emerald-50' },
  { id: 3, name: 'Glassmorphism_UI_Spec.png', size: '8.1 MB', type: 'image', uploader: 'Jane', date: '2026-08-02', icon: ImageIcon, color: 'text-indigo-500 bg-indigo-50' },
  { id: 4, name: 'API_EndPoints_Doc.pdf', size: '512 KB', type: 'pdf', uploader: 'Nova', date: '2026-07-29', icon: FileText, color: 'text-rose-500 bg-rose-50' },
  { id: 5, name: 'System_Architecture.png', size: '4.3 MB', type: 'image', uploader: 'Brian', date: '2026-07-28', icon: ImageIcon, color: 'text-indigo-500 bg-indigo-50' },
];

const TEAM_WORKLOAD = [
  { id: 1, name: 'Nova', role: 'Project Manager', email: 'nova@taskpulse.io', phone: '+1 (555) 019-2834', initials: 'NV', capacity: 80, activeTasks: 8, completedTasks: 24, status: 'Active', barColor: 'bg-purple-600', badgeBg: 'bg-purple-100 text-purple-700' },
  { id: 2, name: 'Jane', role: 'UI/UX Designer', email: 'jane@taskpulse.io', phone: '+1 (555) 014-4920', initials: 'JN', capacity: 65, activeTasks: 5, completedTasks: 19, status: 'Active', barColor: 'bg-blue-500', badgeBg: 'bg-blue-100 text-blue-700' },
  { id: 3, name: 'Mike', role: 'Backend Developer', email: 'mike@taskpulse.io', phone: '+1 (555) 017-8821', initials: 'MK', capacity: 75, activeTasks: 7, completedTasks: 31, status: 'In Meeting', barColor: 'bg-emerald-500', badgeBg: 'bg-emerald-100 text-emerald-700' },
  { id: 4, name: 'Brian', role: 'QA / Tester', email: 'brian@taskpulse.io', phone: '+1 (555) 012-3391', initials: 'BR', capacity: 40, activeTasks: 3, completedTasks: 15, status: 'Offline', barColor: 'bg-amber-500', badgeBg: 'bg-amber-100 text-amber-700' },
];

const OVERVIEW_PROJECTS = [
  { id: 1, title: 'Inventory Management System', completedTasks: 15, totalTasks: 20, progress: 75, icon: Folder, iconBg: 'bg-blue-500', barBg: 'bg-blue-500' },
  { id: 2, title: 'Task Management System', completedTasks: 12, totalTasks: 18, progress: 67, icon: LayoutGrid, iconBg: 'bg-purple-500', barBg: 'bg-purple-500' },
  { id: 3, title: 'Website Redesign', completedTasks: 8, totalTasks: 15, progress: 53, icon: FileText, iconBg: 'bg-orange-500', barBg: 'bg-orange-500' },
  { id: 4, title: 'Mobile App Development', completedTasks: 10, totalTasks: 25, progress: 40, icon: Smartphone, iconBg: 'bg-emerald-500', barBg: 'bg-emerald-500' },
];

const PROJECTS = [
  { id: 1, name: 'TaskPulse Enterprise v2.0', progress: 68, budget: '$12,500', members: 4, status: 'Active' },
  { id: 2, name: 'Mobile App Refactor', progress: 32, budget: '$8,000', members: 3, status: 'Active' },
  { id: 3, name: 'Security Audit & Compliance', progress: 90, budget: '$5,000', members: 2, status: 'Review' },
  { id: 4, name: 'Cloud Infrastructure Migration', progress: 45, budget: '$18,000', members: 4, status: 'Active' },
  { id: 5, name: 'AI Chatbot Integration', progress: 15, budget: '$9,500', members: 3, status: 'Planning' },
];

const CHART_DATA = [
  { name: 'Mon', completed: 4, pending: 2 },
  { name: 'Tue', completed: 6, pending: 4 },
  { name: 'Wed', completed: 8, pending: 3 },
  { name: 'Thu', completed: 5, pending: 6 },
  { name: 'Fri', completed: 9, pending: 2 },
  { name: 'Sat', completed: 11, pending: 1 },
  { name: 'Sun', completed: 14, pending: 2 },
];

const WEEKS = Array.from({ length: 12 }, (_, i) => {
  const weekNum = i + 1;
  const suffix = weekNum === 1 ? 'st' : weekNum === 2 ? 'nd' : weekNum === 3 ? 'rd' : 'th';
  return `${weekNum}${suffix} Week`;
});

const NAV_ITEMS = [
  { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
  { name: 'My Tasks', id: 'tasks', icon: CheckSquare },
  { name: 'Projects', id: 'projects', icon: FolderKanban },
  { name: 'Calendar', id: 'calendar', icon: CalendarIcon },
  { name: 'Team', id: 'team', icon: Users },
  { name: 'Files', id: 'files', icon: FileText },
  { name: 'Notifications', id: 'notifications', icon: Bell },
  { name: 'Settings', id: 'settings', icon: Settings },
];

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md text-white p-2.5 rounded-lg border border-slate-700/50 shadow-xl text-[11px] space-y-1">
        <p className="font-bold text-slate-300 border-b border-slate-700/60 pb-0.5">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300 capitalize">{entry.name}:</span>
            </div>
            <span className="font-bold text-white font-mono">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PrototypePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [selectedWeek, setSelectedWeek] = useState('1st Week');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // New task form states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Frontend');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');

  // File Upload State
  const [uploadFileName, setUploadFileName] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      status: 'PENDING',
      priority: newTaskPriority,
      due: '2026-08-20',
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    const newFile = {
      id: Date.now(),
      name: uploadFileName,
      size: '1.2 MB',
      type: 'code',
      uploader: 'Elina',
      date: 'Today',
      icon: FileCode,
      color: 'text-indigo-500 bg-indigo-50',
    };

    setFiles([newFile, ...files]);
    setUploadFileName('');
  };

  const handleDeleteFile = (id: number) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus === 'ALL') return true;
    return t.status === filterStatus;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">URGENT</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200/60">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60">LOW</span>;
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
            <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} /> In Progress
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
            <AlertCircle className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const padding = 6;
    const totalDays = 31;

    for (let i = 0; i < padding; i++) {
      days.push(
        <div key={`pad-${i}`} className="min-h-[72px] p-1.5 bg-slate-50/50 border border-slate-100 text-slate-300 font-mono text-[10px]">
          {26 + i}
        </div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `2026-08-${day < 10 ? '0' + day : day}`;
      const dayEvents = CALENDAR_EVENTS.filter((e) => e.date === dateStr);
      const isToday = day === 7;

      days.push(
        <div
          key={day}
          className={`min-h-[72px] p-1.5 border border-slate-100 transition flex flex-col justify-between overflow-hidden ${
            isToday ? 'bg-indigo-50/40 ring-1 ring-indigo-500/40' : 'bg-white hover:bg-slate-50/50'
          }`}
        >
          <div className="flex justify-between items-center">
            <span
              className={`text-[10px] font-bold font-mono rounded-full w-5 h-5 flex items-center justify-center ${
                isToday ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              {day}
            </span>
          </div>

          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 2).map((evt) => (
              <div
                key={evt.id}
                className={`px-1.5 py-0.5 rounded text-[9px] font-semibold leading-tight truncate border ${
                  evt.priority === 'URGENT'
                    ? 'bg-rose-50 text-rose-700 border-rose-200/80'
                    : evt.priority === 'HIGH'
                    ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
                }`}
              >
                {evt.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <span className="text-[8px] font-bold text-slate-400 block leading-none pl-0.5">
                +{dayEvents.length - 2} more
              </span>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex h-screen w-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-[#0B132B] text-slate-400 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0 select-none h-full z-30">
        <div className="flex flex-col min-h-0">
          {/* BRAND LOGO AREA */}
          <div className="flex items-center gap-3 px-2 py-3 mb-4 shrink-0">
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-950/50">
              <Activity className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg tracking-tight">TaskPulse</h2>
              <p className="text-[10px] text-teal-400 font-bold tracking-wider uppercase">Dashboard</p>
            </div>
          </div>

          <nav className="space-y-1 overflow-y-auto pr-1 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 translate-x-1'
                      : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 shrink-0 mt-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
    EL
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-xs font-bold truncate text-white leading-tight">Elina</h4>
            <p className="text-[11px] text-slate-400 truncate">elina@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* HEADER */}
        <header className="px-8 py-3.5 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between gap-4 shrink-0 z-20">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-xs text-slate-500">Workspace Overview for the projects</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/80 w-64 focus-within:ring-2 focus-within:ring-indigo-500/20 transition">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search workspace..."
                className="bg-transparent text-xs text-slate-800 focus:outline-none w-full placeholder:text-slate-400 font-medium"
              />
            </div>

            <button className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-sm">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>

            <button className="relative p-2 text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-sm">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-500/20 transition active:scale-95"
            >
              <Plus className="w-4 h-4" /> New Task
            </button>

            {/* USER PROFILE DROPDOWN MENU */}
            <div className="relative border-l border-slate-200 pl-3">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100/80 transition"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-xs border border-purple-200 shadow-sm">
                    NV
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="text-left hidden sm:block">
                  <h4 className="text-xs font-bold text-slate-900 leading-none">Elina</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Project Manager</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DROPDOWN MENU CONTENT */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 text-xs text-slate-700">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">Elina</p>
                    <p className="text-[10px] text-slate-400 font-mono">Elina@gmail.com</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { setActiveTab('profile'); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" /> View Profile
                    </button>
                    <button
                      onClick={() => { setActiveTab('settings'); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" /> Account Settings
                    </button>
                    <button
                      onClick={() => { setActiveTab('notifications'); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition"
                    >
                      <Bell className="w-3.5 h-3.5 text-slate-400" /> Notification Preferences
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2.5 font-semibold transition"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="p-6 flex-1 overflow-y-auto min-h-0 space-y-6">
          {/* 1. CALENDAR TAB */}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden w-full max-w-5xl mx-auto">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-slate-900">August 2026</h2>
                  <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200/60">
                    <button className="p-1 text-slate-600 hover:bg-white rounded transition">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded transition">
                      Today
                    </button>
                    <button className="p-1 text-slate-600 hover:bg-white rounded transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
                    Month
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 text-slate-500 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                    Week
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 text-slate-500 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                    Day
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 mb-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>

                <div className="grid grid-cols-7 rounded-xl overflow-hidden border border-slate-200/80">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>
          )}

          {/* 2. DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* TOP STATUS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Tasks</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      {tasks.length + TASKS_DUE_THIS_WEEK.length}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Tasks</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      {tasks.filter((t) => t.status === 'PENDING').length + TASKS_DUE_THIS_WEEK.filter((t) => t.status === 'PENDING').length}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">In Progress</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      {tasks.filter((t) => t.status === 'IN_PROGRESS').length + TASKS_DUE_THIS_WEEK.filter((t) => t.status === 'IN_PROGRESS').length}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed Tasks</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      {tasks.filter((t) => t.status === 'COMPLETED').length + TASKS_DUE_THIS_WEEK.filter((t) => t.status === 'COMPLETED').length}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* GRID TOP: CHART + PROJECTS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-600" /> Task Activity Trend
                      </h3>
                    </div>

                    <div className="relative flex items-center">
                      <select
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                        className="appearance-none bg-slate-50 text-slate-700 text-xs font-bold pl-3 pr-8 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                      >
                        {WEEKS.map((week) => (
                          <option key={week} value={week}>
                            {week}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="h-60 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CHART_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E11D48" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#E11D48" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <Tooltip content={<CustomChartTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="completed"
                          name="Completed"
                          stroke="#4F46E5"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorCompleted)"
                        />
                        <Area
                          type="monotone"
                          dataKey="pending"
                          name="Pending"
                          stroke="#E11D48"
                          strokeWidth={2}
                          strokeDasharray="3 3"
                          fillOpacity={1}
                          fill="url(#colorPending)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-end gap-4 text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-50">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" /> Completed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Pending
                    </span>
                  </div>
                </div>

                {/* PROJECTS OVERVIEW */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 lg:col-span-1">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm">Projects Overview</h3>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      View all
                    </button>
                  </div>

                  <div className="space-y-4">
                    {OVERVIEW_PROJECTS.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={item.id} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg text-white ${item.iconBg}`}>
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <span className="font-bold text-slate-800 truncate max-w-[130px]">{item.title}</span>
                            </div>
                            <span className="font-mono text-slate-500 font-semibold">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.barBg}`} style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* 3. FILES TAB */}
          {activeTab === 'files' && (
            <div className="space-y-6">
              {/* FILE STATS & UPLOAD HEADER */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Storage Used</p>
                    <h3 className="text-xl font-black text-slate-900 mt-1">16.7 MB / 10 GB</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                    <HardDrive className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Files</p>
                    <h3 className="text-xl font-black text-slate-900 mt-1">{files.length}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                {/* QUICK UPLOAD FORM */}
                <form onSubmit={handleFileUpload} className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="New file name..."
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 transition shadow-xs shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload
                  </button>
                </form>
              </div>

              {/* FILES LIST TABLE */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Workspace Files & Attachments</h3>
                  <span className="text-xs text-slate-400 font-medium">{files.length} items</span>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        <th className="p-3.5 pl-5">Name</th>
                        <th className="p-3.5">Size</th>
                        <th className="p-3.5">Uploaded By</th>
                        <th className="p-3.5">Date</th>
                        <th className="p-3.5 text-right pr-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {files.map((file) => {
                        const Icon = file.icon;
                        return (
                          <tr key={file.id} className="hover:bg-slate-50/60 transition group">
                            <td className="p-3.5 pl-5 font-semibold text-slate-900 flex items-center gap-3">
                              <div className={`p-2 rounded-lg border border-slate-200/60 ${file.color} shrink-0`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="truncate max-w-xs">{file.name}</span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{file.size}</td>
                            <td className="p-3.5 font-medium whitespace-nowrap">{file.uploader}</td>
                            <td className="p-3.5 text-slate-400 whitespace-nowrap">{file.date}</td>
                            <td className="p-3.5 pr-5 text-right whitespace-nowrap space-x-2">
                              <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition">
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition">
                                <Download className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. MY TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        filterStatus === status
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{task.title}</h4>
                          {getPriorityBadge(task.priority)}
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">Category: {task.category} • Due {task.due}</p>
                      </div>
                      <div>{getStatusIndicator(task.status)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {proj.status}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-500">{proj.budget}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{proj.members} Members assigned</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-slate-900 font-mono">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. TEAM TAB */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEAM_WORKLOAD.map((member) => (
                <div key={member.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 ${member.badgeBg}`}>
                    {member.initials}
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-sm truncate">{member.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">{member.status}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate">{member.role}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className={`h-full ${member.barColor}`} style={{ width: `${member.capacity}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 7. NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 max-w-2xl mx-auto space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Recent Notifications</h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <Bell className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900">Sprint Review Scheduled</p>
                    <p className="text-slate-500">Nova added a new calendar entry for August 18th.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900">Task Completed</p>
                    <p className="text-slate-500">Jane marked 'MySQL Connection Pool' as completed.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. SETTINGS & PROFILE TAB */}
          {(activeTab === 'settings' || activeTab === 'profile') && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                  EL
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Elina Admin</h2>
                  <p className="text-xs text-slate-400 font-medium">admin@taskpulse.io • Project Director</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Account Settings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Display Name</label>
                    <input type="text" defaultValue="Elina" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Email Address</label>
                    <input type="email" defaultValue="admin@taskpulse.io" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                </div>
                <div className="pt-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-sm">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Create New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Refactor API Router"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
