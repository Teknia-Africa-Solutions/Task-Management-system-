import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import Layout from "../components/Layout";
import { useCalendarEvents } from "../context/CalendarContext";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function pad(n) {
  return String(n).padStart(2, "0");
}

function toDateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export default function CalendarPage() {
  const { events, addEvent, deleteEvent } = useCalendarEvents();
  const [cursor, setCursor] = useState(new Date(2026, 4, 1)); // May 2026, matches reference
  const [selectedDay, setSelectedDay] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthLabel = cursor.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function eventsForDay(day) {
    if (!day) return [];
    const key = toDateKey(year, month, day);
    return events.filter((e) => e.date === key);
  }

  function goToday() {
    setCursor(new Date(2026, 4, 1));
  }

  function changeMonth(delta) {
    setCursor(new Date(year, month + delta, 1));
  }

  function openDay(day) {
    if (!day) return;
    setSelectedDay(day);
    setDraftTitle("");
  }

  function handleAddEvent(e) {
    e.preventDefault();
    if (!draftTitle.trim() || !selectedDay) return;
    addEvent({
      date: toDateKey(year, month, selectedDay),
      title: draftTitle.trim(),
      color: "rust",
    });
    setDraftTitle("");
  }

  return (
    <Layout title="Calendar">
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-sidebar text-lg">{monthLabel}</h2>
            <button
              onClick={goToday}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-primary-500 text-white hover:bg-primary-600"
            >
              Today
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => changeMonth(-1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-black/10 text-slate2-500 hover:bg-black/5"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-black/10 text-slate2-500 hover:bg-black/5"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-cream rounded-full p-1">
            {["Month", "Week", "Day"].map((v) => (
              <button
                key={v}
                disabled={v !== "Month"}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  v === "Month"
                    ? "bg-white text-sidebar shadow-sm"
                    : "text-slate2-400 cursor-not-allowed"
                }`}
                title={v !== "Month" ? "Coming soon" : undefined}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 border-t border-l border-black/5">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-[11px] font-semibold text-slate2-400 text-center py-2 border-b border-r border-black/5"
            >
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            const dayEvents = eventsForDay(day);
            const isToday = day === 21 && month === 4 && year === 2026;
            return (
              <button
                key={i}
                onClick={() => openDay(day)}
                disabled={!day}
                className={`min-h-[90px] text-left p-2 border-b border-r border-black/5 align-top ${
                  day ? "hover:bg-black/[0.02] cursor-pointer" : "bg-cream/40"
                } ${isToday ? "ring-1 ring-inset ring-primary-500 bg-primary-50" : ""}`}
              >
                {day && (
                  <>
                    <span
                      className={`text-xs font-semibold ${
                        isToday ? "text-primary-600" : "text-sidebar"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <p
                          key={ev.id}
                          className={`text-[10px] font-medium truncate px-1 py-0.5 rounded ${
                            ev.color === "amber"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-primary-100 text-primary-600"
                          }`}
                        >
                          {ev.title}
                        </p>
                      ))}
                      {dayEvents.length > 2 && (
                        <p className="text-[10px] text-slate2-400">
                          +{dayEvents.length - 2} more
                        </p>
                      )}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sidebar">
                {monthLabel.split(" ")[0]} {selectedDay}, {year}
              </h3>
              <button onClick={() => setSelectedDay(null)} className="text-slate2-400 hover:text-sidebar">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {eventsForDay(selectedDay).length === 0 && (
                <p className="text-sm text-slate2-500">No events yet.</p>
              )}
              {eventsForDay(selectedDay).map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between bg-cream rounded-lg px-3 py-2"
                >
                  <span className="text-sm text-sidebar font-medium">{ev.title}</span>
                  <button
                    onClick={() => deleteEvent(ev.id)}
                    className="text-slate2-400 hover:text-rose-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddEvent} className="flex gap-2">
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Add an event..."
                className="flex-1 border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-primary-500 hover:bg-primary-600 text-white"
              >
                <Plus size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
