"use client";

import ThreadMark from "../components/ThreadMark";
import type { Screen } from "../types";

interface Props {
  go: (s: Screen) => void;
}

export default function TopScreen({ go }: Props) {
  return (
    <div className="screen">
      <div className="screen-scroll">
        <div
          style={{
            padding: "clamp(20px,5vh,52px) 26px 26px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="bob" style={{ marginBottom: 18 }}>
            <ThreadMark size={84} />
          </div>
          <h1
            className="serif fade-up"
            style={{
              fontSize: 46,
              fontWeight: 400,
              margin: "0 0 6px",
              letterSpacing: "0.06em",
              color: "var(--ink)",
            }}
          >
            つむぐ
          </h1>
          <p
            className="fade-up"
            style={{
              fontSize: 14.5,
              color: "var(--ink-2)",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            かずを言わずに、お題で例えて
            <br />
            ちいさい順に出していく協力ゲーム
          </p>

          <div
            className="row gap8 center"
            style={{ margin: "30px 0 34px", justifyContent: "center" }}
          >
            {[7, 42, 88].map((n, i) => (
              <div
                key={i}
                style={{
                  transform: `rotate(${(i - 1) * 7}deg) translateY(${i === 1 ? -6 : 0}px)`,
                }}
              >
                <div
                  className="panel"
                  style={{
                    width: 58,
                    height: 80,
                    display: "grid",
                    placeItems: "center",
                    background: i === 1 ? "var(--thread)" : "var(--card)",
                  }}
                >
                  {i === 1 ? (
                    <ThreadMark size={26} stroke="rgba(255,255,255,0.95)" />
                  ) : (
                    <span style={{ fontFamily: "var(--num)", fontSize: 26, color: "var(--ink)" }}>
                      {n}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="stack gap12" style={{ width: "100%", maxWidth: 320 }}>
            <button className="btn btn-thread" onClick={() => go("create")}>
              <span>🧶</span> ルームを作る
            </button>
            <button className="btn btn-ghost" onClick={() => go("join")}>
              あいことばで参加
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => go("rules")}
              style={{ borderStyle: "dashed" }}
            >
              あそびかた
            </button>
          </div>
        </div>
      </div>
      <div className="tc" style={{ padding: "10px 0 18px", fontSize: 11, color: "var(--ink-3)" }}>
        <span className="mono">2〜10人 · 5分でわかる</span>
      </div>
    </div>
  );
}
