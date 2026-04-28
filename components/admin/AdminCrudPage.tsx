"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "array" | "checkbox";
  options?: string[];
  placeholder?: string;
}

interface AdminCrudPageProps {
  title: string;
  resource: string;
  fields: Field[];
  isSingleton?: boolean; // for profile — only one document
  renderItem?: (item: Record<string, unknown>) => React.ReactNode;
}

export default function AdminCrudPage({
  title,
  resource,
  fields,
  isSingleton = false,
  renderItem,
}: AdminCrudPageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${resource}`);
      const data = await res.json();
      if (data.success) {
        setItems(isSingleton ? (data.data ? [data.data] : []) : (data.data ?? []));
        if (isSingleton && data.data) {
          setEditing(data.data);
          setShowForm(true);
        }
      }
    } catch {
      toast.error("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resource]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = editing._id && !isSingleton ? "PUT" : isSingleton ? "PUT" : "POST";
      const res = await fetch(`/api/admin/${resource}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Sauvegardé !");
        setShowForm(false);
        setEditing(null);
        fetchData();
      } else {
        toast.error(data.error || "Erreur");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet élément ?")) return;
    try {
      const res = await fetch(`/api/admin/${resource}?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Supprimé");
        fetchData();
      }
    } catch {
      toast.error("Erreur de suppression");
    }
  };

  const startNew = () => {
    const empty = fields.reduce<Record<string, unknown>>((acc, f) => {
      acc[f.key] = f.type === "array" ? [] : f.type === "number" ? 0 : f.type === "checkbox" ? false : "";
      return acc;
    }, {});
    setEditing(empty);
    setShowForm(true);
  };

  const updateField = (key: string, value: unknown) => {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {!isSingleton && (
          <button
            onClick={startNew}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "var(--gold)", color: "#1A1A1A" }}
          >
            ➕ Ajouter
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && editing && (
        <div
          className="rounded-xl p-6 mb-6"
          style={{ background: "var(--dark-card)", border: "1px solid rgba(212,168,67,0.3)" }}
        >
          <h2 className="text-base font-semibold text-white mb-4">
            {editing._id ? "Modifier" : "Nouvel élément"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.key}
                className={field.type === "textarea" || field.type === "array" ? "md:col-span-2" : ""}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                  {field.label}
                </label>
                <FieldInput
                  field={field}
                  value={editing[field.key]}
                  onChange={(v) => updateField(field.key, v)}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
              style={{ background: "var(--gold)", color: "#1A1A1A" }}
            >
              {saving ? "Sauvegarde..." : "💾 Sauvegarder"}
            </button>
            {!isSingleton && (
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="px-5 py-2 rounded-lg text-sm"
                style={{ background: "var(--dark-hover)", color: "var(--text-secondary)", border: "1px solid var(--dark-border)" }}
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      )}

      {/* Items list */}
      {!isSingleton && (
        <div className="flex flex-col gap-3">
          {loading ? (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Chargement...</p>
          ) : items.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Aucun élément.</p>
          ) : (
            items.map((item) => (
              <div
                key={item._id as string}
                className="flex items-start justify-between gap-4 p-4 rounded-xl"
                style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
              >
                <div className="flex-1 min-w-0">
                  {renderItem ? (
                    renderItem(item)
                  ) : (
                    <p className="text-sm text-white font-medium">
                      {(item[fields[0]?.key] as string) || "—"}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setEditing(item); setShowForm(true); }}
                    className="px-3 py-1.5 rounded-lg text-xs"
                    style={{ background: "var(--dark-hover)", color: "var(--text-secondary)", border: "1px solid var(--dark-border)" }}
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(item._id as string)}
                    className="px-3 py-1.5 rounded-lg text-xs"
                    style={{ background: "rgba(224,85,85,0.1)", color: "#e05555", border: "1px solid rgba(224,85,85,0.3)" }}
                  >
                    🗑 Suppr.
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ── Field Input ────────────────────────────────────────────────
function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        className="cv-input resize-none"
        rows={4}
        placeholder={field.placeholder}
        value={(value as string) || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        className="cv-input"
        value={(value as string) || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Sélectionner --</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        className="cv-input"
        placeholder={field.placeholder}
        value={(value as number) || 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={(value as boolean) || false}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-amber-500"
        />
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Oui</span>
      </label>
    );
  }

  if (field.type === "array") {
    const arr = (value as string[]) || [];
    return (
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {arr.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs"
              style={{ background: "var(--dark-hover)", color: "var(--text-secondary)", border: "1px solid var(--dark-border)" }}
            >
              {item}
              <button
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="opacity-60 hover:opacity-100"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="cv-input"
          placeholder={field.placeholder || "Appuyez sur Entrée pour ajouter"}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              onChange([...arr, e.currentTarget.value.trim()]);
              e.currentTarget.value = "";
              e.preventDefault();
            }
          }}
        />
      </div>
    );
  }

  return (
    <input
      type="text"
      className="cv-input"
      placeholder={field.placeholder}
      value={(value as string) || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
