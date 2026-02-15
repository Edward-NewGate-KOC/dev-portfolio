"use client";

import { useState, useEffect } from "react";

import { siteConfig } from "@/lib/config";

const roles = siteConfig.roles;

interface TypingAnimationProps {
    className?: string;
}

export function TypingAnimation({ className }: TypingAnimationProps) {
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (charIndex < currentRole.length) {
                        setCharIndex((prev) => prev + 1);
                    } else {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    if (charIndex > 0) {
                        setCharIndex((prev) => prev - 1);
                    } else {
                        setIsDeleting(false);
                        setRoleIndex((prev) => (prev + 1) % roles.length);
                    }
                }
            },
            isDeleting ? 30 : 80
        );

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, roleIndex]);

    return (
        <span className={className}>
            {roles[roleIndex].slice(0, charIndex)}
            <span className="animate-pulse text-primary">|</span>
        </span>
    );
}
