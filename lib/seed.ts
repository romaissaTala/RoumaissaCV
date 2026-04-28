import 'dotenv/config'; 
import { connectDB } from "./db";
import {
  ProfileModel,
  ExperienceModel,
  EducationModel,
  SkillModel,
  ProjectModel,
  CertificationModel,
  LanguageModel,
  ServiceModel,
  TechStackModel,
  AdminUserModel,
} from "../models";
import bcrypt from "bcryptjs";

async function seed() {
  await connectDB();
  console.log("🌱 Seeding database with updated CV data...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
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
  console.log("✅ Cleared successfully");

  // ── Profile ──────────────────────────────────────────────────
  console.log("📝 Creating profile...");
  await ProfileModel.create({
    name: "Roumaissa Talaboulma",
    title: "Flutter Developer · Mobile Software Engineer · AI & Deep Learning Engineer",
    subtitle: "Flutter · Dart · BLoC · Clean Architecture · AI/ML",
    avatar: "", // Add your Cloudinary URL later
    email: "talaromaissa@gmail.com",
    phone: "+213 0798785528",
    location: "Blida, Algeria",
    github: "https://github.com/romaissaTala",
    linkedin: "https://www.linkedin.com/in/roumaissa-talaboulma-942054229",
    instagram: "orangeccup_",
    website: "",
    philosophy: `Ce qui m'anime dans mon travail, c'est de créer des technologies qui résolvent des problèmes réels. Je crois que la meilleure app est celle que l'utilisateur utilise naturellement, sans même penser à l'interface. Au-delà du code, j'applique les principes de Clean Architecture, les patterns BLOC/Provider, et l'assurance qualité pour livrer des solutions robustes et maintenables.`,
    bio: `Flutter Developer with 1.5+ years of professional experience building high-performance, cross-platform mobile applications. Junior–Mid level in Flutter/Dart with deep mastery of BLoC, Provider, and Clean Architecture — delivering production-grade apps in CRM, inventory, e-commerce, and SaaS domains. Complementary strengths in full-stack web development (Next.js, Node.js, TypeScript) and applied AI (computer vision, NLP, multimodal deep learning), enabling end-to-end ownership of complex, AI-powered products.`,
     parcours: `Mon parcours est marqué par une double spécialisation rare : le développement mobile professionnel et l'intelligence artificielle avancée. Depuis 2 ans, je développe des applications Flutter en production chez DSSI — des CRM aux plateformes de réservation en passant par des apps de gestion d'inventaire. En parallèle, mon projet de fin d'études portait sur l'analyse multimodale de données médicales par deep learning avec des transformeurs, obtenant mention très bien. Cette combinaison mobile + IA me positionne sur des projets d'applications intelligentes à fort impact.`,
    summary: `Flutter Developer with 1.5+ years of experience delivering production-grade mobile apps. Expert in BLoC, Provider, and Clean Architecture. Strong background in AI/ML and full-stack web development.`,
  });

  // ── Experience ────────────────────────────────────────────────
  console.log("💼 Creating experiences...");
  await ExperienceModel.insertMany([
    {
      role: "Mobile Application Developer",
      company: "DSSI",
      startDate: "Oct 2024",
      endDate: "Present",
      description: [
        "Develop and maintain production cross-platform mobile apps using Flutter, Dart, REST APIs, and Firebase.",
        "Implement scalable architectures (BLoC, Provider, Clean Architecture) across multiple client-facing products.",
        "Collaborate closely with designers and backend engineers to deliver responsive, user-focused solutions.",
        "Deliver full product lifecycle: design, development, testing, CI/CD deployment, and maintenance.",
      ],
      tools: ["Flutter", "Dart", "BLoC", "Provider", "Clean Architecture", "Firebase", "REST APIs", "CI/CD"],
      order: 0,
    },
    {
      role: "Web Developer (Internship)",
      company: "DSSI",
      startDate: "Feb 2022",
      endDate: "Jul 2022",
      description: [
        "Built and maintained a Service Après-Vente (SAV) web platform using Django (Python), PostgreSQL, and Bootstrap.",
        "Applied MVC architecture for a clean, maintainable codebase across backend and frontend modules.",
      ],
      tools: ["Django", "Python", "PostgreSQL", "Bootstrap", "HTML/CSS"],
      order: 1,
    },
  ]);

  // ── Education ─────────────────────────────────────────────────
  console.log("🎓 Creating education...");
  await EducationModel.insertMany([
    {
      degree: "Master — Systèmes Informatiques Intelligents",
      school: "USTHB, Algiers",
      year: "2022 — 2024",
      description: "Graduation project: Multimodal Medical Data Analysis using Deep Learning (Transformers, ViT, BERT, FT-Transformer).",
      order: 0,
    },
    {
      degree: "Licence en Informatique",
      school: "USTHB, Algiers",
      year: "2019 — 2022",
      description: "",
      order: 1,
    },
    {
      degree: "Baccalauréat — Mathématiques",
      school: "Lycée Ahmed Hamani, Blida",
      year: "2019",
      description: "",
      order: 2,
    },
  ]);

  // ── Skills ────────────────────────────────────────────────────
  console.log("🛠️ Creating skills...");
  await SkillModel.insertMany([
    // Mobile
    { name: "Flutter / Dart", level: 85, category: "mobile", order: 0 },
    { name: "BLoC / Provider", level: 85, category: "mobile", order: 1 },
    { name: "Clean Architecture", level: 80, category: "mobile", order: 2 },
    { name: "Firebase / Supabase", level: 75, category: "mobile", order: 3 },
    { name: "REST APIs / Dio", level: 85, category: "mobile", order: 4 },
    // AI/ML
    { name: "Python / PyTorch", level: 75, category: "ai", order: 5 },
    { name: "Deep Learning", level: 70, category: "ai", order: 6 },
    { name: "Computer Vision", level: 70, category: "ai", order: 7 },
    { name: "NLP / Transformers", level: 65, category: "ai", order: 8 },
    // Frontend
    { name: "Next.js / React", level: 60, category: "frontend", order: 9 },
    { name: "TypeScript", level: 55, category: "frontend", order: 10 },
    { name: "Tailwind CSS", level: 60, category: "frontend", order: 11 },
    // Backend
    { name: "Node.js", level: 55, category: "backend", order: 12 },
    { name: "Django", level: 60, category: "backend", order: 13 },
    // Databases
    { name: "PostgreSQL / MySQL", level: 65, category: "database", order: 14 },
    { name: "MongoDB", level: 60, category: "database", order: 15 },
    { name: "Hive / SQLite", level: 80, category: "database", order: 16 },
    // Tools
    { name: "Git / GitHub", level: 75, category: "devops", order: 17 },
    { name: "CI/CD", level: 60, category: "devops", order: 18 },
    { name: "Docker", level: 50, category: "devops", order: 19 },
  ]);

  // ── Projects ──────────────────────────────────────────────────
  console.log("📁 Creating projects...");
  await ProjectModel.insertMany([
    {
      title: "SAV – CRM App",
      subtitle: "After-Sales CRM Platform",
      description: "Full-featured after-sales CRM: client management, product tracking, claims, invoicing, event management, and analytics dashboards.",
      longDescription: "Complete CRM solution for after-sales service management. Integrated REST APIs, Firebase push notifications, PDF generation, camera, GPS, and local storage (Sqflite).",
      image: "",
      category: "mobile",
      tags: ["Flutter", "Provider", "REST API", "Firebase", "Sqflite", "PDF Generation", "GPS"],
      period: "Oct 2024 – Feb 2026",
      company: "DSSI",
      achievements: [
        "Integrated REST APIs for backend synchronization",
        "Firebase push notifications for real-time updates",
        "PDF generation for invoices and reports",
        "Camera integration for document uploads",
        "GPS tracking for field agents",
        "Local storage with Sqflite for offline support",
      ],
      featured: true,
      order: 0,
    },
    {
      title: "Reservation App",
      subtitle: "Scheduling Platform",
      description: "Scheduling platform with user/client management, calendar workflows, and automated email confirmations.",
      longDescription: "Complete booking system for service-based businesses with calendar integration and automated notifications.",
      image: "",
      category: "mobile",
      tags: ["Flutter", "Provider", "REST API", "Firebase", "Calendar"],
      period: "Oct 2024 – Feb 2026",
      company: "DSSI",
      achievements: [
        "Interactive calendar with availability management",
        "Automated email confirmations",
        "User and client management system",
        "Real-time booking updates",
      ],
      featured: true,
      order: 1,
    },
    {
      title: "Inventory Management System",
      subtitle: "Offline-First Inventory",
      description: "Offline-first inventory system with hierarchical QR scanning (service → room → asset), multi-photo capture, GPS tracking, and PDF reports.",
      longDescription: "Complete inventory management solution with offline capabilities. BLoC + Clean Architecture, Hive offline storage, Dio REST with sync queue for failed uploads.",
      image: "",
      category: "mobile",
      tags: ["Flutter", "BLoC", "Clean Architecture", "Hive", "Dio", "QR Scanning", "PDF"],
      period: "Mar 2026 – Present",
      company: "DSSI",
      achievements: [
        "Hierarchical QR scanning (service → room → asset)",
        "Multi-photo capture for each asset",
        "GPS tracking for inventory audits",
        "PDF report generation",
        "Sync queue for failed uploads when offline",
        "BLoC + Clean Architecture implementation",
      ],
      featured: true,
      order: 2,
    },
    {
      title: "Relax Sounds App",
      subtitle: "Meditation & Sleep Assistant",
      description: "Meditation app with ambient sound mixing, offline support, sleep timer, and background audio playback.",
      longDescription: "Wellness app with high-quality ambient sounds, mixable audio tracks, sleep timer, and offline capabilities.",
      image: "",
      category: "mobile",
      tags: ["Flutter", "BLoC", "Hive", "Audio", "Background Playback", "CI/CD"],
      github: "https://github.com/romaissaTala/relax-sounds-app",
      period: "Mar 2026 – Present",
      achievements: [
        "Ambient sound mixing with individual volume controls",
        "Offline support with downloadable sounds",
        "Sleep timer with progressive volume fade-out",
        "Background audio playback",
        "CI/CD pipeline with GitHub Actions",
      ],
      featured: true,
      order: 3,
    },
    {
      title: "Minimal Team Task Board",
      subtitle: "Real-Time Kanban Collaboration",
      description: "Real-time Kanban project management app with drag-and-drop, live collaboration (typing indicators, online presence), and magic link auth.",
      longDescription: "Synchronized team workspace with real-time updates, presence indicators, and seamless authentication.",
      image: "",
      category: "mobile",
      tags: ["Flutter", "Supabase", "BLoC", "GoRouter", "Real-time", "Drag-and-Drop"],
      github: "https://github.com/romaissaTala/Minimal_Team_Task_Board",
      period: "Present",
      achievements: [
        "Real-time synchronization with Supabase Realtime",
        "Drag-and-drop task management",
        "Typing indicators and online presence",
        "Magic link authentication",
        "GoRouter for navigation",
      ],
      featured: false,
      order: 4,
    },
    {
      title: "Grocery Price Scanner",
      subtitle: "Price Comparison Platform",
      description: "Barcode-scanning price comparison platform with offline-first Hive caching, real-time Supabase pricing, and nutrition flip-card UI.",
      longDescription: "Scanner app that compares product prices across local stores using barcode scanning.",
      image: "",
      category: "mobile",
      tags: ["Flutter", "Supabase", "BLoC", "Hive", "ML Kit", "Barcode Scanner"],
      github: "https://github.com/romaissaTala/Grocery_Price_Scanner",
      period: "Present",
      achievements: [
        "Barcode scanning with ML Kit",
        "Offline-first caching with Hive",
        "Real-time price updates from Supabase",
        "Nutrition information flip-card UI",
        "Multi-store price comparison",
      ],
      featured: false,
      order: 5,
    },
    {
      title: "DELICIOUS – Food & Drink E-Commerce",
      subtitle: "E-Commerce Platform",
      description: "E-commerce app with dynamic gradient UI adapting to product branding, facial recognition auth, and Algerian local payment integration.",
      longDescription: "Complete e-commerce solution with Algerian payment gateways (Edahabia, DzModPay) and facial recognition authentication.",
      image: "",
      category: "mobile",
      tags: ["Flutter", "BLoC", "MongoDB", "ML Kit", "Payment Integration"],
      github: "https://github.com/romaissaTala/DELICIOUS---FOOD-DRINK",
      period: "In Progress",
      achievements: [
        "Dynamic gradient UI adapting to product branding",
        "Facial recognition authentication with Google ML Kit",
        "Algerian payment integration (Edahabia, DzModPay)",
        "MongoDB backend integration",
      ],
      featured: false,
      order: 6,
    },
    {
      title: "Multimodal Medical Data Analysis",
      subtitle: "Deep Learning Research",
      description: "Deep learning research project for medical diagnosis/prediction from multimodal data (image + text + tabular + time series).",
      longDescription: "Master's graduation project implementing BERT, ViT, FT-Transformer, and multimodal fusion models for binary classification.",
      image: "",
      category: "ai",
      tags: ["PyTorch", "TensorFlow", "Transformers", "ViT", "BERT", "Medical AI"],
      github: "https://github.com/romaissaTala/Analyse-de-donnees-medicales",
      period: "Feb – Jul 2024",
      company: "USTHB",
      achievements: [
        "Implemented BERT for medical text analysis",
        "ViT for medical image classification",
        "FT-Transformer for tabular data",
        "Multimodal fusion architecture",
        "Top-ranked graduation project",
      ],
      featured: true,
      order: 7,
    },
    {
      title: "Soil Fertility Prediction",
      subtitle: "Data Mining Project",
      description: "Analyzed 885 soil samples with 14 chemical features; KNN/Decision Tree/Random Forest models reaching 88.2% accuracy.",
      longDescription: "Machine learning project for soil fertility classification with clustering and interactive GUI.",
      image: "",
      category: "ai",
      tags: ["Python", "Scikit-learn", "Pandas", "Tkinter", "KNN", "Random Forest"],
      github: "https://github.com/romaissaTala/data-mining",
      period: "Dec 2023",
      achievements: [
        "88.2% accuracy with ensemble methods",
        "K-Means and DBSCAN clustering",
        "Interactive GUI for model tuning",
        "Comprehensive data analysis",
      ],
      featured: false,
      order: 8,
    },
    {
      title: "SAV Web Platform",
      subtitle: "After-Sales Service Platform",
      description: "After-sales service platform connecting appliance customers to maintenance companies; request submission, repair tracking, communication portal.",
      longDescription: "Full-stack web application for service after-sales management.",
      image: "",
      category: "web",
      tags: ["Django", "Python", "PostgreSQL", "Bootstrap"],
      period: "Feb – Jul 2022",
      achievements: [
        "MVC architecture implementation",
        "Request submission and tracking system",
        "Client-company communication portal",
        "Responsive design with Bootstrap",
      ],
      featured: false,
      order: 9,
    },
  ]);

  // ── Certifications ────────────────────────────────────────────
  // console.log("📜 Creating certifications...");
  // await CertificationModel.insertMany([
  //   { title: "N/A", issuer: "N/A", date: "2023", order: 0 },
  //   { title: "Deep Learning Specialization", issuer: "Coursera — Andrew Ng", date: "2023", order: 1 },
  //   { title: "Git & GitHub Mastery", issuer: "Udemy", date: "2022", order: 2 },
  // ]);

  // ── Languages ─────────────────────────────────────────────────
  console.log("🗣️ Creating languages...");
  await LanguageModel.insertMany([
    { name: "Arabic", level: "Native", order: 0 },
    { name: "French", level: "B2", order: 1 },
    { name: "English", level: "Technical Proficiency", order: 2 },
  ]);

  // ── Services ──────────────────────────────────────────────────
  console.log("💪 Creating services...");
  await ServiceModel.insertMany([
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Cross-platform Flutter apps with BLoC, Clean Architecture, and offline-first capabilities.",
      order: 0,
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Machine learning models integration in mobile apps using TensorFlow Lite and custom APIs.",
      order: 1,
    },
    {
      icon: "🌐",
      title: "Full-Stack Web",
      description: "End-to-end web applications with Next.js, Node.js, and modern databases.",
      order: 2,
    },
    {
      icon: "🏗️",
      title: "Technical Consulting",
      description: "Architecture design, code reviews, and team mentoring for mobile projects.",
      order: 3,
    },
  ]);

  // ── Tech Stack ─────────────────────────────────────────────────
  console.log("⚙️ Creating tech stack...");
  await TechStackModel.insertMany([
    { category: "Mobile", label: "Mobile Framework", items: ["Flutter", "Dart", "iOS", "Android"], order: 0 },
    { category: "State Management", label: "State & Architecture", items: ["BLoC", "Provider", "Clean Architecture", "GetIt", "GoRouter"], order: 1 },
    { category: "Backend", label: "Backend & BaaS", items: ["Firebase", "Supabase", "Node.js", "Django", "REST APIs"], order: 2 },
    { category: "Storage", label: "Local Storage", items: ["Hive", "SQLite", "Sqflite", "SharedPreferences"], order: 3 },
    { category: "Payments", label: "Payments & Integrations", items: ["Edahabia", "CCP", "DzModPay", "Google ML Kit"], order: 4 },
    { category: "AI/ML", label: "AI & Machine Learning", items: ["PyTorch", "TensorFlow", "Transformers", "Scikit-learn", "Pandas"], order: 5 },
    { category: "Web", label: "Web Technologies", items: ["Next.js", "TypeScript", "Tailwind CSS", "Django", "PostgreSQL"], order: 6 },
    { category: "Libraries", label: "UI & Utilities", items: ["FL Chart", "Lottie", "Cached Network Image", "PDF Generation", "QR Scanner"], order: 7 },
    { category: "DevOps", label: "Tools & CI/CD", items: ["Git", "GitHub Actions", "Docker", "Postman", "Swagger"], order: 8 },
  ]);

  // ── Admin User ─────────────────────────────────────────────────
  console.log("👑 Creating admin user...");
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );
  await AdminUserModel.create({
    email: process.env.ADMIN_EMAIL || "talaromaissa@gmail.com",
    passwordHash,
  });

  console.log("\n✅ Database seeded successfully with updated CV data!");
  console.log("\n📊 Summary:");
  console.log(`   - Profile: 1`);
  console.log(`   - Experiences: ${(await ExperienceModel.countDocuments())}`);
  console.log(`   - Education: ${(await EducationModel.countDocuments())}`);
  console.log(`   - Skills: ${(await SkillModel.countDocuments())}`);
  console.log(`   - Projects: ${(await ProjectModel.countDocuments())}`);
  console.log(`   - Languages: ${(await LanguageModel.countDocuments())}`);
  console.log(`   - Admin: 1`);
  
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

