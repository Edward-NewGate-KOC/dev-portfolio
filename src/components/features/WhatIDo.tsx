import { motion } from "framer-motion";
import { services } from "@/lib/config";

export function WhatIDo() {
    return (
        <section className="container mx-auto px-6 py-20">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-3xl font-bold tracking-tight text-white"
            >
                &lt;What.I.Do /&gt;
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-12 text-neutral-400 font-mono text-sm"
            >
                Core capabilities & areas of expertise.
            </motion.p>

            <div className="grid gap-6 md:grid-cols-2">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6 h-full transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(142,76%,50%,0.1)]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                    <service.icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/50">
                                <span className="text-primary/60 text-xs font-mono">$</span>
                                <span className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors">
                                    {service.command}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
