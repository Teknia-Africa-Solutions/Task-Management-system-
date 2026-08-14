// Seeds the database from the app's existing mock data plus a few time logs
// and reports so the charts / monitor have something to show.
// Usage: npm run db:seed   (run AFTER npm run db:schema)
import { pool, query } from "../src/db.js";
import { config } from "../src/config.js";
import { hashPassword } from "../src/utils/auth.js";

// ---- source data (mirrors ../../src/data/mockData.js) ----
const members = [
  { name: "Alex Admin",   email: "admin@taskflow.io", access: "admin",   title: "Administrator",    initials: "AA", color: "bg-accent-600",  phone: "+1 (555) 010-0000", status: "Active",     capacity: 50 },
  { name: "Nova",         email: "nova@taskflow.io",  access: "manager", title: "Project Manager",  initials: "NV", color: "bg-primary-500",  phone: "+1 (555) 019-2834", status: "Active",     capacity: 80 },
  { name: "Jane Doe",     email: "jane@taskflow.io",  access: "member", title: "UI/UX Designer",    initials: "JD", color: "bg-slate2-500", phone: "+1 (555) 014-4920", status: "Active",     capacity: 65 },
  { name: "Mike Johnson", email: "mike@taskflow.io",  access: "member", title: "Backend Developer", initials: "MJ", color: "bg-primary-600",  phone: "+1 (555) 017-8821", status: "In Meeting", capacity: 75 },
  { name: "Sarah Wilson", email: "sarah@taskflow.io", access: "member", title: "QA / Tester",       initials: "SW", color: "bg-primary-400",  phone: "+1 (555) 012-3391", status: "Busy",       capacity: 40 },
  { name: "David Brown",  email: "david@taskflow.io", access: "member", title: "DevOps Engineer",   initials: "DB", color: "bg-primary-700",  phone: "+1 (555) 013-7742", status: "Offline",    capacity: 55 },
  { name: "Emily Chen",   email: "emily@taskflow.io", access: "member", title: "Frontend Developer",initials: "EC", color: "bg-slate2-400", phone: "+1 (555) 011-5563", status: "Active",     capacity: 70 },
];

const tasks = [
  { title: "UI Design for Dashboard", priority: "HIGH",   status: "IN PROGRESS", category: "Design",     due: "2026-08-21", assignee: "Jane Doe" },
  { title: "Database Design",         priority: "MEDIUM", status: "TODO",        category: "Backend",    due: "2026-08-23", assignee: "David Brown" },
  { title: "API Integration",         priority: "MEDIUM", status: "IN PROGRESS", category: "Backend",    due: "2026-08-24", assignee: "Mike Johnson" },
  { title: "Project Documentation",   priority: "LOW",    status: "TODO",        category: "Docs",       due: "2026-08-28", assignee: "Sarah Wilson" },
  { title: "Client Meeting",          priority: "HIGH",   status: "DONE",        category: "Management", due: "2026-08-20", assignee: "Nova" },
  { title: "Landing Page Design",     priority: "HIGH",   status: "DONE",        category: "Design",     due: "2026-08-19", assignee: "Jane Doe" },
  { title: "User Testing Round 2",    priority: "MEDIUM", status: "REVIEW",      category: "QA",         due: "2026-08-26", assignee: "Sarah Wilson" },
  { title: "Deploy Staging Server",   priority: "HIGH",   status: "REVIEW",      category: "DevOps",     due: "2026-08-25", assignee: "David Brown" },
];

const events = [
  { date: "2026-08-21", title: "Project Proposal",     color: "rust" },
  { date: "2026-08-23", title: "UI Design",            color: "amber" },
  { date: "2026-08-24", title: "Client Presentation",  color: "rust" },
  { date: "2026-08-28", title: "Final Report",         color: "rust" },
];

const files = [
  { kind: "file", name: "Database_Schema_v2.sql",     size: "2.4 MB", type: "sql",   by: "Mike Johnson" },
  { kind: "file", name: "Q3_Financial_Forecast.xlsx", size: "1.8 MB", type: "xlsx",  by: "Jane Doe" },
  { kind: "file", name: "UI_Spec.png",                size: "8.1 MB", type: "image", by: "Jane Doe" },
  { kind: "file", name: "API_Doc.pdf",                size: "512 KB", type: "pdf",   by: "Nova" },
  { kind: "url",  name: "Staging deployment",          url: "https://staging.taskflow.example.com", type: "url", by: "David Brown" },
];

const notifications = [
  { user: null,       type: "info",    title: "Sprint Review Scheduled", description: "Nova added a new calendar entry for Aug 21st." },
  { user: null,       type: "success", title: "Task Completed",          description: "Jane marked 'Landing Page Design' as completed." },
  { user: "Jane Doe", type: "warning", title: "Upcoming Deadline",       description: "Your UI Design task is due soon!" },
];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

