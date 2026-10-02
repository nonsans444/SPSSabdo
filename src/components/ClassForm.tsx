import React, { useState, useEffect } from 'react';
import { ClassRecord, Language } from '../types';
import { translations } from '../i18n/translations';
import { calculateLiveStats } from '../utils/calculator';
import { ALGERIAN_UNIVERSITY_SPECIALTIES, UniversitySpecialty } from '../utils/specialties';
import { DonutChart, GradeDisplay, HorizontalBar } from './Charts';
import { Save, RotateCcw, AlertCircle, Sparkles, Building2, User, GraduationCap, ChevronDown } from 'lucide-react';

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

  // Update default specialty name when language switches
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
        {/* Main University Form Card (Matched to user screenshot) */}
        <div className="lg:col-span-7 bg-[#0A2218]/92 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-emerald-700/50">
          {/* Section Header */}
          <div className="mb-6 pb-4 border-b border-emerald-900/60 flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-inner">
              <GraduationCap className="w-6 h-6 text-[#6CE89F]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {t.teacherFormTitle}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 leading-relaxed">
                {t.teacherFormSubtitle}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: الجامعة / المركز الجامعي */}
            <div>
              <label className="block text-xs font-bold text-emerald-100 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#6CE89F]" />
                  {t.schoolName}
                </span>
                <span className="text-[11px] font-normal text-emerald-300/70">({t.optional})</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder={t.schoolNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-center border border-emerald-600/50 bg-[#0E2C1E]/90 text-white placeholder:text-slate-400/60 focus:outline-hidden focus:ring-2 focus:ring-[#6CE89F] focus:border-transparent transition-all min-h-[46px] shadow-inner"
                />
              </div>
              {/* Blurry ghost preview indicator as in screenshot */}
              <div className="mt-1.5 text-center text-xs text-emerald-300/80">
                <span className="text-emerald-400/70">مثال افتراضي: </span>
                <span className="font-semibold text-slate-300 blur-[0.4px] select-none hover:blur-none transition-all">
                  جامعة الجزائر
                </span>
                <span className="text-[11px] text-emerald-400/60"> (اكتب جامعتك مباشرة دون مسح)</span>
              </div>
            </div>

            {/* Field 2: الأستاذ(ة) المشرف / المحاضر */}
            <div>
              <label className="block text-xs font-bold text-emerald-100 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#6CE89F]" />
                  {t.teacherName}
                </span>
                <span className="text-[11px] font-normal text-emerald-300/70">({t.optional})</span>
              </label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder={t.teacherNamePlaceholder}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium text-center border border-emerald-600/50 bg-[#0E2C1E]/90 text-white placeholder:text-slate-400/60 focus:outline-hidden focus:ring-2 focus:ring-[#6CE89F] focus:border-transparent transition-all min-h-[46px] shadow-inner"
              />
            </div>

            {/* Field 3: Specialty Select Dropdown */}
            <div>
              <label className="block text-xs font-bold text-emerald-100 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#6CE89F]" />
                  {t.className}
                </span>
                <span className="text-rose-400 font-bold">*</span>
              </label>
              <div className="relative">
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
                  className="w-full appearance-none px-4 py-3 rounded-xl text-sm font-bold text-center border border-emerald-600/50 bg-[#0E2C1E]/90 text-white focus:outline-hidden focus:ring-2 focus:ring-[#6CE89F] transition-all min-h-[46px] shadow-inner cursor-pointer"
                >
                  <optgroup label="تخصصات العلوم والتكنولوجيا (Sciences & Technologies)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter(
                      (s) => s.category === 'sciences' || s.category === 'technology'
                    ).map((s) => (
                      <option key={s.code} value={s.code} className="bg-[#0A2218] text-white py-1">
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="العلوم الطبية والصيدلة (Sciences Médicales)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'medical').map((s) => (
                      <option key={s.code} value={s.code} className="bg-[#0A2218] text-white py-1">
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="العلوم الاقتصادية والتسيير (Sciences Économiques & Gestion)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'economics').map((s) => (
                      <option key={s.code} value={s.code} className="bg-[#0A2218] text-white py-1">
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="الحقوق والعلوم السياسية (Droit & Sciences Politiques)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'law').map((s) => (
                      <option key={s.code} value={s.code} className="bg-[#0A2218] text-white py-1">
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="الآداب واللغات والعلوم الإنسانية (Lettres, Langues & SHS)">
                    {ALGERIAN_UNIVERSITY_SPECIALTIES.filter((s) => s.category === 'humanities').map((s) => (
                      <option key={s.code} value={s.code} className="bg-[#0A2218] text-white py-1">
                        {lang === 'ar' ? s.nameAr : s.nameFr}
                      </option>
                    ))}
                  </optgroup>
                  <option value="CUSTOM" className="bg-[#0A2218] text-amber-300 py-1">
                    تخصص جامعي آخر (إدخال يدوي)...
                  </option>
                </select>
                <div className="absolute start-3 top-3.5 pointer-events-none text-emerald-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Field 4: Custom / active specialty input */}
            <div>
              <input
                type="text"
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  setSelectedSpecialtyCode('CUSTOM');
                }}
                placeholder={t.classNamePlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl text-sm font-bold text-center border border-emerald-600/50 bg-[#0E2C1E]/90 text-white focus:outline-hidden focus:ring-2 focus:ring-[#6CE89F] transition-all min-h-[46px] shadow-inner"
              />
            </div>

            {/* Quick Selection Buttons Row (Exactly matching user screenshot) */}
            <div className="space-y-2 pt-1">
              {/* Row 1: Large button pills with golden/emerald border */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const aiSpec = ALGERIAN_UNIVERSITY_SPECIALTIES.find((s) => s.code === 'AI') || ALGERIAN_UNIVERSITY_SPECIALTIES[1];
                    handleSpecialtySelect(aiSpec);
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center ${
                    selectedSpecialtyCode === 'AI' || selectedSpecialtyCode === 'INFO'
                      ? 'border-[#C89D34] bg-[#0E2C1D] text-amber-200 shadow-md'
                      : 'border-emerald-700/60 bg-[#0E281C]/70 text-emerald-100 hover:border-[#C89D34]'
                  }`}
                >
                  الإعلام الآلي والذكاء الاصطناعي وعلوم البيانات
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const medSpec = ALGERIAN_UNIVERSITY_SPECIALTIES.find((s) => s.code === 'MED') || ALGERIAN_UNIVERSITY_SPECIALTIES[2];
                    handleSpecialtySelect(medSpec);
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center ${
                    selectedSpecialtyCode === 'MED'
                      ? 'border-[#C89D34] bg-[#0E2C1D] text-amber-200 shadow-md'
                      : 'border-emerald-700/60 bg-[#0E281C]/70 text-emerald-100 hover:border-[#C89D34]'
                  }`}
                >
                  الطب البشري
                </button>
              </div>

              {/* Row 2: Smaller selection pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {ALGERIAN_UNIVERSITY_SPECIALTIES.slice(0, 5).map((spec) => {
                  const isSelected = selectedSpecialtyCode === spec.code;
                  return (
                    <button
                      key={spec.code}
                      type="button"
                      onClick={() => handleSpecialtySelect(spec)}
                      className={`text-xs px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
                        isSelected
                          ? 'bg-[#00A859] text-white shadow-md font-bold'
                          : 'bg-[#0E281C] text-emerald-200 border border-emerald-800/80 hover:bg-[#123626]'
                      }`}
                    >
                      {lang === 'ar' ? spec.nameAr.split('(')[0].trim() : spec.nameFr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Students */}
            <div className="pt-3 border-t border-emerald-900/60">
              <label className="block text-xs font-bold text-emerald-100 mb-1.5">
                {t.totalStudents} <span className="text-rose-400">*</span>
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
                    className="w-full px-4 py-2.5 rounded-xl text-base font-black text-center tabular-nums border border-emerald-600/50 bg-[#0E2C1E]/90 text-white focus:outline-hidden focus:ring-2 focus:ring-[#6CE89F] transition-all min-h-[46px]"
                  />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStepTotal(-1)}
                    className="w-10 h-10 rounded-xl bg-[#0E2C1E] border border-emerald-700/60 hover:bg-[#153B29] text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                    title="-1"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepTotal(1)}
                    className="w-10 h-10 rounded-xl bg-[#0E2C1E] border border-emerald-700/60 hover:bg-[#153B29] text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
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
                <label className="block text-xs font-bold text-[#6CE89F] mb-1.5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A859]" />
                  {t.readersCount} <span className="text-rose-400">*</span>
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
                    className="w-full px-3 py-2.5 rounded-xl text-base font-bold text-center tabular-nums border border-emerald-500/60 bg-[#0E2C1E]/90 text-white focus:outline-hidden focus:ring-2 focus:ring-[#6CE89F] transition-all min-h-[46px]"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleStepReaders(-1)}
                      className="w-10 h-10 rounded-xl bg-[#0E2C1E] border border-emerald-700/60 hover:bg-[#153B29] text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                      title="-1"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStepReaders(1)}
                      className="w-10 h-10 rounded-xl bg-[#0E2C1E] border border-emerald-700/60 hover:bg-[#153B29] text-emerald-200 font-bold flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                      title="+1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Non-Readers */}
              <div>
                <label className="block text-xs font-bold text-rose-300 mb-1.5 flex items-center justify-between">
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
                    className="w-full px-3 py-2.5 rounded-xl text-base font-bold text-center tabular-nums border border-rose-800/60 bg-[#1F1215]/90 text-white focus:outline-hidden focus:ring-2 focus:ring-[#D21034] transition-all min-h-[46px]"
                  />
                  {nonReadersCount === '' && totalStudents && readersCount && (
                    <span className="absolute end-3 top-3 text-[11px] text-rose-300/70 pointer-events-none italic">
                      = {Math.max(0, Number(totalStudents) - Number(readersCount))}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message banner if invalid */}
            {!liveResult.isValid && liveResult.errorMessage && (
              <div
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs sm:text-sm animate-shake shadow-lg"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{liveResult.errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={!liveResult.isValid}
                className={`w-full sm:flex-1 h-12 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg min-h-[48px] ${
                  liveResult.isValid
                    ? 'bg-[#008844] hover:bg-[#00A859] text-white cursor-pointer active:scale-[0.99] border border-emerald-400/40'
                    : 'bg-emerald-950/50 text-slate-500 cursor-not-allowed border border-emerald-950'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>{t.saveClassBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 h-12 rounded-xl border border-emerald-700/60 bg-[#0E281C] hover:bg-[#123626] text-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors min-h-[48px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetBtn}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Statistics Visualizer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0A2218]/92 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-emerald-700/50">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C89D34]" />
                <h3 className="font-bold text-base text-white">
                  {t.liveStatsTitle}
                </h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#6CE89F] font-bold border border-emerald-500/30">
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
              <span className="text-xs font-semibold text-emerald-200/80 block mb-1">
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
                isDark={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
