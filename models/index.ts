import mongoose, { Schema, model, models } from "mongoose";

// ── Profile ──────────────────────────────────────────────────
const ProfileSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  avatar: { type: String, default: "" },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  location: { type: String, default: "" },
  bio: { type: String, default: "" },
  parcours: { type: String, default: "" },
  philosophy: { type: String, default: "" },
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  instagram: { type: String, default: "" },
  website: { type: String, default: "" },
  summary: { type: String, default: "" },
}, { timestamps: true });

// ── Experience ────────────────────────────────────────────────
const ExperienceSchema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: null },
  description: [{ type: String }],
  tools: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Education ─────────────────────────────────────────────────
const EducationSchema = new Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Skill ─────────────────────────────────────────────────────
const SkillSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  category: {
    type: String,
    enum: ["frontend", "backend", "database", "ai", "mobile", "devops", "methodology"],
    required: true,
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Project ───────────────────────────────────────────────────
const ProjectSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  description: { type: String, required: true },
  longDescription: { type: String, default: "" },
  image: { type: String, default: "" },
  imagePublicId: { type: String, default: "" },
  category: {
    type: String,
    enum: ["mobile", "web", "ai", "other"],
    default: "other",
  },
  tags: [{ type: String }],
  url: { type: String, default: "" },
  pdfUrl: { type: String, default: "" },
  htmlPageUrl: { type: String, default: "" },
  github: { type: String, default: "" },
  period: { type: String, default: "" },
  company: { type: String, default: "" },
  achievements: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Certification ─────────────────────────────────────────────
const CertificationSchema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  url: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Competition ───────────────────────────────────────────────
const CompetitionSchema = new Schema({
  title: { type: String, required: true },
  rank: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Language ──────────────────────────────────────────────────
const LanguageSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Service ───────────────────────────────────────────────────
const ServiceSchema = new Schema({
  icon: { type: String, default: "💻" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── TechStack ─────────────────────────────────────────────────
const TechStackSchema = new Schema({
  category: { type: String, required: true },
  label: { type: String, required: true },
  items: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── ContactMessage ────────────────────────────────────────────
const ContactMessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

// ── AdminUser ─────────────────────────────────────────────────
const AdminUserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

// ── Export models (prevent re-compilation in dev) ─────────────
export const ProfileModel = models.Profile || model("Profile", ProfileSchema);
export const ExperienceModel = models.Experience || model("Experience", ExperienceSchema);
export const EducationModel = models.Education || model("Education", EducationSchema);
export const SkillModel = models.Skill || model("Skill", SkillSchema);
export const ProjectModel = models.Project || model("Project", ProjectSchema);
export const CertificationModel = models.Certification || model("Certification", CertificationSchema);
export const CompetitionModel = models.Competition || model("Competition", CompetitionSchema);
export const LanguageModel = models.Language || model("Language", LanguageSchema);
export const ServiceModel = models.Service || model("Service", ServiceSchema);
export const TechStackModel = models.TechStack || model("TechStack", TechStackSchema);
export const ContactMessageModel = models.ContactMessage || model("ContactMessage", ContactMessageSchema);
export const AdminUserModel = models.AdminUser || model("AdminUser", AdminUserSchema);
