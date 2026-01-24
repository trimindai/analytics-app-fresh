'use client';

import { ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { InsightCard } from './InsightCard';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { mockInsights } from '@/config/mockData';

export function InsightsPanel() {
  const { language } = useAppStore();
  const { t } = useTranslation(language);

  return (
    <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-teal-600" />
          <h3 className="font-semibold text-gray-900">{t('insights')}</h3>
        </div>
        <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          {mockInsights.length} {t('newInsights')}
        </span>
      </div>

      {/* Compact Insights */}
      <div className="space-y-2 mb-4">
        {mockInsights.slice(0, 3).map((insight) => (
          <InsightCard key={insight.id} insight={insight} compact />
        ))}
      </div>

      {/* View All Link */}
      <Link
        href="/dashboard/insights"
        className="flex items-center justify-center gap-2 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
      >
        {t('viewAll')} {t('insights')}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
