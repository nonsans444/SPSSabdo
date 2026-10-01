import { EvaluationLevel } from '../types';

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
