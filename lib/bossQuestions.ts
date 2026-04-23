import type { BossQuestion } from "./types";

// Banco de desafios finais — cada um combina 2 conteúdos diferentes.
// Respostas foram verificadas manualmente (ver comentário no final).
export const BOSS_QUESTIONS: Omit<BossQuestion, "id" | "source">[] = [
  {
    topic: "pa",
    topics: ["pa", "log"],
    prompt:
      "PROTOCOLO FINAL — Some o 8º termo da PA (a₁=5, r=3) com log₂(64). Qual o total?",
    options: ["26", "30", "32", "38"],
    correct: 2,
    formula: "aₙ = a₁ + (n−1)·r   ·   log_a(b) = x ⇔ aˣ = b",
    explanation: "a₈ = 5 + 7·3 = 26 e log₂(64) = 6. Total = 26 + 6 = 32.",
  },
  {
    topic: "pg",
    topics: ["pg", "exp"],
    prompt:
      "REAPER injeta 2⁴ servidores numa onda. O 3º termo da PG (a₁=3, q=2) atinge junto. Some os dois valores.",
    options: ["22", "24", "28", "32"],
    correct: 2,
    formula: "2ˣ   ·   aₙ = a₁·qⁿ⁻¹",
    explanation: "2⁴ = 16 e a₃ = 3·2² = 12. Total = 16 + 12 = 28.",
  },
  {
    topic: "log",
    topics: ["log", "pa"],
    prompt:
      "Calcule log₂(128) somado ao 5º termo da PA (a₁=4, r=6).",
    options: ["28", "30", "31", "35"],
    correct: 3,
    formula: "log_a(b) = x ⇔ aˣ = b   ·   aₙ = a₁+(n−1)·r",
    explanation: "log₂(128) = 7 e a₅ = 4 + 4·6 = 28. Total = 7 + 28 = 35.",
  },
  {
    topic: "exp",
    topics: ["exp", "pa"],
    prompt:
      "O kernel dispara 2⁵ retaliações e o firewall está em a₇ da PA (a₁=10, r=5). Qual a soma?",
    options: ["60", "64", "72", "96"],
    correct: 2,
    formula: "2ˣ   ·   aₙ = a₁+(n−1)·r",
    explanation: "2⁵ = 32 e a₇ = 10 + 6·5 = 40. Total = 32 + 40 = 72.",
  },
  {
    topic: "pg",
    topics: ["pg", "log"],
    prompt:
      "O 5º termo da PG (a₁=2, q=2) menos log₂(16) é igual a:",
    options: ["24", "28", "30", "32"],
    correct: 1,
    formula: "aₙ = a₁·qⁿ⁻¹   ·   log_a(b) = x ⇔ aˣ = b",
    explanation: "a₅ = 2·2⁴ = 32 e log₂(16) = 4. 32 − 4 = 28.",
  },
  {
    topic: "exp",
    topics: ["exp", "log"],
    prompt: "Se log₃(81) + 2ˣ = 20, qual o valor de x?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    formula: "log_a(b) = x ⇔ aˣ = b   ·   2ˣ",
    explanation: "log₃(81) = 4, então 2ˣ = 16 → x = 4.",
  },
  {
    topic: "pa",
    topics: ["pa", "pg"],
    prompt:
      "Compare: a₆ da PA (a₁=2, r=3) e a₄ da PG (a₁=1, q=3). Qual a diferença (PG − PA)?",
    options: ["8", "10", "12", "20"],
    correct: 1,
    formula: "aₙ = a₁+(n−1)·r   ·   aₙ = a₁·qⁿ⁻¹",
    explanation: "a₆(PA) = 2 + 5·3 = 17; a₄(PG) = 1·3³ = 27. 27 − 17 = 10.",
  },
  {
    topic: "log",
    topics: ["log", "pg"],
    prompt: "Calcule: log₂(256) × a₃ da PG (a₁=1, q=2).",
    options: ["16", "24", "32", "64"],
    correct: 2,
    formula: "log_a(b) = x ⇔ aˣ = b   ·   aₙ = a₁·qⁿ⁻¹",
    explanation: "log₂(256) = 8 e a₃ = 1·2² = 4. 8 × 4 = 32.",
  },
  {
    topic: "exp",
    topics: ["exp", "pg"],
    prompt:
      "Multiplique 3² pelo 4º termo da PG (a₁=2, q=2). Resultado?",
    options: ["54", "64", "72", "144"],
    correct: 3,
    formula: "aˣ   ·   aₙ = a₁·qⁿ⁻¹",
    explanation: "3² = 9 e a₄ = 2·2³ = 16. 9 × 16 = 144.",
  },
  {
    topic: "pa",
    topics: ["pa", "exp"],
    prompt: "O firewall a₁₀ (PA: a₁=8, r=4) somado a 2⁶ vale:",
    options: ["100", "108", "112", "128"],
    correct: 1,
    formula: "aₙ = a₁+(n−1)·r   ·   2ˣ",
    explanation: "a₁₀ = 8 + 9·4 = 44 e 2⁶ = 64. 44 + 64 = 108.",
  },
  {
    topic: "log",
    topics: ["log", "exp"],
    prompt: "Se 5ˣ = 125 e log₂(y) = 5, quanto vale x + y?",
    options: ["29", "32", "35", "37"],
    correct: 2,
    formula: "aˣ = b   ·   log_a(b) = x ⇔ aˣ = b",
    explanation: "5³ = 125 → x = 3. log₂(y) = 5 → y = 32. x + y = 35.",
  },
  {
    topic: "pg",
    topics: ["pg", "pa"],
    prompt:
      "Subtraia a₄ da PG (a₁=3, q=2) da soma dos 5 primeiros termos da PA (a₁=4, r=2).",
    options: ["16", "18", "20", "24"],
    correct: 0,
    formula: "aₙ = a₁·qⁿ⁻¹   ·   Sₙ = (a₁+aₙ)·n/2",
    explanation:
      "a₄(PG) = 3·2³ = 24. Na PA: a₅ = 4 + 4·2 = 12; S₅ = (4+12)·5/2 = 40. 40 − 24 = 16.",
  },
];

export function drawBossQuestion(): BossQuestion {
  const q = BOSS_QUESTIONS[Math.floor(Math.random() * BOSS_QUESTIONS.length)];
  return {
    ...q,
    id: `boss-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    source: "fallback",
  };
}
