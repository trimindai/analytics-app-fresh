'use client';

import { useAppStore } from '@/lib/store/useAppStore';

export function LanguageToggle() {
  const { language, setLanguage } = useAppStore();

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      <button
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-teal-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          language === 'ar'
            ? 'bg-white text-teal-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => setLanguage('ar')}
      >
        عربي
      </button>
    </div>
  );
}
