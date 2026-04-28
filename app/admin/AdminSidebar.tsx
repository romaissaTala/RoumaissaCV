"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/profile", icon: "👤", label: "Profil" },
  { href: "/admin/experience", icon: "💼", label: "Expérience" },
  { href: "/admin/education", icon: "🎓", label: "Éducation" },
  { href: "/admin/skills", icon: "📈", label: "Compétences" },
  { href: "/admin/projects", icon: "🚀", label: "Projets" },
  { href: "/admin/services", icon: "⚙️", label: "Services" },
  { href: "/admin/techstack", icon: "🛠", label: "Tech Stack" },
  { href: "/admin/messages", icon: "✉️", label: "Messages" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 flex flex-col py-6 px-3 gap-1 sticky top-0 h-screen"
      style={{ background: "var(--dark-sidebar)", borderRight: "1px solid var(--dark-border)" }}
    >
      <div className="px-3 mb-6">
        <p className="text-xs font-bold tracking-widest mb-0.5" style={{ color: "var(--gold)" }}>
          ADMIN
        </p>
        <p className="text-sm font-semibold text-white">CV Manager</p>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: active ? "rgba(212,168,67,0.12)" : "transparent",
                color: active ? "var(--gold)" : "var(--text-muted)",
                border: active ? "1px solid rgba(212,168,67,0.2)" : "1px solid transparent",
              }}
            >
              <span style={{ fontSize: "15px" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pt-4" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          <span>👁</span> Voir le CV
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all"
          style={{ color: "#e05555" }}
        >
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </aside>
  );
}
