'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Upload,
  Lightbulb,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Plus,
  FileSpreadsheet,
  X,
} from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { PROFILES } from '@/config/profiles';
import { mockDataSources } from '@/config/mockData';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    language,
    currentProfileId,
    currentDashboardId,
    setCurrentProfileId,
    setCurrentDashboardId,
    sidebarOpen,
    setSidebarOpen,
  } = useAppStore();
  const { t } = useTranslation(language);
  const [dashboardsExpanded, setDashboardsExpanded] = useState(true);
  const profile = PROFILES[currentProfileId];

  const navItems = [
    { icon: Upload, label: t('upload'), href: '/dashboard/upload' },
    { icon: Lightbulb, label: t('insights'), href: '/dashboard/insights', badge: 12 },
    { icon: FileText, label: t('reports'), href: '/dashboard/reports' },
  ];

  const handleDashboardClick = (dashboardId: string) => {
    setCurrentDashboardId(dashboardId);
    router.push('/dashboard');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-heading font-semibold text-gray-900">Trimind Analytics</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-gray-100 rounded lg:hidden"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Current Profile */}
            <div className="px-4 mb-4">
              <div
                className="flex items-center gap-3 p-3 rounded-lg border-l-4 bg-teal-50"
                style={{ borderLeftColor: profile?.color }}
              >
                <span className="text-2xl">{profile?.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Profile {currentProfileId}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'ar' ? profile?.nameAr : profile?.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mb-2">
              <div className="h-px bg-gray-200" />
            </div>

            {/* Dashboards */}
            <div className="px-4 mb-4">
              <button
                onClick={() => setDashboardsExpanded(!dashboardsExpanded)}
                className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
              >
                {t('dashboards')}
                {dashboardsExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {dashboardsExpanded && (
                <div className="space-y-1">
                  {profile?.dashboards.map((dashboard) => {
                    const isActive = currentDashboardId === dashboard.id;
                    return (
                      <button
                        key={dashboard.id}
                        onClick={() => handleDashboardClick(dashboard.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left ${
                          isActive
                            ? 'bg-teal-50 text-teal-600 font-medium border-l-2 border-teal-500'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                        {dashboard.id} {language === 'ar' ? dashboard.nameAr : dashboard.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-4 mb-2">
              <div className="h-px bg-gray-200" />
            </div>

            {/* Navigation Items */}
            <div className="px-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-teal-50 text-teal-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className="bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="px-4 my-4">
              <div className="h-px bg-gray-200" />
            </div>

            {/* Data Sources */}
            <div className="px-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('dataSources')}
              </div>
              <div className="space-y-2">
                {mockDataSources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700 truncate">
                        {source.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {source.rows.toLocaleString()} {t('rows')}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-2 w-full px-3 py-2 text-teal-600 text-sm hover:bg-teal-50 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  {t('addDataSource')}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
            >
              <Settings className="w-5 h-5" />
              {t('settings')}
            </Link>
            <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
              <LogOut className="w-5 h-5" />
              {t('logout')}
            </button>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-medium text-sm">D</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Dalal</div>
                  <div className="text-xs text-gray-500">demo@trimind.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
