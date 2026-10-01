import React, { useState, useEffect } from 'react';
import { ClassRecord, Language } from '../types';
import { translations } from '../i18n/translations';
import { calculateLiveStats } from '../utils/calculator';
import { ALGERIAN_UNIVERSITY_SPECIALTIES, UniversitySpecialty } from '../utils/specialties';
import { DonutChart, GradeDisplay, HorizontalBar } from './Charts';
import { Save, RotateCcw, AlertCircle, Sparkles, Building2, User, GraduationCap, BookOpen } from 'lucide-react';

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

  // Form states: ensure no pre-filled middle school or old names
  const [teacherName, setTeacherName] = useState(() => {
    if (defaultTeacherName && defaultTeacherName.includes('عبد القادر')) return '';
    return defaultTeacherName;
  });

  const [schoolName, setSchoolName] = useState(() => {
    if (defaultSchoolName && (defaultSchoolName.includes('متوسطة') || defaultSchoolName.includes('بوعزيز'))) {
      return '';
    }
    return defaultSchoolName;
  });

  // Algerian University Specialty
  const [selectedSpecialtyCode, setSelectedSpecialtyCode] = useState<string>('INFO');
  const [className, setClassName] = useState<string>(() => {
    const defaultSpec = ALGERIAN_UNIVERSITY_SPECIALTIES[0];
    return lang === 'ar' ? defaultSpec.nameAr : defaultSpec.nameFr;
  });

  const [totalStudents, setTotalStudents] = useState<string>('45');
  const [readersCount, setReadersCount] = useState<string>('34');
  const [nonReadersCount, setNonReadersCount] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Update default specialty name when language switches if user hasn't typed custom
  useEffect(() => {
    const found = ALGERIAN_UNIVERSITY_SPECIALTIES.find((s) => s.code === selectedSpecialtyCode);
    if (found) {
      setClassName(lang === 'ar' ? found.nameAr : found.nameFr);
    }
  }, [lang, selectedSpecialtyCode]);

  // Calculate live results
  const liveResult = calculateLiveStats(totalStudents, readersCount, nonReadersCount, lang);

  // Derived effective numbers for preview
  const numTotal = Number(totalStudents) || 0;
  const numReaders = readersCount.trim() !== '' ? Number(readersCount) : 0;
  const numNonReaders =
    nonReadersCount.trim() !== ''
      ? Number(nonReadersCount)
      : Math.max(0, numTotal - numReaders);

  const handleReadersChange = (val: string) => {
    setReadersCount(val);
  };

  const handleTotalChange = (val: string) => {
    setTotalStudents(val);
  };

  const handleStepReaders = (delta: number) => {
    const cur = Number(readersCount) || 0;
    const next = Math.max(0, cur + delta);
    setReadersCount(String(next));
    if (nonReadersCount !== '') {
      setNonReadersCount('');
    }
  };

  const handleStepTotal = (delta: number) => {
    const cur = Number(totalStudents) || 0;
    const next = Math.max(1, cur + delta);
    setTotalStudents(String(next));
  };

  const handleSpecialtySelect = (spec: UniversitySpecialty) => {
    setSelectedSpecialtyCode(spec.code);
    setClassName(lang === 'ar' ? spec.nameAr : spec.nameFr);
  };

  const handleReset = () => {
    setTotalStudents('');
    setReadersCount('');
    setNonReadersCount('');
    setNotes('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!liveResult.isValid) {
      return;
    }

    const effectiveSchool = schoolName.trim() || 'جامعة الجزائر';
    // Save profile for reuse
    onUpdateProfile(teacherName.trim(), schoolName.trim());

    onSaveClass({
      teacherName: teacherName.trim() || undefined,
      schoolName: effectiveSchool,
      className: className.trim() || (lang === 'ar' ? 'الإعلام الآلي (Informatique)' : 'Informatique'),
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
        {/* Left Column: Input Form (lg:col-span-7) */}
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
            {/* University & Professor fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Institution / University */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {t.schoolName}
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">({t.optional})</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder={t.schoolNamePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all min-h-[44px]"
                  />
                </div>
                {/* Blurry ghost preview indicator so user never has to delete anything */}
                <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="text-slate-400 dark:text-slate-500">مثال افتراضي:</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-400 blur-[0.4px] select-none hover:blur-none transition-all">
                    جامعة الجزائر
                  </span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">(اكتب جامعتك مباشرة دون مسح)</span>
                </div>
              </div>

              {/* Professor / Academic Supervisor */}
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
            </div>

            {/* University Specialization Section (replaces old middle-school classes) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#006233] dark:text-emerald-400" />
                  {t.className}
                </span>
                <span className="text-rose-500 font-bold">*</span>
              </label>

              {/* Algerian University Specialization Select Dropdown */}
              <div className="space-y-2">
                <select
                  value={selectedSpecialtyCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    setSelectedSpecialtyCode(code);
                    const found = ALGERIAN_UNIVERSITY_SPECIALTIES.find((s) => s.code === code);
                    if (found) {
                      setClassName(lang === 'ar' ? found.nameAr : found.nameFr);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold border border-emerald-300 dark:border-emerald-800/70 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] transition-all min-h-[44px]"
                >
                  <optgroup label="تخصصات العلوم والتكنولوجيا (Sciences & Technologies)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter(
                      (s) => s.category === 'sciences' || s.category === 'technology'
                    ).map((s) => (
                      <option key={s.code} value={s.code}>
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="العلوم الطبية والصيدلة (Sciences Médicales)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'medical').map((s) => (
                      <option key={s.code} value={s.code}>
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="العلوم الاقتصادية والتسيير (Sciences Économiques & Gestion)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'economics').map((s) => (
                      <option key={s.code} value={s.code}>
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="الحقوق والعلوم السياسية (Droit & Sciences Politiques)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'law').map((s) => (
                      <option key={s.code} value={s.code}>
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="الآداب واللغات والعلوم الإنسانية (Lettres, Langues & SHS)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'humanities').map((s) => (
                      <option key={s.code} value={s.code}>
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <option value="CUSTOM">تخصص جامعي آخر (إدخال يدوي)...</option>
                </select>

                {/* Direct fine-tuning or custom major input */}
                <input
                  type="text"
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                    setSelectedSpecialtyCode('CUSTOM');
                  }}
                  placeholder={t.classNamePlaceholder}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] transition-all min-h-[44px]"
                />

                {/* Quick Selection Tags of Popular Algerian University Specialties */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ALGERIAN_UNIVERSITY_SPECIALTIES.slice(0, 6).map((spec) => (
                    <button
                      key={spec.code}
                      type="button"
                      onClick={() => handleSpecialtySelect(spec)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        selectedSpecialtyCode === spec.code
                          ? 'bg-[#006233] text-white border-[#006233]'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      {lang === 'ar' ? spec.nameAr.split('(')[0].trim() : spec.nameFr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Students */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
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

            {/* Readers and Non-Readers */}
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

              {/* Non-Readers */}
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

            {/* Academic Observations / Notes */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ar'
                  ? 'ملاحظات وتوصيات أكاديمية (اختياري)'
                  : lang === 'fr'
                  ? 'Observations académiques (optionnel)'
                  : 'Academic Notes (optional)'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'مثال: إقبال ممتاز على قواعد البيانات العلمية SNDL، الحاجة لدعم رصيد المكتبة بالمراجع الحديثة...'
                    : lang === 'fr'
                    ? 'Ex: Forte consultation des plateformes documentaires SNDL, intérêt pour les thèses...'
                    : 'e.g., Active use of scientific journals, borrowing specialized monographs...'
                }
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={!liveResult.isValid}
                className={`w-full sm:flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px] ${
                  liveResult.isValid
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
