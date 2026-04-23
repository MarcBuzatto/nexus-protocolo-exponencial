"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, Loader2, Cpu, ShieldAlert } from "lucide-react";
import GlitchText from "./ui/GlitchText";
import { BossQuestion, TOPIC_META } from "@/lib/types";
import ChallengeModal from "./ChallengeModal";

export default function BossScreen({
  onLoaded,
  onResolve,
  boss,
  loading,
}: {
  boss: BossQuestion | null;
  loading: boolean;
  onLoaded: () => void;
  onResolve: (chosenIndex: number) => void;
}) {
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    if (boss && !loading) {
      const t = setTimeout(() => {
        onLoaded();
        setShowChallenge(true);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [boss, loading, onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-red/10 via-transparent to-cyber-red/10 pointer-events-none" />
      <div className="w-full max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px #ff0844, 0 0 40px #ff0844",
                  "0 0 40px #ff0844, 0 0 80px #ff0844",
                  "0 0 20px #ff0844, 0 0 40px #ff0844",
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-cyber-red flex items-center justify-center bg-black/60 backdrop-blur"
            >
              <Skull className="w-14 h-14 sm:w-18 sm:h-18 text-cyber-red" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-cyber-red/30 rounded-full"
              style={{ borderStyle: "dashed" }}
            />
          </div>
        </motion.div>

        <div className="font-display text-[10px] tracking-[0.5em] text-cyber-red/80 mb-3">
          PROTOCOLO FINAL ATIVO
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-black tracking-wider mb-3">
          <GlitchText className="text-cyber-red text-glow">REAPER</GlitchText>
        </h2>
        <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
          O vírus comprometeu o núcleo. Um último desafio bloqueia o kill-switch.
        </p>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="panel panel-corner p-6 mx-auto max-w-md"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Loader2 className="w-4 h-4 text-cyber-cyan animate-spin" />
                <span className="text-xs tracking-widest text-cyber-cyan">
                  SONNET 4 · GERANDO DESAFIO
                </span>
              </div>
              <div className="text-[10px] text-white/50 tracking-widest space-y-1">
                <div>► CONECTANDO AO CÓRTEX NEURAL</div>
                <div>► COMBINANDO 2 CONTEÚDOS</div>
                <div>► VALIDANDO SCHEMA JSON</div>
              </div>
            </motion.div>
          )}

          {boss && !loading && !showChallenge && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="panel panel-corner p-5 sm:p-6 mx-auto max-w-md"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                {boss.source === "ai" ? (
                  <>
                    <Cpu className="w-4 h-4 text-matrix" />
                    <span className="text-xs tracking-widest text-matrix">
                      DESAFIO ÚNICO GERADO POR IA
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-cyber-yellow" />
                    <span className="text-xs tracking-widest text-cyber-yellow">
                      MODO OFFLINE · DESAFIO LOCAL
                    </span>
                  </>
                )}
              </div>
              <div className="flex justify-center gap-2">
                {boss.topics.map((t) => (
                  <span
                    key={t}
                    className="chip"
                    style={{
                      color: TOPIC_META[t].color,
                      borderColor: TOPIC_META[t].color + "60",
                    }}
                  >
                    {TOPIC_META[t].short}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ChallengeModal
        open={showChallenge}
        question={boss}
        action={"PATCH"}
        timeLimit={60}
        onResolve={(idx) => {
          setShowChallenge(false);
          onResolve(idx);
        }}
      />
    </motion.div>
  );
}
