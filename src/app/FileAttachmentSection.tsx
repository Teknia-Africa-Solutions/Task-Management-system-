"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, Trash2, X } from "lucide-react";

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

export default function FileAttachmentSection() {
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Convert bytes to readable size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle incoming files
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: AttachedFile[] = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      url: URL.createObjectURL(file), // Creates a preview link for local files
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Remove file from list
  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Attachments
      </h3>

      {/* Dropzone / Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors text-center cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
            : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
        }`}
      >
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          <span className="text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop files here
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          SVG, PNG, JPG, PDF or DOCX (max 10MB)
        </p>
      </div>

      {/* Attached Files List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Attached Files ({files.length})
          </p>

          <ul className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="truncate">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:underline truncate block"
                    >
                      {file.name}
                    </a>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {file.size}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}