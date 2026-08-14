import { Folder, LayoutGrid, FileText, Smartphone } from "lucide-react";
import Layout from "../components/Layout";
import { projects } from "../data/mockData";

const icons = {
  folder: Folder,
  grid: LayoutGrid,
  file: FileText,
  device: Smartphone,
};

export default function Projects() {
  return (
    <Layout title="Projects">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((p) => {
          const Icon = icons[p.icon];
          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${p.barColor} flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sidebar text-sm">{p.name}</p>
                  <p className="text-xs text-slate2-500">
                    {p.doneCount} / {p.totalCount} tasks
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate2-500 font-medium">Progress</span>
                <span className="font-bold text-sidebar">{p.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/5 mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.barColor}`}
                  style={{ width: `${p.progress}%` }}
                />
              </div>

              <button
                className={`w-full text-white text-sm font-semibold py-2.5 rounded-full transition-colors ${p.buttonColor}`}
              >
                View Project
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
