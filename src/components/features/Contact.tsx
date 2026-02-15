"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, Terminal, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { siteConfig } from "@/lib/config";
import { useState } from "react";

const socialLinks = siteConfig.socials;

export function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("error");
        }
    };

    return (
        <div className="grid gap-12 md:grid-cols-2">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
            >
                <div className="space-y-4">
                    <p className="text-lg text-neutral-300 leading-relaxed">
                        Interested in building softwares together?
                        Drop a signal. Encryption optional.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-mono">
                        <div className={`h-2 w-2 rounded-full animate-pulse ${siteConfig.availability.isAvailable ? "bg-primary" : "bg-red-500"}`} />
                        <span className={siteConfig.availability.isAvailable ? "text-primary/80" : "text-red-400/80"}>
                            {siteConfig.availability.isAvailable ? siteConfig.availability.message : siteConfig.availability.unavailableMessage}
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={`flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 transition-all duration-300 group ${social.color}`}
                        >
                            <div className="flex items-center gap-3">
                                <social.icon className="h-5 w-5" />
                                <span className="font-mono text-sm">{social.name}</span>
                            </div>
                            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </motion.a>
                    ))}
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-neutral-800/50">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="text-sm font-mono text-neutral-400">
                        echo &quot;hello&quot; | mail {siteConfig.email}
                    </span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <TerminalWindow path="~/contact/compose_message.sh">
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-6 h-[400px] flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <CheckCircle className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Signal Transmitted</h3>
                                        <p className="text-sm text-neutral-400 mt-2 max-w-[200px] mx-auto">
                                            Your message has been encrypted and sent successfully.
                                        </p>
                                    </div>
                                    <div className="text-xs font-mono text-neutral-500 mt-8">
                                        $ echo $STATUS
                                        <br />
                                        <span className="text-primary">SENT_OK_200</span>
                                    </div>
                                </motion.div>
                            ) : status === "error" ? (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-6 h-[400px] flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                        <CheckCircle className="h-8 w-8 text-red-500 rotate-180" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Transmission Failed</h3>
                                        <p className="text-sm text-neutral-400 mt-2 max-w-[200px] mx-auto">
                                            The signal were interrupted. Please try again or use direct mail.
                                        </p>
                                    </div>
                                    <div className="text-xs font-mono text-neutral-500 mt-8">
                                        $ echo $STATUS
                                        <br />
                                        <span className="text-red-500">ERROR_PULSE_LOST</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-6 space-y-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                                                Name
                                            </label>
                                            <input
                                                required
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full rounded-lg bg-neutral-950/80 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-mono"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                                                Email
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full rounded-lg bg-neutral-950/80 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-mono"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                                            Message
                                        </label>
                                        <textarea
                                            required
                                            placeholder="Your message..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            className="w-full rounded-lg bg-neutral-950/80 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none font-mono"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 p-3 rounded-md bg-black/40 border border-white/5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                        <div className="flex-1 font-mono text-[9px] text-neutral-500 truncate">
                                            HASH: <span className="text-primary/40">
                                                {`0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`}
                                            </span>
                                            {Math.random().toString(16).substring(10, 30).toUpperCase()}
                                        </div>
                                        <span className="text-[8px] font-mono text-primary/60 uppercase">sig_v2.0</span>
                                    </div>
                                    <button
                                        disabled={status === "loading"}
                                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary/90 px-6 py-3 text-sm font-bold text-black hover:bg-primary hover:shadow-[0_0_20px_-3px_hsl(142,76%,50%,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                        {status === "loading" ? "Transmitting..." : "Transmit Signal"}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </TerminalWindow>
            </motion.div>
        </div>
    );
}
