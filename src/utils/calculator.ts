import { EvaluationLevel, CalculationResult, OverallStats, ClassRecord, Language } from '../types';
import { translations } from '../i18n/translations';

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
  totalRaw: string,
  readersRaw: string,
  nonReadersRaw: string,
  lang: Language = 'ar'
): CalculationResult {
  const t = translations[lang];

  if (totalRaw.trim() === '') {
    return {
      isValid: false,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  const total = Number(totalRaw);
  if (isNaN(total) || total <= 0) {
    return {
      isValid: false,
      errorMessage: t.errTotalPositive,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  const readers = readersRaw.trim() !== '' ? Number(readersRaw) : 0;
  if (isNaN(readers) || readers < 0) {
    return {
      isValid: false,
      errorMessage: t.errWholeNumbers,
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  if (readers > total) {
    return {
      isValid: false,
      errorMessage: t.errReadersExceedTotal(readers, total),
      readerPercentage: 0,
      nonReaderPercentage: 0,
      grade: 0,
      level: 'low',
    };
  }

  let nonReaders = 0;
  if (nonReadersRaw.trim() !== '') {
    nonReaders = Number(nonReadersRaw);
    if (isNaN(nonReaders) || nonReaders < 0) {
      return {
        isValid: false,
        errorMessage: t.errWholeNumbers,
        readerPercentage: 0,
        nonReaderPercentage: 0,
        grade: 0,
        level: 'low',
      };
    }
    if (nonReaders > total) {
      return {
        isValid: false,
        errorMessage: t.errNonReadersExceedTotal(nonReaders, total),
        readerPercentage: 0,
        nonReaderPercentage: 0,
        grade: 0,
        level: 'low',
      };
    }
    if (readers + nonReaders !== total) {
      return {
        isValid: false,
        errorMessage: t.errSumMismatch(readers, nonReaders, readers + nonReaders, total),
        readerPercentage: 0,
        nonReaderPercentage: 0,
        grade: 0,
        level: 'low',
      };
    }
  } else {
    nonReaders = Math.max(0, total - readers);
  }

  const readerPercentage = (readers / total) * 100;
  const nonReaderPercentage = (nonReaders / total) * 100;
  const grade = Number(((readerPercentage / 100) * 20).toFixed(1));
  const level = getEvaluationLevel(readerPercentage);

  return {
    isValid: true,
    readerPercentage,
    nonReaderPercentage,
    grade,
    level,
  };
}

export function computeOverallStats(classes: ClassRecord[]): OverallStats {
  if (classes.length === 0) {
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

  let totalStudents = 0;
  let totalReaders = 0;
  let totalNonReaders = 0;
  let sumGrades = 0;

  let bestClass = classes[0];
  let needsSupportClass = classes[0];

  for (const c of classes) {
    totalStudents += c.totalStudents;
    totalReaders += c.readersCount;
    totalNonReaders += c.nonReadersCount;
    sumGrades += c.grade;

    if (c.readerPercentage > bestClass.readerPercentage) {
      bestClass = c;
    }
    if (c.readerPercentage < needsSupportClass.readerPercentage) {
      needsSupportClass = c;
    }
  }

  const overallPercentage = totalStudents > 0 ? (totalReaders / totalStudents) * 100 : 0;
  const averageGrade = sumGrades / classes.length;

  return {
    totalClasses: classes.length,
    totalStudents,
    totalReaders,
    totalNonReaders,
    overallPercentage,
    averageGrade,
    bestClass,
    needsSupportClass,
  };
}
