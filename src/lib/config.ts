import {
    Github,
    Languages,
    Mail,
    LucideIcon,
    Calendar,
    Brain,
    Heart,
    Coffee,
    Monitor,
    Terminal,
    MemoryStick,
    Cpu,
    Home,
    Briefcase,
    Code,
    Smartphone,
    Server,
    Wrench,
    Zap,
    Code2,
    GitBranch,
    Clock
} from "lucide-react";

export interface SocialLink {
    name: string;
    href: string;
    icon: LucideIcon;
    color: string;
}

export interface NavLink {
    name: string;
    href: string;
    icon: LucideIcon;
}

export interface Skill {
    name: string;
    mastery: number;
    icon: string;
    category: string;
    description: string;
}

export interface Project {
    title: string;
    description: string;
    tech: string[];
    link: string;
    status: "active" | "completed" | "archived";
    progress?: number;
}

export interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    command: string;
}

export interface Experience {
    year: string;
    title: string;
    company: string;
    description: string;
    tech: string[];
}

export interface Philosophy {
    quote: string;
    author: string;
}

export interface Counter {
    label: string;
    value: number;
    suffix: string;
    color: string;
    icon: LucideIcon;
}

export interface SiteConfig {
    name: string;
    role: string;
    email: string;
    githubUsername: string;
    location: string;
    avatar: string;
    roles: string[];
    bio: string;
    longBio: string[];
    personalTraits: { label: string; value: string; icon: LucideIcon }[];
    metadata: {
        title: string;
        description: string;
    };
    socials: SocialLink[];
    systemSpecs: { label: string; value: string; icon: LucideIcon }[];
    availability: {
        isAvailable: boolean;
        message: string;
        unavailableMessage: string;
    };
    version: string;
}

const name = "Edward NewGate";
const githubUsername = "Edward-NewGate-KOC";
const email = "edward.newgate.rusty@gmail.com";

export const siteConfig: SiteConfig = {
    name,
    role: "Senior Low-Level Engineer",
    email,
    githubUsername,
    location: "Algeria",
    avatar: "https://avatars.githubusercontent.com/u/174376858?v=4",
    roles: [
        "Mobile Apps Developer",
        "Rust Enthusiast 🦀",
        "Open Source Contributor",
        "Runtime Optimization Nerd",
        "Data Structures & Algorithms Enthusiast"
    ],
    bio: "Building high-performance systems with clean architecture and obsessive attention to detail.",
    longBio: [
        "I build software with a performance-first mindset. Clean architecture, efficient data structures, and thoughtful design are at the core of everything I create.",
        "Outside of app development, I explore Rust and low-level concepts and obsess over runtime optimizations. I'm driven by the idea that great software should be both fast and elegant."
    ],
    personalTraits: [
        { label: "Languages", value: "Arabic: Native, English: C1, French: B1, Italian: B1", icon: Languages },
        { label: "Experience", value: "5+ Years", icon: Calendar },
        { label: "Mindset", value: "Performance-Driven, Architecturally Sound", icon: Brain },
        { label: "Passion", value: "Low-level Systems & Clean Architecture", icon: Heart },
        { label: "Fuel", value: "Coffee", icon: Coffee },
    ],
    metadata: {
        title: "Edward NewGate",
        description: "Portfolio of Edward NewGate",
    },
    socials: [
        {
            name: "GitHub",
            href: `https://github.com/${githubUsername}`,
            icon: Github,
            color: "hover:text-white hover:border-white hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]",
        },
        {
            name: "Email",
            href: `mailto:${email}`,
            icon: Mail,
            color: "hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_-3px_hsl(142,76%,50%,0.3)]",
        },
    ],
    systemSpecs: [
        { label: "OS / DE", value: "KDE neon / KDE Plasma 6.5.5", icon: Monitor },
        { label: "Shell", value: "fish 3.7.0", icon: Terminal },
        { label: "Memory", value: "8GB", icon: MemoryStick },
        { label: "CPU", value: "Intel i5-6300U @ 2.4GHz", icon: Cpu },
        { label: "Editors", value: "RustRover, Android Studio, VS Code + Neovim", icon: Terminal },
    ],
    availability: {
        isAvailable: true,
        message: "Available for new opportunities",
        unavailableMessage: "Not available at the moment"
    },
    version: "v1.0.0"
};

export const AVAILABLE_FOR_HIRE = siteConfig.availability.isAvailable;

export const navLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: Code },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Terminal", href: "/terminal", icon: Terminal },
    { name: "Contact", href: "/contact", icon: Mail },
];

