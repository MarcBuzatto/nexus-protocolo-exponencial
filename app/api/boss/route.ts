import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { FALLBACK_BOSS } from "@/lib/questions";
import type { BossQuestion, Topic } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Você é o gerador de desafios finais do jogo NEXUS — Protocolo Exponencial.
O jogador é um hacker enfrentando o vírus REAPER. Você deve gerar UM (1) desafio matemático combinando exatamente 2 dos 4 conteúdos a seguir:
- Função Exponencial (exp)
- Logaritmo (log)
- Progressão Aritmética (pa)
- Progressão Geométrica (pg)

Regras ABSOLUTAS:
1. A resposta correta deve ser um número inteiro entre 1 e 200.
2. Exatamente 4 alternativas, uma correta e três incorretas plausíveis (próximas em magnitude).
3. Use temática cyberpunk/hacker no enunciado (firewall, servidor, pacote, criptografia, REAPER, mainframe, shard, kernel...).
4. Use notação clara e sem LaTeX: expoentes como "2^10" ou "log_2(64)".
5. Dificuldade: nível de ensino médio — resolvível em 45 segundos com caneta.
6. Explicação curta e objetiva (máx. 180 caracteres).

Responda ESTRITAMENTE com JSON válido (sem texto antes ou depois, sem markdown fences):
{
  "prompt": "string",
  "options": ["a","b","c","d"],
  "correct": 0,
  "explanation": "string",
  "topics": ["pa","log"]
}

O campo "correct" é o ÍNDICE (0 a 3) da opção correta. O campo "topics" deve ter exatamente 2 valores distintos entre: "exp","log","pa","pg".`;

function isValidTopic(t: unknown): t is Topic {
  return t === "exp" || t === "log" || t === "pa" || t === "pg";
}

function parseBoss(raw: string): BossQuestion | null {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (
      typeof parsed.prompt !== "string" ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      !parsed.options.every((o: unknown) => typeof o === "string") ||
      typeof parsed.correct !== "number" ||
      parsed.correct < 0 ||
      parsed.correct > 3 ||
      typeof parsed.explanation !== "string"
    ) {
      return null;
    }
    const topics: Topic[] = Array.isArray(parsed.topics)
      ? parsed.topics.filter(isValidTopic).slice(0, 2)
      : ["exp", "log"];
    return {
      id: `boss-ai-${Date.now()}`,
      topic: topics[0] ?? "exp",
      topics: topics.length === 2 ? topics : ["exp", "log"],
      source: "ai",
      prompt: parsed.prompt,
      options: parsed.options,
      correct: parsed.correct,
      explanation: parsed.explanation,
    };
  } catch {
    return null;
  }
}

export async function POST() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ...FALLBACK_BOSS, source: "fallback" satisfies "fallback" },
      { status: 200 },
    );
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content:
            "Gere UM desafio final do REAPER agora. Combine 2 conteúdos diferentes. Responda apenas com o JSON especificado.",
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(FALLBACK_BOSS);
    }
    const boss = parseBoss(textBlock.text);
    if (!boss) return NextResponse.json(FALLBACK_BOSS);
    return NextResponse.json(boss);
  } catch (err) {
    console.error("[boss api]", err);
    return NextResponse.json(FALLBACK_BOSS);
  }
}
