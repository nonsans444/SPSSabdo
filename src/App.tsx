/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClassRecord, Language } from './types';
import { translations } from './i18n/translations';
import {
  getStoredClasses,
  saveStoredClasses,
  getStoredProfile,
  saveStoredProfile,
  exportClassesAsJson,
  parseClassesJson,
  SAMPLE_CLASSES,
} from './utils/storage';
import { Header } from './components/Header';
import { ClassForm } from './components/ClassForm';
import { RecordsView } from './components/RecordsView';
import { ReportView } from './components/ReportView';
import { AlgerianFlagBackground, ZelligeBackground } from './components/AlgerianEmblem';
import { Calculator, BookOpen, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('spss_language');
      return (saved === 'fr' || saved === 'en' || saved === 'ar') ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('spss_dark_mode');
      if (saved !== null) return saved === 'true';
      return true; // Default dark theme as in user reference mockup
    } catch {
      return true;
    }
  });

  const [activeTab, setActiveTab] = useState<'calculator' | 'records' | 'report'>('calculator');
  const [classes, setClasses] = useState<ClassRecord[]>(() => getStoredClasses());
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const t = translations[lang];

  // Sync language and direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('spss_language', lang);
    } catch (e) {
      console.warn(e);
    }
  }, [lang]);

  // Sync dark mode (forced dark as in screenshot design)
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

  // Show auto-dismissing toast
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  };

  // Add new class record
  const handleSaveClass = (recordData: Omit<ClassRecord, 'id' | 'createdAt'>) => {
    const evalNumber = classes.length + 1;
    const defaultName =
      lang === 'ar'
        ? `تخصص جامعي #${evalNumber}`
        : lang === 'fr'
        ? `Filière #${evalNumber}`
        : `Major #${evalNumber}`;

    const newRecord: ClassRecord = {
      ...recordData,
      className: recordData.className && recordData.className.trim() ? recordData.className.trim() : defaultName,
      id: 'class-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...classes];
    setClasses(updated);
    saveStoredClasses(updated);
    showToast(t.savedSuccessToast, 'success');
  };

  // Delete single class
  const handleDeleteClass = (id: string) => {
    const updated = classes.filter((c) => c.id !== id);
    setClasses(updated);
    saveStoredClasses(updated);
    showToast(t.deletedSuccessToast, 'success');
  };

  // Clear all classes
  const handleClearAll = () => {
    setClasses([]);
    saveStoredClasses([]);
    showToast(t.deletedSuccessToast, 'success');
  };

  // Load sample dataset
  const handleLoadSampleData = () => {
    setClasses(SAMPLE_CLASSES);
    saveStoredClasses(SAMPLE_CLASSES);
    showToast(
      lang === 'ar'
        ? 'تم تحميل نماذج التخصصات الجامعية بنجاح!'
        : lang === 'fr'
        ? 'Filières universitaires chargées !'
        : 'Sample university majors loaded successfully!'
    );
  };

  // Export JSON
  const handleExportJson = () => {
    exportClassesAsJson(classes);
    showToast(
      lang === 'ar'
        ? 'تم تصدير ملف النسخة الاحتياطية بنجاح.'
        : lang === 'fr'
        ? 'Sauvegarde exportée avec succès.'
        : 'Backup exported successfully.'
    );
  };

  // Import JSON
  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsed = parseClassesJson(content);
      if (parsed) {
        setClasses(parsed);
        saveStoredClasses(parsed);
        showToast(
          lang === 'ar'
            ? `تم استيراد ${parsed.length} تخصص جامعي بنجاح!`
            : lang === 'fr'
            ? `${parsed.length} filières importées !`
            : `${parsed.length} majors imported!`
        );
      } else {
        showToast(
          lang === 'ar'
            ? 'ملف غير صالح. يُرجى التحقق من صحة ملف JSON.'
            : lang === 'fr'
            ? 'Fichier JSON invalide.'
            : 'Invalid JSON backup file.',
          'error'
        );
      }
    };
    reader.readAsText(file);
  };

  // Update teacher profile
  const handleUpdateProfile = (teacherName: string, schoolName: string) => {
    const updated = { teacherName, schoolName };
    setProfile(updated);
    saveStoredProfile(updated);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 relative ${
        isDark ? 'dark bg-[#05170F] text-[#FAF7F2]' : 'bg-[#05170F] text-[#FAF7F2]'
      }`}
    >
      {/* Algerian Flag prominent background matching user screenshot */}
      <AlgerianFlagBackground />

      {/* Algerian Islamic Zellige background pattern */}
      <ZelligeBackground isDark={true} />

      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        recordsCount={classes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 pb-24 sm:pb-10">
        {activeTab === 'calculator' && (
          <ClassForm
            onSaveClass={handleSaveClass}
            lang={lang}
            isDark={isDark}
            defaultTeacherName={profile.teacherName}
            defaultSchoolName={profile.schoolName}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'records' && (
          <RecordsView
            classes={classes}
            onDeleteClass={handleDeleteClass}
            onClearAll={handleClearAll}
            onExportJson={handleExportJson}
            onImportJson={handleImportJson}
            onGoToCalculator={() => setActiveTab('calculator')}
            onGoToReport={() => setActiveTab('report')}
            onLoadSampleData={handleLoadSampleData}
            lang={lang}
            isDark={isDark}
          />
        )}

        {activeTab === 'report' && (
          <ReportView
            classes={classes}
            teacherName={profile.teacherName}
            schoolName={profile.schoolName}
            lang={lang}
            onBack={() => setActiveTab('records')}
            isDark={isDark}
          />
        )}
      </main>

      {/* Mobile Bottom Thumb Bar matching user screenshot */}
      <div className="no-print sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#061C12]/95 backdrop-blur-xl border-t border-emerald-900/60 shadow-2xl">
        <div className="grid grid-cols-3 h-16 items-center px-2">
          {/* Tab 1: حاسبة التخصص */}
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors min-h-[48px] ${
              activeTab === 'calculator'
                ? 'text-[#6CE89F] font-black'
                : 'text-emerald-300/60 hover:text-emerald-100'
            }`}
          >
            <Calculator className={`w-5 h-5 mb-0.5 ${activeTab === 'calculator' ? 'text-[#6CE89F]' : 'text-emerald-400/60'}`} />
            <span className="text-[10px]">{t.navCalculator}</span>
          </button>

          {/* Tab 2: سجل التخصصات الجامعية */}
          <button
            onClick={() => setActiveTab('records')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors min-h-[48px] relative ${
              activeTab === 'records'
                ? 'text-[#6CE89F] font-black'
                : 'text-emerald-300/60 hover:text-emerald-100'
            }`}
          >
            <div className="relative">
              <BookOpen className={`w-5 h-5 mb-0.5 ${activeTab === 'records' ? 'text-[#6CE89F]' : 'text-emerald-400/60'}`} />
              {classes.length > 0 && (
                <span className="absolute -top-1.5 -end-2.5 min-w-[18px] h-[18px] px-1 bg-[#00A859] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-md border border-[#061C12]">
                  {classes.length}
                </span>
              )}
            </div>
            <span className="text-[10px]">{t.navRecords}</span>
          </button>

          {/* Tab 3: التقرير الأكاديمي (طباعة) */}
          <button
            onClick={() => setActiveTab('report')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors min-h-[48px] ${
              activeTab === 'report'
                ? 'text-[#6CE89F] font-black'
                : 'text-emerald-300/60 hover:text-emerald-100'
            }`}
          >
            <FileText className={`w-5 h-5 mb-0.5 ${activeTab === 'report' ? 'text-[#6CE89F]' : 'text-emerald-400/60'}`} />
            <span className="text-[10px]">{t.navReport}</span>
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 start-1/2 -translate-x-1/2 z-50 animate-slideUp">
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold border ${
              toast.type === 'success'
                ? 'bg-[#008844] text-white border-emerald-400/50 shadow-emerald-950/60'
                : 'bg-rose-700 text-white border-rose-500 shadow-rose-950/60'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-200" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-200" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
