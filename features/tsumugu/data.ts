import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "teiban",
    name: "定番",
    color: "var(--ai)",
    themes: [
      { low: "小さい", high: "大きい", title: "動物の大きさ", sub: "アリ 〜 シロナガスクジラ" },
      { low: "安い", high: "高い", title: "コンビニで買えるもの", sub: "1円 〜 数千円" },
      { low: "弱い", high: "強い", title: "ヒーロー・キャラの強さ", sub: "弱小 〜 最強" },
      { low: "近い", high: "遠い", title: "東京からの距離", sub: "となり町 〜 地球の裏側" },
    ],
  },
  {
    id: "kansei",
    name: "感性",
    color: "var(--shu)",
    themes: [
      { low: "こわくない", high: "こわい", title: "世の中のこわいもの", sub: "ほのぼの 〜 恐怖" },
      { low: "じみ", high: "はで", title: "ファッションの派手さ", sub: "無地 〜 ギラギラ" },
      { low: "ねむい", high: "ワクワク", title: "休日の過ごし方", sub: "二度寝 〜 大冒険" },
      { low: "癒やし", high: "ストレス", title: "日常のストレス度", sub: "ひだまり 〜 満員電車" },
    ],
  },
  {
    id: "guru",
    name: "グルメ",
    color: "var(--midori)",
    themes: [
      { low: "あっさり", high: "こってり", title: "ラーメンの脂っぽさ", sub: "塩 〜 背脂チャッチャ" },
      { low: "あまい", high: "からい", title: "食べ物の辛さ", sub: "プリン 〜 激辛麻婆" },
      { low: "ヘルシー", high: "罪な味", title: "夜食の背徳感", sub: "サラダ 〜 深夜のラーメン" },
    ],
  },
  {
    id: "moshimo",
    name: "もしも",
    color: "var(--kin)",
    themes: [
      { low: "いらない", high: "ほしい", title: "今いちばん欲しいもの", sub: "微妙 〜 のどから手が出る" },
      { low: "ありえない", high: "やってみたい", title: "もしもの願望", sub: "むり 〜 一生に一度は" },
      { low: "平凡", high: "伝説", title: "自慢できる経験", sub: "ふつう 〜 武勇伝" },
    ],
  },
];

export const BOT_NAMES = ["ハル", "ミオ", "ケン", "ナギ", "ソラ", "リン"];
export const AVATAR_HUES = [250, 35, 150, 80, 300, 200];
export const REACTIONS = ["👍", "😂", "😱", "🤔", "🔥", "🙏"];

export const BOT_CHATTER = [
  "うーん、私けっこう上かも…？",
  "それなら自分が先かな",
  "あいだ空いてそう、こわい",
  "近いかもしれない、慎重にいこ",
  "自信ある、たぶん端っこ",
  "まんなか付近だと思う",
];

const BOT_ANSWER_BANK: Record<string, string[][]> = {
  "動物の大きさ": [
    ["アリくらい", "ダンゴムシ", "ハムスター", "メダカ"],
    ["ネコ", "柴犬", "ヤギ", "ペンギン"],
    ["ウマ", "ライオン", "シマウマ", "イルカ"],
    ["ゾウ", "キリン", "シャチ", "クジラ級"],
  ],
  "コンビニで買えるもの": [
    ["うまい棒", "ガム", "ミニ氷", "10円ガム"],
    ["おにぎり", "肉まん", "コーヒー", "プリン"],
    ["お弁当", "アイス箱", "雑誌", "化粧品"],
    ["ギフト券", "高い箱菓子", "酒セット", "ぜいたく品"],
  ],
  default: [
    ["ひかえめに小さい", "そっと弱め", "ほぼ最小", "ささやかなライン"],
    ["ふつうより下", "まんなか手前", "中くらい", "平均ぐらい"],
    ["やや上ぎみ", "けっこう上", "上の方", "強めに振った"],
    ["かなり上", "ほぼ最大", "天井ちかく", "振り切り"],
  ],
};

export function botAnswerFor(themeTitle: string, value: number): string {
  const bank = BOT_ANSWER_BANK[themeTitle] ?? BOT_ANSWER_BANK["default"];
  const band = value <= 25 ? 0 : value <= 50 ? 1 : value <= 75 ? 2 : 3;
  const opts = bank[band];
  return opts[Math.floor(Math.random() * opts.length)];
}

export function avatarColor(i: number): string {
  return `oklch(0.56 0.11 ${AVATAR_HUES[i % AVATAR_HUES.length]})`;
}

export function dealNumbers(n: number): number[] {
  const pool = Array.from({ length: 100 }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}
