# TaskFlow

A student-team task management dashboard, built with React (Vite) + Tailwind CSS + React Router + Recharts, matching the reference app.

## Run it

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Sign in

The app uses mock authentication for the prototype — enter any email/password on the login screen (pre-filled with `nova@gmail.com`) and it signs you in as the demo user, "Nova" (role: **admin**).

## Roles

There are two access roles: `admin` and `member`, stored on each user in `src/data/mockData.js` as `accessRole`. For this frontend-only phase, Nova is hardcoded as `admin` — real role switching (login as different users) will come once the Node/Express backend and auth are in place.

What admin gets that members don't:
- **Team page**: a "Team Progress Monitor" panel (avg. capacity, active tasks, completion rate, and a per-member capacity breakdown) — admin only.
- **My Tasks**: admins can edit/delete any task and reassign it to anyone. Regular members can only edit/delete tasks assigned to them, and can't reassign.

## Pages

- **Landing** (`/`) — marketing/intro page with team preview and "Go to Dashboard"
- **Login** (`/login`) — mock sign-in
- **Dashboard** (`/dashboard`) — task stats, task overview bar chart, upcoming deadlines
- **My Tasks** (`/my-tasks`) — filterable list (All / To Do / In Progress / Review / Done); create, edit, delete, and mark tasks done
- **Projects** (`/projects`) — project cards with progress bars
- **Team** (`/team`) — team roster with capacity/task stats, plus the admin-only monitoring panel
- **Calendar** (`/calendar`) — month view, navigate months, click a day to view/add/delete events
- **Messages** (`/messages`) — chat thread with Jane Doe; send messages
- **Files** (`/files`) — workspace file list; upload real files (name/size picked up automatically) and delete
- **Notifications** (`/notifications`) — notification feed; dismiss individual notifications, badge count updates live in the top bar
- **Reports** (`/reports`) — completion rate, avg. duration, productivity, and a 12-week trend line chart
- **New Task** — modal (top right "New Task" button) to add a task; appears immediately in My Tasks and updates Dashboard counts

## Stack

- React 19 + Vite
- Tailwind CSS (custom theme tokens for the TaskFlow palette)
- React Router (client-side routing + a protected-route wrapper for the mock auth)
- Recharts (bar chart on Dashboard, line chart on Reports)
- lucide-react (icons)

## Data & state

All tasks, team members, projects, calendar events, messages, files, and notifications start as mock data in `src/data/mockData.js`. Each domain has its own React Context (`src/context/`) so create/edit/delete is fully functional within a session — no backend yet, so it resets on refresh. This is intentionally structured so each context's functions (`addTask`, `editTask`, `deleteTask`, `uploadFile`, `sendMessage`, etc.) can be swapped for real API calls once the Express backend exists, without changing the pages that call them.

## Next: Node.js + Express backend

Planned next step — a REST API backed by MySQL, with:
- JWT-based auth issuing a real `accessRole` (`admin`/`member`) per user
- Endpoints mirroring each context: `/tasks`, `/projects`, `/team`, `/calendar`, `/messages`, `/files`, `/notifications`
- Role checks on the server (not just hidden UI) for anything admin-only, like the team monitoring data and reassigning tasks