export const skills: Skill[] = [
    {
        name: "Data Structures & Algorithms",
        mastery: 70,
        icon: "rust",
        category: "Computer Science concepts",
        description: "I know the basics and core concepts really well, from algorithm complexity and classic search methods to trees like binary and AVL with basic knowledge in graphs. I know most of the problem-solving techniques like Divide & Conquer, Dynamic Programming, Backtracking, and Sliding Window, I like using Rust to solve LeetCode problems."
    },
    {
        name: "Parallelism & Concurrency",
        mastery: 70,
        icon: "rust",
        category: "Computer Science concepts",
        description: "I understand how parallelism and concurrency actually work under the hood. I can build multi-threaded logic with memory safety (thanks to Rust)."
    },
    {
        name: "Java",
        mastery: 95,
        icon: "java",
        category: "Languages",
        description: "First language I learned; I know JVM inside-out and have been building Android apps with it for years."
    },
    {
        name: "Rust",
        mastery: 75,
        icon: "rust",
        category: "Languages",
        description: "I enjoy writing fast, memory-safe code and playing with low-level Rust features."
    },
    {
        name: "TypeScript",
        mastery: 70,
        icon: "ts",
        category: "Languages",
        description: "Use it for web apps; I like type safety and cleaner code compared to plain JS."
    },
    {
        name: "JavaScript",
        mastery: 70,
        icon: "js",
        category: "Languages",
        description: "Mostly for web apps alongside TypeScript, but I try to avoid messy JS whenever possible."
    },
    {
        name: "Kotlin",
        mastery: 20,
        icon: "kotlin",
        category: "Languages",
        description: "Occasionally for Android projects, but I mostly stick with Java."
    },
    {
        name: "Python",
        mastery: 5,
        icon: "py",
        category: "Languages",
        description: "I dropped learning it, cause I don't need it right now"
    },
    {
        name: "C++",
        mastery: 50,
        icon: "cpp",
        category: "Languages",
        description: "I touch it only when needed; prefer Rust for new projects."
    },
    {
        name: "HTML",
        mastery: 95,
        icon: "html",
        category: "Languages",
        description: "Semantic structure and accessibility are second nature."
    },
    {
        name: "CSS",
        mastery: 90,
        icon: "css",
        category: "Languages",
        description: "Mastery of modern CSS features, flexbox, grid, and animations."
    },
    {
        name: "XML",
        mastery: 90,
        icon: "androidstudio",
        category: "Languages",
        description: "Extensive experience with Android layouts and configuration files."
    },
    {
        name: "Android Apps Development",
        mastery: 95,
        icon: "androidstudio",
        category: "Frameworks & Components",
        description: "I build native apps with Java/XML, some Kotlin, and use Jetpack Compose when it fits."
    },
    {
        name: "Next.js",
        mastery: 85,
        icon: "nextjs",
        category: "Frameworks & Components",
        description: "I use it for all my web apps"
    },
    {
        name: "Tailwind CSS",
        mastery: 95,
        icon: "tailwind",
        category: "Frameworks & Components",
        description: "My go-to for styling"
    },
    {
        name: "Node.js",
        mastery: 85,
        icon: "nodejs",
        category: "Frameworks & Components",
        description: "Node.js is Node.js"
    },
    {
        name: "Git",
        mastery: 95,
        icon: "git",
        category: "Tools & Platforms",
        description: "Git is Git"
    },
    {
        name: "GitHub",
        mastery: 95,
        icon: "github",
        category: "Tools & Platforms",
        description: "GitHub is GitHub"
    },
    {
        name: "Linux",
        mastery: 90,
        icon: "linux",
        category: "Tools & Platforms",
        description: "The only OS I use, comfortable in the terminal and system-level stuff"
    },
    {
        name: "Firebase",
        mastery: 80,
        icon: "firebase",
        category: "Tools & Platforms",
        description: "Used it for most of my android apps"
    },
    {
        name: "Supabase",
        mastery: 20,
        icon: "supabase",
        category: "Tools & Platforms",
        description: "Started learning it recently"
    },
    {
        name: "Docker",
        mastery: 20,
        icon: "docker",
        category: "Tools & Platforms",
        description: "Just enough to run containers and test projects locally."
    },
    {
        name: "Smali",
        mastery: 90,
        icon: "java",
        category: "Reverse Engineering",
        description: "Really comfortable reading and editing Smali (Dalvik bytecode). Years of Android modding and patching APKs."
    },
    {
        name: "Frida",
        mastery: 80,
        icon: "linux",
        category: "Reverse Engineering",
        description: "Comfortable with most of Frida's features, hooking, monitoring, runtime instrumentation. My go-to for dynamic analysis on Android and native binaries."
    },
    {
        name: "Ghidra",
        mastery: 30,
        icon: "linux",
        category: "Reverse Engineering",
        description: "I know the basics, disassembly, decompiling, navigating binaries"
    },
    {
        name: "Assembly",
        mastery: 10,
        icon: "assembly",
        category: "Reverse Engineering",
        description: "I barely know the basics like registers, stack, calling conventions."
    },
];

