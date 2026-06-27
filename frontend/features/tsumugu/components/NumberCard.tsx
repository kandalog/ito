"use client";

import ThreadMark from "./ThreadMark";

interface Props {
  value: number;
  revealed: boolean;
  low?: string;
  high?: string;
  small?: boolean;
  onFlip?: () => void;
  dim?: boolean;
}

export default function NumberCard({ value, revealed, low, high, small, onFlip, dim }: Props) {
  const w = small ? 64 : 200;
  const h = small ? 92 : 280;

  return (
    <div
      onClick={onFlip}
      style={{
        width: w,
        height: h,
        perspective: 1000,
        cursor: onFlip ? "pointer" : "default",
        flexShrink: 0,
        opacity: dim ? 0.5 : 1,
        transition: "opacity .3s",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
          transformStyle: "preserve-3d",
          transform: revealed ? "rotateY(180deg)" : "none",
        }}
      >
        {/* back (face down) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: small ? 12 : 22,
            background: "var(--thread)",
            display: "grid",
            placeItems: "center",
            boxShadow: "var(--shadow-md)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: small ? 5 : 12,
              border: "1.5px solid color-mix(in oklch, white 35%, transparent)",
              borderRadius: small ? 8 : 14,
            }}
          />
          <ThreadMark size={small ? 26 : 60} stroke="rgba(255,255,255,0.9)" />
        </div>

        {/* front (number) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: small ? 12 : 22,
            background: "var(--card)",
            border: "1px solid var(--card-edge)",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: small ? 4 : 12,
          }}
        >
          <span
            className="serif"
            style={{
              fontFamily: "var(--num)",
              fontSize: small ? 28 : 92,
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--ink)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {value}
          </span>
          {!small && (
            <div className="row gap8 center" style={{ marginTop: 18 }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
                {low}
              </span>
              <span style={{ width: 36, height: 1, background: "var(--line)" }} />
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
                {high}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
