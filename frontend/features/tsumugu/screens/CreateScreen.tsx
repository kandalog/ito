"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import { CATEGORIES } from "../data";
import type { GameSetup, Screen } from "../types";

interface Props {
  go: (s: Screen) => void;
  setup: GameSetup;
  setSetup: (s: GameSetup) => void;
}

export default function CreateScreen({ go, setup, setSetup }: Props) {
  const [name, setName] = useState(setup.you || "");
  const [count, setCount] = useState<number | null>(setup.count ?? null);
  const [cat, setCat] = useState(setup.cat || "teiban");

  const canStart = name.trim().length > 0;

  const create = () => {
    setSetup({
      ...setup,
      you: name.trim(),
      count,
      cat,
      code: Math.random().toString(36).slice(2, 6).toUpperCase(),
    });
    go("lobby");
  };

  return (
    <div className="screen">
      <TopBar title="ルームを作る" onBack={() => go("top")} />
      <div className="screen-scroll" style={{ padding: "4px 20px 20px" }}>
        <div className="stack gap20">
          <div className="field">
            <label>あなたの名前</label>
            <input
              className="input"
              value={name}
              maxLength={8}
              onChange={(e) => setName(e.target.value)}
              placeholder="ニックネーム（8文字まで）"
            />
          </div>

          <div className="field">
            <label>
              人数{" "}
              <span className="mono" style={{ color: "var(--thread)", fontWeight: 700 }}>
                {count == null ? "決めない" : count + "人"}
              </span>
            </label>
            <div className="panel" style={{ padding: "16px 18px" }}>
              <input
                type="range"
                min={2}
                max={10}
                value={count ?? 4}
                onChange={(e) => setCount(+e.target.value)}
                style={{
                  width: "100%",
                  accentColor: "var(--thread)",
                  opacity: count == null ? 0.4 : 1,
                }}
              />
              <div
                className="spread mono"
                style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}
              >
                <span>2</span>
                <span>10</span>
              </div>
              <div className="row gap8 center" style={{ marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setCount(count == null ? 4 : null)}
                  className="btn btn-chip btn-sm"
                  style={{
                    borderColor: count == null ? "var(--thread)" : "var(--line)",
                    color: count == null ? "var(--thread)" : "var(--ink-2)",
                    background:
                      count == null
                        ? "color-mix(in oklch, var(--thread) 12%, transparent)"
                        : "var(--card)",
                    fontWeight: 700,
                  }}
                >
                  {count == null ? "✓ 決めない" : "決めない"}
                </button>
                <span style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5 }}>
                  あとから自由に参加できます
                </span>
              </div>
            </div>
          </div>

          <div className="field">
            <label>お題カテゴリ</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className="panel"
                  style={{
                    padding: "14px 14px",
                    textAlign: "left",
                    cursor: "pointer",
                    border: "1.5px solid",
                    borderColor: cat === c.id ? c.color : "var(--card-edge)",
                    background: "var(--card)",
                    boxShadow:
                      cat === c.id
                        ? `0 0 0 3px color-mix(in oklch, ${c.color} 16%, transparent)`
                        : "var(--shadow-sm)",
                    transition: "all .15s",
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 4,
                      background: c.color,
                      marginBottom: 8,
                    }}
                  />
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>
                    {c.themes.length}テーマ
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 20px 20px", flexShrink: 0 }}>
        <button className="btn btn-thread" disabled={!canStart} onClick={create}>
          ルームをつくる →
        </button>
      </div>
    </div>
  );
}
