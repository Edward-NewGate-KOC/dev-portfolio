"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
    name: string;
    mastery: number;
    icon: string;
    index: number;
}

export function SkillBar({ name, mastery, icon, index }: SkillBarProps) {
    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between text-sm font-mono text-neutral-400">
                <span className="flex items-center gap-2">
                    <img src={`https://skillicons.dev/icons?i=${icon}`} className="h-4 w-4" alt={name} />
                    {name}
                </span>
                <span>{mastery}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-900 border border-neutral-800">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${mastery}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative h-full bg-primary"
                >
                    <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
