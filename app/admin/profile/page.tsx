import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function ProfilePage() {
  return (
    <AdminCrudPage
      title="Profil"
      resource="profile"
      isSingleton
      fields={[
        { key: "name", label: "Nom complet", type: "text" },
        { key: "title", label: "Titre / Poste", type: "text" },
        { key: "subtitle", label: "Sous-titre", type: "text" },
        { key: "avatar", label: "URL Photo (Cloudinary)", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone", label: "Téléphone", type: "text" },
        { key: "location", label: "Localisation", type: "text" },
        { key: "github", label: "GitHub URL", type: "text" },
        { key: "linkedin", label: "LinkedIn URL", type: "text" },
        { key: "instagram", label: "Instagram URL", type: "text" },
        { key: "bio", label: "Bio (À Propos)", type: "textarea" },
        { key: "parcours", label: "Mon Parcours", type: "textarea" },
        { key: "philosophy", label: "Philosophie de Travail", type: "textarea" },
        { key: "summary", label: "Résumé (pour ATS / SEO)", type: "textarea" },
      ]}
    />
  );
}
