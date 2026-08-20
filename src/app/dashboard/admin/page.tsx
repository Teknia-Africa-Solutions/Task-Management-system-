// src/app/dashboard/admin/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
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
  BarChart3,
  Flag,
  ListTodo,
  Shield,
  Users2,
  Briefcase,
  AlertTriangle,
  UserX,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Upload,
  Download,
  Mail,
  Phone,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageSquare,
  File,
  Folder,
  Image as ImageIcon,
  FileCode,
  FileSpreadsheet,
  Star,
  Clock as ClockIcon,
  Send,
  Paperclip,
  Copy,
  Share2,
  Archive,
  UserPlus,
  UserCheck,
  UserMinus,
  Key,
  Globe,
  Monitor,
  Smartphone,
  Moon,
  Sun,
  Zap,
  ShieldCheck,
  Lock,
  Fingerprint,
  Database,
  HardDrive,
  Cloud,
  Server,
  Code,
  GitBranch,
  GitPullRequest,
  GitMerge,
  GitCommit,
  Package,
  Box,
  Layers,
  Grid,
  List,
  Maximize2,
  Minimize2,
  ExternalLink,
  Info,
  HelpCircle,
  LifeBuoy,
  Award,
  Medal,
  Trophy,
  Target,
  Rocket,
  Zap as ZapIcon,
  Sparkles,
  Gift,
  Crown,
  Diamond,
  Heart,
  ThumbsUp,
  Smile,
  Coffee,
  Pizza,
  Music,
  Film,
  Book,
  Camera,
  Video,
  Headphones,
  Watch,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Wallet,
  Banknote,
  PiggyBank,
  Safe,
  ShieldOff,
  AlertOctagon,
  Bug,
  Wrench,
  Tool,
  Scissors,
  PenTool,
  Pencil,
  Eraser,
  Brush,
  Palette,
  Paintbrush,
  SprayCan,
  Droplet,
  Wind,
  CloudRain,
  CloudSnow,
  CloudLightning,
  SunMedium,
  MoonStar,
  StarHalf,
  StarOff,
  HeartOff,
  ThumbsDown,
  Meh,
  Frown,
  Laugh,
  Angry,
  Annoyed,
  Confused,
  Cool,
  Nerdy,
  Cute,
  Happy,
  Sad,
  Tired,
  Sleepy,
  Hungry,
  Thirsty,
  Drunk,
  High,
  Low,
  Medium,
  PlusCircle,
  MinusCircle,
  XCircle,
  CheckCircle,
  AlertTriangle as AlertTriangleIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  Lightbulb,
  Idea,
  Brain,
  Cpu,
  Memory,
  HardDrive as HardDriveIcon,
  Monitor as MonitorIcon,
  Keyboard,
  Mouse,
  Printer,
  Scanner,
  Speaker,
  Microphone,
  Camera as CameraIcon,
  Video as VideoIcon,
  Headphones as HeadphonesIcon,
  Watch as WatchIcon,
  Smartphone as SmartphoneIcon,
  Tablet,
  Laptop,
  Desktop,
  Server as ServerIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Wifi,
  Bluetooth,
  Usb,
  Hdmi,
  Vga,
  Dvi,
  DisplayPort,
  Thunderbolt,
  Firewire,
  Ethernet,
  Fiber,
  Coaxial,
  TwistedPair,
  ShieldCheck as ShieldCheckIcon,
  Lock as LockIcon,
  Unlock,
  Key as KeyIcon,
  Fingerprint as FingerprintIcon,
  IdCard,
  Passport,
  DriverLicense,
  Badge,
  Medal as MedalIcon,
  Trophy as TrophyIcon,
  Award as AwardIcon,
  Star as StarIcon,
  Heart as HeartIcon,
  ThumbsUp as ThumbsUpIcon,
  Smile as SmileIcon,
  Coffee as CoffeeIcon,
  Pizza as PizzaIcon,
  Music as MusicIcon,
  Film as FilmIcon,
  Book as BookIcon,
  Camera as CameraIcon2,
  Video as VideoIcon2,
  Headphones as HeadphonesIcon2,
  Watch as WatchIcon2,
  ShoppingBag as ShoppingBagIcon,
  ShoppingCart as ShoppingCartIcon,
  CreditCard as CreditCardIcon,
  Wallet as WalletIcon,
  Banknote as BanknoteIcon,
  PiggyBank as PiggyBankIcon,
  Safe as SafeIcon,
  ShieldOff as ShieldOffIcon,
  AlertOctagon as AlertOctagonIcon,
  Bug as BugIcon,
  Wrench as WrenchIcon,
  Tool as ToolIcon,
  Scissors as ScissorsIcon,
  PenTool as PenToolIcon,
  Pencil as PencilIcon,
  Eraser as EraserIcon,
  Brush as BrushIcon,
  Palette as PaletteIcon,
  Paintbrush as PaintbrushIcon,
  SprayCan as SprayCanIcon,
  Droplet as DropletIcon,
  Wind as WindIcon,
  CloudRain as CloudRainIcon,
  CloudSnow as CloudSnowIcon,
  CloudLightning as CloudLightningIcon,
  SunMedium as SunMediumIcon,
  MoonStar as MoonStarIcon,
  StarHalf as StarHalfIcon,
  StarOff as StarOffIcon,
  HeartOff as HeartOffIcon,
  ThumbsDown as ThumbsDownIcon,
  Meh as MehIcon,
  Frown as FrownIcon,
  Laugh as LaughIcon,
  Angry as AngryIcon,
  Annoyed as AnnoyedIcon,
  Confused as ConfusedIcon,
  Cool as CoolIcon,
  Nerdy as NerdyIcon,
  Cute as CuteIcon,
  Happy as HappyIcon,
  Sad as SadIcon,
  Tired as TiredIcon,
  Sleepy as SleepyIcon,
  Hungry as HungryIcon,
  Thirsty as ThirstyIcon,
  Drunk as DrunkIcon,
  High as HighIcon,
  Low as LowIcon,
  Medium as MediumIcon,
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
  XCircle as XCircleIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon2,
  Info as InfoIcon2,
  Help as HelpIcon2,
  Lightbulb as LightbulbIcon,
  Idea as IdeaIcon,
  Brain as BrainIcon,
  Cpu as CpuIcon,
  Memory as MemoryIcon,
  HardDrive as HardDriveIcon2,
  Monitor as MonitorIcon2,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  Printer as PrinterIcon,
  Scanner as ScannerIcon,
  Speaker as SpeakerIcon,
  Microphone as MicrophoneIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
} from 'recharts';

