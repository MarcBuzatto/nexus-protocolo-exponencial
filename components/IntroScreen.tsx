"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Shield, Activity, Zap, HelpCircle } from "lucide-react";
import GlitchText from "./ui/GlitchText";

const BOOT_LINES = [
  "[OK] Inicializando kernel NEXUS v4.7.2...",
  "[OK] Descriptografando shards AES-256...",
  "[OK] Conectando malha quantum-safe...",
  "[!!] Anomalia detectada no segmento 0xREAPER",
  "[OK] Carregando protocolo exponencial...",
  "[OK] Canais seguros estabelecidos",
];

export default function IntroScreen({
  onStart,
  onHelp,
}: {
  onStart: () => void;
  onHelp: () => void;
}) {
  const [step, setStep] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (step < BOOT_LINES.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowCTA(true), 400);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <motion.div
      className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-3xl">
        {/* Top status bar */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-matrix/70 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
            <span>secure · tor · out</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>latência 12ms</span>
            <span>uplink 1.2 gb/s</span>
            <span className="text-cyber-cyan">nx//core</span>
          </div>
        </div>

        {/* Logo block */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-matrix/60" />
            <span className="text-[10px] tracking-[0.5em] text-matrix/70 font-mono">
              PROJETO NEXUS
            </span>
            <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-matrix/60" />
          </div>

          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.05em] leading-none mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <GlitchText className="text-white">
              NEXUS
            </GlitchText>
          </h1>

          <p className="font-display text-base sm:text-xl text-matrix tracking-[0.4em] font-semibold text-glow">
            PROTOCOLO EXPONENCIAL
          </p>
          <p className="mt-3 text-sm text-white/50 max-w-lg mx-auto tracking-wide">
            O vírus <span className="text-cyber-red font-bold">REAPER</span> dobra a cada turno.
            Você tem até o servidor <span className="text-cyber-cyan font-bold">1024</span> antes da rede cair.
          </p>
        </motion.div>

        {/* Terminal boot */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="panel panel-corner p-5 sm:p-6 font-mono text-xs sm:text-sm mb-6"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-matrix/15">
            <Terminal className="w-3.5 h-3.5 text-matrix" />
            <span className="text-matrix/80 tracking-widest text-[10px]">
              boot.log · /var/log/nexus
            </span>
            <div className="ml-auto flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-red/70" />
              <span className="w-2 h-2 rounded-full bg-cyber-yellow/70" />
              <span className="w-2 h-2 rounded-full bg-matrix/70" />
            </div>
          </div>
          <div className="pt-4 space-y-1.5 min-h-[180px]">
            {BOOT_LINES.slice(0, step).map((line, i) => {
              const ok = line.startsWith("[OK]");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <span
                    className={`shrink-0 ${ok ? "text-matrix" : "text-cyber-red"}`}
                  >
                    {ok ? "✓" : "!"}
                  </span>
                  <span className="text-white/80">{line}</span>
                </motion.div>
              );
            })}
            {step >= BOOT_LINES.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-2 flex items-center gap-2 text-matrix"
              >
                <span>$</span>
                <span className="terminal-cursor">aguardando operador</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Cards com feats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { icon: Shield, label: "FIREWALL", hint: "PA" },
            { icon: Activity, label: "ANÁLISE", hint: "LOG" },
            { icon: Zap, label: "QUANTUM", hint: "PG" },
          ].map((f) => (
            <div
              key={f.label}
              className="panel px-3 py-3 flex items-center gap-3"
            >
              <f.icon className="w-4 h-4 text-matrix" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-matrix/60 tracking-widest">
                  {f.hint}
                </div>
                <div className="text-xs text-white tracking-wider">
                  {f.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch gap-3"
            >
              <button
                onClick={onStart}
                className="btn-hack border-matrix text-matrix hover:bg-matrix/10 flex-1 flex items-center justify-center gap-3 py-4 group shadow-neon-green"
              >
                <span className="font-bold tracking-[0.3em]">INICIAR PROTOCOLO</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onHelp}
                className="btn-hack border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 flex items-center justify-center gap-2 py-4 px-5 sm:w-52 shadow-neon-cyan"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="font-bold tracking-[0.2em]">COMO JOGAR</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 pt-6 border-t border-white/5 text-[10px] text-white/30 flex flex-wrap gap-x-6 gap-y-1 justify-center tracking-widest"
        >
          <span>MARC CORREA BUZATTO</span>
          <span>JOÃO PEDRO SANDI</span>
          <span>BRUNO NEIVA PUNTONI</span>
          <span>GIOVANNE SILVA</span>
          <span className="text-matrix/50">SENAC LAPA · IA · 2º ANO</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
