"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function SkillsPage() {
  return (
    <AdminCrudPage
      title="Compétences"
      resource="skills"
      fields={[
        { key: "name", label: "Nom de la compétence", type: "text", placeholder: "Ex: Flutter / Dart" },
        { key: "level", label: "Niveau (0–100)", type: "number" },
        {
          key: "category",
          label: "Catégorie",
          type: "select",
          options: ["mobile", "ai", "frontend", "backend", "database", "devops", "methodology"],
        },
        { key: "order", label: "Ordre d'affichage", type: "number" },
      ]}
      renderItem={(item) => (
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{item.name as string}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.category as string}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--dark-border)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${item.level as number}%`, background: "var(--gold)" }}
              />
            </div>
            <span className="text-xs" style={{ color: "var(--gold)" }}>{item.level as number}%</span>
          </div>
        </div>
      )}
    />
  );
}