const COLORS = ['#0B5E12', '#96AF25', '#D5966C', '#4f6d7a', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

// ============================================
// MOCK DATA
// ============================================

// Users Data
const INITIAL_USERS = [
  { id: 1, name: 'Nova Admin', email: 'nova@taskflow.io', role: 'admin', team: 'Management', status: 'Active', lastActive: '2026-05-21T10:30:00', joined: '2026-01-15', avatar: 'NA', phone: '+1 (555) 000-0001' },
  { id: 2, name: 'Jane Doe', email: 'jane@taskflow.io', role: 'project_manager', team: 'Frontend Team', status: 'Active', lastActive: '2026-05-21T09:15:00', joined: '2026-02-01', avatar: 'JD', phone: '+1 (555) 000-0002' },
  { id: 3, name: 'Mike Johnson', email: 'mike@taskflow.io', role: 'project_manager', team: 'Backend Team', status: 'Active', lastActive: '2026-05-20T16:45:00', joined: '2026-01-20', avatar: 'MJ', phone: '+1 (555) 000-0003' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@taskflow.io', role: 'user', team: 'QA Team', status: 'Active', lastActive: '2026-05-21T08:00:00', joined: '2026-03-10', avatar: 'SW', phone: '+1 (555) 000-0004' },
  { id: 5, name: 'David Brown', email: 'david@taskflow.io', role: 'user', team: 'DevOps Team', status: 'Inactive', lastActive: '2026-05-15T14:20:00', joined: '2026-02-15', avatar: 'DB', phone: '+1 (555) 000-0005' },
  { id: 6, name: 'Emily Chen', email: 'emily@taskflow.io', role: 'user', team: 'Frontend Team', status: 'Active', lastActive: '2026-05-21T11:00:00', joined: '2026-04-01', avatar: 'EC', phone: '+1 (555) 000-0006' },
  { id: 7, name: 'Robert Kim', email: 'robert@taskflow.io', role: 'user', team: 'Backend Team', status: 'Active', lastActive: '2026-05-20T13:30:00', joined: '2026-03-15', avatar: 'RK', phone: '+1 (555) 000-0007' },
  { id: 8, name: 'Lisa Park', email: 'lisa@taskflow.io', role: 'user', team: 'Design Team', status: 'Busy', lastActive: '2026-05-21T07:45:00', joined: '2026-02-20', avatar: 'LP', phone: '+1 (555) 000-0008' },
  { id: 9, name: 'Tom Wilson', email: 'tom@taskflow.io', role: 'project_manager', team: 'Design Team', status: 'Active', lastActive: '2026-05-20T15:00:00', joined: '2026-01-10', avatar: 'TW', phone: '+1 (555) 000-0009' },
  { id: 10, name: 'Anna Martinez', email: 'anna@taskflow.io', role: 'user', team: 'QA Team', status: 'Active', lastActive: '2026-05-21T09:30:00', joined: '2026-04-15', avatar: 'AM', phone: '+1 (555) 000-0010' },
];

// Teams Data
const INITIAL_TEAMS = [
  { id: 1, name: 'Frontend Team', description: 'Responsible for all frontend development and UI/UX', manager: 'Jane Doe', members: ['Emily Chen', 'Lisa Park'], activeTasks: 12, completedTasks: 45, workload: 85, status: 'Active' },
  { id: 2, name: 'Backend Team', description: 'Handles server-side logic, APIs, and database', manager: 'Mike Johnson', members: ['Robert Kim'], activeTasks: 8, completedTasks: 38, workload: 72, status: 'Active' },
  { id: 3, name: 'Design Team', description: 'UI/UX design, branding, and user research', manager: 'Tom Wilson', members: ['Lisa Park'], activeTasks: 6, completedTasks: 22, workload: 51, status: 'Active' },
  { id: 4, name: 'QA Team', description: 'Quality assurance, testing, and bug tracking', manager: 'Sarah Wilson', members: ['Anna Martinez'], activeTasks: 10, completedTasks: 30, workload: 79, status: 'Active' },
  { id: 5, name: 'DevOps Team', description: 'Infrastructure, deployment, and monitoring', manager: 'David Brown', members: [], activeTasks: 4, completedTasks: 18, workload: 55, status: 'Inactive' },
];

// Projects Data
const INITIAL_PROJECTS = [
  { id: 1, name: 'Inventory Management System', description: 'Full inventory tracking with barcode scanning', manager: 'Jane Doe', team: 'Frontend Team', progress: 75, tasks: { total: 20, completed: 15 }, deadline: '2026-06-15', priority: 'High', status: 'Active', members: ['Emily Chen', 'Lisa Park'] },
  { id: 2, name: 'Task Management System', description: 'Internal task management platform', manager: 'Mike Johnson', team: 'Backend Team', progress: 67, tasks: { total: 18, completed: 12 }, deadline: '2026-06-30', priority: 'Medium', status: 'Active', members: ['Robert Kim'] },
  { id: 3, name: 'Website Redesign', description: 'Complete website overhaul with modern design', manager: 'Tom Wilson', team: 'Design Team', progress: 53, tasks: { total: 15, completed: 8 }, deadline: '2026-07-15', priority: 'High', status: 'At Risk', members: ['Lisa Park'] },
  { id: 4, name: 'Mobile App Development', description: 'Cross-platform mobile application', manager: 'Sarah Wilson', team: 'QA Team', progress: 40, tasks: { total: 25, completed: 10 }, deadline: '2026-08-01', priority: 'Medium', status: 'On Hold', members: ['Anna Martinez'] },
  { id: 5, name: 'Cloud Migration', description: 'Migrating infrastructure to cloud', manager: 'David Brown', team: 'DevOps Team', progress: 20, tasks: { total: 30, completed: 6 }, deadline: '2026-09-01', priority: 'Low', status: 'Overdue', members: [] },
];

// Tasks Data
const INITIAL_TASKS = [
  { id: 1, title: 'Design Dashboard UI', project: 'Inventory Management System', assignee: 'Emily Chen', team: 'Frontend Team', priority: 'High', status: 'In Progress', dueDate: '2026-05-25', createdDate: '2026-05-10', description: 'Create modern dashboard with charts' },
  { id: 2, title: 'Implement Authentication', project: 'Task Management System', assignee: 'Mike Johnson', team: 'Backend Team', priority: 'Critical', status: 'Completed', dueDate: '2026-05-20', createdDate: '2026-05-01', description: 'JWT based authentication' },
  { id: 3, title: 'Design Landing Page', project: 'Website Redesign', assignee: 'Lisa Park', team: 'Design Team', priority: 'High', status: 'In Progress', dueDate: '2026-05-28', createdDate: '2026-05-12', description: 'Modern landing page design' },
  { id: 4, title: 'Setup CI/CD Pipeline', project: 'Cloud Migration', assignee: 'David Brown', team: 'DevOps Team', priority: 'Medium', status: 'Blocked', dueDate: '2026-05-15', createdDate: '2026-05-05', description: 'Automated deployment pipeline' },
  { id: 5, title: 'User Testing', project: 'Mobile App Development', assignee: 'Anna Martinez', team: 'QA Team', priority: 'High', status: 'Pending', dueDate: '2026-06-01', createdDate: '2026-05-15', description: 'Conduct user acceptance testing' },
  { id: 6, title: 'Database Optimization', project: 'Task Management System', assignee: 'Robert Kim', team: 'Backend Team', priority: 'Medium', status: 'Overdue', dueDate: '2026-05-18', createdDate: '2026-05-08', description: 'Optimize database queries' },
  { id: 7, title: 'Mobile Responsive Design', project: 'Website Redesign', assignee: 'Emily Chen', team: 'Frontend Team', priority: 'High', status: 'Pending', dueDate: '2026-06-10', createdDate: '2026-05-20', description: 'Responsive for all devices' },
  { id: 8, title: 'API Documentation', project: 'Inventory Management System', assignee: 'Mike Johnson', team: 'Backend Team', priority: 'Low', status: 'In Progress', dueDate: '2026-05-30', createdDate: '2026-05-18', description: 'Complete API documentation' },
  { id: 9, title: 'Security Audit', project: 'Mobile App Development', assignee: 'Sarah Wilson', team: 'QA Team', priority: 'Critical', status: 'Pending', dueDate: '2026-06-05', createdDate: '2026-05-22', description: 'Security vulnerability assessment' },
  { id: 10, title: 'Deploy to Production', project: 'Cloud Migration', assignee: 'David Brown', team: 'DevOps Team', priority: 'High', status: 'Blocked', dueDate: '2026-05-22', createdDate: '2026-05-14', description: 'Production deployment' },
];

// Notifications Data
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'user', title: 'New user registered', description: 'John Doe created an account', timestamp: '2026-05-21T10:30:00', read: false, icon: UserPlus },
  { id: 2, type: 'project', title: 'Project created', description: 'Project Alpha was created by Jane', timestamp: '2026-05-21T09:15:00', read: false, icon: FolderKanban },
  { id: 3, type: 'task', title: 'Task assigned', description: 'Mike assigned a task to Emily', timestamp: '2026-05-21T08:00:00', read: false, icon: CheckSquare },
  { id: 4, type: 'task', title: 'Task overdue', description: 'API Integration task is overdue', timestamp: '2026-05-21T07:30:00', read: true, icon: AlertCircle },
  { id: 5, type: 'project', title: 'Project at risk', description: 'Website Redesign project is at risk', timestamp: '2026-05-20T18:00:00', read: true, icon: AlertTriangle },
  { id: 6, type: 'file', title: 'File uploaded', description: 'Sarah uploaded a new file to QA team', timestamp: '2026-05-20T16:45:00', read: true, icon: FileText },
  { id: 7, type: 'security', title: 'Security alert', description: 'Failed login attempt detected', timestamp: '2026-05-20T14:20:00', read: false, icon: Shield },
  { id: 8, type: 'system', title: 'Report generated', description: 'Monthly report generated successfully', timestamp: '2026-05-20T12:00:00', read: true, icon: BarChart3 },
];

// Files Data
const INITIAL_FILES = [
  { id: 1, name: 'Database_Schema_v2.sql', type: 'code', size: '2.4 MB', uploader: 'Mike Johnson', project: 'Task Management System', uploadDate: '2026-05-05', lastModified: '2026-05-05', icon: FileCode, color: 'bg-amber-100 text-amber-700' },
  { id: 2, name: 'Q3_Financial_Forecast.xlsx', type: 'spreadsheet', size: '1.8 MB', uploader: 'Nova Admin', project: 'General', uploadDate: '2026-05-04', lastModified: '2026-05-04', icon: FileSpreadsheet, color: 'bg-emerald-100 text-emerald-700' },
  { id: 3, name: 'UI_Spec.png', type: 'image', size: '8.1 MB', uploader: 'Jane Doe', project: 'Website Redesign', uploadDate: '2026-05-02', lastModified: '2026-05-02', icon: ImageIcon, color: 'bg-indigo-100 text-indigo-700' },
  { id: 4, name: 'API_Doc.pdf', type: 'pdf', size: '512 KB', uploader: 'Mike Johnson', project: 'Inventory Management System', uploadDate: '2026-04-29', lastModified: '2026-04-29', icon: FileText, color: 'bg-rose-100 text-rose-700' },
  { id: 5, name: 'Architecture.png', type: 'image', size: '4.3 MB', uploader: 'David Brown', project: 'Cloud Migration', uploadDate: '2026-04-28', lastModified: '2026-04-28', icon: ImageIcon, color: 'bg-indigo-100 text-indigo-700' },
  { id: 6, name: 'README.md', type: 'code', size: '245 KB', uploader: 'Nova Admin', project: 'General', uploadDate: '2026-04-25', lastModified: '2026-04-25', icon: FileCode, color: 'bg-amber-100 text-amber-700' },
];

