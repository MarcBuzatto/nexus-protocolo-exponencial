"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 18,
  onDone,
  className = "",
  cursor = true,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
  cursor?: boolean;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    setOut("");
    let i = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i++;
        setTimeout(tick, speed);
      } else if (onDone) {
        onDone();
      }
    };
    tick();
    return () => {
      cancelled = true;
    };
  }, [text, speed, onDone]);

  return (
    <span className={`${className} ${cursor ? "terminal-cursor" : ""}`}>
      {out}
    </span>
  );
}
