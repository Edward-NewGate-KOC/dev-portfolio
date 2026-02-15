"use client";

import Link from "next/link";
import { PageWrapper } from "@/components/visuals/PageWrapper";
import { AlertCircle, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <PageWrapper>
            <main className="container mx-auto min-h-screen px-6 py-24 pb-32 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full"
                >
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm p-8 space-y-6">
                        <div className="flex items-center justify-center gap-3 text-red-500 mb-6">
                            <AlertCircle className="h-12 w-12" />
                            <h1 className="text-4xl font-bold tracking-tighter">404_NOT_FOUND</h1>
                        </div>

                        <div className="font-mono text-left bg-black/50 p-6 rounded-lg border border-red-500/10 text-sm space-y-2 overflow-hidden shadow-inner">
                            <div className="text-red-400">Error: Resource location not found.</div>
                            <div className="text-neutral-500">at /srv/http/portfolio/src/router.rs:404</div>
                            <div className="text-neutral-500">at NetworkRequest.handle (core/net.rs:120)</div>
                            <div className="text-neutral-500 pl-4">-- Stack trace --</div>
                            <div className="text-neutral-600 pl-4">0x00A1: Page lookup failed</div>
                            <div className="text-neutral-600 pl-4">0x00B2: Route mismatch exception</div>
                            <div className="text-primary/60 mt-4 flash">$ _<span className="animate-pulse">|</span></div>
                        </div>

                        <p className="text-neutral-400 font-mono text-sm max-w-md mx-auto">
                            The requested signal was lost in the void. Check your coordinates or return to base.
                        </p>

                        <div className="pt-4 flex justify-center gap-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-sm hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 group"
                            >
                                <Home className="h-4 w-4" />
                                Return Home
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </main>
        </PageWrapper>
    );
}
