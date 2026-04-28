import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  ProfileModel, ExperienceModel, EducationModel, SkillModel,
  ProjectModel, CertificationModel, LanguageModel, ServiceModel,
  TechStackModel, AdminUserModel,
} from "@/models";
import bcrypt from "bcryptjs";

// Protect with a secret token — only call this once during setup
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await connectDB();

  // Clear existing data
  await Promise.all([
    ProfileModel.deleteMany({}),
    ExperienceModel.deleteMany({}),
    EducationModel.deleteMany({}),
    SkillModel.deleteMany({}),
    ProjectModel.deleteMany({}),
    CertificationModel.deleteMany({}),
    LanguageModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    TechStackModel.deleteMany({}),
    AdminUserModel.deleteMany({}),
  ]);

  // Profile
  await ProfileModel.create({
    name: "Talaboulma Roumaissa",
    title: "Développeuse Mobile & Ingénieure IA",
    subtitle: "Flutter · IA · React",
    avatar: "",
    email: "talaromaissa@gmail.com",
    phone: "+213 798785528",
    location: "Blida, Algérie",
    github: "https://github.com/TalaboulmaRomaissa",
    linkedin: "https://linkedin.com/in/TalaboulmaRomaissa",
    bio: `Je m'appelle Roumaissa Talaboulma, ingénieure en intelligence artificielle et développeuse mobile avec une solide expérience en Flutter. Diplômée en Master Systèmes Informatiques Intelligents à l'USTHB, je combine des compétences en deep learning, NLP et computer vision avec une expertise pratique en développement d'applications mobiles cross-platform.`,
    parcours: `Mon parcours est marqué par une double spécialisation rare : le développement mobile professionnel et l'intelligence artificielle avancée. Depuis 2 ans, je développe des applications Flutter en production chez DSSI — des CRM aux plateformes de réservation en passant par des apps de gestion d'inventaire. En parallèle, mon projet de fin d'études portait sur l'analyse multimodale de données médicales par deep learning avec des transformeurs, obtenant mention très bien. Cette combinaison mobile + IA me positionne sur des projets d'applications intelligentes à fort impact.`,
    philosophy: `Ce qui m'anime dans mon travail, c'est de créer des technologies qui résolvent des problèmes réels. Je crois que la meilleure app est celle que l'utilisateur utilise naturellement, sans même penser à l'interface. Au-delà du code, j'applique les principes de Clean Architecture, les patterns BLOC/Provider, et l'assurance qualité pour livrer des solutions robustes et maintenables.`,
    summary: `Mobile Developer (Flutter/Dart) & AI Engineer with 2+ years building cross-platform applications. Experienced in Clean Architecture, BLoC/Provider, Firebase, REST APIs, Supabase. Background in deep learning, NLP, and computer vision.`,
  });

  // Admin user
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "changeme123!",
    12
  );
  await AdminUserModel.create({
    email: process.env.ADMIN_EMAIL || "talaromaissa@gmail.com",
    passwordHash,
  });

  return NextResponse.json({ success: true, message: "Base de données initialisée !" });
}
