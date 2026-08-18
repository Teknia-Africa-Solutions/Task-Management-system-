import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { tasks as initialTasks } from "../data/mockData";

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const loadTasks = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // Simulates a fetch delay + occasional failure — replace with real API/socket call later
    const timer = setTimeout(() => {
      const didFail = Math.random() < 0.3; // ~30% chance, just for testing

      if (didFail) {
        setError("We couldn't load your tasks. Please try again.");
        setIsLoading(false);
        return;
      }

      setTasks(initialTasks);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = loadTasks();
    return cleanup;
  }, [loadTasks]);

  function addTask(task) {
    setTasks((prev) => [{ id: Date.now(), ...task }, ...prev]);
  }

  function updateTaskStatus(id, status) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  function toggleDone(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" }
          : t
      )
    );
  }

  function editTask(id, updates) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        retryLoadTasks: loadTasks, // ⬅ exposed so the UI can offer a "Retry" button
        addTask,
        updateTaskStatus,
        toggleDone,
        editTask,
        deleteTask,
        priorityFilter,
        setPriorityFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}