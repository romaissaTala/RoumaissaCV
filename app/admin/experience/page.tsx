"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function ExperiencePage() {
  return (
    <AdminCrudPage
      title="Expériences Professionnelles"
      resource="experiences"
      fields={[
        { key: "role", label: "Poste / Rôle", type: "text", placeholder: "Ex: Développeuse Mobile" },
        { key: "company", label: "Entreprise", type: "text", placeholder: "Ex: DSSI" },
        { key: "startDate", label: "Date début", type: "text", placeholder: "Ex: Juil 2022" },
        { key: "endDate", label: "Date fin (laisser vide = Présent)", type: "text", placeholder: "Ex: Déc 2023" },
        { key: "description", label: "Points clés (Entrée pour ajouter)", type: "array", placeholder: "Ajoutez un point clé..." },
        { key: "tools", label: "Outils / Technologies (Entrée pour ajouter)", type: "array", placeholder: "Ex: Flutter" },
        { key: "order", label: "Ordre d'affichage", type: "number" },
      ]}
      renderItem={(item) => (
        <div>
          <p className="text-sm font-semibold text-white">{item.role as string}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>{item.company as string}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {item.startDate as string} — {(item.endDate as string) || "Présent"}
          </p>
        </div>
      )}
    />
  );
}
