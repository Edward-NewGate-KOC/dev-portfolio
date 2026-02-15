"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SkillCardProps {
    name: string;
    mastery: number;
    icon: string;
    description: string;
    index: number;
}

function getMasteryColor(mastery: number) {
    if (mastery >= 90) return { bar: "bg-primary shadow-[0_0_10px_hsl(142,76%,50%,0.4)]", label: "text-primary" };
    if (mastery >= 70) return { bar: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]", label: "text-blue-400" };
    if (mastery >= 50) return { bar: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]", label: "text-amber-400" };
    if (mastery >= 30) return { bar: "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.3)]", label: "text-orange-400" };
    return { bar: "bg-neutral-500", label: "text-neutral-500" };
}

function getMasteryLabel(mastery: number) {
    if (mastery >= 90) return "Expert";
    if (mastery >= 70) return "Advanced";
    if (mastery >= 50) return "Intermediate";
    if (mastery >= 30) return "Familiar";
    return "Learning";
}

export function SkillCard({ name, mastery, icon, description, index }: SkillCardProps) {
    const colors = getMasteryColor(mastery);
    const label = getMasteryLabel(mastery);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md bg-neutral-800 p-1 group-hover:scale-110 transition-transform duration-300">
                        <img
                            src={`https://skillicons.dev/icons?i=${icon}`}
                            className="h-full w-full object-contain"
                            alt={name}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base text-neutral-200">{name}</CardTitle>
                            <span className={`text-[10px] font-mono uppercase tracking-wider ${colors.label}`}>
                                {label}
                            </span>
                        </div>
                        <span className="text-xs font-mono text-neutral-500">{mastery}% Mastery</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-950 border border-neutral-800">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${mastery}%` }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 + index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative h-full rounded-full ${colors.bar}`}
                        />
                    </div>
                    <CardDescription className="text-xs font-mono">
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    );
}
