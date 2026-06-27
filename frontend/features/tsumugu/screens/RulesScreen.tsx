"use client";

import TopBar from "../components/TopBar";
import type { Screen } from "../types";

const steps = [
  {
    emo: "🃏",
    t: "1〜100の数字をひとつ受け取る",
    d: "自分だけが見られる秘密の数字。誰の数字かは分かりません。",
  },
  {
    emo: "🗣️",
    t: "数字は言わずに、お題で例える",
    d: "「動物の大きさ」なら…自分の数字の大きさを動物にたとえて伝えます。",
  },
  {
    emo: "🤝",
    t: "みんなで相談",
    d: "「私より大きそう？」会話やリアクションでお互いの感覚をすり合わせ。",
  },
  {
    emo: "📤",
    t: "ちいさい順にカードを出す",
    d: "小さいと思う人から順番に。並びを決めて、いっせいにオープン！",
  },
];

interface Props {
  go: (s: Screen) => void;
}

export default function RulesScreen({ go }: Props) {
  return (
    <div className="screen">
      <TopBar title="あそびかた" onBack={() => go("top")} />
      <div className="screen-scroll" style={{ padding: "0 20px 20px" }}>
        <div
          className="panel"
          style={{
            padding: "20px",
            textAlign: "center",
            marginBottom: 18,
            background: "var(--thread)",
            border: "none",
          }}
        >
          <p className="serif" style={{ fontSize: 19, color: "#fffaf6", margin: 0, lineHeight: 1.6 }}>
            数字を&quot;言葉&quot;にして、
            <br />
            心を合わせる協力ゲーム
          </p>
        </div>

        <div className="stack gap14">
          {steps.map((s, i) => (
            <div
              key={i}
              className="panel pop"
              style={{
                padding: "16px",
                display: "flex",
                gap: 14,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  flexShrink: 0,
                  background: "var(--sakura-soft)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 24,
                }}
              >
                {s.emo}
              </div>
              <div>
                <div className="row gap8 center" style={{ marginBottom: 4 }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--thread)", fontWeight: 700 }}>
                    STEP {i + 1}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="row gap10 center"
          style={{
            marginTop: 18,
            padding: "14px 16px",
            background: "var(--midori-soft)",
            borderRadius: 16,
          }}
        >
          <span style={{ fontSize: 20 }}>💡</span>
          <span style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.6, fontWeight: 600 }}>
            ぜったいの正解はナシ。
            <br />
            感覚のズレを楽しむのがコツ！
          </span>
        </div>
      </div>
      <div style={{ padding: "12px 20px 20px", flexShrink: 0 }}>
        <button className="btn btn-thread" onClick={() => go("create")}>
          さっそく遊ぶ →
        </button>
      </div>
    </div>
  );
}
