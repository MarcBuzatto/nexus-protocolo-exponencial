"use client";

import { motion } from "framer-motion";
import { Trophy, Skull, RotateCcw, Share2, CheckCircle2 } from "lucide-react";
import GlitchText from "./ui/GlitchText";
import { GameState } from "@/lib/types";
import { computeScore, rank } from "@/lib/gameLogic";

export default function EndScreen({
  state,
  onRestart,
}: {
  state: GameState;
  onRestart: () => void;
}) {
  const win = state.phase === "victory";
  const score = computeScore(state);
  const title = win ? "REDE SEGURA" : "REDE COMPROMETIDA";
  const subtitle = win
    ? "REAPER neutralizado. Kill-switch executado."
    : "O vírus dominou o perímetro.";

  const color = win ? "#00ff88" : "#ff0844";

  const stats = [
    { label: "TURNOS USADOS", value: String(state.turn) },
    { label: "INFECÇÃO FINAL", value: state.infection.toLocaleString("pt-BR") },
    { label: "FIREWALL", value: String(state.firewall) },
    { label: "STREAK QUANTUM", value: `x${state.streak}` },
    { label: "DANO PG TOTAL", value: String(state.quantumDamage) },
    { label: "PISTAS", value: `${state.clues}/3` },
  ];

  const share = async () => {
    const text = `NEXUS // PROTOCOLO EXPONENCIAL
${win ? "✔ REAPER NEUTRALIZADO" : "✘ REDE COMPROMETIDA"}
Score: ${score}  ·  Rank: ${rank(score)}
Turnos: ${state.turn}  ·  Quantum: x${state.streak}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "NEXUS — Protocolo Exponencial", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${color}20, transparent 70%)`,
        }}
      />
      <div className="w-full max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 mb-6 mx-auto"
          style={{
            borderColor: color,
            boxShadow: `0 0 30px ${color}, 0 0 60px ${color}40`,
          }}
        >
          {win ? (
            <Trophy className="w-9 h-9 text-matrix" />
          ) : (
            <Skull className="w-9 h-9 text-cyber-red" />
          )}
        </motion.div>

        <div className="font-display text-[10px] tracking-[0.5em] mb-2" style={{ color }}>
          {win ? "VITÓRIA" : "DERROTA"}
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-black tracking-wider mb-2">
          <GlitchText className="text-white" active={!win}>
            {title}
          </GlitchText>
        </h2>
        <p className="text-white/70 text-sm mb-8">{subtitle}</p>

        {/* Score panel */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="panel panel-corner p-5 sm:p-6 mb-5"
          style={{ boxShadow: `0 0 0 1px ${color}30, 0 0 60px ${color}20` }}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="text-left">
              <div className="hud-label">SCORE FINAL</div>
              <div
                className="font-display text-4xl sm:text-5xl font-black tabular-nums"
                style={{ color }}
              >
                {score.toLocaleString("pt-BR")}
              </div>
            </div>
            <div className="text-right">
              <div className="hud-label">RANK</div>
              <div className="text-sm sm:text-base font-bold tracking-widest text-white">
                {rank(score)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="text-left">
                <div className="hud-label mb-0.5">{s.label}</div>
                <div className="font-mono font-bold text-white tabular-nums">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {win && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-5 pt-4 border-t border-matrix/20 flex items-center gap-2 text-matrix text-xs tracking-widest"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              KILL-SWITCH EXECUTADO · BOSS NEUTRALIZADO
            </motion.div>
          )}
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            className="btn-hack border-matrix text-matrix hover:bg-matrix/10 shadow-neon-green flex-1 flex items-center justify-center gap-2 py-3.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-bold tracking-[0.2em]">JOGAR NOVAMENTE</span>
          </button>
          <button
            onClick={share}
            className="btn-hack border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 shadow-neon-cyan flex items-center justify-center gap-2 py-3.5 px-5"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-bold tracking-[0.2em]">COMPARTILHAR</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
