"use client";

interface Props {
  size?: number;
  stroke?: string;
}

export default function ThreadMark({ size = 44, stroke = "var(--thread)" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path
        d="M6 30 C 6 14, 18 8, 22 18 C 26 28, 38 22, 38 12"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22" cy="18" r="3.2" fill={stroke} />
      <circle cx="6" cy="30" r="2.4" fill={stroke} />
      <circle cx="38" cy="12" r="2.4" fill={stroke} />
    </svg>
  );
}
