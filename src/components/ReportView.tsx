import React, { useState } from 'react';
import { EvaluationLevel, Language } from '../types';
import { translations } from '../i18n/translations';
import { AlgerianCrescentStar } from './AlgerianEmblem';
import { DonutChart, HorizontalBar, GradeDisplay } from './Charts';
import { Printer, FileText, CheckCircle2 } from 'lucide-react';

interface ReportViewProps {
  schoolName: string;
  teacherName: string;
  className: string;
  totalStudents: number;
  readersCount: number;
  nonReadersCount: number;
  readerPercentage: number;
  nonReaderPercentage: number;
  grade: number;
  level: EvaluationLevel;
  notes?: string;
  lang: Language;
  isDark: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({
  schoolName,
  teacherName,
  className,
  totalStudents,
  readersCount,
  nonReadersCount,
  readerPercentage,
  nonReaderPercentage,
  grade,
  level,
  notes,
  lang,
  isDark,
}) => {
  const t = translations[lang];
  const [wilaya, setWilaya] = useState('الجزائر');

  // Immediate print without delays or countdowns
  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Intl.DateTimeFormat(
    lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-DZ' : 'en-US',
    { dateStyle: 'full' }
  ).format(new Date());

  const levelName =
    level === 'excellent'
      ? t.levelExcellent
      : level === 'good'
      ? t.levelGood
      : level === 'needs_encouragement'
      ? t.levelNeedsEncouragement
      : t.levelLow;

  const displaySchool = schoolName.trim() || (lang === 'ar' ? 'متوسطة الأمير عبد القادر' : lang === 'fr' ? 'CEM Émir Abdelkader' : 'Emir Abdelkader School');
  const displayTeacher = teacherName.trim() || (lang === 'ar' ? 'أ. بن علي' : lang === 'fr' ? 'M. Benali' : 'Mr. Benali');
  const displayClass = className.trim() || (lang === 'ar' ? '3م2' : '3AM2');

  return (
    <section className="mt-8 space-y-4">
      {/* Reports Area Action Card (Hidden during print) */}
      <div className="no-print bg-white dark:bg-[#17241C] p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-emerald-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#006233] dark:text-emerald-400" />
              {t.reportsAreaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.reportsAreaSubtitle}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006233] hover:bg-[#00542c] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>{t.printFullReportBtn}</span>
          </button>
        </div>

        {/* Informational note on saving as PDF */}
        <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2 leading-relaxed">
          <span>{t.printPdfNote}</span>
        </div>
      </div>

      {/* Official Pedagogical Report Sheet (Printable A4) */}
      <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full">
        {/* Republic & Ministry Header */}
        <div className="text-center pb-6 border-b-2 border-[#006233]">
          <div className="flex justify-center mb-2">
            <AlgerianCrescentStar size={38} color="#006233" />
          </div>
          <h1 className="text-base sm:text-lg font-bold tracking-wide text-slate-900">
            {t.republicTitle}
          </h1>
          <h2 className="text-sm sm:text-base font-semibold text-emerald-900 mt-0.5">
            {t.ministryTitle}
          </h2>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 mt-4 px-2">
            <div className="flex items-center gap-1.5 font-medium">
              <span>{t.directorateTitle}:</span>
              <input
                type="text"
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className="no-print bg-slate-50 border border-slate-300 rounded px-2 py-0.5 text-xs font-semibold focus:outline-hidden w-28"
              />
              <span className="hidden print:inline font-bold underline">{wilaya}</span>
            </div>

            <div className="font-semibold text-slate-800">
              {t.academicYearLabel}
            </div>
          </div>
        </div>

        {/* Class and Teacher Information */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs border-b border-slate-200 text-slate-800">
          <div>
            <span className="font-bold text-slate-900 block">{t.schoolName}:</span>
            <span className="font-semibold">{displaySchool}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 block">{t.teacherName}:</span>
            <span className="font-semibold">{displayTeacher}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 block">{t.className}:</span>
            <span className="font-bold text-emerald-900">{displayClass}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 block">{t.dateLabel}</span>
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center my-6">
          <div className="inline-block px-5 py-2 rounded-lg bg-emerald-50 border border-[#006233]/40 text-[#006233] font-black text-sm sm:text-base tracking-tight uppercase">
            {t.pedagogicalReportHeading}
          </div>
        </div>

        {/* Statistical Summary Table */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-start border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                <th className="p-2.5 border border-slate-300 text-center">{t.totalLabel}</th>
                <th className="p-2.5 border border-slate-300 text-center text-emerald-900">{t.readersLabel}</th>
                <th className="p-2.5 border border-slate-300 text-center text-rose-900">{t.nonReadersLabel}</th>
                <th className="p-2.5 border border-slate-300 text-center">{t.readerPercentage}</th>
                <th className="p-2.5 border border-slate-300 text-center">{t.nonReaderPercentage}</th>
                <th className="p-2.5 border border-slate-300 text-center">{t.gradeOutOf20}</th>
                <th className="p-2.5 border border-slate-300 text-center">{t.evaluationLevel}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center font-bold text-slate-800">
                <td className="p-3 border border-slate-300 text-base font-extrabold tabular-nums">
                  {totalStudents}
                </td>
                <td className="p-3 border border-slate-300 text-base font-extrabold text-[#006233] tabular-nums">
                  {readersCount}
                </td>
                <td className="p-3 border border-slate-300 text-base font-extrabold text-[#D21034] tabular-nums">
                  {nonReadersCount}
                </td>
                <td className="p-3 border border-slate-300 text-base font-extrabold text-[#006233] tabular-nums">
                  {readerPercentage.toFixed(1)}%
                </td>
                <td className="p-3 border border-slate-300 text-base font-extrabold text-[#D21034] tabular-nums">
                  {nonReaderPercentage.toFixed(1)}%
                </td>
                <td className="p-3 border border-slate-300 text-lg font-black text-slate-900 tabular-nums">
                  {grade.toFixed(1)} / 20
                </td>
                <td className="p-3 border border-slate-300">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-2xs"
                    style={{
                      backgroundColor:
                        level === 'excellent'
                          ? '#006233'
                          : level === 'good'
                          ? '#0D9488'
                          : level === 'needs_encouragement'
                          ? '#C59B27'
                          : '#D21034'
                    }}
                  >
                    {levelName}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visual Charts embedded in report */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 p-4 rounded-xl border border-slate-200 bg-slate-50/50 items-center">
          <div>
            <DonutChart
              readerPercentage={readerPercentage}
              nonReaderPercentage={nonReaderPercentage}
              readersCount={readersCount}
              nonReadersCount={nonReadersCount}
              total={totalStudents}
              lang={lang}
              size={170}
            />
          </div>
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 block">
              {t.ratioComparison}
            </span>
            <HorizontalBar
              readers={readersCount}
              nonReaders={nonReadersCount}
              total={totalStudents}
              lang={lang}
            />
            <div className="pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200">
              {level === 'excellent' && t.levelDescExcellent}
              {level === 'good' && t.levelDescGood}
              {level === 'needs_encouragement' && t.levelDescNeedsEncouragement}
              {level === 'low' && t.levelDescLow}
            </div>
          </div>
        </div>

        {/* Pedagogical Observations & Notes */}
        <div className="my-6 p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <FileText className="w-4 h-4 text-[#006233]" />
            {t.pedagogicalObservations}
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {t.pedagogicalRecommendation}
          </p>
          {notes && notes.trim() && (
            <div className="mt-2 pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-800 block mb-0.5">
                {lang === 'ar' ? 'ملاحظات الأستاذ(ة):' : lang === 'fr' ? 'Remarques de l\'enseignant(e) :' : 'Teacher Remarks:'}
              </span>
              <p className="italic text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                "{notes}"
              </p>
            </div>
          )}
        </div>

        {/* Official Signatures Block */}
        <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <span className="font-bold text-slate-800 block mb-12">
              {t.teacherSignature}
            </span>
            <div className="h-10 border-b border-dashed border-slate-400 mx-4" />
          </div>

          <div>
            <span className="font-bold text-slate-800 block mb-12">
              {t.principalSignature}
            </span>
            <div className="h-10 border-b border-dashed border-slate-400 mx-4" />
          </div>

          <div>
            <span className="font-bold text-slate-800 block mb-12">
              {t.inspectorSignature}
            </span>
            <div className="h-10 border-b border-dashed border-slate-400 mx-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
