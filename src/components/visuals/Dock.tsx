"use client";

import { navLinks } from "@/lib/config";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export function Dock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-background/40 px-4 pb-3 backdrop-blur-md border border-white/10"
            >
                {navLinks.map((link) => (
                    <DockIcon key={link.name} mouseX={mouseX} href={link.href} icon={link.icon} name={link.name} />
                ))}
            </motion.div>
        </div>
    );
}

function DockIcon({
    mouseX,
    icon: Icon,
    href,
    name,
}: {
    mouseX: any;
    icon: any;
    href: string;
    name: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href}>
            <div
                className="relative flex flex-col items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, x: "-50%" }}
                            animate={{ opacity: 1, y: -25, x: "-50%" }}
                            exit={{ opacity: 0, y: -15, x: "-50%" }}
                            className="absolute left-1/2 -top-2 -translate-x-1/2 z-50 px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 whitespace-nowrap shadow-xl"
                        >
                            <div className="absolute -bottom-1 left-1/2 -ml-1 w-2 h-2 bg-neutral-900 border-r border-b border-neutral-800 rotate-45" />
                            <span className="relative z-10">{name}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    ref={ref}
                    style={{ width }}
                    className="aspect-square w-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center relative group"
                >
                    <Icon className="h-5 w-5 text-neutral-400 group-hover:text-primary transition-colors" />
                </motion.div>
            </div>
        </Link>
    );
}
