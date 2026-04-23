"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CONFIG, TurnSnapshot } from "@/lib/types";

function projectedInfection(maxTurn: number) {
  const data: { turn: number; proj: number }[] = [];
  for (let t = 0; t <= maxTurn; t++) {
    data.push({ turn: t, proj: Math.pow(2, t) });
  }
  return data;
}

function projectedFirewall(maxTurn: number) {
  const data: { turn: number; fw: number }[] = [];
  for (let t = 0; t <= maxTurn; t++) {
    data.push({ turn: t, fw: 10 + 5 * t });
  }
  return data;
}

export default function GameChart({
  history,
  currentTurn,
}: {
  history: TurnSnapshot[];
  currentTurn: number;
}) {
  const maxTurn = Math.max(CONFIG.MAX_TURNS, currentTurn);

  const data = Array.from({ length: maxTurn + 1 }).map((_, t) => {
    const snap = history.find((h) => h.turn === t);
    const projInf = Math.pow(2, t);
    const projFw = 10 + 5 * t;
    return {
      turn: t,
      infection: snap?.infection ?? null,
      firewall: snap?.firewall ?? null,
      projInfection: projInf,
      projFirewall: projFw,
    };
  });

  return (
    <div className="panel panel-corner p-3 sm:p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="hud-label">VETOR DE AMEAÇA</div>
        <div className="flex gap-3 text-[10px] tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-cyber-red shadow-neon-red" />
            <span className="text-white/70">REAPER 2ᵗ</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-matrix shadow-neon-green" />
            <span className="text-white/70">FIREWALL</span>
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 6, right: 10, bottom: 6, left: -10 }}
          >
            <defs>
              <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff0844" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#ff0844" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00ff88" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="rgba(0, 229, 255, 0.06)"
              strokeDasharray="2 4"
              vertical={false}
            />
            <XAxis
              dataKey="turn"
              stroke="rgba(255,255,255,0.25)"
              tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(0, 229, 255, 0.1)" }}
              label={{
                value: "t",
                position: "insideBottomRight",
                offset: -2,
                fill: "rgba(255,255,255,0.4)",
                fontSize: 10,
              }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.25)"
              tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(0, 229, 255, 0.1)" }}
              width={48}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(5, 5, 10, 0.95)",
                border: "1px solid rgba(0, 255, 136, 0.3)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                padding: "8px 12px",
                boxShadow: "0 0 24px rgba(0, 255, 136, 0.2)",
              }}
              labelStyle={{
                color: "#00ff88",
                marginBottom: 4,
                fontSize: 10,
                letterSpacing: "0.1em",
              }}
              itemStyle={{ color: "#d8dee9" }}
              cursor={{ stroke: "rgba(0, 229, 255, 0.3)", strokeWidth: 1 }}
              formatter={(v, n) => [v === null ? "—" : v, n]}
              labelFormatter={(v) => `TURNO ${v}`}
            />
            <ReferenceLine
              y={CONFIG.INFECTION_LIMIT}
              stroke="#ff0844"
              strokeDasharray="3 3"
              strokeOpacity={0.6}
              label={{
                value: "LIMITE 1024",
                fill: "#ff0844",
                fontSize: 9,
                position: "insideTopRight",
              }}
            />
            <ReferenceLine
              x={currentTurn}
              stroke="#b347ff"
              strokeDasharray="2 3"
              strokeOpacity={0.7}
              label={{
                value: "AGORA",
                fill: "#b347ff",
                fontSize: 9,
                position: "top",
              }}
            />
            <Area
              type="monotone"
              dataKey="projInfection"
              stroke="rgba(255, 8, 68, 0.35)"
              strokeDasharray="3 3"
              strokeWidth={1}
              fill="none"
              name="projeção"
              isAnimationActive={false}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="infection"
              stroke="#ff0844"
              strokeWidth={2.5}
              fill="url(#gradRed)"
              name="REAPER"
              dot={{ r: 3, fill: "#ff0844", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#ff3860" }}
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="firewall"
              stroke="#00ff88"
              strokeWidth={2}
              fill="url(#gradGreen)"
              name="FIREWALL"
              dot={{ r: 2.5, fill: "#00ff88", strokeWidth: 0 }}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
