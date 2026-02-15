"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MemoryStick } from "lucide-react";

export function SystemHeader() {
    const pathname = usePathname();

    const getOffset = (path: string) => {
        let hash = 0;
        for (let i = 0; i < path.length; i++) {
            hash = path.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `0x${Math.abs(hash).toString(16).toUpperCase().substring(0, 8)}`;
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-6 pointer-events-none">
            <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
                <MemoryStick className="h-3 w-3 text-neutral-500" />
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    Addr:
                </span>
                <motion.span
                    key={pathname}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-mono text-primary font-bold"
                >
                    {getOffset(pathname)}
                </motion.span>
                <span className="text-[10px] font-mono text-neutral-600">
                    &gt; {pathname === "/" ? "ROOT" : pathname.substring(1).toUpperCase()}
                </span>
            </div>

        </header>
    );
}
