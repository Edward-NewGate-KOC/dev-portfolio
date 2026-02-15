"use client";

import { motion } from "framer-motion";
import { Heart, Terminal, ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { usePathname } from "next/navigation";
import { useLoader } from "@/context/LoaderContext";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" },
];

const socialLinks = siteConfig.socials;

export function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();
    const { isInitialized } = useLoader();

    const isHome = pathname === "/";
    if (isHome && !isInitialized) {
        return null;
    }

    return (
        <footer className="relative border-t border-neutral-800/50 pb-20">
            <div className="container mx-auto px-6 py-16">
                <div className="grid gap-12 md:grid-cols-3 mb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Code2 className="h-5 w-5 text-primary" />
                            <span className="text-lg font-bold text-white">{siteConfig.name}</span>
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                            {siteConfig.bio}
                        </p>
                        <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full animate-pulse ${siteConfig.availability.isAvailable ? "bg-primary" : "bg-red-500"}`} />
                            <span className={`text-xs font-mono ${siteConfig.availability.isAvailable ? "text-primary/70" : "text-red-400/70"}`}>
                                {siteConfig.availability.isAvailable ? siteConfig.availability.message : siteConfig.availability.unavailableMessage}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Navigation</h3>
                        <div className="space-y-2">
                            {quickLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors group"
                                >
                                    <span className="text-primary/40 font-mono text-xs group-hover:text-primary/80 transition-colors">→</span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Connect</h3>
                        <div className="space-y-2">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    className="flex items-center gap-3 text-sm text-neutral-500 hover:text-primary transition-colors group"
                                >
                                    <social.icon className="h-4 w-4" />
                                    <span>{social.name}</span>
                                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="pt-8 border-t border-neutral-800/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm font-mono text-neutral-600">
                            <Terminal className="h-4 w-4 text-primary/40" />
                            <span>© {currentYear} {siteConfig.name}. Built with</span>
                            <Heart className="h-3 w-3 text-red-500/60 inline" />
                            <span>and lots of caffeine.</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-neutral-700 uppercase tracking-wider">
                                {siteConfig.version}
                            </span>
                            <div className="h-3 w-[1px] bg-neutral-800" />
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                All systems operational
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
