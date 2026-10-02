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
 * High-fidelity Circular SPSS University Reading Analytics Logo
 * As shown in the user's reference mockup.
 */
export const SPSSCircularLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 46,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full flex items-center justify-center shrink-0 shadow-md ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="50%" stopColor="#C89D34" />
            <stop offset="100%" stopColor="#E6C665" />
          </linearGradient>
          <radialGradient id="badgeBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B3E25" />
            <stop offset="85%" stopColor="#052415" />
            <stop offset="100%" stopColor="#02140B" />
          </radialGradient>
        </defs>

        {/* Outer Golden Border Ring */}
        <circle cx="60" cy="60" r="58" fill="url(#badgeBg)" stroke="url(#goldRing)" strokeWidth="3" />
        <circle cx="60" cy="60" r="53" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />

        {/* Top Arc Stars */}
        <path
          d="M 28 42 A 40 40 0 0 1 92 42"
          fill="none"
          stroke="rgba(216, 178, 77, 0.4)"
          strokeWidth="1"
        />
        <circle cx="38" cy="38" r="2" fill="#F5D77F" />
        <circle cx="50" cy="33" r="2.2" fill="#F5D77F" />
        <circle cx="60" cy="31" r="2.5" fill="#F5D77F" />
        <circle cx="70" cy="33" r="2.2" fill="#F5D77F" />
        <circle cx="82" cy="38" r="2" fill="#F5D77F" />

        {/* Stylized Monogram "SS" */}
        <g transform="translate(60, 62)">
          {/* First S in Gold */}
          <text
            x="-11"
            y="9"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="34"
            fontWeight="900"
            fill="url(#goldRing)"
            textAnchor="middle"
            filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.7))"
          >
            S
          </text>
          {/* Second overlapping S in Crisp White */}
          <text
            x="11"
            y="9"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="34"
            fontWeight="900"
            fill="#FFFFFF"
            textAnchor="middle"
            filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.7))"
          >
            S
          </text>
        </g>

        {/* Laurel Wreath at Bottom */}
        <path
          d="M 30 76 Q 40 98 60 100 Q 80 98 90 76"
          fill="none"
          stroke="#00A859"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Laurel Leaves */}
        <path d="M 36 78 Q 32 72 40 73 Z" fill="#00A859" />
        <path d="M 44 86 Q 40 80 48 81 Z" fill="#00A859" />
        <path d="M 54 93 Q 50 88 57 89 Z" fill="#00A859" />
        <path d="M 84 78 Q 88 72 80 73 Z" fill="#00A859" />
        <path d="M 76 86 Q 80 80 72 81 Z" fill="#00A859" />
        <path d="M 66 93 Q 70 88 63 89 Z" fill="#00A859" />
        <circle cx="60" cy="100" r="2.5" fill="#D21034" />
      </svg>
    </div>
  );
};

/**
 * Algerian Flag Fullscreen Background with soft overlay
 * Matches the background visible in the user's reference screenshot.
 */
export const AlgerianFlagBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Background Algerian Flag Graphic */}
      <div className="absolute inset-0 flex opacity-25 dark:opacity-30">
        {/* Left Green Half */}
        <div className="w-1/2 h-full bg-[#006233]" />
        {/* Right White Half */}
        <div className="w-1/2 h-full bg-[#F5F8F6] dark:bg-[#1A2E24]" />
      </div>

      {/* Central Red Crescent and Star */}
      <div className="relative z-1 flex items-center justify-center opacity-30 dark:opacity-35 transform scale-110 md:scale-140">
        <svg
          width="420"
          height="420"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Red Crescent */}
          <path
            d="M 100 20 A 80 80 0 1 0 170 140 A 68 68 0 1 1 100 20 Z"
            fill="#D21034"
          />
          {/* Red 5-pointed Star centered at the opening */}
          <polygon
            points="140,70 146,86 164,86 150,96 156,112 140,102 124,112 130,96 116,86 134,86"
            fill="#D21034"
          />
        </svg>
      </div>

      {/* Radial Vignette Darkening for Maximum Form Legibility */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#061810]/60 to-[#04100B]/95 pointer-events-none" />
    </div>
  );
};

/**
 * Subtle Islamic geometric / Zellige pattern background (SVG)
 */
export const ZelligeBackground: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: isDark ? 0.025 : 0.04,
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
            <path
              d="M32 0 L40 16 L56 8 L48 24 L64 32 L48 40 L56 56 L40 48 L32 64 L24 48 L8 56 L16 40 L0 32 L16 24 L8 8 L24 16 Z"
              fill="none"
              stroke={isDark ? '#4ade80' : '#006233'}
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zellige-pattern)" />
      </svg>
    </div>
  );
};
