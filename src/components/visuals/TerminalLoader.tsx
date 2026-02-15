"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

interface LogLine {
    content: string;
    type: "info" | "warn" | "error" | "success" | "op";
    delay: number;
}

const bootLines: LogLine[] = [
    { content: "Initializing system bootstrap v2.4.0...", type: "info", delay: 200 },
    { content: "Running kernel 6.17.0-14-generic...", type: "info", delay: 150 },
    { content: "ERROR: Root privileges not found.", type: "error", delay: 400 },
    { content: "Attempting kernel exploit for guest escalation...", type: "info", delay: 300 },
    { content: "Buffer overflow successful. Gaining SU status.", type: "success", delay: 200 },
    { content: "Mounting /dev/root and /sys/firmware...", type: "info", delay: 150 },
    { content: "WARNING: High ambition levels detected in local environment.", type: "warn", delay: 350 },
    { content: "Synchronizing Log Pose with Raftel coordinates...", type: "op", delay: 400 },
    { content: "Will of D. persistence layer: ACTIVE.", type: "error", delay: 200 },
    { content: "Initializing neural mesh networking...", type: "info", delay: 150 },
    { content: "Loading visual rendering buffers...", type: "info", delay: 100 },
    { content: "System optimization complete. Entropy level nominal.", type: "success", delay: 300 },
    { content: "Welcome, Guest", type: "info", delay: 500 },
];

interface TerminalLoaderProps {
    onComplete?: () => void;
}

export function TerminalLoader({ onComplete }: TerminalLoaderProps) {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [visible]);

    useEffect(() => {
        if (index < bootLines.length) {
            const timer = setTimeout(() => {
                setIndex(prev => prev + 1);
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, bootLines[index].delay);
            return () => clearTimeout(timer);
        } else {
            const exitTimer = setTimeout(() => {
                setVisible(false);
            }, 1200);
            return () => clearTimeout(exitTimer);
        }
    }, [index]);

    const getLineColor = (type: LogLine["type"]) => {
        switch (type) {
            case "error": return "text-red-500";
            case "warn": return "text-amber-500";
            case "success": return "text-emerald-500";
            case "op": return "text-primary italic font-bold";
            default: return "text-neutral-400";
        }
    };

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "circIn" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                >
                    <div className="w-full max-w-2xl px-6">
                        <TerminalWindow path="~/system/boot.sh" className="h-[400px] shadow-[0_0_80px_-20px_rgba(34,197,94,0.3)]">
                            <div
                                ref={containerRef}
                                className="p-6 font-mono text-xs overflow-y-auto h-[350px] scrollbar-hide space-y-1.5"
                            >
                                {bootLines.slice(0, index).map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex gap-3"
                                    >
                                        <span className="text-neutral-600 shrink-0">
                                            [{((i + 1) * 0.042).toFixed(3)}s]
                                        </span>
                                        <span className={getLineColor(line.type)}>
                                            {line.type === "op" ? "☠ " : "> "}{line.content}
                                        </span>
                                    </motion.div>
                                ))}
                                {index < bootLines.length && (
                                    <div className="flex gap-3">
                                        <span className="text-neutral-600">
                                            [{((index + 1) * 0.042).toFixed(3)}s]
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-neutral-400">_</span>
                                            <motion.div
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="h-3 w-1.5 bg-primary"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TerminalWindow>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 text-center"
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 animate-pulse">
                                Establishing Neural Link...
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
