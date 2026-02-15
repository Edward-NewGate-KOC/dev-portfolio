"use client";

import { motion } from "framer-motion";

function FloatingOrb({
    size,
    x,
    y,
    duration,
    delay,
    color
}: {
    size: number;
    x: string;
    y: string;
    duration: number;
    delay: number;
    color: string;
}) {
    return (
        <motion.div
            className="absolute rounded-full opacity-[0.07] blur-[80px]"
            style={{
                width: size,
                height: size,
                left: x,
                top: y,
                background: color,
            }}
            animate={{
                x: [0, 30, -20, 10, 0],
                y: [0, -40, 20, -10, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
        />
    );
}

export function Background() {
    return (
        <div className="fixed inset-0 -z-50 h-full w-full bg-background overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-secondary/20 opacity-20 blur-[100px]" />

            <FloatingOrb size={400} x="10%" y="20%" duration={20} delay={0} color="hsl(142, 76%, 50%)" />
            <FloatingOrb size={300} x="70%" y="60%" duration={25} delay={5} color="hsl(32, 95%, 50%)" />
            <FloatingOrb size={250} x="50%" y="10%" duration={18} delay={2} color="hsl(200, 80%, 50%)" />
            <FloatingOrb size={350} x="20%" y="70%" duration={22} delay={8} color="hsl(280, 60%, 50%)" />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] shadow-inner" />

            <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none z-0"
            />
        </div>
    );
}
