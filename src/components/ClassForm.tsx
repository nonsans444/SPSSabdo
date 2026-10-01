import React, { useState, useEffect } from 'react';
import { ClassRecord, Language } from '../types';
import { translations } from '../i18n/translations';
import { calculateLiveStats } from '../utils/calculator';
import { DonutChart, GradeDisplay, HorizontalBar } from './Charts';
import { Save, RotateCcw, AlertCircle, CheckCircle2, Sparkles, Building2, User, GraduationCap } from 'lucide-react';

interface ClassFormProps {
  onSaveClass: (record: Omit<ClassRecord, 'id' | 'createdAt'>) => void;
  lang: Language;
  isDark: boolean;
  defaultTeacherName?: string;
  defaultSchoolName?: string;
  onUpdateProfile: (teacherName: string, schoolName: string) => void;
}

export const ClassForm: React.FC<ClassFormProps> = ({
  onSaveClass,
  lang,
  isDark,
  defaultTeacherName = '',
  defaultSchoolName = '',
  onUpdateProfile,
}) => {
  const t = translations[lang];

  // Form states
  const [teacherName, setTeacherName] = useState(defaultTeacherName);
  const [schoolName, setSchoolName] = useState(defaultSchoolName);
  const [className, setClassName] = useState('3م2 (3AM2)');
  const [totalStudents, setTotalStudents] = useState<string>('32');
  const [readersCount, setReadersCount] = useState<string>('24');
  const [nonReadersCount, setNonReadersCount] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Quick class level badges (Algerian system: Primary AP, Middle AM, High AS)
  const quickClasses = ['1AM1', '2AM2', '3AM2', '4AM1', '1AS1', '2AS3', '3AS2', '5AP'];

  // Calculate live results
  const liveResult = calculateLiveStats(totalStudents, readersCount, nonReadersCount, lang);

  // Derived effective numbers for preview
  const numTotal = Number(totalStudents) || 0;
  const numReaders = readersCount.trim() !== '' ? Number(readersCount) : 0;
  const numNonReaders =
    nonReadersCount.trim() !== ''
      ? Number(nonReadersCount)
      : Math.max(0, numTotal - numReaders);

  // Auto-fill non-readers if total and readers are provided
  const handleReadersChange = (val: string) => {
    setReadersCount(val);
    if (val !== '' && totalStudents !== '' && !isNaN(Number(val)) && !isNaN(Number(totalStudents))) {
      const diff = Number(totalStudents) - Number(val);
      if (diff >= 0 && nonReadersCount === '') {
        // Will be automatically derived by liveResult
      }
    }
  };

  const handleTotalChange = (val: string) => {
    setTotalStudents(val);
  };

  const handleStepReaders = (delta: number) => {
    const cur = Number(readersCount) || 0;
    const next = Math.max(0, cur + delta);
    setReadersCount(String(next));
    if (nonReadersCount !== '') {
      // also adjust or clear nonReaders
      setNonReadersCount('');
    }
  };

  const handleStepTotal = (delta: number) => {
    const cur = Number(totalStudents) || 0;
    const next = Math.max(1, cur + delta);
    setTotalStudents(String(next));
  };

  const handleReset = () => {
    setClassName('');
    setTotalStudents('');
    setReadersCount('');
    setNonReadersCount('');
    setNotes('');
  };

  const handleQuickClassSelect = (cls: string) => {
    setClassName(cls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!className.trim()) {
      return;
    }

    if (!liveResult.isValid) {
      return;
    }

    // Save profile for reuse
    onUpdateProfile(teacherName, schoolName);

    onSaveClass({
      teacherName: teacherName.trim() || undefined,
      schoolName: schoolName.trim() || undefined,
      className: className.trim(),
      totalStudents: numTotal,
      readersCount: numReaders,
      nonReadersCount: numNonReaders,
      readerPercentage: liveResult.readerPercentage,
      nonReaderPercentage: liveResult.nonReaderPercentage,
      grade: liveResult.grade,
      level: liveResult.level,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Teacher Data Input Form (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#17241C] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-emerald-900/40">
          {/* Section Header */}
          <div className="mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#006233] dark:text-emerald-400" />
              {t.teacherFormTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.teacherFormSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Optional Teacher & School fields in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>

            {/* Class Name / Level with Quick Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.className} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder={t.classNamePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all min-h-[44px]"
              />

              {/* Quick Algerian Class Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  {lang === 'ar' ? 'أمثلة سريعة:' : lang === 'fr' ? 'Exemples rapides :' : 'Quick codes:'}
                </span>
                {quickClasses.map((cls) => (
                  <button
                    type="button"
                    key={cls}
                    onClick={() => handleQuickClassSelect(cls)}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-[#006233] dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Numbers: Total Students */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.totalStudents} <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    value={totalStudents}
                    onChange={(e) => handleTotalChange(e.target.value)}
                    placeholder={t.totalStudentsPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl text-base font-bold tabular-nums border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all min-h-[46px]"
                  />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStepTotal(-1)}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                    title="-1"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepTotal(1)}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                    title="+1"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Numbers: Readers and Non-Readers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Readers */}
              <div>
                <label className="block text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006233]" />
                  {t.readersCount} <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={readersCount}
                    onChange={(e) => handleReadersChange(e.target.value)}
                    placeholder={t.readersCountPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl text-base font-bold tabular-nums border border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all min-h-[46px]"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleStepReaders(-1)}
                      className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                      title="-1"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStepReaders(1)}
                      className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                      title="+1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Non-Readers (with auto-calculate indication) */}
              <div>
                <label className="block text-xs font-semibold text-rose-800 dark:text-rose-400 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D21034]" />
                    {t.nonReadersCount}
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">({t.optional})</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={nonReadersCount}
                    onChange={(e) => setNonReadersCount(e.target.value)}
                    placeholder={
                      totalStudents && readersCount
                        ? `${t.autoCalculatedHint} (${Math.max(0, Number(totalStudents) - Number(readersCount))})`
                        : t.nonReadersCountPlaceholder
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl text-base font-bold tabular-nums border border-rose-200 dark:border-rose-900 bg-rose-50/30 dark:bg-rose-950/20 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#D21034] focus:border-transparent transition-all min-h-[46px]"
                  />
                  {nonReadersCount === '' && totalStudents && readersCount && (
                    <span className="absolute end-3 top-3 text-[11px] text-slate-600 dark:text-slate-400 pointer-events-none italic">
                      = {Math.max(0, Number(totalStudents) - Number(readersCount))}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message banner if invalid */}
            {!liveResult.isValid && liveResult.errorMessage && (
              <div
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs sm:text-sm animate-shake"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{liveResult.errorMessage}</span>
              </div>
            )}

            {/* Pedagogical Observations / Notes */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ar'
                  ? 'ملاحظات بيداغوجية حول الفوج (اختياري)'
                  : lang === 'fr'
                  ? 'Observations pédagogiques sur la classe (optionnel)'
                  : 'Class Pedagogical Notes (optional)'}
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

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={!liveResult.isValid || !className.trim()}
                className={`w-full sm:flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px] ${
                  liveResult.isValid && className.trim()
                    ? 'bg-[#006233] hover:bg-[#00542c] text-white cursor-pointer active:scale-[0.99]'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>{t.saveClassBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 h-12 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors min-h-[48px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetBtn}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Statistics Visualizer (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#17241C] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-emerald-900/40">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {t.liveStatsTitle}
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#006233] dark:text-emerald-400 font-semibold">
                {liveResult.isValid ? t.systemReady : '...'}
              </span>
            </div>

            {/* Donut Chart */}
            <div className="pt-2">
              <DonutChart
                readerPercentage={liveResult.readerPercentage}
                nonReaderPercentage={liveResult.nonReaderPercentage}
                readersCount={numReaders}
                nonReadersCount={numNonReaders}
                total={numTotal}
                lang={lang}
                size={190}
              />
            </div>

            {/* Horizontal Comparative Bar */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                {t.ratioComparison}
              </span>
              <HorizontalBar
                readers={numReaders}
                nonReaders={numNonReaders}
                total={numTotal}
                lang={lang}
              />
            </div>

            {/* Grade Display */}
            <div className="pt-3">
              <GradeDisplay
                grade={liveResult.grade}
                level={liveResult.level}
                lang={lang}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
