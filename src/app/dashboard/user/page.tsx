// src/app/dashboard/user/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Eye,
  MessageSquare,
  BarChart3,
  Menu,
  ListTodo,
  Clock4,
  Sparkles,
  ArrowUpRight,
  Flag,
  Paperclip,
  Send,
  Star,
  GraduationCap,
  Code2,
  Mail,
  Phone,
  X as XIcon,
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
  Legend
} from 'recharts';

// Types
type Task = {
  id: number;
  title: string;
  category: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  due: string;
  assignee?: string;
};

type Project = {
  id: number;
  name: string;
  completedTasks: number;
  totalTasks: number;
  progress: number;
  color: string;
  icon: any;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  initials: string;
  capacity: number;
  activeTasks: number;
  completedTasks: number;
  status: 'Active' | 'In Meeting' | 'Offline' | 'Busy';
  barColor: string;
  gradient: string;
};

type UpcomingDeadline = {
  id: number;
  title: string;
  date: string;
  month: string;
  day: string;
  daysUntil: string;
};

type File = {
  id: number;
  name: string;
  size: string;
  type: string;
  uploader: string;
  date: string;
  icon: any;
  color: string;
};

// Mock Data - Updated colors to green theme
const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'UI Design for Dashboard', category: 'Design', status: 'IN_PROGRESS', priority: 'HIGH', due: '2026-05-21', assignee: 'Jane Doe' },
  { id: 2, title: 'Database Design', category: 'Backend', status: 'TODO', priority: 'MEDIUM', due: '2026-05-23', assignee: 'David Brown' },
  { id: 3, title: 'API Integration', category: 'Backend', status: 'IN_PROGRESS', priority: 'MEDIUM', due: '2026-05-24', assignee: 'Mike Johnson' },
  { id: 4, title: 'Project Documentation', category: 'Docs', status: 'TODO', priority: 'LOW', due: '2026-05-28', assignee: 'Sarah Wilson' },
  { id: 5, title: 'Client Meeting', category: 'Management', status: 'DONE', priority: 'HIGH', due: '2026-05-20', assignee: 'Nova' },
  { id: 6, title: 'Landing Page Design', category: 'Design', status: 'DONE', priority: 'HIGH', due: '2026-05-19', assignee: 'Jane Doe' },
  { id: 7, title: 'User Authentication', category: 'Backend', status: 'DONE', priority: 'URGENT', due: '2026-05-18', assignee: 'Sarah Wilson' },
  { id: 8, title: 'Fix Login Page Bug', category: 'Frontend', status: 'IN_PROGRESS', priority: 'URGENT', due: '2026-05-21', assignee: 'Mike Johnson' },
  { id: 9, title: 'Update API Documentation', category: 'Docs', status: 'TODO', priority: 'HIGH', due: '2026-05-21', assignee: 'Nova' },
  { id: 10, title: 'Deploy Staging Environment', category: 'DevOps', status: 'TODO', priority: 'MEDIUM', due: '2026-05-21', assignee: 'David Brown' },
];

const PROJECTS_DATA: Project[] = [
  { id: 1, name: 'Inventory Management System', completedTasks: 15, totalTasks: 20, progress: 75, color: '#0B5E12', icon: Folder },
  { id: 2, name: 'Task Management System', completedTasks: 12, totalTasks: 18, progress: 67, color: '#96AF25', icon: LayoutGrid },
  { id: 3, name: 'Website Redesign', completedTasks: 8, totalTasks: 15, progress: 53, color: '#D5966C', icon: FileText },
  { id: 4, name: 'Mobile App Development', completedTasks: 10, totalTasks: 25, progress: 40, color: '#4f6d7a', icon: Smartphone },
];

