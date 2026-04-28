"use client";

import type { CvTab } from "@/types";

const TABS: { id: CvTab; label: string }[] = [
  { id: "apropos", label: "À Propos" },
  { id: "cv", label: "Curriculum Vitae" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
];

interface Props {
  activeTab: CvTab;
  onTabChange: (tab: CvTab) => void;
}

export default function TabBar({ activeTab, onTabChange }: Props) {
  return (
    <div
      className="flex items-center justify-end gap-1 p-3"
      style={{
        borderBottom: "1px solid var(--dark-border)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
          style={{
            color: activeTab === tab.id ? "var(--gold)" : "var(--text-muted)",
            background: activeTab === tab.id ? "rgba(212,168,67,0.1)" : "transparent",
            border: activeTab === tab.id ? "1px solid rgba(212,168,67,0.2)" : "1px solid transparent",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
