"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/config";
import { ProjectCard } from "./ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
    const featured = projects.slice(0, 3);

    return (
        <section className="container mx-auto px-6 py-20">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-2 text-3xl font-bold tracking-tight text-white"
                    >
                        &lt;Featured.Projects /&gt;
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-400 font-mono text-sm"
                    >
                        Highlighted work from the archive.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-primary transition-colors group"
                    >
                        View all
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((project, index) => (
                    <ProjectCard key={project.title} {...project} index={index} />
                ))}
            </div>
        </section>
    );
}
