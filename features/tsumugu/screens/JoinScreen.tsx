"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import type { GameSetup, Screen } from "../types";

interface Props {
  go: (s: Screen) => void;
  setup: GameSetup;
  setSetup: (s: GameSetup) => void;
}

export default function JoinScreen({ go, setup, setSetup }: Props) {
  const [name, setName] = useState(setup.you || "");
  const [code, setCode] = useState("");
  const ok = name.trim() && code.trim().length >= 3;

  const join = () => {
    setSetup({ ...setup, you: name.trim(), count: 4, cat: "teiban", code: code.toUpperCase() });
    go("lobby");
  };

  return (
    <div className="screen">
      <TopBar title="あいことばで参加" onBack={() => go("top")} />
      <div className="screen-scroll" style={{ padding: "10px 20px" }}>
        <div className="panel" style={{ padding: "22px 20px", marginBottom: 18, textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            あいことば
          </div>
          <input
            className="input mono"
            value={code}
            maxLength={4}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
            }
            placeholder="ABCD"
            style={{
              textAlign: "center",
              fontSize: 34,
              letterSpacing: "0.4em",
              fontWeight: 700,
              padding: "16px",
            }}
          />
          <p style={{ fontSize: 12, color: "var(--ink-3)", margin: "12px 0 0" }}>
            ホストから共有された4文字を入力
          </p>
        </div>
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
        <div
          className="row gap10 center"
          style={{
            marginTop: 18,
            padding: "12px 14px",
            background: "var(--ai-soft)",
            borderRadius: 14,
          }}
        >
          <span style={{ fontSize: 18 }}>🔗</span>
          <span style={{ fontSize: 12.5, color: "var(--ai)", fontWeight: 600 }}>
            招待URLを開くと、あいことばは自動で入ります
          </span>
        </div>
      </div>
      <div style={{ padding: "12px 20px 20px", flexShrink: 0 }}>
        <button className="btn btn-thread" disabled={!ok} onClick={join}>
          ルームに入る →
        </button>
      </div>
    </div>
  );
}
