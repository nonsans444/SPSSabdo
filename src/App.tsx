/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EvaluationLevel, Language } from './types';
import { translations } from './i18n/translations';
import { getEvaluationLevel } from './utils/calculator';
import { Header } from './components/Header';
import { ClassForm } from './components/ClassForm';
import { DonutChart, GradeDisplay, HorizontalBar } from './components/Charts';
import { ReportView } from './components/ReportView';
import { ZelligeBackground } from './components/AlgerianEmblem';
import { Sparkles, BarChart3, HelpCircle } from 'lucide-react';

interface CalculatedData {
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
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('spss_language');
      return saved === 'fr' || saved === 'en' || saved === 'ar' ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('spss_dark_mode');
      if (saved !== null) return saved === 'true';
      return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false;
    } catch {
      return false;
    }
  });

  // Calculation state: null until "Calculate Statistics" is clicked and validation succeeds
  const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = translations[lang];

  // Sync html language and direction attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('spss_language', lang);
    } catch (e) {
      console.warn(e);
    }
  }, [lang]);

  // Sync dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('spss_dark_mode', String(isDark));
    } catch (e) {
      console.warn(e);
    }
  }, [isDark]);

  // Handler for Calculate Statistics button press
  const handleCalculate = (data: {
    teacherName: string;
    schoolName: string;
    className: string;
    totalStudents: number;
    readersCount: number;
    nonReadersCount: number;
    notes: string;
  }) => {
    const { totalStudents, readersCount, nonReadersCount } = data;

    // Mathematical calculations:
    // Reader percentage = readers / total x 100
    // Non-reader percentage = non-readers / total x 100
    // Note (grade) = readers / total x 20, rounded to one decimal
    const readerPct = Math.round((readersCount / totalStudents) * 1000) / 10;
    const nonReaderPct = Math.round((nonReadersCount / totalStudents) * 1000) / 10;
    const rawGrade = (readersCount / totalStudents) * 20;
    const grade = Math.round(rawGrade * 10) / 10;
    const level = getEvaluationLevel(readerPct);

    setCalculatedData({
      schoolName: data.schoolName,
      teacherName: data.teacherName,
      className: data.className,
      totalStudents,
      readersCount,
      nonReadersCount,
      readerPercentage: readerPct,
      nonReaderPercentage: nonReaderPct,
      grade,
      level,
      notes: data.notes,
    });
    setErrorMessage(null);
  };

  const handleReset = () => {
    setCalculatedData(null);
    setErrorMessage(null);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'dark bg-[#0F1713] text-[#FAF7F2]' : 'bg-[#FAF7F2] text-slate-900'
      }`}
    >
      {/* Algerian Islamic geometric zellige backdrop */}
      <ZelligeBackground isDark={isDark} />

      {/* Top Application Header */}
      <Header
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Main Single-View Flow: Input Form -> Results -> Reports Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 relative z-10 space-y-6 pb-16">
        {/* 1. Data Input Form */}
        <section>
          <ClassForm
            onCalculate={handleCalculate}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            onReset={handleReset}
            lang={lang}
            isDark={isDark}
          />
        </section>

        {/* Informational Prompt when not calculated yet */}
        {!calculatedData && !errorMessage && (
          <div className="no-print bg-white/70 dark:bg-[#17241C]/70 backdrop-blur-xs rounded-2xl p-6 text-center border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs sm:text-sm flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>{t.calculatePrompt}</span>
          </div>
        )}

        {/* 2. Statistical Results Area (ONLY visible after pressing Calculate) */}
        {calculatedData && (
          <section className="no-print bg-white dark:bg-[#17241C] rounded-2xl p-5 sm:p-7 shadow-sm border border-slate-200/80 dark:border-emerald-900/40 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#006233] dark:text-emerald-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.resultsSectionTitle}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{calculatedData.className ? calculatedData.className : (lang === 'ar' ? 'القسم' : 'Classe')}</span>
              </div>
            </div>

            {/* Results Grid: Grade Display, Donut Chart, and Horizontal Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Donut Chart (md:col-span-5) */}
              <div className="md:col-span-5 flex justify-center">
                <DonutChart
                  readerPercentage={calculatedData.readerPercentage}
                  nonReaderPercentage={calculatedData.nonReaderPercentage}
                  readersCount={calculatedData.readersCount}
                  nonReadersCount={calculatedData.nonReadersCount}
                  total={calculatedData.totalStudents}
                  lang={lang}
                  size={200}
                />
              </div>

              {/* Grade Display & Comparative Bar (md:col-span-7) */}
              <div className="md:col-span-7 space-y-4">
                <GradeDisplay
                  grade={calculatedData.grade}
                  level={calculatedData.level}
                  lang={lang}
                  isDark={isDark}
                />

                <div className="pt-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t.ratioComparison}
                  </span>
                  <HorizontalBar
                    readers={calculatedData.readersCount}
                    nonReaders={calculatedData.nonReadersCount}
                    total={calculatedData.totalStudents}
                    lang={lang}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Reports Area with Print Full Report (ONLY visible after calculation) */}
        {calculatedData && (
          <ReportView
            schoolName={calculatedData.schoolName}
            teacherName={calculatedData.teacherName}
            className={calculatedData.className}
            totalStudents={calculatedData.totalStudents}
            readersCount={calculatedData.readersCount}
            nonReadersCount={calculatedData.nonReadersCount}
            readerPercentage={calculatedData.readerPercentage}
            nonReaderPercentage={calculatedData.nonReaderPercentage}
            grade={calculatedData.grade}
            level={calculatedData.level}
            notes={calculatedData.notes}
            lang={lang}
            isDark={isDark}
          />
        )}
      </main>
    </div>
  );
}
