"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    link: string;
    status: "active" | "completed" | "archived";
    index: number;
    progress?: number;
}

const statusConfig = {
    active: {
        label: "Active",
        dotClass: "bg-primary animate-pulse",
        textClass: "text-primary",
        borderHover: "hover:border-primary/40",
        shadowHover: "hover:shadow-[0_0_30px_-5px_hsl(142,76%,50%,0.15)]",
        lineGrade: "via-primary/50",
        titleHover: "group-hover:text-primary",
        indexHover: "group-hover:text-primary/40",
        arrowHover: "group-hover:text-primary",
        tagHover: "group-hover:border-primary/20",
        progressText: "text-primary/80",
        progressBar: "bg-primary shadow-[0_0_8px_hsl(142,76%,50%,0.4)]",
    },
    completed: {
        label: "Completed",
        dotClass: "bg-blue-400",
        textClass: "text-blue-400",
        borderHover: "hover:border-blue-400/40",
        shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.15)]",
        lineGrade: "via-blue-400/50",
        titleHover: "group-hover:text-blue-400",
        indexHover: "group-hover:text-blue-400/40",
        arrowHover: "group-hover:text-blue-400",
        tagHover: "group-hover:border-blue-400/20",
        progressText: "text-blue-400/80",
        progressBar: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.4)]",
    },
    archived: {
        label: "Archived",
        dotClass: "bg-neutral-500",
        textClass: "text-neutral-500",
        borderHover: "hover:border-neutral-500/40",
        shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(115,115,115,0.15)]",
        lineGrade: "via-neutral-500/50",
        titleHover: "group-hover:text-neutral-500",
        indexHover: "group-hover:text-neutral-500/40",
        arrowHover: "group-hover:text-neutral-500",
        tagHover: "group-hover:border-neutral-500/20",
        progressText: "text-neutral-500/80",
        progressBar: "bg-neutral-500 shadow-[0_0_8px_rgba(115,115,115,0.4)]",
    },
};

export function ProjectCard({ title, description, tech, link, status, index, progress }: ProjectCardProps) {
    const statusInfo = statusConfig[status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link href={link} target="_blank" className="block group h-full">
                <div className={`relative h-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-all duration-500 ${statusInfo.borderHover} ${statusInfo.shadowHover}`}>
                    <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${statusInfo.lineGrade} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className={`absolute top-4 right-4 text-[10px] font-mono text-neutral-600 ${statusInfo.indexHover} transition-colors`}>
                        {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-1.5">
                            <div className={`h-1.5 w-1.5 rounded-full ${statusInfo.dotClass}`} />
                            <span className={`text-[10px] font-mono uppercase tracking-wider ${statusInfo.textClass}`}>
                                {statusInfo.label}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <h3 className={`text-lg font-bold text-white ${statusInfo.titleHover} transition-colors duration-300`}>
                                {title}
                            </h3>
                            <ArrowUpRight className={`h-4 w-4 text-neutral-600 ${statusInfo.arrowHover} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300`} />
                        </div>

                        <p className="text-sm text-neutral-400 leading-relaxed">
                            {description}
                        </p>

                        {progress !== undefined && (
                            <div className="space-y-1.5 pt-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Progress</span>
                                    <span className={`text-[10px] font-mono ${statusInfo.progressText}`}>{progress}%</span>
                                </div>
                                <div className="relative h-1 w-full overflow-hidden rounded-full bg-neutral-800">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className={`h-full rounded-full ${statusInfo.progressBar}`}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-all duration-1000 pointer-events-none flex items-center justify-center font-serif text-[60px] select-none rotate-12 scale-150">
                            ᚛ᚑᚚᚙᚘᚗ
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {tech.map((t) => (
                                <span
                                    key={t}
                                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono bg-neutral-800/80 text-neutral-400 border border-neutral-700/50 ${statusInfo.tagHover} group-hover:text-neutral-300 transition-all duration-300`}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${statusInfo.lineGrade} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
            </Link>
        </motion.div>
    );
}
