import { CalculationResult, EvaluationLevel, ClassRecord, OverallStats } from '../types';
import { translations } from '../i18n/translations';
import { Language } from '../types';

export function getEvaluationLevel(percentage: number): EvaluationLevel {
  if (percentage >= 75) return 'excellent';
  if (percentage >= 50) return 'good';
  if (percentage >= 25) return 'needs_encouragement';
  return 'low';
}

export function getLevelColorClass(level: EvaluationLevel, isDark: boolean = false): {
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentHex: string;
} {
  switch (level) {
    case 'excellent':
      return {
        badgeBg: isDark ? 'bg-emerald-950/70' : 'bg-emerald-50',
        badgeText: isDark ? 'text-emerald-300' : 'text-emerald-800',
        borderColor: 'border-emerald-600',
        accentHex: '#006233', // Algerian Green
      };
    case 'good':
      return {
        badgeBg: isDark ? 'bg-teal-950/70' : 'bg-teal-50',
        badgeText: isDark ? 'text-teal-300' : 'text-teal-800',
        borderColor: 'border-teal-600',
        accentHex: '#0D9488',
      };
    case 'needs_encouragement':
      return {
        badgeBg: isDark ? 'bg-amber-950/70' : 'bg-amber-50',
        badgeText: isDark ? 'text-amber-300' : 'text-amber-800',
        borderColor: 'border-amber-600',
        accentHex: '#C59B27', // Algerian Gold
      };
    case 'low':
      return {
        badgeBg: isDark ? 'bg-rose-950/70' : 'bg-rose-50',
        badgeText: isDark ? 'text-rose-300' : 'text-rose-800',
        borderColor: 'border-rose-600',
        accentHex: '#D21034', // Algerian Red
      };
  }
}

export function calculateLiveStats(
  totalInput: string,
  readersInput: string,
  nonReadersInput: string,
  lang: Language = 'ar'
): CalculationResult {
  const t = translations[lang];

  // If total is empty, return initial state
  if (!totalInput.trim()) {
    return {
      isValid: false,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  const total = Number(totalInput);
  const readers = readersInput.trim() !== '' ? Number(readersInput) : NaN;
  const nonReaders = nonReadersInput.trim() !== '' ? Number(nonReadersInput) : NaN;

  // Validate whole numbers
  if (
    isNaN(total) ||
    !Number.isInteger(total) ||
    (!isNaN(readers) && !Number.isInteger(readers)) ||
    (!isNaN(nonReaders) && !Number.isInteger(nonReaders))
  ) {
    return {
      isValid: false,
      errorMessage: t.errWholeNumbers,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  // Validate positive total
  if (total <= 0) {
    return {
      isValid: false,
      errorMessage: t.errTotalPositive,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  // Check negative numbers
  if ((!isNaN(readers) && readers < 0) || (!isNaN(nonReaders) && nonReaders < 0)) {
    return {
      isValid: false,
      errorMessage: t.errWholeNumbers,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  // Auto-fill logic
  let effectiveReaders = readers;
  let effectiveNonReaders = nonReaders;

  if (!isNaN(readers) && isNaN(nonReaders)) {
    effectiveNonReaders = Math.max(0, total - readers);
  } else if (isNaN(readers) && !isNaN(nonReaders)) {
    effectiveReaders = Math.max(0, total - nonReaders);
  } else if (isNaN(readers) && isNaN(nonReaders)) {
    // Both empty, waiting for input
    return {
      isValid: false,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  // Readers exceeds total
  if (effectiveReaders > total) {
    return {
      isValid: false,
      errorMessage: t.errReadersExceedTotal(effectiveReaders, total),
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  // Non-readers exceeds total
  if (effectiveNonReaders > total) {
    return {
      isValid: false,
      errorMessage: t.errNonReadersExceedTotal(effectiveNonReaders, total),
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  // Sum check if both explicitly provided
  if (!isNaN(readers) && !isNaN(nonReaders) && readers + nonReaders !== total) {
    return {
      isValid: false,
      errorMessage: t.errSumMismatch(readers, nonReaders, readers + nonReaders, total),
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  // Calculate percentages and grade
  const readerPct = Math.round((effectiveReaders / total) * 1000) / 10; // 1 decimal
  const nonReaderPct = Math.round((effectiveNonReaders / total) * 1000) / 10;
  // Grade: note / 20 rounded to 1 decimal place
  const rawGrade = (effectiveReaders / total) * 20;
  const grade = Math.round(rawGrade * 10) / 10;
  const level = getEvaluationLevel(readerPct);

  return {
    isValid: true,
    readerPercentage: readerPct,
    nonReaderPercentage: nonReaderPct,
    grade,
    level,
  };
}

export function computeOverallStats(classes: ClassRecord[]): OverallStats {
  if (!classes || classes.length === 0) {
    return {
      totalClasses: 0,
      totalStudents: 0,
      totalReaders: 0,
      totalNonReaders: 0,
      overallPercentage: 0,
      averageGrade: 0,
      bestClass: null,
      needsSupportClass: null,
    };
  }

  const totalClasses = classes.length;
  let totalStudents = 0;
  let totalReaders = 0;
  let totalNonReaders = 0;
  let sumOfGrades = 0;

  let bestClass = classes[0];
  let needsSupportClass = classes[0];

  for (const item of classes) {
    totalStudents += item.totalStudents;
    totalReaders += item.readersCount;
    totalNonReaders += item.nonReadersCount;
    sumOfGrades += item.grade;

    if (item.readerPercentage > bestClass.readerPercentage) {
      bestClass = item;
    }
    if (item.readerPercentage < needsSupportClass.readerPercentage) {
      needsSupportClass = item;
    }
  }

  const overallPercentage =
    totalStudents > 0
      ? Math.round((totalReaders / totalStudents) * 1000) / 10
      : 0;

  const averageGrade =
    totalClasses > 0
      ? Math.round((sumOfGrades / totalClasses) * 10) / 10
      : 0;

  return {
    totalClasses,
    totalStudents,
    totalReaders,
    totalNonReaders,
    overallPercentage,
    averageGrade,
    bestClass,
    needsSupportClass,
  };
}
