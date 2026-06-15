export interface Theme {
  low: string;
  high: string;
  title: string;
  sub?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  themes: Theme[];
}

export interface Player {
  name: string;
  hue: number;
  you: boolean;
  value: number;
  answer: string;
  ready?: boolean;
}

export interface GameSetup {
  you: string;
  count: number | null;
  cat: string;
  code: string;
}

export interface ResultData {
  success: boolean;
  ordered: Player[];
  mistakeIdx: number[];
}

export type Screen = "top" | "create" | "join" | "lobby" | "rules" | "game" | "result";
export type GamePhase = "theme" | "deal" | "answer" | "consult";

export interface ChatMessage {
  who: string;
  hue: number;
  text: string;
  you?: boolean;
  reaction?: boolean;
}
