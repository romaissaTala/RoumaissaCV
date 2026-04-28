"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.success) setMessages(data.data ?? []);
    } catch {
      toast.error("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id: string) => {
    await fetch("/api/admin/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, read: true }),
    });
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, read: true } : m))
    );
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m._id !== id));
    if (selected?._id === id) setSelected(null);
    toast.success("Supprimé");
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        {unread > 0 && (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: "rgba(224,85,85,0.2)", color: "#e05555" }}
          >
            {unread} non lu{unread > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Chargement...</p>
      ) : messages.length === 0 ? (
        <div
          className="rounded-xl p-8 text-center"
          style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
        >
          <span style={{ fontSize: "40px" }}>📭</span>
          <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
            Aucun message pour l'instant.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* List */}
          <div className="flex flex-col gap-2">
            {messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.read) markRead(msg._id);
                }}
                className="w-full text-left p-4 rounded-xl transition-all"
                style={{
                  background: selected?._id === msg._id
                    ? "rgba(212,168,67,0.1)"
                    : "var(--dark-card)",
                  border: `1px solid ${selected?._id === msg._id
                    ? "rgba(212,168,67,0.3)"
                    : "var(--dark-border)"}`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#e05555" }} />
                      )}
                      <p className="text-sm font-semibold text-white truncate">{msg.name}</p>
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "var(--gold)" }}>
                      {msg.email}
                    </p>
                    <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                      {msg.message}
                    </p>
                  </div>
                  <p className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div>
            {selected ? (
              <div
                className="rounded-xl p-5 sticky top-4"
                style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="font-bold text-white">{selected.name}</p>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-xs hover:opacity-80"
                      style={{ color: "var(--gold)" }}
                    >
                      {selected.email}
                    </a>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {new Date(selected.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMsg(selected._id)}
                    className="px-3 py-1.5 rounded-lg text-xs flex-shrink-0"
                    style={{ background: "rgba(224,85,85,0.1)", color: "#e05555", border: "1px solid rgba(224,85,85,0.3)" }}
                  >
                    🗑 Supprimer
                  </button>
                </div>

                <div
                  className="p-4 rounded-lg text-sm leading-relaxed"
                  style={{ background: "var(--dark-hover)", color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}
                >
                  {selected.message}
                </div>

                <a
                  href={`mailto:${selected.email}?subject=Re: Votre message&body=Bonjour ${selected.name},%0A%0A`}
                  className="flex items-center justify-center gap-2 mt-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ background: "var(--gold)", color: "#1A1A1A" }}
                >
                  ✉ Répondre par email
                </a>
              </div>
            ) : (
              <div
                className="rounded-xl p-8 text-center"
                style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
              >
                <span style={{ fontSize: "32px" }}>👆</span>
                <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                  Sélectionnez un message pour le lire
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
