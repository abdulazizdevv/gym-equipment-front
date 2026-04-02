"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type IconButtonVariant = "ghost" | "glass";
type IconButtonSize = "sm" | "md";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

const base =
  "inline-flex items-center justify-center transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary/25";

const variants: Record<IconButtonVariant, string> = {
  ghost: "text-muted-foreground hover:text-foreground",
  glass: "glass text-foreground hover:bg-destructive/20",
};

const sizes: Record<IconButtonSize, string> = {
  sm: "h-8 w-8 rounded-full",
  md: "h-10 w-10 rounded-xl",
};

export function IconButton({ icon, className, variant = "ghost", size = "md", type = "button", ...props }: IconButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {icon}
    </button>
  );
}

