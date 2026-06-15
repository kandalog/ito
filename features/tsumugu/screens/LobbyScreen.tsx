"use client";

import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import Avatar from "../components/Avatar";
import { BOT_NAMES, AVATAR_HUES } from "../data";
import type { GameSetup, Screen } from "../types";

interface LobbyPlayer {
  name: string;
  hue: number;
  you: boolean;
}

interface Props {
  go: (s: Screen) => void;
  setup: GameSetup;
}

export default function LobbyScreen({ go, setup }: Props) {
  const [players] = useState<LobbyPlayer[]>(() => {
    const count = setup.count ?? 4;
    const list: LobbyPlayer[] = [
      { name: setup.you || "あなた", hue: AVATAR_HUES[0], you: true },
    ];
    for (let i = 1; i < count; i++) {
      list.push({
        name: BOT_NAMES[i - 1],
        hue: AVATAR_HUES[i % AVATAR_HUES.length],
        you: false,
      });
    }
    return list;
  });

  const [ready, setReady] = useState(() => players.map((p) => p.you));
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    players.forEach((p, i) => {
      if (!p.you) {
        timers.push(
          setTimeout(() => {
            setReady((r) => {
              const n = [...r];
              n[i] = true;
              return n;
            });
          }, 700 + i * 650),
        );
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [players]);

  const allReady = ready.every(Boolean);
  const readyCount = ready.filter(Boolean).length;
  const shareUrl = `tsumugu.app/r/${(setup.code || "ABCD").toLowerCase()}`;

  const copy = (text: string, which: string) => {
    try {
      navigator.clipboard?.writeText(text);
    } catch {
      // clipboard not available
    }
    setCopied(which);
    setTimeout(() => setCopied(""), 1600);
  };

  return (
    <div className="screen">
      <TopBar title="まちあいしつ" onBack={() => go("top")} />
      <div className="screen-scroll" style={{ padding: "4px 20px 20px" }}>
        {/* room code card */}
        <div
          className="panel"
          style={{
            padding: "18px 20px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>
              あいことば
            </div>
            <div
              className="mono"
              style={{ fontSize: 30, fontWeight: 700, letterSpacing: "0.3em", color: "var(--ink)" }}
            >
              {setup.code || "ABCD"}
            </div>
          </div>
          <button
            onClick={() => copy(setup.code || "ABCD", "code")}
            className="btn btn-chip"
            style={{
              flexDirection: "column",
              gap: 2,
              padding: "10px 14px",
              borderColor: copied === "code" ? "var(--midori)" : "var(--line)",
              color: copied === "code" ? "var(--midori)" : "var(--ink-2)",
            }}
          >
            <span style={{ fontSize: 18 }}>{copied === "code" ? "✓" : "📋"}</span>
            <span style={{ fontSize: 10 }}>{copied === "code" ? "コピー済" : "コピー"}</span>
          </button>
        </div>

        {/* share URL */}
        <div
          className="panel"
          style={{
            padding: "12px 12px 12px 16px",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--paper-2)",
            border: "none",
          }}
        >
          <span style={{ fontSize: 16 }}>🔗</span>
          <div className="grow" style={{ minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 2 }}>
              しょうたいURL
            </div>
            <div
              className="mono"
              style={{
                fontSize: 13,
                color: "var(--ink)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {shareUrl}
            </div>
          </div>
          <button
            onClick={() => copy("https://" + shareUrl, "url")}
            className="btn btn-thread btn-sm"
            style={{
              flexShrink: 0,
              padding: "9px 14px",
              whiteSpace: "nowrap",
              background: copied === "url" ? "var(--midori)" : "var(--thread)",
            }}
          >
            {copied === "url" ? "✓ コピー済" : "コピー"}
          </button>
        </div>

        {/* players */}
        <div className="spread" style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>参加メンバー</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
            {readyCount}/{players.length} 準備OK
          </span>
        </div>
        <div className="stack gap10">
          {players.map((p, i) => (
            <div
              key={i}
              className="panel pop"
              style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, animationDelay: `${i * 70}ms` }}
            >
              <Avatar name={p.name} hue={p.hue} you={p.you} />
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: 15 }}>
                  {p.name}{" "}
                  {p.you && <span style={{ fontSize: 11, color: "var(--thread)" }}>（あなた）</span>}
                  {i === 0 && <span style={{ fontSize: 11, color: "var(--ink-3)" }}> · ホスト👑</span>}
                </div>
              </div>
              {ready[i] ? (
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--midori)", background: "var(--midori-soft)", padding: "5px 11px", borderRadius: 999 }}>
                  準備OK
                </span>
              ) : (
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                  …まってます
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 20px 20px", flexShrink: 0 }}>
        <button className="btn btn-thread" disabled={!allReady} onClick={() => go("game")}>
          {allReady ? "ゲームスタート →" : "みんなを待っています…"}
        </button>
      </div>
    </div>
  );
}
