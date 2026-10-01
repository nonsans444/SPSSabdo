import React, { useState } from 'react';
import { ClassRecord, Language } from '../types';
import { translations } from '../i18n/translations';
import { computeOverallStats } from '../utils/calculator';
import { AlgerianCrescentStar } from './AlgerianEmblem';
import { Printer, ArrowLeft, ArrowRight, FileText } from 'lucide-react';

interface ReportViewProps {
  classes: ClassRecord[];
  teacherName?: string;
  schoolName?: string;
  lang: Language;
  onBack: () => void;
  isDark: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({
  classes,
  teacherName,
  schoolName,
  lang,
  onBack,
  isDark,
}) => {
  const t = translations[lang];
  const stats = computeOverallStats(classes);

  const [wilaya, setWilaya] = useState('الجزائر');
  const [customObservations, setCustomObservations] = useState('');

  const currentDate = new Intl.DateTimeFormat(
    lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-DZ' : 'en-US',
    {
      dateStyle: 'full',
    }
  ).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'ar' ? 'العودة للسجلات' : lang === 'fr' ? 'Retour aux registres' : 'Back to Records'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006233] hover:bg-[#00542c] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printBtn}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 styling) */}
      <div className="bg-white text-black p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full">
        {/* Official Algerian Republic Header */}
        <div className="text-center pb-6 border-b-2 border-[#006233]">
          <div className="flex justify-center mb-2">
            <AlgerianCrescentStar size={36} color="#006233" />
          </div>
          <h1 className="text-base sm:text-lg font-bold tracking-wide text-slate-900">
            {t.republicTitle}
          </h1>
          <h2 className="text-sm sm:text-base font-semibold text-emerald-900 mt-0.5">
            {t.ministryTitle}
          </h2>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 mt-4 px-2">
            <div className="flex items-center gap-1.5 font-medium">
              <span>{t.directorateTitle}</span>
              <input
                type="text"
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                placeholder="مثال: جامعة الجزائر 1"
                className="no-print bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 text-xs font-semibold focus:outline-hidden"
              />
              <span className="hidden print:inline font-bold underline">{wilaya}</span>
            </div>

            <div className="font-semibold text-slate-800">
              {t.academicYearLabel}
            </div>
          </div>
        </div>

        {/* Institution and Teacher Meta Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 text-xs border-b border-slate-200 text-slate-800">
          <div>
            <span className="font-bold text-slate-900">{t.schoolName}:</span>{' '}
            {schoolName && schoolName.trim() ? (
              <span className="font-semibold">{schoolName}</span>
            ) : (
              <span className="text-slate-400 italic font-normal tracking-wide blur-[0.35px] select-none">
                جامعة الجزائر (مثال)
              </span>
            )}
          </div>
          <div className="text-start sm:text-end">
            <span className="font-bold text-slate-900">{t.teacherName}:</span>{' '}
            {teacherName && teacherName.trim() ? (
              <span className="font-semibold">{teacherName}</span>
            ) : (
              <span className="text-slate-400 italic font-normal tracking-wide blur-[0.35px] select-none">
                {lang === 'ar' ? 'الأستاذ(ة) المشرف(ة) (مثال)' : 'Enseignant Référent (Exemple)'}
              </span>
            )}
          </div>
          <div>
            <span className="font-bold text-slate-900">{t.dateLabel}</span>{' '}
            <span>{currentDate}</span>
          </div>
          <div className="text-start sm:text-end">
            <span className="font-bold text-slate-900">{t.totalClassesLabel}:</span>{' '}
            <span className="font-bold tabular-nums">{classes.length}</span>
          </div>
        </div>

        {/* Main Document Title */}
        <div className="text-center my-6">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-emerald-50 border border-[#006233]/40 text-[#006233] font-black text-sm sm:text-base uppercase tracking-tight">
            {t.pedagogicalReportHeading}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            SPSS - Higher Education Academic Reading Statistics System
          </p>
        </div>

        {/* Table of Major Results */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-start border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <th className="p-2 border border-slate-300 text-center w-10">#</th>
                <th className="p-2 border border-slate-300 text-start">{t.className}</th>
                <th className="p-2 border border-slate-300 text-center">{t.totalStudentsLabel}</th>
                <th className="p-2 border border-slate-300 text-center text-emerald-900">
                  {t.readersLabel}
                </th>
                <th className="p-2 border border-slate-300 text-center text-rose-900">
                  {t.nonReadersLabel}
                </th>
                <th className="p-2 border border-slate-300 text-center">{t.readerPercentage}</th>
                <th className="p-2 border border-slate-300 text-center">{t.gradeOutOf20}</th>
                <th className="p-2 border border-slate-300 text-center">{t.evaluationLevel}</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, idx) => {
                const levelName =
                  c.level === 'excellent'
                    ? t.levelExcellent
                    : c.level === 'good'
                    ? t.levelGood
                    : c.level === 'needs_encouragement'
                    ? t.levelNeedsEncouragement
                    : t.levelLow;

                return (
                  <tr key={c.id} className="border-b border-slate-200 hover:bg-slate-50/50">
                    <td className="p-2 border border-slate-300 text-center tabular-nums font-semibold text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-900">
                      {c.className}
                    </td>
                    <td className="p-2 border border-slate-300 text-center tabular-nums">
                      {c.totalStudents}
                    </td>
                    <td className="p-2 border border-slate-300 text-center tabular-nums font-semibold text-emerald-800">
                      {c.readersCount}
                    </td>
                    <td className="p-2 border border-slate-300 text-center tabular-nums font-semibold text-rose-800">
                      {c.nonReadersCount}
                    </td>
                    <td className="p-2 border border-slate-300 text-center tabular-nums font-bold">
                      {c.readerPercentage.toFixed(1)}%
                    </td>
                    <td className="p-2 border border-slate-300 text-center tabular-nums font-black text-slate-900">
                      {c.grade.toFixed(1)}
                    </td>
                    <td className="p-2 border border-slate-300 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          c.level === 'excellent'
                            ? 'text-emerald-900 bg-emerald-100/70'
                            : c.level === 'good'
                            ? 'text-teal-900 bg-teal-100/70'
                            : c.level === 'needs_encouragement'
                            ? 'text-amber-900 bg-amber-100/70'
                            : 'text-rose-900 bg-rose-100/70'
                        }`}
                      >
                        {levelName}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Footer with Overall Totals */}
            <tfoot>
              <tr className="bg-slate-200/80 font-bold border-t-2 border-slate-400">
                <td colSpan={2} className="p-2.5 border border-slate-300 text-start font-black">
                  {lang === 'ar' ? 'المجموع والمعدل العام لكافة التخصصات' : 'Total et Moyenne Globale des Filières'}
                </td>
                <td className="p-2.5 border border-slate-300 text-center tabular-nums font-black">
                  {stats.totalStudents}
                </td>
                <td className="p-2.5 border border-slate-300 text-center tabular-nums font-black text-[#006233]">
                  {stats.totalReaders}
                </td>
                <td className="p-2.5 border border-slate-300 text-center tabular-nums font-black text-[#D21034]">
                  {stats.totalNonReaders}
                </td>
                <td className="p-2.5 border border-slate-300 text-center tabular-nums font-black text-emerald-900">
                  {stats.overallPercentage.toFixed(1)}%
                </td>
                <td className="p-2.5 border border-slate-300 text-center tabular-nums font-black text-slate-900">
                  {stats.averageGrade.toFixed(1)} / 20
                </td>
                <td className="p-2.5 border border-slate-300 text-center text-xs font-black text-slate-900">
                  {stats.overallPercentage >= 75
                    ? t.levelExcellent
                    : stats.overallPercentage >= 50
                    ? t.levelGood
                    : stats.overallPercentage >= 25
                    ? t.levelNeedsEncouragement
                    : t.levelLow}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Academic Observations & Recommendations */}
        <div className="my-6 p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <FileText className="w-4 h-4 text-[#006233]" />
            {t.pedagogicalObservations}
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {t.pedagogicalRecommendation}
          </p>
          <div className="no-print pt-2">
            <textarea
              rows={2}
              value={customObservations}
              onChange={(e) => setCustomObservations(e.target.value)}
              placeholder={lang === 'ar' ? 'أضف ملاحظات أو توصيات خاصة للأستاذ(ة) المشرف أو المجلس العلمي...' : 'Ajoutez des observations académiques personnalisées...'}
              className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>
          {customObservations && (
            <p className="text-slate-800 font-medium italic pt-1 border-t border-slate-200">
              "{customObservations}"
            </p>
          )}
        </div>

        {/* Official Signatures Block */}
        <div className="mt-10 pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
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
    </div>
  );
};
