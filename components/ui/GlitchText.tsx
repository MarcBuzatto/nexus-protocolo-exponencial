"use client";

import { ReactNode, createElement } from "react";

export default function GlitchText({
  children,
  as = "span",
  className = "",
  active = true,
  dataText,
}: {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  active?: boolean;
  dataText?: string;
}) {
  const text =
    dataText ?? (typeof children === "string" ? children : undefined);

  return createElement(
    as,
    {
      className: `relative inline-block ${active ? "glitch-active" : ""} ${className}`,
      "data-text": text,
    },
    children,
  );
}
