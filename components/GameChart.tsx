"use client";

import {
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { CONFIG, TurnSnapshot } from "@/lib/types";

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
    return {
      turn: t,
      infection: snap?.infection ?? null,
      firewall: snap?.firewall ?? null,
    };
  });

  return (
    <div className="panel panel-corner p-3 sm:p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="hud-label">VÍRUS × DEFESA</span>
        <div className="flex gap-3 text-[10px] tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-cyber-red shadow-neon-red" />
            <span className="text-white/70">vírus</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-matrix shadow-neon-green" />
            <span className="text-white/70">defesa</span>
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-[180px]">
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
            />
            <YAxis
              stroke="rgba(255,255,255,0.25)"
              tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(0, 229, 255, 0.1)" }}
              width={42}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(5, 5, 10, 0.95)",
                border: "1px solid rgba(0, 255, 136, 0.3)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                padding: "6px 10px",
              }}
              labelStyle={{
                color: "#00ff88",
                marginBottom: 2,
                fontSize: 10,
              }}
              itemStyle={{ color: "#d8dee9" }}
              cursor={{ stroke: "rgba(0, 229, 255, 0.2)", strokeWidth: 1 }}
              formatter={(v, n) => [v === null ? "—" : v, n]}
              labelFormatter={(v) => `Turno ${v}`}
            />
            <ReferenceLine
              y={CONFIG.INFECTION_LIMIT}
              stroke="#ff0844"
              strokeDasharray="3 3"
              strokeOpacity={0.5}
              label={{
                value: "1024",
                fill: "#ff0844",
                fontSize: 9,
                position: "insideTopRight",
              }}
            />
            <Area
              type="monotone"
              dataKey="infection"
              stroke="#ff0844"
              strokeWidth={2.5}
              fill="url(#gradRed)"
              name="vírus"
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
              name="defesa"
              dot={{ r: 2.5, fill: "#00ff88", strokeWidth: 0 }}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
