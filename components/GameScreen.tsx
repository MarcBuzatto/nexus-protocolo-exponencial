"use client";

import { motion } from "framer-motion";
import {
  Biohazard,
  Shield,
  Cpu,
  Activity,
  Zap,
  Search,
  Wrench,
  Timer,
  Skull,
  Flame,
  RotateCcw,
  HelpCircle,
} from "lucide-react";
import { CONFIG, GameState } from "@/lib/types";
import { canLaunchBoss } from "@/lib/gameLogic";
import StatCard from "./StatCard";
import ActionButton from "./ActionButton";
import EventLog from "./EventLog";
import GameChart from "./GameChart";
import FormulaReference from "./FormulaReference";

export default function GameScreen({
  state,
  onAction,
  onBoss,
  onReset,
  onHelp,
}: {
  state: GameState;
  onAction: (a: "PATCH" | "INTEL" | "QUANTUM") => void;
  onBoss: () => void;
  onReset: () => void;
  onHelp: () => void;
}) {
  const bossReady = canLaunchBoss(state);
  const infectionPct = Math.min(
    100,
    (state.infection / CONFIG.INFECTION_LIMIT) * 100,
  );
  const turnsLeft = Math.max(0, CONFIG.MAX_TURNS - state.turn);
  const turnPct = (turnsLeft / CONFIG.MAX_TURNS) * 100;
  const cluesPct = (state.clues / CONFIG.CLUES_TO_BOSS) * 100;

  const nextQuantum = Math.pow(CONFIG.QUANTUM_BASE, state.streak + 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen px-3 sm:px-5 py-5 max-w-7xl mx-auto"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse shadow-neon-red" />
            <span className="text-[10px] tracking-[0.3em] text-cyber-red font-mono">
              LIVE · THREAT IO
            </span>
          </div>
        </div>
        <div className="font-display text-sm sm:text-lg tracking-[0.4em] text-matrix text-glow font-bold">
          NEXUS
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onHelp}
            className="chip hover:border-cyber-cyan/60 hover:text-cyber-cyan transition"
            title="Como jogar"
          >
            <HelpCircle className="w-3 h-3" />
            <span className="hidden sm:inline">AJUDA</span>
          </button>
          <button
            onClick={onReset}
            className="chip hover:border-cyber-red/50 hover:text-cyber-red transition"
            title="Reiniciar"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <StatCard
          label="INFECÇÃO"
          value={state.infection.toLocaleString("pt-BR")}
          sub={`/ ${CONFIG.INFECTION_LIMIT}`}
          icon={Biohazard}
          tone="red"
          pulse={infectionPct > 75}
          progress={infectionPct}
        />
        <StatCard
          label="TURNOS"
          value={`${state.turn}/${CONFIG.MAX_TURNS}`}
          sub={`${turnsLeft} restam`}
          icon={Timer}
          tone={turnsLeft < 4 ? "red" : "cyan"}
          progress={turnPct}
        />
        <StatCard
          label="FIREWALL"
          value={state.firewall}
          sub="PA · a₁+r·(n-1)"
          icon={Shield}
          tone="matrix"
        />
        <StatCard
          label="QUANTUM"
          value={`x${state.streak}`}
          sub={`próx. 2^${state.streak + 1} = ${nextQuantum}`}
          icon={Zap}
          tone="purple"
        />
      </div>

      {/* Formula reference (collapsible) */}
      <div className="mb-3">
        <FormulaReference />
      </div>

      {/* Chart + right column */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        <div className="lg:col-span-3 min-h-[300px]">
          <GameChart history={state.history} currentTurn={state.turn} />
        </div>
        <div className="lg:col-span-2">
          <EventLog log={state.log} />
        </div>
      </div>

      {/* Actions */}
      <div className="panel panel-corner p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-matrix" />
            <span className="hud-label">CONSOLE DE OPERAÇÕES</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: CONFIG.CLUES_TO_BOSS }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-3 ${
                    i < state.clues
                      ? "bg-cyber-cyan shadow-neon-cyan"
                      : "bg-white/10"
                  } transition-all`}
                />
              ))}
            </div>
            <span className="text-[10px] text-white/60 tracking-widest">
              PISTAS {state.clues}/{CONFIG.CLUES_TO_BOSS}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <ActionButton
            label="PATCH"
            sub="divide infecção por 2"
            topic="EXP"
            icon={Wrench}
            tone="red"
            onClick={() => onAction("PATCH")}
            disabled={state.phase !== "playing"}
            hint="F1"
          />
          <ActionButton
            label="INTEL"
            sub="coleta 1 pista do REAPER"
            topic="LOG"
            icon={Search}
            tone="cyan"
            onClick={() => onAction("INTEL")}
            disabled={state.phase !== "playing" || state.clues >= CONFIG.CLUES_TO_BOSS}
            hint="F2"
          />
          <ActionButton
            label="QUANTUM"
            sub={`dano 2^${state.streak + 1} no acerto`}
            topic="PG"
            icon={Activity}
            tone="purple"
            onClick={() => onAction("QUANTUM")}
            disabled={state.phase !== "playing"}
            hint="F3"
          />
        </div>

        {/* Boss CTA */}
        <motion.div
          initial={false}
          animate={{
            height: bossReady ? "auto" : 0,
            opacity: bossReady ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <div className="mt-3 pt-3 border-t border-cyber-red/20">
            <button
              onClick={onBoss}
              disabled={!bossReady}
              className="btn-hack w-full border-cyber-red text-cyber-red hover:bg-cyber-red/10 shadow-neon-red py-4 flex items-center justify-center gap-3 animate-pulse-fast"
            >
              <Skull className="w-4 h-4" />
              <span className="font-black tracking-[0.3em]">
                INICIAR PROTOCOLO FINAL · REAPER
              </span>
              <Flame className="w-4 h-4" />
            </button>
            <div className="text-center text-[10px] text-white/40 tracking-widest mt-2">
              DESAFIO GERADO POR IA · CLAUDE SONNET 4
            </div>
          </div>
        </motion.div>
      </div>

      {/* Helper */}
      <div className="mt-4 text-[10px] text-white/30 tracking-widest text-center">
        Cada ação exige resolver 1 cálculo. Se errar, a ação falha e o vírus
        continua crescendo. Colete 3 pistas para liberar o BOSS.
      </div>
    </motion.div>
  );
}
