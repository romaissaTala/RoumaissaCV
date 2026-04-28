"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function TechStackPage() {
  return (
    <AdminCrudPage
      title="Stack Technique"
      resource="techstack"
      fields={[
        { key: "category", label: "Catégorie (clé interne)", type: "text", placeholder: "Ex: Mobile" },
        { key: "label", label: "Label affiché", type: "text", placeholder: "Ex: Mobile" },
        { key: "items", label: "Technologies (Entrée pour ajouter)", type: "array", placeholder: "Ex: Flutter" },
        { key: "order", label: "Ordre d'affichage", type: "number" },
      ]}
      renderItem={(item) => (
        <div>
          <p className="text-sm font-semibold text-white">{item.label as string}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {(item.items as string[]).join(", ")}
          </p>
        </div>
      )}
    />
  );
}
