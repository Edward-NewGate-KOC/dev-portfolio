"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
    return (
        <div className="container mx-auto px-6">
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
            />
        </div>
    );
}
