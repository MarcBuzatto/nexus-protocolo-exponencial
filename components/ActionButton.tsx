"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type Tone = "matrix" | "cyan" | "purple" | "red";

const toneClasses: Record<
  Tone,
  { border: string; text: string; glow: string; bg: string; ring: string }
> = {
  matrix: {
    border: "border-matrix/60",
    text: "text-matrix",
    glow: "shadow-neon-green",
    bg: "hover:bg-matrix/10",
    ring: "ring-matrix",
  },
  cyan: {
    border: "border-cyber-cyan/60",
    text: "text-cyber-cyan",
    glow: "shadow-neon-cyan",
    bg: "hover:bg-cyber-cyan/10",
    ring: "ring-cyber-cyan",
  },
  purple: {
    border: "border-cyber-purple/60",
    text: "text-cyber-purple",
    glow: "shadow-neon-purple",
    bg: "hover:bg-cyber-purple/10",
    ring: "ring-cyber-purple",
  },
  red: {
    border: "border-cyber-red/60",
    text: "text-cyber-red",
    glow: "shadow-neon-red",
    bg: "hover:bg-cyber-red/10",
    ring: "ring-cyber-red",
  },
};

export default function ActionButton({
  label,
  sub,
  topic,
  icon: Icon,
  tone,
  onClick,
  disabled,
  hint,
  featured,
}: {
  label: string;
  sub: string;
  topic: string;
  icon: LucideIcon;
  tone: Tone;
  onClick: () => void;
  disabled?: boolean;
  hint?: string;
  featured?: boolean;
}) {
  const t = toneClasses[tone];
  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`btn-hack group w-full text-left flex items-center gap-3 ${t.border} ${t.text} ${t.bg} ${
        featured ? `${t.glow} animate-pulse-fast` : ""
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      <div
        className={`shrink-0 w-10 h-10 flex items-center justify-center border ${t.border} ${t.text} ${t.bg}`}
      >
        <Icon className="w-4.5 h-4.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-[0.2em]">{label}</span>
          <span className="chip text-white/60 border-white/10">{topic}</span>
        </div>
        <div className="text-[10px] text-white/50 tracking-widest mt-0.5 truncate">
          {sub}
        </div>
      </div>
      {hint && (
        <div className={`hidden sm:block text-[10px] tracking-widest opacity-70 ${t.text}`}>
          {hint}
        </div>
      )}
    </motion.button>
  );
}
