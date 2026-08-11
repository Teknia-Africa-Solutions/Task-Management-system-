import { NextResponse } from 'next/server';

// Mock data for demonstration
let tasks = [
  { id: 1, title: 'UI Design for Dashboard', category: 'Design', status: 'IN_PROGRESS', priority: 'HIGH', due: '2026-05-21', assignee: 'Jane Doe' },
  { id: 2, title: 'Database Design', category: 'Backend', status: 'TODO', priority: 'MEDIUM', due: '2026-05-23', assignee: 'David Brown' },
  { id: 3, title: 'API Integration', category: 'Backend', status: 'IN_PROGRESS', priority: 'MEDIUM', due: '2026-05-24', assignee: 'Mike Johnson' },
  { id: 4, title: 'Project Documentation', category: 'Docs', status: 'TODO', priority: 'LOW', due: '2026-05-28', assignee: 'Sarah Wilson' },
];

let nextId = 5;

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask = {
    id: nextId++,
    ...body,
    status: 'TODO',
  };
  tasks = [newTask, ...tasks];
  return NextResponse.json(newTask);
}
