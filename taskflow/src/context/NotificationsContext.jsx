import { createContext, useContext, useState } from "react";
import { notifications as initialNotifications } from "../data/mockData";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  function dismiss(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <NotificationsContext.Provider value={{ notifications, dismiss }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
