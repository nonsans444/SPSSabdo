import React, { useState, useMemo } from 'react';
import { ClassRecord, Language, EvaluationLevel } from '../types';
import { translations } from '../i18n/translations';
import { computeOverallStats, getLevelColorClass } from '../utils/calculator';
import { ClassComparisonChart } from './Charts';
import {
  Users,
  BookCheck,
  BookX,
  TrendingUp,
  Award,
  AlertTriangle,
  Search,
  Filter,
  Trash2,
  Calendar,
  FileDown,
  Upload,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Printer,
  GraduationCap,
} from 'lucide-react';

interface RecordsViewProps {
  classes: ClassRecord[];
  onDeleteClass: (id: string) => void;
  onClearAll: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  onGoToCalculator: () => void;
  onGoToReport: () => void;
  onLoadSampleData: () => void;
  lang: Language;
  isDark: boolean;
}

export const RecordsView: React.FC<RecordsViewProps> = ({
  classes,
  onDeleteClass,
  onClearAll,
  onExportJson,
  onImportJson,
  onGoToCalculator,
  onGoToReport,
  onLoadSampleData,
  lang,
  isDark,
}) => {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | EvaluationLevel>('all');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Overall statistics
  const stats = useMemo(() => computeOverallStats(classes), [classes]);

  // Filtered classes
  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const matchQuery =
        !searchQuery.trim() ||
        item.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.schoolName && item.schoolName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.teacherName && item.teacherName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchLevel = levelFilter === 'all' || item.level === levelFilter;
      return matchQuery && matchLevel;
    });
  }, [classes, searchQuery, levelFilter]);

  const targetClassToDelete = classes.find((c) => c.id === deleteTargetId);

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      onDeleteClass(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      e.target.value = '';
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-DZ' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date);
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.recordsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {t.recordsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onGoToReport}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-[#006233] dark:text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printBtn}</span>
          </button>

          <button
            onClick={onExportJson}
            disabled={classes.length === 0}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors min-h-[44px] disabled:opacity-40"
            title={t.exportJsonBtn}
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.exportJsonBtn}</span>
          </button>

          <label className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px]">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.importJsonBtn}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>

          {classes.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-2.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1 transition-colors min-h-[44px]"
              title={t.clearAllBtn}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {classes.length === 0 ? (
        <div className="bg-white dark:bg-[#17241C] rounded-2xl p-8 sm:p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 max-w-xl mx-auto my-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#006233] dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {t.emptyRecordsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {t.emptyRecordsDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGoToCalculator}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#006233] hover:bg-[#00542c] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.startFirstEvaluationBtn}</span>
            </button>
            <button
              onClick={onLoadSampleData}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 min-h-[48px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.sampleClassesBtn}</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Section 1: Overall School Statistics Cards (60-30-10, Tabular Numerals) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#006233] dark:text-emerald-400" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t.overallStatsTitle}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Total Students */}
              <div className="bg-white dark:bg-[#17241C] p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  {t.totalStudentsLabel}
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {stats.totalStudents}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
                  {stats.totalClasses} {t.totalClassesLabel}
                </span>
              </div>

              {/* Total Readers */}
              <div className="bg-white dark:bg-[#17241C] p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-950/80 shadow-xs bg-emerald-50/20 dark:bg-emerald-950/10">
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 block mb-1">
                  {t.totalReadersLabel}
                </span>
                <span className="text-2xl font-black text-[#006233] dark:text-emerald-400 tabular-nums">
                  {stats.totalReaders}
                </span>
                <span className="text-[11px] text-emerald-700/80 dark:text-emerald-500 block mt-1 tabular-nums">
                  {stats.overallPercentage.toFixed(1)}%
                </span>
              </div>

              {/* Total Non-Readers */}
              <div className="bg-white dark:bg-[#17241C] p-4 rounded-xl border border-rose-200/80 dark:border-rose-950/80 shadow-xs bg-rose-50/20 dark:bg-rose-950/10">
                <span className="text-[11px] font-semibold text-rose-800 dark:text-rose-400 block mb-1">
                  {t.totalNonReadersLabel}
                </span>
                <span className="text-2xl font-black text-[#D21034] dark:text-rose-400 tabular-nums">
                  {stats.totalNonReaders}
                </span>
                <span className="text-[11px] text-rose-700/80 dark:text-rose-500 block mt-1 tabular-nums">
                  {(100 - stats.overallPercentage).toFixed(1)}%
                </span>
              </div>

              {/* Average Grade (/20) */}
              <div className="bg-white dark:bg-[#17241C] p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  {t.averageGradeLabel}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                    {stats.averageGrade.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ 20</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
                  {lang === 'ar' ? 'معدل عام' : 'Moyenne globale'}
                </span>
              </div>

              {/* Best Class */}
              <div className="bg-white dark:bg-[#17241C] p-4 rounded-xl border border-[#006233]/40 dark:border-emerald-800 shadow-xs">
                <div className="flex items-center gap-1 text-[#006233] dark:text-emerald-400 mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold truncate">
                    {t.bestClassLabel}
                  </span>
                </div>
                {stats.bestClass ? (
                  <>
                    <span className="text-lg font-bold text-slate-900 dark:text-white block truncate">
                      {stats.bestClass.className}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 tabular-nums block mt-1">
                      {stats.bestClass.readerPercentage}% ({stats.bestClass.grade}/20)
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-400">{t.noDataYet}</span>
                )}
              </div>

              {/* Needs Support Class */}
              <div className="bg-white dark:bg-[#17241C] p-4 rounded-xl border border-amber-300/80 dark:border-amber-900/60 shadow-xs">
                <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold truncate">
                    {t.needsSupportClassLabel}
                  </span>
                </div>
                {stats.needsSupportClass ? (
                  <>
                    <span className="text-lg font-bold text-slate-900 dark:text-white block truncate">
                      {stats.needsSupportClass.className}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 tabular-nums block mt-1">
                      {stats.needsSupportClass.readerPercentage}% ({stats.needsSupportClass.grade}/20)
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-400">{t.noDataYet}</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Comparison Bar Chart Across Classes */}
          <div className="bg-white dark:bg-[#17241C] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              {t.comparisonChartTitle}
            </h3>
            <ClassComparisonChart
              classes={classes.map((c) => ({
                className: c.className,
                readerPercentage: c.readerPercentage,
                grade: c.grade,
                level: c.level,
              }))}
              lang={lang}
              isDark={isDark}
            />
          </div>

          {/* Section 3: Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full ps-9 pe-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006233] min-h-[44px]"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
              <button
                onClick={() => setLevelFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[36px] ${
                  levelFilter === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setLevelFilter('excellent')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[36px] ${
                  levelFilter === 'excellent'
                    ? 'bg-[#006233] text-white shadow-xs'
                    : 'text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                }`}
              >
                {t.levelExcellent}
              </button>
              <button
                onClick={() => setLevelFilter('good')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[36px] ${
                  levelFilter === 'good'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40'
                }`}
              >
                {t.levelGood}
              </button>
              <button
                onClick={() => setLevelFilter('needs_encouragement')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[36px] ${
                  levelFilter === 'needs_encouragement'
                    ? 'bg-[#C59B27] text-white shadow-xs'
                    : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                }`}
              >
                {t.levelNeedsEncouragement}
              </button>
              <button
                onClick={() => setLevelFilter('low')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[36px] ${
                  levelFilter === 'low'
                    ? 'bg-[#D21034] text-white shadow-xs'
                    : 'text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                }`}
              >
                {t.levelLow}
              </button>
            </div>
          </div>

          {/* Section 4: Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClasses.map((item) => {
              const colors = getLevelColorClass(item.level, isDark);
              const levelName =
                item.level === 'excellent'
                  ? t.levelExcellent
                  : item.level === 'good'
                  ? t.levelGood
                  : item.level === 'needs_encouragement'
                  ? t.levelNeedsEncouragement
                  : t.levelLow;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#17241C] rounded-2xl p-5 shadow-xs border border-slate-200/80 dark:border-slate-800 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Class Name, Level & Delete */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                          {item.className}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>{item.schoolName || 'جامعة الجزائر'}</span>
                          {item.teacherName && (
                            <>
                              <span>•</span>
                              <span>{item.teacherName}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-2xs"
                          style={{ backgroundColor: colors.accentHex }}
                        >
                          {levelName}
                        </span>

                        <button
                          onClick={() => setDeleteTargetId(item.id)}
                          className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
                          title={t.deleteBtn}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Main Stats Row */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 my-3">
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          {t.totalStudentsLabel}
                        </span>
                        <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                          {item.totalStudents}
                        </span>
                      </div>
                      <div className="text-center border-x border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">
                          {t.readersLabel}
                        </span>
                        <span className="text-base font-extrabold text-[#006233] dark:text-emerald-400 tabular-nums">
                          {item.readersCount} ({item.readerPercentage}%)
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          {t.gradeOutOf20}
                        </span>
                        <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                          {item.grade.toFixed(1)} / 20
                        </span>
                      </div>
                    </div>

                    {/* Mini Ratio Bar */}
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex my-2">
                      <div
                        className="h-full bg-[#006233]"
                        style={{ width: `${item.readerPercentage}%` }}
                      />
                      <div
                        className="h-full bg-[#D21034]"
                        style={{ width: `${item.nonReaderPercentage}%` }}
                      />
                    </div>

                    {/* Notes if available */}
                    {item.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-100 dark:border-amber-950/40 my-2">
                        "{item.notes}"
                      </p>
                    )}
                  </div>

                  {/* Footer: Date */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.createdAt)}
                    </span>
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      {item.nonReadersCount} {t.nonReadersLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              {lang === 'ar'
                ? 'لا توجد نتائج مطابقة لبحثك'
                : lang === 'fr'
                ? 'Aucun résultat correspondant'
                : 'No matching records found'}
            </div>
          )}
        </>
      )}

      {/* Delete Single Class Confirmation Modal */}
      {deleteTargetId && targetClassToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.confirmDeleteTitle}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.confirmDeleteDesc(targetClassToDelete.className)}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors min-h-[44px]"
              >
                {t.deleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.confirmDeleteAllTitle}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.confirmDeleteAllDesc}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors min-h-[44px]"
              >
                {t.deleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