// /**
//  * Run once to seed the database with Romaissa's CV data.
//  * Usage: npx ts-node --project tsconfig.seed.json lib/seed.ts
//  * Or set up a /api/admin/seed endpoint protected by admin auth.
//  */

// import { connectDB } from "./db";
// import {
//   ProfileModel,
//   ExperienceModel,
//   EducationModel,
//   SkillModel,
//   ProjectModel,
//   CertificationModel,
//   LanguageModel,
//   ServiceModel,
//   TechStackModel,
//   AdminUserModel,
// } from "../models";
// import bcrypt from "bcryptjs";

// async function seed() {
//   await connectDB();
//   console.log("🌱 Seeding database...");

//   // Clear existing
//   await Promise.all([
//     ProfileModel.deleteMany({}),
//     ExperienceModel.deleteMany({}),
//     EducationModel.deleteMany({}),
//     SkillModel.deleteMany({}),
//     ProjectModel.deleteMany({}),
//     CertificationModel.deleteMany({}),
//     LanguageModel.deleteMany({}),
//     ServiceModel.deleteMany({}),
//     TechStackModel.deleteMany({}),
//     AdminUserModel.deleteMany({}),
//   ]);

//   // ── Profile ──────────────────────────────────────────────────
//   await ProfileModel.create({
//     name: "Talaboulma Roumaissa",
//     title: "Développeuse Mobile & web & Ingénieure IA",
//     subtitle: "Flutter · Next.js · Intelligence Artificielle",
//     avatar: "", // Set Cloudinary URL after uploading your photo
//     email: "talaromaissa@gmail.com",
//     phone: "+213 798785528",
//     location: "Blida, Algérie",
//     github: "https://github.com/romaissaTala",
//     linkedin: "www.linkedin.com/in/roumaissa-talaboulma-942054229",
//     instagram: "",
//     website: "",
//     bio: `Je m'appelle Roumaissa Talaboulma, ingénieure en intelligence artificielle et développeuse mobile avec une solide expérience en Flutter. Diplômée en Master Systèmes Informatiques Intelligents à l'USTHB, je combine des compétences en deep learning, NLP et computer vision avec une expertise pratique en développement d'applications mobiles cross-platform.`,
//     parcours: `Mon parcours est marqué par une double spécialisation rare : le développement mobile professionnel et l'intelligence artificielle avancée. Depuis 2 ans, je développe des applications Flutter en production chez DSSI — des CRM aux plateformes de réservation en passant par des apps de gestion d'inventaire. En parallèle, mon projet de fin d'études portait sur l'analyse multimodale de données médicales par deep learning avec des transformeurs, obtenant mention très bien. Cette combinaison mobile + IA me positionne sur des projets d'applications intelligentes à fort impact.`,
//     philosophy: `Ce qui m'anime dans mon travail, c'est de créer des technologies qui résolvent des problèmes réels. Je crois que la meilleure app est celle que l'utilisateur utilise naturellement, sans même penser à l'interface. Au-delà du code, j'applique les principes de Clean Architecture, les patterns BLOC/Provider, et l'assurance qualité pour livrer des solutions robustes et maintenables.`,
//     summary: `Mobile Developer (Flutter/Dart) & AI Engineer with 2+ years building cross-platform applications. Experienced in Clean Architecture, BLoC/Provider, Firebase, REST APIs, Supabase. Background in deep learning, NLP, and computer vision. Seeking impactful roles combining mobile and AI innovation.`,
//   });