const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: 'Nova', role: 'Project Manager', email: 'nova@taskflow.io', phone: '+1 (555) 019-2834', initials: 'NV', capacity: 80, activeTasks: 8, completedTasks: 24, status: 'Active', barColor: 'bg-[#0B5E12]', gradient: 'from-[#0B5E12] to-[#96AF25]' },
  { id: 2, name: 'Jane Doe', role: 'UI/UX Designer', email: 'jane@taskflow.io', phone: '+1 (555) 014-4920', initials: 'JD', capacity: 65, activeTasks: 5, completedTasks: 19, status: 'Active', barColor: 'bg-[#4f6d7a]', gradient: 'from-[#4f6d7a] to-[#7a9ba8]' },
  { id: 3, name: 'Mike Johnson', role: 'Backend Developer', email: 'mike@taskflow.io', phone: '+1 (555) 017-8821', initials: 'MJ', capacity: 75, activeTasks: 7, completedTasks: 31, status: 'In Meeting', barColor: 'bg-[#8f6b5c]', gradient: 'from-[#8f6b5c] to-[#b38b7a]' },
  { id: 4, name: 'Sarah Wilson', role: 'QA / Tester', email: 'sarah@taskflow.io', phone: '+1 (555) 012-3391', initials: 'SW', capacity: 40, activeTasks: 3, completedTasks: 15, status: 'Busy', barColor: 'bg-[#D5966C]', gradient: 'from-[#D5966C] to-[#e8a48c]' },
  { id: 5, name: 'David Brown', role: 'DevOps Engineer', email: 'david@taskflow.io', phone: '+1 (555) 016-7721', initials: 'DB', capacity: 55, activeTasks: 4, completedTasks: 12, status: 'Offline', barColor: 'bg-[#a67b6b]', gradient: 'from-[#a67b6b] to-[#c4a08e]' },
  { id: 6, name: 'Emily Chen', role: 'Frontend Developer', email: 'emily@taskflow.io', phone: '+1 (555) 018-4431', initials: 'EC', capacity: 70, activeTasks: 6, completedTasks: 22, status: 'Active', barColor: 'bg-[#0B5E12]', gradient: 'from-[#0B5E12] to-[#96AF25]' },
];

const UPCOMING_DEADLINES: UpcomingDeadline[] = [
  { id: 1, title: 'Project Proposal', date: '2026-05-21', month: 'MAY', day: '21', daysUntil: 'Tomorrow' },
  { id: 2, title: 'UI Design Submission', date: '2026-05-23', month: 'MAY', day: '23', daysUntil: 'In 2 days' },
  { id: 3, title: 'Client Presentation', date: '2026-05-24', month: 'MAY', day: '24', daysUntil: 'In 3 days' },
  { id: 4, title: 'Final Report', date: '2026-05-28', month: 'MAY', day: '28', daysUntil: 'In 7 days' },
];

const CHART_DATA = [
  { name: 'Wed, May 21', completed: 18, created: 25 },
  { name: 'Thu', completed: 22, created: 18 },
  { name: 'Fri', completed: 20, created: 22 },
  { name: 'Sat', completed: 15, created: 12 },
  { name: 'Sun', completed: 10, created: 8 },
];

const WEEKLY_TREND_DATA = [
  { week: 'Week 1', completed: 12, pending: 8 },
  { week: 'Week 2', completed: 18, pending: 12 },
  { week: 'Week 3', completed: 15, pending: 10 },
  { week: 'Week 4', completed: 22, pending: 14 },
  { week: 'Week 5', completed: 28, pending: 9 },
  { week: 'Week 6', completed: 35, pending: 11 },
  { week: 'Week 7', completed: 30, pending: 15 },
  { week: 'Week 8', completed: 40, pending: 18 },
  { week: 'Week 9', completed: 45, pending: 12 },
  { week: 'Week 10', completed: 38, pending: 16 },
  { week: 'Week 11', completed: 50, pending: 20 },
  { week: 'Week 12', completed: 55, pending: 14 },
];

