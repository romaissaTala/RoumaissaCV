"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function ServicesPage() {
  return (
    <AdminCrudPage
      title="Services — Ce Que Je Fais"
      resource="services"
      fields={[
        { key: "icon", label: "Emoji / Icône", type: "text", placeholder: "Ex: 📱" },
        { key: "title", label: "Titre du service", type: "text", placeholder: "Ex: Développeuse Flutter" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "order", label: "Ordre d'affichage", type: "number" },
      ]}
      renderItem={(item) => (
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "20px" }}>{item.icon as string}</span>
          <div>
            <p className="text-sm font-semibold text-white">{item.title as string}</p>
            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--text-muted)" }}>
              {item.description as string}
            </p>
          </div>
        </div>
      )}
    />
  );
}
