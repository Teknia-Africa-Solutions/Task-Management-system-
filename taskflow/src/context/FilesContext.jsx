import { createContext, useContext, useState } from "react";
import { workspaceFiles as initialFiles } from "../data/mockData";

const FilesContext = createContext(null);

export function FilesProvider({ children }) {
  const [files, setFiles] = useState(initialFiles);

  function uploadFile(file) {
    setFiles((prev) => [{ id: Date.now(), ...file }, ...prev]);
  }

  function deleteFile(id) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <FilesContext.Provider value={{ files, uploadFile, deleteFile }}>
      {children}
    </FilesContext.Provider>
  );
}

export function useFiles() {
  return useContext(FilesContext);
}
