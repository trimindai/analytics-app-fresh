'use client';

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

export default function DashboardHome() {
  const { language, currentProfileId, currentDashboardId } = useAppStore();
  const { t } = useTranslation(language);
  const profile = PROFILES[currentProfileId];
  const dashboard = profile?.dashboards.find(d => d.id === currentDashboardId);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">
          {currentDashboardId}: {language === 'ar' ? dashboard?.nameAr : dashboard?.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {language === 'ar' ? profile?.nameAr : profile?.name} • Profile {currentProfileId}
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
          
          {/* Trust Badges */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 card-shadow">
            <h3 className="font-medium text-gray-900 mb-3">{language === 'ar' ? 'لماذا تريمايند؟' : 'Why Trimind?'}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">💳</span>
                <span>{t('noCreditCard')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">⏱️</span>
                <span>{t('setupTime')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">👥</span>
                <span>{t('unlimitedTeam')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">📍</span>
                <span>{t('builtIn')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
