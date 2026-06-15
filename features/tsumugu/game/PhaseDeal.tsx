"use client";

import { useState } from "react";
import NumberCard from "../components/NumberCard";
import ThemeCard from "../components/ThemeCard";
import type { Player, Theme } from "../types";

interface Props {
  players: Player[];
  theme: Theme;
  onNext: () => void;
}

export default function PhaseDeal({ players, theme, onNext }: Props) {
  const me = players.find((p) => p.you)!;
  const others = players.filter((p) => !p.you);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="grow stack" style={{ padding: "0 20px 20px" }}>
      <ThemeCard theme={theme} compact />
      <div
        className="grow stack center"
        style={{ justifyContent: "center", gap: 12, padding: "12px 0" }}
      >
        <p
          style={{
            fontSize: 13,
            color: "var(--ink-2)",
            textAlign: "center",
            margin: 0,
          }}
        >
          {revealed
            ? "これがあなたの数字。だれにも言わないで！"
            : "カードをタップして数字を確認"}
        </p>
        <div className={revealed ? "" : "bob"}>
          <NumberCard
            value={me.value}
            revealed={revealed}
            low={theme.low}
            high={theme.high}
            onFlip={() => setRevealed(true)}
          />
        </div>
        <div className="row gap8 center" style={{ justifyContent: "center" }}>
          {others.map((p, i) => (
            <div key={i} className="stack center" style={{ gap: 5 }}>
              <NumberCard value={p.value} revealed={false} small />
              <span
                style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="btn btn-thread"
        disabled={!revealed}
        onClick={onNext}
        style={{ width: "100%" }}
      >
        {revealed ? "例えを考える →" : "数字を確認してね"}
      </button>
    </div>
  );
}
