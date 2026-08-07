import React, { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'code' | 'doc' | 'archive';
  uploadedBy: string;
  date: string;
}

export default function Files() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Sample initial files
  const [fileList, setFileList] = useState<FileItem[]>([
    { id: '1', name: 'Project_Specification_v2.pdf', size: '2.4 MB', type: 'pdf', uploadedBy: 'Elina', date: 'Aug 5, 2026' },
    { id: '2', name: 'Dashboard_Design_Mockup.png', size: '4.8 MB', type: 'image', uploadedBy: 'Alex', date: 'Aug 4, 2026' },
    { id: '3', name: 'Database_Schema.sql', size: '340 KB', type: 'code', uploadedBy: 'Elina', date: 'Jul 28, 2026' },
    { id: '4', name: 'Q3_Financial_Summary.docx', size: '1.1 MB', type: 'doc', uploadedBy: 'Sarah', date: 'Jul 15, 2026' },
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Trigger hidden input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Helper function to add raw files into list state
  const addFilesToList = (rawFiles: FileList | File[]) => {
    const newFilesArr: FileItem[] = Array.from(rawFiles).map((file, idx) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let fileType: FileItem['type'] = 'doc';
      
      if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) fileType = 'image';
      else if (['pdf'].includes(ext)) fileType = 'pdf';
      else if (['ts', 'tsx', 'js', 'json', 'sql', 'html', 'css'].includes(ext)) fileType = 'code';
      else if (['zip', 'tar', 'gz', 'rar'].includes(ext)) fileType = 'archive';

      // Formatting human readable byte sizes
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const sizeKB = Math.round(file.size / 1024);
      const formattedSize = file.size >= 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;

      return {
        id: `${Date.now()}-${idx}`,
        name: file.name,
        size: formattedSize,
        type: fileType,
        uploadedBy: 'You',
        date: 'Just now',
      };
    });

    setFileList((prev) => [...newFilesArr, ...prev]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFilesToList(e.target.files);
    }
  };

  // Drag and drop handlers
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToList(e.dataTransfer.files);
    }
  };

  const handleDeleteFile = (id: string) => {
    setFileList((prev) => prev.filter((file) => file.id !== id));
  };

  // Filter files based on user search and dropdown filter
  const filteredFiles = fileList.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Project Files & Attachments</h2>
          <p className="text-xs text-slate-500">Manage, upload, and share documents across your workspace.</p>
        </div>

        {/* Upload Button */}
        <div>
          <button
            onClick={handleUploadClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Attachment
          </button>
          
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* DROPZONE / UPLOAD AREA */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50/50'
            : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
        }`}
      >
        <div className="w-10 h-10 mx-auto rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-xs font-bold text-slate-800">
          Click to upload <span className="font-normal text-slate-500">or drag & drop attachments</span>
        </p>
        <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, PDF, DOCX, SQL or ZIP up to 25MB</p>
      </div>

      {/* CONTROLS: SEARCH & CATEGORY FILTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search attachments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filters */}
        <div className="flex gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'pdf', 'image', 'doc', 'code'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition whitespace-nowrap ${
                filterType === type
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* FILES LIST TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No attachments found matching your query.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredFiles.map((file) => (
              <div key={file.id} className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition">
                
                {/* File Icon + Details */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase border ${
                    file.type === 'pdf' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    file.type === 'image' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    file.type === 'code' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-sky-50 text-sky-600 border-sky-100'
                  }`}>
                    {file.type}
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold text-slate-800 hover:text-indigo-600 transition cursor-pointer">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>Uploaded by {file.uploadedBy}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    title="Download"
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    title="Delete"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}