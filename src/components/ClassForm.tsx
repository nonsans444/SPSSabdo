import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Calculator, RotateCcw, AlertCircle, Building2, User, BookOpen } from 'lucide-react';

interface ClassFormProps {
  onCalculate: (data: {
    teacherName: string;
    schoolName: string;
    className: string;
    totalStudents: number;
    readersCount: number;
    nonReadersCount: number;
    notes: string;
  }) => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  onReset: () => void;
  lang: Language;
  isDark: boolean;
}

export const ClassForm: React.FC<ClassFormProps> = ({
  onCalculate,
  errorMessage,
  setErrorMessage,
  onReset,
  lang,
  isDark,
}) => {
  const t = translations[lang];

  // Form input states
  const [teacherName, setTeacherName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [className, setClassName] = useState('3م2');
  const [totalStudents, setTotalStudents] = useState<string>('30');
  const [readersCount, setReadersCount] = useState<string>('21');
  const [nonReadersCount, setNonReadersCount] = useState<string>('9');
  const [notes, setNotes] = useState<string>('');

  const handleStepTotal = (delta: number) => {
    const cur = Number(totalStudents) || 0;
    const next = Math.max(1, cur + delta);
    setTotalStudents(String(next));
    setErrorMessage(null);
  };

  const handleStepReaders = (delta: number) => {
    const cur = Number(readersCount) || 0;
    const next = Math.max(0, cur + delta);
    setReadersCount(String(next));
    setErrorMessage(null);
  };

  const handleStepNonReaders = (delta: number) => {
    const cur = Number(nonReadersCount) || 0;
    const next = Math.max(0, cur + delta);
    setNonReadersCount(String(next));
    setErrorMessage(null);
  };

  const handleResetForm = () => {
    setTeacherName('');
    setSchoolName('');
    setClassName('');
    setTotalStudents('');
    setReadersCount('');
    setNonReadersCount('');
    setNotes('');
    setErrorMessage(null);
    onReset();
  };

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Check total students provided
    if (!totalStudents.trim()) {
      setErrorMessage(t.errTotalRequired);
      return;
    }

    const total = Number(totalStudents);

    // 2. Validate total is integer and positive
    if (isNaN(total) || !Number.isInteger(total)) {
      setErrorMessage(t.errWholeNumbers);
      return;
    }
    if (total <= 0) {
      setErrorMessage(t.errTotalPositive);
      return;
    }

    // 3. Check readers provided
    if (!readersCount.trim()) {
      setErrorMessage(t.errReadersRequired);
      return;
    }

    const readers = Number(readersCount);

    if (isNaN(readers) || !Number.isInteger(readers) || readers < 0) {
      setErrorMessage(t.errWholeNumbers);
      return;
    }

    // 4. Check readers cannot exceed total
    if (readers > total) {
      setErrorMessage(t.errReadersExceedTotal(readers, total));
      return;
    }

    // 5. Handle non-readers: auto-calculate if empty
    let nonReaders: number;
    if (!nonReadersCount.trim()) {
      nonReaders = total - readers;
      setNonReadersCount(String(nonReaders));
    } else {
      nonReaders = Number(nonReadersCount);
      if (isNaN(nonReaders) || !Number.isInteger(nonReaders) || nonReaders < 0) {
        setErrorMessage(t.errWholeNumbers);
        return;
      }
      if (nonReaders > total) {
        setErrorMessage(t.errNonReadersExceedTotal(nonReaders, total));
        return;
      }
      // Check sum equality
      if (readers + nonReaders !== total) {
        setErrorMessage(t.errSumMismatch(readers, nonReaders, readers + nonReaders, total));
        return;
      }
    }

    // Validation passed: calculate statistics cleanly
    onCalculate({
      teacherName: teacherName.trim(),
      schoolName: schoolName.trim(),
      className: className.trim(),
      totalStudents: total,
      readersCount: readers,
      nonReadersCount: nonReaders,
      notes: notes.trim(),
    });
  };

  return (
    <div className="bg-white dark:bg-[#17241C] rounded-2xl p-5 sm:p-7 shadow-sm border border-slate-200/80 dark:border-emerald-900/40">
      {/* Form Header */}
      <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#006233] dark:text-emerald-400" />
          {t.teacherFormTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
          {t.teacherFormSubtitle}
        </p>
      </div>

      <form onSubmit={handleCalculateSubmit} className="space-y-4">
        {/* Optional School, Teacher, Class in responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {t.schoolName}
              </span>
              <span className="text-[11px] font-normal text-slate-400">({t.optional})</span>
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder={t.schoolNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {t.teacherName}
              </span>
              <span className="text-[11px] font-normal text-slate-400">({t.optional})</span>
            </label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder={t.teacherNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span>{t.className}</span>
              <span className="text-[11px] font-normal text-slate-400">({t.optional})</span>
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder={t.classNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all min-h-[44px]"
            />
          </div>
        </div>

        {/* Numbers Section: Total Students, Readers, Non-readers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Total Students */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.totalStudents} <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={totalStudents}
                onChange={(e) => {
                  setTotalStudents(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder={t.totalStudentsPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl text-base font-bold tabular-nums border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] transition-all min-h-[46px]"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStepTotal(-1)}
                  className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[36px]"
                  title="-1"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleStepTotal(1)}
                  className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[36px]"
                  title="+1"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Readers Count */}
          <div>
            <label className="block text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006233]" />
              {t.readersCount} <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={readersCount}
                onChange={(e) => {
                  setReadersCount(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder={t.readersCountPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl text-base font-bold tabular-nums border border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] transition-all min-h-[46px]"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStepReaders(-1)}
                  className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[36px]"
                  title="-1"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleStepReaders(1)}
                  className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[36px]"
                  title="+1"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Non-readers Count */}
          <div>
            <label className="block text-xs font-semibold text-rose-800 dark:text-rose-400 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D21034]" />
                {t.nonReadersCount}
              </span>
              <span className="text-[11px] font-normal text-slate-400">({t.optional})</span>
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                pattern="[0-9]*"
                value={nonReadersCount}
                onChange={(e) => {
                  setNonReadersCount(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder={t.nonReadersCountPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl text-base font-bold tabular-nums border border-rose-200 dark:border-rose-900 bg-rose-50/20 dark:bg-rose-950/20 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#D21034] transition-all min-h-[46px]"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStepNonReaders(-1)}
                  className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[36px]"
                  title="-1"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleStepNonReaders(1)}
                  className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[36px]"
                  title="+1"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error alert banner if validation fails */}
        {errorMessage && (
          <div
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs sm:text-sm animate-shake mt-2"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-semibold leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Optional Notes */}
        <div className="pt-1">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {lang === 'ar'
              ? 'ملاحظات بيداغوجية حول الفوج (اختياري)'
              : lang === 'fr'
              ? 'Observations pédagogiques (optionnel)'
              : 'Pedagogical Notes (optional)'}
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'مثال: تفاعل إيجابي مع مكتبة القسم، الحاجة لتنويع العناوين الأدبية...'
                : lang === 'fr'
                ? 'Ex: Bonne fréquentation de la bibliothèque, engouement pour les contes...'
                : 'e.g., Active library borrowing, interest in historical fiction...'
            }
            className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Primary Action Buttons: Calculate Statistics & Reset */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="w-full sm:flex-1 h-13 rounded-xl bg-[#006233] hover:bg-[#00542c] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] cursor-pointer min-h-[50px]"
          >
            <Calculator className="w-5 h-5" />
            <span>{t.calculateBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleResetForm}
            className="w-full sm:w-auto px-5 h-13 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors min-h-[50px] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.resetBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