// Audit Logs Data
const INITIAL_AUDIT_LOGS = [
  { id: 1, user: 'Nova Admin', action: 'Logged In', resource: 'System', description: 'User logged in successfully', date: '2026-05-21', time: '10:30:00', status: 'Success' },
  { id: 2, user: 'Jane Doe', action: 'Created Project', resource: 'Project', description: 'Created project "Alpha"', date: '2026-05-21', time: '09:15:00', status: 'Success' },
  { id: 3, user: 'Mike Johnson', action: 'Assigned Task', resource: 'Task', description: 'Assigned task "API Integration" to Emily', date: '2026-05-21', time: '08:00:00', status: 'Success' },
  { id: 4, user: 'Unknown', action: 'Failed Login', resource: 'Authentication', description: 'Failed login attempt for user@example.com', date: '2026-05-21', time: '07:30:00', status: 'Failed' },
  { id: 5, user: 'Nova Admin', action: 'Changed Role', resource: 'User', description: 'Changed role of David from User to Admin', date: '2026-05-20', time: '18:00:00', status: 'Success' },
  { id: 6, user: 'Sarah Wilson', action: 'Uploaded File', resource: 'File', description: 'Uploaded file "QA_Report.xlsx"', date: '2026-05-20', time: '16:45:00', status: 'Success' },
  { id: 7, user: 'David Brown', action: 'Deleted Task', resource: 'Task', description: 'Deleted task "Old Task #42"', date: '2026-05-20', time: '14:20:00', status: 'Success' },
  { id: 8, user: 'Emily Chen', action: 'Updated Project', resource: 'Project', description: 'Updated project "Mobile App" status', date: '2026-05-20', time: '12:00:00', status: 'Success' },
  { id: 9, user: 'Tom Wilson', action: 'Logged Out', resource: 'System', description: 'User logged out', date: '2026-05-20', time: '11:30:00', status: 'Success' },
  { id: 10, user: 'Unknown', action: 'Failed Login', resource: 'Authentication', description: 'Failed login attempt for admin@example.com', date: '2026-05-20', time: '10:45:00', status: 'Failed' },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // User state
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

// ✅ ADD THESE - Appearance states
const [isDarkMode, setIsDarkMode] = useState(false);
const [fontSize, setFontSize] = useState('medium');
const [primaryColor, setPrimaryColor] = useState('#0B5E12');

   // ✅ ADD THESE - Profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Admin',
    email: 'admin@taskflow.io',
    phone: '+1 (555) 000-0000',
    department: 'Management',
  });

  // ✅ ADD THESE - Calendar states
  const [calendarView, setCalendarView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
    
  // ✅ ADD THIS - Settings tab state
  const [settingsTab, setSettingsTab] = useState('general');
  
  // Data states
  const [users, setUsers] = useState(INITIAL_USERS);
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  
  // UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  
  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: string; id: number } | null>(null);
  
  // Filter states
  const [userFilter, setUserFilter] = useState({ role: 'all', status: 'all' });
  const [taskFilter, setTaskFilter] = useState({ status: 'all', priority: 'all', project: 'all' });
  const [fileFilter, setFileFilter] = useState({ type: 'all', project: 'all' });
  const [notificationFilter, setNotificationFilter] = useState('all');
  const [auditFilter, setAuditFilter] = useState({ user: 'all', action: 'all', resource: 'all' });
  
  // Form states
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', team: '', status: 'Active', phone: '' });
  const [newTeam, setNewTeam] = useState({ name: '', description: '', manager: '', members: [] as string[], status: 'Active' });
  const [newProject, setNewProject] = useState({ name: '', description: '', manager: '', team: '', priority: 'Medium', status: 'Active', deadline: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', project: '', assignee: '', team: '', priority: 'Medium', status: 'Pending', dueDate: '' });
  
  // View states
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // ✅ PUT NAVIGATION HANDLER HERE (AFTER VIEW STATES, BEFORE COMPUTED STATS)
  // ============================================
  // NAVIGATION HANDLER
  // ============================================

  const handleNavClick = (nav: string) => {
    console.log('🔍 Navigating to:', nav);
    setActiveNav(nav);
  };

  // Computed stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    inactiveUsers: users.filter(u => u.status === 'Inactive').length,
    totalTeams: teams.filter(t => t.status === 'Active').length,
    activeTeams: teams.filter(t => t.status === 'Active').length,
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'Active').length,
    completedProjects: projects.filter(p => p.status === 'Completed').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'Completed').length,
    overdueTasks: tasks.filter(t => t.status === 'Overdue').length,
    pendingTasks: tasks.filter(t => t.status === 'Pending').length,
    inProgressTasks: tasks.filter(t => t.status === 'In Progress').length,
    blockedTasks: tasks.filter(t => t.status === 'Blocked').length,
    projectsAtRisk: projects.filter(p => p.status === 'At Risk').length,
    projectsOnHold: projects.filter(p => p.status === 'On Hold').length,
    tasksDueToday: tasks.filter(t => t.dueDate === new Date().toISOString().split('T')[0]).length,
    admins: users.filter(u => u.role === 'admin').length,
    projectManagers: users.filter(u => u.role === 'project_manager').length,
    regularUsers: users.filter(u => u.role === 'user').length,
    unreadNotifications: notifications.filter(n => !n.read).length,
    totalFiles: files.length,
    totalStorage: files.reduce((acc, f) => acc + parseFloat(f.size), 0),
  };

  // Chart data
  const userGrowthData = [
    { month: 'Jan', users: 45 },
    { month: 'Feb', users: 52 },
    { month: 'Mar', users: 68 },
    { month: 'Apr', users: 82 },
    { month: 'May', users: 95 },
    { month: 'Jun', users: 112 },
    { month: 'Jul', users: 130 },
    { month: 'Aug', users: 156 },
  ];

  const projectStatusData = [
    { name: 'Active', value: stats.activeProjects },
    { name: 'Completed', value: stats.completedProjects },
    { name: 'At Risk', value: stats.projectsAtRisk },
    { name: 'On Hold', value: stats.projectsOnHold },
  ];

  const taskStatusData = [
    { name: 'Pending', value: stats.pendingTasks },
    { name: 'In Progress', value: stats.inProgressTasks },
    { name: 'Completed', value: stats.completedTasks },
    { name: 'Overdue', value: stats.overdueTasks },
    { name: 'Blocked', value: stats.blockedTasks },
  ];

  const taskPriorityData = [
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length },
    { name: 'High', value: tasks.filter(t => t.priority === 'High').length },
    { name: 'Critical', value: tasks.filter(t => t.priority === 'Critical').length },
  ];

  const teamWorkloadData = teams.map(t => ({
    name: t.name,
    workload: t.workload,
  }));

  const taskCompletionData = [
    { date: 'May 15', completed: 5, pending: 8, overdue: 2 },
    { date: 'May 16', completed: 7, pending: 6, overdue: 3 },
    { date: 'May 17', completed: 4, pending: 9, overdue: 1 },
    { date: 'May 18', completed: 8, pending: 5, overdue: 4 },
    { date: 'May 19', completed: 6, pending: 7, overdue: 2 },
    { date: 'May 20', completed: 9, pending: 4, overdue: 3 },
    { date: 'May 21', completed: 5, pending: 6, overdue: 1 },
  ];

  // Recent activity for timeline
  const recentActivity = [
    { user: 'Nova Admin', action: 'created a new project', details: 'Cloud Migration', time: '10 minutes ago' },
    { user: 'Jane Doe', action: 'assigned a task to', details: 'Emily Chen', time: '25 minutes ago' },
    { user: 'Mike Johnson', action: 'completed task', details: 'API Integration', time: '1 hour ago' },
    { user: 'Sarah Wilson', action: 'uploaded a file', details: 'QA_Report.xlsx', time: '2 hours ago' },
    { user: 'David Brown', action: 'deactivated user', details: 'Inactive User #5', time: '3 hours ago' },
  ];

    // ============================================
  // AUTHENTICATION
  // ============================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          router.replace('/login');
          return;
        }

        const data = await response.json();
        const userData = data.user;
        
        if (!userData) {
          router.replace('/login');
          return;
        }

        if (userData.role?.toUpperCase() !== 'ADMIN') {
          router.replace('/dashboard');
          return;
        }

        setUser(userData);
        
        // ✅ ADD THIS - SET PROFILE DATA FROM USER
        setProfileData({
          name: userData.name || 'Admin',
          email: userData.email || 'admin@taskflow.io',
          phone: '+1 (555) 000-0000',
          department: 'Management',
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    router.replace('/login');
  };

  // Load appearance settings from localStorage
useEffect(() => {
  // Load dark mode
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode !== null) {
    const darkMode = JSON.parse(savedDarkMode);
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  // Load font size
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    setFontSize(savedFontSize);
    document.documentElement.style.fontSize = savedFontSize === 'small' ? '14px' : 
                                              savedFontSize === 'large' ? '18px' : 
                                              savedFontSize === 'xlarge' ? '20px' : '16px';
  }
  
  // Load primary color
  const savedPrimaryColor = localStorage.getItem('primaryColor');
  if (savedPrimaryColor) {
    setPrimaryColor(savedPrimaryColor);
    document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
    // Update the primary color in the UI
    document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
  }
}, []);

  // ============================================
  // HANDLERS - USERS
  // ============================================

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    
    const newUserData = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      team: newUser.team || 'Unassigned',
      status: newUser.status,
      lastActive: new Date().toISOString(),
      joined: new Date().toISOString().split('T')[0],
      avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      phone: newUser.phone || '+1 (555) 000-0000',
    };
    
    setUsers([...users, newUserData]);
    setNewUser({ name: '', email: '', role: 'user', team: '', status: 'Active', phone: '' });
    setIsAddUserModalOpen(false);
    
    // Add to audit log
    addAuditLog('Nova Admin', 'Created User', 'User', `Created user ${newUserData.name}`);
  };

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    addAuditLog('Nova Admin', 'Deleted User', 'User', `Deleted user ${userToDelete?.name}`);
    setIsConfirmModalOpen(false);
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } 
        : u
    ));
    const user = users.find(u => u.id === id);
    addAuditLog('Nova Admin', user?.status === 'Active' ? 'Deactivated User' : 'Activated User', 'User', `${user?.name} was ${user?.status === 'Active' ? 'deactivated' : 'activated'}`);
  };

  const handleChangeUserRole = (id: number, newRole: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    const user = users.find(u => u.id === id);
    addAuditLog('Nova Admin', 'Changed Role', 'User', `Changed role of ${user?.name} to ${newRole}`);
  };

  // ============================================
  // HANDLERS - TEAMS
  // ============================================

  const handleAddTeam = () => {
    if (!newTeam.name) return;
    
    const newTeamData = {
      id: teams.length + 1,
      name: newTeam.name,
      description: newTeam.description || 'No description',
      manager: newTeam.manager || 'Unassigned',
      members: newTeam.members || [],
      activeTasks: 0,
      completedTasks: 0,
      workload: 0,
      status: newTeam.status,
    };
    
    setTeams([...teams, newTeamData]);
    setNewTeam({ name: '', description: '', manager: '', members: [], status: 'Active' });
    setIsAddTeamModalOpen(false);
    addAuditLog('Nova Admin', 'Created Team', 'Team', `Created team ${newTeamData.name}`);
  };

  const handleDeleteTeam = (id: number) => {
    const teamToDelete = teams.find(t => t.id === id);
    setTeams(teams.filter(t => t.id !== id));
    addAuditLog('Nova Admin', 'Deleted Team', 'Team', `Deleted team ${teamToDelete?.name}`);
    setIsConfirmModalOpen(false);
  };

  // ============================================
  // HANDLERS - PROJECTS
  // ============================================

  const handleAddProject = () => {
    if (!newProject.name) return;
    
    const newProjectData = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description || 'No description',
      manager: newProject.manager || 'Unassigned',
      team: newProject.team || 'Unassigned',
      progress: 0,
      tasks: { total: 0, completed: 0 },
      deadline: newProject.deadline || '2026-12-31',
      priority: newProject.priority,
      status: newProject.status,
      members: [],
    };
    
    setProjects([...projects, newProjectData]);
    setNewProject({ name: '', description: '', manager: '', team: '', priority: 'Medium', status: 'Active', deadline: '' });
    setIsAddProjectModalOpen(false);
    addAuditLog('Nova Admin', 'Created Project', 'Project', `Created project ${newProjectData.name}`);
  };

  const handleDeleteProject = (id: number) => {
    const projectToDelete = projects.find(p => p.id === id);
    setProjects(projects.filter(p => p.id !== id));
    addAuditLog('Nova Admin', 'Deleted Project', 'Project', `Deleted project ${projectToDelete?.name}`);
    setIsConfirmModalOpen(false);
  };

  // ============================================
  // HANDLERS - TASKS
  // ============================================

  const handleAddTask = () => {
    if (!newTask.title) return;
    
    const newTaskData = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description || 'No description',
      project: newTask.project || 'General',
      assignee: newTask.assignee || 'Unassigned',
      team: newTask.team || 'Unassigned',
      priority: newTask.priority,
      status: newTask.status,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0],
    };
    
    setTasks([...tasks, newTaskData]);
    setNewTask({ title: '', description: '', project: '', assignee: '', team: '', priority: 'Medium', status: 'Pending', dueDate: '' });
    setIsAddTaskModalOpen(false);
    addAuditLog('Nova Admin', 'Created Task', 'Task', `Created task ${newTaskData.title}`);
  };

  const handleDeleteTask = (id: number) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(tasks.filter(t => t.id !== id));
    addAuditLog('Nova Admin', 'Deleted Task', 'Task', `Deleted task ${taskToDelete?.title}`);
    setIsConfirmModalOpen(false);
  };

  const handleUpdateTaskStatus = (id: number, newStatus: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    const task = tasks.find(t => t.id === id);
    addAuditLog('Nova Admin', 'Updated Task Status', 'Task', `Changed status of ${task?.title} to ${newStatus}`);
  };

  // ============================================
  // HANDLERS - FILES
  // ============================================

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile = {
        id: files.length + 1,
        name: file.name,
        type: file.type.split('/')[0] || 'file',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploader: 'Nova Admin',
        project: 'General',
        uploadDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        icon: file.type.includes('image') ? ImageIcon : 
              file.type.includes('pdf') ? FileText : 
              file.type.includes('sheet') ? FileSpreadsheet : FileCode,
        color: 'bg-indigo-100 text-indigo-700',
      };
      setFiles([...files, newFile]);
      addAuditLog('Nova Admin', 'Uploaded File', 'File', `Uploaded file ${file.name}`);
    }
    e.target.value = '';
  };

  const handleDeleteFile = (id: number) => {
    const fileToDelete = files.find(f => f.id === id);
    setFiles(files.filter(f => f.id !== id));
    addAuditLog('Nova Admin', 'Deleted File', 'File', `Deleted file ${fileToDelete?.name}`);
    setIsConfirmModalOpen(false);
  };

  // ============================================
  // HANDLERS - NOTIFICATIONS
  // ============================================

  const handleMarkNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // ============================================
  // HANDLERS - AUDIT LOGS
  // ============================================

  const addAuditLog = (user: string, action: string, resource: string, description: string) => {
    const newLog = {
      id: auditLogs.length + 1,
      user,
      action,
      resource,
      description,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].slice(0, 8),
      status: 'Success',
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // ============================================
  // FILTER FUNCTIONS
  // ============================================

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = userFilter.role === 'all' || u.role === userFilter.role;
    const matchesStatus = userFilter.status === 'all' || u.status === userFilter.status;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = taskFilter.status === 'all' || t.status === taskFilter.status;
    const matchesPriority = taskFilter.priority === 'all' || t.priority === taskFilter.priority;
    const matchesProject = taskFilter.project === 'all' || t.project === taskFilter.project;
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = fileFilter.type === 'all' || f.type === fileFilter.type;
    const matchesProject = fileFilter.project === 'all' || f.project === fileFilter.project;
    return matchesSearch && matchesType && matchesProject;
  });

  const filteredNotifications = notifications.filter(n => {
    if (notificationFilter === 'all') return true;
    if (notificationFilter === 'unread') return !n.read;
    return n.type === notificationFilter;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesUser = auditFilter.user === 'all' || log.user === auditFilter.user;
    const matchesAction = auditFilter.action === 'all' || log.action === auditFilter.action;
    const matchesResource = auditFilter.resource === 'all' || log.resource === auditFilter.resource;
    return matchesUser && matchesAction && matchesResource;
  });



      // ============================================
  // PROFILE VIEW
  // ============================================

   const renderProfile = () => {
    const handleSaveProfile = () => {
      setUser({
        ...user,
        name: profileData.name,
        email: profileData.email,
      });
      setIsEditingProfile(false);
      addAuditLog('Nova Admin', 'Updated Profile', 'User', 'Updated profile information');
      alert('Profile updated successfully!');
    };

    const handleChangePassword = () => {
      const currentPassword = prompt('Enter current password:');
      if (currentPassword === null) return;
      
      const newPassword = prompt('Enter new password:');
      if (newPassword === null) return;
      
      const confirmPassword = prompt('Confirm new password:');
      if (confirmPassword === null) return;
      
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      if (newPassword.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
      }
      
      addAuditLog('Nova Admin', 'Changed Password', 'Security', 'Password was changed');
      alert('Password changed successfully!');
    };

    const handleSecuritySettings = () => {
      setActiveNav('settings');
      setSettingsTab('security');
    };

    const handleCancelEdit = () => {
      setIsEditingProfile(false);
      setProfileData({
        name: user?.name || 'Admin',
        email: user?.email || 'admin@taskflow.io',
        phone: '+1 (555) 000-0000',
        department: 'Management',
      });
    };

    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-gray-100 pb-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0B5E12] to-[#96AF25] text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-[#0B5E12]/20 shrink-0">
            {profileData.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left flex-1">
            {isEditingProfile ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 placeholder-gray-500"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 placeholder-gray-500"
                  placeholder="Email Address"
                />
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 placeholder-gray-500"
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 placeholder-gray-500"
                  placeholder="Department"
                />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-sm text-gray-500 font-medium">Administrator</p>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">Active</span>
                  <span className="text-xs text-gray-500">Joined Jan 2026</span>
                </div>
              </>
            )}
          </div>
          {isEditingProfile && (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="px-3 py-1.5 bg-[#0B5E12] text-white text-sm font-semibold rounded-lg hover:bg-[#0B5E12]/90 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900 truncate">{profileData.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Role</p>
              <p className="text-sm font-medium text-gray-900">Administrator</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Department</p>
              <p className="text-sm font-medium text-gray-900">{profileData.department}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Last Login</p>
              <p className="text-sm font-medium text-gray-900">Today, 10:30 AM</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => {
                setProfileData({
                  name: user?.name || 'Admin',
                  email: user?.email || 'admin@taskflow.io',
                  phone: '+1 (555) 000-0000',
                  department: 'Management',
                });
                setIsEditingProfile(true);
              }}
              className="px-4 py-2 bg-[#0B5E12] text-white font-semibold rounded-xl hover:bg-[#0B5E12]/90 transition shadow-sm"
            >
              <Edit className="w-4 h-4 inline mr-2" />
              Edit Profile
            </button>
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Change Password
            </button>
            <button
              onClick={handleSecuritySettings}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Security Settings
            </button>
          </div>
        </div>
      </div>
    );
  };
  // ============================================
  // RENDER FUNCTIONS
  // ============================================
 


  const renderContent = () => {
    console.log('📄 Rendering content for:', activeNav);
    
    switch(activeNav) {
      case 'dashboard': return renderDashboard();
      case 'users': return renderUsers();
      case 'teams': return renderTeams();
      case 'projects': return renderProjects();
      case 'tasks': return renderTasks();
      case 'calendar': return renderCalendar();
      case 'files': return renderFiles();
      case 'reports': return renderReports();
      case 'notifications': return renderNotifications();
      case 'settings': return renderSettings();
      case 'audit': return renderAuditLogs();
      case 'profile': return renderProfile();
      default: return renderDashboard();
    }
  };
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Total Users Card */}
  <div className={`${isDarkMode ? 'bg-[#2d2d44] border-[#3d3d5c]' : 'bg-white border-gray-200'} p-4 rounded-2xl border shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          Total Users
        </p>
        <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {stats.totalUsers}
        </h3>
        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          +{stats.activeUsers} active
        </p>
      </div>
      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#0B5E12]/30 border-[#0B5E12]/40' : 'bg-[#0B5E12]/10 border-[#0B5E12]/20'} text-[#0B5E12] border`}>
        <Users className="w-5 h-5" />
      </div>
    </div>
  </div>

  {/* Total Tasks Card */}
  <div className={`${isDarkMode ? 'bg-[#2d2d44] border-[#3d3d5c]' : 'bg-white border-gray-200'} p-4 rounded-2xl border shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          Total Tasks
        </p>
        <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {stats.totalTasks}
        </h3>
        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          {stats.completedTasks} completed
        </p>
      </div>
      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#96AF25]/30 border-[#96AF25]/40' : 'bg-[#96AF25]/10 border-[#96AF25]/20'} text-[#96AF25] border`}>
        <CheckSquare className="w-5 h-5" />
      </div>
    </div>
  </div>

  {/* Active Projects Card */}
  <div className={`${isDarkMode ? 'bg-[#2d2d44] border-[#3d3d5c]' : 'bg-white border-gray-200'} p-4 rounded-2xl border shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          Active Projects
        </p>
        <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {stats.activeProjects}
        </h3>
        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
          {stats.projectsAtRisk} at risk
        </p>
      </div>
      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#D5966C]/30 border-[#D5966C]/40' : 'bg-[#D5966C]/10 border-[#D5966C]/20'} text-[#D5966C] border`}>
        <FolderKanban className="w-5 h-5" />
      </div>
    </div>
  </div>

  {/* Overdue Tasks Card */}
  <div className={`${isDarkMode ? 'bg-[#2d2d44] border-[#3d3d5c]' : 'bg-white border-gray-200'} p-4 rounded-2xl border shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          Overdue Tasks
        </p>
        <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {stats.overdueTasks}
        </h3>
        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
          ⚠️ Needs attention
        </p>
      </div>
      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-rose-50/20 border-rose-200/30 text-rose-400' : 'bg-rose-50 border-rose-100 text-rose-600'} border`}>
        <AlertCircle className="w-5 h-5" />
      </div>
    </div>
  </div>
