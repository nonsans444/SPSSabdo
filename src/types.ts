export type Language = 'ar' | 'fr' | 'en';

export type EvaluationLevel = 'excellent' | 'good' | 'needs_encouragement' | 'low';

export interface ClassRecord {
  id: string;
  teacherName?: string;
  schoolName?: string;
  className: string;
  academicYear?: string;
  totalStudents: number;
  readersCount: number;
  nonReadersCount: number;
  readerPercentage: number;
  nonReaderPercentage: number;
  grade: number; // Note /20 rounded to 1 decimal place
  level: EvaluationLevel;
  createdAt: string; // ISO date string
  notes?: string;
}

export interface CalculationResult {
  isValid: boolean;
  errorMessage?: string;
  warningMessage?: string;
  readerPercentage: number;
  nonReaderPercentage: number;
  grade: number;
  level: EvaluationLevel;
}

export interface OverallStats {
  totalClasses: number;
  totalStudents: number;
  totalReaders: number;
  totalNonReaders: number;
  overallPercentage: number;
  averageGrade: number;
  bestClass: ClassRecord | null;
  needsSupportClass: ClassRecord | null;
}
