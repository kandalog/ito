"use client";

import { useState, useCallback } from "react";
import Lives from "../components/Lives";
import StepRail from "../components/StepRail";
import PhaseTheme from "./PhaseTheme";
import PhaseDeal from "./PhaseDeal";
import PhaseAnswer from "./PhaseAnswer";
import PhaseConsult from "./PhaseConsult";
import { CATEGORIES, BOT_NAMES, AVATAR_HUES, dealNumbers } from "../data";
import type { GamePhase, GameSetup, Player, ResultData, Screen } from "../types";

const PHASES: GamePhase[] = ["theme", "deal", "answer", "consult"];
const PHASE_LABEL: Record<GamePhase, string> = {
  theme: "お題",
  deal: "数字配布",
  answer: "例えを入力",
  consult: "そうだん・順番",
};

interface Props {
  setup: GameSetup;
  round: number;
  onFinish: (r: ResultData) => void;
  go: (s: Screen) => void;
}

export default function GameScreen({ setup, round, onFinish }: Props) {
  const cat = CATEGORIES.find((c) => c.id === setup.cat) ?? CATEGORIES[0];

  // key={round} により round ごとに再マウントされるため lazy init で安全に初期化できる
  const [{ theme, players }] = useState(() => {
    const t = cat.themes[(round - 1) % cat.themes.length];
    const n = setup.count ?? 4;
    const pool = dealNumbers(n);
    const ps: Player[] = [
      { name: setup.you || "あなた", hue: AVATAR_HUES[0], you: true, value: pool[0], answer: "" },
    ];
    for (let i = 1; i < n; i++) {
      ps.push({
        name: BOT_NAMES[i - 1],
        hue: AVATAR_HUES[i % AVATAR_HUES.length],
        you: false,
        value: pool[i],
        answer: "",
      });
    }
    return { theme: t, players: ps };
  });

  // answers はstateで管理し、players へマージして渡す
  const [answers, setAnswers] = useState<string[]>(() => players.map(() => ""));

  const setAnswer = useCallback((playerIdx: number, answer: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[playerIdx] = answer;
      return next;
    });
  }, []);

  const playersWithAnswers: Player[] = players.map((p, i) => ({ ...p, answer: answers[i] }));

  const [phase, setPhase] = useState<GamePhase>("theme");
  const phaseIdx = PHASES.indexOf(phase);

  return (
    <div className="screen">
      <div className="spread" style={{ padding: "14px 18px 8px", flexShrink: 0 }}>
        <div className="row gap8 center">
          <span className="btn btn-chip" style={{ pointerEvents: "none", padding: "6px 12px", fontSize: 12 }}>
            ROUND {round}
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
            {PHASE_LABEL[phase]}
          </span>
        </div>
        <Lives total={3} left={3} />
      </div>
      <StepRail steps={PHASES} active={phaseIdx} />

      <div className="grow" style={{ minHeight: 0, display: "flex", flexDirection: "column" }}>
        {phase === "theme" && (
          <PhaseTheme theme={theme} onNext={() => setPhase("deal")} />
        )}
        {phase === "deal" && (
          <PhaseDeal players={playersWithAnswers} theme={theme} onNext={() => setPhase("answer")} />
        )}
        {phase === "answer" && (
          <PhaseAnswer
            players={playersWithAnswers}
            theme={theme}
            onSetAnswer={setAnswer}
            onNext={() => setPhase("consult")}
          />
        )}
        {phase === "consult" && (
          <PhaseConsult players={playersWithAnswers} theme={theme} onFinish={onFinish} />
        )}
      </div>
    </div>
  );
}
