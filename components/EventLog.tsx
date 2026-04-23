"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ScrollText } from "lucide-react";
import { LogEntry } from "@/lib/types";

const kindColor: Record<LogEntry["kind"], string> = {
  info: "text-white/70",
  success: "text-matrix",
  danger: "text-cyber-red",
  warn: "text-cyber-yellow",
  system: "text-cyber-cyan",
};

export default function EventLog({ log }: { log: LogEntry[] }) {
  return (
    <div className="panel panel-corner p-3 sm:p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <ScrollText className="w-3.5 h-3.5 text-matrix" />
        <span className="hud-label">REGISTRO · tail -f</span>
      </div>
      <div className="divider-neon mb-2" />
      <div className="flex-1 overflow-y-auto pr-1 min-h-[100px] max-h-[240px] font-mono text-xs space-y-1">
        <AnimatePresence initial={false}>
          {log.length === 0 && (
            <div className="text-white/30 text-[11px] italic">
              Nenhum evento. Escolha uma ação.
            </div>
          )}
          {log.slice(0, 40).map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`${kindColor[entry.kind]} leading-relaxed`}
            >
              {entry.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
