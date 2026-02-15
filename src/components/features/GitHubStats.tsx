"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/config";
import { siteConfig } from "@/lib/config";
import { Activity, Flame, Code2 } from "lucide-react";
import Link from "next/link";

const githubStats = stats(siteConfig.githubUsername);

const statCards = [
    {
        title: "GitHub Stats",
        icon: Activity,
        url: githubStats.github,
        description: "Overall contribution & metrics",
    },
    {
        title: "Contribution Streak",
        icon: Flame,
        url: githubStats.streak,
        description: "Daily commitment consistency",
    },
    {
        title: "Top Languages",
        icon: Code2,
        url: githubStats.langs,
        description: "Code distribution by language",
    },
];

export function GitHubStats() {
    return (
        <section className="container mx-auto px-6 py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-2 text-3xl font-bold tracking-tight text-white"
                        >
                            &lt;System.Metrics /&gt;
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 font-mono text-sm"
                        >
                            Live data stream from GitHub API.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href={`https://github.com/${siteConfig.githubUsername}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm font-mono text-white hover:border-primary/50 hover:text-primary transition-all duration-300"
                        >
                            <Activity className="h-4 w-4" />
                            View GitHub Profile
                        </Link>
                    </motion.div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-5 space-y-4 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(142,76%,50%,0.1)] flex flex-col">
                                <div className="flex items-center gap-2 text-sm font-mono text-neutral-400 group-hover:text-primary/80 transition-colors">
                                    <card.icon className="h-4 w-4" />
                                    {card.title}
                                </div>

                                <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg bg-black/20 border border-neutral-800/50 p-2">
                                    <img
                                        src={card.url}
                                        alt={card.title}
                                        className="max-w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/50">
                                    <span className="text-[10px] font-mono text-neutral-600">
                                        {card.description}
                                    </span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_5px_hsl(142,76%,50%)] transition-all duration-300" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
