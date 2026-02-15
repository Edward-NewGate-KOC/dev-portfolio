"use client";

import { Contact } from "@/components/features/Contact";
import { PageWrapper } from "@/components/visuals/PageWrapper";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <PageWrapper>
            <main className="container mx-auto min-h-screen px-6 py-24 pb-32">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-2 text-4xl font-bold tracking-tight text-white"
                >
                    &lt;Contact /&gt;
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 text-neutral-400 font-mono text-sm"
                >
                    Open a channel. Signal strength: optimal.
                </motion.p>
                <Contact />
            </main>
        </PageWrapper>
    );
}
