"use client";

export default function TypingDots() {
  return (
    <div className="row gap6 center" style={{ height: 18 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--ink-3)",
            animation: `bob 1s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
