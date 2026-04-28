export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import {
  ExperienceModel,
  ProjectModel,
  SkillModel,
  ContactMessageModel,
  EducationModel,
} from "@/models";
import Link from "next/link";

export default async function DashboardPage() {
  await connectDB();

  const [expCount, projectCount, skillCount, msgCount, unreadCount, eduCount] =
    await Promise.all([
      ExperienceModel.countDocuments(),
      ProjectModel.countDocuments(),
      SkillModel.countDocuments(),
      ContactMessageModel.countDocuments(),
      ContactMessageModel.countDocuments({ read: false }),
      EducationModel.countDocuments(),
    ]);

  const stats = [
    { label: "Expériences", count: expCount, icon: "💼", href: "/admin/experience", color: "#4A90E2" },
    { label: "Projets", count: projectCount, icon: "🚀", href: "/admin/projects", color: "#7B61FF" },
    { label: "Compétences", count: skillCount, icon: "📊", href: "/admin/skills", color: "#2ECC71" },
    { label: "Formations", count: eduCount, icon: "🎓", href: "/admin/education", color: "#E8C472" },
    { label: "Messages", count: msgCount, icon: "✉️", href: "/admin/messages", color: "#E8A87C", badge: unreadCount > 0 ? unreadCount : undefined },
  ];

  const quickLinks = [
    { href: "/admin/profile", icon: "👤", label: "Modifier le profil" },
    { href: "/admin/experience", icon: "➕", label: "Ajouter une expérience" },
    { href: "/admin/projects", icon: "➕", label: "Ajouter un projet" },
    { href: "/admin/messages", icon: "📬", label: "Voir les messages" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Gérez le contenu de votre CV en temps réel.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="relative p-4 rounded-xl card-hover"
            style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
          >
            {stat.badge && (
              <span
                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "#e05555", color: "white" }}
              >
                {stat.badge}
              </span>
            )}
            <span style={{ fontSize: "24px" }}>{stat.icon}</span>
            <p className="text-2xl font-bold text-white mt-2">{stat.count}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
      >
        <h2 className="text-base font-semibold text-white mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm transition-all"
              style={{
                background: "var(--dark-hover)",
                border: "1px solid var(--dark-border)",
                color: "var(--text-secondary)",
              }}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
