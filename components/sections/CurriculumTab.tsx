"use client";

import { useEffect, useRef } from "react";
import type { CvData } from "@/types";

interface Props {
  cvData: CvData;
}

export default function CurriculumTab({ cvData }: Props) {
  const { experiences, education, skills, certifications, languages } = cvData;

  const groupedSkills = {
    mobile: skills.filter((s) => s.category === "mobile"),
    ai: skills.filter((s) => s.category === "ai"),
    frontend: skills.filter((s) => s.category === "frontend"),
    backend: skills.filter((s) => s.category === "backend"),
    database: skills.filter((s) => s.category === "database"),
    devops: skills.filter((s) => s.category === "devops"),
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ── Expérience ──────────────────────────────────── */}
      <section>
        <SectionHeader icon="⚙" title="Expérience" />
        <div className="flex flex-col gap-8 ml-6 relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "var(--dark-border)", left: "-16px" }}
          />
          {experiences.map((exp) => (
            <ExperienceItem key={exp._id} exp={exp} />
          ))}
        </div>
      </section>

      {/* ── Éducation ───────────────────────────────────── */}
      <section>
        <SectionHeader icon="🎓" title="Éducation" />
        <div className="flex flex-col gap-6 ml-6 relative">
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ background: "var(--dark-border)", left: "-16px" }}
          />
          {education.map((edu) => (
            <EducationItem key={edu._id} edu={edu} />
          ))}
        </div>
      </section>

      {/* ── Compétences ─────────────────────────────────── */}
      <section>
        <SectionHeader icon="📊" title="Compétences" />
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--dark-hover)", border: "1px solid var(--dark-border)" }}
        >
          <div className="flex flex-col gap-4">
            {[
              { label: "Flutter / Dart", skills: groupedSkills.mobile },
              { label: "IA & Machine Learning", skills: groupedSkills.ai },
              { label: "Frontend Web", skills: groupedSkills.frontend },
              { label: "Backend", skills: groupedSkills.backend },
              { label: "Bases de données", skills: groupedSkills.database },
              { label: "DevOps & Outils", skills: groupedSkills.devops },
            ].map(({ label, skills: catSkills }) =>
              catSkills.map((skill) => (
                <SkillBar key={skill._id} name={skill.name} level={skill.level} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────── */}
      {certifications.length > 0 && (
        <section>
          <SectionHeader icon="🏅" title="Certifications & Formations" />
          <div className="flex flex-col gap-4 ml-6 relative">
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ background: "var(--dark-border)", left: "-16px" }}
            />
            {certifications.map((cert) => (
              <div key={cert._id} className="relative timeline-dot">
                <h3 className="font-semibold text-sm text-white">{cert.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>
                  {cert.date}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Langues ──────────────────────────────────────── */}
      <section>
        <SectionHeader icon="🌍" title="Langues" />
        <div className="flex gap-4 flex-wrap">
          {languages.map((lang) => (
            <div
              key={lang._id}
              className="px-4 py-3 rounded-xl"
              style={{ background: "var(--dark-hover)", border: "1px solid var(--dark-border)" }}
            >
              <p className="text-sm font-semibold text-white">{lang.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>
                {lang.level}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────
function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}
      >
        <span style={{ fontSize: "16px" }}>{icon}</span>
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
  );
}

// ── Experience Item ────────────────────────────────────────────
function ExperienceItem({ exp }: { exp: CvData["experiences"][0] }) {
  return (
    <div className="relative timeline-dot">
      <h3 className="font-bold text-base text-white">{exp.role}</h3>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--gold)" }}>
        {exp.company}
      </p>
      <p className="text-xs mb-3" style={{ color: "var(--gold)", opacity: 0.7 }}>
        {exp.startDate} — {exp.endDate ?? "Présent"}
      </p>
      <ul className="flex flex-col gap-1.5 mb-3">
        {exp.description.map((desc, i) => (
          <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: "var(--text-secondary)" }}>
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)", minWidth: "6px", minHeight: "6px" }} />
            {desc}
          </li>
        ))}
      </ul>
      {exp.tools.length > 0 && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          <span className="font-semibold text-white">Outils: </span>
          {exp.tools.join(", ")}
        </p>
      )}
    </div>
  );
}

// ── Education Item ─────────────────────────────────────────────
function EducationItem({ edu }: { edu: CvData["education"][0] }) {
  return (
    <div className="relative timeline-dot">
      <h3 className="font-bold text-sm text-white">{edu.degree}</h3>
      <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>
        {edu.year}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
        {edu.school}
      </p>
      {edu.description && (
        <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {edu.description}
        </p>
      )}
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
      { threshold: 0.1 }
    );
    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white">{name}</span>
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
