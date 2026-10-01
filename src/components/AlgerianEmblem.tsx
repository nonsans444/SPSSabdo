import React from 'react';

/**
 * Clean inline Algerian Crescent and Star emblem with gold/green accents
 */
export const AlgerianCrescentStar: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 28, color = '#D21034' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Crescent */}
      <path
        d="M 50 10 A 40 40 0 1 0 85 70 A 34 34 0 1 1 50 10 Z"
        fill={color}
      />
      {/* 5-pointed Star centered at the crescent opening */}
      <polygon
        points="70,35 73,43 82,43 75,48 78,56 70,51 62,56 65,48 58,43 67,43"
        fill={color}
      />
    </svg>
  );
};

/**
 * Subtle Islamic geometric / Zellige pattern background (SVG)
 * Faint, non-distracting background texture adhering to Algerian theme.
 */
export const ZelligeBackground: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: isDark ? 0.03 : 0.045,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="zellige-pattern"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star rosette geometry */}
            <path
              d="M32 0 L40 16 L56 8 L48 24 L64 32 L48 40 L56 56 L40 48 L32 64 L24 48 L8 56 L16 40 L0 32 L16 24 L8 8 L24 16 Z"
              fill="none"
              stroke={isDark ? '#4ade80' : '#006233'}
              strokeWidth="0.8"
            />
            <circle
              cx="32"
              cy="32"
              r="6"
              fill="none"
              stroke={isDark ? '#fbbf24' : '#C59B27'}
              strokeWidth="0.8"
            />
            <rect
              x="28"
              y="28"
              width="8"
              height="8"
              transform="rotate(45 32 32)"
              fill="none"
              stroke={isDark ? '#4ade80' : '#006233'}
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zellige-pattern)" />
      </svg>
    </div>
  );
};
