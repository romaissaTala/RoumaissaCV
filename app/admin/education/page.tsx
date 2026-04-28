"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function EducationPage() {
  return (
    <AdminCrudPage
      title="Éducation & Formations"
      resource="education"
      fields={[
        { key: "degree", label: "Diplôme", type: "text", placeholder: "Ex: Master Systèmes Informatiques Intelligents" },
        { key: "school", label: "Établissement", type: "text", placeholder: "Ex: USTHB" },
        { key: "year", label: "Année / Période", type: "text", placeholder: "Ex: 2022 — 2024" },
        { key: "description", label: "Description (optionnel)", type: "textarea", placeholder: "Spécialisation, projet de fin d'études..." },
        { key: "order", label: "Ordre d'affichage", type: "number" },
      ]}
      renderItem={(item) => (
        <div>
          <p className="text-sm font-semibold text-white">{item.degree as string}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>{item.school as string}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.year as string}</p>
        </div>
      )}
    />
  );
}
