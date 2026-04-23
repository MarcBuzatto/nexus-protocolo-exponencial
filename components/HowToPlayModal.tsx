"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Wrench,
  Search,
  Activity,
  Skull,
  Target,
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  Trophy,
  AlertTriangle,
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
          className="relative w-full max-w-3xl panel panel-corner max-h-[92vh] overflow-hidden flex flex-col"
          style={{
            boxShadow:
              "0 0 0 1px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.2)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-matrix/20 shrink-0">
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-matrix" />
              <div>
                <div className="text-[10px] tracking-[0.3em] text-matrix/60">
                  MANUAL
                </div>
                <div className="font-display text-lg sm:text-xl font-bold tracking-wider text-white">
                  COMO JOGAR
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-white/15 hover:border-cyber-red hover:text-cyber-red transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
            {/* 1. Contexto */}
            <section>
              <SectionTitle icon={Target} color="#ff0844">
                1 · A MISSÃO
              </SectionTitle>
              <p className="text-sm text-white/80 leading-relaxed">
                O vírus <span className="text-cyber-red font-bold">REAPER</span>{" "}
                invadiu a rede e <strong>dobra a cada turno</strong>. Em 10
                turnos sem fazer nada ele chega em{" "}
                <span className="text-cyber-red font-bold">1.024 servidores</span>{" "}
                e a rede cai. Você é o único hacker de plantão. Use matemática
                para detê-lo.
              </p>
            </section>

            {/* 2. Turno */}
            <section>
              <SectionTitle icon={Clock} color="#00e5ff">
                2 · O TURNO
              </SectionTitle>
              <ol className="space-y-2 text-sm">
                <Step n={1}>Escolha uma das 3 ações (PATCH, INTEL, QUANTUM).</Step>
                <Step n={2}>
                  Resolva o cálculo matemático que aparece. <strong>Acertou</strong>{" "}
                  → a ação funciona. <strong>Errou ou passou do tempo</strong> →
                  a ação falha.
                </Step>
                <Step n={3}>
                  No fim do turno o REAPER dobra automaticamente e o FIREWALL
                  ganha +5.
                </Step>
                <Step n={4}>
                  Quando juntar <strong className="text-cyber-cyan">3 pistas</strong>,
                  o botão BOSS libera.
                </Step>
              </ol>
            </section>

            {/* 3. Ações */}
            <section>
              <SectionTitle icon={Sparkles} color="#b347ff">
                3 · AS 3 AÇÕES
              </SectionTitle>
              <div className="space-y-3">
                <ActionCard
                  icon={Wrench}
                  label="PATCH"
                  topic="EXPONENCIAL"
                  color="#ff0844"
                  desc="Divide a infecção pela metade."
                  math="Pergunta envolve potências: 2ˣ, aˣ·aʸ, (aˣ)ʸ"
                  tip="Use quando a infecção passar de 30–40 para ganhar tempo."
                />
                <ActionCard
                  icon={Search}
                  label="INTEL"
                  topic="LOGARITMO"
                  color="#00e5ff"
                  desc="Coleta 1 pista. Precisa de 3 para desbloquear o BOSS."
                  math="Pergunta envolve log₂(x), log₃(x), inversa da exponencial"
                  tip="Priorize nos primeiros turnos — sem 3 pistas você não ganha."
                />
                <ActionCard
                  icon={Activity}
                  label="QUANTUM"
                  topic="PROG. GEOMÉTRICA"
                  color="#b347ff"
                  desc="Streak acumula. Dano = 2^streak. Errar zera o streak."
                  math="Pergunta de PG: aₙ = a₁ · qⁿ⁻¹"
                  tip="Corrente de acertos vale ouro. Depois de 4 acertos o dano chega em 32."
                />
              </div>
            </section>

            {/* 4. Fórmulas */}
            <section>
              <SectionTitle icon={BookOpen} color="#00ff88">
                4 · FÓRMULAS QUE VOCÊ PRECISA LEMBRAR
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <FormulaCard
                  topic="EXPONENCIAL"
                  color="#ff0844"
                  formula="aˣ · aʸ = aˣ⁺ʸ"
                  note="Soma os expoentes."
                />
                <FormulaCard
                  topic="EXPONENCIAL"
                  color="#ff0844"
                  formula="(aˣ)ʸ = aˣ·ʸ"
                  note="Multiplica os expoentes."
                />
                <FormulaCard
                  topic="LOGARITMO"
                  color="#00e5ff"
                  formula="log_a(b) = x  ⇔  aˣ = b"
                  note="Pergunta: a qual potência?"
                />
                <FormulaCard
                  topic="LOGARITMO"
                  color="#00e5ff"
                  formula="log(a·b) = log(a) + log(b)"
                  note="Produto vira soma."
                />
                <FormulaCard
                  topic="PROG. ARITMÉTICA"
                  color="#00ff88"
                  formula="aₙ = a₁ + (n − 1) · r"
                  note="Termo geral. r = razão (soma)."
                />
                <FormulaCard
                  topic="PROG. ARITMÉTICA"
                  color="#00ff88"
                  formula="Sₙ = (a₁ + aₙ) · n / 2"
                  note="Soma dos n primeiros termos."
                />
                <FormulaCard
                  topic="PROG. GEOMÉTRICA"
                  color="#b347ff"
                  formula="aₙ = a₁ · qⁿ⁻¹"
                  note="Termo geral. q = razão (produto)."
                />
                <FormulaCard
                  topic="PROG. GEOMÉTRICA"
                  color="#b347ff"
                  formula="Sₙ = a₁ · (qⁿ − 1) / (q − 1)"
                  note="Soma finita (q ≠ 1)."
                />
              </div>
            </section>

            {/* 5. Boss */}
            <section>
              <SectionTitle icon={Skull} color="#ff0844">
                5 · O BOSS FINAL
              </SectionTitle>
              <p className="text-sm text-white/80 leading-relaxed mb-2">
                Com 3 pistas, o botão vermelho{" "}
                <span className="text-cyber-red font-bold">
                  INICIAR PROTOCOLO FINAL
                </span>{" "}
                libera. O desafio <strong>combina 2 dos 4 conteúdos</strong>{" "}
                (ex: PA + Logaritmo) para testar tudo que você aprendeu. Você
                tem <strong>60 segundos</strong>. Acertou = vitória. Errou =
                derrota.
              </p>
              <div className="text-[11px] text-white/50 italic border-l-2 border-matrix/40 pl-3">
                O jogo sorteia entre vários desafios diferentes, então cada
                partida é única.
              </div>
            </section>

            {/* 6. Vitória / Derrota */}
            <section>
              <SectionTitle icon={Trophy} color="#ffcc00">
                6 · VITÓRIA E DERROTA
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="panel p-3 border-matrix/30">
                  <div className="flex items-center gap-2 text-matrix font-bold text-xs tracking-widest mb-1">
                    <Trophy className="w-3.5 h-3.5" />
                    VITÓRIA
                  </div>
                  <div className="text-[13px] text-white/80">
                    Acertar o desafio do BOSS gerado pela IA.
                  </div>
                </div>
                <div className="panel p-3 border-cyber-red/30">
                  <div className="flex items-center gap-2 text-cyber-red font-bold text-xs tracking-widest mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    DERROTA
                  </div>
                  <div className="text-[13px] text-white/80">
                    Infecção chegar em 1024 <span className="text-white/50">ou</span>{" "}
                    ultrapassar 12 turnos <span className="text-white/50">ou</span>{" "}
                    errar o BOSS.
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Estratégia */}
            <section>
              <SectionTitle icon={Target} color="#00ff88">
                7 · ESTRATÉGIA RECOMENDADA
              </SectionTitle>
              <ol className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="text-matrix font-bold shrink-0">→</span>
                  <span>
                    <strong>Turnos 0–3:</strong> use INTEL duas vezes para
                    coletar pistas enquanto a infecção ainda está baixa.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-matrix font-bold shrink-0">→</span>
                  <span>
                    <strong>Turnos 3–6:</strong> quando a infecção passar de
                    30, use PATCH para dividir por 2.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-matrix font-bold shrink-0">→</span>
                  <span>
                    <strong>Turnos 6–9:</strong> use QUANTUM em sequência para
                    construir streak alto (dano 16, 32, 64).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-matrix font-bold shrink-0">→</span>
                  <span>
                    <strong>Antes do turno 10:</strong> dispare o BOSS com a 3ª
                    pista. Respire fundo e resolva com calma.
                  </span>
                </li>
              </ol>
            </section>

            {/* 8. Controles */}
            <section>
              <SectionTitle icon={Sparkles} color="#00e5ff">
                8 · ATALHOS DE TECLADO
              </SectionTitle>
              <div className="flex flex-wrap gap-2 text-xs">
                <Key>1</Key> <span className="text-white/60">PATCH</span>
                <Key>2</Key> <span className="text-white/60">INTEL</span>
                <Key>3</Key> <span className="text-white/60">QUANTUM</span>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-matrix/20 shrink-0 flex items-center justify-between">
            <div className="text-[10px] text-white/40 tracking-widest">
              NEXUS · PROTOCOLO EXPONENCIAL · SENAC LAPA
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

function SectionTitle({
  icon: Icon,
  color,
  children,
}: {
  icon: any;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4" style={{ color }} />
      <h3
        className="font-display text-xs tracking-[0.3em] font-bold"
        style={{ color }}
      >
        {children}
      </h3>
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(90deg, ${color}50, transparent)`,
        }}
      />
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="shrink-0 w-6 h-6 flex items-center justify-center border border-matrix/40 text-matrix font-bold text-[11px]">
        {n}
      </span>
      <span className="text-white/80 leading-relaxed">{children}</span>
    </li>
  );
}

function ActionCard({
  icon: Icon,
  label,
  topic,
  color,
  desc,
  math,
  tip,
}: {
  icon: any;
  label: string;
  topic: string;
  color: string;
  desc: string;
  math: string;
  tip: string;
}) {
  return (
    <div
      className="panel p-3 sm:p-4"
      style={{
        borderColor: color + "40",
        boxShadow: `0 0 0 1px ${color}20`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-10 h-10 flex items-center justify-center border"
          style={{ borderColor: color + "60", color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-bold text-sm tracking-[0.2em]"
              style={{ color }}
            >
              {label}
            </span>
            <span
              className="chip"
              style={{ color, borderColor: color + "40" }}
            >
              {topic}
            </span>
          </div>
          <p className="text-sm text-white/80 mb-1">{desc}</p>
          <p className="text-[11px] text-white/50 mb-1.5 font-mono">{math}</p>
          <p className="text-[11px] text-matrix/80 italic">💡 {tip}</p>
        </div>
      </div>
    </div>
  );
}

function FormulaCard({
  topic,
  color,
  formula,
  note,
}: {
  topic: string;
  color: string;
  formula: string;
  note: string;
}) {
  return (
    <div
      className="panel p-3 flex flex-col gap-1"
      style={{ borderColor: color + "30" }}
    >
      <div
        className="text-[9px] tracking-[0.25em] font-bold"
        style={{ color }}
      >
        {topic}
      </div>
      <div className="font-mono font-bold text-sm text-white tracking-wide">
        {formula}
      </div>
      <div className="text-[10px] text-white/50">{note}</div>
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center w-7 h-7 border border-white/20 bg-white/5 font-mono text-xs text-matrix shadow-inner">
      {children}
    </kbd>
  );
}
