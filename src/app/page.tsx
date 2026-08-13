// app/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Eye,
  MessageSquare,
  BarChart3,
  Menu,
  ListTodo,
  CircleDashed,
  CircleDot,
  Circle,
  CircleCheck,
  Clock4,
  Sparkles,
  ArrowUpRight,
  Flag,
  MoreVertical,
  Paperclip,
  Send,
  Star,
  Check,
  ArrowRight,
  GraduationCap,
  Code2,
  Users2,
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
  AreaChart,
  Area,
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
  created_at?: string;
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
  badgeBg: string;
  gradient: string;
  iconBg: string;
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

// Mock Data
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
  { id: 1, name: 'Inventory Management System', completedTasks: 15, totalTasks: 20, progress: 75, color: '#b35c44', icon: Folder },
  { id: 2, name: 'Task Management System', completedTasks: 12, totalTasks: 18, progress: 67, color: '#8f6b5c', icon: LayoutGrid },
  { id: 3, name: 'Website Redesign', completedTasks: 8, totalTasks: 15, progress: 53, color: '#d4846a', icon: FileText },
  { id: 4, name: 'Mobile App Development', completedTasks: 10, totalTasks: 25, progress: 40, color: '#4f6d7a', icon: Smartphone },
];

const TEAM_MEMBERS: TeamMember[] = [
  { 
    id: 1, 
    name: 'Nova', 
    role: 'Project Manager', 
    email: 'nova@taskflow.io', 
    phone: '+1 (555) 019-2834', 
    initials: 'NV', 
    capacity: 80, 
    activeTasks: 8, 
    completedTasks: 24, 
    status: 'Active',
    barColor: 'bg-gradient-to-r from-[#b35c44] to-[#d4846a]',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    gradient: 'bg-gradient-to-br from-[#b35c44] to-[#d4846a]',
    iconBg: 'bg-[#b35c44]/10'
  },
  { 
    id: 2, 
    name: 'Jane Doe', 
    role: 'UI/UX Designer', 
    email: 'jane@taskflow.io', 
    phone: '+1 (555) 014-4920', 
    initials: 'JD', 
    capacity: 65, 
    activeTasks: 5, 
    completedTasks: 19, 
    status: 'Active',
    barColor: 'bg-gradient-to-r from-[#4f6d7a] to-[#7a9ba8]',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    gradient: 'bg-gradient-to-br from-[#4f6d7a] to-[#7a9ba8]',
    iconBg: 'bg-[#4f6d7a]/10'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    role: 'Backend Developer', 
    email: 'mike@taskflow.io', 
    phone: '+1 (555) 017-8821', 
    initials: 'MJ', 
    capacity: 75, 
    activeTasks: 7, 
    completedTasks: 31, 
    status: 'In Meeting',
    barColor: 'bg-gradient-to-r from-[#8f6b5c] to-[#b38b7a]',
    badgeBg: 'bg-amber-100 text-amber-700',
    gradient: 'bg-gradient-to-br from-[#8f6b5c] to-[#b38b7a]',
    iconBg: 'bg-[#8f6b5c]/10'
  },
  { 
    id: 4, 
    name: 'Sarah Wilson', 
    role: 'QA / Tester', 
    email: 'sarah@taskflow.io', 
    phone: '+1 (555) 012-3391', 
    initials: 'SW', 
    capacity: 40, 
    activeTasks: 3, 
    completedTasks: 15, 
    status: 'Busy',
    barColor: 'bg-gradient-to-r from-[#d4846a] to-[#e8a48c]',
    badgeBg: 'bg-rose-100 text-rose-700',
    gradient: 'bg-gradient-to-br from-[#d4846a] to-[#e8a48c]',
    iconBg: 'bg-[#d4846a]/10'
  },
  { 
    id: 5, 
    name: 'David Brown', 
    role: 'DevOps Engineer', 
    email: 'david@taskflow.io', 
    phone: '+1 (555) 016-7721', 
    initials: 'DB', 
    capacity: 55, 
    activeTasks: 4, 
    completedTasks: 12, 
    status: 'Offline',
    barColor: 'bg-gradient-to-r from-[#a67b6b] to-[#c4a08e]',
    badgeBg: 'bg-slate-100 text-slate-700',
    gradient: 'bg-gradient-to-br from-[#a67b6b] to-[#c4a08e]',
    iconBg: 'bg-[#a67b6b]/10'
  },
  { 
    id: 6, 
    name: 'Emily Chen', 
    role: 'Frontend Developer', 
    email: 'emily@taskflow.io', 
    phone: '+1 (555) 018-4431', 
    initials: 'EC', 
    capacity: 70, 
    activeTasks: 6, 
    completedTasks: 22, 
    status: 'Active',
    barColor: 'bg-gradient-to-r from-[#b35c44] to-[#d4846a]',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    gradient: 'bg-gradient-to-br from-[#b35c44] to-[#d4846a]',
    iconBg: 'bg-[#b35c44]/10'
  },
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

// Weekly trend data for line chart
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

// Student Team Data
const STUDENT_TEAM = [
  { name: 'Alex Chen', role: 'Frontend Lead', avatar: 'AC', color: 'bg-[#b35c44]' },
  { name: 'Maria Rodriguez', role: 'Backend Developer', avatar: 'MR', color: 'bg-[#8f6b5c]' },
  { name: 'James Kim', role: 'UI/UX Designer', avatar: 'JK', color: 'bg-[#d4846a]' },
  { name: 'Sarah Patel', role: 'Project Manager', avatar: 'SP', color: 'bg-[#4f6d7a]' },
  { name: 'Tom Wilson', role: 'Full Stack Developer', avatar: 'TW', color: 'bg-[#b38b7a]' },
  { name: 'Emily Davis', role: 'QA Engineer', avatar: 'ED', color: 'bg-[#a67b6b]' },
];

// Custom Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2d231e]/90 backdrop-blur-md text-white p-2.5 rounded-lg border border-[#5a4a42]/50 shadow-xl text-[11px] space-y-1">
        <p className="font-bold text-[#d6c9c2] border-b border-[#5a4a42]/60 pb-0.5">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill || entry.stroke }} />
              <span className="text-[#d6c9c2] capitalize">{entry.name}:</span>
            </div>
            <span className="font-bold text-white font-mono">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Home() {
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Design');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [files, setFiles] = useState<File[]>(INITIAL_FILES);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileView, setProfileView] = useState<'profile' | 'settings' | 'notifications' | null>(null);
  const [taskFilter, setTaskFilter] = useState<'ALL' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'>('ALL');
  const [teamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileSidebarOpen && !target.closest('aside') && !target.closest('button')) {
        setIsMobileSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileSidebarOpen]);

  // Fetch tasks from MySQL API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setTasks(data);
          }
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      title: newTaskTitle,
      category: newTaskCategory,
      status: 'TODO',
      priority: newTaskPriority,
      due: new Date().toISOString().split('T')[0],
      assignee: 'You',
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const createdTask = await response.json();
        setTasks([createdTask, ...tasks]);
        setNewTaskTitle('');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
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
      days.push(<div key={`empty-${i}`} className="h-16 bg-[#f5f0ec]/30 border border-[#e5ddd8]"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday = day === 21;
      const hasEvent = day === 21 || day === 23 || day === 24 || day === 28;
      
      days.push(
        <div 
          key={day} 
          className={`h-16 p-1 border border-[#e5ddd8] transition ${
            isToday ? 'bg-[#f0e4dc] ring-2 ring-[#b35c44] ring-inset' : 'bg-white hover:bg-[#faf6f3]'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-xs font-bold ${isToday ? 'text-[#b35c44]' : 'text-[#2d231e]'}`}>
              {day}
            </span>
            {hasEvent && <div className="w-1.5 h-1.5 rounded-full bg-[#b35c44] mt-1"></div>}
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

  // Handle profile menu actions
  const handleProfileAction = (action: 'profile' | 'settings' | 'notifications' | 'logout') => {
    setIsProfileMenuOpen(false);
    if (action === 'logout') {
      setIsLandingPage(true);
      return;
    }
    setProfileView(action);
    setActiveTab(action === 'profile' ? 'profile' : action === 'settings' ? 'settings' : 'notifications');
  };

  // Filter tasks based on selected status
  const getFilteredTasks = () => {
    if (taskFilter === 'ALL') return tasks;
    return tasks.filter(task => task.status === taskFilter);
  };

  const filteredTasks = getFilteredTasks();

  // Landing Page
  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f7f2ee] to-white">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#e5ddd8]/80 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-[#b35c44]/20 to-[#8f6b5c]/20 border border-[#b35c44]/30 text-[#d4846a]">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-[#2d231e]">TaskFlow</span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <button 
                  onClick={() => setIsLandingPage(false)}
                  className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#b35c44] to-[#8f6b5c] rounded-xl hover:shadow-lg transition flex items-center gap-2"
                >
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[#f5f0ec] transition"
              >
                <Menu className="w-5 h-5 text-[#2d231e]" />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-[#e5ddd8]/80 p-4 space-y-3">
              <button 
                onClick={() => setIsLandingPage(false)}
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#b35c44] to-[#8f6b5c] rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0e4dc] text-[#8f6b5c] text-xs font-semibold mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Student Development Team
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2d231e] leading-tight mb-6">
                  Manage Projects & 
                  <span className="text-[#b35c44]"> Tasks Together</span>
                </h1>
                <p className="text-lg text-[#6b5a4e] mb-8 max-w-lg">
                  A collaborative platform for student teams to manage projects, track tasks, 
                  and build amazing software together. From idea to deployment, we've got you covered.
                </p>
                <div className="flex items-center gap-6 mt-8">
                  <div className="flex -space-x-2">
                    {STUDENT_TEAM.slice(0, 5).map((member, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${member.color}`}>
                        {member.avatar}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-[#f0e4dc] border-2 border-white flex items-center justify-center text-xs font-bold text-[#8f6b5c]">
                      +{STUDENT_TEAM.length - 5}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#6b5a4e]">6 passionate students</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border border-[#e5ddd8] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#b35c44]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#d4846a]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#8f6b5c]"></div>
                    </div>
                    <span className="text-xs text-[#6b5a4e]">Student Team Workspace</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {STUDENT_TEAM.slice(0, 4).map((member, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-[#f5f0ec] rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${member.color}`}>
                          {member.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#2d231e] truncate">{member.name}</p>
                          <p className="text-[8px] text-[#6b5a4e] truncate">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#f0e4dc]/30 rounded-xl border border-[#e5d5cb]/60">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#b35c44]" />
                      <span className="text-xs font-semibold text-[#2d231e]">Current Sprint</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs text-[#6b5a4e]">6 active tasks</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#e5ddd8] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#b35c44]" />
                      <span className="text-xs text-[#6b5a4e]">Software Engineering Class</span>
                    </div>
                    <span className="text-xs font-semibold text-[#b35c44]">Spring 2026</span>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#b35c44]/10 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#8f6b5c]/10 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Simplified Footer */}
        <footer className="bg-[#1f1814] text-[#b5a69c] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-[#b35c44]/20 to-[#8f6b5c]/20 border border-[#b35c44]/30 text-[#d4846a]">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="font-bold text-white">TaskFlow</span>
              </div>
              <p className="text-sm text-[#b5a69c] text-center">Student development team workspace.</p>
            </div>
            <div className="border-t border-[#3a2d26] mt-8 pt-8 text-center text-sm text-[#6b5a4e]">
              © 2026 TaskFlow. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Dashboard App - Fully Responsive with Working Profile on Mobile
  return (
    <div className="flex h-screen w-screen bg-[#f7f2ee] text-[#2d231e] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Responsive */}
      <aside className={`
        fixed lg:relative z-50 h-full bg-[#1f1814] text-[#b5a69c] border-r border-[#3a2d26] 
        flex flex-col justify-between p-4 shrink-0 select-none transition-all duration-300
        ${isMobileSidebarOpen ? 'left-0' : '-left-80 lg:left-0'}
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex flex-col min-h-0">
          {/* BRAND */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-2 py-3 mb-4 shrink-0`}>
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-[#b35c44]/20 to-[#8f6b5c]/20 border border-[#b35c44]/30 text-[#d4846a] shadow-sm shadow-[#b35c44]/10">
              <Activity className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#d4846a] animate-pulse" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="font-bold text-white text-lg tracking-tight">TaskFlow</h2>
                <p className="text-[10px] text-[#d4846a] font-bold tracking-wider uppercase">Dashboard</p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-[#b5a69c] hover:text-white transition"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex mb-4 text-[#b5a69c] hover:text-white transition p-1 rounded-lg hover:bg-[#2d231e]/50"
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
                      ? 'bg-gradient-to-r from-[#b35c44] to-[#8f6b5c] text-white shadow-md shadow-[#b35c44]/20'
                      : 'text-[#b5a69c] hover:bg-[#2d231e]/80 hover:text-[#e5ddd8]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#b5a69c]'}`} />
                  {!sidebarCollapsed && item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`flex ${sidebarCollapsed ? 'flex-col items-center gap-2' : 'items-center gap-3'} p-3 rounded-xl bg-[#2d231e]/90 border border-[#3a2d26] shrink-0 mt-4`}>
          <div className="w-9 h-9 rounded-lg bg-[#b35c44] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
            NV
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-bold truncate text-white leading-tight">Nova</h4>
              <p className="text-[11px] text-[#b5a69c] truncate">nova@gmail.com</p>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
       {/* HEADER - Responsive with all buttons visible */}
<header className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 border-b border-[#e5ddd8]/80 bg-white/80 backdrop-blur-md flex items-center justify-between gap-1 sm:gap-2 shrink-0 z-20">
  {/* Left side - Hamburger + Title */}
  <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 flex-1">
    <button
      onClick={() => setIsMobileSidebarOpen(true)}
      className="lg:hidden p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-[#2d231e] hover:bg-[#f5f0ec] rounded-lg transition"
    >
      <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
    <div className="min-w-0 flex-1">
      <h1 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-[#2d231e] tracking-tight capitalize truncate">
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
      {activeTab === 'dashboard' && (
        <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#b5a69c] truncate hidden xs:block">Here&apos;s what your tasks look like:</p>
      )}
    </div>
  </div>

  {/* Right side - All buttons visible on mobile */}
  <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
    {/* Search - Visible on all screen sizes */}
    <div className="flex items-center gap-1 sm:gap-2 bg-[#f5f0ec]/80 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-xl border border-[#e5ddd8]/80 focus-within:ring-2 focus-within:ring-[#b35c44]/20 transition max-w-[80px] xs:max-w-[100px] sm:max-w-[120px] md:max-w-[180px] lg:max-w-[240px]">
      <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b5a69c] shrink-0" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-[10px] sm:text-xs text-[#2d231e] focus:outline-none w-full placeholder:text-[#b5a69c] font-medium min-w-[40px]"
      />
    </div>

    {/* Filter - Visible on all screen sizes */}
    <button className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-[#2d231e] bg-white hover:bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl transition shadow-sm whitespace-nowrap">
      <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      <span className="hidden xs:inline text-[10px] sm:text-xs">Filter</span>
    </button>

    {/* Bell */}
    <button className="relative p-1.5 sm:p-2 text-[#2d231e] bg-white hover:bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl transition shadow-sm">
      <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[7px] sm:text-[8px] md:text-[9px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-pulse">
        3
      </span>
    </button>

    {/* New Task - Visible on all screen sizes */}
    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#b35c44] to-[#8f6b5c] hover:from-[#a04f3a] hover:to-[#7a5d4f] rounded-xl shadow-md shadow-[#b35c44]/20 transition active:scale-95 whitespace-nowrap"
    >
      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      <span className="hidden xs:inline text-[10px] sm:text-xs">New</span>
    </button>

    {/* Profile Dropdown - Works on Mobile */}
    <div className="relative border-l border-[#e5ddd8] pl-0.5 sm:pl-1 md:pl-2">
      <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-xl hover:bg-[#f5f0ec]/80 transition"
      >
        <div className="relative">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#f0e4dc] text-[#8f6b5c] font-extrabold flex items-center justify-center text-[8px] sm:text-[9px] md:text-xs border border-[#e5d5cb] shadow-sm">
            NV
          </div>
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="text-left hidden sm:block">
          <h4 className="text-[10px] sm:text-xs font-bold text-[#2d231e] leading-none">Nova</h4>
          <p className="text-[8px] sm:text-[10px] text-[#b5a69c] font-medium mt-0.5 hidden md:block">Project Manager</p>
        </div>
        <ChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#b5a69c] transition-transform duration-200 hidden xs:block ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Profile Dropdown Menu - Fully Responsive */}
      {isProfileMenuOpen && (
        <div className="absolute right-0 mt-1 sm:mt-2 w-44 sm:w-48 md:w-56 bg-white rounded-2xl shadow-xl border border-[#e5ddd8]/80 py-2 z-50 text-xs text-[#2d231e]">
          <div className="px-3 sm:px-4 py-2 border-b border-[#f5f0ec]">
            <p className="font-bold text-[#2d231e] text-xs sm:text-sm">Nova</p>
            <p className="text-[9px] sm:text-[10px] text-[#b5a69c] font-mono truncate">nova@gmail.com</p>
          </div>
          <div className="py-1">
            <button 
              onClick={() => handleProfileAction('profile')}
              className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-[#f5f0ec] flex items-center gap-2 sm:gap-2.5 font-medium transition text-[10px] sm:text-xs"
            >
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b5a69c]" /> <span>View Profile</span>
            </button>
            <button 
              onClick={() => handleProfileAction('settings')}
              className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-[#f5f0ec] flex items-center gap-2 sm:gap-2.5 font-medium transition text-[10px] sm:text-xs"
            >
              <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b5a69c]" /> <span>Account Settings</span>
            </button>
            <button 
              onClick={() => handleProfileAction('notifications')}
              className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-[#f5f0ec] flex items-center gap-2 sm:gap-2.5 font-medium transition text-[10px] sm:text-xs"
            >
              <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b5a69c]" /> <span>Notifications</span>
            </button>
          </div>
          <div className="border-t border-[#f5f0ec] pt-1 mt-1">
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

        {/* MAIN CONTENT - Responsive */}
        <main className="p-3 sm:p-4 md:p-6 flex-1 overflow-y-auto min-h-0 space-y-4 sm:space-y-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Stats Cards - 2 columns on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">Total Tasks</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-[#2d231e] mt-0.5">35</h3>
                      <p className="text-[8px] sm:text-[9px] md:text-xs text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 12%
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-[#f0e4dc] text-[#8f6b5c] border border-[#e5d5cb] shrink-0">
                      <ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">Pending</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-[#2d231e] mt-0.5">14</h3>
                      <p className="text-[8px] sm:text-[9px] md:text-xs text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 5%
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">In Progress</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-[#2d231e] mt-0.5">11</h3>
                      <p className="text-[8px] sm:text-[9px] md:text-xs text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 8%
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">Completed</p>
                      <h3 className="text-base sm:text-lg md:text-2xl font-black text-[#2d231e] mt-0.5">10</h3>
                      <p className="text-[8px] sm:text-[9px] md:text-xs text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 20%
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart + Deadlines - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm lg:col-span-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#f5f0ec] pb-3 mb-4 gap-2">
                    <h3 className="font-bold text-[#2d231e] text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#b35c44]" /> Task Overview
                    </h3>
                    <div className="flex items-center gap-3 text-xs flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#b35c44]" /> Completed
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#d4846a]" /> Created
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
                        <Bar dataKey="completed" fill="#b35c44" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="created" fill="#d4846a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                  <h3 className="font-bold text-[#2d231e] text-sm border-b border-[#f5f0ec] pb-3 mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#b35c44]" /> Deadlines
                  </h3>
                  <div className="space-y-3">
                    {UPCOMING_DEADLINES.map((deadline) => (
                      <div key={deadline.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f5f0ec]/50 transition">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f0e4dc] text-[#8f6b5c] flex flex-col items-center justify-center shrink-0">
                          <span className="text-[8px] sm:text-[9px] font-bold">{deadline.month}</span>
                          <span className="text-sm sm:text-base font-black">{deadline.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#2d231e] truncate">{deadline.title}</p>
                          <p className="text-[10px] text-[#b5a69c] font-medium">{deadline.daysUntil}</p>
                        </div>
                        <Flag className="w-3.5 h-3.5 text-[#b5a69c] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tasks Due Today + Team Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                  <h3 className="font-bold text-[#2d231e] text-sm border-b border-[#f5f0ec] pb-3 mb-4 flex items-center gap-2">
                    <Clock4 className="w-4 h-4 text-[#b35c44]" /> Due Today
                  </h3>
                  <div className="space-y-3">
                    {tasks.filter(t => t.due === '2026-05-21').map((task) => (
                      <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded-xl hover:bg-[#f5f0ec]/50 transition gap-2">
                        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                          <div className={`w-1.5 h-8 rounded-full shrink-0 ${task.priority === 'HIGH' ? 'bg-amber-500' : task.priority === 'URGENT' ? 'bg-rose-500' : 'bg-blue-400'}`}></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#2d231e] truncate">{task.title}</p>
                            <p className="text-[10px] text-[#b5a69c]">{task.category}</p>
                          </div>
                        </div>
                        <div className="shrink-0">{getPriorityBadge(task.priority)}</div>
                      </div>
                    ))}
                    {tasks.filter(t => t.due === '2026-05-21').length === 0 && (
                      <p className="text-xs text-[#b5a69c] text-center py-4">No tasks due today 🎉</p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                  <h3 className="font-bold text-[#2d231e] text-sm border-b border-[#f5f0ec] pb-3 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#b35c44]" /> Team Activity
                  </h3>
                  <div className="space-y-3">
                    {teamMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#f5f0ec]/50 transition">
                        <div className={`w-8 h-8 rounded-full ${member.gradient} flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm`}>
                          {member.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#2d231e] truncate">
                            <span className="font-bold">{member.name}</span>
                            <span className="text-[#b5a69c]"> • {member.role}</span>
                          </p>
                          <p className="text-[10px] text-[#b5a69c] truncate">{member.email}</p>
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
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                <h3 className="font-bold text-[#2d231e] text-sm border-b border-[#f5f0ec] pb-3 mb-4 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-[#b35c44]" /> Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {PROJECTS_DATA.map((project) => {
                    const Icon = project.icon;
                    return (
                      <div key={project.id} className="p-3 rounded-xl border border-[#e5ddd8]/60 hover:shadow-md transition">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-lg text-white shrink-0`} style={{ backgroundColor: project.color }}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-[#2d231e] truncate flex-1">{project.name}</span>
                        </div>
                        <p className="text-[11px] text-[#b5a69c] mb-1.5">{project.completedTasks} / {project.totalTasks} tasks</p>
                        <div className="w-full bg-[#f5f0ec] h-1.5 rounded-full overflow-hidden">
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

          {/* PROFILE VIEW */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm p-4 sm:p-6 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-[#f5f0ec] pb-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#b35c44] to-[#d4846a] text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-[#b35c44]/20 shrink-0">
                  NV
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-[#2d231e]">Nova</h2>
                  <p className="text-sm text-[#b5a69c] font-medium">Project Manager • TaskFlow Team</p>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">Active</span>
                    <span className="text-xs text-[#b5a69c]">Joined Jan 2026</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#b5a69c]">Email</p>
                    <p className="text-sm font-medium text-[#2d231e] truncate">nova@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#b5a69c]">Role</p>
                    <p className="text-sm font-medium text-[#2d231e]">Project Manager</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#b5a69c]">Team</p>
                    <p className="text-sm font-medium text-[#2d231e]">TaskFlow Team</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#b5a69c]">Tasks Completed</p>
                    <p className="text-sm font-medium text-[#2d231e]">24</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 bg-[#b35c44] text-white font-semibold rounded-xl hover:bg-[#a04f3a] transition shadow-sm"
                  >
                    Back to Dashboard
                  </button>
                  <button 
                    onClick={() => handleProfileAction('settings')}
                    className="px-4 py-2 font-semibold text-[#2d231e] bg-[#f5f0ec] hover:bg-[#e5ddd8] rounded-xl transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm p-4 sm:p-6 max-w-2xl mx-auto">
              <h2 className="text-lg font-bold text-[#2d231e] border-b border-[#f5f0ec] pb-4 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-sm text-[#2d231e]">Display Name</label>
                    <input type="text" defaultValue="Nova" className="w-full bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl p-2.5 text-sm font-medium text-[#2d231e] focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-sm text-[#2d231e]">Email Address</label>
                    <input type="email" defaultValue="nova@gmail.com" className="w-full bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl p-2.5 text-sm font-medium text-[#2d231e] focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-sm text-[#2d231e]">Time Zone</label>
                  <select className="w-full bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl p-2.5 text-sm font-medium text-[#2d231e] focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20">
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-sm text-[#2d231e]">Language</label>
                  <select className="w-full bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl p-2.5 text-sm font-medium text-[#2d231e] focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-[#b35c44] text-white font-semibold rounded-xl hover:bg-[#a04f3a] transition shadow-sm">
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 font-semibold text-[#2d231e] bg-[#f5f0ec] hover:bg-[#e5ddd8] rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATION PREFERENCES VIEW */}
          {activeTab === 'notifications' && profileView === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm p-4 sm:p-6 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#f5f0ec] pb-4 mb-4 gap-2">
                <h2 className="text-lg font-bold text-[#2d231e]">Notification Preferences</h2>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs text-[#b5a69c] hover:text-[#b35c44] transition"
                >
                  Back to Dashboard
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-[#f5f0ec]/50 rounded-xl gap-2">
                  <div>
                    <p className="font-semibold text-sm text-[#2d231e]">Email Notifications</p>
                    <p className="text-xs text-[#b5a69c]">Receive email updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#e5ddd8] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b35c44]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b35c44]"></div>
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-[#f5f0ec]/50 rounded-xl gap-2">
                  <div>
                    <p className="font-semibold text-sm text-[#2d231e]">Push Notifications</p>
                    <p className="text-xs text-[#b5a69c]">Real-time alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#e5ddd8] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b35c44]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b35c44]"></div>
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-[#f5f0ec]/50 rounded-xl gap-2">
                  <div>
                    <p className="font-semibold text-sm text-[#2d231e]">Task Reminders</p>
                    <p className="text-xs text-[#b5a69c]">Upcoming deadlines</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#e5ddd8] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b35c44]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b35c44]"></div>
                  </label>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 bg-[#b35c44] text-white font-semibold rounded-xl hover:bg-[#a04f3a] transition shadow-sm"
                  >
                    Save Preferences
                  </button>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 font-semibold text-[#2d231e] bg-[#f5f0ec] hover:bg-[#e5ddd8] rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TEAM - Responsive */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm hover:shadow-lg transition-all duration-200">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${member.gradient} flex items-center justify-center font-extrabold text-lg sm:text-xl text-white shadow-md shrink-0 mx-auto sm:mx-0`}>
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <h3 className="font-bold text-[#2d231e] text-base">{member.name}</h3>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getStatusTextColor(member.status)} border ${member.status === 'Active' ? 'border-emerald-200' : member.status === 'In Meeting' ? 'border-amber-200' : member.status === 'Busy' ? 'border-rose-200' : 'border-slate-200'} shrink-0`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${getStatusColor(member.status)} mr-1 animate-pulse`}></span>
                          {member.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#b35c44]">{member.role}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#6b5a4e] truncate">
                        <Mail className="w-3.5 h-3.5 text-[#b5a69c] shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#6b5a4e]">
                        <Phone className="w-3.5 h-3.5 text-[#b5a69c] shrink-0" />
                        <span className="text-xs sm:text-sm">{member.phone}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#b5a69c]">Capacity</span>
                          <span className="font-bold text-[#2d231e]">{member.capacity}%</span>
                        </div>
                        <div className="w-full bg-[#f5f0ec] h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${member.barColor}`} style={{ width: `${member.capacity}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-4 mt-2 text-xs">
                        <div>
                          <span className="text-[#b5a69c]">Active Tasks</span>
                          <p className="font-bold text-[#2d231e]">{member.activeTasks}</p>
                        </div>
                        <div>
                          <span className="text-[#b5a69c]">Completed</span>
                          <p className="font-bold text-[#2d231e]">{member.completedTasks}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MY TASKS - Responsive with Filters */}
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
                          ? 'bg-[#b35c44] text-white shadow-xs'
                          : 'bg-white text-[#2d231e] border border-[#e5ddd8] hover:bg-[#f5f0ec]'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#b35c44] hover:bg-[#a04f3a] rounded-xl transition w-full sm:w-auto justify-center"
                >
                  <Plus className="w-3.5 h-3.5" /> New Task
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm overflow-hidden">
                <div className="divide-y divide-[#f5f0ec]">
                  {filteredTasks.length === 0 ? (
                    <div className="p-8 text-center text-sm text-[#b5a69c]">
                      No tasks found in this category
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div key={task.id} className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-[#f5f0ec]/50 transition gap-3">
                        <div className="space-y-1 w-full sm:w-auto">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-[#2d231e]">{task.title}</h4>
                            {getPriorityBadge(task.priority)}
                            {getStatusBadge(task.status)}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-[#b5a69c] font-medium truncate">
                            Category: {task.category} • Due {task.due} • Assignee: {task.assignee || 'Unassigned'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button className="p-1.5 text-[#b5a69c] hover:text-[#b35c44] rounded-lg hover:bg-[#f5f0ec] transition">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 text-[#b5a69c] hover:text-emerald-600 rounded-lg hover:bg-[#f5f0ec] transition">
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

          {/* PROJECTS - Responsive */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {PROJECTS_DATA.map((project) => {
                const Icon = project.icon;
                return (
                  <div key={project.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm space-y-4 hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl text-white shrink-0`} style={{ backgroundColor: project.color }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-[#2d231e] truncate">{project.name}</h3>
                        <p className="text-xs text-[#b5a69c]">{project.completedTasks} / {project.totalTasks} tasks</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#b5a69c]">Progress</span>
                        <span className="text-[#2d231e] font-mono">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-[#f5f0ec] h-2 rounded-full overflow-hidden">
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

          {/* CALENDAR - Responsive */}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm overflow-hidden w-full max-w-5xl mx-auto">
              <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-[#f5f0ec] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-base sm:text-lg font-bold text-[#2d231e]">May 2026</h2>
                  <div className="flex items-center bg-[#f5f0ec] rounded-lg p-0.5 border border-[#e5ddd8]/60">
                    <button className="p-1 text-[#2d231e] hover:bg-white rounded transition">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-white bg-[#b35c44] rounded transition">
                      Today
                    </button>
                    <button className="p-1 text-[#2d231e] hover:bg-white rounded transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 bg-[#f0e4dc] text-[#8f6b5c] rounded-lg border border-[#e5d5cb]">Month</span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-[#b5a69c] hover:bg-[#f5f0ec] rounded-lg transition cursor-pointer">Week</span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-[#b5a69c] hover:bg-[#f5f0ec] rounded-lg transition cursor-pointer">Day</span>
                </div>
              </div>
              <div className="p-2 sm:p-4 overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-7 mb-2 text-center text-[10px] font-bold text-[#b5a69c] uppercase tracking-wider">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  <div className="grid grid-cols-7 rounded-xl overflow-hidden border border-[#e5ddd8]/80">
                    {renderCalendarDays()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES - Responsive */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm p-4 sm:p-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 border-b border-[#f5f0ec] pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b35c44] to-[#d4846a] text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                  JD
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#2d231e] text-sm">Jane Doe</h3>
                  <p className="text-[10px] text-emerald-600">Online</p>
                </div>
              </div>
              <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                <div className="flex justify-start">
                  <div className="bg-[#f5f0ec] rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[70%]">
                    <p className="text-xs text-[#2d231e]">Hey! How's the UI design coming along?</p>
                    <p className="text-[9px] text-[#b5a69c] mt-0.5">10:30 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#b35c44] text-white rounded-2xl rounded-tr-none px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[70%]">
                    <p className="text-xs">Almost done! Just finishing the dashboard layout.</p>
                    <p className="text-[9px] text-[#d4846a] mt-0.5">10:32 AM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#f5f0ec] rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[70%]">
                    <p className="text-xs text-[#2d231e]">Great! Can you share the prototype by EOD?</p>
                    <p className="text-[9px] text-[#b5a69c] mt-0.5">10:35 AM</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-[#f5f0ec] pt-4">
                <button className="p-2 text-[#b5a69c] hover:text-[#b35c44] transition shrink-0">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-[#f5f0ec] rounded-xl px-3 sm:px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20 min-w-0"
                />
                <button className="p-2 bg-[#b35c44] text-white rounded-xl hover:bg-[#a04f3a] transition shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* FILES - Responsive */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">Total Files</p>
                    <h3 className="text-xl font-black text-[#2d231e]">{files.length}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f0e4dc] text-[#8f6b5c] border border-[#e5d5cb] shrink-0">
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
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-[#b35c44] hover:bg-[#a04f3a] rounded-xl transition shadow-sm w-full sm:w-auto"
                  >
                    <Upload className="w-4 h-4" /> Upload File
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm overflow-hidden">
                <div className="p-3 sm:p-4 border-b border-[#f5f0ec] flex items-center justify-between">
                  <h3 className="font-bold text-[#2d231e] text-sm">Workspace Files</h3>
                  <span className="text-xs text-[#b5a69c] font-medium">{files.length} items</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px] sm:min-w-[500px]">
                    <thead>
                      <tr className="bg-[#f5f0ec]/50 border-b border-[#e5ddd8] text-[10px] uppercase font-bold text-[#b5a69c] tracking-wider">
                        <th className="p-2 sm:p-3.5 pl-3 sm:pl-5">Name</th>
                        <th className="p-2 sm:p-3.5 hidden sm:table-cell">Size</th>
                        <th className="p-2 sm:p-3.5 hidden md:table-cell">Uploaded By</th>
                        <th className="p-2 sm:p-3.5 pr-3 sm:pr-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5f0ec] text-xs text-[#2d231e]">
                      {files.map((file) => {
                        const Icon = file.icon;
                        return (
                          <tr key={file.id} className="hover:bg-[#f5f0ec]/50 transition group">
                            <td className="p-2 sm:p-3.5 pl-3 sm:pl-5 font-semibold flex items-center gap-2 sm:gap-3 min-w-[120px]">
                              <div className={`p-1.5 sm:p-2 rounded-lg border border-[#e5ddd8]/60 ${file.color} shrink-0`}>
                                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                              </div>
                              <span className="truncate max-w-[80px] sm:max-w-xs">{file.name}</span>
                            </td>
                            <td className="p-2 sm:p-3.5 font-mono text-[#b5a69c] hidden sm:table-cell">{file.size}</td>
                            <td className="p-2 sm:p-3.5 font-medium hidden md:table-cell">{file.uploader}</td>
                            <td className="p-2 sm:p-3.5 pr-3 sm:pr-5 text-right space-x-1 sm:space-x-2 whitespace-nowrap">
                              <button className="p-1 sm:p-1.5 text-[#b5a69c] hover:text-[#b35c44] rounded-lg hover:bg-[#f5f0ec] transition">
                                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteFile(file.id)}
                                className="p-1 sm:p-1.5 text-[#b5a69c] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
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

          {/* REPORTS - Responsive */}
          {activeTab === 'reports' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm text-center">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">Completion Rate</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#2d231e] mt-1">87%</h3>
                  <p className="text-xs text-emerald-600">↑ 12% from last month</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm text-center">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">Avg. Task Duration</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#2d231e] mt-1">2.4d</h3>
                  <p className="text-xs text-emerald-600">↓ 8% from last month</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5ddd8]/80 shadow-sm text-center">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#b5a69c]">Productivity</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#2d231e] mt-1">92%</h3>
                  <p className="text-xs text-emerald-600">↑ 5% from last month</p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5ddd8]/80 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#f5f0ec] pb-3 mb-4 gap-2">
                  <h3 className="font-bold text-[#2d231e] text-sm">Task Completion & Pending Trend</h3>
                  <div className="flex items-center gap-4 text-xs flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 rounded-full bg-[#b35c44]"></span>
                      <span className="text-[#b5a69c]">Completed</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 rounded-full bg-[#d4846a]"></span>
                      <span className="text-[#b5a69c]">Pending</span>
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
                        stroke="#b35c44" 
                        strokeWidth={2.5}
                        dot={{ fill: '#b35c44', r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pending" 
                        stroke="#d4846a" 
                        strokeWidth={2.5}
                        strokeDasharray="5 5"
                        dot={{ fill: '#d4846a', r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && !profileView && (
            <div className="bg-white rounded-2xl border border-[#e5ddd8]/80 shadow-sm p-4 sm:p-5 max-w-2xl mx-auto space-y-4">
              <h3 className="font-bold text-[#2d231e] text-sm border-b border-[#f5f0ec] pb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#b35c44]" /> Recent Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-[#f0e4dc]/30 rounded-xl border border-[#e5d5cb]/60">
                  <Sparkles className="w-4 h-4 text-[#b35c44] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="font-bold text-[#2d231e]">Sprint Review Scheduled</p>
                    <p className="text-[#b5a69c]">Nova added a new calendar entry for May 21st.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="font-bold text-[#2d231e]">Task Completed</p>
                    <p className="text-[#b5a69c]">Jane marked 'Landing Page Design' as completed.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="font-bold text-[#2d231e]">Upcoming Deadline</p>
                    <p className="text-[#b5a69c]">Project Proposal is due tomorrow!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE TASK MODAL - Responsive */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d231e]/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e5ddd8] w-full max-w-md p-4 sm:p-6 space-y-4 animate-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#f5f0ec] pb-3">
              <h3 className="font-bold text-[#2d231e] text-sm">Create New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#b5a69c] hover:text-[#2d231e]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#2d231e]">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Refactor API Router"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2d231e]">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20"
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
                  <label className="font-semibold text-[#2d231e]">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full bg-[#f5f0ec] border border-[#e5ddd8] rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#b35c44]/20"
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
                  className="w-full sm:w-auto px-4 py-2 font-semibold text-[#2d231e] bg-[#f5f0ec] hover:bg-[#e5ddd8] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 font-semibold text-white bg-[#b35c44] hover:bg-[#a04f3a] rounded-xl shadow-md shadow-[#b35c44]/20 transition"
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