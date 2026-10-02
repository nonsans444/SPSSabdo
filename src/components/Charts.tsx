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
          <span className="text-3xl font-bold tracking-tight text-white tabular-nums">
            {readerPct.toFixed(1)}%
          </span>
          <span className="text-xs font-semibold text-[#6CE89F] mt-0.5">
            {t.readersLabel}
          </span>
          {total > 0 && (
            <span className="text-[11px] text-emerald-200/70 mt-0.5">
              {readersCount} / {total}
            </span>
          )}
        </div>
      </div>

      {/* Legend below donut */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#00A859] shrink-0 shadow-xs" />
          <span className="text-emerald-100">
            {t.readersLabel}: <strong className="text-white tabular-nums">{readerPct.toFixed(1)}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#D21034] shrink-0 shadow-xs" />
          <span className="text-emerald-100">
            {t.nonReadersLabel}: <strong className="text-white tabular-nums">{nonReaderPercentage.toFixed(1)}%</strong>
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
  isDark = true,
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
      className={`rounded-2xl p-5 border-2 ${colors.borderColor} ${colors.badgeBg} transition-all duration-300 shadow-lg`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block mb-1">
            {t.gradeOutOf20}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl md:text-5xl font-black text-white tabular-nums">
              {grade.toFixed(1)}
            </span>
            <span className="text-lg md:text-xl font-medium text-emerald-300/70">
              / 20
            </span>
          </div>
        </div>

        <div className="text-end">
          <span className="text-xs font-semibold text-emerald-200/80 block mb-1">
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

      <p className="text-xs text-emerald-100/90 mt-3 pt-3 border-t border-emerald-800/60 leading-relaxed">
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
      <div className="flex items-center justify-between text-xs font-medium text-emerald-100">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00A859]" />
          {t.readersLabel} ({readers})
        </span>
        <span className="flex items-center gap-1.5">
          {t.nonReadersLabel} ({nonReaders})
          <span className="w-2.5 h-2.5 rounded-full bg-[#D21034]" />
        </span>
      </div>

      <div className="h-4 w-full bg-[#0E281C] rounded-full overflow-hidden flex shadow-inner border border-emerald-900/60">
        <div
          className="h-full bg-[#00A859] transition-all duration-500 ease-out"
          style={{ width: `${readerPct}%` }}
          title={`${t.readersLabel}: ${readerPct.toFixed(1)}%`}
        />
        <div
          className="h-full bg-[#D21034] transition-all duration-500 ease-out"
          style={{ width: `${nonReaderPct}%` }}
          title={`${t.nonReadersLabel}: ${nonReaderPct.toFixed(1)}%`}
        />
      </div>

      <div className="flex justify-between text-[11px] text-emerald-300/80 tabular-nums">
        <span>{readerPct.toFixed(1)}%</span>
        <span>{nonReaderPct.toFixed(1)}%</span>
      </div>
    </div>
  );
};

interface ClassComparisonChartProps {
  classes: Array<{
    className: string;
    readerPercentage: number;
    grade: number;
    level: EvaluationLevel;
  }>;
  lang?: Language;
  isDark?: boolean;
}

export const ClassComparisonChart: React.FC<ClassComparisonChartProps> = ({
  classes,
  lang = 'ar',
  isDark = true,
}) => {
  if (classes.length === 0) return null;

  return (
    <div className="space-y-3 pt-2">
      {classes.map((c, i) => {
        const colors = getLevelColorClass(c.level, isDark);
        return (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-100">
              <span className="truncate max-w-[200px] sm:max-w-xs">{c.className}</span>
              <span className="tabular-nums text-white font-bold">{c.readerPercentage.toFixed(1)}% ({c.grade.toFixed(1)}/20)</span>
            </div>
            <div className="h-3 w-full bg-[#0E281C] rounded-full overflow-hidden flex shadow-inner border border-emerald-900/60">
              <div
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${Math.min(100, Math.max(5, c.readerPercentage))}%`,
                  backgroundColor: colors.accentHex,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
