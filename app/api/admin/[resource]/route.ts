import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
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
  ContactMessageModel,
} from "@/models";

const MODEL_MAP: Record<string, unknown> = {
  profile: ProfileModel,
  experiences: ExperienceModel,
  education: EducationModel,
  skills: SkillModel,
  projects: ProjectModel,
  certifications: CertificationModel,
  languages: LanguageModel,
  services: ServiceModel,
  techstack: TechStackModel,
  messages: ContactMessageModel,
};

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return false;
  return true;
}

// GET /api/admin/[resource]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
  }

  const { resource } = await params; // ⭐ FIX: Await params here
  
  const model = MODEL_MAP[resource] as { find?: Function; findOne?: Function } | undefined;
  if (!model) {
    return NextResponse.json({ success: false, error: "Ressource inconnue" }, { status: 404 });
  }

  await connectDB();

  try {
    let data;
    if (resource === "profile") {
      data = await (model as typeof ProfileModel).findOne().lean();
    } else {
      data = await (model as typeof ExperienceModel).find().sort({ order: 1 }).lean();
    }
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/admin/[resource]  → create
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
  }

  const { resource } = await params; // ⭐ FIX: Await params here
  
  const model = MODEL_MAP[resource];
  if (!model) {
    return NextResponse.json({ success: false, error: "Ressource inconnue" }, { status: 404 });
  }

  await connectDB();

  try {
    const body = await req.json();
    const doc = await (model as typeof ExperienceModel).create(body);
    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Création échouée" }, { status: 500 });
  }
}

// PUT /api/admin/[resource]  → update (with ?id=xxx for non-profile)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
  }

  const { resource } = await params; // ⭐ FIX: Await params here
  
  const model = MODEL_MAP[resource];
  if (!model) {
    return NextResponse.json({ success: false, error: "Ressource inconnue" }, { status: 404 });
  }

  await connectDB();

  try {
    const body = await req.json();
    const { _id, ...rest } = body;

    let doc;
    if (resource === "profile") {
      doc = await (model as typeof ProfileModel).findOneAndUpdate({}, rest, { new: true, upsert: true });
    } else {
      doc = await (model as typeof ExperienceModel).findByIdAndUpdate(_id, rest, { new: true });
    }

    return NextResponse.json({ success: true, data: doc });
  } catch {
    return NextResponse.json({ success: false, error: "Mise à jour échouée" }, { status: 500 });
  }
}

// DELETE /api/admin/[resource]?id=xxx
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
  }

  const { resource } = await params; // ⭐ FIX: Await params here
  
  const model = MODEL_MAP[resource];
  if (!model) {
    return NextResponse.json({ success: false, error: "Ressource inconnue" }, { status: 404 });
  }

  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID manquant" }, { status: 400 });

    await (model as typeof ExperienceModel).findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Suppression échouée" }, { status: 500 });
  }
}