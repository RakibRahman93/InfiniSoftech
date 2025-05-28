"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Chat({ chatTitle = "Infinichat" }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel(`realtime-messages-${chatTitle}`) // use unique channel per instance
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
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
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim() || !username.trim()) return;

    const { error } = await supabase
      .from("messages")
      .insert([{ content: newMessage, username }]);

    if (!error) setNewMessage("");
  }

  return (
    <div
      className="card shadow rounded-4 m-3"
      style={{ width: "100%", maxWidth: "600px", height: "85vh" }}
    >
      <div
        className="card-header text-white"
        style={{ backgroundColor: "#00336e" }}
      >
        <h5 className="mb-0">💬 {chatTitle}</h5>
      </div>

      <div className="card-body d-flex flex-column p-4">
        <input
          type="text"
          className="form-control rounded-3 mb-3 border-0 shadow-sm"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div
          className="flex-grow-1 border rounded-4 p-3 mb-3 overflow-auto bg-white"
          style={{ maxHeight: "350px" }}
        >
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <strong className="text-primary">{msg.username}:</strong>{" "}
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="d-flex">
          <input
            className="form-control rounded-start-3 border-0 shadow-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="btn text-white rounded-end-3 px-4"
            type="submit"
            style={{ backgroundColor: "#0092ff" }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}