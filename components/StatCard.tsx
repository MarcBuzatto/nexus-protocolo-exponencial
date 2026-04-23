"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "matrix",
  pulse = false,
  progress,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  tone?: "matrix" | "red" | "cyan" | "purple" | "yellow";
  pulse?: boolean;
  progress?: number; // 0-100
}) {
  const toneMap = {
    matrix: "text-matrix shadow-neon-green border-matrix/30",
    red: "text-cyber-red shadow-neon-red border-cyber-red/30",
    cyan: "text-cyber-cyan shadow-neon-cyan border-cyber-cyan/30",
    purple: "text-cyber-purple shadow-neon-purple border-cyber-purple/30",
    yellow: "text-cyber-yellow border-cyber-yellow/30",
  };
  const barMap = {
    matrix: "bg-matrix",
    red: "bg-cyber-red",
    cyan: "bg-cyber-cyan",
    purple: "bg-cyber-purple",
    yellow: "bg-cyber-yellow",
  };

  return (
    <motion.div
      layout
      className={`panel panel-corner px-3 py-3 sm:px-4 sm:py-3.5 relative overflow-hidden ${
        pulse ? "animate-pulse-fast" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="hud-label">{label}</span>
        <Icon className={`w-3.5 h-3.5 ${toneMap[tone].split(" ")[0]}`} />
      </div>
      <div className="flex items-baseline gap-2">
        <motion.div
          key={String(value)}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className={`hud-value text-2xl sm:text-3xl ${toneMap[tone].split(" ")[0]}`}
        >
          {value}
        </motion.div>
        {sub && <span className="text-[10px] text-white/40 tracking-widest">{sub}</span>}
      </div>
      {typeof progress === "number" && (
        <div className="mt-2 h-0.5 w-full bg-white/5 overflow-hidden">
          <motion.div
            className={`h-full ${barMap[tone]}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}
    </motion.div>
  );
}