//   // ── Experience ────────────────────────────────────────────────
//   await ExperienceModel.insertMany([
//     {
//       role: "Développeuse Mobile",
//       company: "DSSI — PLANETE ERP",
//       startDate: "Juil 2022",
//       endDate: null,
//       description: [
//         "Développement et maintenance d'applications mobiles cross-platform Flutter en production.",
//         "Conception et livraison de 2 applications CRM connectées à l'ERP PLANETE, utilisées par des équipes commerciales.",
//         "Développement d'une application de réservation avec gestion des disponibilités en temps réel.",
//         "Développement d'une application d'inventaire avec lecture de codes-barres et synchronisation offline.",
//         "Application personnelle et application Relax Sounds avec support offline et timer de sommeil.",
//         "Architecture Clean, gestion d'état BLOC/Provider, intégration REST APIs via Dio, stockage local Hive/SQLite.",
//       ],
//       tools: ["Flutter", "Dart", "Provider", "BLoC", "Dio", "Hive", "SQLite", "Firebase", "Supabase", "GetIt", "REST APIs", "Swagger"],
//       order: 0,
//     },
//     {
//       role: "Stagiaire en Intelligence Artificielle (Vision & NLP)",
//       company: "USTHB — Laboratoire de recherche",
//       startDate: "Fév 2024",
//       endDate: "Juil 2024",
//       description: [
//         "Analyse multimodale de données médicales pour le diagnostic et la prédiction par deep learning.",
//         "Implémentation et fine-tuning de transformeurs (ViT, BERT, Time Series Transformers) pour la classification d'images médicales et l'analyse de séries temporelles cliniques.",
//         "Traitement du langage naturel appliqué à des rapports médicaux avec BERT et NLTK.",
//         "Développement de pipelines de data preprocessing avec PyTorch et TensorFlow.",
//       ],
//       tools: ["Python", "PyTorch", "TensorFlow", "BERT", "ViT", "Transformers", "NLTK", "Pandas", "NumPy", "Scikit-learn"],
//       order: 1,
//     },
//     {
//       role: "Stagiaire Développeuse Web",
//       company: "DSSI — PLANETE ERP",
//       startDate: "Fév 2022",
//       endDate: "Juil 2022",
//       description: [
//         "Participation à la conception et développement de modules ERP/CRM pour PLANETE ERP.",
//         "Développement frontend avec Angular et backend avec ASP.NET.",
//         "Initiation aux processus Agile et aux standards de qualité logicielle de l'équipe.",
//       ],
//       tools: ["Angular", "ASP.NET", "C#", "SQL Server", "HTML", "CSS", "Bootstrap"],
//       order: 2,
//     },
//   ]);

