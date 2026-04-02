"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type LinkButtonVariant = "primary" | "outline" | "secondary";
type LinkButtonSize = "md" | "lg";

export type LinkButtonProps = {
  href: React.ComponentProps<typeof Link>["href"];
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  className?: string;
  children: React.ReactNode;
};

const linkBase =
  "font-display inline-flex items-center justify-center gap-2 rounded-xl transition-all touch-manipulation";

const linkVariants: Record<LinkButtonVariant, string> = {
  primary:
    "glow-primary bg-primary text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/25",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
  secondary:
    "bg-secondary text-foreground hover:bg-secondary/70 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
};

const linkSizes: Record<LinkButtonSize, string> = {
  md: "h-11 px-4 py-0 text-sm font-semibold",
  lg: "h-11 px-6 py-0 text-base font-semibold",
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={cn(linkBase, linkVariants[variant], linkSizes[size], className)}>
      {children}
    </Link>
  );
}

