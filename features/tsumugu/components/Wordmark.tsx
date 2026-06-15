"use client";

import ThreadMark from "./ThreadMark";

export default function Wordmark({ small }: { small?: boolean }) {
  return (
    <div className="row gap10 center">
      <ThreadMark size={small ? 26 : 34} />
      <span
        className="serif"
        style={{
          fontSize: small ? 20 : 26,
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "var(--ink)",
        }}
      >
        つむぐ
      </span>
    </div>
  );
}
