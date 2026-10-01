import React from 'react';
import { EvaluationLevel, Language } from '../types';
import { translations } from '../i18n/translations';
import { getLevelColorClass } from '../utils/calculator';

interface DonutChartProps {
  readerPercentage: number;
  nonReaderPercentage: number;
  readersCount?: number;
  nonReadersCount?: number;
  total?: number;
  lang?: Language;
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  readerPercentage,
  nonReaderPercentage,
  readersCount = 0,
  nonReadersCount = 0,
  total = 0,
  lang = 'ar',
  size = 200,
}) => {
  const t = translations[lang];
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dashes
  const readerPct = Math.min(100, Math.max(0, readerPercentage));
  const readerOffset = circumference - (readerPct / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 origin-center drop-shadow-xs"
          role="img"
          aria-label={`${t.readersLabel}: ${readerPct}%, ${t.nonReadersLabel}: ${nonReaderPercentage}%`}
        >
          {/* Background circle for Non-Readers (Algerian Red #D21034) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#D21034"
            strokeWidth={strokeWidth}
            className="transition-all duration-500 ease-out opacity-90"
          />
          {/* Active arc for Readers (Algerian Flag Green #006233) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#006233"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={readerOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {readerPct.toFixed(1)}%
          </span>
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mt-0.5">
            {t.readersLabel}
          </span>
          {total > 0 && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {readersCount} / {total}
            </span>
          )}
        </div>
      </div>

      {/* Legend below donut */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#006233] shrink-0 shadow-xs" />
          <span className="text-slate-700 dark:text-slate-300">
            {t.readersLabel}: <strong className="text-slate-900 dark:text-white tabular-nums">{readerPct.toFixed(1)}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#D21034] shrink-0 shadow-xs" />
          <span className="text-slate-700 dark:text-slate-300">
            {t.nonReadersLabel}: <strong className="text-slate-900 dark:text-white tabular-nums">{nonReaderPercentage.toFixed(1)}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

interface GradeDisplayProps {
  grade: number;
  level: EvaluationLevel;
  lang?: Language;
  isDark?: boolean;
}

export const GradeDisplay: React.FC<GradeDisplayProps> = ({
  grade,
  level,
  lang = 'ar',
  isDark = false,
}) => {
  const t = translations[lang];
  const colors = getLevelColorClass(level, isDark);

  const levelName =
    level === 'excellent'
      ? t.levelExcellent
      : level === 'good'
      ? t.levelGood
      : level === 'needs_encouragement'
      ? t.levelNeedsEncouragement
      : t.levelLow;

  const levelDescription =
    level === 'excellent'
      ? t.levelDescExcellent
      : level === 'good'
      ? t.levelDescGood
      : level === 'needs_encouragement'
      ? t.levelDescNeedsEncouragement
      : t.levelDescLow;

  return (
    <div
      className={`rounded-2xl p-5 border-2 ${colors.borderColor} ${colors.badgeBg} transition-all duration-300`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            {t.gradeOutOf20}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {grade.toFixed(1)}
            </span>
            <span className="text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400">
              / 20
            </span>
          </div>
        </div>

        <div className="text-end">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            {t.evaluationLevel}
          </span>
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white shadow-xs"
            style={{ backgroundColor: colors.accentHex }}
          >
            {levelName}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
        {levelDescription}
      </p>
    </div>
  );
};

interface HorizontalBarProps {
  readers: number;
  nonReaders: number;
  total: number;
  lang?: Language;
}

export const HorizontalBar: React.FC<HorizontalBarProps> = ({
  readers,
  nonReaders,
  total,
  lang = 'ar',
}) => {
  const t = translations[lang];
  const safeTotal = total > 0 ? total : 1;
  const readerPct = Math.min(100, Math.max(0, (readers / safeTotal) * 100));
  const nonReaderPct = Math.min(100, Math.max(0, (nonReaders / safeTotal) * 100));

  return (
    <div className="space-y-2 my-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#006233]" />
          {t.readersLabel} ({readers})
        </span>
        <span className="flex items-center gap-1.5">
          {t.nonReadersLabel} ({nonReaders})
          <span className="w-2.5 h-2.5 rounded-full bg-[#D21034]" />
        </span>
      </div>

      <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
        <div
          className="h-full bg-[#006233] transition-all duration-500 ease-out"
          style={{ width: `${readerPct}%` }}
          title={`${t.readersLabel}: ${readerPct.toFixed(1)}%`}
        />
        <div
          className="h-full bg-[#D21034] transition-all duration-500 ease-out"
          style={{ width: `${nonReaderPct}%` }}
          title={`${t.nonReadersLabel}: ${nonReaderPct.toFixed(1)}%`}
        />
      </div>

      <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
        <span>{readerPct.toFixed(1)}%</span>
        <span>{nonReaderPct.toFixed(1)}%</span>
      </div>
    </div>
  );
};

interface ClassComparisonChartProps {
  classes: {
    className: string;
    readerPercentage: number;
    grade: number;
    level: EvaluationLevel;
  }[];
  lang?: Language;
  isDark?: boolean;
}

export const ClassComparisonChart: React.FC<ClassComparisonChartProps> = ({
  classes,
  lang = 'ar',
  isDark = false,
}) => {
  const t = translations[lang];

  if (!classes || classes.length === 0) {
    return null;
  }

  // Bar chart dimensions
  const chartHeight = 220;
  const barWidth = Math.max(28, Math.min(54, 500 / classes.length - 12));
  const gap = 16;
  const totalWidth = Math.max(340, classes.length * (barWidth + gap) + 60);

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-fit">
        <svg
          width={totalWidth}
          height={chartHeight + 60}
          className="overflow-visible select-none"
        >
          {/* Reference grid lines at 25%, 50%, 75%, 100% */}
          {[25, 50, 75, 100].map((pct) => {
            const y = chartHeight - (pct / 100) * (chartHeight - 30);
            return (
              <g key={pct} className="text-slate-400">
                <line
                  x1={40}
                  y1={y}
                  x2={totalWidth - 20}
                  y2={y}
                  stroke={isDark ? '#334155' : '#E2E8F0'}
                  strokeDasharray={pct === 50 ? '4 4' : '2 2'}
                  strokeWidth={pct === 50 ? 1.2 : 0.8}
                />
                <text
                  x={32}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill={isDark ? '#94A3B8' : '#64748B'}
                  className="tabular-nums"
                >
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* Excellence threshold badge line (75%) */}
          <line
            x1={40}
            y1={chartHeight - (75 / 100) * (chartHeight - 30)}
            x2={totalWidth - 20}
            y2={chartHeight - (75 / 100) * (chartHeight - 30)}
            stroke="#006233"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />

          {/* Classes Bars */}
          {classes.map((c, idx) => {
            const x = 50 + idx * (barWidth + gap);
            const clampedPct = Math.min(100, Math.max(0, c.readerPercentage));
            const barH = (clampedPct / 100) * (chartHeight - 30);
            const y = chartHeight - barH;
            const colors = getLevelColorClass(c.level, isDark);

            return (
              <g key={idx} className="group cursor-pointer">
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx={6}
                  fill={colors.accentHex}
                  className="transition-all duration-300 hover:opacity-85"
                >
                  <title>{`${c.className}: ${c.readerPercentage}% (${c.grade}/20)`}</title>
                </rect>

                {/* Percentage label above bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={isDark ? '#F1F5F9' : '#0F172A'}
                  className="tabular-nums"
                >
                  {c.readerPercentage}%
                </text>

                {/* Class name below bar */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={isDark ? '#CBD5E1' : '#334155'}
                >
                  {c.className.length > 7 ? `${c.className.slice(0, 7)}…` : c.className}
                </text>

                {/* Grade /20 below class name */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 32}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isDark ? '#94A3B8' : '#64748B'}
                  className="tabular-nums"
                >
                  {c.grade}/20
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-[#006233] inline-block" />
          <span>75% {t.levelExcellent}</span>
        </span>
        <span className="text-xs font-normal">
          {classes.length} {t.totalClassesLabel}
        </span>
      </div>
    </div>
  );
};
