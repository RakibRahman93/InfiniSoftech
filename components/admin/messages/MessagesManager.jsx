"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  MessageSquare, Send, RefreshCw, User, Check,
} from "lucide-react";
import { subscribeToRealtime } from "@/lib/realtime/client";

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data?.messages ?? []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    loadMessages();
    return subscribeToRealtime(() => loadMessages());
  }, [loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, username: "Admin" }),
      });
      const data = await res.json();
      if (data?.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch { /* ignore */ } finally { setSending(false); }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Live Messages Center</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Real-time communication with clients and team</p>
        </div>
        <button onClick={loadMessages} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[600px] overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-sand/60">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-ink">No Messages Yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Start the conversation below.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isAdmin = msg.username === "Admin" || msg.username === "System";
              return (
                <div key={msg.id || msg.insertedAt} className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-muted-foreground">{msg.username || "User"}</span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {msg.insertedAt ? new Date(msg.insertedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                    </span>
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    isAdmin
                      ? "bg-green text-white rounded-br-none"
                      : "bg-white border border-ink/10 text-ink rounded-bl-none shadow-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="border-t border-ink/10 bg-white p-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border border-ink/10 bg-background px-4 py-2.5 text-sm text-ink outline-none focus:border-green/40"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="flex items-center gap-2 rounded-xl bg-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
