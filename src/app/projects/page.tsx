"use client";

import { ProjectCard } from "@/components/features/ProjectCard";
import { projects } from "@/lib/config";
import { PageWrapper } from "@/components/visuals/PageWrapper";
import { motion } from "framer-motion";
import { useState } from "react";

const filterOptions = ["all", "active", "completed", "archived"] as const;

export default function ProjectsPage() {
    const [filter, setFilter] = useState<string>("all");

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.status === filter);

    return (
        <PageWrapper>
            <main className="container mx-auto min-h-screen px-6 py-24 pb-32">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-2 text-4xl font-bold tracking-tight text-white"
                >
                    &lt;Projects /&gt;
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 text-neutral-400 font-mono text-sm"
                >
                    A curated selection of systems I&apos;ve designed and built.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 mb-8 flex-wrap"
                >
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setFilter(option)}
                            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${filter === option
                                ? "bg-primary/10 border-primary/40 text-primary shadow-[0_0_15px_-5px_hsl(142,76%,50%,0.3)]"
                                : "bg-neutral-900/50 border-neutral-800 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400"
                                }`}
                        >
                            {option}
                            <span className="ml-2 text-[10px] opacity-60">
                                ({option === "all" ? projects.length : projects.filter(p => p.status === option).length})
                            </span>
                        </button>
                    ))}
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.title} {...project} index={index} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-neutral-500 font-mono text-sm">
                            No projects found with status &quot;{filter}&quot;.
                        </p>
                    </motion.div>
                )}
            </main>
        </PageWrapper>
    );
}
