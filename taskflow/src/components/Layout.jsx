import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NewTaskModal from "./NewTaskModal";

export default function Layout({ title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
          onNewTask={() => setTaskModalOpen(true)}
        />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
      <NewTaskModal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} />
    </div>
  );
}
