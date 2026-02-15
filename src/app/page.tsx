"use client";

import { HomeHeader } from "@/components/features/HomeHeader";
import { TechStack } from "@/components/features/TechStack";
import { TerminalLoader } from "@/components/visuals/TerminalLoader";
import { GitHubStats } from "@/components/features/GitHubStats";
import { AboutSection } from "@/components/features/AboutSection";
import { FeaturedProjects } from "@/components/features/FeaturedProjects";
import { WhatIDo } from "@/components/features/WhatIDo";
import { StatsCounter } from "@/components/features/StatsCounter";
import { Philosophy } from "@/components/features/Philosophy";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useLoader } from "@/context/LoaderContext";
import { motion } from "framer-motion";

export default function Home() {
  const { isInitialized, setInitialized } = useLoader();

  return (
    <main className="pb-24 min-h-screen">
      {!isInitialized ? (
        <TerminalLoader onComplete={() => setInitialized(true)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HomeHeader />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <StatsCounter />
          <SectionDivider />
          <WhatIDo />
          <SectionDivider />
          <TechStack />
          <SectionDivider />
          <GitHubStats />
          <SectionDivider />
          <Philosophy />
          <SectionDivider />
          <FeaturedProjects />
        </motion.div>
      )}
    </main>
  );
}
