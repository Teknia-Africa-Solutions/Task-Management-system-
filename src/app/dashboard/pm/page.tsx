// src/app/dashboard/pm/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  Calendar as CalendarIcon,
  FileText,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Plus,
  Search,
  Filter,
  Home,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  MoreVertical,
  Flag,
  ListTodo,
  CircleDashed,
  CircleDot,
  Circle,
  CircleCheck,
  HardDrive,
  Star,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0B5E12', '#96AF25', '#D5966C', '#4f6d7a', '#f59e0b'];

export default function PMDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Mock data for PM dashboard
  const stats = {
    totalProjects: 8,
    activeTasks: 24,
    teamMembers: 6,
    completionRate: 99.9,
    storageUsed: 256,
    storageTotal: 1024,
    projectsOnTrack: 6,
    projectsAtRisk: 2,
  };

  const projectProgress = [
    { name: 'Inventory System', progress: 75, status: 'On Track' },
    { name: 'Task Management', progress: 67, status: 'On Track' },
    { name: 'Website Redesign', progress: 53, status: 'At Risk' },
    { name: 'Mobile App', progress: 40, status: 'On Track' },
    { name: 'API Integration', progress: 30, status: 'At Risk' },
    { name: 'Database Design', progress: 85, status: 'On Track' },
    { name: 'UI Design', progress: 90, status: 'On Track' },
    { name: 'Testing Phase', progress: 25, status: 'On Track' },
  ];

  const teamMembers = [
    { name: 'Jane Doe', role: 'UI/UX Designer', tasks: 8, completed: 5, avatar: 'JD', status: 'Active' },
    { name: 'Mike Johnson', role: 'Backend Developer', tasks: 7, completed: 3, avatar: 'MJ', status: 'Active' },
    { name: 'Sarah Wilson', role: 'QA/Tester', tasks: 5, completed: 4, avatar: 'SW', status: 'Busy' },
    { name: 'David Brown', role: 'DevOps', tasks: 4, completed: 2, avatar: 'DB', status: 'Active' },
    { name: 'Emily Chen', role: 'Frontend Developer', tasks: 6, completed: 4, avatar: 'EC', status: 'Active' },
    { name: 'Nova', role: 'Project Manager', tasks: 9, completed: 7, avatar: 'NV', status: 'Active' },
  ];

  const weeklyProgress = [
    { week: 'Week 1', completed: 12, created: 8 },
    { week: 'Week 2', completed: 18, created: 12 },
    { week: 'Week 3', completed: 15, created: 10 },
    { week: 'Week 4', completed: 22, created: 14 },
  ];

  const taskCategories = [
    { name: 'Design', value: 12 },
    { name: 'Backend', value: 18 },
    { name: 'Frontend', value: 15 },
    { name: 'Testing', value: 8 },
    { name: 'DevOps', value: 5 },
  ];

  const recentActivity = [
    { user: 'Jane Doe', action: 'completed', task: 'Landing Page Design', time: '1h ago' },
    { user: 'Mike Johnson', action: 'commented on', task: 'API Integration', time: '2h ago' },
    { user: 'Sarah Wilson', action: 'completed', task: 'User Authentication', time: '3h ago' },
    { user: 'David Brown', action: 'deployed', task: 'Staging Environment', time: '4h ago' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project manager dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary text-white border-r border-primary-dark flex flex-col justify-between p-4 shrink-0 transition-all duration-300 h-screen sticky top-0 z-30`}>
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="relative p-2 rounded-lg bg-white/10 border border-white/20 text-secondary">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            {sidebarOpen && <span className="font-bold text-white text-lg">TaskFlow</span>}
          </div>

          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex mb-4 text-white/60 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          >
            <Menu className="w-4 h-4" />
          </button>

          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary text-primary">
              <LayoutDashboard className="w-4 h-4" /> {sidebarOpen && 'Dashboard'}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white">
              <FolderKanban className="w-4 h-4" /> {sidebarOpen && 'Projects'}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white">
              <Users className="w-4 h-4" /> {sidebarOpen && 'Team Members'}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white">
              <CheckSquare className="w-4 h-4" /> {sidebarOpen && 'Tasks'}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white">
              <CalendarIcon className="w-4 h-4" /> {sidebarOpen && 'Calendar'}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white">
              <BarChart3 className="w-4 h-4" /> {sidebarOpen && 'Reports'}
            </button>
            <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white">
              <Home className="w-4 h-4" /> {sidebarOpen && 'Back to App'}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20">
          <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center text-xs font-bold">
            {user?.name?.charAt(0) || 'P'}
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="text-xs font-bold text-white">{user?.name || 'PM'}</p>
              <p className="text-[10px] text-white/60">Project Manager</p>
            </div>
          )}
          <button onClick={handleLogout} className="p-1 hover:text-white transition text-white/60">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Manager Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.name}! Here's the overall status of your projects and team.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 flex-1 md:flex-none">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-transparent text-sm focus:outline-none w-full" />
            </div>
            <button className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="relative p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">4</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition">
              <Plus className="w-4 h-4" /> New Project
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Projects</p>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.totalProjects}</h3>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 2 new this month
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <FolderKanban className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Tasks</p>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.activeTasks}</h3>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 8% from last week
                </p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
                <CheckSquare className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Team Members</p>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.teamMembers}</h3>
              </div>
              <div className="p-3 rounded-xl bg-accent/10 text-accent border border-accent/20">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Project Health</p>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.completionRate}%</h3>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 5% from last month
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Activity className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-primary" /> Project Progress
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> On Track
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> At Risk
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {projectProgress.map((project) => (
                <div key={project.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'On Track' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span className="font-bold text-gray-900">{project.name}</span>
                    </div>
                    <span className="font-mono text-gray-500">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${project.status === 'On Track' ? 'bg-primary' : 'bg-rose-500'}`} style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Task Categories
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    wrapperStyle={{ fontSize: '10px', color: '#b5a69c' }}
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-200/50 hover:shadow-sm transition">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                  member.status === 'Active' ? 'bg-primary' :
                  member.status === 'Busy' ? 'bg-accent' :
                  'bg-gray-400'
                }`}>
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-500">{member.completed}/{member.tasks} tasks</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      member.status === 'Active' ? 'bg-emerald-500' :
                      member.status === 'Busy' ? 'bg-amber-500' :
                      'bg-gray-400'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}