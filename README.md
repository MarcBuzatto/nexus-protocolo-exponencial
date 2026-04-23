# NEXUS — Protocolo Exponencial

> Jogo educativo cyberpunk de matemática. Você é um hacker. O vírus **REAPER** dobra a cada turno. Resolva cálculos de **Exponencial, Logaritmo, PA e PG** antes que 1024 servidores caiam.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-61dafb) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

---

## O jogo

- **1 jogador**, **5–10 min** por partida, 100% navegador
- Cada turno você escolhe **1 de 3 ações**: `PATCH` (Exp), `INTEL` (Log) ou `QUANTUM` (PG)
- Cada ação exige resolver um cálculo. Errou → ação falha e o REAPER cresce do mesmo jeito
- Com **3 pistas** você libera o **BOSS final gerado por IA** (Claude Sonnet)
- **Vence** acertando o desafio final. **Perde** se a infecção chegar em 1024 ou passar do turno 12

## Como rodar localmente

```bash
npm install
cp .env.local.example .env.local   # (opcional) coloque sua chave Anthropic
npm run dev
```

Abra `http://localhost:3000`.

> Sem a chave da Anthropic, o boss usa um desafio local pronto. O jogo é 100% jogável offline.

## Deploy na Vercel

### Opção 1 — via dashboard (mais fácil)
1. Suba este diretório num repositório GitHub/GitLab
2. Em https://vercel.com → **New Project** → importe o repo
3. Em **Environment Variables**, adicione:
   - `ANTHROPIC_API_KEY` = sua chave de https://console.anthropic.com
4. Clique em **Deploy**. Pronto.

### Opção 2 — CLI
```bash
npm install -g vercel
vercel login
vercel              # primeira vez: link e deploy preview
vercel --prod       # deploy em produção
```

Durante o primeiro deploy a CLI pergunta pelas variáveis. Informe a `ANTHROPIC_API_KEY`.

## Estrutura

```
.
├── app/
│   ├── api/boss/route.ts    # API route segura (chave da Anthropic nunca vaza pro cliente)
│   ├── globals.css          # identidade visual cyberpunk (scanlines, neon, glitch)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── NexusGame.tsx        # orquestrador principal
│   ├── IntroScreen.tsx      # boot sequence
│   ├── GameScreen.tsx       # HUD + gráfico + ações
│   ├── GameChart.tsx        # infecção vs firewall em tempo real (Recharts)
│   ├── ChallengeModal.tsx   # pergunta matemática com timer
│   ├── BossScreen.tsx       # desafio final gerado por IA
│   ├── EndScreen.tsx        # vitória/derrota + score + share
│   ├── MatrixRain.tsx       # chuva de caracteres no fundo (Canvas)
│   └── ...                  # StatCard, ActionButton, EventLog, ui/
├── lib/
│   ├── types.ts             # GameState, Question, config
│   ├── questions.ts         # banco de 32 questões (8 por conteúdo)
│   └── gameLogic.ts         # funções puras: startChallenge, resolveChallenge...
└── vercel.json              # regiões, timeouts de função
```

## Matemática por dentro

| Conteúdo | Onde aparece |
|----------|--------------|
| **Função Exponencial** | Infecção do REAPER: `I(t) = 2ᵗ`. Ação `PATCH` cobra cálculos de potências. |
| **Logaritmo** | Ação `INTEL`. Fórmula `t = log₂(1024 / I)` dá quantos turnos restam. |
| **PA** | Firewall: `a₁=10, r=5` → `aₙ = a₁ + (n−1)·r`. |
| **PG** | Ataque QUANTUM: dano = `2^streak`. Soma da PG entra no score final. |

O **gráfico em tempo real** mostra:
- 🔴 **REAPER 2ᵗ** (exponencial) — linha vermelha
- 🟢 **Firewall 10 + 5t** (PA) — linha verde
- 🟣 **Agora** — marcador do turno atual

## Atalhos de teclado

- `1` / `F1` → PATCH
- `2` / `F2` → INTEL
- `3` / `F3` → QUANTUM

## Autores

**Marc Correa Buzatto** · **João Pedro Sandi** · **Bruno Neiva Puntoni** · **Giovanne Silva**
Senac Lapa Tito — Técnico em IA — 2º ano

---

_Stack_: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Recharts · Framer Motion · Lucide · Anthropic SDK
