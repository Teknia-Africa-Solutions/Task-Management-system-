import { createContext, useContext, useState } from "react";
import { messageThreads as initialThreads } from "../data/mockData";

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
  const [threads, setThreads] = useState(initialThreads);

  function sendMessage(threadId, text) {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [
                ...t.messages,
                {
                  id: Date.now(),
                  from: "me",
                  text,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : t
      )
    );
  }

  return (
    <MessagesContext.Provider value={{ threads, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessagesContext);
}
