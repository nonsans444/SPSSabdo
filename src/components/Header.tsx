import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { AlgerianCrescentStar } from './AlgerianEmblem';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  isDark,
  setIsDark,
}) => {
  const t = translations[lang];

  return (
    <header className="no-print bg-[#006233] text-white shadow-md relative z-20">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center p-1.5 shrink-0 border border-white/20">
            <AlgerianCrescentStar size={26} color="#D21034" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                {t.appName}
              </span>
              <span className="text-xs font-semibold text-emerald-200 hidden sm:inline-block border-s border-emerald-600/70 ps-2">
                {t.appFullName}
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80 hidden md:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Controls: Language switcher & Dark mode toggle */}
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

          {/* Dark / Light Mode Toggle */}
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
    </header>
  );
};