async function main() {
  const pw = await hashPassword(config.seedPassword);

  // Wipe (children first) so seed is idempotent.
  for (const t of [
    "weekly_reports", "time_logs", "notifications", "files", "messages",
    "calendar_events", "tasks", "project_members", "projects", "users",
  ]) {
    await pool.execute(`DELETE FROM ${t}`);
  }
  // ALTER TABLE isn't supported over the prepared-statement protocol, so use query().
  await pool.query("ALTER TABLE users AUTO_INCREMENT = 1");

  // Users
  const idByName = {};
  for (const m of members) {
    const [r] = await pool.execute(
      `INSERT INTO users (name, email, password_hash, access_role, job_title, initials, color, phone, status, capacity)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [m.name, m.email, pw, m.access, m.title, m.initials, m.color, m.phone, m.status, m.capacity]
    );
    idByName[m.name] = r.insertId;
  }
  // Supervisor: every member reports to Nova (the PM).
  const novaId = idByName["Nova"];
  await pool.execute(
    "UPDATE users SET supervisor_id = ? WHERE access_role = 'member'",
    [novaId]
  );

  // Project (with a real timeline + duration) owned by Nova.
  const [proj] = await pool.execute(
    `INSERT INTO projects (name, description, start_date, end_date, status, progress, done_count, total_count, icon, bar_color, button_color, owner_id)
     VALUES (?, ?, ?, ?, 'Active', 67, 12, 18, 'grid', 'bg-primary-500', 'bg-primary-500 hover:bg-primary-600', ?)`,
    [
      "Task Management System",
      "Capstone student project — a team task dashboard.",
      "2026-08-01",
      "2026-10-15",
      novaId,
    ]
  );
  const projectId = proj.insertId;
  for (const m of members) {
    await pool.execute("INSERT INTO project_members (project_id, user_id) VALUES (?, ?)", [
      projectId,
      idByName[m.name],
    ]);
  }

  // Extra projects for the Projects page.
  await pool.execute(
    `INSERT INTO projects (name, start_date, end_date, status, progress, done_count, total_count, icon, bar_color, button_color, owner_id)
     VALUES
     ('Inventory Management System', '2026-07-01', '2026-09-30', 'Active', 75, 15, 20, 'folder', 'bg-primary-500', 'bg-primary-500 hover:bg-primary-600', ?),
     ('Website Redesign',            '2026-08-05', '2026-09-20', 'Active', 53,  8, 15, 'file',   'bg-primary-400', 'bg-primary-400 hover:bg-primary-500', ?),
     ('Mobile App Development',      '2026-08-10', '2026-11-01', 'Active', 40, 10, 25, 'device', 'bg-slate2-500','bg-slate2-500 hover:bg-slate2-400', ?)`,
    [novaId, novaId, novaId]
  );

  // Tasks
  for (const t of tasks) {
    await pool.execute(
      `INSERT INTO tasks (title, category, priority, status, due_date, project_id, assignee_id, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [t.title, t.category, t.priority, t.status, t.due, projectId, idByName[t.assignee], novaId]
    );
  }

  // Calendar events
  for (const e of events) {
    await pool.execute(
      "INSERT INTO calendar_events (event_date, title, color, project_id, created_by) VALUES (?, ?, ?, ?, ?)",
      [e.date, e.title, e.color, projectId, novaId]
    );
  }

  // Files (+ URL entry)
  for (const f of files) {
    await pool.execute(
      `INSERT INTO files (kind, name, url, size_label, file_type, project_id, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [f.kind, f.name, f.url || null, f.size || null, f.type, projectId, idByName[f.by]]
    );
  }

  // Notifications
  for (const n of notifications) {
    await pool.execute(
      "INSERT INTO notifications (user_id, type, title, description) VALUES (?, ?, ?, ?)",
      [n.user ? idByName[n.user] : null, n.type, n.title, n.description]
    );
  }

  // A seed message thread: Jane <-> Nova (supervisor).
  const janeId = idByName["Jane Doe"];
  await pool.execute(
    "INSERT INTO messages (sender_id, recipient_id, body, created_at) VALUES (?, ?, ?, NOW() - INTERVAL 40 MINUTE)",
    [janeId, novaId, "Hey! How's the UI design coming along?"]
  );
  await pool.execute(
    "INSERT INTO messages (sender_id, recipient_id, body, created_at) VALUES (?, ?, ?, NOW() - INTERVAL 38 MINUTE)",
    [novaId, janeId, "Almost done! Just finishing the dashboard layout."]
  );

  // Time logs: past weekdays for a few members (completed sessions) so
  // reports/monitor have data. Leave "today" open so you can clock in.
  const workers = ["Jane Doe", "Mike Johnson", "Emily Chen", "David Brown"];
  for (let d = 1; d <= 10; d++) {
    const date = daysAgo(d);
    for (const name of workers) {
      const inH = 9;
      const dur = 240 + Math.floor(Math.random() * 180); // 4–7 h
      await pool.execute(
        `INSERT INTO time_logs (user_id, work_date, clock_in_at, clock_out_at, duration_minutes)
         VALUES (?, ?, ?, ?, ?)`,
        [
          idByName[name],
          date,
          `${date} ${String(inH).padStart(2, "0")}:00:00`,
          `${date} ${String(inH).padStart(2, "0")}:00:00`,
          dur,
        ]
      );
      // fix clock_out to be clock_in + duration
      await pool.execute(
        `UPDATE time_logs SET clock_out_at = clock_in_at + INTERVAL ? MINUTE
         WHERE user_id = ? AND work_date = ?`,
        [dur, idByName[name], date]
      );
    }
  }

  // A weekly report from Jane for last week.
  await pool.execute(
    `INSERT INTO weekly_reports (user_id, project_id, week_start, summary, blockers, hours_logged)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      janeId,
      projectId,
      daysAgo(7),
      "Finished the dashboard layout and landing page. Started the calendar view.",
      "Waiting on final color tokens from the PM.",
      22.5,
    ]
  );

  const [{ c }] = await query("SELECT COUNT(*) AS c FROM users");
  console.log(`✔ Seeded ${c} users, 4 projects, ${tasks.length} tasks, time logs and a report.`);
  console.log(`  Admin login:  nova@taskflow.io  /  ${config.seedPassword}`);
  console.log(`  Member login: jane@taskflow.io  /  ${config.seedPassword}`);
  await pool.end();
}

main().catch((err) => {
  console.error("✖ Seed failed:", err);
  process.exit(1);
});
