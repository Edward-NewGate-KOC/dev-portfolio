"use client";

import { motion } from "framer-motion";

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: "blur(4px)",
    },
};

export function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
