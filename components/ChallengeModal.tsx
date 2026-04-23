"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { Question, TOPIC_META, Action } from "@/lib/types";

const ACTION_LABELS: Record<Action, string> = {
  PATCH: "PATCH · EXPONENCIAL",
  INTEL: "INTEL · LOGARITMO",
  QUANTUM: "QUANTUM · PG",
};

export default function ChallengeModal({
  open,
  question,
  action,
  timeLimit = 45,
  onResolve,
}: {
  open: boolean;
  question: Question | null;
  action: Action | null;
  timeLimit?: number;
  onResolve: (chosenIndex: number) => void;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showHint, setShowHint] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open || !question) {
      setChosen(null);
      setRevealing(false);
      setShowHint(false);
      setTimeLeft(timeLimit);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setChosen(null);
    setRevealing(false);
    setShowHint(false);
    setTimeLeft(timeLimit);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setChosen(-1);
          setRevealing(true);
          setTimeout(() => onResolve(-1), 1500);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [open, question, timeLimit, onResolve]);

  if (!open || !question || !action) return null;

  const meta = TOPIC_META[question.topic];
  const timePct = (timeLeft / timeLimit) * 100;
  const urgent = timeLeft <= 10;

  const handleChoose = (idx: number) => {
    if (revealing || chosen !== null) return;
    setChosen(idx);
    setRevealing(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => onResolve(idx), 1800);
  };

  const correct = question.correct;
  const gotIt = chosen === correct;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl panel panel-corner p-5 sm:p-7 max-h-[92vh] overflow-y-auto"
          style={{
            boxShadow: `0 0 0 1px ${meta.color}30, 0 0 60px ${meta.color}30, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div
                className="text-[10px] tracking-[0.3em] mb-1"
                style={{ color: meta.color }}
              >
                DESAFIO · {meta.label}
              </div>
              <div className="font-display text-xl sm:text-2xl font-bold tracking-wider">
                {ACTION_LABELS[action]}
              </div>
            </div>
            <div className="text-right">
              <div className="hud-label">LIMITE</div>
              <div
                className={`font-mono text-2xl font-bold ${urgent ? "text-cyber-red animate-pulse" : "text-white"}`}
              >
                {String(timeLeft).padStart(2, "0")}s
              </div>
            </div>
          </div>

          {/* Timer bar */}
          <div className="h-1 bg-white/5 mb-5 overflow-hidden">
            <motion.div
              className={urgent ? "bg-cyber-red h-full" : "bg-matrix h-full"}
              animate={{ width: `${timePct}%` }}
              transition={{ duration: 0.4, ease: "linear" }}
              style={{
                boxShadow: `0 0 8px ${urgent ? "#ff0844" : "#00ff88"}`,
              }}
            />
          </div>

          {/* Prompt */}
          <div className="mb-3 p-4 border border-white/10 bg-black/40">
            <div className="flex items-start gap-2.5">
              <span
                className="text-xs font-bold tracking-widest shrink-0 mt-0.5"
                style={{ color: meta.color }}
              >
                &gt;_
              </span>
              <p className="text-white/95 text-sm sm:text-base leading-relaxed">
                {question.prompt}
              </p>
            </div>
          </div>

          {/* Formula hint (revealed on click) */}
          {question.formula && (
            <div className="mb-5">
              {!showHint && !revealing ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-[11px] flex items-center gap-1.5 text-cyber-yellow/80 hover:text-cyber-yellow tracking-widest transition"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  MOSTRAR FÓRMULA
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-2.5 border-l-2 border-cyber-yellow/50 bg-cyber-yellow/5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyber-yellow shrink-0" />
                  <span className="text-[10px] text-cyber-yellow/80 tracking-widest shrink-0">
                    FÓRMULA:
                  </span>
                  <span className="font-mono text-sm text-white/90 tracking-wide">
                    {question.formula}
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {question.options.map((opt, i) => {
              const isChosen = chosen === i;
              const isCorrect = i === correct;
              const showHit = revealing && isChosen && isCorrect;
              const showMiss = revealing && isChosen && !isCorrect;
              const showCorrectAfter =
                revealing && !isChosen && isCorrect && chosen !== null;

              let cls =
                "border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 text-white";
              if (showHit) cls = "border-matrix text-matrix shadow-neon-green bg-matrix/10";
              else if (showMiss)
                cls = "border-cyber-red text-cyber-red shadow-neon-red bg-cyber-red/10";
              else if (showCorrectAfter)
                cls = "border-matrix/60 text-matrix bg-matrix/5";

              return (
                <motion.button
                  key={i}
                  whileHover={{ x: revealing ? 0 : 2 }}
                  whileTap={{ scale: revealing ? 1 : 0.98 }}
                  disabled={revealing || chosen !== null}
                  onClick={() => handleChoose(i)}
                  className={`btn-hack text-left flex items-center gap-3 py-3 ${cls} disabled:cursor-default`}
                >
                  <span className="shrink-0 w-7 h-7 flex items-center justify-center border border-current text-[11px] font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 font-mono text-sm tracking-wider">
                    {opt}
                  </span>
                  {showHit && <Check className="w-4 h-4 text-matrix" />}
                  {showMiss && <X className="w-4 h-4 text-cyber-red" />}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {revealing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 p-3 border-l-2 text-xs sm:text-sm"
                style={{
                  borderColor: gotIt ? "#00ff88" : "#ff0844",
                  background: gotIt
                    ? "rgba(0, 255, 136, 0.06)"
                    : "rgba(255, 8, 68, 0.06)",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-1 font-bold tracking-widest text-[10px]"
                  style={{ color: gotIt ? "#00ff88" : "#ff0844" }}
                >
                  {gotIt ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> ACERTO · AÇÃO EXECUTADA
                    </>
                  ) : chosen === -1 ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5" /> TEMPO ESGOTADO
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5" /> ERRO · VEJA A EXPLICAÇÃO
                    </>
                  )}
                </div>
                <div className="text-white/85 leading-relaxed">
                  {question.explanation}
                </div>
                {question.formula && (
                  <div className="mt-1.5 text-[10px] text-white/50">
                    Fórmula: <span className="font-mono">{question.formula}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