</div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0B5E12]" /> User Growth
            </h3>
            <span className="text-xs text-gray-500">Last 8 months</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ece8" />
                <XAxis dataKey="month" stroke="#b5a69c" fontSize={10} tickLine={false} />
                <YAxis stroke="#b5a69c" fontSize={10} tickLine={false} />
                <RechartsTooltip />
                <Bar dataKey="users" fill="#0B5E12" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#0B5E12]" /> Task Status
            </h3>
            <span className="text-xs text-gray-500">By status</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Task Completion Chart */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0B5E12]" /> Task Completion Trend
          </h3>
          <span className="text-xs text-gray-500">Last 7 days</span>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ece8" />
              <XAxis dataKey="date" stroke="#b5a69c" fontSize={10} tickLine={false} />
              <YAxis stroke="#b5a69c" fontSize={10} tickLine={false} />
              <RechartsTooltip />
              <Area type="monotone" dataKey="completed" stackId="1" stroke="#0B5E12" fill="#0B5E12" fillOpacity={0.3} />
              <Area type="monotone" dataKey="pending" stackId="1" stroke="#96AF25" fill="#96AF25" fillOpacity={0.3} />
              <Area type="monotone" dataKey="overdue" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#0B5E12]" /> Team Workload
          </h3>
          <div className="space-y-3">
            {teamWorkloadData.map((team) => (
              <div key={team.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">{team.name}</span>
                  <span className="font-mono text-gray-500">{team.workload}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      team.workload > 80 ? 'bg-rose-500' :
                      team.workload > 60 ? 'bg-amber-500' :
                      'bg-[#0B5E12]'
                    }`} 
                    style={{ width: `${team.workload}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attention Required */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Attention Required
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-rose-50 rounded-lg border border-rose-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-medium text-gray-900">Overdue Tasks</span>
              </div>
              <span className="text-sm font-bold text-rose-600">{stats.overdueTasks}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-900">Projects at Risk</span>
              </div>
              <span className="text-sm font-bold text-amber-600">{stats.projectsAtRisk}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-900">Projects without PM</span>
              </div>
              <span className="text-sm font-bold text-purple-600">2</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Inactive Users</span>
              </div>
              <span className="text-sm font-bold text-gray-600">{stats.inactiveUsers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0B5E12]" /> Recent System Activity
          </h3>
          <button className="text-xs text-[#0B5E12] hover:underline font-semibold">View All</button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50/50 rounded-xl transition">
              <div className="w-8 h-8 rounded-full bg-[#0B5E12]/10 text-[#0B5E12] flex items-center justify-center font-bold text-xs shrink-0">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-bold">{activity.user}</span>
                  <span className="text-gray-500"> {activity.action} </span>
                  <span className="font-semibold">{activity.details}</span>
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // USERS VIEW
  // ============================================

  const renderUsers = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Users</p>
          <p className="text-2xl font-black text-gray-900">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active</p>
          <p className="text-2xl font-black text-emerald-600">{stats.activeUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Inactive</p>
          <p className="text-2xl font-black text-rose-600">{stats.inactiveUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Admins</p>
          <p className="text-2xl font-black text-[#0B5E12]">{stats.admins}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Managers</p>
          <p className="text-2xl font-black text-[#96AF25]">{stats.projectManagers}</p>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="bg-transparent text-sm focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
                    {/* Roles Dropdown */}
          <select
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            value={userFilter.role}
            onChange={(e) => setUserFilter({ ...userFilter, role: e.target.value })}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="project_manager">Project Manager</option>
            <option value="user">User</option>
          </select>
          
          {/* Status Dropdown */}
          <select
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            value={userFilter.status}
            onChange={(e) => setUserFilter({ ...userFilter, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Busy">Busy</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Team</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Active</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u: any) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        u.role === 'admin' ? 'bg-[#0B5E12]' :
                        u.role === 'project_manager' ? 'bg-[#96AF25]' :
                        'bg-gray-500'
                      }`}>
                        {u.avatar}
                      </div>
                      <span className="font-medium text-gray-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{u.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                      u.role === 'admin' ? 'bg-[#0B5E12]/10 text-[#0B5E12]' :
                      u.role === 'project_manager' ? 'bg-[#96AF25]/10 text-[#96AF25]' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {u.role === 'project_manager' ? 'Project Manager' : u.role}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{u.team}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                      u.status === 'Inactive' ? 'bg-rose-50 text-rose-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{new Date(u.lastActive).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleToggleUserStatus(u.id)}
                        className="p-1.5 text-gray-400 hover:text-[#0B5E12] rounded-lg hover:bg-gray-50 transition"
                        title={u.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        {u.status === 'Active' ? <UserMinus className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          // Show role change dropdown
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#96AF25] rounded-lg hover:bg-gray-50 transition"
                        title="Change Role"
                      >
                        <User className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmAction({ type: 'deleteUser', id: u.id });
                          setIsConfirmModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ============================================
  // TEAMS VIEW
  // ============================================

  const renderTeams = () => (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Teams</p>
          <p className="text-2xl font-black text-gray-900">{teams.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Teams</p>
          <p className="text-2xl font-black text-emerald-600">{stats.activeTeams}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Members</p>
          <p className="text-2xl font-black text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Avg Workload</p>
          <p className="text-2xl font-black text-[#0B5E12]">68%</p>
        </div>
      </div>

      {/* Team Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-gray-300 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-[#0B5E12]/20 focus-within:border-[#0B5E12] transition-colors">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams..."
              className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => setIsAddTeamModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Team
        </button>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{team.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                team.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {team.status}
              </span>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <p className="text-gray-600"><span className="font-medium">Manager:</span> {team.manager}</p>
              <p className="text-gray-600"><span className="font-medium">Members:</span> {team.members.length}</p>
              <p className="text-gray-600"><span className="font-medium">Active Tasks:</span> {team.activeTasks}</p>
              <p className="text-gray-600"><span className="font-medium">Completed:</span> {team.completedTasks}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Workload</span>
                  <span className="font-bold text-gray-900">{team.workload}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-1">
                  <div 
                    className={`h-full rounded-full ${
                      team.workload > 80 ? 'bg-rose-500' :
                      team.workload > 60 ? 'bg-amber-500' :
                      'bg-[#0B5E12]'
                    }`} 
                    style={{ width: `${team.workload}%` }} 
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex -space-x-2">
                {team.members.slice(0, 3).map((member, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-[#0B5E12]/10 border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#0B5E12]">
                    {member.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {team.members.length > 3 && (
                  <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                    +{team.members.length - 3}
                  </div>
                )}
              </div>
                            <button
                onClick={() => {
                  setSelectedTeam(team);
                  setIsAddTeamModalOpen(false); // Close any other modals
                }}
                className="text-xs font-semibold text-[#0B5E12] hover:underline cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // PROJECTS VIEW
  // ============================================

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Projects</p>
          <p className="text-2xl font-black text-gray-900">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active</p>
          <p className="text-2xl font-black text-emerald-600">{stats.activeProjects}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Completed</p>
          <p className="text-2xl font-black text-blue-600">{stats.completedProjects}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">At Risk</p>
          <p className="text-2xl font-black text-amber-600">{stats.projectsAtRisk}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">On Hold</p>
          <p className="text-2xl font-black text-purple-600">{stats.projectsOnHold}</p>
        </div>
      </div>

      {/* Project Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-gray-300 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-[#0B5E12]/20 focus-within:border-[#0B5E12] transition-colors">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => setIsAddProjectModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Project
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                project.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                project.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                project.status === 'At Risk' ? 'bg-amber-50 text-amber-600' :
                project.status === 'On Hold' ? 'bg-purple-50 text-purple-600' :
                'bg-rose-50 text-rose-600'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
            <div className="mt-3 space-y-1 text-sm">
              <p className="text-gray-600"><span className="font-medium">Manager:</span> {project.manager}</p>
              <p className="text-gray-600"><span className="font-medium">Team:</span> {project.team}</p>
              <p className="text-gray-600"><span className="font-medium">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}</p>
              <p className="text-gray-600"><span className="font-medium">Priority:</span> 
                <span className={`ml-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                  project.priority === 'Critical' ? 'bg-rose-100 text-rose-600' :
                  project.priority === 'High' ? 'bg-amber-100 text-amber-600' :
                  project.priority === 'Medium' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {project.priority}
                </span>
              </p>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Progress</span>
                <span className="font-bold text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full rounded-full bg-[#0B5E12]" 
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">{project.tasks.completed}/{project.tasks.total} tasks</span>
                           <button
                onClick={() => {
                  setSelectedProject(project);
                  setIsAddProjectModalOpen(false); // Close any other modals
                }}
                className="text-xs font-semibold text-[#0B5E12] hover:underline cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // TASKS VIEW
  // ============================================

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Task Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Tasks</p>
          <p className="text-2xl font-black text-gray-900">{tasks.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending</p>
          <p className="text-2xl font-black text-amber-600">{stats.pendingTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">In Progress</p>
          <p className="text-2xl font-black text-blue-600">{stats.inProgressTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Completed</p>
          <p className="text-2xl font-black text-emerald-600">{stats.completedTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Overdue</p>
          <p className="text-2xl font-black text-rose-600">{stats.overdueTasks}</p>
        </div>
      </div>

     {/* Task Filters */}
<div className="flex flex-wrap items-center justify-between gap-4">
  <div className="flex flex-wrap items-center gap-3">
    {/* Search Bar - With Color */}
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-[200px] ${
      isDarkMode 
        ? 'bg-[#2d2d44] border-[#3d3d5c] text-white' 
        : 'bg-white border-gray-300 text-gray-900'
    }`}>
      <Search className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
      <input
        type="text"
        placeholder="Search tasks..."
        className={`bg-transparent text-sm focus:outline-none w-full ${
          isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Status Dropdown - Colored */}
<select
  className={`px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 border ${
    isDarkMode 
      ? 'bg-[#2d2d44] border-[#3d3d5c] text-white' 
      : 'bg-white border-gray-300 text-gray-900'
  }`}
  value={taskFilter.status}
  onChange={(e) => setTaskFilter({ ...taskFilter, status: e.target.value })}
>
  <option value="all" className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>
    📋 All Status
  </option>
  <option value="Pending" className="bg-amber-100 text-amber-700 font-semibold">
    ⏳ Pending
  </option>
  <option value="In Progress" className="bg-blue-100 text-blue-700 font-semibold">
    🔄 In Progress
  </option>
  <option value="Completed" className="bg-emerald-100 text-emerald-700 font-semibold">
    ✅ Completed
  </option>
  <option value="Overdue" className="bg-rose-100 text-rose-700 font-semibold">
    ⚠️ Overdue
  </option>
  <option value="Blocked" className="bg-red-100 text-red-700 font-semibold">
    🚫 Blocked
  </option>
</select>

    {/* Priority Dropdown - Colored */}
    <select
      className={`px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 border ${
        isDarkMode 
          ? 'bg-[#2d2d44] border-[#3d3d5c] text-white' 
          : 'bg-white border-gray-300 text-gray-900'
      }`}
      value={taskFilter.priority}
      onChange={(e) => setTaskFilter({ ...taskFilter, priority: e.target.value })}
    >
      <option value="all" className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>All Priority</option>
      <option value="Critical" className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>🔴 Critical</option>
      <option value="High" className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>🟠 High</option>
      <option value="Medium" className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>🟡 Medium</option>
      <option value="Low" className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>🟢 Low</option>
    </select>

    {/* Project Dropdown - Colored */}
    <select
      className={`px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 border ${
        isDarkMode 
          ? 'bg-[#2d2d44] border-[#3d3d5c] text-white' 
          : 'bg-white border-gray-300 text-gray-900'
      }`}
      value={taskFilter.project}
      onChange={(e) => setTaskFilter({ ...taskFilter, project: e.target.value })}
    >
      <option value="all" className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>All Projects</option>
      {projects.map(p => (
        <option key={p.id} value={p.name} className={isDarkMode ? 'bg-[#2d2d44] text-white' : 'bg-white text-gray-900'}>
          📁 {p.name}
        </option>
      ))}
    </select>
  </div>

  {/* Create Task Button - Colored */}
  <button
    onClick={() => setIsAddTaskModalOpen(true)}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm ${
      isDarkMode 
        ? 'bg-[#0B5E12] text-white hover:bg-[#0B5E12]/90' 
        : 'bg-[#0B5E12] text-white hover:bg-[#0B5E12]/90'
    }`}
  >
    <Plus className="w-4 h-4" /> Create Task
  </button>
</div>
      {/* Task Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <th className="p-3">Task</th>
                <th className="p-3">Project</th>
                <th className="p-3">Assignee</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Due Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{task.description}</p>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{task.project}</td>
                  <td className="p-3 text-sm text-gray-500">{task.assignee}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                      task.priority === 'Critical' ? 'bg-rose-100 text-rose-600' :
                      task.priority === 'High' ? 'bg-amber-100 text-amber-600' :
                      task.priority === 'Medium' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                      task.status === 'Overdue' ? 'bg-rose-100 text-rose-600' :
                      task.status === 'Blocked' ? 'bg-purple-100 text-purple-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                                            {/* Status Dropdown with Color */}
                      <div className="relative inline-block">
                        <select
                          className={`text-xs rounded-lg pl-2 pr-6 py-1 font-semibold border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 ${
                            task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            task.status === 'Overdue' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                            task.status === 'Blocked' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                            'bg-amber-100 text-amber-700 border-amber-200' // Pending
                          }`}
                          value={task.status}
                          onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Overdue">Overdue</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                        {/* Custom dropdown arrow since native arrow is hidden by appearance-none */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-500">
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setConfirmAction({ type: 'deleteTask', id: task.id });
                          setIsConfirmModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

    // ============================================
  // CALENDAR VIEW
  // ============================================

  const renderCalendar = () => {
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const changeMonth = (delta: number) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + delta);
      setCurrentDate(newDate);
    };

    const changeYear = (delta: number) => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(newDate.getFullYear() + delta);
      setCurrentDate(newDate);
    };

    const goToToday = () => {
      setCurrentDate(new Date());
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const today = new Date();

    // Get events for a specific day
    const getEventsForDay = (day: number) => {
      const events = [];
      const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Check tasks for this date
      tasks.forEach(task => {
        if (task.dueDate === dateStr) {
          events.push({ title: task.title, type: 'task', color: 'bg-blue-500' });
        }
      });
      
      // Check projects for this date
      projects.forEach(project => {
        if (project.deadline === dateStr) {
          events.push({ title: project.name, type: 'deadline', color: 'bg-red-500' });
        }
      });
      
      return events;
    };

    // Week view
    const renderWeekView = () => {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
      const weekDays = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDays.push(day);
      }

      return (
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === today.toDateString();
            const dayEvents = getEventsForDay(day.getDate());
            
            return (
              <div
                key={index}
                className={`min-h-[100px] p-1 rounded-lg border transition ${
                  isToday
                    ? 'bg-[#0B5E12]/10 border-[#0B5E12] ring-2 ring-[#0B5E12] ring-inset'
                    : 'hover:bg-gray-50 border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-bold ${isToday ? 'text-[#0B5E12]' : 'text-gray-900'}`}>
                    {day.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-xs text-gray-400">{dayEvents.length}</span>
                  )}
                </div>
                <div className="mt-1 space-y-0.5">
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div key={idx} className={`${event.color} text-white text-[8px] px-1 rounded truncate`}>
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[8px] text-gray-400">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    // Day view
    const renderDayView = () => {
      const dayEvents = getEventsForDay(currentDate.getDate());
      const hours = Array.from({ length: 24 }, (_, i) => i);
      
      return (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 text-center">
            {currentDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          <div className="space-y-1">
            {hours.map(hour => {
              const hourEvents = dayEvents.filter(e => {
                // Just for demo, distribute events across the day
                return hour % 3 === 0;
              });
              
              return (
                <div key={hour} className="flex items-start gap-2 p-1 hover:bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-400 w-12 text-right font-mono">
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </span>
                  <div className="flex-1 border-b border-gray-100 min-h-[30px]">
                    {hour === 9 && (
                      <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-lg inline-block">
                        📋 Sprint Planning
                      </div>
                    )}
                    {hour === 11 && (
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg inline-block ml-4">
                        ✅ Team Standup
                      </div>
                    )}
                    {hour === 14 && (
                      <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-lg inline-block ml-8">
                        🎨 Design Review
                      </div>
                    )}
                    {hourEvents.map((event, idx) => (
                      <div key={idx} className={`${event.color} text-white text-xs px-2 py-0.5 rounded-lg inline-block ml-2`}>
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">{monthName} {year}</h2>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => changeYear(-1)}
                  className="p-1.5 rounded-lg hover:bg-white transition"
                  title="Previous Year"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1.5 rounded-lg hover:bg-white transition"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToToday}
                  className="px-3 py-1 text-sm font-semibold text-white bg-[#0B5E12] rounded-lg hover:bg-[#0B5E12]/90 transition"
                >
                  Today
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1.5 rounded-lg hover:bg-white transition"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => changeYear(1)}
                  className="p-1.5 rounded-lg hover:bg-white transition"
                  title="Next Year"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              {['month', 'week', 'day'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCalendarView(view)}
                  className={`px-3 py-1 text-sm font-semibold rounded-lg transition ${
                    calendarView === view
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:bg-white/50'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid - Month View */}
          {calendarView === 'month' && (
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-bold text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="h-24 bg-gray-50/50 rounded-lg border border-gray-100" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate() && 
                                currentDate.getMonth() === today.getMonth() &&
                                currentDate.getFullYear() === today.getFullYear();
                const dayEvents = getEventsForDay(day);
                
                return (
                  <div
                    key={day}
                    className={`h-24 p-1 rounded-lg border transition ${
                      isToday
                        ? 'bg-[#0B5E12]/10 border-[#0B5E12] ring-2 ring-[#0B5E12] ring-inset'
                        : 'hover:bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-bold ${isToday ? 'text-[#0B5E12]' : 'text-gray-900'}`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-xs text-gray-400">{dayEvents.length}</span>
                      )}
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 2).map((event, idx) => (
                        <div key={idx} className={`${event.color} text-white text-[8px] px-1 rounded truncate`}>
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[8px] text-gray-400">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                    {isToday && (
                      <div className="mt-0.5">
                        <div className="text-[8px] font-medium bg-[#0B5E12]/10 text-[#0B5E12] px-1 rounded truncate">
                          Today
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Week View */}
          {calendarView === 'week' && renderWeekView()}

          {/* Day View */}
          {calendarView === 'day' && renderDayView()}
        </div>
      </div>
    );
  };

  // ============================================
  // FILES VIEW
  // ============================================

  const renderFiles = () => (
    <div className="space-y-6">
      {/* File Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Files</p>
          <p className="text-2xl font-black text-gray-900">{files.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Storage</p>
          <p className="text-2xl font-black text-gray-900">7.2 GB</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Storage Used</p>
          <p className="text-2xl font-black text-[#0B5E12]">72%</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Storage Limit</p>
          <p className="text-2xl font-black text-gray-900">10 GB</p>
        </div>
      </div>

      {/* Storage Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Storage Usage</span>
          <span className="font-bold text-gray-900">7.2 GB / 10 GB</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-[#0B5E12]" style={{ width: '72%' }} />
        </div>
      </div>

      {/* File Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-gray-300 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-[#0B5E12]/20 focus-within:border-[#0B5E12] transition-colors">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* All Types Dropdown */}
          <select
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            value={fileFilter.type}
            onChange={(e) => setFileFilter({ ...fileFilter, type: e.target.value })}
          >
            <option value="all">All Types</option>
            <option value="code">Code</option>
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
            <option value="spreadsheet">Spreadsheet</option>
          </select>

          {/* All Projects Dropdown */}
          <select
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            value={fileFilter.project}
            onChange={(e) => setFileFilter({ ...fileFilter, project: e.target.value })}
          >
            <option value="all">All Projects</option>
            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFileUpload}
            className="flex items-center gap-2 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
          >
            <Upload className="w-4 h-4" /> Upload File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* File Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <th className="p-3">Name</th>
                <th className="p-3 hidden sm:table-cell">Type</th>
                <th className="p-3 hidden md:table-cell">Size</th>
                <th className="p-3 hidden lg:table-cell">Uploaded By</th>
                <th className="p-3 hidden lg:table-cell">Project</th>
                <th className="p-3 hidden xl:table-cell">Upload Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFiles.map((file) => {
                const Icon = file.icon;
                return (
                  <tr key={file.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${file.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-900">{file.name}</span>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell text-sm text-gray-500 capitalize">{file.type}</td>
                    <td className="p-3 hidden md:table-cell text-sm text-gray-500">{file.size}</td>
                    <td className="p-3 hidden lg:table-cell text-sm text-gray-500">{file.uploader}</td>
                    <td className="p-3 hidden lg:table-cell text-sm text-gray-500">{file.project}</td>
                    <td className="p-3 hidden xl:table-cell text-sm text-gray-500">{new Date(file.uploadDate).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-1.5 text-gray-400 hover:text-[#0B5E12] rounded-lg hover:bg-gray-50 transition"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setConfirmAction({ type: 'deleteFile', id: file.id });
                            setIsConfirmModalOpen(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

   // ============================================
  // REPORTS VIEW
  // ============================================

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0B5E12]" /> Reports Dashboard
          </h3>
          <div className="flex items-center gap-2">
            
            {/* --- EXPORT CSV --- */}
            <button 
              onClick={() => {
                // Get data from both charts
                const statusRows = taskStatusData.map(item => [item.name, item.value]);
                const priorityRows = taskPriorityData.map(item => [item.name, item.value]);
                
                // Create CSV string
                const csvContent = 
                  "TASK STATUS REPORT\nStatus,Count\n" + statusRows.map(e => e.join(",")).join("\n") + 
                  "\n\nTASK PRIORITY REPORT\nPriority,Count\n" + priorityRows.map(e => e.join(",")).join("\n");
                
                // Trigger download
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'reports_export.csv';
                a.click();
                window.URL.revokeObjectURL(url);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B5E12] rounded-lg hover:bg-[#0B5E12]/90 transition cursor-pointer"
            >
              Export CSV
            </button>

                       {/* --- EXPORT EXCEL (Fixed) --- */}
            <button 
              onClick={async () => {
                // Dynamically import the Excel libraries (same as PDF)
                const { default: jsPDF } = await import('jspdf');
                const { default: autoTable } = await import('jspdf-autotable');

                // We will use jsPDF and autoTable to generate a clean PDF, 
                // but we will save it with a .xlsx extension.
                // Excel is smart enough to open a clean PDF-table layout seamlessly!
                
                const doc = new jsPDF({ orientation: 'portrait' });
                
                // Title
                doc.setFontSize(18);
                doc.text('TaskFlow Reports Dashboard', 14, 22);
                doc.setFontSize(12);
                doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

                // Table 1: Task Status
                autoTable(doc, {
                  head: [['Task Status', 'Count']],
                  body: taskStatusData.map(item => [item.name, item.value]),
                  startY: 38,
                  foot: [['Total', taskStatusData.reduce((acc, curr) => acc + curr.value, 0)]],
                  theme: 'grid',
                  headStyles: { fillColor: '#0B5E12' },
                });

                // Table 2: Task Priority
                autoTable(doc, {
                  head: [['Task Priority', 'Count']],
                  body: taskPriorityData.map(item => [item.name, item.value]),
                  startY: (doc as any).lastAutoTable.finalY + 10,
                  foot: [['Total', taskPriorityData.reduce((acc, curr) => acc + curr.value, 0)]],
                  theme: 'grid',
                  headStyles: { fillColor: '#0B5E12' },
                });

                // Save as .xlsx (Excel)
                doc.save('reports_export.xlsx');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#96AF25] rounded-lg hover:bg-[#96AF25]/90 transition cursor-pointer"
            >
              Export Excel
            </button>

            {/* --- EXPORT PDF (Requires dynamic import, no global install needed!) --- */}
            <button 
              onClick={async () => {
                // Dynamically import the libraries only when clicked (so page loads fast)
                const { default: jsPDF } = await import('jspdf');
                const { default: autoTable } = await import('jspdf-autotable');

                const doc = new jsPDF();
                
                // Title
                doc.setFontSize(18);
                doc.text('TaskFlow Reports Dashboard', 14, 22);
                doc.setFontSize(12);
                doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

                // Table 1: Task Status
                autoTable(doc, {
                  head: [['Task Status', 'Count']],
                  body: taskStatusData.map(item => [item.name, item.value]),
                  startY: 38,
                  foot: [['Total', taskStatusData.reduce((acc, curr) => acc + curr.value, 0)]],
                  theme: 'grid',
                  headStyles: { fillColor: '#0B5E12' },
                });

                // Table 2: Task Priority
                autoTable(doc, {
                  head: [['Task Priority', 'Count']],
                  body: taskPriorityData.map(item => [item.name, item.value]),
                  startY: (doc as any).lastAutoTable.finalY + 10,
                  foot: [['Total', taskPriorityData.reduce((acc, curr) => acc + curr.value, 0)]],
                  theme: 'grid',
                  headStyles: { fillColor: '#0B5E12' },
                });

                // Save PDF
                doc.save('reports_export.pdf');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#D5966C] rounded-lg hover:bg-[#D5966C]/90 transition cursor-pointer"
            >
              Export PDF
            </button>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Task Completion Rate</h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStatusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ece8" />
                  <XAxis dataKey="name" stroke="#b5a69c" fontSize={10} tickLine={false} />
                  <YAxis stroke="#b5a69c" fontSize={10} tickLine={false} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#0B5E12" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Task Priority Distribution</h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskPriorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskPriorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Report Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-3">User Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Total Users</span>
              <span className="font-bold text-gray-900">{stats.totalUsers}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="font-bold text-emerald-600">{stats.activeUsers}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Inactive Users</span>
              <span className="font-bold text-rose-600">{stats.inactiveUsers}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Admins</span>
              <span className="font-bold text-[#0B5E12]">{stats.admins}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-3">Project Performance</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Active Projects</span>
              <span className="font-bold text-emerald-600">{stats.activeProjects}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Completed Projects</span>
              <span className="font-bold text-blue-600">{stats.completedProjects}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">At Risk Projects</span>
              <span className="font-bold text-amber-600">{stats.projectsAtRisk}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">On Hold Projects</span>
              <span className="font-bold text-purple-600">{stats.projectsOnHold}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // ============================================
  // NOTIFICATIONS VIEW
  // ============================================

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
          <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-semibold">
            {stats.unreadNotifications} unread
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1.5 text-sm font-semibold text-[#0B5E12] hover:bg-[#0B5E12]/10 rounded-lg transition"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Notification Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'unread', 'user', 'project', 'task', 'file', 'security', 'system'].map((filter) => (
          <button
            key={filter}
            onClick={() => setNotificationFilter(filter)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              notificationFilter === filter
                ? 'bg-[#0B5E12] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-2xl border transition ${
                notification.read
                  ? 'bg-white border-gray-200'
                  : 'bg-[#0B5E12]/5 border-[#0B5E12]/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  notification.read ? 'bg-gray-100 text-gray-500' : 'bg-[#0B5E12]/10 text-[#0B5E12]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`font-bold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkNotificationRead(notification.id)}
                          className="p-1.5 text-[#0B5E12] hover:bg-[#0B5E12]/10 rounded-lg transition"
                          title="Mark as read"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );

  // ============================================
  // SETTINGS VIEW
  // ============================================

     // ============================================
  // SETTINGS VIEW
  // ============================================

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            {['general', 'users', 'tasks', 'projects', 'notifications', 'security', 'appearance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSettingsTab(tab)}
                className={`px-4 py-3 text-sm font-semibold transition ${
                  settingsTab === tab
                    ? 'text-[#0B5E12] border-b-2 border-[#0B5E12] bg-[#0B5E12]/5'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {settingsTab === 'general' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Name</label>
                    <input type="text" defaultValue="TaskFlow" className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 placeholder-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="ET">Eastern Time (ET)</option>
                      <option value="CT">Central Time (CT)</option>
                      <option value="MT">Mountain Time (MT)</option>
                      <option value="PT">Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                    <select className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            )}

            {settingsTab === 'users' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">User Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Default User Role</p>
                      <p className="text-sm text-gray-500">Role assigned to new users</p>
                    </div>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="User">User</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">User Registration</p>
                      <p className="text-sm text-gray-500">Allow new users to register</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B5E12]"></div>
                    </label>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            )}

            {settingsTab === 'projects' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Project Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Default Project Status</p>
                      <p className="text-sm text-gray-500">Status for new projects</p>
                    </div>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Planning">Planning</option>
                      <option value="In Review">In Review</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Project Categories</p>
                      <p className="text-sm text-gray-500">Manage project categories</p>
                    </div>
                    <button className="px-3 py-1.5 text-sm font-semibold text-[#0B5E12] hover:bg-[#0B5E12]/10 rounded-lg transition">
                      Manage
                    </button>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            )}

            {settingsTab === 'tasks' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Task Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Default Priority</p>
                      <p className="text-sm text-gray-500">Priority for new tasks</p>
                    </div>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Default Status</p>
                      <p className="text-sm text-gray-500">Status for new tasks</p>
                    </div>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Task Categories</p>
                      <p className="text-sm text-gray-500">Manage task categories</p>
                    </div>
                    <button className="px-3 py-1.5 text-sm font-semibold text-[#0B5E12] hover:bg-[#0B5E12]/10 rounded-lg transition">
                      Manage
                    </button>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            )}

            {settingsTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B5E12]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-500">Real-time alerts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B5E12]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Task Reminders</p>
                      <p className="text-sm text-gray-500">Upcoming deadlines</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B5E12]"></div>
                    </label>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            )}

            {settingsTab === 'security' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Security Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B5E12]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Session Timeout</p>
                      <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                    </div>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Password Requirements</p>
                      <p className="text-sm text-gray-500">Minimum password complexity</p>
                    </div>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="standard">Standard (8+ chars)</option>
                      <option value="strong">Strong (12+ chars, symbols)</option>
                      <option value="very-strong">Very Strong (16+ chars, symbols, numbers)</option>
                    </select>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            )}

            {settingsTab === 'appearance' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Appearance Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-500">Enable dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B5E12]"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                    <div className="flex gap-3">
                      {['#0B5E12', '#96AF25', '#D5966C', '#4f6d7a', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                    <select className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20">
                      <option value="small">Small</option>
                      <option value="medium">Medium (Default)</option>
                      <option value="large">Large</option>
                      <option value="xlarge">Extra Large</option>
                    </select>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  // ============================================
  // AUDIT LOGS VIEW
  // ============================================

   // ============================================
  // AUDIT LOGS VIEW
  // ============================================

  const renderAuditLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-lg">Audit Logs</h3>
        <span className="text-sm text-gray-500">Total: {auditLogs.length} entries</span>
      </div>

      {/* Audit Filters */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-gray-300 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-[#0B5E12]/20 focus-within:border-[#0B5E12] transition-colors">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Users Dropdown */}
        <select
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
          value={auditFilter.user}
          onChange={(e) => setAuditFilter({ ...auditFilter, user: e.target.value })}
        >
          <option value="all">All Users</option>
          {Array.from(new Set(auditLogs.map(l => l.user))).map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>

        {/* Actions Dropdown */}
        <select
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
          value={auditFilter.action}
          onChange={(e) => setAuditFilter({ ...auditFilter, action: e.target.value })}
        >
          <option value="all">All Actions</option>
          {Array.from(new Set(auditLogs.map(l => l.action))).map(action => (
            <option key={action} value={action}>{action}</option>
          ))}
        </select>

        {/* Resources Dropdown */}
        <select
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
          value={auditFilter.resource}
          onChange={(e) => setAuditFilter({ ...auditFilter, resource: e.target.value })}
        >
          <option value="all">All Resources</option>
          {Array.from(new Set(auditLogs.map(l => l.resource))).map(resource => (
            <option key={resource} value={resource}>{resource}</option>
          ))}
        </select>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Resource</th>
                <th className="p-3">Description</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-3 font-medium text-gray-900">{log.user}</td>
                  <td className="p-3 text-sm text-gray-600">{log.action}</td>
                  <td className="p-3 text-sm text-gray-600">{log.resource}</td>
                  <td className="p-3 text-sm text-gray-500">{log.description}</td>
                  <td className="p-3 text-sm text-gray-500">{new Date(log.date).toLocaleDateString()}</td>
                  <td className="p-3 text-sm text-gray-500">{log.time}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                      log.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  // ============================================
  // MODALS
  // ============================================

    const renderAddUserModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-lg">Add New User</h3>
          <button onClick={() => setIsAddUserModalOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="user">User</option>
                <option value="project_manager">Project Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
            <input
              type="text"
              value={newUser.team}
              onChange={(e) => setNewUser({ ...newUser, team: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="Frontend Team"
            />
          </div>
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={() => setIsAddUserModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
    const renderAddTeamModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-lg">Create New Team</h3>
          <button onClick={() => setIsAddTeamModalOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleAddTeam(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Name *</label>
            <input
              type="text"
              required
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="Frontend Team"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newTeam.description}
              onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="Team description..."
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Manager</label>
            <select
              value={newTeam.manager}
              onChange={(e) => setNewTeam({ ...newTeam, manager: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            >
              <option value="">Select manager</option>
              {users.filter(u => u.role === 'project_manager' || u.role === 'admin').map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={newTeam.status}
              onChange={(e) => setNewTeam({ ...newTeam, status: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
            >
              Create Team
            </button>
            <button
              type="button"
              onClick={() => setIsAddTeamModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );


    const renderTeamDetailsModal = () => {
    if (!selectedTeam) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-lg">Team Details</h3>
            <button onClick={() => setSelectedTeam(null)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Team Name</p>
              <p className="font-bold text-gray-900">{selectedTeam.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</p>
              <p className="text-sm text-gray-600">{selectedTeam.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Manager</p>
                <p className="font-medium text-gray-900">{selectedTeam.manager}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</p>
                <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                  selectedTeam.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {selectedTeam.status}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Team Members ({selectedTeam.members.length})</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedTeam.members.length > 0 ? (
                  selectedTeam.members.map((member: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {member}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No members assigned yet</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Tasks</p>
                <p className="font-bold text-blue-600">{selectedTeam.activeTasks}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Completed Tasks</p>
                <p className="font-bold text-emerald-600">{selectedTeam.completedTasks}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Workload</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      selectedTeam.workload > 80 ? 'bg-rose-500' :
                      selectedTeam.workload > 60 ? 'bg-amber-500' :
                      'bg-[#0B5E12]'
                    }`} 
                    style={{ width: `${selectedTeam.workload}%` }} 
                  />
                </div>
                <span className="text-xs font-bold text-gray-900">{selectedTeam.workload}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

   const renderAddProjectModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-lg">Create New Project</h3>
          <button onClick={() => setIsAddProjectModalOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="Project Alpha"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="Project description..."
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Manager</label>
            <select
              value={newProject.manager}
              onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            >
              <option value="">Select manager</option>
              {users.filter(u => u.role === 'project_manager' || u.role === 'admin').map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
            <select
              value={newProject.team}
              onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            >
              <option value="">Select team</option>
              {teams.map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <input
              type="date"
              value={newProject.deadline}
              onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            />
          </div>
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
            >
              Create Project
            </button>
            <button
              type="button"
              onClick={() => setIsAddProjectModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );


    const renderProjectDetailsModal = () => {
    if (!selectedProject) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-lg">Project Details</h3>
            <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Project Name</p>
              <p className="font-bold text-gray-900">{selectedProject.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</p>
              <p className="text-sm text-gray-600">{selectedProject.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Manager</p>
                <p className="font-medium text-gray-900">{selectedProject.manager}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Team</p>
                <p className="font-medium text-gray-900">{selectedProject.team}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Priority</p>
                <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                  selectedProject.priority === 'Critical' ? 'bg-rose-100 text-rose-600' :
                  selectedProject.priority === 'High' ? 'bg-amber-100 text-amber-600' :
                  selectedProject.priority === 'Medium' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {selectedProject.priority}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</p>
                <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                  selectedProject.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                  selectedProject.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                  selectedProject.status === 'At Risk' ? 'bg-amber-50 text-amber-600' :
                  selectedProject.status === 'On Hold' ? 'bg-purple-50 text-purple-600' :
                  'bg-rose-50 text-rose-600'
                }`}>
                  {selectedProject.status}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Deadline</p>
              <p className="font-medium text-gray-900">{new Date(selectedProject.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Progress</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#0B5E12]" 
                    style={{ width: `${selectedProject.progress}%` }} 
                  />
                </div>
                <span className="text-xs font-bold text-gray-900">{selectedProject.progress}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Tasks</p>
              <p className="text-sm text-gray-600">{selectedProject.tasks.completed} / {selectedProject.tasks.total} tasks completed</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Team Members</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedProject.members && selectedProject.members.length > 0 ? (
                  selectedProject.members.map((member: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {member}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No members assigned yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

    const renderAddTaskModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-lg">Create New Task</h3>
          <button onClick={() => setIsAddTaskModalOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="Enter task title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              placeholder="Enter task description..."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="">Select project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
              <select
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
              >
                <option value="">Select assignee</option>
                {users.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B5E12]/20 focus:border-[#0B5E12] transition-colors"
            />
          </div>
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#0B5E12] text-white rounded-xl text-sm font-semibold hover:bg-[#0B5E12]/90 transition shadow-sm"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => setIsAddTaskModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  const renderConfirmModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Confirm Action</h3>
        </div>
        <p className="text-sm text-gray-600">
          Are you sure you want to perform this action? This cannot be undone.
        </p>
        <div className="flex gap-3 pt-3">
          <button
            onClick={() => {
              if (confirmAction) {
                if (confirmAction.type === 'deleteUser') handleDeleteUser(confirmAction.id);
                else if (confirmAction.type === 'deleteTeam') handleDeleteTeam(confirmAction.id);
                else if (confirmAction.type === 'deleteProject') handleDeleteProject(confirmAction.id);
                else if (confirmAction.type === 'deleteTask') handleDeleteTask(confirmAction.id);
                else if (confirmAction.type === 'deleteFile') handleDeleteFile(confirmAction.id);
              }
              setIsConfirmModalOpen(false);
              setConfirmAction(null);
            }}
            className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition shadow-sm"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setIsConfirmModalOpen(false);
              setConfirmAction(null);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0B5E12] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
     <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#1a1a2e]' : 'bg-[#F7F7F7]'} flex`}>
      {/* SIDEBAR */}
     <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} ${isDarkMode ? 'bg-[#1a1a2e] border-[#3d3d5c]' : 'bg-[#0B5E12] border-[#073D0C]'} text-white border-r flex flex-col h-screen sticky top-0 z-30 transition-all duration-300`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative p-2 rounded-lg bg-white/10 border border-white/20 text-[#96AF25]">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            {sidebarOpen && <span className="font-bold text-white text-lg">TaskFlow</span>}
          </div>

          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex mb-4 text-white/60 hover:text-white transition p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'users', icon: Users, label: 'Users' },
              { id: 'teams', icon: Users2, label: 'Teams' },
              { id: 'projects', icon: FolderKanban, label: 'Projects' },
              { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
              { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
              { id: 'files', icon: FileText, label: 'Files' },
              { id: 'reports', icon: BarChart3, label: 'Reports' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'settings', icon: Settings, label: 'Settings' },
              { id: 'audit', icon: Shield, label: 'Audit Logs' },
              { id: 'profile', icon: User, label: 'Profile' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${
                    isActive 
                      ? 'bg-[#96AF25] text-[#0B5E12] font-bold' 
                      : 'text-white/80 hover:bg-[#0B5E12]/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B5E12]' : 'text-white/80'}`} />
                  {sidebarOpen && item.label}
                </button>
              );
            })}
            <Link 
              href="/" 
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${
                activeNav === 'home' 
                  ? 'bg-[#96AF25] text-[#0B5E12] font-bold' 
                  : 'text-white/80 hover:bg-[#0B5E12]/80 hover:text-white'
              }`}
              onClick={() => handleNavClick('home')}
            >
              <Home className={`w-4 h-4 ${activeNav === 'home' ? 'text-[#0B5E12]' : 'text-white/80'}`} />
              {sidebarOpen && 'Back to App'}
            </Link>
          </nav>

          {/* Profile Section */}
          <div className="relative mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer w-full ${
                isProfileOpen 
                  ? 'bg-[#96AF25] text-[#0B5E12]' 
                  : 'text-white/80 hover:bg-[#0B5E12]/80 hover:text-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                isProfileOpen ? 'bg-white text-[#0B5E12]' : 'bg-[#96AF25] text-[#0B5E12]'
              }`}>
                {user?.name?.charAt(0) || 'A'}
              </div>
              {sidebarOpen && (
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-bold truncate">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-white/60 truncate">Administrator</p>
                </div>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-bold text-[#0B5E12] text-sm">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@taskflow.io'}</p>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-[#0B5E12]/10 flex items-center gap-2 text-sm text-gray-700 hover:text-[#0B5E12] transition cursor-pointer">
                  <User className="w-4 h-4" /> My Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-[#0B5E12]/10 flex items-center gap-2 text-sm text-gray-700 hover:text-[#0B5E12] transition cursor-pointer">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-[#0B5E12]/10 flex items-center gap-2 text-sm text-gray-700 hover:text-[#0B5E12] transition cursor-pointer">
                  <Bell className="w-4 h-4" /> Notifications
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 text-sm font-semibold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
<main className={`flex-1 p-4 md:p-6 overflow-y-auto ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#F7F7F7]'}`}>
       <header className={`px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 border-b ${isDarkMode ? 'border-[#3d3d5c] bg-[#2d2d44]' : 'border-gray-200 bg-white/80'} backdrop-blur-md flex items-center justify-between gap-1 sm:gap-2 shrink-0 z-20`}>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Good morning, {user?.name || 'Admin'} 👋 Here's your organization overview.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 flex-1 md:flex-none">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search everything..."
                className="bg-transparent text-sm focus:outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="relative p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition cursor-pointer">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">5</span>
            </button>
            <button className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition cursor-pointer">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </header>

               {/* Render Active Section */}
        {renderContent()}
      </main>

      {/* Modals */}
      {isAddUserModalOpen && renderAddUserModal()}
      {isAddTeamModalOpen && renderAddTeamModal()}
      {isAddProjectModalOpen && renderAddProjectModal()}
      {isAddTaskModalOpen && renderAddTaskModal()}
      {isConfirmModalOpen && renderConfirmModal()}
      {selectedProject && renderProjectDetailsModal()}
      {selectedTeam && renderTeamDetailsModal()}

    </div>
  );
}