import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { SPSSCircularLogo } from './AlgerianEmblem';
import { Calculator, BookOpen, FileText, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'records' | 'report';
  setActiveTab: (tab: 'calculator' | 'records' | 'report') => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  recordsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  isDark,
  setIsDark,
  recordsCount,
}) => {
  const t = translations[lang];

  return (
    <header className="no-print bg-[#062417] text-white shadow-xl relative z-20 border-b border-emerald-900/60">
      {/* Top Banner Row */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Left Side: Theme Toggle & Clean Language Switcher (WITHOUT any logo next to it) */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-xl bg-[#093220] border border-emerald-500/40 hover:border-emerald-400 flex items-center justify-center text-amber-300 transition-all shadow-xs"
            title={isDark ? t.lightMode : t.darkMode}
            aria-label={isDark ? t.lightMode : t.darkMode}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
          </button>

          {/* Clean Language Switcher (No logo here as requested) */}
          <div className="flex items-center bg-[#093220] rounded-xl p-1 border border-emerald-700/50 text-xs">
            <button
              onClick={() => setLang('ar')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
                lang === 'ar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
              title="العربية (Arabic)"
            >
              عربي
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
                lang === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
                lang === 'fr'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
              title="Français (French)"
            >
              FR
            </button>
          </div>
        </div>

        {/* Right Side: Title + Single Circular SPSS Logo on the right */}
        <div className="flex items-center gap-3 text-end sm:text-start">
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight">
              SPSS - University
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6CE89F] tracking-wide leading-tight">
              Reading Analytics
            </span>
          </div>

          {/* Official SPSS Circular Crest Logo on the right */}
          <SPSSCircularLogo size={46} className="shadow-lg border border-[#C89D34]/50" />
        </div>
      </div>

      {/* Navigation Tabs Bar as shown in mockup */}
      <div className="bg-[#051C12] border-t border-emerald-950 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar">
          {/* Tab 1: حاسبة التخصص */}
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap min-h-[42px] ${
              activeTab === 'calculator'
                ? 'border border-[#C89D34] bg-[#0C2F1E] text-emerald-300 shadow-md'
                : 'text-emerald-200/80 hover:bg-emerald-950/60 hover:text-white border border-transparent'
            }`}
          >
            <Calculator className="w-4 h-4 text-[#6CE89F]" />
            <span>{t.navCalculator}</span>
          </button>

          {/* Tab 2: سجل التخصصات الجامعية with count badge */}
          <button
            onClick={() => setActiveTab('records')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap min-h-[42px] ${
              activeTab === 'records'
                ? 'border border-[#C89D34] bg-[#0C2F1E] text-emerald-300 shadow-md'
                : 'text-emerald-200/80 hover:bg-emerald-950/60 hover:text-white border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#6CE89F]" />
            <span>{t.navRecords}</span>
            {recordsCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold tabular-nums bg-emerald-600 text-white shadow-xs">
                {recordsCount}
              </span>
            )}
          </button>

          {/* Tab 3: التقرير الأكاديمي (طباعة) */}
          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap min-h-[42px] ${
              activeTab === 'report'
                ? 'border border-[#C89D34] bg-[#0C2F1E] text-emerald-300 shadow-md'
                : 'text-emerald-200/80 hover:bg-emerald-950/60 hover:text-white border border-transparent'
            }`}
          >
            <FileText className="w-4 h-4 text-[#6CE89F]" />
            <span>{t.navReport}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
