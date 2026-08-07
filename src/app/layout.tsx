import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'Manage tasks and files easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen flex flex-col">
          {/* Main page content */}
          <main className="flex-1 p-6">
            {children}
          </main>

          {/* 👈 2. Files section inside your layout footer / persistent panel */}
          <footer className="p-6 border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto">
            
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}