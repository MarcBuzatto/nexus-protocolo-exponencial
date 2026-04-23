import { CONFIG, GameState, LogEntry, Action, Topic } from "./types";
import { drawQuestion } from "./questions";

const ACTION_TO_TOPIC: Record<Action, Topic> = {
  PATCH: "exp",
  INTEL: "log",
  QUANTUM: "pg",
};

let _logId = 0;

export function makeLog(
  text: string,
  kind: LogEntry["kind"] = "info",
): LogEntry {
  return { id: ++_logId, text, kind };
}

export function startChallenge(state: GameState, action: Action): GameState {
  const topic = ACTION_TO_TOPIC[action];
  const usedIds = state.currentQuestion ? [state.currentQuestion.id] : [];
  const question = drawQuestion(topic, usedIds);
  return {
    ...state,
    phase: "challenge",
    currentAction: action,
    currentQuestion: question,
  };
}

export function resolveChallenge(
  state: GameState,
  chosenIndex: number,
): GameState {
  if (!state.currentQuestion || !state.currentAction) return state;
  const correct = chosenIndex === state.currentQuestion.correct;
  const action = state.currentAction;
  let next: GameState = {
    ...state,
    phase: "playing",
    lastAction: action,
    lastResult: correct ? "hit" : "miss",
    currentAction: null,
  };

  if (correct) {
    next = applyActionSuccess(next, action);
  } else {
    next = applyActionFail(next, action);
  }

  return endOfTurn(next);
}

function applyActionSuccess(state: GameState, action: Action): GameState {
  const log = [...state.log];
  switch (action) {
    case "PATCH": {
      const newInf = Math.max(1, Math.floor(state.infection / 2));
      log.unshift(
        makeLog(
          `> PATCH aplicado. Infecção: ${state.infection} → ${newInf}`,
          "success",
        ),
      );
      return { ...state, infection: newInf, log };
    }
    case "INTEL": {
      const clues = Math.min(CONFIG.CLUES_TO_BOSS, state.clues + 1);
      log.unshift(
        makeLog(`> INTEL coletado. Pistas: ${clues}/${CONFIG.CLUES_TO_BOSS}`, "success"),
      );
      return { ...state, clues, log };
    }
    case "QUANTUM": {
      const streak = state.streak + 1;
      const damage = Math.pow(CONFIG.QUANTUM_BASE, streak);
      const newInf = Math.max(1, state.infection - damage);
      log.unshift(
        makeLog(
          `> QUANTUM x${streak} → dano ${damage}. Infecção: ${state.infection} → ${newInf}`,
          "success",
        ),
      );
      return {
        ...state,
        streak,
        quantumDamage: state.quantumDamage + damage,
        infection: newInf,
        log,
      };
    }
  }
}

function applyActionFail(state: GameState, action: Action): GameState {
  const log = [...state.log];
  switch (action) {
    case "PATCH":
      log.unshift(makeLog("> PATCH falhou. Nenhum efeito.", "danger"));
      return { ...state, log };
    case "INTEL":
      log.unshift(makeLog("> INTEL corrompido. Pista perdida.", "danger"));
      return { ...state, log };
    case "QUANTUM":
      log.unshift(
        makeLog(
          `> QUANTUM desincronizado. Streak ${state.streak} → 0.`,
          "danger",
        ),
      );
      return { ...state, streak: 0, log };
  }
}

function endOfTurn(state: GameState): GameState {
  const turn = state.turn + 1;
  const infection = Math.min(
    CONFIG.INFECTION_LIMIT * 2,
    Math.max(1, state.infection) * 2,
  );
  const firewall = state.firewall + CONFIG.FIREWALL_STEP;
  const log = [...state.log];
  log.unshift(
    makeLog(`>> TURNO ${turn} · REAPER dobrou · infecção ${infection}`, "warn"),
  );

  const snapshot = {
    turn,
    infection,
    firewall,
    quantum: Math.pow(CONFIG.QUANTUM_BASE, Math.max(1, state.streak)),
  };

  const next: GameState = {
    ...state,
    turn,
    infection,
    firewall,
    history: [...state.history, snapshot],
    log,
  };

  if (infection >= CONFIG.INFECTION_LIMIT) {
    return {
      ...next,
      phase: "defeat",
      log: [
        makeLog(
          `>> ALERTA CRÍTICO: ${infection} servidores infectados. REAPER domina a rede.`,
          "danger",
        ),
        ...log,
      ],
    };
  }
  if (turn >= CONFIG.MAX_TURNS) {
    return {
      ...next,
      phase: "defeat",
      log: [
        makeLog(
          `>> TEMPO ESGOTADO: o perímetro caiu após ${turn} turnos.`,
          "danger",
        ),
        ...log,
      ],
    };
  }
  return next;
}

export function canLaunchBoss(state: GameState): boolean {
  return (
    state.phase === "playing" &&
    state.clues >= CONFIG.CLUES_TO_BOSS &&
    !state.bossDefeated
  );
}

export function computeScore(state: GameState): number {
  const turnsLeft = Math.max(0, CONFIG.MAX_TURNS - state.turn);
  const infectionMitigation = Math.max(
    0,
    CONFIG.INFECTION_LIMIT - state.infection,
  );
  const bossBonus = state.bossDefeated ? 5000 : 0;
  return (
    bossBonus +
    state.firewall * 50 +
    state.quantumDamage * 20 +
    turnsLeft * 100 +
    infectionMitigation
  );
}

export function rank(score: number): string {
  if (score >= 8500) return "SS · SYSADMIN LENDÁRIO";
  if (score >= 6500) return "S · CRIPTÓGRAFO DE ELITE";
  if (score >= 4500) return "A · HACKER VETERANO";
  if (score >= 2500) return "B · ANALISTA SÊNIOR";
  if (score >= 1000) return "C · OPERADOR";
  return "D · ESTAGIÁRIO";
}
