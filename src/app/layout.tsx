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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}