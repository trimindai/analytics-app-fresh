'use client';

import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { Button } from '@/components/ui/button';

const mockReports = [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    nameAr: 'تقرير الإيرادات الشهري',
    date: '2024-01-15',
    type: 'PDF',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Weekly Sales Summary',
    nameAr: 'ملخص المبيعات الأسبوعي',
    date: '2024-01-14',
    type: 'Excel',
    size: '1.1 MB',
  },
  {
    id: '3',
    name: 'Customer Analytics Report',
    nameAr: 'تقرير تحليلات العملاء',
    date: '2024-01-10',
    type: 'PDF',
    size: '3.2 MB',
  },
];

export default function ReportsPage() {
  const { language } = useAppStore();
  const { t } = useTranslation(language);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            {t('reports')}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'ar'
              ? 'التقارير المولدة والمجدولة'
              : 'Generated and scheduled reports'}
          </p>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <FileText className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'إنشاء تقرير' : 'Create Report'}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="bg-white">
          <Calendar className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'التاريخ' : 'Date Range'}
        </Button>
        <Button variant="outline" className="bg-white">
          <Filter className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'النوع' : 'Type'}
        </Button>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border border-gray-200 card-shadow">
        <div className="divide-y divide-gray-200">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {language === 'ar' ? report.nameAr : report.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {report.date} • {report.type} • {report.size}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
