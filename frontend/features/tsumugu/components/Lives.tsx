"use client";

interface Props {
  total?: number;
  left: number;
}

export default function Lives({ total = 3, left }: Props) {
  return (
    <div className="row gap6 center">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: i < left ? "var(--shu)" : "transparent",
            border: `1.5px solid ${i < left ? "var(--shu)" : "var(--line)"}`,
          }}
        />
      ))}
    </div>
  );
}
