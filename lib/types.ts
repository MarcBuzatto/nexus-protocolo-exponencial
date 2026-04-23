export type Topic = "exp" | "log" | "pa" | "pg";

export type Action = "PATCH" | "INTEL" | "QUANTUM";

export type Phase = "intro" | "playing" | "challenge" | "boss" | "victory" | "defeat";

export interface Question {
  id: string;
  topic: Topic;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  formula?: string;
}

export interface BossQuestion extends Question {
  source: "ai" | "fallback";
  topics: Topic[];
}

export interface GameState {
  phase: Phase;
  turn: number;
  infection: number;
  firewall: number;
  clues: number;
  streak: number;
  quantumDamage: number;
  lastAction: Action | null;
  lastResult: "hit" | "miss" | null;
  currentQuestion: Question | null;
  currentAction: Action | null;
  bossQuestion: BossQuestion | null;
  log: LogEntry[];
  history: TurnSnapshot[];
  bossDefeated: boolean;
}

export interface LogEntry {
  id: number;
  text: string;
  kind: "info" | "success" | "danger" | "warn" | "system";
}

export interface TurnSnapshot {
  turn: number;
  infection: number;
  firewall: number;
  quantum: number;
}

export const INITIAL_STATE: GameState = {
  phase: "intro",
  turn: 0,
  infection: 1,
  firewall: 10,
  clues: 0,
  streak: 0,
  quantumDamage: 0,
  lastAction: null,
  lastResult: null,
  currentQuestion: null,
  currentAction: null,
  bossQuestion: null,
  log: [],
  history: [{ turn: 0, infection: 1, firewall: 10, quantum: 2 }],
  bossDefeated: false,
};

export const CONFIG = {
  INFECTION_LIMIT: 1024,
  MAX_TURNS: 12,
  INITIAL_INFECTION: 1,
  INITIAL_FIREWALL: 10,
  FIREWALL_STEP: 5,
  CLUES_TO_BOSS: 3,
  QUANTUM_BASE: 2,
} as const;

export const TOPIC_META: Record<
  Topic,
  { label: string; color: string; shadow: string; short: string }
> = {
  exp: {
    label: "EXPONENCIAL",
    color: "#ff0844",
    shadow: "shadow-neon-red",
    short: "EXP",
  },
  log: {
    label: "LOGARITMO",
    color: "#00e5ff",
    shadow: "shadow-neon-cyan",
    short: "LOG",
  },
  pa: {
    label: "PROG. ARITMÉTICA",
    color: "#00ff88",
    shadow: "shadow-neon-green",
    short: "PA",
  },
  pg: {
    label: "PROG. GEOMÉTRICA",
    color: "#b347ff",
    shadow: "shadow-neon-purple",
    short: "PG",
  },
};
