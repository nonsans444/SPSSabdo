import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { AlgerianCrescentStar } from './AlgerianEmblem';
import { Calculator, BookOpen, FileText, Moon, Sun, Globe } from 'lucide-react';

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
    <header className="no-print bg-[#006233] text-white shadow-md relative z-20">
      {/* Top Banner with Algerian Motif & Utility Actions */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between border-b border-emerald-800/60">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center p-1.5 shrink-0 border border-white/20">
            <AlgerianCrescentStar size={26} color="#D21034" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg md:text-xl tracking-tight text-white">
                {t.appName}
              </span>
              <span className="text-[11px] font-semibold text-emerald-200 hidden sm:inline-block border-s border-emerald-600/70 ps-2">
                {t.appFullName}
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80 hidden md:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Top Controls: Language & Dark mode */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-white/10 text-xs">
            <button
              onClick={() => setLang('ar')}
              className={`px-2.5 py-1.5 rounded-md font-bold transition-all min-h-[36px] min-w-[36px] flex items-center justify-center ${
                lang === 'ar'
                  ? 'bg-white text-[#006233] shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
              title="العربية (Arabic)"
            >
              عربي
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition-all min-h-[36px] min-w-[36px] flex items-center justify-center ${
                lang === 'fr'
                  ? 'bg-white text-[#006233] shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
              title="Français (French)"
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition-all min-h-[36px] min-w-[36px] flex items-center justify-center ${
                lang === 'en'
                  ? 'bg-white text-[#006233] shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-lg bg-black/20 hover:bg-black/30 border border-white/10 flex items-center justify-center text-emerald-100 hover:text-white transition-all min-h-[44px] min-w-[44px]"
            title={isDark ? t.lightMode : t.darkMode}
            aria-label={isDark ? t.lightMode : t.darkMode}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Single row, responsive, thumb-friendly) */}
      <div className="max-w-6xl mx-auto px-4 bg-[#00542c]/90">
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'calculator'}
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] ${
              activeTab === 'calculator'
                ? 'bg-white text-[#006233] shadow-sm font-bold'
                : 'text-emerald-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t.navCalculator}</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'records'}
            onClick={() => setActiveTab('records')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] relative ${
              activeTab === 'records'
                ? 'bg-white text-[#006233] shadow-sm font-bold'
                : 'text-emerald-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.navRecords}</span>
            {recordsCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                  activeTab === 'records'
                    ? 'bg-[#006233] text-white'
                    : 'bg-white/20 text-white'
                }`}
              >
                {recordsCount}
              </span>
            )}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'report'}
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] ${
              activeTab === 'report'
                ? 'bg-white text-[#006233] shadow-sm font-bold'
                : 'text-emerald-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.navReport}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
