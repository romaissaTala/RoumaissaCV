"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import AProposTab from "@/components/sections/AProposTab";
import CurriculumTab from "@/components/sections/CurriculumTab";
import ProjetsTab from "@/components/sections/ProjetsTab";
import ContactTab from "@/components/sections/ContactTab";
import type { CvData, CvTab } from "@/types";

interface Props {
  cvData: CvData;
}

export default function CvLayout({ cvData }: Props) {
  const [activeTab, setActiveTab] = useState<CvTab>("apropos");

  const renderTab = () => {
    switch (activeTab) {
      case "apropos":
        return <AProposTab cvData={cvData} />;
      case "cv":
        return <CurriculumTab cvData={cvData} />;
      case "projets":
        return <ProjetsTab projects={cvData.projects} />;
      case "contact":
        return <ContactTab />;
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:sticky md:top-8 md:self-start">
          <Sidebar profile={cvData.profile} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
          >
            {/* Tab bar */}
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab content */}
            <div className="p-6 md:p-8 animate-fade-in-up" key={activeTab}>
              {renderTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
