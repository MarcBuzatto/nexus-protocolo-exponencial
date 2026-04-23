# NEXUS — Protocolo Exponencial

> Jogo educativo cyberpunk de matemática. Você é um hacker. O vírus **REAPER** dobra a cada turno. Resolva cálculos de **Exponencial, Logaritmo, PA e PG** antes que 1024 servidores caiam.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-61dafb) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

---

## O jogo

- **1 jogador**, **5–10 min** por partida, 100% navegador, **sem cadastro, sem backend, sem custo**
- Cada turno você escolhe **1 de 3 ações**: `PATCH` (Exp), `INTEL` (Log) ou `QUANTUM` (PG)
- Cada ação exige resolver um cálculo. Errou → ação falha e o REAPER cresce do mesmo jeito
- Com **3 pistas** você libera o **BOSS final** — um desafio que combina 2 dos 4 conteúdos
- **Vence** acertando o desafio final. **Perde** se a infecção chegar em 1024 ou passar do turno 12

## Feito para sala de aula

- **Manual de instruções** completo dentro do jogo (botão **Como Jogar**), com as fórmulas explicadas
- **Tutorial automático** na primeira visita
- **Painel de referência** de fórmulas sempre disponível durante o jogo
- **Timer generoso** (45s nos desafios, 60s no boss)
- Cada pergunta tem botão **"mostrar fórmula"** — ótimo para alunos que estão aprendendo
- Explicação detalhada depois de cada resposta (acertada ou errada)

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Não precisa de chave de API, não precisa de `.env`. 100% offline depois de baixar.

## Deploy na Vercel

### Opção 1 — via dashboard (mais fácil)
1. Importe o repositório do GitHub em https://vercel.com/new
2. Clique em **Deploy**. Pronto.

### Opção 2 — CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Estrutura

```
.
├── app/
│   ├── globals.css          # identidade visual cyberpunk (scanlines, neon, glitch)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── NexusGame.tsx        # orquestrador principal
│   ├── IntroScreen.tsx      # boot sequence estilo terminal hacker
│   ├── GameScreen.tsx       # HUD + gráfico + ações
│   ├── GameChart.tsx        # infecção vs firewall em tempo real (Recharts)
│   ├── ChallengeModal.tsx   # pergunta matemática com timer e fórmula
│   ├── BossScreen.tsx       # desafio final combinando 2 conteúdos
│   ├── EndScreen.tsx        # vitória/derrota + score + share
│   ├── HowToPlayModal.tsx   # manual completo em 8 seções
│   ├── FormulaReference.tsx # painel de fórmulas colapsável
│   ├── MatrixRain.tsx       # chuva de caracteres no fundo (Canvas)
│   └── ...                  # StatCard, ActionButton, EventLog, ui/
└── lib/
    ├── types.ts             # GameState, Question, config
    ├── questions.ts         # banco de 32 questões (8 por conteúdo)
    ├── bossQuestions.ts     # banco de 12 desafios finais (cada um combina 2 conteúdos)
    └── gameLogic.ts         # funções puras: startChallenge, resolveChallenge...
```

## Matemática por dentro

| Conteúdo | Onde aparece |
|----------|--------------|
| **Função Exponencial** | Infecção do REAPER: `I(t) = 2ᵗ`. Ação `PATCH` cobra cálculos de potências. |
| **Logaritmo** | Ação `INTEL`. Fórmula `t = log₂(1024 / I)` dá quantos turnos restam. |
| **PA** | Firewall: `a₁=10, r=5` → `aₙ = a₁ + (n−1)·r`. |
| **PG** | Ataque QUANTUM: dano = `2^streak`. |

O **gráfico em tempo real** mostra:
- 🔴 **REAPER 2ᵗ** (exponencial) — linha vermelha
- 🟢 **Firewall 10 + 5t** (PA) — linha verde
- 🟣 **Agora** — marcador do turno atual

## Atalhos de teclado

- `1` / `F1` → PATCH
- `2` / `F2` → INTEL
- `3` / `F3` → QUANTUM
- `?` ou `H` → Abrir manual

## Autores

**Marc Correa Buzatto** · **João Pedro Sandi** · **Bruno Neiva Puntoni** · **Giovanne Silva**
Senac Lapa Tito — Técnico em IA — 2º ano

---

_Stack_: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Recharts · Framer Motion · Lucide
