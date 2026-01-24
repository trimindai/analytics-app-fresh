'use client';

import { Menu, Search, Bell, User } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { PROFILES } from '@/config/profiles';

export function Header() {
  const { language, currentProfileId, currentDashboardId, toggleSidebar } = useAppStore();
  const { t } = useTranslation(language);
  const profile = PROFILES[currentProfileId];
  const dashboard = profile?.dashboards.find(d => d.id === currentDashboardId);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 font-heading">
          {currentDashboardId}: {language === 'ar' ? dashboard?.nameAr : dashboard?.name}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('search')}
            className="bg-transparent border-none outline-none ml-2 text-sm w-40"
          />
        </div>

        {/* Language Toggle */}
        <LanguageToggle />

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
