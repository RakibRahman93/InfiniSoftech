"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Chat({ username = "John", chatTitle }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMsg = payload.new;
          setMessages((prev) => {
            if (prev.find((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("inserted_at", { ascending: true });
    setMessages(data || []);
    console.log("Fetched messages:", data);
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error, data } = await supabase
      .from("messages")
      .insert([{ content: newMessage, username }])
      .select()
      .single();
      

    if (!error && data) {
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    }
  }

  function shouldShowUsername(index) {
    if (index === 0) return true;
    const current = messages[index];
    const previous = messages[index - 1];
    return current.username !== previous.username;
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  return (
    <div
      className="container d-flex flex-column justify-content-between bg-dark text-light rounded p-3"
      style={{ maxWidth: "100%", height: "80vh" }}
    >
      {/* Messages */}
      <div
        className="overflow-auto mb-3 flex-grow-1"
        style={{ scrollbarWidth: "thin" }}
      >
        {chatTitle}
        {messages.map((msg, index) => (
          <div key={msg.id} className="mb-3">
            {shouldShowUsername(index) && (
              <div className="d-flex align-items-center mb-1">
                <span className="me-2 fw-bold text-white">{msg.username}</span>
                <span className="text-muted small">
                  {formatTime(msg.inserted_at)}
                </span>
                {/* Right-side user avatar */}
                <div className="ms-auto">
                  <div
                    className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                    style={{ width: "30px", height: "30px", fontSize: "14px" }}
                  >
                    {getInitials(msg.username)}
                  </div>
                </div>
              </div>
            )}
            <div
              className={`d-inline-block px-3 py-2 rounded-pill mb-1 ${
                msg.username === username
                  ? "bg-primary text-white"
                  : "bg-secondary text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(e);
        }}
        className="d-flex"
      >
        <input
          className="form-control bg-black text-white border-0 rounded-pill focus:none"
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            outline: "none",
            focus: "none",
          }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
        />
      </form>
    </div>
  );
}
