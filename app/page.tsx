export const dynamic = "force-dynamic";

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
import CvLayout from "@/components/layout/CvLayout";
import type { CvData } from "@/types";

async function getCvData(): Promise<CvData> {
  await connectDB();

  const [
    profile,
    experiences,
    education,
    skills,
    projects,
    certifications,
    languages,
    services,
    techStack,
  ] = await Promise.all([
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

  return JSON.parse(
    JSON.stringify({
      profile,
      experiences,
      education,
      skills,
      projects,
      certifications,
      competitions: [],
      languages,
      services,
      techStack,
    })
  );
}

export default async function HomePage() {
  const cvData = await getCvData();

  return <CvLayout cvData={cvData} />;
}