//   // ── Education ─────────────────────────────────────────────────
//   await EducationModel.insertMany([
//     {
//       degree: "Master — Systèmes Informatiques Intelligents",
//       school: "Université des Sciences et de la Technologie Houari Boumediene (USTHB)",
//       year: "2022 — 2024",
//       description: "Spécialisation en Intelligence Artificielle, Deep Learning, NLP et Computer Vision. Projet de fin d'études : Analyse multimodale de données médicales par transformeurs.",
//       order: 0,
//     },
//     {
//       degree: "Licence en Informatique",
//       school: "Université des Sciences et de la Technologie Houari Boumediene (USTHB)",
//       year: "2019 — 2022",
//       description: "",
//       order: 1,
//     },
//     {
//       degree: "Baccalauréat en Mathématiques",
//       school: "Lycée Ahmed Hamani — Blida",
//       year: "2019",
//       description: "",
//       order: 2,
//     },
//   ]);

//   // ── Skills ────────────────────────────────────────────────────
//   await SkillModel.insertMany([
//     // Mobile
//     { name: "Flutter / Dart", level: 90, category: "mobile", order: 0 },
//     { name: "Clean Architecture", level: 80, category: "mobile", order: 1 },
//     { name: "BLoC / Provider", level: 85, category: "mobile", order: 2 },
//     { name: "Firebase", level: 80, category: "mobile", order: 3 },
//     { name: "Supabase", level: 75, category: "mobile", order: 4 },
//     // AI
//     { name: "Python / PyTorch", level: 80, category: "ai", order: 5 },
//     { name: "Deep Learning", level: 75, category: "ai", order: 6 },
//     { name: "NLP (BERT, Transformers)", level: 70, category: "ai", order: 7 },
//     { name: "Computer Vision (ViT, CNN)", level: 70, category: "ai", order: 8 },
//     // Frontend
//     { name: "React.js / Next.js", level: 60, category: "frontend", order: 9 },
//     { name: "HTML / CSS / Tailwind", level: 70, category: "frontend", order: 10 },
//     { name: "Angular", level: 55, category: "frontend", order: 11 },
//     // Backend
//     { name: "Django", level: 65, category: "backend", order: 12 },
//     { name: "ASP.NET / C#", level: 55, category: "backend", order: 13 },
//     { name: "Node.js", level: 50, category: "backend", order: 14 },
//     // Database
//     { name: "SQL / PostgreSQL / MySQL", level: 70, category: "database", order: 15 },
//     { name: "MongoDB / NoSQL", level: 65, category: "database", order: 16 },
//     { name: "SQLite / Hive", level: 80, category: "database", order: 17 },
//     // DevOps / Tools
//     { name: "Git / GitHub", level: 80, category: "devops", order: 18 },
//     { name: "REST APIs / Swagger", level: 85, category: "devops", order: 19 },
//     { name: "Docker", level: 45, category: "devops", order: 20 },
//     // Methodology
//     { name: "Agile / Scrum", level: 75, category: "methodology", order: 21 },
//     { name: "Clean Code / SOLID", level: 78, category: "methodology", order: 22 },
//   ]);

