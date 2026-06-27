"use client";

import { useState } from "react";
import TopScreen from "./screens/TopScreen";
import CreateScreen from "./screens/CreateScreen";
import JoinScreen from "./screens/JoinScreen";
import LobbyScreen from "./screens/LobbyScreen";
import RulesScreen from "./screens/RulesScreen";
import ResultScreen from "./screens/ResultScreen";
import GameScreen from "./game/GameScreen";
import type { GameSetup, ResultData, Screen } from "./types";

const DEFAULT_SETUP: GameSetup = {
  you: "",
  count: null,
  cat: "teiban",
  code: "",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("top");
  const [setup, setSetup] = useState<GameSetup>(DEFAULT_SETUP);
  const [round, setRound] = useState(1);
  const [result, setResult] = useState<ResultData | null>(null);

  const go = (s: Screen) => setScreen(s);

  const onFinish = (r: ResultData) => {
    setResult(r);
    setScreen("result");
  };

  const nextRound = () => {
    setRound((r) => r + 1);
    setResult(null);
    setScreen("game");
  };

  return (
    <div className="app-shell">
      {screen === "top" && <TopScreen go={go} />}
      {screen === "create" && (
        <CreateScreen go={go} setup={setup} setSetup={setSetup} />
      )}
      {screen === "join" && (
        <JoinScreen go={go} setup={setup} setSetup={setSetup} />
      )}
      {screen === "lobby" && <LobbyScreen go={go} setup={setup} />}
      {screen === "rules" && <RulesScreen go={go} />}
      {screen === "game" && (
        <GameScreen
          key={round}
          setup={setup}
          round={round}
          onFinish={onFinish}
          go={go}
        />
      )}
      {screen === "result" && result && (
        <ResultScreen
          go={go}
          result={result}
          round={round}
          onNext={nextRound}
        />
      )}
    </div>
  );
}
