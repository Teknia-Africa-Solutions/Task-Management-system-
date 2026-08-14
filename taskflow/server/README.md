# TaskFlow API (server)

REST API for TaskFlow — **Express + MySQL**, JWT auth, role-based access, daily
clock-in time tracking, weekly reports, and real-time updates via Socket.IO.

This is the backend the main app's React contexts are designed to talk to. It
lives beside the frontend in `server/` and is its own npm package.

## Prerequisites

- Node.js 18+
- A running **MySQL 8** or **MariaDB 10.4+** server

## Setup

```bash
cd server
npm install
cp .env.example .env        # then edit DB_USER / DB_PASSWORD to match your MySQL
npm run db:reset            # creates the DB, applies schema.sql, then seeds it
npm run dev                 # starts http://localhost:4000  (use `npm start` for prod)
```

`npm run db:reset` = `db:schema` (drop + recreate all tables) + `db:seed`
(load demo data). Run `npm run db:seed` alone to re-seed without dropping.

Health check: `curl http://localhost:4000/api/health` → `{"ok":true,"db":"up"}`

## Demo logins (after seeding)

All seeded users share the password from `SEED_PASSWORD` (default `password123`).

| Role   | Email               | What they can do |
|--------|---------------------|------------------|
| admin  | `nova@taskflow.io`  | Everything: team roster, monitor, all tasks, reassign, create projects/notifications |
| member | `jane@taskflow.io`  | Only their own tasks, their supervisor, their dashboard, clock-in, reports |

New sign-ups via `POST /api/auth/register` are **always members** — admin is
never self-assignable.

## Roles (enforced server-side, not just hidden in the UI)

- **member**: sees only tasks assigned to them; cannot list other members; can
  message only their supervisor; can upload files/URLs; clocks in once per day;
  submits weekly reports.
- **admin** (project manager / supervisor): full team roster + progress monitor,
  all tasks (create/edit/delete/reassign), all reports, create projects and
  notifications, live view of who is clocked in.

## Endpoints

Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`,
`GET /auth/supervisors`

Data (all under `/api`, all require `Authorization: Bearer <token>`):

- `GET/POST/PATCH/DELETE /tasks` — member-scoped; admin sees all
- `GET /team`, `GET /team/monitor` — **admin only**
- `GET/POST /projects`, `GET /projects/mine`
- `GET/POST/DELETE /calendar`
- `GET /messages/contacts`, `GET /messages/:userId`, `POST /messages`
- `GET /files`, `POST /files/url`, `POST /files/upload`,
  `GET /files/:id/download`, `DELETE /files/:id`
- `GET /notifications`, `POST /notifications` (admin), `DELETE /notifications/:id`
- `GET /timelogs/today|mine`, `GET /timelogs/active` (admin),
  `POST /timelogs/clock-in`, `POST /timelogs/clock-out`
- `GET /reports/mine`, `GET /reports/all` (admin), `POST /reports`,
  `GET /reports/week-hours`, `GET /reports/stats`

## Real-time (Socket.IO)

Connect with `io(API_URL, { auth: { token } })`. Admins auto-join the `admins`
room and receive `timelog:update` events whenever any member clocks in or out —
that's what keeps the admin monitor live and transparent for the whole team.

## Notes / known limitations (this phase)

- Dismissing a **global** notification currently hides it for everyone (soft
  delete on the shared row). Per-user dismissal of globals would need a
  `notification_reads` join table — a later refinement.
- File uploads are stored on local disk under `server/uploads/`.