//   // ── Projects ──────────────────────────────────────────────────
//   await ProjectModel.insertMany([
//     {
//       title: "Applications CRM",
//       subtitle: "DSSI — PLANETE ERP",
//       description: "2 applications CRM cross-platform connectées à l'ERP PLANETE, utilisées par des équipes commerciales pour la gestion des clients et le suivi des ventes.",
//       longDescription: "Développement de deux applications CRM production-ready. La première dédiée à la gestion du portefeuille clients avec suivi des interactions, rappels et reporting. La seconde axée sur le cycle de vente avec devis, commandes et synchronisation en temps réel avec l'ERP backend.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "Provider", "Dio", "REST API", "Swagger", "SQLite", "Firebase Notifications"],
//       period: "2022 — 2024",
//       company: "DSSI",
//       achievements: [
//         "Architecture Clean avec séparation stricte data/domain/presentation",
//         "Gestion d'état Provider avec repositories abstraits",
//         "Intégration REST API via Dio avec intercepteurs d'authentification",
//         "Stockage local SQLite pour mode offline partiel",
//         "Notifications push Firebase pour les alertes commerciales",
//       ],
//       featured: true,
//       order: 0,
//     },
//     {
//       title: "Application de Réservation",
//       subtitle: "DSSI — PLANETE ERP",
//       description: "Application mobile de gestion des réservations avec disponibilités en temps réel, confirmations automatiques et tableau de bord de gestion.",
//       longDescription: "Solution mobile complète pour la gestion de réservations. L'app permet aux utilisateurs de consulter les disponibilités en temps réel, créer des réservations, recevoir des confirmations et gérer leurs bookings. Côté admin, tableau de bord avec calendrier et statistiques.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "BLoC", "Supabase", "Firebase", "Hive", "GetIt"],
//       period: "2023",
//       company: "DSSI",
//       achievements: [
//         "Gestion d'état BLoC pour la logique de réservation complexe",
//         "Supabase pour la base de données temps réel et l'authentification",
//         "Calendrier interactif avec affichage des disponibilités",
//         "Notifications Firebase pour les rappels de réservation",
//         "Cache local Hive pour la performance offline",
//       ],
//       featured: true,
//       order: 1,
//     },
//     {
//       title: "Application d'Inventaire",
//       subtitle: "DSSI — PLANETE ERP",
//       description: "Application mobile de gestion d'inventaire avec lecture de codes-barres, suivi des stocks en temps réel et synchronisation avec l'ERP.",
//       longDescription: "Application de gestion de stock et d'inventaire connectée à PLANETE ERP. Fonctionnalités : lecture codes-barres via caméra, entrées/sorties de stock, alertes de seuil, rapports d'inventaire et synchronisation bidirectionnelle avec l'ERP central.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "Clean Architecture", "BLoC", "Dio", "Hive", "GetIt", "FL Chart"],
//       period: "2023 — 2024",
//       company: "DSSI",
//       achievements: [
//         "Scan de codes-barres natif avec package mobile_scanner",
//         "Clean Architecture : séparation en couches distinctes",
//         "Graphiques de suivi de stock avec FL Chart",
//         "Mode offline avec synchronisation différée via Hive",
//         "Injection de dépendances avec GetIt",
//       ],
//       featured: true,
//       order: 2,
//     },
//     {
//       title: "Relax Sounds",
//       subtitle: "Application de méditation et sommeil",
//       description: "Application de méditation et aide au sommeil avec sons ambiants haute qualité (pluie, feu, océan), support offline, timer de sommeil et mixage audio personnalisé.",
//       longDescription: "App mobile dédiée au bien-être et à la relaxation. Bibliothèque de sons ambiants haute qualité téléchargeables pour une écoute offline. Timer de sommeil avec arrêt automatique, mixage multi-sons pour créer des ambiances personnalisées, et interface minimaliste conçue pour la détente.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "Provider", "Hive", "Audio", "Offline"],
//       github: "https://github.com/TalaboulmaRomaissa",
//       achievements: [
//         "Gestion audio avancée avec just_audio et audio_service",
//         "Support offline complet avec téléchargement des sons",
//         "Mixage de plusieurs sons simultanément avec contrôle de volume individuel",
//         "Timer de sommeil avec fade-out progressif",
//         "Interface zen, animations fluides, design minimaliste",
//       ],
//       featured: true,
//       order: 3,
//     },
//     {
//       title: "Plateforme Service Après-Vente",
//       subtitle: "Projet académique — Web & Mobile",
//       description: "Plateforme connectant clients d'appareils électroménagers aux entreprises de maintenance. Backend Django, frontend HTML/CSS/Bootstrap, app mobile Flutter complémentaire.",
//       longDescription: "Solution complète SAV en deux parties. La plateforme web (Django + Bootstrap) permet la soumission de demandes d'assistance, le suivi des réparations et la communication directe avec les techniciens. L'application mobile Flutter (Dart) offre la même expérience adaptée aux mobiles avec notifications en temps réel.",
//       image: "",
//       category: "web",
//       tags: ["Django", "Python", "HTML", "CSS", "Bootstrap", "Flutter", "Dart", "SQLite", "Firebase Notifications", "HTTP"],
//       github: "https://github.com/TalaboulmaRomaissa",
//       achievements: [
//         "Backend Django avec authentification, gestion des demandes et suivi",
//         "Frontend responsive HTML/CSS/Bootstrap",
//         "Application mobile Flutter complémentaire",
//         "Notifications Firebase pour les mises à jour de statut",
//         "Base de données SQLite pour le stockage local mobile",
//       ],
//       featured: false,
//       order: 4,
//     },
//     {
//       title: "Analyse de Données Médicales Multimodales",
//       subtitle: "Projet de fin d'études — Master IA",
//       description: "Système d'analyse multimodale de données médicales (images et séries temporelles) pour le diagnostic et la prédiction par deep learning avec des transformeurs.",
//       longDescription: "Projet de recherche appliquée en IA médicale. Développement d'un pipeline de deep learning multimodal combinant l'analyse d'images médicales (Vision Transformer - ViT) et de données temporelles cliniques (Time Series Transformer) pour améliorer la précision diagnostique. Fine-tuning de modèles BERT pour l'analyse des rapports médicaux textuels.",
//       image: "",
//       category: "ai",
//       tags: ["Python", "PyTorch", "TensorFlow", "ViT", "BERT", "Transformers", "NLP", "Computer Vision", "Time Series", "Pandas", "NumPy"],
//       period: "Fév 2024 — Juil 2024",
//       company: "USTHB — Laboratoire de recherche",
//       achievements: [
//         "Architecture multimodale combinant ViT + BERT + Time Series Transformer",
//         "Fine-tuning de modèles pré-entraînés sur données médicales",
//         "Pipeline de prétraitement pour données DICOM et séries temporelles cliniques",
//         "Évaluation avec métriques médicales (AUC-ROC, F1, sensibilité/spécificité)",
//         "Mention très bien — classé parmi les meilleurs projets de promotion",
//       ],
//       featured: true,
//       order: 5,
//     },
//     {
//       title: "Smart Habit Tracker with Patterns",
//       subtitle: "Projet personnel",
//       description: "Application de suivi d'habitudes intelligente qui analyse les patterns comportementaux. Détecte automatiquement les créneaux horaires optimaux et fournit des insights personnalisés.",
//       longDescription: "Au-delà d'un simple tracker avec cases à cocher, cette app analyse quand vous accomplissez vos habitudes. Si 'Étudier' est cochée à 8h trois jours de suite mais manquée le jeudi, l'app détecte le pattern et vous rappelle proactivement le lundi suivant à 7h50. Machine learning léger embarqué pour la reconnaissance de patterns.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "BLoC", "Hive", "FL Chart", "GetIt", "Clean Architecture"],
//       github: "https://github.com/TalaboulmaRomaissa/Smart_Habit_Tracker_with_Patterns",
//       achievements: [
//         "Algorithme de détection de patterns comportementaux",
//         "Visualisations de streak et de progression avec FL Chart",
//         "Architecture Clean avec BLoC pour la logique métier",
//         "Notifications intelligentes basées sur les patterns détectés",
//         "Export de données et rapport hebdomadaire",
//       ],
//       featured: false,
//       order: 6,
//     },
//     {
//       title: "AI Mood-Based Music Player",
//       subtitle: "Projet personnel — IA + Mobile",
//       description: "Lecteur musical intelligent qui détermine l'humeur via 3 méthodes : heure de la journée, analyse de texte (NLP sentiment), et expressions faciales. Joue la musique adaptée automatiquement.",
//       longDescription: "L'app agit comme un DJ intelligent. Trois modes de détection d'humeur : 1) Heure de la journée (matin = énergique, nuit = relaxant), 2) Saisie textuelle analysée par analyse de sentiment NLP, 3) Détection d'expression faciale via caméra. Crée des playlists dynamiques adaptées à l'état émotionnel détecté.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "Python", "NLP", "Sentiment Analysis", "BLoC", "Provider", "TensorFlow Lite"],
//       github: "https://github.com/TalaboulmaRomaissa/AI_Mood_Based_Music_Player",
//       achievements: [
//         "Analyse de sentiment NLP intégrée directement dans l'app Flutter",
//         "Modèle TensorFlow Lite embarqué pour l'inférence on-device",
//         "Trois modes de détection d'humeur avec fusion des signaux",
//         "Génération dynamique de playlists adaptées",
//         "Interface musicale fluide avec animations d'état d'humeur",
//       ],
//       featured: true,
//       order: 7,
//     },
//     {
//       title: "Grocery Price Scanner",
//       subtitle: "Projet personnel",
//       description: "App de comparaison de prix : l'utilisateur scanne un code-barres et l'app compare les prix de ce produit dans les magasins locaux pour trouver l'option la moins chère.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "BLoC", "Dio", "REST API", "Barcode Scanner", "Hive"],
//       github: "https://github.com/TalaboulmaRomaissa/Grocery_Price_Scanner",
//       achievements: [
//         "Scan de codes-barres via caméra avec mobile_scanner",
//         "Recherche produit dans base de données locale puis API externe",
//         "Comparaison de prix multi-magasins avec tri par prix",
//         "Cache local des produits scannés récemment",
//         "Géolocalisation pour les magasins à proximité",
//       ],
//       featured: false,
//       order: 8,
//     },
//     {
//       title: "Micro-Learning App for Developers",
//       subtitle: "Projet personnel — EdTech",
//       description: "TikTok du coding : leçons de 1 minute (vidéos ou snippets) suivies de quizzes. Système de streaks et XP pour maintenir la motivation quotidienne des développeurs.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "BLoC", "Supabase", "Firebase", "Hive", "FL Chart", "GetIt"],
//       github: "https://github.com/TalaboulmaRomaissa/Micro-Learning_App_for_Developers",
//       achievements: [
//         "Format micro-learning : leçons ≤ 1 minute pour maximiser la rétention",
//         "Système gamifié : XP, streaks, badges de compétences",
//         "Contenu adaptatif basé sur le niveau et les réponses aux quizzes",
//         "Supabase pour le contenu backend et les progressions utilisateurs",
//         "Animations engageantes avec Lottie pour les récompenses",
//       ],
//       featured: false,
//       order: 9,
//     },
//     {
//       title: "Minimal Team Task Board",
//       subtitle: "Projet personnel",
//       description: "Espace de travail Kanban synchronisé en temps réel pour équipes. Pas un clone Trello — un workspace épuré centré sur la collaboration synchrone.",
//       image: "",
//       category: "mobile",
//       tags: ["Flutter", "Dart", "BLoC", "Supabase Realtime", "GetIt", "Hive"],
//       github: "https://github.com/TalaboulmaRomaissa/Minimal_Team_Task_Board",
//       achievements: [
//         "Synchronisation temps réel via Supabase Realtime subscriptions",
//         "Interface drag-and-drop pour déplacer les cartes entre colonnes",
//         "Gestion des membres d'équipe et assignation de tâches",
//         "Architecture BLoC avec streams pour les mises à jour live",
//         "Design minimaliste centré sur la productivité",
//       ],
//       featured: false,
//       order: 10,
//     },
//   ]);

