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

export default function DashboardDetailPage() {
  const params = useParams();
  const profileId = (params.profileId as string)?.toUpperCase();
  const dashboardId = (params.dashboardId as string)?.toUpperCase();
  const { language, setCurrentProfileId, setCurrentDashboardId } = useAppStore();
  const { t } = useTranslation(language);
  const profile = PROFILES[profileId];
  const dashboard = profile?.dashboards.find(d => d.id === dashboardId);

  useEffect(() => {
    if (profileId && dashboardId) {
      setCurrentProfileId(profileId);
      setCurrentDashboardId(dashboardId);
    }
  }, [profileId, dashboardId, setCurrentProfileId, setCurrentDashboardId]);

  if (!profile || !dashboard) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Dashboard not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{profile.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              {dashboardId}: {language === 'ar' ? dashboard.nameAr : dashboard.name}
            </h1>
            <p className="text-gray-500">
              Profile {profileId} • {language === 'ar' ? profile.nameAr : profile.name}
            </p>
          </div>
        </div>
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
          
          {/* Dashboard Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 card-shadow">
            <h3 className="font-medium text-gray-900 mb-3">
              {language === 'ar' ? 'تفاصيل لوحة التحكم' : 'Dashboard Details'}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 block">{language === 'ar' ? 'المعرف' : 'ID'}</span>
                <span className="font-medium">{dashboardId}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{language === 'ar' ? 'الملف' : 'Profile'}</span>
                <span className="font-medium">
                  {profile.icon} {language === 'ar' ? profile.nameAr : profile.name}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">{language === 'ar' ? 'الوصف' : 'Description'}</span>
                <span className="text-gray-700">
                  {language === 'ar' ? dashboard.nameAr : dashboard.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
