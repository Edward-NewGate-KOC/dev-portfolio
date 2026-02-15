"use client";

import { skills } from "@/lib/config";
import { SkillCard } from "@/components/features/SkillCard";
import { motion } from "framer-motion";

type Skill = typeof skills[number];

export function TechStack() {
    const categorizedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section className="container mx-auto px-6 py-20">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-3xl font-bold tracking-tight text-white"
            >
                &lt;System.Capabilities /&gt;
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-12 text-neutral-400 font-mono text-sm"
            >
                Tech stack & proficiency levels.
            </motion.p>

            <div className="space-y-16">
                {Object.entries(categorizedSkills).map(([category, categorySkills], catIndex) => (
                    <div key={category} className="space-y-6">
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.2 }}
                            className="text-xl font-mono text-primary/80 border-l-2 border-primary pl-4"
                        >
                            {category}
                        </motion.h3>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {categorySkills.map((skill, index) => (
                                <SkillCard
                                    key={skill.name}
                                    name={skill.name}
                                    mastery={skill.mastery}
                                    icon={skill.icon}
                                    description={skill.description}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
