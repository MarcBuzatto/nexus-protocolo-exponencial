"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

const FORMULAS = [
  { topic: "EXP", color: "#ff0844", items: ["aˣ · aʸ = aˣ⁺ʸ", "(aˣ)ʸ = aˣ·ʸ", "2¹⁰ = 1024"] },
  { topic: "LOG", color: "#00e5ff", items: ["log_a(b) = x ⇔ aˣ = b", "log(a·b) = log a + log b"] },
  { topic: "PA", color: "#00ff88", items: ["aₙ = a₁ + (n−1)·r", "Sₙ = (a₁+aₙ)·n/2"] },
  { topic: "PG", color: "#b347ff", items: ["aₙ = a₁ · qⁿ⁻¹", "Sₙ = a₁·(qⁿ−1)/(q−1)"] },
];

export default function FormulaReference() {
  const [open, setOpen] = useState(false);

  return (
    <div className="panel panel-corner overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-white/[0.02] transition"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-matrix" />
          <span className="hud-label">REFERÊNCIA RÁPIDA</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="w-3.5 h-3.5 text-white/50" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {FORMULAS.map((f) => (
                <div
                  key={f.topic}
                  className="p-2 border"
                  style={{ borderColor: f.color + "30" }}
                >
                  <div
                    className="text-[9px] tracking-[0.3em] font-bold mb-1"
                    style={{ color: f.color }}
                  >
                    {f.topic}
                  </div>
                  <div className="space-y-0.5">
                    {f.items.map((it) => (
                      <div
                        key={it}
                        className="font-mono text-[11px] text-white/75"
                      >
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
