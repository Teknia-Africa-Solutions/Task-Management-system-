import { createContext, useContext, useState } from "react";
import { calendarEvents as initialEvents } from "../data/mockData";

const CalendarContext = createContext(null);

export function CalendarProvider({ children }) {
  const [events, setEvents] = useState(initialEvents);

  function addEvent(event) {
    setEvents((prev) => [...prev, { id: Date.now(), ...event }]);
  }

  function deleteEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <CalendarContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarEvents() {
  return useContext(CalendarContext);
}
