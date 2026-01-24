'use client';

import { InsightCard } from '@/components/dashboard/InsightCard';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { mockInsights } from '@/config/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InsightsPage() {
  const { language } = useAppStore();
  const { t } = useTranslation(language);

  const highPriority = mockInsights.filter(i => i.priority === 'high');
  const mediumPriority = mockInsights.filter(i => i.priority === 'medium');
  const lowPriority = mockInsights.filter(i => i.priority === 'low');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">
          {t('insights')}
        </h1>
        <p className="text-gray-500 mt-1">
          {language === 'ar'
            ? 'رؤى مدعومة بالذكاء الاصطناعي من بياناتك'
            : 'AI-powered insights from your data'}
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="all">
            {language === 'ar' ? 'الكل' : 'All'} ({mockInsights.length})
          </TabsTrigger>
          <TabsTrigger value="high" className="text-red-600">
            🔴 {t('highPriority')} ({highPriority.length})
          </TabsTrigger>
          <TabsTrigger value="medium" className="text-orange-600">
            🟡 {t('mediumPriority')} ({mediumPriority.length})
          </TabsTrigger>
          <TabsTrigger value="low" className="text-teal-600">
            🟢 {t('lowPriority')} ({lowPriority.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="high" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {highPriority.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medium" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mediumPriority.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="low" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lowPriority.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
