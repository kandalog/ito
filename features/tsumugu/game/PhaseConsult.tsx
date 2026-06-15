"use client";

import { useState, useEffect, useRef } from "react";
import Avatar from "../components/Avatar";
import ThreadMark from "../components/ThreadMark";
import { BOT_CHATTER, REACTIONS } from "../data";
import type { ChatMessage, Player, ResultData, Theme } from "../types";

const CUES = ["私は上かも", "まんなか", "私は下かも", "あいだ空いてる？"];
const STRIDE = 66;

const chevBtn: React.CSSProperties = {
  width: 22,
  height: 18,
  border: "1px solid var(--line)",
  borderRadius: 6,
  background: "var(--card)",
  color: "var(--ink-2)",
  fontSize: 8,
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  lineHeight: 1,
};

interface Props {
  players: Player[];
  theme: Theme;
  onFinish: (r: ResultData) => void;
}

export default function PhaseConsult({ players, theme, onFinish }: Props) {
  const me = players.find((p) => p.you)!;
  const bots = players.filter((p) => !p.you);
  const [feed, setFeed] = useState<ChatMessage[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bots.forEach((b, i) => {
      const text = BOT_CHATTER[Math.floor(Math.random() * BOT_CHATTER.length)];
      const t = setTimeout(
        () => setFeed((f) => [...f, { who: b.name, hue: b.hue, text }]),
        700 + i * 1300,
      );
      return () => clearTimeout(t);
    });
  }, []);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [feed]);

  const sendReaction = (emo: string) =>
    setFeed((f) => [
      ...f,
      { who: me.name, hue: me.hue, text: emo, you: true, reaction: true },
    ]);
  const sendCue = (text: string) =>
    setFeed((f) => [...f, { who: me.name, hue: me.hue, text, you: true }]);

  const [order, setOrder] = useState<number[]>(() => {
    const arr = players.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragDy, setDragDy] = useState(0);
  const orderRef = useRef(order);

  // render後にrefを同期する（render中のref書き込み禁止のため）
  useEffect(() => {
    orderRef.current = order;
  });

  const startDrag = (e: React.PointerEvent, pos: number) => {
    e.preventDefault();
    const startY = e.clientY;
    let curPos = pos;
    setDragIdx(pos);
    setDragDy(0);

    const move = (ev: PointerEvent) => {
      const dy = ev.clientY - startY;
      const shift = Math.round(dy / STRIDE);
      const target = Math.max(
        0,
        Math.min(orderRef.current.length - 1, curPos + shift),
      );
      if (target !== curPos) {
        const next = [...orderRef.current];
        const [m] = next.splice(curPos, 1);
        next.splice(target, 0, m);
        orderRef.current = next;
        setOrder(next);
        setDragIdx(target);
        curPos = target;
        setDragDy(dy - shift * STRIDE);
      } else {
        setDragDy(dy);
      }
    };
    const up = () => {
      setDragIdx(null);
      setDragDy(0);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const moveBtn = (pos: number, dir: number) => {
    const t = pos + dir;
    if (t < 0 || t >= order.length) return;
    const next = [...order];
    [next[pos], next[t]] = [next[t], next[pos]];
    setOrder(next);
  };

  const reveal = () => {
    const ordered = order.map((i) => players[i]);
    const mistakeIdx: number[] = [];
    let ok = true;
    for (let i = 1; i < ordered.length; i++) {
      if (ordered[i].value < ordered[i - 1].value) {
        ok = false;
        mistakeIdx.push(i);
      }
    }
    onFinish({ success: ok, ordered, mistakeIdx });
  };

  return (
    <div
      className="grow stack"
      style={{ padding: "0 16px 14px", minHeight: 0 }}
    >
      {/* arrange area */}
      <div className="tc" style={{ padding: "2px 0 8px", flexShrink: 0 }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>
          ちいさい順にならべよう
        </div>
        <div className="row gap8 center" style={{ justifyContent: "center" }}>
          <span className="scale-chip low">↑ {theme.low}</span>
          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>
            ドラッグ／▲▼で入れ替え
          </span>
          <span className="scale-chip high">{theme.high} ↓</span>
        </div>
      </div>

      <div
        className="grow"
        style={{ overflowY: "auto", minHeight: 148, flex: "1 1 56%" }}
      >
        <div className="stack" style={{ gap: 6 }}>
          {order.map((pi, pos) => {
            const p = players[pi];
            const dragging = dragIdx === pos;
            return (
              <div
                key={pi}
                style={{
                  transform: dragging
                    ? `translateY(${dragDy}px) scale(1.02)`
                    : "none",
                  transition: dragging
                    ? "none"
                    : "transform .22s cubic-bezier(.2,.8,.2,1)",
                  zIndex: dragging ? 5 : 1,
                  position: "relative",
                  touchAction: "none",
                }}
              >
                <div
                  className="panel"
                  style={{
                    height: 60,
                    padding: "0 12px 0 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    boxShadow: dragging
                      ? "var(--shadow-lg)"
                      : "var(--shadow-sm)",
                    border: dragging
                      ? "1.5px solid var(--thread)"
                      : "1px solid var(--card-edge)",
                  }}
                >
                  <div
                    onPointerDown={(e) => startDrag(e, pos)}
                    style={{
                      padding: "10px 6px",
                      cursor: "grab",
                      touchAction: "none",
                      color: "var(--ink-3)",
                    }}
                  >
                    <svg
                      width="14"
                      height="22"
                      viewBox="0 0 14 22"
                      fill="currentColor"
                    >
                      {[4, 11, 18].map((y) =>
                        [3, 11].map((x) => (
                          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />
                        )),
                      )}
                    </svg>
                  </div>
                  <span
                    className="mono"
                    style={{
                      fontSize: 12,
                      color: "var(--thread)",
                      fontWeight: 700,
                      width: 14,
                    }}
                  >
                    {pos + 1}
                  </span>
                  <Avatar name={p.name} hue={p.hue} you={p.you} size={32} />
                  <div className="grow" style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>
                      {p.name}
                      {p.you && (
                        <span style={{ color: "var(--thread)", fontSize: 10 }}>
                          {" "}
                          (あなた)
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--ink-2)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      「{p.answer || "—"}」
                    </div>
                  </div>
                  <div
                    style={{
                      width: 26,
                      height: 38,
                      borderRadius: 7,
                      background: "var(--thread)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ThreadMark size={13} stroke="rgba(255,255,255,0.9)" />
                  </div>
                  <div className="stack" style={{ gap: 2 }}>
                    <button
                      onClick={() => moveBtn(pos, -1)}
                      disabled={pos === 0}
                      aria-label="上へ"
                      style={chevBtn}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveBtn(pos, 1)}
                      disabled={pos === order.length - 1}
                      aria-label="下へ"
                      style={chevBtn}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* chat dock */}
      <div style={{ flexShrink: 0, marginTop: 10 }}>
        <div className="row gap8 center" style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 13 }}>💬</span>
          <span style={{ fontWeight: 700, fontSize: 12.5 }}>そうだん</span>
          <span style={{ fontSize: 10.5, color: "var(--ink-3)" }}>
            数字は言わずに、感覚をすり合わせよう
          </span>
        </div>
        <div
          ref={scrollerRef}
          style={{
            height: 110,
            overflowY: "auto",
            background: "var(--paper-2)",
            borderRadius: 16,
            padding: "12px 12px",
            marginBottom: 8,
          }}
        >
          {feed.length === 0 && (
            <div
              className="tc"
              style={{ fontSize: 11, color: "var(--ink-3)", paddingTop: 26 }}
            >
              リアクションやひとことで、順番のヒントを出し合おう
            </div>
          )}
          <div className="stack gap8">
            {feed.map((m, i) => (
              <div
                key={i}
                className="row gap8 pop"
                style={{
                  justifyContent: m.you ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                }}
              >
                {!m.you && <Avatar name={m.who} hue={m.hue} size={24} />}
                <div
                  style={{
                    maxWidth: "74%",
                    background: m.you ? "var(--thread)" : "var(--card)",
                    color: m.you ? "#fffaf6" : "var(--ink)",
                    padding: m.reaction ? "5px 11px" : "8px 12px",
                    borderRadius: 14,
                    borderBottomRightRadius: m.you ? 4 : 14,
                    borderBottomLeftRadius: m.you ? 14 : 4,
                    fontSize: m.reaction ? 20 : 13.5,
                    fontWeight: 500,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="row gap6"
          style={{ overflowX: "auto", marginBottom: 7 }}
        >
          {REACTIONS.map((e) => (
            <button
              key={e}
              onClick={() => sendReaction(e)}
              style={{
                flexShrink: 0,
                width: 38,
                height: 38,
                borderRadius: 12,
                border: "1.5px solid var(--line)",
                background: "var(--card)",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              {e}
            </button>
          ))}
        </div>
        <div
          className="row gap6"
          style={{ overflowX: "auto", marginBottom: 10 }}
        >
          {CUES.map((c) => (
            <button
              key={c}
              className="btn btn-chip btn-sm"
              style={{ flexShrink: 0 }}
              onClick={() => sendCue(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <button className="btn btn-thread" onClick={reveal}>
          せーので公開！ ✨
        </button>
      </div>
    </div>
  );
}
