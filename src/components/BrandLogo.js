import React from "react";

/** Compact gradient monogram for the nav — no text. */
function BrandLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="brand-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#094067" />
          <stop offset="45%" stopColor="#3da9fc" />
          <stop offset="100%" stopColor="#ef4565" />
        </linearGradient>
        <linearGradient id="brand-logo-grad-soft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(61, 169, 252, 0.35)" />
          <stop offset="100%" stopColor="rgba(239, 69, 101, 0.2)" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        fill="url(#brand-logo-grad-soft)"
        stroke="url(#brand-logo-grad)"
        strokeWidth="1.25"
      />
      <path
        d="M20 11 L27 29 M20 11 L13 29"
        fill="none"
        stroke="url(#brand-logo-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BrandLogo;