const NAV_ITEMS = [
  { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
  { name: 'My Tasks', id: 'tasks', icon: CheckSquare },
  { name: 'Projects', id: 'projects', icon: FolderKanban },
  { name: 'Calendar', id: 'calendar', icon: CalendarIcon },
  { name: 'Team', id: 'team', icon: Users },
  { name: 'Messages', id: 'messages', icon: MessageSquare },
  { name: 'Files', id: 'files', icon: FileText },
  { name: 'Reports', id: 'reports', icon: BarChart3 },
  { name: 'Notifications', id: 'notifications', icon: Bell },
];

const INITIAL_FILES: File[] = [
  { id: 1, name: 'Database_Schema_v2.sql', size: '2.4 MB', type: 'code', uploader: 'Mike', date: '2026-05-05', icon: FileCode, color: 'text-amber-700 bg-amber-100' },
  { id: 2, name: 'Q3_Financial_Forecast.xlsx', size: '1.8 MB', type: 'spreadsheet', uploader: 'Elina', date: '2026-05-04', icon: FileSpreadsheet, color: 'text-emerald-700 bg-emerald-100' },
  { id: 3, name: 'UI_Spec.png', size: '8.1 MB', type: 'image', uploader: 'Jane', date: '2026-05-02', icon: ImageIcon, color: 'text-indigo-700 bg-indigo-100' },
  { id: 4, name: 'API_Doc.pdf', size: '512 KB', type: 'pdf', uploader: 'Nova', date: '2026-04-29', icon: FileText, color: 'text-rose-700 bg-rose-100' },
  { id: 5, name: 'Architecture.png', size: '4.3 MB', type: 'image', uploader: 'Brian', date: '2026-04-28', icon: ImageIcon, color: 'text-indigo-700 bg-indigo-100' },
];

// Custom Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B5E12]/90 backdrop-blur-md text-white p-2.5 rounded-lg border border-[#96AF25]/50 shadow-xl text-[11px] space-y-1">
        <p className="font-bold text-white border-b border-[#96AF25]/60 pb-0.5">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill || entry.stroke }} />
              <span className="text-white capitalize">{entry.name}:</span>
            </div>
            <span className="font-bold text-white font-mono">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Design');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [files, setFiles] = useState<File[]>(INITIAL_FILES);
  const [profileView, setProfileView] = useState<'profile' | 'settings' | 'notifications' | null>(null);
  const [taskFilter, setTaskFilter] = useState<'ALL' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'>('ALL');
  const [teamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          router.replace('/login');
          return;
        }
        
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Auth error:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks', {
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const formattedTasks = result.data.map((task: any) => ({
              id: task.id,
              title: task.title,
              category: task.project?.name || 'General',
              status: task.status.toUpperCase(),
              priority: task.priority.toUpperCase(),
              due: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : 'No due date',
              assignee: task.assignee?.name || 'Unassigned',
            }));
            setTasks(formattedTasks);
          }
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const authResponse = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      
      if (!authResponse.ok) {
        alert('Please login first');
        router.replace('/login');
        return;
      }

      const newTask = {
        title: newTaskTitle,
        description: newTaskCategory,
        priority: newTaskPriority.toLowerCase(),
        dueDate: new Date().toISOString().split('T')[0],
      };

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
        credentials: 'include',
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const formattedTask = {
            id: result.data.id,
            title: result.data.title,
            category: 'General',
            status: 'TODO',
            priority: result.data.priority.toUpperCase(),
            due: result.data.dueDate ? new Date(result.data.dueDate).toISOString().split('T')[0] : 'No due date',
            assignee: 'You',
          };
          setTasks([formattedTask, ...tasks]);
          setNewTaskTitle('');
          setIsModalOpen(false);
        }
      } else if (response.status === 401) {
        alert('Session expired. Please login again.');
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Something went wrong');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
      router.replace('/');
    }
  };

  const handleProfileAction = (action: 'profile' | 'settings' | 'notifications' | 'logout') => {
    setIsProfileMenuOpen(false);
    if (action === 'logout') {
      handleLogout();
      return;
    }
    setProfileView(action);
    setActiveTab(action === 'profile' ? 'profile' : action === 'settings' ? 'settings' : 'notifications');
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: File = {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type.split('/')[0] || 'file',
        uploader: 'You',
        date: 'Today',
        icon: file.type.includes('image') ? ImageIcon : file.type.includes('pdf') ? FileText : FileCode,
        color: 'text-indigo-700 bg-indigo-100',
      };
      setFiles([newFile, ...files]);
    }
    e.target.value = '';
  };

  const handleDeleteFile = (id: number) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      URGENT: 'bg-rose-50 text-rose-600 border-rose-200/60',
      HIGH: 'bg-amber-50 text-amber-600 border-amber-200/60',
      MEDIUM: 'bg-blue-50 text-blue-600 border-blue-200/60',
      LOW: 'bg-slate-100 text-slate-600 border-slate-200/60',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[priority] || styles.LOW}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      TODO: 'bg-amber-50 text-amber-600 border-amber-200/60',
      IN_PROGRESS: 'bg-blue-50 text-blue-600 border-blue-200/60',
      REVIEW: 'bg-purple-50 text-purple-600 border-purple-200/60',
      DONE: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[status] || styles.TODO}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Active': 'bg-emerald-500',
      'In Meeting': 'bg-amber-500',
      'Busy': 'bg-rose-500',
      'Offline': 'bg-slate-400',
    };
    return colors[status] || 'bg-slate-400';
  };

  const getStatusTextColor = (status: string) => {
    const colors: Record<string, string> = {
      'Active': 'text-emerald-600 bg-emerald-50',
      'In Meeting': 'text-amber-600 bg-amber-50',
      'Busy': 'text-rose-600 bg-rose-50',
      'Offline': 'text-slate-600 bg-slate-50',
    };
    return colors[status] || 'text-slate-600 bg-slate-50';
  };

  const renderCalendarDays = () => {
    const days = [];
    const firstDay = new Date(2026, 4, 1).getDay();
    const totalDays = 31;

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 bg-gray-50/30 border border-gray-200"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday = day === 21;
      const hasEvent = day === 21 || day === 23 || day === 24 || day === 28;
      
      days.push(
        <div 
          key={day} 
          className={`h-16 p-1 border border-gray-200 transition ${
            isToday ? 'bg-[#0B5E12]/10 ring-2 ring-[#0B5E12] ring-inset' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-xs font-bold ${isToday ? 'text-[#0B5E12]' : 'text-gray-900'}`}>
              {day}
            </span>
            {hasEvent && <div className="w-1.5 h-1.5 rounded-full bg-[#0B5E12] mt-1"></div>}
          </div>
          {day === 21 && (
            <div className="mt-0.5">
              <div className="text-[8px] font-medium bg-rose-50 text-rose-600 px-1 rounded truncate">Project Proposal</div>
            </div>
          )}
          {day === 23 && (
            <div className="mt-0.5">
              <div className="text-[8px] font-medium bg-amber-50 text-amber-600 px-1 rounded truncate">UI Design</div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getFilteredTasks = () => {
    if (taskFilter === 'ALL') return tasks;
    return tasks.filter(task => task.status === taskFilter);
  };

  const filteredTasks = getFilteredTasks();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5E12] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-full bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Green Theme */}
      <aside className={`
        fixed lg:relative z-50 h-full bg-[#0B5E12] text-white border-r border-[#073D0C] 
        flex flex-col justify-between p-4 shrink-0 select-none transition-all duration-300
        ${isMobileSidebarOpen ? 'left-0' : '-left-80 lg:left-0'}
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex flex-col min-h-0">
          {/* BRAND */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-2 py-3 mb-4 shrink-0`}>
            <div className="relative p-2.5 rounded-xl bg-white/10 border border-white/20 text-[#96AF25] shadow-sm">
              <Activity className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#96AF25] animate-pulse" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="font-bold text-white text-lg tracking-tight">TaskFlow</h2>
                <p className="text-[10px] text-[#96AF25] font-bold tracking-wider uppercase">Dashboard</p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white transition"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex mb-4 text-white/60 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          >
            <Menu className="w-4 h-4" />
          </button>

          <nav className="space-y-0.5 overflow-y-auto pr-1 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#96AF25] text-[#0B5E12] shadow-md shadow-[#96AF25]/20'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B5E12]' : 'text-white/80'}`} />
                  {!sidebarCollapsed && item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Profile Section - Green Theme */}
        <div className={`flex ${sidebarCollapsed ? 'flex-col items-center gap-2' : 'items-center gap-3'} p-3 rounded-xl bg-white/10 border border-white/20 shrink-0 mt-4`}>
          <div className="w-9 h-9 rounded-lg bg-[#96AF25] text-[#0B5E12] flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-bold truncate text-white leading-tight">{user?.name || 'User'}</h4>
              <p className="text-[11px] text-white/60 truncate">{user?.email || 'user@email.com'}</p>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* HEADER - Green Theme */}
        <header className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between gap-1 sm:gap-2 shrink-0 z-20">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 flex-1">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-gray-900 tracking-tight capitalize truncate">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'tasks' && 'My Tasks'}
                {activeTab === 'projects' && 'Projects'}
                {activeTab === 'calendar' && 'Calendar'}
                {activeTab === 'team' && 'Team'}
                {activeTab === 'messages' && 'Messages'}
                {activeTab === 'files' && 'Files'}
                {activeTab === 'reports' && 'Reports'}
                {activeTab === 'notifications' && 'Notifications'}
                {activeTab === 'profile' && 'Profile'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
            {/* Search */}
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-50/80 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-[#0B5E12]/20 transition max-w-[72px] sm:max-w-[120px] md:max-w-[180px] lg:max-w-[240px]">
              <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-[10px] sm:text-xs text-gray-900 focus:outline-none w-full placeholder:text-gray-400 font-medium min-w-[40px]"
              />
            </div>

            {/* Filter */}
            <button className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition shadow-sm whitespace-nowrap">
              <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="max-[420px]:hidden text-[10px] sm:text-xs">Filter</span>
            </button>

            {/* Bell */}
            <button className="relative p-1.5 sm:p-2 text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition shadow-sm">
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[7px] sm:text-[8px] md:text-[9px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* New Task */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 rounded-xl shadow-md shadow-[#0B5E12]/20 transition active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="max-[420px]:hidden text-[10px] sm:text-xs">New</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative border-l border-gray-200 pl-0.5 sm:pl-1 md:pl-2">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="relative">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#0B5E12] text-white font-extrabold flex items-center justify-center text-[8px] sm:text-[9px] md:text-xs border border-gray-200 shadow-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="text-left hidden sm:block">
                  <h4 className="text-[10px] sm:text-xs font-bold text-gray-900 leading-none">{user?.name || 'User'}</h4>
                </div>
                <ChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 transition-transform duration-200 max-[420px]:hidden ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-1 sm:mt-2 w-44 sm:w-48 md:w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 text-xs text-gray-900">
                  <div className="px-3 sm:px-4 py-2 border-b border-gray-100">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">{user?.name || 'User'}</p>
                    <p className="text-[9px] sm:text-[10px] text-gray-500 font-mono truncate">{user?.email || 'user@email.com'}</p>
                  </div>
                  <div className="py-1">
                    <button 
                      onClick={() => handleProfileAction('profile')}
                      className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 flex items-center gap-2 sm:gap-2.5 font-medium transition text-[10px] sm:text-xs"
                    >
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" /> <span>View Profile</span>
                    </button>
                    <button 
                      onClick={() => handleProfileAction('settings')}
                      className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 flex items-center gap-2 sm:gap-2.5 font-medium transition text-[10px] sm:text-xs"
                    >
                      <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" /> <span>Account Settings</span>
                    </button>
                    <button 
                      onClick={() => handleProfileAction('notifications')}
                      className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 flex items-center gap-2 sm:gap-2.5 font-medium transition text-[10px] sm:text-xs"
                    >
                      <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" /> <span>Notifications</span>
                    </button>
                  </div>
                  <div className="border-t border-gray-100 pt-1 mt-1">
                    <button 
                      onClick={() => handleProfileAction('logout')}
                      className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 sm:gap-2.5 font-semibold transition text-[10px] sm:text-xs"
                    >
                      <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" /> <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="p-3 sm:p-4 md:p-6 flex-1 overflow-y-auto min-h-0 space-y-4 sm:space-y-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Stats Cards - Green Theme */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Tasks</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-gray-900 mt-0.5">35</h3>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-[#0B5E12]/10 text-[#0B5E12] border border-[#0B5E12]/20 shrink-0">
                      <ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400">Pending</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-gray-900 mt-0.5">14</h3>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400">In Progress</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-gray-900 mt-0.5">11</h3>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400">Completed</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-gray-900 mt-0.5">10</h3>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart + Deadlines */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-3 mb-4 gap-2">
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#0B5E12]" /> Task Overview
                    </h3>
                    <div className="flex items-center gap-3 text-xs flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0B5E12]" /> Completed
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#96AF25]" /> Created
                      </span>
                    </div>
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ece8" />
                        <XAxis dataKey="name" stroke="#b5a69c" fontSize={10} tickLine={false} />
                        <YAxis stroke="#b5a69c" fontSize={10} tickLine={false} />
                        <Tooltip content={<CustomChartTooltip />} />
                        <Bar dataKey="completed" fill="#0B5E12" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="created" fill="#96AF25" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#0B5E12]" /> Deadlines
                  </h3>
                  <div className="space-y-3">
                    {UPCOMING_DEADLINES.map((deadline) => (
                      <div key={deadline.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0B5E12]/10 text-[#0B5E12] flex flex-col items-center justify-center shrink-0">
                          <span className="text-[8px] sm:text-[9px] font-bold">{deadline.month}</span>
                          <span className="text-sm sm:text-base font-black">{deadline.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{deadline.title}</p>
                          <p className="text-[10px] text-gray-500 font-medium">{deadline.daysUntil}</p>
                        </div>
                        <Flag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tasks Due Today + Team Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                    <Clock4 className="w-4 h-4 text-[#0B5E12]" /> Due Today
                  </h3>
                  <div className="space-y-3">
                    {tasks.filter(t => t.due === '2026-05-21').map((task) => (
                      <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition gap-2">
                        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                          <div className={`w-1.5 h-8 rounded-full shrink-0 ${task.priority === 'HIGH' ? 'bg-amber-500' : task.priority === 'URGENT' ? 'bg-rose-500' : 'bg-blue-400'}`}></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-gray-900 truncate">{task.title}</p>
                            <p className="text-[10px] text-gray-500">{task.category}</p>
                          </div>
                        </div>
                        <div className="shrink-0">{getPriorityBadge(task.priority)}</div>
                      </div>
                    ))}
                    {tasks.filter(t => t.due === '2026-05-21').length === 0 && (
                      <p className="text-xs text-gray-500 text-center py-4">No tasks due today 🎉</p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0B5E12]" /> Team Activity
                  </h3>
                  <div className="space-y-3">
                    {teamMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm`}>
                          {member.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-900 truncate">
                            <span className="font-bold">{member.name}</span>
                            <span className="text-gray-500"> • {member.role}</span>
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">{member.email}</p>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold inline-block ${getStatusTextColor(member.status)}`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Overview */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-[#0B5E12]" /> Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {PROJECTS_DATA.map((project) => {
                    const Icon = project.icon;
                    return (
                      <div key={project.id} className="p-3 rounded-xl border border-gray-200 hover:shadow-md transition">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-lg text-white shrink-0`} style={{ backgroundColor: project.color }}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-gray-900 truncate flex-1">{project.name}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-1.5">{project.completedTasks} / {project.totalTasks} tasks</p>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                        </div>
                        <p className="text-[10px] font-bold mt-1" style={{ color: project.color }}>{project.progress}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tasks view */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {['ALL', 'TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setTaskFilter(status as any)}
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[9px] sm:text-[10px] md:text-xs font-semibold transition ${
                        taskFilter === status
                          ? 'bg-[#0B5E12] text-white shadow-xs'
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 rounded-xl transition w-full sm:w-auto justify-center"
                >
                  <Plus className="w-3.5 h-3.5" /> New Task
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {filteredTasks.length === 0 ? (
                    <div className="p-8 text-center text-sm text-gray-500">
                      No tasks found in this category
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div key={task.id} className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 transition gap-3">
                        <div className="space-y-1 w-full sm:w-auto">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-gray-900">{task.title}</h4>
                            {getPriorityBadge(task.priority)}
                            {getStatusBadge(task.status)}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium truncate">
                            Category: {task.category} • Due {task.due} • Assignee: {task.assignee || 'Unassigned'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button className="p-1.5 text-gray-400 hover:text-[#0B5E12] rounded-lg hover:bg-gray-50 transition">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-gray-50 transition">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Projects view */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {PROJECTS_DATA.map((project) => {
                const Icon = project.icon;
                return (
                  <div key={project.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl text-white shrink-0`} style={{ backgroundColor: project.color }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-gray-900 truncate">{project.name}</h3>
                        <p className="text-xs text-gray-500">{project.completedTasks} / {project.totalTasks} tasks</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-900 font-mono">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                      </div>
                    </div>
                    <button className="w-full py-1.5 text-xs font-semibold text-white rounded-xl transition" style={{ backgroundColor: project.color }}>
                      View Project
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Calendar view */}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-full max-w-5xl mx-auto">
              <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">May 2026</h2>
                  <div className="flex items-center bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                    <button className="p-1 text-gray-900 hover:bg-white rounded transition">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-white bg-[#0B5E12] rounded transition">
                      Today
                    </button>
                    <button className="p-1 text-gray-900 hover:bg-white rounded transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 bg-[#0B5E12]/10 text-[#0B5E12] rounded-lg border border-[#0B5E12]/20">Month</span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-gray-500 hover:bg-gray-50 rounded-lg transition cursor-pointer">Week</span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-gray-500 hover:bg-gray-50 rounded-lg transition cursor-pointer">Day</span>
                </div>
              </div>
              <div className="p-2 sm:p-4 overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-7 mb-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  <div className="grid grid-cols-7 rounded-xl overflow-hidden border border-gray-200">
                    {renderCalendarDays()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team view */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center font-extrabold text-lg sm:text-xl text-white shadow-md shrink-0 mx-auto sm:mx-0`}>
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <h3 className="font-bold text-gray-900 text-base">{member.name}</h3>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getStatusTextColor(member.status)} border ${member.status === 'Active' ? 'border-emerald-200' : member.status === 'In Meeting' ? 'border-amber-200' : member.status === 'Busy' ? 'border-rose-200' : 'border-slate-200'} shrink-0`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${getStatusColor(member.status)} mr-1 animate-pulse`}></span>
                          {member.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#0B5E12]">{member.role}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 truncate">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-xs sm:text-sm">{member.phone}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Capacity</span>
                          <span className="font-bold text-gray-900">{member.capacity}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${member.barColor}`} style={{ width: `${member.capacity}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-4 mt-2 text-xs">
                        <div>
                          <span className="text-gray-500">Active Tasks</span>
                          <p className="font-bold text-gray-900">{member.activeTasks}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Completed</span>
                          <p className="font-bold text-gray-900">{member.completedTasks}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Files view */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Files</p>
                    <h3 className="text-xl font-black text-gray-900">{files.length}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B5E12]/10 text-[#0B5E12] border border-[#0B5E12]/20 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button 
                    onClick={handleFileUpload}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 rounded-xl transition shadow-sm w-full sm:w-auto"
                  >
                    <Upload className="w-4 h-4" /> Upload File
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-sm">Workspace Files</h3>
                  <span className="text-xs text-gray-500 font-medium">{files.length} items</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px] sm:min-w-[500px]">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-200 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        <th className="p-2 sm:p-3.5 pl-3 sm:pl-5">Name</th>
                        <th className="p-2 sm:p-3.5 hidden sm:table-cell">Size</th>
                        <th className="p-2 sm:p-3.5 hidden md:table-cell">Uploaded By</th>
                        <th className="p-2 sm:p-3.5 pr-3 sm:pr-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-900">
                      {files.map((file) => {
                        const Icon = file.icon;
                        return (
                          <tr key={file.id} className="hover:bg-gray-50 transition group">
                            <td className="p-2 sm:p-3.5 pl-3 sm:pl-5 font-semibold flex items-center gap-2 sm:gap-3 min-w-[120px]">
                              <div className={`p-1.5 sm:p-2 rounded-lg border border-gray-200 ${file.color} shrink-0`}>
                                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                              </div>
                              <span className="truncate max-w-[80px] sm:max-w-xs">{file.name}</span>
                            </td>
                            <td className="p-2 sm:p-3.5 font-mono text-gray-500 hidden sm:table-cell">{file.size}</td>
                            <td className="p-2 sm:p-3.5 font-medium hidden md:table-cell">{file.uploader}</td>
                            <td className="p-2 sm:p-3.5 pr-3 sm:pr-5 text-right space-x-1 sm:space-x-2 whitespace-nowrap">
                              <button className="p-1 sm:p-1.5 text-gray-400 hover:text-[#0B5E12] rounded-lg hover:bg-gray-50 transition">
                                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteFile(file.id)}
                                className="p-1 sm:p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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

          {/* Reports view */}
          {activeTab === 'reports' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400">Completion Rate</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">87%</h3>
                  <p className="text-xs text-emerald-600">↑ 12% from last month</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400">Avg. Task Duration</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">2.4d</h3>
                  <p className="text-xs text-emerald-600">↓ 8% from last month</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400">Productivity</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">92%</h3>
                  <p className="text-xs text-emerald-600">↑ 5% from last month</p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-3 mb-4 gap-2">
                  <h3 className="font-bold text-gray-900 text-sm">Task Completion & Pending Trend</h3>
                  <div className="flex items-center gap-4 text-xs flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 rounded-full bg-[#0B5E12]"></span>
                      <span className="text-gray-500">Completed</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 rounded-full bg-[#96AF25]"></span>
                      <span className="text-gray-500">Pending</span>
                    </span>
                  </div>
                </div>
                <div className="h-56 sm:h-64 md:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={WEEKLY_TREND_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ece8" />
                      <XAxis dataKey="week" stroke="#b5a69c" fontSize={10} tickLine={false} />
                      <YAxis stroke="#b5a69c" fontSize={10} tickLine={false} />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Legend 
                        wrapperStyle={{ fontSize: '10px', color: '#b5a69c' }}
                        iconType="circle"
                        iconSize={8}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="completed" 
                        stroke="#0B5E12" 
                        strokeWidth={2.5}
                        dot={{ fill: '#0B5E12', r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pending" 
                        stroke="#96AF25" 
                        strokeWidth={2.5}
                        strokeDasharray="5 5"
                        dot={{ fill: '#96AF25', r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Profile view */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-gray-100 pb-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0B5E12] to-[#96AF25] text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-[#0B5E12]/20 shrink-0">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-sm text-gray-500 font-medium">{user?.role || 'User'}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">Active</span>
                    <span className="text-xs text-gray-500">Joined Jan 2026</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.email || 'user@email.com'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Role</p>
                    <p className="text-sm font-medium text-gray-900">{user?.role || 'User'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 bg-[#0B5E12] text-white font-semibold rounded-xl hover:bg-[#0B5E12]/90 transition shadow-sm"
                  >
                    Back to Dashboard
                  </button>
                  <button 
                    onClick={() => handleProfileAction('settings')}
                    className="px-4 py-2 font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings view */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 max-w-2xl mx-auto">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-sm text-gray-900">Display Name</label>
                    <input type="text" defaultValue={user?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-sm text-gray-900">Email Address</label>
                    <input type="email" defaultValue={user?.email || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-sm text-gray-900">Time Zone</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-sm text-gray-900">Language</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-[#0B5E12] text-white font-semibold rounded-xl hover:bg-[#0B5E12]/90 transition shadow-sm">
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications view */}
          {activeTab === 'notifications' && !profileView && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 max-w-2xl mx-auto space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#0B5E12]" /> Recent Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-[#0B5E12]/5 rounded-xl border border-[#0B5E12]/10">
                  <Sparkles className="w-4 h-4 text-[#0B5E12] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="font-bold text-gray-900">Sprint Review Scheduled</p>
                    <p className="text-gray-500">Nova added a new calendar entry for May 21st.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="font-bold text-gray-900">Task Completed</p>
                    <p className="text-gray-500">Jane marked 'Landing Page Design' as completed.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="font-bold text-gray-900">Upcoming Deadline</p>
                    <p className="text-gray-500">Project Proposal is due tomorrow!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-4 sm:p-6 space-y-4 animate-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Create New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-gray-900">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Refactor API Router"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-900">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20"
                  >
                    <option value="Design">Design</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Database">Database</option>
                    <option value="Management">Management</option>
                    <option value="Docs">Docs</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-900">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 font-semibold text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 rounded-xl shadow-md shadow-[#0B5E12]/20 transition"
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