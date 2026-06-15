"use client";

import type { Theme } from "../types";

interface Props {
  theme: Theme | null;
  compact?: boolean;
}

export default function ThemeCard({ theme, compact }: Props) {
  if (!theme) return null;
  return (
    <div
      className="panel fade-up"
      style={{
        padding: compact ? "14px 18px" : "26px 24px",
        textAlign: "center",
        background: "var(--card)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="eyebrow" style={{ marginBottom: compact ? 6 : 12 }}>
        お題
      </div>
      <div
        className="serif"
        style={{
          fontSize: compact ? 22 : 30,
          fontWeight: 600,
          lineHeight: 1.25,
          color: "var(--ink)",
        }}
      >
        {theme.title}
      </div>
      {!compact && theme.sub && (
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 8 }}>{theme.sub}</div>
      )}
      <div
        className="row gap12 center"
        style={{ justifyContent: "center", marginTop: compact ? 10 : 18 }}
      >
        <span className="scale-chip low">
          1 · {theme.low}
        </span>
        <div
          style={{
            flex: 1,
            maxWidth: 90,
            height: 2,
            borderRadius: 2,
            background: "linear-gradient(90deg, var(--ink-3), var(--thread))",
          }}
        />
        <span className="scale-chip high">
          {theme.high} · 100
        </span>
      </div>
    </div>
  );
}
