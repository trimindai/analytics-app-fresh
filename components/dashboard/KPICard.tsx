'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPI } from '@/types';
import { useAppStore } from '@/lib/store/useAppStore';

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const { language } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && kpi.sparklineData) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          show: false,
          data: kpi.sparklineData.map((_, i) => i),
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data: kpi.sparklineData,
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: '#14B8A6',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20, 184, 166, 0.3)' },
                { offset: 1, color: 'rgba(20, 184, 166, 0.05)' },
              ]),
            },
          },
        ],
      });

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [kpi.sparklineData]);

  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
  const trendColor = kpi.trend === 'up' ? 'text-green-500' : kpi.trend === 'down' ? 'text-red-500' : 'text-gray-500';
  const trendBgColor = kpi.trend === 'up' ? 'bg-green-50' : kpi.trend === 'down' ? 'bg-red-50' : 'bg-gray-50';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 card-shadow hover:card-shadow-hover transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">
          {language === 'ar' ? kpi.titleAr : kpi.title}
        </span>
        <span className="text-2xl">{kpi.icon}</span>
      </div>

      <div className="text-2xl font-bold text-gray-900 font-heading mb-2">
        {kpi.value}
      </div>

      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${trendBgColor} ${trendColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="font-medium">
          {kpi.change > 0 ? '+' : ''}{kpi.change}%
        </span>
        <span className="text-gray-500 ml-1">
          {language === 'ar' ? kpi.changeLabelAr : kpi.changeLabel}
        </span>
      </div>

      {kpi.sparklineData && (
        <div ref={chartRef} className="h-12 mt-3" />
      )}
    </div>
  );
}
