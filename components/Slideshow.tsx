"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Gamepad2,
  Github,
  Code2,
  Sigma,
  Shield,
  Eye,
  Swords,
  Cpu,
  Sparkles,
  ExternalLink,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import MatrixRain from "./MatrixRain";
import GlitchText from "./ui/GlitchText";

const TOTAL = 4;

export default function Slideshow() {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => Math.min(TOTAL - 1, i + 1));
  const prev = () => setIdx((i) => Math.max(0, i - 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown")
        next();
      else if (e.key === "ArrowLeft" || e.key === "PageUp") prev();
      else if (e.key === "Home") setIdx(0);
      else if (e.key === "End") setIdx(TOTAL - 1);
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <MatrixRain intensity={0.04} speed={0.8} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-matrix/15">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] text-matrix/70 font-mono">
            APRESENTAÇÃO · NEXUS
          </span>
        </div>
        <div className="font-display text-xs tracking-[0.4em] text-white/70">
          SLIDE {idx + 1} / {TOTAL}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="chip hover:border-cyber-cyan/60 hover:text-cyber-cyan transition"
            title="Tela cheia (F)"
          >
            <Maximize className="w-3 h-3" />
            <span className="hidden sm:inline">TELA CHEIA</span>
          </button>
          <Link
            href="/"
            className="chip hover:border-matrix/60 hover:text-matrix transition"
            title="Abrir o jogo"
          >
            <Gamepad2 className="w-3 h-3" />
            <span className="hidden sm:inline">JOGO</span>
          </Link>
        </div>
      </div>

      {/* Slide content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          {idx === 0 && <Slide1 key="s1" />}
          {idx === 1 && <Slide2 key="s2" />}
          {idx === 2 && <Slide3 key="s3" />}
          {idx === 3 && <Slide4 key="s4" />}
        </AnimatePresence>
      </div>

      {/* Nav + dots */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-t border-matrix/15">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="btn-hack border-white/20 text-white hover:border-matrix hover:text-matrix disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-xs tracking-widest">ANTERIOR</span>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx
                  ? "bg-matrix w-8 shadow-neon-green"
                  : "bg-white/20 w-2.5 hover:bg-white/40"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={idx === TOTAL - 1}
          className="btn-hack border-matrix/60 text-matrix hover:bg-matrix/10 shadow-neon-green disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 flex items-center gap-2"
        >
          <span className="hidden sm:inline text-xs tracking-widest">PRÓXIMO</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hint */}
      <div className="absolute bottom-16 right-4 text-[9px] text-white/30 tracking-widest hidden sm:block">
        ← →  NAVEGAR     F  TELA CHEIA
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SLIDE 1 — CAPA · Marc Correa Buzatto
   ═══════════════════════════════════════════════════════════ */
function Slide1() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-10 sm:w-24 bg-gradient-to-r from-transparent to-matrix/60" />
        <span className="text-[10px] tracking-[0.5em] text-matrix font-mono">
          SENAC LAPA · TÉCNICO EM IA · 2º ANO
        </span>
        <div className="h-px w-10 sm:w-24 bg-gradient-to-l from-transparent to-matrix/60" />
      </div>

      <h1
        className="font-display text-6xl sm:text-8xl md:text-[9rem] font-black tracking-[0.05em] leading-none mb-3 text-white"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        <GlitchText className="text-white">NEXUS</GlitchText>
      </h1>
      <p className="font-display text-lg sm:text-2xl text-matrix tracking-[0.4em] font-bold text-glow mb-3">
        PROTOCOLO EXPONENCIAL
      </p>
      <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10">
        Um jogo digital que transforma{" "}
        <span className="text-cyber-cyan font-bold">Exponencial</span>,{" "}
        <span className="text-cyber-cyan font-bold">Logaritmo</span>,{" "}
        <span className="text-cyber-cyan font-bold">PA</span> e{" "}
        <span className="text-cyber-cyan font-bold">PG</span> em uma batalha
        contra um vírus digital.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10">
        <Stat label="JOGADORES" value="1" />
        <Stat label="DURAÇÃO" value="~5 min" />
        <Stat label="PLATAFORMA" value="Navegador" />
      </div>

      <div className="inline-flex flex-col items-center gap-2">
        <div className="text-[10px] tracking-[0.4em] text-white/40">APRESENTADOR</div>
        <div className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white">
          MARC CORREA BUZATTO
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SLIDE 2 — O JOGO · João Pedro Sandi
   ═══════════════════════════════════════════════════════════ */
function Slide2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl"
    >
      <SlideHeader
        tag="COMO FUNCIONA"
        title="O JOGO"
        presenter="JOÃO PEDRO SANDI"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="panel panel-corner p-5">
          <div className="text-[10px] tracking-[0.3em] text-cyber-red/70 mb-2">
            O INIMIGO
          </div>
          <h3 className="font-display text-2xl font-bold text-cyber-red mb-2">
            Vírus REAPER
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Começa com <strong>1 servidor</strong> infectado. Dobra a cada
            turno: 1, 2, 4, 8, 16... Em 10 turnos chega em{" "}
            <strong className="text-cyber-red">1024 servidores</strong> e a
            rede cai.
          </p>
        </div>

        <div className="panel panel-corner p-5">
          <div className="text-[10px] tracking-[0.3em] text-matrix/70 mb-2">
            SEU PAPEL
          </div>
          <h3 className="font-display text-2xl font-bold text-matrix mb-2">
            Você é o hacker
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            A cada turno escolhe <strong>uma de 3 ações</strong>. Cada ação
            exige resolver um cálculo. Acertou? Ação funciona. Errou? Ação
            falha e o vírus continua crescendo.
          </p>
        </div>
      </div>

      <div className="panel panel-corner p-5">
        <div className="text-[10px] tracking-[0.3em] text-cyber-cyan/70 mb-3">
          AS 3 AÇÕES
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActionBox
            icon={Shield}
            color="#ff0844"
            title="REDUZIR"
            subtitle="Exponencial"
            desc="Corta a infecção pela metade"
          />
          <ActionBox
            icon={Eye}
            color="#00e5ff"
            title="INVESTIGAR"
            subtitle="Logaritmo"
            desc="Coleta 1 pista p/ liberar o boss"
          />
          <ActionBox
            icon={Swords}
            color="#b347ff"
            title="ATACAR"
            subtitle="Prog. Geométrica"
            desc="Ataque dobra a cada acerto seguido"
          />
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-white/60">
        Com <span className="text-cyber-cyan font-bold">2 pistas</span> o{" "}
        <span className="text-cyber-red font-bold">BOSS FINAL</span> libera.
        Acertar = vitória.
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SLIDE 3 — MATEMÁTICA · Bruno Neiva Puntoni
   ═══════════════════════════════════════════════════════════ */
function Slide3() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl"
    >
      <SlideHeader
        tag="OS 4 CONTEÚDOS"
        title="MATEMÁTICA EM JOGO"
        presenter="BRUNO NEIVA PUNTONI"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MathCard
          color="#ff0844"
          topic="FUNÇÃO EXPONENCIAL"
          formula="I(t) = 2ᵗ"
          where="Vírus dobra a cada turno"
          example="I(10) = 2¹⁰ = 1024"
        />
        <MathCard
          color="#00e5ff"
          topic="LOGARITMO"
          formula="log_a(b) = x ⇔ aˣ = b"
          where="Quantos turnos até o limite?"
          example="log₂(1024) = 10"
        />
        <MathCard
          color="#00ff88"
          topic="PROG. ARITMÉTICA (PA)"
          formula="aₙ = a₁ + (n−1)·r"
          where="Defesa: 10, 15, 20, 25..."
          example="a₅ = 10 + 4·5 = 30"
        />
        <MathCard
          color="#b347ff"
          topic="PROG. GEOMÉTRICA (PG)"
          formula="aₙ = a₁ · qⁿ⁻¹"
          where="Ataque: 2, 4, 8, 16, 32..."
          example="a₅ = 2·2⁴ = 32"
        />
      </div>

      <div className="mt-5 panel panel-corner p-4 flex items-center gap-3">
        <Sigma className="w-5 h-5 text-matrix shrink-0" />
        <p className="text-sm text-white/80">
          <strong className="text-matrix">Sem matemática o jogo não funciona:</strong>{" "}
          não tem ameaça (exp), nem tempo (log), nem defesa (PA), nem ataque (PG).
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SLIDE 4 — STACK + CRÉDITOS · Giovanne Silva
   ═══════════════════════════════════════════════════════════ */
function Slide4() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl"
    >
      <SlideHeader
        tag="CONSTRUÇÃO"
        title="TECNOLOGIA"
        presenter="GIOVANNE SILVA"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="panel panel-corner p-5">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-4 h-4 text-cyber-cyan" />
            <span className="text-[10px] tracking-[0.3em] text-cyber-cyan/80">
              STACK
            </span>
          </div>
          <ul className="space-y-1.5 text-sm">
            <TechLine name="Next.js 14" desc="framework React" />
            <TechLine name="TypeScript" desc="código seguro e tipado" />
            <TechLine name="Tailwind CSS" desc="estilização" />
            <TechLine name="Recharts" desc="gráfico em tempo real" />
            <TechLine name="Framer Motion" desc="animações" />
            <TechLine name="Lucide Icons" desc="ícones" />
          </ul>
        </div>

        <div className="panel panel-corner p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-matrix" />
            <span className="text-[10px] tracking-[0.3em] text-matrix/80">
              DESTAQUES
            </span>
          </div>
          <ul className="space-y-1.5 text-sm">
            <Feature text="100% web — roda no navegador" />
            <Feature text="Zero custo · zero cadastro" />
            <Feature text="Funciona offline depois do 1º load" />
            <Feature text="Responsivo (celular e computador)" />
            <Feature text="Design cyberpunk com efeitos visuais" />
            <Feature text="Hospedado na Vercel · CDN global" />
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        <LinkCard
          icon={Github}
          label="CÓDIGO-FONTE"
          value="github.com/MarcBuzatto/nexus-protocolo-exponencial"
          color="#ffffff"
        />
        <LinkCard
          icon={Rocket}
          label="JOGUE ONLINE"
          value="jogo-beryl-beta-68.vercel.app"
          color="#00ff88"
        />
      </div>

      <div className="panel panel-corner p-4">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-cyber-purple" />
          <span className="text-[10px] tracking-[0.3em] text-cyber-purple/80">
            EQUIPE
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          <Member name="Marc Correa Buzatto" />
          <Member name="João Pedro Sandi" />
          <Member name="Bruno Neiva Puntoni" />
          <Member name="Giovanne Silva" highlight />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── Shared UI ─────────── */

function SlideHeader({
  tag,
  title,
  presenter,
}: {
  tag: string;
  title: string;
  presenter: string;
}) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-3 mb-5 pb-4 border-b border-matrix/15">
      <div>
        <div className="text-[10px] tracking-[0.4em] text-matrix/70 mb-1">
          {tag}
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black tracking-wider text-white">
          {title}
        </h2>
      </div>
      <div className="text-right">
        <div className="text-[10px] tracking-[0.3em] text-white/40">
          APRESENTADOR
        </div>
        <div className="font-display text-sm sm:text-base font-bold tracking-wider text-cyber-cyan">
          {presenter}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel panel-corner py-3 px-4">
      <div className="text-[10px] tracking-[0.3em] text-matrix/60 mb-0.5">
        {label}
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function ActionBox({
  icon: Icon,
  color,
  title,
  subtitle,
  desc,
}: {
  icon: any;
  color: string;
  title: string;
  subtitle: string;
  desc: string;
}) {
  return (
    <div
      className="p-4 border"
      style={{ borderColor: color + "50", boxShadow: `0 0 0 1px ${color}20` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-9 h-9 flex items-center justify-center border"
          style={{ borderColor: color + "60", color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div
            className="text-sm font-bold tracking-[0.2em]"
            style={{ color }}
          >
            {title}
          </div>
          <div className="text-[9px] text-white/50 tracking-widest">
            ({subtitle})
          </div>
        </div>
      </div>
      <p className="text-xs text-white/75 leading-relaxed">{desc}</p>
    </div>
  );
}

function MathCard({
  color,
  topic,
  formula,
  where,
  example,
}: {
  color: string;
  topic: string;
  formula: string;
  where: string;
  example: string;
}) {
  return (
    <div
      className="panel p-4"
      style={{ borderColor: color + "40", boxShadow: `0 0 0 1px ${color}15` }}
    >
      <div
        className="text-[10px] tracking-[0.3em] font-bold mb-1"
        style={{ color }}
      >
        {topic}
      </div>
      <div className="font-mono text-base sm:text-lg text-white font-bold mb-2 py-2 border-l-2 pl-3" style={{ borderColor: color }}>
        {formula}
      </div>
      <div className="text-xs text-white/60 mb-1">→ {where}</div>
      <div className="text-xs font-mono text-white/85">
        ex: <span style={{ color }}>{example}</span>
      </div>
    </div>
  );
}

function TechLine({ name, desc }: { name: string; desc: string }) {
  return (
    <li className="flex items-baseline gap-2">
      <span className="text-matrix">›</span>
      <span className="font-bold text-white">{name}</span>
      <span className="text-white/50 text-xs">— {desc}</span>
    </li>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-matrix shrink-0 mt-0.5">✓</span>
      <span className="text-white/85">{text}</span>
    </li>
  );
}

function LinkCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="panel p-3 flex items-center gap-3"
      style={{ borderColor: color + "40" }}
    >
      <Icon className="w-4 h-4 shrink-0" style={{ color }} />
      <div className="flex-1 min-w-0">
        <div className="text-[9px] tracking-[0.3em] text-white/50">{label}</div>
        <div className="font-mono text-xs text-white truncate">{value}</div>
      </div>
      <ExternalLink className="w-3 h-3 text-white/40 shrink-0" />
    </div>
  );
}

function Member({
  name,
  highlight,
}: {
  name: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`text-xs font-mono py-1.5 ${
        highlight ? "text-matrix font-bold" : "text-white/80"
      }`}
    >
      {name}
    </div>
  );
}
