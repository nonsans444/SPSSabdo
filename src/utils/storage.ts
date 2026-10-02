import { ClassRecord } from '../types';

const STORAGE_KEY = 'spss_university_specialties_records_v2';
const PROFILE_KEY = 'spss_university_profile_v2';

export const SAMPLE_CLASSES: ClassRecord[] = [
  {
    id: 'sample-1',
    teacherName: 'د. أستاذ محاضر',
    schoolName: 'جامعة الجزائر',
    className: 'الإعلام الآلي (Informatique)',
    totalStudents: 45,
    readersCount: 38,
    nonReadersCount: 7,
    readerPercentage: 84.4,
    nonReaderPercentage: 15.6,
    grade: 16.9,
    level: 'excellent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    notes: 'مؤشرات إحصائية متميزة، استجابة عالية في التقييم وتفوق في نسب التحقيق الإيجابية.',
  },
  {
    id: 'sample-2',
    teacherName: 'د. أستاذ محاضر',
    schoolName: 'جامعة الجزائر',
    className: 'الطب البشري (Médecine Générale)',
    totalStudents: 60,
    readersCount: 52,
    nonReadersCount: 8,
    readerPercentage: 86.7,
    nonReaderPercentage: 13.3,
    grade: 17.3,
    level: 'excellent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    notes: 'تحقيق نسب نجاح متقدمة واستقرار نوعي في المؤشرات الإحصائية العامة للعينة.',
  },
  {
    id: 'sample-3',
    teacherName: 'د. أستاذ محاضر',
    schoolName: 'جامعة الجزائر',
    className: 'العلوم الاقتصادية والتسيير (Sciences Économiques)',
    totalStudents: 50,
    readersCount: 34,
    nonReadersCount: 16,
    readerPercentage: 68.0,
    nonReaderPercentage: 32.0,
    grade: 13.6,
    level: 'good',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    notes: 'توزيع إحصائي متوازن مع اتجاه إيجابي في متوسط العلامات والنسب المحققة.',
  },
  {
    id: 'sample-4',
    teacherName: 'د. أستاذ محاضر',
    schoolName: 'جامعة الجزائر',
    className: 'الحقوق والعلوم السياسية (Droit & Sciences Juridiques)',
    totalStudents: 55,
    readersCount: 42,
    nonReadersCount: 13,
    readerPercentage: 76.4,
    nonReaderPercentage: 23.6,
    grade: 15.3,
    level: 'excellent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    notes: 'نسبة إنجاز مرتفعة في المؤشر العام مع تجانس ملحوظ في نتائج الفئات المقيّمة.',
  },
  {
    id: 'sample-5',
    teacherName: 'د. أستاذ محاضر',
    schoolName: 'جامعة الجزائر',
    className: 'الهندسة المعمارية والعمران (Architecture & Urbanisme)',
    totalStudents: 36,
    readersCount: 22,
    nonReadersCount: 14,
    readerPercentage: 61.1,
    nonReaderPercentage: 38.9,
    grade: 12.2,
    level: 'good',
    createdAt: new Date().toISOString(),
    notes: 'مؤشر إحصائي معتدل، يوصى بدراسة المتغيرات لرفع نسبة الإنجاز والتحصيل العام.',
  },
];

export function getStoredClasses(): ClassRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_CLASSES));
      return SAMPLE_CLASSES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Check if it's the old middle school dataset
      const isOldData = parsed.some(
        (c) =>
          c.className?.includes('3AM') ||
          c.className?.includes('3م2') ||
          c.teacherName?.includes('عبد القادر بن عيسى') ||
          c.schoolName?.includes('متوسطة')
      );
      if (isOldData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_CLASSES));
        return SAMPLE_CLASSES;
      }
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
      const parsed = JSON.parse(raw);
      if (parsed.teacherName && parsed.teacherName.includes('عبد القادر')) {
        parsed.teacherName = '';
      }
      if (parsed.schoolName && (parsed.schoolName.includes('متوسطة') || parsed.schoolName.includes('بوعزيز'))) {
        parsed.schoolName = '';
      }
      return parsed;
    }
  } catch (e) {
    console.warn(e);
  }
  return {
    teacherName: '',
    schoolName: '',
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
  downloadAnchor.setAttribute('download', `spss_university_specialties_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseClassesJson(jsonText: string): ClassRecord[] | null {
  try {
    const parsed = JSON.parse(jsonText);
    if (Array.isArray(parsed)) {
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