export const stats = (githubUsername: string) => ({
    github: `https://edward-readme-stats.vercel.app/api?username=${githubUsername}&count_private=true&show_icons=true&theme=react&rank_icon=github&border_radius=10`,
    streak: `https://edward-koc-readme-streak-stats.vercel.app/?user=${githubUsername}&count_private=true&theme=react&border_radius=10`,
    langs: `https://edward-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&hide=HTML&langs_count=8&layout=compact&theme=react&border_radius=10&size_weight=0.5&count_weight=0.5&exclude_repo=github-readme-stats`
});

export const projects: Project[] = [
    {
        title: "Portfolio v2",
        description: "Redesigning this portfolio with new sections, animations, and interactive components. Focusing on performance and accessibility.",
        tech: ["Next.js", "Framer Motion", "Tailwind", "TypeScript"],
        link: "https://github.com/Edward-NewGate-KOC/dev-portfolio",
        status: "active" as const,
        progress: 80,
    },
    {
        title: "Dummy Project",
        description: "Dummy Project",
        tech: ["Rust", "C++", "Android NDK"],
        link: "https://github.com",
        status: "completed" as const,
    },
    {
        title: "Dummy Project 2",
        description: "Dummy Project 2",
        tech: ["TypeScript", "Three.js", "Next.js"],
        link: "https://github.com",
        status: "active" as const,
    },
    {
        title: "Dummy Project 3",
        description: "Dummy Project 3",
        tech: ["Go", "Cryptography", "Socket.io"],
        link: "https://github.com",
        status: "completed" as const,
    },
    {
        title: "Dummy Project 4",
        description: "Dummy Project 4",
        tech: ["C", "Shell", "Makefile"],
        link: "https://github.com",
        status: "archived" as const,
    },
];

export const services: Service[] = [
    {
        icon: Smartphone,
        title: "Mobile Applications",
        description: "Native Android apps with Java/Kotlin. Performance-optimized, clean architecture, and polished UX.",
        command: "./gradlew assembleRelease",
    },
    {
        icon: Server,
        title: "Systems Programming",
        description: "Low-level Rust & C++ for performance-critical softwares.",
        command: "cargo build --release --target x86_64",
    },
    {
        icon: Wrench,
        title: "Web Applications",
        description: "Full-stack web apps with Next.js and TypeScript. Server-rendered, type-safe, and lightning fast.",
        command: "next build && next start --port 3000",
    },
    {
        icon: Zap,
        title: "Performance Optimization",
        description: "Profiling, benchmarking, and squeezing every drop of performance from your existing codebase.",
        command: "samply record ./target/release/<program>",
    },
];

export const experience: Experience[] = [
    {
        year: "2021 - Present",
        title: "Self Learning",
        company: "None",
        description: "I started from zero and developed my skills independently, progressing through consistent practice and real-world experimentation.",
        tech: ["Rust", "Java", "TypeScript", "C++", "Linux", "And more..."],
    },
];

export const philosophies: Philosophy[] = [
    {
        quote: "Make it work, make it right, make it fast.",
        author: "Kent Beck",
    },
    {
        quote: "Premature optimization is the root of all evil, but so is premature abstraction.",
        author: "Personal motto",
    },
    {
        quote: "The best code is no code at all. The second best is code that's easy to delete.",
        author: "Engineering principle",
    },
];

export const counters: Counter[] = [
    { label: "Lines of Code", value: 250000, suffix: "+", color: "text-primary", icon: Code2 },
    { label: "Git Commits", value: 7000, suffix: "+", color: "text-blue-400", icon: GitBranch },
    { label: "Coffee & Coca Cola", value: 9999, suffix: "+", color: "text-amber-400", icon: Coffee },
    { label: "Years Coding", value: 5, suffix: "+", color: "text-purple-400", icon: Clock },
];
