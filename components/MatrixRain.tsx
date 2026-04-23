"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ0123456789{}[]<>!@#$%&*()=+/\\";

export default function MatrixRain({
  intensity = 0.08,
  speed = 1,
}: {
  intensity?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener("resize", handleResize);

    let lastFrame = 0;
    const frameInterval = 1000 / (30 * speed);

    const draw = (ts: number) => {
      if (ts - lastFrame < frameInterval) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrame = ts;

      ctx.fillStyle = "rgba(5, 5, 10, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() < 0.02) {
          ctx.fillStyle = "rgba(230, 255, 240, 0.85)";
        } else {
          ctx.fillStyle = `rgba(0, 255, 136, ${0.25 + Math.random() * 0.45})`;
        }
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 1 - intensity * 2.5) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.35 }}
      aria-hidden
    />
  );
}
