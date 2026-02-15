"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { counters } from "@/lib/config";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [displayValue, setDisplayValue] = useState("0");
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const startTime = Date.now();

                    const step = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        const currentValue = Math.floor(eased * value);

                        if (progress < 0.95) {
                            const flicker = Math.random() > 0.5
                                ? currentValue.toString()
                                : Math.floor(Math.random() * value).toString(2).substring(0, 4);
                            setDisplayValue(flicker);
                        } else {
                            setDisplayValue(currentValue.toLocaleString());
                        }

                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={ref}>
            {displayValue}{suffix}
        </span>
    );
}

export function StatsCounter() {
    return (
        <section className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {counters.map((counter, index) => (
                    <motion.div
                        key={counter.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative p-6 rounded-lg border border-neutral-800 bg-neutral-900/40 backdrop-blur-md group hover:border-primary/40 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-2 h-[1px] bg-primary/40" />
                        <div className="absolute top-0 left-0 w-[1px] h-2 bg-primary/40" />

                        <div className="flex justify-between items-start mb-4">
                            <counter.icon className={`h-5 w-5 ${counter.color} opacity-60 group-hover:opacity-100 transition-all duration-300`} />
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-mono text-neutral-600 group-hover:text-primary/40 transition-colors uppercase tracking-[0.2em]">
                                    REG_0{index}X
                                </span>
                                <span className="text-[6px] font-mono text-neutral-700 uppercase tracking-widest group-hover:text-amber-500/60 transition-colors">
                                    {["CONQ_HAKI_V2", "OBSV_HAKI_MAX", "ARM_HAKI_KOUKA", "G5_PEAK_ST"][index] || "SYS_MOD"}
                                </span>
                            </div>
                        </div>

                        <div className={`text-2xl md:text-3xl font-bold font-mono ${counter.color} mb-2 tracking-tighter relative z-10`}>
                            <AnimatedCounter value={counter.value} suffix={counter.suffix} />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-violet-900/0 group-hover:from-violet-500/5 group-hover:to-violet-900/10 transition-all duration-700 pointer-events-none" />

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between relative z-10">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest group-hover:text-neutral-300 transition-colors">
                                {counter.label}
                            </span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? "bg-primary animate-pulse" : "bg-neutral-800"}`} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
