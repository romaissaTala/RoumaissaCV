"use client";

import { useEffect, useRef } from "react";
import type { CvData, SkillCategory } from "@/types";

interface Props {
  cvData: CvData;
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  mobile: "📱 Mobile",
  ai: "🤖 IA & Machine Learning",
  frontend: "🌐 Frontend Web",
  backend: "⚙️ Backend",
  database: "🗄️ Bases de données",
  devops: "🔧 DevOps & Outils",
  methodology: "📐 Méthodologie",
};

export default function AProposTab({ cvData }: Props) {
  const { profile, skills, services, techStack, languages } = cvData;

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, typeof skills>>(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-10">
      {/* ── Je Me Présente ─────────────────────────────── */}
      <Section title="Je Me Présente">
        <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {profile.bio}
        </p>
      </Section>

      {/* ── Mon Parcours ────────────────────────────────── */}
      <Section title="Mon Parcours">
        <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {profile.parcours}
        </p>
      </Section>

      {/* ── Mes Compétences Techniques ──────────────────── */}
      <Section title="Mes Compétences Techniques">
        {techStack.map((stack) => (
          <div key={stack._id} className="mb-3">
            <span className="font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
              • {stack.label} :{" "}
            </span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              {stack.items.join(", ")}
            </span>
          </div>
        ))}
      </Section>

      {/* ── Compétences (skill bars) ─────────────────────── */}
      <Section title="Compétences">
        <div className="flex flex-col gap-8">
          {(Object.keys(skillsByCategory) as SkillCategory[]).map((cat) => (
            <div key={cat}>
              <h4 className="text-sm font-medium mb-4" style={{ color: "var(--gold)" }}>
                {CATEGORY_LABELS[cat] || cat}
              </h4>
              <div className="flex flex-col gap-4">
                {skillsByCategory[cat].map((skill) => (
                  <SkillBar key={skill._id} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Ma Philosophie de Travail ───────────────────── */}
      <Section title="Ma Philosophie De Travail">
        <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {profile.philosophy}
        </p>
      </Section>

      {/* ── Ce Que Je Fais ──────────────────────────────── */}
      <Section title="Ce Que Je Fais">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Section>

      {/* ── Soft Skills ──────────────────────────────────── */}
      <Section title="Soft Skills">
        <div className="flex flex-wrap gap-2">
          {[
            "Résolution de problèmes",
            "Pensée analytique",
            "Collaboration en équipe",
            "Communication",
            "Curiosité intellectuelle",
            "Autonomie",
            "Rigueur",
            "Adaptabilité",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "var(--dark-hover)",
                border: "1px solid var(--dark-border)",
                color: "var(--text-secondary)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Langues ──────────────────────────────────────── */}
      <Section title="Langues">
        <div className="flex flex-col gap-2">
          {languages.map((lang) => (
            <div key={lang._id} className="flex items-center gap-3">
              <span className="text-sm font-medium text-white w-24">{lang.name}</span>
              <span className="text-sm" style={{ color: "var(--gold)" }}>
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="section-underline" />
      {children}
    </div>
  );
}

// ── Skill Bar ──────────────────────────────────────────────────
function SkillBar({ name, level }: { name: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!barRef.current || animated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && barRef.current && !animated.current) {
          animated.current = true;
          barRef.current.style.setProperty("--target-width", `${level}%`);
          barRef.current.classList.add("skill-bar-fill");
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs" style={{ color: "var(--gold)" }}>
          {level}%
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "6px", background: "var(--dark-border)" }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--gold-dark), var(--gold))",
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}

// ── Service Card ───────────────────────────────────────────────
function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="p-4 rounded-xl card-hover"
      style={{
        background: "var(--dark-hover)",
        border: "1px solid var(--dark-border)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}
        >
          <span style={{ fontSize: "18px" }}>{icon}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
