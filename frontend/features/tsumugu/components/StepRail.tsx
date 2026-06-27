"use client";

interface Props {
  steps: string[];
  active: number;
}

export default function StepRail({ steps, active }: Props) {
  return (
    <div className="row gap6 center" style={{ padding: "0 18px 8px", justifyContent: "center" }}>
      {steps.map((_, i) => (
        <div key={i} className="row gap6 center">
          <span
            style={{
              width: i === active ? 22 : 7,
              height: 7,
              borderRadius: 999,
              background: i <= active ? "var(--thread)" : "var(--line)",
              transition: "all .3s",
            }}
          />
        </div>
      ))}
    </div>
  );
}
