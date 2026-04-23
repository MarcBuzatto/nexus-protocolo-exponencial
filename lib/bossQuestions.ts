import type { BossQuestion } from "./types";

// Desafios finais curtos. Cada um combina 2 conteúdos mas em 1 passo cada.
export const BOSS_QUESTIONS: Omit<BossQuestion, "id" | "source">[] = [
  {
    topic: "exp",
    topics: ["exp", "log"],
    prompt: "DESAFIO FINAL — Some 2⁵ com log₂(16). Qual o total?",
    options: ["30", "34", "36", "40"],
    correct: 2,
    formula: "2ˣ   ·   log_a(b) = x ⇔ aˣ = b",
    explanation: "2⁵ = 32 e log₂(16) = 4. 32 + 4 = 36.",
  },
  {
    topic: "pa",
    topics: ["pa", "log"],
    prompt: "Some o 4º termo da PA (a₁=2, r=3) com log₂(32).",
    options: ["14", "16", "18", "20"],
    correct: 1,
    formula: "aₙ = a₁+(n−1)·r   ·   log_a(b) = x ⇔ aˣ = b",
    explanation: "a₄ = 2+3·3 = 11 e log₂(32) = 5. Total = 11 + 5 = 16.",
  },
  {
    topic: "pg",
    topics: ["pg", "exp"],
    prompt: "Some 2⁴ com o 3º termo da PG (a₁=2, q=2).",
    options: ["20", "22", "24", "26"],
    correct: 2,
    formula: "2ˣ   ·   aₙ = a₁·qⁿ⁻¹",
    explanation: "2⁴ = 16 e a₃ = 2·2² = 8. 16 + 8 = 24.",
  },
  {
    topic: "log",
    topics: ["log", "pa"],
    prompt: "log₂(64) + 4º termo da PA (a₁=1, r=2) = ?",
    options: ["11", "12", "13", "14"],
    correct: 2,
    formula: "log_a(b)   ·   aₙ = a₁+(n−1)·r",
    explanation: "log₂(64) = 6 e a₄ = 1+3·2 = 7. 6 + 7 = 13.",
  },
  {
    topic: "pa",
    topics: ["pa", "pg"],
    prompt: "5º termo da PA (a₁=3, r=2) + 4º termo da PG (a₁=1, q=2) = ?",
    options: ["15", "18", "19", "22"],
    correct: 2,
    formula: "aₙ(PA) = a₁+(n−1)·r   ·   aₙ(PG) = a₁·qⁿ⁻¹",
    explanation: "a₅(PA) = 3+4·2 = 11. a₄(PG) = 1·2³ = 8. 11 + 8 = 19.",
  },
  {
    topic: "exp",
    topics: ["exp", "pa"],
    prompt: "2⁴ + 3º termo da PA (a₁=5, r=3) = ?",
    options: ["25", "27", "29", "31"],
    correct: 1,
    formula: "2ˣ   ·   aₙ = a₁+(n−1)·r",
    explanation: "2⁴ = 16 e a₃ = 5+2·3 = 11. 16 + 11 = 27.",
  },
  {
    topic: "log",
    topics: ["log", "pg"],
    prompt: "log₂(16) × 3º termo da PG (a₁=1, q=2) = ?",
    options: ["12", "16", "20", "32"],
    correct: 1,
    formula: "log_a(b)   ·   aₙ = a₁·qⁿ⁻¹",
    explanation: "log₂(16) = 4 e a₃ = 1·2² = 4. 4 × 4 = 16.",
  },
  {
    topic: "pg",
    topics: ["pg", "log"],
    prompt: "4º termo da PG (a₁=3, q=2) − log₂(8) = ?",
    options: ["18", "21", "22", "24"],
    correct: 1,
    formula: "aₙ = a₁·qⁿ⁻¹   ·   log_a(b)",
    explanation: "a₄ = 3·2³ = 24 e log₂(8) = 3. 24 − 3 = 21.",
  },
  {
    topic: "exp",
    topics: ["exp", "pg"],
    prompt: "2³ × 3º termo da PG (a₁=1, q=2) = ?",
    options: ["16", "24", "32", "48"],
    correct: 2,
    formula: "2ˣ   ·   aₙ = a₁·qⁿ⁻¹",
    explanation: "2³ = 8 e a₃ = 1·2² = 4. 8 × 4 = 32.",
  },
  {
    topic: "pa",
    topics: ["pa", "exp"],
    prompt: "5º termo da PA (a₁=10, r=5) − 2⁴ = ?",
    options: ["12", "14", "16", "18"],
    correct: 1,
    formula: "aₙ = a₁+(n−1)·r   ·   2ˣ",
    explanation: "a₅ = 10+4·5 = 30. 30 − 16 = 14.",
  },
  {
    topic: "log",
    topics: ["log", "exp"],
    prompt: "Se 5ˣ = 25 e log₂(y) = 4, quanto vale x + y?",
    options: ["14", "16", "18", "20"],
    correct: 2,
    formula: "aˣ = b   ·   log_a(b)",
    explanation: "5² = 25 → x = 2. log₂(y) = 4 → y = 16. 2 + 16 = 18.",
  },
  {
    topic: "pg",
    topics: ["pg", "pa"],
    prompt: "3º termo da PG (a₁=2, q=2) + 4º termo da PA (a₁=3, r=4) = ?",
    options: ["17", "20", "23", "25"],
    correct: 2,
    formula: "aₙ(PG) = a₁·qⁿ⁻¹   ·   aₙ(PA) = a₁+(n−1)·r",
    explanation: "a₃(PG) = 2·2² = 8. a₄(PA) = 3+3·4 = 15. 8 + 15 = 23.",
  },
];

// Conferências matemáticas (índice → resposta correta):
// 1) 32+4=36 (idx 2) ✓
// 2) 11+5=16 (idx 2) ✓
// 3) 16+8=24 (idx 2) ✓
// 4) 6+7=13 (idx 2) ✓
// 5) 11+8=19 (idx 2) ✓
// 6) 16+11=27 (idx 1) ✓
// 7) 4·4=16 (idx 1) ✓
// 8) 24−3=21 (idx 1) ✓
// 9) 8·4=32 (idx 2) ✓
// 10) 30−16=14 (idx 1) ✓
// 11) 2+16=18 (idx 2) ✓
// 12) 8+15=23 (idx 2) ✓

export function drawBossQuestion(): BossQuestion {
  const q = BOSS_QUESTIONS[Math.floor(Math.random() * BOSS_QUESTIONS.length)];
  return {
    ...q,
    id: `boss-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    source: "fallback",
  };
}
