import { createContext, useContext, useState } from "react";
import { tasks as initialTasks } from "../data/mockData";

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [priorityFilter, setPriorityFilter] = useState("ALL");

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
        addTask,
        updateTaskStatus,
        toggleDone,
        editTask,
        deleteTask,
        priorityFilter,
        setPriorityFilter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
