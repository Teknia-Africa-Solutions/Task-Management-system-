import { useState, useRef, useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import Layout from "../components/Layout";
import { useMessages } from "../context/MessagesContext";

export default function Messages() {
  const { threads, sendMessage } = useMessages();
  const thread = threads[0];
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages.length]);

  function handleSend(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessage(thread.id, draft.trim());
    setDraft("");
  }

  return (
    <Layout title="Messages">
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm flex flex-col h-[70vh] max-w-3xl">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5">
          <div
            className={`w-10 h-10 rounded-full ${thread.color} text-white font-semibold flex items-center justify-center`}
          >
            {thread.initials}
          </div>
          <div>
            <p className="font-semibold text-sidebar text-sm">{thread.name}</p>
            <p className="text-xs text-emerald-600 font-medium">
              {thread.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {thread.messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  m.from === "me"
                    ? "bg-primary-500 text-white rounded-br-sm"
                    : "bg-cream text-sidebar rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{m.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    m.from === "me" ? "text-white/70" : "text-slate2-400"
                  }`}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 px-5 py-4 border-t border-black/5"
        >
          <button type="button" className="text-slate2-400 hover:text-sidebar">
            <Paperclip size={18} />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-cream rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </Layout>
  );
}
