"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldPlus,
  Eye,
  Swords,
  ArrowRight,
  AlertTriangle,
  Trophy,
} from "lucide-react";

export default function HowToPlayModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.96, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl panel panel-corner max-h-[92vh] overflow-hidden flex flex-col"
          style={{
            boxShadow:
              "0 0 0 1px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.2)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-matrix/20 shrink-0">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-matrix/60">
                MANUAL RÁPIDO
              </div>
              <div className="font-display text-lg sm:text-xl font-bold tracking-wider text-white">
                COMO JOGAR
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-white/15 hover:border-cyber-red hover:text-cyber-red transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-5 py-5 space-y-6">
            {/* 1. Objetivo */}
            <section>
              <Title n={1}>O OBJETIVO</Title>
              <p className="text-sm text-white/85 leading-relaxed">
                O vírus dobra a cada turno. Em 10 turnos ele chega em{" "}
                <span className="text-cyber-red font-bold">1024 servidores</span>{" "}
                e você perde. Pare ele antes.
              </p>
            </section>

            {/* 2. Cada turno */}
            <section>
              <Title n={2}>A CADA TURNO</Title>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <MiniStep num="1" text="Escolha uma das 3 ações" />
                <MiniStep num="2" text="Responda o cálculo" />
                <MiniStep num="3" text="Vírus cresce. Próximo turno." />
              </div>
              <p className="text-xs text-white/55 mt-2">
                Se errar, a ação não funciona e o vírus cresce mesmo assim.
              </p>
            </section>

            {/* 3. As 3 ações */}
            <section>
              <Title n={3}>AS 3 AÇÕES</Title>
              <div className="space-y-2">
                <ActionRow
                  icon={ShieldPlus}
                  label="REDUZIR"
                  topic="Exponencial"
                  color="#ff0844"
                  desc="Corta a infecção pela metade."
                />
                <ActionRow
                  icon={Eye}
                  label="INVESTIGAR"
                  topic="Logaritmo"
                  color="#00e5ff"
                  desc="Coleta 1 pista. Precisa de 2 para o boss."
                />
                <ActionRow
                  icon={Swords}
                  label="ATACAR"
                  topic="Prog. Geométrica"
                  color="#b347ff"
                  desc="Ataque dobra a cada acerto seguido. Errar zera."
                />
              </div>
            </section>

            {/* 4. Boss */}
            <section>
              <Title n={4}>O BOSS FINAL</Title>
              <p className="text-sm text-white/85 leading-relaxed">
                Com <strong className="text-cyber-cyan">2 pistas</strong>, o
                botão vermelho libera. O boss é um cálculo que combina 2 dos 4
                conteúdos. Acertou = <strong className="text-matrix">vitória</strong>.
                Errou = <strong className="text-cyber-red">derrota</strong>.
              </p>
            </section>

            {/* 5. Vitória e derrota */}
            <section>
              <Title n={5}>COMO VENCER</Title>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="panel p-3 border-matrix/30">
                  <div className="flex items-center gap-2 text-matrix font-bold text-xs tracking-widest mb-1">
                    <Trophy className="w-3.5 h-3.5" />
                    VENCE SE
                  </div>
                  <div className="text-[13px] text-white/85">
                    Acertar o desafio do boss.
                  </div>
                </div>
                <div className="panel p-3 border-cyber-red/30">
                  <div className="flex items-center gap-2 text-cyber-red font-bold text-xs tracking-widest mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    PERDE SE
                  </div>
                  <div className="text-[13px] text-white/85">
                    Infecção chegar em 1024 ou passar do turno 10.
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Dica */}
            <section>
              <Title n={6}>DICA DE ESTRATÉGIA</Title>
              <p className="text-sm text-white/85 leading-relaxed">
                <strong className="text-cyber-cyan">Comece investigando</strong>{" "}
                para ganhar pistas rápido, <strong className="text-cyber-red">reduza</strong>{" "}
                quando o vírus passar de 30, e use o{" "}
                <strong className="text-cyber-purple">boss</strong> antes do turno 8.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-matrix/20 shrink-0 flex items-center justify-between">
            <div className="text-[10px] text-white/40 tracking-widest">
              SENAC LAPA · TÉCNICO EM IA
            </div>
            <button
              onClick={onClose}
              className="btn-hack border-matrix text-matrix hover:bg-matrix/10 shadow-neon-green px-5 py-2 flex items-center gap-2"
            >
              <span className="font-bold tracking-widest">COMEÇAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Title({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-6 h-6 flex items-center justify-center border border-matrix/40 text-matrix font-bold text-[11px]">
        {n}
      </span>
      <h3 className="font-display text-xs tracking-[0.3em] font-bold text-matrix">
        {children}
      </h3>
      <div className="flex-1 h-px bg-gradient-to-r from-matrix/30 to-transparent" />
    </div>
  );
}

function MiniStep({ num, text }: { num: string; text: string }) {
  return (
    <div className="panel p-2.5 flex items-center gap-2">
      <span className="shrink-0 w-5 h-5 flex items-center justify-center border border-cyber-cyan/40 text-cyber-cyan text-[10px] font-bold">
        {num}
      </span>
      <span className="text-[12px] text-white/85">{text}</span>
    </div>
  );
}

function ActionRow({
  icon: Icon,
  label,
  topic,
  color,
  desc,
}: {
  icon: any;
  label: string;
  topic: string;
  color: string;
  desc: string;
}) {
  return (
    <div
      className="panel p-3 flex items-center gap-3"
      style={{ borderColor: color + "40" }}
    >
      <div
        className="shrink-0 w-9 h-9 flex items-center justify-center border"
        style={{ borderColor: color + "60", color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-bold text-sm tracking-[0.2em]"
            style={{ color }}
          >
            {label}
          </span>
          <span className="text-[9px] text-white/50 tracking-widest">
            ({topic})
          </span>
        </div>
        <p className="text-[12px] text-white/75">{desc}</p>
      </div>
    </div>
  );
}
