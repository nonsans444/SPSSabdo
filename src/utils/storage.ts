import { ClassRecord } from '../types';

const STORAGE_KEY = 'spss_reading_classes_records_v1';
const PROFILE_KEY = 'spss_teacher_profile_v1';

export const SAMPLE_CLASSES: ClassRecord[] = [
  {
    id: 'sample-1',
    teacherName: 'أ. عبد القادر بن عيسى',
    schoolName: 'متوسطة الإخوة بوعزيز',
    className: '3م2 (3AM2)',
    totalStudents: 32,
    readersCount: 26,
    nonReadersCount: 6,
    readerPercentage: 81.3,
    nonReaderPercentage: 18.7,
    grade: 16.3,
    level: 'excellent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    notes: 'تفاعل ممتاز مع مسابقة تحدي القراءة العربي وزيارات أسبوعية للمكتبة.',
  },
  {
    id: 'sample-2',
    teacherName: 'أ. عبد القادر بن عيسى',
    schoolName: 'متوسطة الإخوة بوعزيز',
    className: '2م4 (2AM4)',
    totalStudents: 30,
    readersCount: 19,
    nonReadersCount: 11,
    readerPercentage: 63.3,
    nonReaderPercentage: 36.7,
    grade: 12.7,
    level: 'good',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    notes: 'تحسن ملحوظ لدى إناث الفوج مقارنة بالذكور في استعارة القصص.',
  },
  {
    id: 'sample-3',
    teacherName: 'أ. عبد القادر بن عيسى',
    schoolName: 'متوسطة الإخوة بوعزيز',
    className: '4م1 (4AM1)',
    totalStudents: 35,
    readersCount: 13,
    nonReadersCount: 22,
    readerPercentage: 37.1,
    nonReaderPercentage: 62.9,
    grade: 7.4,
    level: 'needs_encouragement',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    notes: 'انشغال التلاميذ بتحضير شهادة التعليم المتوسط (BEM)، يوصى بمطالعة خفيفة مجدولة.',
  },
  {
    id: 'sample-4',
    teacherName: 'أ. عبد القادر بن عيسى',
    schoolName: 'متوسطة الإخوة بوعزيز',
    className: '1م3 (1AM3)',
    totalStudents: 28,
    readersCount: 22,
    nonReadersCount: 6,
    readerPercentage: 78.6,
    nonReaderPercentage: 21.4,
    grade: 15.7,
    level: 'excellent',
    createdAt: new Date().toISOString(),
    notes: 'فوج نشيط ومقبل على قراءة الروايات والقصص التاريخية الجزائرية.',
  },
];

export function getStoredClasses(): ClassRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time initialization: populate sample classes so teacher/inspector has immediate visibility
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_CLASSES));
      return SAMPLE_CLASSES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return SAMPLE_CLASSES;
  } catch (error) {
    console.warn('Failed to access localStorage, using sample classes in memory:', error);
    return SAMPLE_CLASSES;
  }
}

export function saveStoredClasses(classes: ClassRecord[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
    return true;
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
    return false;
  }
}

export interface TeacherProfile {
  teacherName: string;
  schoolName: string;
}

export function getStoredProfile(): TeacherProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn(e);
  }
  return {
    teacherName: 'أ. عبد القادر بن عيسى',
    schoolName: 'متوسطة الإخوة بوعزيز',
  };
}

export function saveStoredProfile(profile: TeacherProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn(e);
  }
}

export function exportClassesAsJson(classes: ClassRecord[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(classes, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `spss_reading_stats_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseClassesJson(jsonText: string): ClassRecord[] | null {
  try {
    const parsed = JSON.parse(jsonText);
    if (Array.isArray(parsed)) {
      // Validate basic shape
      const valid = parsed.every(
        (c) => typeof c.className === 'string' && typeof c.totalStudents === 'number'
      );
      if (valid) return parsed;
    }
    return null;
  } catch {
    return null;
  }
}
