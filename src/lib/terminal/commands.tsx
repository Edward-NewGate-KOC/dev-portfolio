import { TerminalCommand } from "./types";
import { projects, experience, skills, philosophies } from "@/lib/config";
import { siteConfig } from "@/lib/config";
import { User, MapPin, Mail, Monitor, Server, Terminal, Cpu, MemoryStick, ShieldAlert, Lock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fileSystem = {
    "~": {
        type: "dir",
        children: {
            "projects": { type: "dir", children: {} },
            "experience": { type: "dir", children: {} },
            "about.md": { type: "file", content: siteConfig.bio },
            "contact.txt": { type: "file", content: `Email: ${siteConfig.email}\nGitHub: ${siteConfig.githubUsername}` },
            "secret.txt": { type: "file", content: "ACCESS DENIED. ENCRYPTED CONTENT." },
        }
    },
    "~/projects": {
        type: "dir",
        children: projects.reduce((acc: any, p) => {
            acc[p.title.replace(/\s+/g, "_").toLowerCase() + ".repo"] = { type: "file", content: `Project: ${p.title}\nStatus: ${p.status}\nTech: ${p.tech.join(", ")}\n\n${p.description}` };
            return acc;
        }, {})
    },
    "~/experience": {
        type: "dir",
        children: experience.reduce((acc: any, e) => {
            acc[`${e.company.toLowerCase()}_log_${e.year.split(" ")[0]}.log`] = { type: "file", content: `Role: ${e.title} @ ${e.company}\nYear: ${e.year}\n\n${e.description}` };
            return acc;
        }, {})
    }
};

const personalInfo = [
    { icon: User, label: "Name", value: siteConfig.name },
    { icon: MapPin, label: "Location", value: siteConfig.location },
    ...siteConfig.personalTraits
];

export const createError = (message: string) => (
    <div className="flex items-center gap-2 text-red-500/80 italic py-1 group">
        <ShieldAlert className="h-4 w-4 group-hover:animate-pulse" />
        <span className="font-medium">{message}</span>
    </div>
);

export const commands: TerminalCommand[] = [
    {
        name: "help",
        description: "Display available commands",
        execute: () => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-2xl py-2">
                {commands.filter(c => !c.name.startsWith("sudo")).map((cmd) => (
                    <div key={cmd.name} className="flex justify-between border-b border-neutral-800/50 pb-1 group hover:border-primary/30 transition-colors">
                        <span className="text-primary font-bold group-hover:pl-1 transition-all">{cmd.name}</span>
                        <span className="text-neutral-500">{cmd.description}</span>
                    </div>
                ))}
            </div>
        ),
    },
    {
        name: "ls",
        description: "List directory contents",
        execute: (args, { directory }) => {
            const dir = fileSystem[directory as keyof typeof fileSystem];
            if (!dir || dir.type !== "dir") return createError(`cannot access '${directory}': No such file or directory`);

            return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                    {Object.entries(dir.children).map(([name, item]: [string, any]) => (
                        <div key={name} className={`flex items-center gap-2 font-bold ${item.type === "dir" ? "text-blue-400" : "text-neutral-400"}`}>
                            {item.type === "dir" ? (
                                <span className="h-2 w-2 bg-blue-400 rounded-full" />
                            ) : (
                                <span className="h-2 w-2 bg-neutral-600 rounded-full" />
                            )}
                            {name}{item.type === "dir" ? "/" : ""}
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        name: "cd",
        description: "Change directory",
        execute: (args, { directory, setDirectory }) => {
            const target = args[0];
            if (!target || target === "~") {
                setDirectory("~");
                return;
            }
            if (target === "..") {
                setDirectory("~");
                return;
            }

            const newPath = directory === "~" ? `~/${target.replace(/\/$/, "")}` : target;

            if (fileSystem[newPath as keyof typeof fileSystem]) {
                setDirectory(newPath);
            } else {
                return createError(`cd: no such directory: ${target}`);
            }
        }
    },
    {
        name: "cat",
        description: "Read file content",
        execute: (args, { directory }) => {
            const filename = args[0];
            if (!filename) return "usage: cat [file]";

            const dir = fileSystem[directory as keyof typeof fileSystem];
            if (!dir) return createError("System error");

            const file = dir.children[filename as keyof typeof dir.children];
            if (!file) return createError(`cat: ${filename}: No such file or directory`);
            if (file.type === "dir") return createError(`cat: ${filename}: Is a directory`);
            if (filename === "secret.txt") {
                return createError("Access Denied. Encrypted Content.");
            }

            return (
                <div className="whitespace-pre-wrap text-neutral-300 font-mono text-sm leading-relaxed p-2 border-l-2 border-primary/20 bg-primary/5">
                    {file.content}
                </div>
            );
        }
    },
    {
        name: "tree",
        description: "Visualize file structure",
        execute: () => (
            <div className="font-mono text-sm py-2 space-y-0.5">
                <div className="text-blue-400 font-bold">.</div>
                <div className="flex gap-2 text-blue-400 font-bold">├── <span className="text-blue-400">projects/</span></div>
                {projects.map((p, i) => (
                    <div key={i} className="flex gap-2 text-neutral-500 italic pl-4">
                        {i === projects.length - 1 ? "└── " : "├── "}{p.title.replace(/\s+/g, "_").toLowerCase()}.repo
                    </div>
                ))}
                <div className="flex gap-2 text-blue-400 font-bold">├── <span className="text-blue-400">experience/</span></div>
                {experience.map((e, i) => (
                    <div key={i} className="flex gap-2 text-neutral-500 italic pl-4">
                        {i === experience.length - 1 ? "└── " : "├── "}{e.company.toLowerCase()}_log.log
                    </div>
                ))}
                <div className="flex gap-2 text-neutral-400">├── about.md</div>
                <div className="flex gap-2 text-neutral-400">└── contact.txt</div>
            </div>
        )
    },
    {
        name: "skills",
        description: "Display competency matrix",
        execute: () => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-4">
                {skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="bg-neutral-900/40 border border-neutral-800/80 p-3 rounded-lg hover:border-primary/40 transition-colors group"
                    >
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-bold text-neutral-300 group-hover:text-primary transition-colors">{skill.name}</span>
                            <span className="text-[10px] text-neutral-600 group-hover:text-primary/70 transition-colors">{skill.mastery}%</span>
                        </div>
                        <div className="h-1 bg-neutral-800/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.mastery}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: i * 0.05 }}
                                className="h-full bg-gradient-to-r from-primary/50 to-primary"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        )
    },
    {
        name: "projects",
        description: "List active repositories",
        execute: () => (
            <div className="grid gap-4 py-4 md:grid-cols-2">
                {projects.map((p, i) => (
                    <div key={i} className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:border-primary/50 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-primary font-mono text-xs">{p.status === "active" ? "● RUNNING" : "○ ARCHIVED"}</span>
                            <span className="text-neutral-600 text-[10px] font-mono">{p.tech[0]}</span>
                        </div>
                        <h3 className="text-white font-bold mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                        <p className="text-neutral-400 text-xs line-clamp-2">{p.description}</p>
                    </div>
                ))}
            </div>
        )
    },
    {
        name: "socials",
        description: "List social media links",
        execute: () => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 max-w-xl">
                {siteConfig.socials.map((social, i) => (
                    <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                        <social.icon className="h-5 w-5 text-neutral-400 group-hover:text-primary transition-colors" />
                        <span className="text-neutral-300 group-hover:text-white font-bold">{social.name}</span>
                        <span className="ml-auto text-[10px] text-neutral-600 uppercase tracking-widest group-hover:text-primary/70 transition-colors">Follow ↗</span>
                    </motion.a>
                ))}
            </div>
        )
    },
    {
        name: "contact",
        description: "Show connection details",
        execute: () => (
            <div className="py-4 space-y-4">
                <div className="flex items-center gap-3 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl max-w-md">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <div className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest">Email Address</div>
                        <div className="text-white font-mono">{siteConfig.email}</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        name: "philosophy",
        description: "Show engineering principles",
        execute: () => {
            const random = philosophies[Math.floor(Math.random() * philosophies.length)];
            return (
                <div className="py-6 px-4 bg-primary/5 border-l-2 border-primary rounded-r-lg my-2">
                    <p className="text-primary italic text-lg leading-relaxed mb-3">"{random.quote}"</p>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">— {random.author}</p>
                </div>
            );
        }
    },
    {
        name: "whoami",
        description: "Print current user",
        execute: () => (
            <div className="text-primary font-bold">guest</div>
        )
    },
    {
        name: "date",
        description: "Show system time",
        execute: () => new Date().toString()
    },
    {
        name: "echo",
        description: "Print inputs",
        execute: (args) => args.join(" ")
    },
    {
        name: "cowsay",
        description: "Moo!",
        execute: (args) => {
            const msg = args.join(" ") || "Moo!";
            return (
                <div className="font-mono whitespace-pre text-neutral-300">
                    {` __________________
< ${msg} >
 ------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
                </div>
            );
        }
    },
    {
        name: "neofetch",
        description: "Display system information",
        execute: (args) => {
            if (args.includes("--about")) {
                return (
                    <div className="p-2 sm:p-4 font-mono text-sm space-y-2.5 max-w-xl">
                        <div className="text-primary/80 border-b border-primary/20 pb-2 mb-2 font-bold">
                           // - User Profile
                        </div>
                        <div className="space-y-1.5">
                            {personalInfo.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <item.icon className="h-3.5 w-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                                    <span className="text-neutral-500 w-24 shrink-0">{item.label}</span>
                                    <span className="text-neutral-300 group-hover:text-white transition-colors break-words text-left">: {item.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            }
            if (args.includes("--specs")) {
                return (
                    <div className="p-2 sm:p-4 font-mono text-sm space-y-2.5 max-w-xl">
                        <div className="text-primary/80 border-b border-primary/20 pb-2 mb-2 font-bold">
                           // HARDWARE_SPECS(5) - System Information
                        </div>
                        <div className="space-y-1.5">
                            {siteConfig.systemSpecs.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <item.icon className="h-3.5 w-3.5 text-secondary/60 group-hover:text-secondary transition-colors" />
                                    <span className="text-neutral-500 w-24 shrink-0">{item.label}</span>
                                    <span className="text-neutral-300 group-hover:text-white transition-colors">: {item.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            }
            return (
                <div className="flex flex-col sm:flex-row gap-8 py-4 px-2">
                    <div className="text-primary font-mono hidden sm:block leading-tight select-none opacity-80">
                        <pre className="text-[10px] md:text-xs font-bold">{`
         /\\
        /  \\
       / /\\ \\
      / /  \\ \\
     / /    \\ \\
    / /      \\ \\
   / /        \\ \\
  /_/          \\_\\
                  `}</pre>
                    </div>
                    <div className="space-y-1 font-mono text-sm">
                        <div className="flex gap-2">
                            <span className="text-primary font-bold">guest</span>
                            <span className="text-neutral-600">@</span>
                            <span className="text-primary font-bold">{siteConfig.githubUsername.toLowerCase()}</span>
                        </div>
                        <div className="h-px bg-neutral-800 w-full my-2" />
                        <div className="grid grid-cols-[80px_1fr] gap-x-2 text-xs">
                            <span className="text-secondary font-bold">OS</span><span className="text-neutral-300">WebOS v2.0</span>
                            <span className="text-secondary font-bold">Host</span><span className="text-neutral-300">Vercel Edge Network</span>
                            <span className="text-secondary font-bold">Kernel</span><span className="text-neutral-300">6.17.0-generic</span>
                            <span className="text-secondary font-bold">Uptime</span><span className="text-neutral-300">{Math.floor(performance.now() / 1000)}s</span>
                            <span className="text-secondary font-bold">Packages</span><span className="text-neutral-300">{projects.length} (dpkg)</span>
                            <span className="text-secondary font-bold">Shell</span><span className="text-neutral-300">React-TTY</span>
                            <span className="text-secondary font-bold">CPU</span><span className="text-neutral-300">Virtual x86_64</span>
                        </div>
                        <div className="pt-3 flex gap-1.5">
                            {["bg-black", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-white"].map((bg, i) => (
                                <div key={i} className={`${bg} h-3 w-3 rounded-sm`} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    },
    {
        name: "sudo",
        description: "Execute a command with root access",
        execute: () => (
            <div className="flex flex-col gap-2 p-2 bg-red-950/20 border border-red-500/30 rounded-lg animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-red-500 font-bold">
                    <ShieldAlert className="h-4 w-4" />
                    <span>ACCESS DENIED</span>
                </div>
                <div className="text-red-400 text-sm">
                    User is not in the sudoers file. This incident will be reported to the administrator.
                </div>
                <div className="text-xs text-red-500/50 font-mono mt-1">
                    IP: 192.168.1.{Math.floor(Math.random() * 255)} LOGGED
                </div>
            </div>
        )
    },
    {
        name: "reboot",
        description: "Restart system",
        execute: () => {
            window.location.reload();
            return (
                <div className="text-yellow-500 font-bold animate-pulse">
                    System reboot initiated...
                </div>
            );
        }
    },
    {
        name: "gui",
        description: "Return to graphical interface",
        execute: (args, { exit }) => {
            exit();
            return "Starting generic UI subsystem...";
        }
    },
    {
        name: "clear",
        description: "Clear terminal history",
        execute: (args, { clear }) => {
            clear();
            return "";
        }
    },
    {
        name: "rm",
        description: "Remove directory entries",
        execute: () => createError("write operations are locked by system administrator.")
    },
    {
        name: "mkdir",
        description: "Create directory",
        execute: () => createError("mkdir: cannot create directory: Read-only file system")
    },
    {
        name: "touch",
        description: "Update file timestamps",
        execute: () => createError("touch: cannot touch: Read-only file system")
    },
    {
        name: "chmod",
        description: "Change file mode bits",
        execute: () => createError("chmod: changing permissions: Operation not permitted")
    },
    {
        name: "chown",
        description: "Change file owner and group",
        execute: () => createError("chown: changing ownership: Operation not permitted")
    },
    {
        name: "exit",
        description: "Terminate session",
        execute: (args, { exit }) => {
            exit();
            return "Logging out...";
        }
    }
];