//   // ── Certifications ────────────────────────────────────────────
//   await CertificationModel.insertMany([
//     { title: "Flutter & Dart — Formation Complète", issuer: "Udemy — Ali Hassan Ali", date: "2023", order: 0 },
//     { title: "Deep Learning Specialization", issuer: "Coursera — Andrew Ng", date: "2023", order: 1 },
//     { title: "Git & GitHub Mastery", issuer: "Udemy", date: "2022", order: 2 },
//   ]);

//   // ── Languages ─────────────────────────────────────────────────
//   await LanguageModel.insertMany([
//     { name: "Arabe", level: "Langue maternelle", order: 0 },
//     { name: "Français", level: "B2 — Courant", order: 1 },
//     { name: "Anglais", level: "Technique — B1", order: 2 },
//   ]);

//   // ── Services ──────────────────────────────────────────────────
//   await ServiceModel.insertMany([
//     {
//       icon: "📱",
//       title: "Développeuse Flutter",
//       description: "Création d'applications mobiles cross-platform performantes et élégantes avec Flutter et Dart, de l'architecture à la publication sur les stores.",
//       order: 0,
//     },
//     {
//       icon: "🤖",
//       title: "Ingénieure IA",
//       description: "Développement de modèles de deep learning, NLP et computer vision. Intégration d'IA dans des applications mobiles et web avec TensorFlow Lite et PyTorch.",
//       order: 1,
//     },
//     {
//       icon: "🌐",
//       title: "Développeuse Web",
//       description: "Développement d'applications web avec React/Next.js pour le frontend et Django/Node.js pour le backend. En progression continue.",
//       order: 2,
//     },
//     {
//       icon: "🏗️",
//       title: "Architecture Logicielle",
//       description: "Conception d'architectures propres et maintenables : Clean Architecture, BLoC pattern, SOLID, injection de dépendances avec GetIt.",
//       order: 3,
//     },
//   ]);

