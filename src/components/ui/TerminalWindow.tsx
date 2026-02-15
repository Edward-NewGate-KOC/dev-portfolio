"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface TerminalWindowProps {
    path: string;
    children: ReactNode;
    className?: string;
}

export function TerminalWindow({ path, children, className = "" }: TerminalWindowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm overflow-hidden ${className}`}
        >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900/80">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px] font-mono text-neutral-500">
                    {path}
                </span>
            </div>
            {children}
        </motion.div>
    );
}
