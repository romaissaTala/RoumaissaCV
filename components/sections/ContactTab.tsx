"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactTab() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Message envoyé ! Je vous répondrai rapidement.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Erreur lors de l'envoi.");
      }
    } catch {
      toast.error("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Contact</h2>
      <div className="section-underline" />

      <h3 className="text-xl font-bold text-white mb-6">
        Comment Puis-Je Rendre Service ?
      </h3>

      <div className="flex flex-col gap-4">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom complet"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="cv-input"
          />
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="cv-input"
          />
        </div>

        {/* Message */}
        <textarea
          placeholder="Votre Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={6}
          className="cv-input resize-none"
        />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50"
            style={{
              background: loading ? "var(--dark-hover)" : "var(--gold)",
              color: loading ? "var(--text-muted)" : "#1A1A1A",
            }}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Envoi...
              </>
            ) : (
              <>
                <span>✉</span>
                Envoyer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
