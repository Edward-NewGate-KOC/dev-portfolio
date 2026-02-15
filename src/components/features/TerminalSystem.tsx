"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { siteConfig } from "@/lib/config";
import { Terminal as TerminalIcon, ShieldAlert, Lock, AlertTriangle, Monitor, Cpu } from "lucide-react";
import { commands, createError } from "@/lib/terminal/commands";
import { CommandHistoryItem } from "@/lib/terminal/types";
import { cn } from "@/lib/utils";

export function TerminalSystem() {
    const [history, setHistory] = useState<CommandHistoryItem[]>([]);
    const [input, setInput] = useState("");
    const [directory, setDirectory] = useState("~");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isTerminating, setIsTerminating] = useState(false);


    const [isBooting, setIsBooting] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const bootSequence = async () => {
            await new Promise(r => setTimeout(r, 800));
            setHistory([{
                command: "init",
                output: (
                    <div className="mb-6 space-y-4 font-mono">
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <div className="text-yellow-500 font-bold text-sm tracking-wide">GUEST SESSION ACTIVE</div>
                                <div className="text-yellow-500/80 text-xs leading-relaxed">
                                    You are logged in as <span className="text-white font-bold">guest</span>.
                                    Root privileges are restricted. System integrity protection is <span className="text-red-500 font-bold">DISABLED</span>.
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-500 delay-100">
                            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                                <TerminalIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <div className="text-primary font-bold text-xl tracking-tight">
                                    {siteConfig.name.toUpperCase()} OS v{siteConfig.version}
                                </div>
                                <div className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                                    Kernel 6.17.0-14-generic // Built for Performance
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-lg space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                            <div className="text-neutral-400 text-sm">
                                Welcome to the interactive terminal. Access to core projects and sensitive data is monitored.
                            </div>
                            <div className="text-neutral-500 text-xs">
                                Type <span className="text-primary font-bold px-1.5 py-0.5 bg-primary/10 rounded cursor-pointer hover:bg-primary/20 transition-colors" onClick={() => setInput("help")}>help</span> to see available commands.
                            </div>
                        </div>
                    </div>
                ),
                dir: "~",
                timestamp: new Date()
            }]);
            setIsBooting(false);
        };
        bootSequence();
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history, input]);

    const handleCommand = async (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        setCommandHistory(prev => [trimmed, ...prev].slice(0, 50));
        setHistoryIndex(-1);

        const [func, ...args] = trimmed.split(" ");
        let output: React.ReactNode | string = "";

        const command = commands.find(c => c.name === func);

        if (command) {
            try {
                const result = await command.execute(args, {
                    setDirectory,
                    history,
                    setHistory: (newHistory: CommandHistoryItem[]) => setHistory(newHistory),
                    directory,
                    clear: () => setHistory([]),
                    exit: () => {
                        setIsTerminating(true);
                        setTimeout(() => router.push("/"), 1000);
                    },
                    pushToHistory: (item: CommandHistoryItem) => setHistory(prev => [...prev, item]),
                    username: "guest"
                } as any);
                output = result as any;
            } catch (error) {
                output = (
                    <div className="text-red-500 font-bold bg-red-500/10 p-2 rounded border border-red-500/20">
                        Error executing {func}: {String(error)}
                    </div>
                );
            }
        } else {
            output = (
                createError(`command not found: ${func}`)
            );
        }

        if (func === "clear") return;

        setHistory(prev => [...prev, {
            command: cmd,
            output,
            dir: directory,
            timestamp: new Date()
        }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const nextIndex = historyIndex + 1;
            if (nextIndex < commandHistory.length) {
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = historyIndex - 1;
            if (nextIndex >= 0) {
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const currentInput = input.trim();
            if (!currentInput) return;

            const matchingCmds = commands
                .filter(c => c.name.startsWith(currentInput))
                .map(c => c.name);

            if (matchingCmds.length === 1) {
                setInput(matchingCmds[0]);
            }
        }
    };

    return (
        <TerminalWindow
            path={directory}
            className="w-full h-full shadow-[0_0_100px_-20px_rgba(34,197,94,0.15)] flex flex-col relative overflow-hidden bg-black/40 backdrop-blur-xl border-neutral-800/50"
        >
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#000 50%, transparent 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))",
                    backgroundSize: "100% 4px, 6px 100%"
                }}
            />

            {/* CRT Glow */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-[4]" />

            <div
                ref={containerRef}
                className="flex-1 p-4 md:p-6 font-mono text-sm md:text-base leading-relaxed overflow-y-auto selection:bg-primary/30 selection:text-white z-10"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="max-w-4xl mx-auto space-y-4">
                    {history.map((item, i) => (
                        <div key={i} className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-300">
                            {item.command !== "init" && (
                                <div className="flex items-center gap-3 text-neutral-500 text-xs md:text-sm">
                                    <span className="text-primary font-bold">➜</span>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800">
                                        <Lock className="h-3 w-3 text-neutral-600" />
                                        <span className="text-blue-400 font-bold tracking-tight">
                                            {item.dir === "~" ? "~" : item.dir.replace("~", "/home/guest")}
                                        </span>
                                    </div>
                                    <span className="text-white font-bold tracking-wide">{item.command}</span>
                                    <span className="ml-auto text-[10px] text-neutral-700 font-mono opacity-50">
                                        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </span>
                                </div>
                            )}
                            <div className={cn(
                                "text-neutral-300 group transition-all duration-300",
                                item.command === "init" ? "" : "pl-6 border-l-2 border-primary/5 ml-2 hover:border-primary/20 hover:bg-white/[0.01]"
                            )}>
                                {item.output}
                            </div>
                        </div>
                    ))}

                    {!isBooting && !isTerminating && (
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-primary font-bold animate-pulse">➜</span>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 transition-colors hover:border-primary/30">
                                <Lock className="h-3 w-3 text-neutral-600" />
                                <span className="text-blue-400 font-bold tracking-tight">
                                    {directory === "~" ? "~" : directory.replace("~", "/home/guest")}
                                </span>
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    className="w-full bg-transparent outline-none text-white placeholder-neutral-800 caret-primary font-bold tracking-wide"
                                    spellCheck={false}
                                    autoComplete="off"
                                    aria-autocomplete="none"
                                />
                            </div>
                        </div>
                    )}

                    {isTerminating && (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in duration-500">
                            <div className="h-2 w-2 bg-red-500 rounded-full animate-ping" />
                            <div className="text-red-500 font-bold text-lg tracking-widest uppercase">
                                System Halted
                            </div>
                            <div className="text-neutral-500 text-xs font-mono">
                                Cleaning up temporary files...
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-7 bg-black/60 border-t border-neutral-800 backdrop-blur-md flex items-center justify-between px-4 text-[10px] text-neutral-500 font-mono z-20 select-none">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        ONLINE
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-help">
                        <Monitor className="h-3 w-3" />
                        DISPLAY: :0
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-help">
                        <Cpu className="h-3 w-3" />
                        CPU: {Math.floor(Math.random() * 15) + 5}%
                    </span>
                </div>
                <div className="flex gap-4 uppercase tracking-widest">
                    <span className="text-yellow-500/80 font-bold">GUEST SESSION</span>
                    <span className="hidden sm:inline">UTF-8</span>
                </div>
            </div>
        </TerminalWindow>
    );
}
