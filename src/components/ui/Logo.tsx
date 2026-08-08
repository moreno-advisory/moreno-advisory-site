import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
}

export default function Logo({ variant = "dark", className, showTagline = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/assets/logo-main.png"
        alt="Moreno Advisory - Founder-led B2B Advisory"
        width={200}
        height={80}
        className={cn(
          "object-contain w-auto",
          variant === "light" && "brightness-0 invert"
        )}
        priority
      />
      {showTagline && (
        <span
          className={cn(
            "text-xs tracking-widest uppercase font-medium hidden xl:block",
            variant === "light" ? "text-white/60" : "text-navy-400"
          )}
        >
          Founder-led B2B Advisory
        </span>
      )}
    </div>
  );
}
