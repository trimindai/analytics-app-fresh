'use client';

import { Calendar, Building2, Package, GitCompare, Settings2 } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function FilterBar() {
  const { language, dateRange, setDateRange, selectedBranch, setSelectedBranch } = useAppStore();
  const { t } = useTranslation(language);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Date Range */}
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-auto bg-white border-gray-200">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">{t('today')}</SelectItem>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {/* Branch */}
      <Select value={selectedBranch} onValueChange={setSelectedBranch}>
        <SelectTrigger className="w-auto bg-white border-gray-200">
          <Building2 className="w-4 h-4 mr-2 text-gray-500" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('allBranches')}</SelectItem>
          <SelectItem value="branch-1">Main Branch</SelectItem>
          <SelectItem value="branch-2">Salmiya</SelectItem>
          <SelectItem value="branch-3">Hawally</SelectItem>
        </SelectContent>
      </Select>

      {/* Products */}
      <Select defaultValue="all">
        <SelectTrigger className="w-auto bg-white border-gray-200">
          <Package className="w-4 h-4 mr-2 text-gray-500" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('allProducts')}</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="food">Food</SelectItem>
        </SelectContent>
      </Select>

      {/* Compare */}
      <Button variant="outline" className="bg-white border-gray-200">
        <GitCompare className="w-4 h-4 mr-2 text-gray-500" />
        {t('compare')}
      </Button>

      {/* Settings */}
      <Button variant="ghost" size="icon" className="ml-auto">
        <Settings2 className="w-5 h-5 text-gray-500" />
      </Button>
    </div>
  );
}
