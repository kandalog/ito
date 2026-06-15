"use client";

import ThemeCard from "../components/ThemeCard";
import type { Theme } from "../types";

interface Props {
  theme: Theme;
  onNext: () => void;
}

export default function PhaseTheme({ theme, onNext }: Props) {
  return (
    <div className="grow stack" style={{ padding: "0 20px 20px", justifyContent: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>
          今回のお題は…
        </div>
      </div>
      <div className="bob">
        <ThemeCard theme={theme} />
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "var(--ink-2)",
          margin: "20px 0 0",
          lineHeight: 1.7,
        }}
      >
        この尺度で、自分の数字を
        <br />
        ことばに変えていきます
      </p>
      <button className="btn btn-thread" style={{ marginTop: 24 }} onClick={onNext}>
        数字をくばる 🃏
      </button>
    </div>
  );
}
