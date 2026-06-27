"use client";

import { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Lives from "../components/Lives";
import type { ResultData, Screen } from "../types";

interface Props {
  go: (s: Screen) => void;
  result: ResultData;
  round: number;
  onNext: () => void;
}

export default function ResultScreen({ go, result, onNext }: Props) {
  const [reveal, setReveal] = useState(0);
  const ordered = result.ordered;

  useEffect(() => {
    setReveal(0);
    let i = 0;
    const tick = () => {
      i++;
      setReveal(i);
      if (i < ordered.length) setTimeout(tick, 480);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [result, ordered.length]);

  const done = reveal >= ordered.length;
  const success = result.success;

  return (
    <div className="screen">
      <div className="screen-scroll" style={{ padding: "0 18px 16px" }}>
        <div className="tc" style={{ padding: "26px 0 18px" }}>
          {done && (
            <div className="pop">
              <div style={{ fontSize: 46, marginBottom: 4 }}>{success ? "🎉" : "💧"}</div>
              <h2
                className="serif"
                style={{
                  fontSize: 32,
                  margin: "0 0 4px",
                  fontWeight: 400,
                  color: success ? "var(--midori)" : "var(--shu)",
                }}
              >
                {success ? "せいこう！" : "ざんねん…"}
              </h2>
              <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0 }}>
                {success ? "きれいに糸がつながりました" : "順番がいれかわっちゃった"}
              </p>
            </div>
          )}
          {!done && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>
                けっか発表
              </div>
              <p className="serif" style={{ fontSize: 22, margin: 0 }}>
                ちいさい順に…
              </p>
            </div>
          )}
        </div>

        <div className="stack gap8">
          {ordered.map((p, i) => {
            const shown = i < reveal;
            const isMistake = done && !success && result.mistakeIdx.includes(i);
            return (
              <div
                key={i}
                className="panel"
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: shown ? 1 : 0.35,
                  transition: "all .4s",
                  border: "1.5px solid",
                  borderColor: isMistake ? "var(--shu)" : "var(--card-edge)",
                  background: isMistake ? "var(--shu-soft)" : "var(--card)",
                  transform: shown ? "none" : "translateX(-6px)",
                }}
              >
                <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)", width: 18 }}>
                  {i + 1}
                </span>
                <Avatar name={p.name} hue={p.hue} you={p.you} size={36} />
                <div className="grow" style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    {p.name}
                    {p.you && (
                      <span style={{ color: "var(--thread)", fontSize: 11 }}> (あなた)</span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--ink-2)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    「{p.answer || "—"}」
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--num)",
                    fontSize: 28,
                    lineHeight: 1,
                    color: shown ? "var(--ink)" : "transparent",
                    minWidth: 44,
                    textAlign: "right",
                    transition: "color .3s",
                  }}
                >
                  {shown ? p.value : "??"}
                </span>
              </div>
            );
          })}
        </div>

        {done && (
          <div className="row gap8 center fade-in" style={{ justifyContent: "center", marginTop: 16 }}>
            <Lives total={3} left={success ? 3 : 2} />
            <span style={{ fontSize: 12, color: "var(--ink-3)" }}>
              {success ? "ライフはそのまま" : "ライフ −1"}
            </span>
          </div>
        )}
      </div>

      {done && (
        <div
          style={{ padding: "10px 20px 20px", flexShrink: 0 }}
          className="stack gap10 fade-up"
        >
          <button className="btn btn-thread" onClick={onNext}>
            つぎのお題へ →
          </button>
          <button className="btn btn-ghost" onClick={() => go("top")}>
            トップにもどる
          </button>
        </div>
      )}
    </div>
  );
}
