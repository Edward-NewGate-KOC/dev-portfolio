"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { philosophies } from "@/lib/config";

export function Philosophy() {
    return (
        <section className="container mx-auto px-6 py-20">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-3xl font-bold tracking-tight text-white"
            >
                &lt;Philosophy /&gt;
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-12 text-neutral-400 font-mono text-sm"
            >
                The principles that guide my work.
            </motion.p>

            <div className="grid gap-6 md:grid-cols-3">
                {philosophies.map((item, index) => {
                    const hexQuote = Array.from(item.quote.substring(0, 40))
                        .map(char => char.charCodeAt(0).toString(16).toUpperCase())
                        .join(' ');

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md p-6 group hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_-15px_hsl(142,76%,50%,0.2)]"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none p-4 overflow-hidden">
                                <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-[1px]" />
                                <div className="relative z-10 font-mono text-[9px] text-primary/40 space-y-2">
                                    <div className="border-b border-primary/20 pb-1 flex justify-between">
                                        <span>QUOTE_BUFFER_DUMP</span>
                                        <span className="animate-pulse">DECODING...</span>
                                    </div>
                                    <div className="leading-tight break-all opacity-60">
                                        {hexQuote}... [TRUNCATED]
                                    </div>
                                    <div className="pt-2 border-t border-primary/10 text-[8px] text-neutral-600">
                                        BYTES: {item.quote.length} | ADDR: 0x{((index + 1) * 0x400).toString(16).toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <Quote className="h-8 w-8 text-primary/10 mb-4 group-hover:text-primary/30 transition-colors duration-500 relative z-0" />
                            <p className="text-neutral-300 text-sm leading-relaxed mb-4 italic relative z-0">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-2 relative z-0">
                                <div className="h-[1px] w-6 bg-primary/40" />
                                <span className="text-[11px] font-mono text-neutral-500">
                                    {item.author}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
