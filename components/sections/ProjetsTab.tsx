"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types";

interface Props {
  projects: Project[];
}

const CATEGORIES = [
  { id: "all", label: "Tous", icon: "🗂" },
  { id: "mobile", label: "Mobile", icon: "📱" },
  { id: "ai", label: "IA", icon: "🤖" },
  { id: "web", label: "Web", icon: "🌐" },
];

export default function ProjetsTab({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-1">Mes Projets</h2>
      <div className="section-underline" />

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeCategory === cat.id ? "rgba(212,168,67,0.15)" : "var(--dark-hover)",
              border: `1px solid ${activeCategory === cat.id ? "rgba(212,168,67,0.4)" : "var(--dark-border)"}`,
              color: activeCategory === cat.id ? "var(--gold)" : "var(--text-muted)",
            }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

// ── Project Card ───────────────────────────────────────────────
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const categoryColors: Record<string, string> = {
    mobile: "#4A90E2",
    ai: "#7B61FF",
    web: "#2ECC71",
    other: "#888",
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-pointer project-card card-hover"
      style={{ background: "var(--dark-hover)", border: "1px solid var(--dark-border)" }}
      onClick={onClick}
    >
      {/* Image area */}
      <div className="relative w-full" style={{ aspectRatio: "16/9", background: "var(--dark-input)" }}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ fontSize: "40px" }}>
              {project.category === "mobile" ? "📱" : project.category === "ai" ? "🤖" : "🌐"}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="project-card-overlay" />

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            background: `${categoryColors[project.category]}22`,
            border: `1px solid ${categoryColors[project.category]}44`,
            color: categoryColors[project.category],
          }}
        >
          {CATEGORIES.find((c) => c.id === project.category)?.icon}{" "}
          {project.category.toUpperCase()}
        </span>

        {/* Link icons overlay */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 project-card-links transition-opacity">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "rgba(0,0,0,0.7)" }}
            >
              🐙
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "rgba(0,0,0,0.7)" }}
            >
              🔗
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-bold text-sm text-white mb-0.5">{project.title}</h3>
        {project.company && (
          <p className="text-xs mb-1.5" style={{ color: "var(--gold)" }}>
            {project.company}{project.period ? ` · ${project.period}` : ""}
          </p>
        )}
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
          {project.description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                background: "var(--dark-input)",
                color: "var(--text-muted)",
                border: "1px solid var(--dark-border)",
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 rounded text-xs" style={{ color: "var(--text-muted)" }}>
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Project Modal ──────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full" style={{ aspectRatio: "16/9", background: "var(--dark-input)" }}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontSize: "64px" }}>
                {project.category === "mobile" ? "📱" : project.category === "ai" ? "🤖" : "🌐"}
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
              {project.subtitle && (
                <p className="text-sm mt-0.5" style={{ color: "var(--gold)" }}>
                  {project.subtitle}
                </p>
              )}
              {project.company && (
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {project.company}{project.period ? ` · ${project.period}` : ""}
                </p>
              )}
            </div>
            {/* Links */}
            <div className="flex gap-2 flex-shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ background: "var(--dark-hover)", border: "1px solid var(--dark-border)", color: "var(--text-secondary)" }}
                >
                  🐙 GitHub
                </a>
              )}
              {(project.url || project.htmlPageUrl) && (
                <a
                  href={project.url || project.htmlPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.3)", color: "var(--gold)" }}
                >
                  🔗 Voir
                </a>
              )}
              {project.pdfUrl && (
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ background: "var(--dark-hover)", border: "1px solid var(--dark-border)", color: "var(--text-secondary)" }}
                >
                  📄 PDF
                </a>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            {project.longDescription || project.description}
          </p>

          {project.achievements && project.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-2">Points clés</h4>
              <ul className="flex flex-col gap-1.5">
                {project.achievements.map((a, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: "var(--text-secondary)" }}>
                    <span className="text-gold mt-1 flex-shrink-0">•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded text-xs"
                style={{ background: "var(--dark-hover)", color: "var(--text-muted)", border: "1px solid var(--dark-border)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
