"use client";

import { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import ThemeCard from "../components/ThemeCard";
import TypingDots from "../components/TypingDots";
import { botAnswerFor } from "../data";
import type { Player, Theme } from "../types";

interface Props {
  players: Player[];
  theme: Theme;
  onNext: () => void;
  onSetAnswer: (playerIdx: number, answer: string) => void;
}

export default function PhaseAnswer({ players, theme, onNext, onSetAnswer }: Props) {
  const me = players.find((p) => p.you)!;
  // players は常に [me, bot1, bot2, ...] の順: me=0, bots=1+
  const bots = players.filter((p) => !p.you);

  const [text, setText] = useState(me.answer || "");
  const [submitted, setSubmitted] = useState(false);
  const [botDone, setBotDone] = useState(() => bots.map(() => false));

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    bots.forEach((b, i) => {
      timers.push(
        setTimeout(
          () => {
            onSetAnswer(i + 1, botAnswerFor(theme.title, b.value));
            setBotDone((d) => {
              const n = [...d];
              n[i] = true;
              return n;
            });
          },
          1400 + i * 1100 + Math.random() * 700,
        ),
      );
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = () => {
    onSetAnswer(0, text.trim());
    setSubmitted(true);
  };

  const allBotsDone = botDone.every(Boolean);
  const ready = submitted && allBotsDone;

  return (
    <div className="grow stack" style={{ padding: "0 20px 20px", minHeight: 0 }}>
      <ThemeCard theme={theme} compact />
      <div className="grow" style={{ overflowY: "auto", margin: "14px 0", minHeight: 0 }}>
        {/* my input */}
        <div
          className="panel"
          style={{ padding: "14px 16px", marginBottom: 14, border: "1.5px solid var(--thread)" }}
        >
          <div className="spread" style={{ marginBottom: 10 }}>
            <div className="row gap8 center">
              <Avatar name={me.name} hue={me.hue} you size={30} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>あなたの例え</span>
            </div>
            <span style={{ fontFamily: "var(--num)", fontSize: 20, color: "var(--thread)" }}>
              {me.value}
            </span>
          </div>
          {submitted ? (
            <div className="row gap8 center">
              <span style={{ fontSize: 15, fontWeight: 600 }}>
                「{text || "（こっそり伝えた）"}」
              </span>
              <button
                className="btn btn-chip btn-sm"
                onClick={() => setSubmitted(false)}
                style={{ marginLeft: "auto", padding: "5px 10px", fontSize: 12 }}
              >
                なおす
              </button>
            </div>
          ) : (
            <div className="stack gap10">
              <textarea
                className="input"
                value={text}
                rows={2}
                maxLength={40}
                onChange={(e) => setText(e.target.value)}
                placeholder={`例：${theme.low}〜${theme.high}のどのへん？`}
                style={{ resize: "none", fontFamily: "var(--sans)" }}
              />
              <button className="btn btn-thread btn-sm" style={{ width: "100%" }} onClick={submit}>
                これで伝える
              </button>
            </div>
          )}
        </div>

        {/* others */}
        <div className="eyebrow" style={{ margin: "0 0 8px 2px" }}>
          みんなの様子
        </div>
        <div className="stack gap8">
          {bots.map((b, i) => (
            <div key={i} className="panel" style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={b.name} hue={b.hue} size={30} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>{b.name}</span>
              <div className="grow" />
              {botDone[i] ? (
                <span className="pop" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                  「{b.answer}」
                </span>
              ) : (
                <TypingDots />
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-thread" disabled={!ready} onClick={onNext}>
        {!submitted
          ? "まず自分の例えを入力"
          : !allBotsDone
            ? "みんなの入力を待っています…"
            : "相談する 🤝"}
      </button>
    </div>
  );
}
