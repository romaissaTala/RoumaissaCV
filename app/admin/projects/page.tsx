"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function ProjectsPage() {
  return (
    <AdminCrudPage
      title="Projets"
      resource="projects"
      fields={[
        { key: "title", label: "Titre", type: "text", placeholder: "Ex: Applications CRM" },
        { key: "subtitle", label: "Sous-titre", type: "text", placeholder: "Ex: DSSI — PLANETE ERP" },
        { key: "category", label: "Catégorie", type: "select", options: ["mobile", "web", "ai", "other"] },
        { key: "company", label: "Entreprise (optionnel)", type: "text" },
        { key: "period", label: "Période (optionnel)", type: "text", placeholder: "Ex: 2022 — 2024" },
        { key: "description", label: "Description courte", type: "textarea" },
        { key: "longDescription", label: "Description détaillée (optionnel)", type: "textarea" },
        { key: "image", label: "URL Image (Cloudinary)", type: "text", placeholder: "https://res.cloudinary.com/..." },
        { key: "github", label: "Lien GitHub (optionnel)", type: "text" },
        { key: "url", label: "Lien Live / Demo (optionnel)", type: "text" },
        { key: "pdfUrl", label: "Lien PDF (optionnel)", type: "text" },
        { key: "htmlPageUrl", label: "Lien Page HTML (optionnel)", type: "text" },
        { key: "tags", label: "Technologies (Entrée pour ajouter)", type: "array", placeholder: "Ex: Flutter" },
        { key: "achievements", label: "Points clés (Entrée pour ajouter)", type: "array", placeholder: "Ex: Clean Architecture..." },
        { key: "featured", label: "Projet mis en avant", type: "checkbox" },
        { key: "order", label: "Ordre d'affichage", type: "number" },
      ]}
      renderItem={(item) => (
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white">{item.title as string}</p>
            {Boolean(item.featured) && (
              <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(212,168,67,0.15)", color: "var(--gold)" }}>
                ⭐ Featured
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>
            {item.category as string}
            {item.company ? ` · ${item.company}` : ""}
          </p>
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--text-muted)" }}>
            {item.description as string}
          </p>
        </div>
      )}
    />
  );
}
