// ============================================================
// CORE CV DATA TYPES
// ============================================================

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  subtitle: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  parcours: string;
  philosophy: string;
  github: string;
  linkedin: string;
  instagram?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  _id?: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string | null; // null = Présent
  description: string[];
  tools: string[];
  order: number;
}

export interface Education {
  _id?: string;
  degree: string;
  school: string;
  year: string;
  description?: string;
  order: number;
}

export interface Skill {
  _id?: string;
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "database" | "ai" | "mobile" | "devops" | "methodology";
  order: number;
}

export type SkillCategory = Skill["category"];

export interface Project {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  image: string; // Cloudinary URL
  imagePublicId?: string;
  category: "mobile" | "web" | "ai" | "other";
  tags: string[];
  url?: string; // live URL or github
  pdfUrl?: string;
  htmlPageUrl?: string;
  github?: string;
  period?: string;
  company?: string;
  achievements?: string[];
  featured: boolean;
  order: number;
}

export interface Certification {
  _id?: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  order: number;
}

export interface Competition {
  _id?: string;
  title: string;
  rank: string;
  date: string;
  description?: string;
  order: number;
}

export interface Language {
  _id?: string;
  name: string;
  level: string; // "Langue maternelle", "B2", "Technique"
  order: number;
}

export interface Service {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface TechStack {
  _id?: string;
  category: string;
  label: string;
  items: string[];
  order: number;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt?: Date;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================================
// FULL CV DATA (returned by /api/cv)
// ============================================================

export interface CvData {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  competitions: Competition[];
  languages: Language[];
  services: Service[];
  techStack: TechStack[];
}

// ============================================================
// ADMIN / AUTH
// ============================================================

export interface AdminUser {
  _id?: string;
  email: string;
  passwordHash: string;
}

// Tab type for CV navigation
export type CvTab = "apropos" | "cv" | "projets" | "contact";
