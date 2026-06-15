"use client";

interface Props {
  name: string;
  hue?: number;
  size?: number;
  you?: boolean;
}

export default function Avatar({ name, hue = 250, size = 40, you }: Props) {
  const ch = (name || "?").trim().charAt(0);
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `oklch(0.56 0.11 ${hue})`,
        boxShadow: you
          ? `inset 0 0 0 2px var(--paper), 0 0 0 2px oklch(0.56 0.11 ${hue})`
          : undefined,
      }}
    >
      {ch}
    </div>
  );
}
