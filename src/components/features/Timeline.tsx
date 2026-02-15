"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/config";
import { Briefcase } from "lucide-react";

export function Timeline() {
    return (
        <div className="relative space-y-8">
            <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-neutral-800 to-transparent" />

            {experience.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative pl-14 group"
                >
                    <div className="absolute left-[12px] top-6 z-10">
                        <div className="h-4 w-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary group-hover:shadow-[0_0_12px_hsl(142,76%,50%,0.5)] transition-all duration-300" />
                    </div>
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(142,76%,50%,0.1)]">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                                <Briefcase className="h-3 w-3" />
                                {item.year}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                            {item.title}
                        </h3>
                        <span className="text-sm font-mono text-neutral-500 mb-3 block">
                            @ {item.company}
                        </span>

                        <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-4">
                            {item.description}
                        </p>

                        {item.tech && (
                            <div className="flex flex-wrap gap-2">
                                {item.tech.map(t => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-neutral-800/80 text-neutral-400 border border-neutral-700/50 group-hover:border-primary/20 group-hover:text-neutral-300 transition-all duration-300"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
