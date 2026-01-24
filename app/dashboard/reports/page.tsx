'use client';

import { useState } from 'react';
import { FileText, Download, Calendar, Filter, Plus, Check } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

const dateRanges = [
  { value: 'today', label: 'Today', labelAr: 'اليوم' },
  { value: '7d', label: 'Last 7 days', labelAr: 'آخر 7 أيام' },
  { value: '30d', label: 'Last 30 days', labelAr: 'آخر 30 يوم' },
  { value: '90d', label: 'Last 90 days', labelAr: 'آخر 90 يوم' },
];

const reportTypes = [
  { value: 'all', label: 'All Types', labelAr: 'جميع الأنواع' },
  { value: 'pdf', label: 'PDF', labelAr: 'PDF' },
  { value: 'excel', label: 'Excel', labelAr: 'Excel' },
];

export default function ReportsPage() {
  const { language } = useAppStore();
  const { t } = useTranslation(language);
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [selectedType, setSelectedType] = useState('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (reportId: string, reportName: string) => {
    setDownloadingId(reportId);
    // Simulate download
    setTimeout(() => {
      setDownloadingId(null);
      alert(`${language === 'ar' ? 'تم تحميل التقرير:' : 'Report downloaded:'} ${reportName}`);
    }, 1000);
  };

  const handleCreateReport = () => {
    alert(language === 'ar' ? 'سيتم فتح معالج إنشاء التقرير' : 'Report creation wizard will open');
  };

  const currentDateRange = dateRanges.find(d => d.value === selectedDateRange);
  const currentType = reportTypes.find(t => t.value === selectedType);

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
        <Button 
          onClick={handleCreateReport}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'إنشاء تقرير' : 'Create Report'}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white">
              <Calendar className="w-4 h-4 mr-2" />
              {language === 'ar' ? currentDateRange?.labelAr : currentDateRange?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dateRanges.map((range) => (
              <DropdownMenuItem 
                key={range.value}
                onClick={() => setSelectedDateRange(range.value)}
                className="flex items-center justify-between"
              >
                {language === 'ar' ? range.labelAr : range.label}
                {selectedDateRange === range.value && <Check className="w-4 h-4 ml-2 text-teal-500" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white">
              <Filter className="w-4 h-4 mr-2" />
              {language === 'ar' ? currentType?.labelAr : currentType?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {reportTypes.map((type) => (
              <DropdownMenuItem 
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className="flex items-center justify-between"
              >
                {language === 'ar' ? type.labelAr : type.label}
                {selectedType === type.value && <Check className="w-4 h-4 ml-2 text-teal-500" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(report.id, language === 'ar' ? report.nameAr : report.name)}
                disabled={downloadingId === report.id}
                className="hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
              >
                {downloadingId === report.id ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="ml-2">
                  {language === 'ar' ? 'تحميل' : 'Download'}
                </span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
