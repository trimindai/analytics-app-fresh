'use client';

import { ThumbsDown, CheckCircle, Database, Brain, BarChart3 } from 'lucide-react';
import { Insight } from '@/types';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { Button } from '@/components/ui/button';

interface InsightCardProps {
  insight: Insight;
  compact?: boolean;
}

export function InsightCard({ insight, compact = false }: InsightCardProps) {
  const { language } = useAppStore();
  const { t } = useTranslation(language);

  const priorityConfig = {
    high: {
      label: language === 'ar' ? 'أولوية عالية' : 'HIGH PRIORITY',
      color: 'bg-red-100 text-red-700 border-red-200',
      borderColor: 'border-l-red-500',
      dot: 'bg-red-500',
    },
    medium: {
      label: language === 'ar' ? 'أولوية متوسطة' : 'MEDIUM PRIORITY',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      borderColor: 'border-l-orange-500',
      dot: 'bg-orange-500',
    },
    low: {
      label: language === 'ar' ? 'أولوية منخفضة' : 'LOW PRIORITY',
      color: 'bg-teal-100 text-teal-700 border-teal-200',
      borderColor: 'border-l-teal-500',
      dot: 'bg-teal-500',
    },
  };

  const config = priorityConfig[insight.priority];

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
        <div className={`w-2 h-2 rounded-full ${config.dot}`} />
        <span className="text-sm text-gray-700 flex-1">
          {language === 'ar' ? insight.titleAr : insight.title}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 border-l-4 ${config.borderColor} card-shadow`}>
      {/* Priority Badge */}
      <div className="px-4 pt-4">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${config.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          {language === 'ar' ? insight.titleAr : insight.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {language === 'ar' ? insight.descriptionAr : insight.description}
        </p>

        {/* Evidence */}
        <div className="flex items-center gap-4 text-xs text-gray-500 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5" />
            <span>{insight.source}</span>
          </div>
          <div className="flex items-center gap-1">
            <Brain className="w-3.5 h-3.5" />
            <span>{insight.module}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{insight.confidence}% {t('confidence')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <ThumbsDown className="w-4 h-4 mr-1" />
            {t('dismiss')}
          </Button>
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
            <CheckCircle className="w-4 h-4 mr-1" />
            {t('takeAction')}
          </Button>
        </div>
      </div>
    </div>
  );
}
