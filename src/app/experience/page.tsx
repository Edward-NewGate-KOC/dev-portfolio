"use client";

import { Timeline } from "@/components/features/Timeline";
import { PageWrapper } from "@/components/visuals/PageWrapper";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";

export default function ExperiencePage() {
    return (
        <PageWrapper>
            <main className="container mx-auto min-h-screen px-6 py-24 pb-32">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-2 text-4xl font-bold tracking-tight text-white"
                        >
                            &lt;Experience /&gt;
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-neutral-400 font-mono text-sm"
                        >
                            A timeline of professional milestones and contributions.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm font-mono text-neutral-300 hover:border-primary/50 hover:text-primary transition-all duration-300 group"
                        >
                            <Download className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                            Resume.pdf
                        </Link>
                    </motion.div>
                </div>
                <Timeline />
            </main>
        </PageWrapper>
    );
}
