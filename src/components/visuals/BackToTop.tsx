"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setIsVisible(latest > 0.1);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_-3px_hsl(142,76%,50%,0.3)] transition-all duration-300"
                    aria-label="Back to top"
                >
                    <ArrowUp className="h-4 w-4" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