//   // ── Tech Stack ─────────────────────────────────────────────────
//   await TechStackModel.insertMany([
//     { category: "Mobile", label: "Mobile", items: ["Flutter", "Dart", "Android", "iOS", "Cross-platform"], order: 0 },
//     { category: "State & Architecture", label: "State & Architecture", items: ["BLoC", "Provider", "GetIt", "Clean Architecture", "MVVM", "SOLID"], order: 1 },
//     { category: "Backend & Cloud", label: "Backend & Cloud", items: ["Firebase Auth", "Firestore", "Firebase Storage", "Supabase", "REST APIs", "Swagger"], order: 2 },
//     { category: "Local Storage", label: "Stockage Local", items: ["Hive", "SQLite", "sqflite", "SharedPreferences"], order: 3 },
//     { category: "AI & ML", label: "IA & Machine Learning", items: ["Python", "PyTorch", "TensorFlow", "TF Lite", "BERT", "ViT", "NLTK", "Pandas"], order: 4 },
//     { category: "Libraries & Tools", label: "Libraries & Outils", items: ["Dio", "FL Chart", "Lottie", "Skeletonizer", "Cached Network Image", "mobile_scanner"], order: 5 },
//     { category: "Web", label: "Web (en progression)", items: ["React.js", "Next.js", "Node.js", "Django", "Angular", "HTML/CSS", "Tailwind", "Bootstrap"], order: 6 },
//     { category: "DevTools", label: "Outils de Développement", items: ["Git", "GitHub", "VS Code", "Android Studio", "Postman", "Figma"], order: 7 },
//   ]);

//   // ── Admin User ─────────────────────────────────────────────────
//   const passwordHash = await bcrypt.hash(
//     process.env.ADMIN_PASSWORD || "changeme123!",
//     12
//   );
//   await AdminUserModel.create({
//     email: process.env.ADMIN_EMAIL || "talaromaissa@gmail.com",
//     passwordHash,
//   });

//   console.log("✅ Database seeded successfully!");
//   process.exit(0);
// }

// seed().catch((err) => {
//   console.error("❌ Seed failed:", err);
//   process.exit(1);
// });
