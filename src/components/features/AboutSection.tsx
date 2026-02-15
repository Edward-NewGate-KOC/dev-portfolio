"use client";

import { motion } from "framer-motion";
import { User, MapPin } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { siteConfig } from "@/lib/config";

const systemSpecs = siteConfig.systemSpecs;

const personalInfo = [
    { icon: User, label: "Name", value: siteConfig.name },
    { icon: MapPin, label: "Location", value: siteConfig.location },
    ...siteConfig.personalTraits
];

function TerminalBody({ command, data }: { command: string; data: any[] }) {
    return (
        <div className="p-5 font-mono text-sm space-y-2.5">
            <div className="text-primary/80">$ {command}</div>
            <div className="space-y-1.5">
                {data.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <item.icon className="h-3.5 w-3.5 text-primary/60" />
                        <span className="text-neutral-500 w-24">{item.label}</span>
                        <span className="text-neutral-300">: {item.value}</span>
                    </motion.div>
                ))}
            </div>
            <div className="pt-2 text-primary/80">$ _<span className="animate-pulse">|</span></div>
        </div>
    );
}

export function AboutSection() {
    return (
        <section className="container mx-auto px-6 py-20">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-3xl font-bold tracking-tight text-white"
            >
                &lt;About /&gt;
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-12 text-neutral-400 font-mono text-sm"
            >
                Quick system overview.
            </motion.p>


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6 rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6 flex flex-col justify-center space-y-4"
            >
                <p className="text-neutral-300 leading-relaxed">
                    {siteConfig.longBio[0]}
                </p>

                <p className="text-neutral-400 text-sm leading-relaxed">
                    {siteConfig.longBio[1]}
                </p>
                <div className="pt-2 flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full animate-pulse ${siteConfig.availability.isAvailable ? "bg-primary" : "bg-red-500"}`} />
                    <span className={`text-xs font-mono ${siteConfig.availability.isAvailable ? "text-primary/80" : "text-red-400/80"}`}>
                        {siteConfig.availability.isAvailable ? siteConfig.availability.message : siteConfig.availability.unavailableMessage}
                    </span>
                </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
                <TerminalWindow path="~/about/whoami.sh">
                    <TerminalBody command="neofetch --about" data={personalInfo} />
                </TerminalWindow>
                <TerminalWindow path="~/about/system_info.sh">
                    <TerminalBody command="neofetch --my-painful-specs" data={systemSpecs} />
                </TerminalWindow>
            </div>
        </section>
    );
}
