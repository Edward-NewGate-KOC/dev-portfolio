"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoader } from "@/context/LoaderContext";

export function LogPose() {
    const { isInitialized } = useLoader();
    const { scrollYProgress } = useScroll();

    const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const springRotation = useSpring(rotation, { stiffness: 100, damping: 30 });
    const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isInitialized) return;
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, [isInitialized]);

    if (!isInitialized || !isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4"
        >
            <div className="relative group">
                <div className="h-20 w-1 bg-neutral-800/50 rounded-full relative overflow-hidden">
                    <motion.div
                        style={{ height: scrollHeight }}
                        className="absolute top-0 left-0 w-full bg-primary/40"
                    />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 -left-3 h-8 w-8 rounded-full bg-black/80 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl group-hover:border-primary/50 transition-colors">
                    <motion.div
                        style={{ rotate: springRotation }}
                        className="relative w-4 h-[1px] bg-primary group-hover:bg-primary"
                    >
                        <div className="absolute -left-1 -top-[1.5px] w-1 h-1 rounded-full bg-primary" />
                    </motion.div>

                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
            </div>

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </motion.div>
    );
}
