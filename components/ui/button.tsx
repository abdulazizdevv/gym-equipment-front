"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "secondary";
type ButtonSize = "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const buttonBase =
  "font-display inline-flex items-center justify-center gap-2 rounded-xl transition-all touch-manipulation";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "glow-primary bg-primary text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/25",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
  secondary:
    "bg-secondary text-foreground hover:bg-secondary/70 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-4 py-2.5 text-sm font-semibold sm:h-11 sm:py-0",
  lg: "min-h-12 px-5 py-3 text-base font-semibold sm:h-12 sm:px-6 sm:py-0",
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

