"use client";

import { ProfileCard } from "@/components/visuals/ProfileCard";
import { TypingAnimation } from "@/components/visuals/TypingAnimation";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function HomeHeader() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center pt-7 pb-20 px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8"
            >
                <ProfileCard />

                <div className="text-center space-y-4">
                    <motion.h1
                        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {siteConfig.name}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="h-8"
                    >
                        <TypingAnimation className="text-neutral-400 text-lg font-mono" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/90 text-black text-sm font-bold hover:bg-primary hover:shadow-[0_0_25px_-5px_hsl(142,76%,50%,0.5)] transition-all duration-300"
                        >
                            <Mail className="h-4 w-4" />
                            Get in Touch
                        </Link>
                        <Link
                            href="/projects"
                            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-700 text-neutral-300 text-sm font-mono hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_-5px_hsl(142,76%,50%,0.2)] transition-all duration-300"
                        >
                            <Download className="h-4 w-4" />
                            View Projects
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
