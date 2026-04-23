"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MatrixRain from "./MatrixRain";
import IntroScreen from "./IntroScreen";
import GameScreen from "./GameScreen";
import ChallengeModal from "./ChallengeModal";
import BossScreen from "./BossScreen";
import EndScreen from "./EndScreen";
import HowToPlayModal from "./HowToPlayModal";
import { GameState, INITIAL_STATE, Action, BossQuestion } from "@/lib/types";
import { makeLog, resolveChallenge, startChallenge } from "@/lib/gameLogic";
import { drawBossQuestion } from "@/lib/bossQuestions";

const FIRST_VISIT_KEY = "nexus_v2_seen_intro";

export default function NexusGame() {
  const [state, setState] = useState<GameState>(() => ({
    ...INITIAL_STATE,
    log: [
      makeLog("Vírus detectado. 1 servidor infectado.", "warn"),
      makeLog("Escolha sua primeira ação.", "info"),
    ],
  }));

  const [bossLoading, setBossLoading] = useState(false);
  const [boss, setBoss] = useState<BossQuestion | null>(null);
  const [shake, setShake] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Tutorial automático na primeira visita (usando localStorage)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = window.localStorage.getItem(FIRST_VISIT_KEY);
      if (!seen) {
        // Pequeno delay para boot sequence terminar
        const t = setTimeout(() => setHelpOpen(true), 3600);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const closeHelp = useCallback(() => {
    setHelpOpen(false);
    try {
      window.localStorage.setItem(FIRST_VISIT_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const start = useCallback(() => {
    setState((s) => ({ ...s, phase: "playing" }));
  }, []);

  const reset = useCallback(() => {
    setState({
      ...INITIAL_STATE,
      phase: "intro",
      log: [
        makeLog("Vírus detectado. 1 servidor infectado.", "warn"),
        makeLog("Escolha sua primeira ação.", "info"),
      ],
      history: [{ turn: 0, infection: 1, firewall: 10, quantum: 2 }],
    });
    setBoss(null);
  }, []);

  const onAction = useCallback((a: Action) => {
    setState((s) => startChallenge(s, a));
  }, []);

  const onResolve = useCallback((idx: number) => {
    setState((prev) => {
      const next = resolveChallenge(prev, idx);
      if (next.lastResult === "miss") {
        setShake(true);
        setTimeout(() => setShake(false), 800);
      }
      return next;
    });
  }, []);

  const launchBoss = useCallback(() => {
    setState((s) => ({ ...s, phase: "boss" }));
    setBossLoading(true);
    setBoss(null);
    // Pequeno delay cinematográfico antes de revelar o desafio
    setTimeout(() => {
      setBoss(drawBossQuestion());
      setBossLoading(false);
    }, 700);
  }, []);

  const resolveBoss = useCallback(
    (idx: number) => {
      if (!boss) return;
      const correct = idx === boss.correct;
      setState((s) => ({
        ...s,
        phase: correct ? "victory" : "defeat",
        bossDefeated: correct,
        bossQuestion: boss,
        log: [
          makeLog(
            correct
              ? "Boss derrotado! Rede segura."
              : "Boss venceu. Rede perdida.",
            correct ? "success" : "danger",
          ),
          ...s.log,
        ],
      }));
    },
    [boss],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" || e.key === "h" || e.key === "H") {
        setHelpOpen((o) => !o);
        return;
      }
      if (state.phase !== "playing") return;
      if (e.key === "1" || e.key === "F1") onAction("PATCH");
      else if (e.key === "2" || e.key === "F2") onAction("INTEL");
      else if (e.key === "3" || e.key === "F3") onAction("QUANTUM");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.phase, onAction]);

  return (
    <div className={`relative min-h-screen ${shake ? "screen-shake" : ""}`}>
      {shake && <div className="red-flash" />}
      <MatrixRain
        intensity={state.phase === "intro" ? 0.06 : 0.03}
        speed={state.phase === "boss" ? 1.8 : 1}
      />
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 85%)",
        }}
      />

      <AnimatePresence mode="wait">
        {state.phase === "intro" && (
          <IntroScreen
            key="intro"
            onStart={start}
            onHelp={() => setHelpOpen(true)}
          />
        )}
        {(state.phase === "playing" || state.phase === "challenge") && (
          <GameScreen
            key="game"
            state={state}
            onAction={onAction}
            onBoss={launchBoss}
            onReset={reset}
            onHelp={() => setHelpOpen(true)}
          />
        )}
        {state.phase === "boss" && (
          <BossScreen
            key="boss"
            boss={boss}
            loading={bossLoading}
            onLoaded={() => {}}
            onResolve={resolveBoss}
          />
        )}
        {(state.phase === "victory" || state.phase === "defeat") && (
          <EndScreen key="end" state={state} onRestart={reset} />
        )}
      </AnimatePresence>

      <ChallengeModal
        open={state.phase === "challenge"}
        question={state.currentQuestion}
        action={state.currentAction}
        onResolve={onResolve}
      />

      <HowToPlayModal open={helpOpen} onClose={closeHelp} />
    </div>
  );
}
