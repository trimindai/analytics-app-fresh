'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { MoreHorizontal, Clock, Database } from 'lucide-react';
import { ChartData } from '@/types';
import { useAppStore } from '@/lib/store/useAppStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChartCardProps {
  chart: ChartData;
  className?: string;
}

export function ChartCard({ chart, className = '' }: ChartCardProps) {
  const { language } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);
    let option: echarts.EChartsOption = {};

    const tealColor = '#14B8A6';
    const tealColors = ['#14B8A6', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'];

    switch (chart.type) {
      case 'bar':
        option = {
          grid: { left: 40, right: 20, top: 20, bottom: 40 },
          xAxis: {
            type: 'category',
            data: chart.data.labels,
            axisLine: { lineStyle: { color: '#E5E7EB' } },
            axisLabel: { color: '#6B7280', fontSize: 11 },
          },
          yAxis: {
            type: 'value',
            axisLine: { show: false },
            splitLine: { lineStyle: { color: '#F3F4F6' } },
            axisLabel: { color: '#6B7280', fontSize: 11 },
          },
          series: [{
            data: chart.data.values,
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: tealColor },
                { offset: 1, color: '#0D9488' },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
          }],
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#1F2937',
            borderColor: '#1F2937',
            textStyle: { color: '#fff' },
          },
        };
        break;

      case 'line':
      case 'area':
        option = {
          grid: { left: 40, right: 20, top: 20, bottom: 40 },
          xAxis: {
            type: 'category',
            data: chart.data.labels,
            axisLine: { lineStyle: { color: '#E5E7EB' } },
            axisLabel: { color: '#6B7280', fontSize: 11 },
          },
          yAxis: {
            type: 'value',
            axisLine: { show: false },
            splitLine: { lineStyle: { color: '#F3F4F6' } },
            axisLabel: { color: '#6B7280', fontSize: 11 },
          },
          series: [{
            data: chart.data.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: tealColor, width: 3 },
            itemStyle: { color: tealColor },
            areaStyle: chart.type === 'area' ? {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20, 184, 166, 0.4)' },
                { offset: 1, color: 'rgba(20, 184, 166, 0.05)' },
              ]),
            } : undefined,
          }],
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#1F2937',
            borderColor: '#1F2937',
            textStyle: { color: '#fff' },
          },
        };
        break;

      case 'donut':
      case 'pie':
        option = {
          series: [{
            type: 'pie',
            radius: chart.type === 'donut' ? ['50%', '75%'] : '70%',
            center: ['50%', '50%'],
            data: chart.data.map((item: any, index: number) => ({
              name: language === 'ar' ? item.nameAr : item.name,
              value: item.value,
              itemStyle: { color: tealColors[index % tealColors.length] },
            })),
            label: {
              show: true,
              color: '#4B5563',
              fontSize: 11,
            },
            labelLine: { lineStyle: { color: '#D1D5DB' } },
          }],
          tooltip: {
            trigger: 'item',
            backgroundColor: '#1F2937',
            borderColor: '#1F2937',
            textStyle: { color: '#fff' },
            formatter: '{b}: {c}%',
          },
        };
        break;
    }

    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, [chart, language]);

  return (
    <div className={`bg-white rounded-xl border border-gray-200 card-shadow hover:card-shadow-hover transition-all duration-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">
          {language === 'ar' ? chart.titleAr : chart.title}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export as PNG</DropdownMenuItem>
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem>View Full Screen</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart */}
      <div ref={chartRef} className="h-64 p-4" />

      {/* Footer */}
      {(chart.source || chart.updatedAt) && (
        <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
          {chart.source && (
            <div className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              <span>Source: {chart.source}</span>
            </div>
          )}
          {chart.updatedAt && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated: {chart.updatedAt}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
