import { NextResponse } from "next/server";
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
} from "@/models";

export async function GET() {
  try {
    await connectDB();

    const [profile, experiences, education, skills, projects, certifications, languages, services, techStack] =
      await Promise.all([
        ProfileModel.findOne().lean(),
        ExperienceModel.find().sort({ order: 1 }).lean(),
        EducationModel.find().sort({ order: 1 }).lean(),
        SkillModel.find().sort({ order: 1 }).lean(),
        ProjectModel.find().sort({ order: 1 }).lean(),
        CertificationModel.find().sort({ order: 1 }).lean(),
        LanguageModel.find().sort({ order: 1 }).lean(),
        ServiceModel.find().sort({ order: 1 }).lean(),
        TechStackModel.find().sort({ order: 1 }).lean(),
      ]);

    return NextResponse.json({
      success: true,
      data: { profile, experiences, education, skills, projects, certifications, competitions: [], languages, services, techStack },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
