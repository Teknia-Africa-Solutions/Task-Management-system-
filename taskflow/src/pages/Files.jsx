import { useRef } from "react";
import { FileText, FileSpreadsheet, Image, FileCode, Upload, Download, Trash2 } from "lucide-react";
import Layout from "../components/Layout";
import { useFiles } from "../context/FilesContext";
import { useAuth } from "../context/AuthContext";

const typeIcon = {
  sql: { Icon: FileCode, bg: "bg-amber-100", color: "text-amber-600" },
  xlsx: { Icon: FileSpreadsheet, bg: "bg-emerald-100", color: "text-emerald-600" },
  image: { Icon: Image, bg: "bg-violet-100", color: "text-violet-600" },
  pdf: { Icon: FileText, bg: "bg-rose-100", color: "text-rose-600" },
};

function guessType(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  if (ext === "sql") return "sql";
  if (["xlsx", "xls", "csv"].includes(ext)) return "xlsx";
  if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext)) return "image";
  return "pdf";
}

export default function Files() {
  const { files, uploadFile, deleteFile } = useFiles();
  const { user } = useAuth();
  const inputRef = useRef(null);

  function handlePick(e) {
    const list = Array.from(e.target.files || []);
    list.forEach((f) => {
      uploadFile({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedBy: user?.name || "You",
        type: guessType(f.name),
      });
    });
    e.target.value = "";
  }

  return (
    <Layout title="Files">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 flex items-center gap-4">
          <div>
            <p className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
              Total Files
            </p>
            <p className="text-3xl font-extrabold text-sidebar mt-1">{files.length}</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-primary-100 flex items-center justify-center">
            <FileText size={18} className="text-primary-600" />
          </div>
        </div>

        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={handlePick}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors"
          >
            <Upload size={16} />
            Upload File
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <h3 className="font-bold text-sidebar">Workspace Files</h3>
          <span className="text-xs text-slate2-500">{files.length} items</span>
        </div>

        <div className="hidden md:grid grid-cols-[1fr_120px_140px_100px] gap-3 px-5 py-2 text-[11px] font-semibold text-slate2-400 uppercase tracking-wide">
          <span>Name</span>
          <span>Size</span>
          <span>Uploaded By</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-black/5">
          {files.length === 0 && (
            <p className="p-8 text-center text-sm text-slate2-500">
              No files yet — upload one to get started.
            </p>
          )}
          {files.map((f) => {
            const { Icon, bg, color } = typeIcon[f.type] || typeIcon.pdf;
            return (
              <div
                key={f.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_100px] gap-2 md:gap-3 items-center px-5 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={color} />
                  </div>
                  <span className="text-sm font-medium text-sidebar truncate">{f.name}</span>
                </div>
                <span className="text-sm text-slate2-500">{f.size}</span>
                <span className="text-sm text-primary-500 font-medium">{f.uploadedBy}</span>
                <div className="flex items-center gap-3 md:justify-end">
                  <button className="text-slate2-400 hover:text-primary-500" aria-label="Download">
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => deleteFile(f.id)}
                    className="text-slate2-400 hover:text-rose-500"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
