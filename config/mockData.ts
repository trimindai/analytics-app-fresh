import { KPI, Insight, ChartData, DataSource } from '@/types';

export const mockKPIs: KPI[] = [
  {
    id: 'kpi-1',
    title: 'Total Revenue',
    titleAr: 'إجمالي الإيرادات',
    value: 'KD 12,847',
    change: 24.5,
    changeLabel: 'vs last month',
    changeLabelAr: 'مقارنة بالشهر الماضي',
    icon: '💰',
    trend: 'up',
    sparklineData: [20, 25, 30, 28, 35, 40, 38, 45, 50, 55, 52, 60],
  },
  {
    id: 'kpi-2',
    title: 'Total Orders',
    titleAr: 'إجمالي الطلبات',
    value: '2,456',
    change: 12.3,
    changeLabel: 'vs last month',
    changeLabelAr: 'مقارنة بالشهر الماضي',
    icon: '📦',
    trend: 'up',
    sparklineData: [100, 120, 110, 130, 145, 140, 160, 155, 170, 180, 175, 190],
  },
  {
    id: 'kpi-3',
    title: 'Avg Order Value',
    titleAr: 'متوسط قيمة الطلب',
    value: 'KD 52.30',
    change: -3.2,
    changeLabel: 'vs last month',
    changeLabelAr: 'مقارنة بالشهر الماضي',
    icon: '📊',
    trend: 'down',
    sparklineData: [55, 54, 53, 52, 51, 52, 51, 50, 51, 52, 51, 52],
  },
  {
    id: 'kpi-4',
    title: 'Active Customers',
    titleAr: 'العملاء النشطون',
    value: '1,847',
    change: 8.7,
    changeLabel: 'vs last month',
    changeLabelAr: 'مقارنة بالشهر الماضي',
    icon: '👥',
    trend: 'up',
    sparklineData: [1500, 1520, 1550, 1600, 1650, 1700, 1720, 1750, 1780, 1800, 1820, 1847],
  },
];

export const mockInsights: Insight[] = [
  {
    id: 'insight-1',
    priority: 'high',
    title: 'Revenue dropped 15% on Tuesdays',
    titleAr: 'انخفضت الإيرادات 15% يوم الثلاثاء',
    description: 'Tuesday revenue has declined for 6 consecutive weeks. Consider launching a promotion or investigating causes.',
    descriptionAr: 'انخفضت إيرادات يوم الثلاثاء لمدة 6 أسابيع متتالية. فكر في إطلاق عرض ترويجي أو التحقق من الأسباب.',
    source: 'sales.xlsx',
    module: 'Anomaly Radar',
    confidence: 87,
  },
  {
    id: 'insight-2',
    priority: 'medium',
    title: 'SKU-4521 has high return rate',
    titleAr: 'المنتج SKU-4521 لديه معدل إرجاع مرتفع',
    description: 'This product has a 23% return rate, significantly above the 8% average. Review product quality or description accuracy.',
    descriptionAr: 'هذا المنتج لديه معدل إرجاع 23%، أعلى بكثير من المتوسط 8%. راجع جودة المنتج أو دقة الوصف.',
    source: 'returns.csv',
    module: 'Product Analytics',
    confidence: 92,
  },
  {
    id: 'insight-3',
    priority: 'low',
    title: 'Peak hours shifted to 7-9 PM',
    titleAr: 'تحولت ساعات الذروة إلى 7-9 مساءً',
    description: 'Customer traffic peak has moved from 5-7 PM to 7-9 PM. Consider adjusting staffing schedules.',
    descriptionAr: 'انتقلت ذروة حركة العملاء من 5-7 مساءً إلى 7-9 مساءً. فكر في تعديل جداول الموظفين.',
    source: 'traffic.xlsx',
    module: 'Time Intelligence',
    confidence: 78,
  },
];

export const mockRevenueChart: ChartData = {
  id: 'chart-revenue',
  title: 'Revenue Trend',
  titleAr: 'اتجاه الإيرادات',
  type: 'bar',
  source: 'sales.xlsx',
  updatedAt: '2 min ago',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [4200, 5800, 6200, 7100, 8400, 9200, 10500, 11800, 12847],
  },
};

export const mockOrdersChart: ChartData = {
  id: 'chart-orders',
  title: 'Daily Orders',
  titleAr: 'الطلبات اليومية',
  type: 'line',
  source: 'orders.csv',
  updatedAt: '5 min ago',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [320, 280, 350, 410, 480, 520, 390],
  },
};

export const mockCategoryChart: ChartData = {
  id: 'chart-categories',
  title: 'Sales by Category',
  titleAr: 'المبيعات حسب الفئة',
  type: 'donut',
  source: 'sales.xlsx',
  updatedAt: '10 min ago',
  data: [
    { name: 'Electronics', nameAr: 'الإلكترونيات', value: 35 },
    { name: 'Clothing', nameAr: 'الملابس', value: 25 },
    { name: 'Food', nameAr: 'الطعام', value: 20 },
    { name: 'Home', nameAr: 'المنزل', value: 12 },
    { name: 'Other', nameAr: 'أخرى', value: 8 },
  ],
};

export const mockHourlyChart: ChartData = {
  id: 'chart-hourly',
  title: 'Hourly Traffic',
  titleAr: 'حركة المرور بالساعة',
  type: 'area',
  source: 'traffic.xlsx',
  updatedAt: '1 min ago',
  data: {
    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
    values: [50, 120, 280, 350, 300, 280, 320, 450, 280],
  },
};

export const mockDataSources: DataSource[] = [
  {
    id: 'ds-1',
    name: 'sales.xlsx',
    rows: 15234,
    type: 'xlsx',
    uploadedAt: '2024-01-15',
  },
  {
    id: 'ds-2',
    name: 'orders.csv',
    rows: 8521,
    type: 'csv',
    uploadedAt: '2024-01-14',
  },
];
