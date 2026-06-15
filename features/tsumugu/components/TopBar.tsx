"use client";

import type { ReactNode } from "react";

interface Props {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
}

export default function TopBar({ title, onBack, right }: Props) {
  return (
    <div className="spread" style={{ padding: "16px 18px", flexShrink: 0 }}>
      <div className="row gap10 center" style={{ minWidth: 0 }}>
        {onBack && (
          <button
            onClick={onBack}
            aria-label="戻る"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 6,
              marginLeft: -6,
              color: "var(--ink-2)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {title && (
          <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>
            {title}
          </span>
        )}
      </div>
      {right}
    </div>
  );
}
