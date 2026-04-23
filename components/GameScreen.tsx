"use client";

import { motion } from "framer-motion";
import {
  Biohazard,
  Shield,
  Timer,
  Skull,
  RotateCcw,
  HelpCircle,
  ShieldPlus,
  Eye,
  Swords,
} from "lucide-react";
import { CONFIG, GameState } from "@/lib/types";
import { canLaunchBoss } from "@/lib/gameLogic";
import StatCard from "./StatCard";
import EventLog from "./EventLog";
import GameChart from "./GameChart";

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

  const disabled = state.phase !== "playing";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen px-3 sm:px-5 py-5 max-w-6xl mx-auto"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse shadow-neon-red" />
          <span className="text-[10px] tracking-[0.3em] text-cyber-red font-mono">
            AO VIVO
          </span>
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
          </button>
        </div>
      </div>

      {/* Stats row — 3 cards só, foco no essencial */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <StatCard
          label="INFECÇÃO"
          value={state.infection}
          sub={`de ${CONFIG.INFECTION_LIMIT}`}
          icon={Biohazard}
          tone="red"
          pulse={infectionPct > 75}
          progress={infectionPct}
        />
        <StatCard
          label="TURNOS"
          value={`${state.turn}/${CONFIG.MAX_TURNS}`}
          sub={turnsLeft < 4 ? "cuidado!" : "restam"}
          icon={Timer}
          tone={turnsLeft < 4 ? "red" : "cyan"}
          progress={turnPct}
        />
        <StatCard
          label="PISTAS"
          value={`${state.clues}/${CONFIG.CLUES_TO_BOSS}`}
          sub={bossReady ? "boss liberado" : "p/ boss"}
          icon={Shield}
          tone={bossReady ? "matrix" : "purple"}
          progress={(state.clues / CONFIG.CLUES_TO_BOSS) * 100}
        />
      </div>

      {/* Chart + log */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-4">
        <div className="lg:col-span-3 min-h-[240px]">
          <GameChart history={state.history} currentTurn={state.turn} />
        </div>
        <div className="lg:col-span-2">
          <EventLog log={state.log} />
        </div>
      </div>

      {/* Actions — grandes, claros, com 1 linha só de explicação */}
      <div className="panel panel-corner p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="hud-label">ESCOLHA UMA AÇÃO</span>
          <span className="text-[10px] tracking-widest text-white/40">
            TECLAS 1 · 2 · 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <BigAction
            icon={ShieldPlus}
            label="REDUZIR"
            topic="Exponencial"
            desc="Corta a infecção pela metade"
            tone="red"
            disabled={disabled}
            onClick={() => onAction("PATCH")}
          />
          <BigAction
            icon={Eye}
            label="INVESTIGAR"
            topic="Logaritmo"
            desc={`Ganha 1 pista (p/ boss)`}
            tone="cyan"
            disabled={disabled || state.clues >= CONFIG.CLUES_TO_BOSS}
            onClick={() => onAction("INTEL")}
          />
          <BigAction
            icon={Swords}
            label="ATACAR"
            topic="Prog. Geométrica"
            desc={`Dano 2^${state.streak + 1} = ${Math.pow(2, state.streak + 1)}`}
            tone="purple"
            disabled={disabled}
            onClick={() => onAction("QUANTUM")}
          />
        </div>

        {/* Boss */}
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
              <span className="font-black tracking-[0.3em]">ENFRENTAR O BOSS</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function BigAction({
  icon: Icon,
  label,
  topic,
  desc,
  tone,
  disabled,
  onClick,
}: {
  icon: any;
  label: string;
  topic: string;
  desc: string;
  tone: "red" | "cyan" | "purple";
  disabled?: boolean;
  onClick: () => void;
}) {
  const map = {
    red: "border-cyber-red/60 text-cyber-red hover:bg-cyber-red/10 shadow-neon-red",
    cyan: "border-cyber-cyan/60 text-cyber-cyan hover:bg-cyber-cyan/10 shadow-neon-cyan",
    purple:
      "border-cyber-purple/60 text-cyber-purple hover:bg-cyber-purple/10 shadow-neon-purple",
  };
  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled}
      onClick={onClick}
      className={`btn-hack ${map[tone]} disabled:opacity-35 disabled:cursor-not-allowed
                  py-3 px-4 flex items-center gap-3 text-left`}
    >
      <Icon className="w-6 h-6 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm tracking-[0.2em]">{label}</div>
        <div className="text-[10px] text-white/60 tracking-wider truncate">
          {desc}
        </div>
      </div>
      <span className="chip text-[9px] text-white/40 border-white/10 hidden sm:inline-flex">
        {topic}
      </span>
    </motion.button>
  );
}
