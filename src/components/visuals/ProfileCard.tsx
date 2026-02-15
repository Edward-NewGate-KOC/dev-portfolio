"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { siteConfig } from "@/lib/config";

export function ProfileCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }

    const rotateX = useTransform(mouseY, [-192, 192], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-144, 144], ["-17.5deg", "17.5deg"]);

    const rotateXSpring = useSpring(rotateX);
    const rotateYSpring = useSpring(rotateY);

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
            }}
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 group"
        >
            <div
                className={`absolute -inset-[1px] rounded-xl bg-gradient-to-br from-blue-500/20 via-transparent to-pink-500/20 opacity-0 transition-opacity duration-700 blur-sm ${isHovered ? "opacity-100" : ""
                    }`}
            />

            <div className="absolute inset-0 rounded-xl border border-white/5 group-hover:border-blue-500/20 transition-colors duration-500" />

            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 flex flex-col items-center pt-5 rounded-xl bg-neutral-900/50 shadow-lg backdrop-blur-sm border border-white/5"
            >
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 opacity-75 blur-sm animate-spin-slow"
                            style={{ animationDuration: "8s" }}
                        />
                        <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                            <Image
                                src={siteConfig.avatar}
                                alt={siteConfig.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            {siteConfig.name}
                        </h1>
                        <p className="text-xs font-mono text-primary/80">
                            &lt;Passionate Developer /&gt;
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <span className="px-2 py-1 rounded bg-secondary/10 text-secondary text-[10px] font-mono border border-secondary/20 hover:bg-secondary/20 transition-colors">
                            Rust
                        </span>
                        <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                            TypeScript
                        </span>
                        <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-400 text-[10px] font-mono border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
                            Java
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1">
                        <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${siteConfig.availability.isAvailable ? "bg-primary" : "bg-red-500"}`} />
                        <span className="text-[10px] font-mono text-neutral-500">
                            Online • {siteConfig.availability.isAvailable ? "Available" : "Busy"}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
