"use client";

import Image from "next/image";
import { Profile } from "@/types";

interface Props {
  profile: Profile;
}

export default function Sidebar({ profile }: Props) {
  return (
    <div
      className="w-full md:w-64 rounded-2xl p-6 flex flex-col items-center gap-5"
      style={{
        background: "var(--dark-sidebar)",
        border: "1px solid var(--dark-border)",
        minHeight: "fit-content",
      }}
    >
      {/* Avatar */}
      <div
        className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0"
        style={{ background: "var(--dark-hover)", border: "2px solid var(--dark-border)" }}
      >
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            👩‍💻
          </div>
        )}
      </div>

      {/* Name + Title */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-white leading-tight">
          {profile.name}
        </h1>
        <span
          className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: "var(--dark-hover)", border: "1px solid var(--dark-border)", color: "var(--text-secondary)" }}
        >
          {profile.title}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: "var(--dark-border)" }} />

      {/* Contact Info */}
      <div className="w-full flex flex-col gap-3">
        <InfoRow
          icon="✉"
          label="EMAIL"
          value={profile.email}
          href={`mailto:${profile.email}`}
        />
        <InfoRow
          icon="📱"
          label="PHONE"
          value={profile.phone}
          href={`tel:${profile.phone}`}
        />
        {profile.github && (
          <InfoRow
            icon="🐙"
            label="GITHUB"
            value={profile.github.replace("https://github.com/", "").replace("https://", "")}
            href={profile.github}
            external
          />
        )}
        {profile.linkedin && (
          <InfoRow
            icon="💼"
            label="LINKEDIN"
            value={profile.linkedin.replace("https://linkedin.com/in/", "").replace("https://", "").split("/")[0]}
            href={profile.linkedin}
            external
          />
        )}
        {profile.instagram && (
          <InfoRow
            icon="📸"
            label="INSTAGRAM"
            value={profile.instagram.replace(/https?:\/\/(www\.)?instagram\.com\//, "")}
            href={profile.instagram}
            external
          />
        )}
        <InfoRow
          icon="📍"
          label="LOCATION"
          value={profile.location}
        />
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function InfoRow({ icon, label, value, href, external }: InfoRowProps) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="sidebar-icon mt-0.5">
        <span style={{ fontSize: "14px" }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
        <p
          className="text-sm break-all leading-tight"
          style={{ color: href ? "var(--text-secondary)" : "var(--text-secondary)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block transition-opacity hover:opacity-80"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
