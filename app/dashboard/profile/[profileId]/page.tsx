'use client';

import { useParams } from 'next/navigation';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { PROFILES } from '@/config/profiles';
import {
  mockKPIs,
  mockRevenueChart,
  mockOrdersChart,
  mockCategoryChart,
  mockHourlyChart,
} from '@/config/mockData';
import { useEffect } from 'react';

export default function ProfilePage() {
  const params = useParams();
  const profileId = params.profileId as string;
  const { language, setCurrentProfileId, currentDashboardId, setCurrentDashboardId } = useAppStore();
  const { t } = useTranslation(language);
  const profile = PROFILES[profileId?.toUpperCase()];

  useEffect(() => {
    if (profileId) {
      setCurrentProfileId(profileId.toUpperCase());
      // Set first dashboard as default if current doesn't belong to this profile
      if (profile?.dashboards.length && !currentDashboardId.startsWith(profileId.toUpperCase())) {
        setCurrentDashboardId(profile.dashboards[0].id);
      }
    }
  }, [profileId, profile, currentDashboardId, setCurrentProfileId, setCurrentDashboardId]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  const dashboard = profile.dashboards.find(d => d.id === currentDashboardId) || profile.dashboards[0];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{profile.icon}</span>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            Profile {profile.id}: {language === 'ar' ? profile.nameAr : profile.name}
          </h1>
        </div>
        <p className="text-gray-500">
          {dashboard && `${dashboard.id}: ${language === 'ar' ? dashboard.nameAr : dashboard.name}`}
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard chart={mockRevenueChart} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard chart={mockOrdersChart} />
            <ChartCard chart={mockCategoryChart} />
          </div>
          <ChartCard chart={mockHourlyChart} />
        </div>

        {/* Insights Column */}
        <div className="space-y-6">
          <InsightsPanel />
          
          {/* Profile Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 card-shadow">
            <h3 className="font-medium text-gray-900 mb-3">
              {language === 'ar' ? 'معلومات الملف' : 'Profile Info'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'البطاقات' : 'Cards'}</span>
                <span className="font-medium">{profile.cardCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'لوحات التحكم' : 'Dashboards'}</span>
                <span className="font-medium">{profile.dashboardCount}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">{language === 'ar' ? 'الصناعات' : 'Industries'}</span>
                <div className="flex flex-wrap gap-1">
                  {(language === 'ar' ? profile.industriesAr : profile.industries).map((ind, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
