export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    upload: 'Upload Data',
    insights: 'AI Insights',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    
    // Common
    search: 'Search...',
    today: 'Today',
    allBranches: 'All Branches',
    allProducts: 'All Products',
    compare: 'Compare',
    viewAll: 'View All',
    takeAction: 'Take Action',
    dismiss: 'Dismiss',
    back: 'Back',
    continue: 'Continue',
    save: 'Save',
    cancel: 'Cancel',
    
    // Dashboard
    dashboards: 'Dashboards',
    dataSources: 'Data Sources',
    addDataSource: 'Add Data Source',
    rows: 'rows',
    updatedAt: 'Updated',
    source: 'Source',
    confidence: 'confidence',
    
    // Insights
    newInsights: 'New',
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',
    
    // Upload
    uploadTitle: 'Upload Your Data',
    dropzoneText: 'Drag & drop your file here',
    orClickBrowse: 'or click to browse',
    supportedFormats: 'Supported: CSV, XLSX, XLS, JSON',
    maxFileSize: 'Maximum file size: 50MB',
    
    // Profile Selection
    selectProfile: 'Select Your Analytics Profile',
    aiDetected: 'AI detected',
    withConfidence: 'with',
    detected: 'DETECTED',
    premium: 'PREMIUM',
    enterprise: 'ENTERPRISE',
    contactSales: 'Contact Sales',
    
    // Profiles
    profileA: 'Transactional Operations',
    profileB: 'Service & Appointments',
    profileC: 'Pipeline & Sales',
    profileD: 'Operations & Process',
    profileE: 'Content & Text',
    profileX: 'Custom Analytics',
    
    // KPIs
    vsLastMonth: 'vs last month',
    
    // Trust Badges
    noCreditCard: 'No credit card required',
    setupTime: 'Setup in 5 minutes',
    unlimitedTeam: 'Unlimited team members',
    builtIn: 'Built in Kuwait',
  },
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    upload: 'تحميل البيانات',
    insights: 'رؤى الذكاء الاصطناعي',
    reports: 'التقارير',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Common
    search: 'بحث...',
    today: 'اليوم',
    allBranches: 'جميع الفروع',
    allProducts: 'جميع المنتجات',
    compare: 'مقارنة',
    viewAll: 'عرض الكل',
    takeAction: 'اتخاذ إجراء',
    dismiss: 'تجاهل',
    back: 'رجوع',
    continue: 'متابعة',
    save: 'حفظ',
    cancel: 'إلغاء',
    
    // Dashboard
    dashboards: 'لوحات التحكم',
    dataSources: 'مصادر البيانات',
    addDataSource: 'إضافة مصدر بيانات',
    rows: 'صف',
    updatedAt: 'تم التحديث',
    source: 'المصدر',
    confidence: 'الثقة',
    
    // Insights
    newInsights: 'جديد',
    highPriority: 'أولوية عالية',
    mediumPriority: 'أولوية متوسطة',
    lowPriority: 'أولوية منخفضة',
    
    // Upload
    uploadTitle: 'تحميل بياناتك',
    dropzoneText: 'اسحب وأفلت ملفك هنا',
    orClickBrowse: 'أو انقر للتصفح',
    supportedFormats: 'الملفات المدعومة: CSV, XLSX, XLS, JSON',
    maxFileSize: 'الحجم الأقصى: 50 ميجابايت',
    
    // Profile Selection
    selectProfile: 'اختر ملف التحليلات الخاص بك',
    aiDetected: 'اكتشف الذكاء الاصطناعي',
    withConfidence: 'بنسبة',
    detected: 'تم الاكتشاف',
    premium: 'مميز',
    enterprise: 'للمؤسسات',
    contactSales: 'تواصل مع المبيعات',
    
    // Profiles
    profileA: 'العمليات التجارية',
    profileB: 'الخدمات والمواعيد',
    profileC: 'خط الأنابيب والمبيعات',
    profileD: 'العمليات والإجراءات',
    profileE: 'المحتوى والنصوص',
    profileX: 'التحليلات المخصصة',
    
    // KPIs
    vsLastMonth: 'مقارنة بالشهر الماضي',
    
    // Trust Badges
    noCreditCard: 'لا تحتاج بطاقة ائتمان',
    setupTime: 'الإعداد في 5 دقائق',
    unlimitedTeam: 'أعضاء فريق غير محدودين',
    builtIn: 'صنع في الكويت',
  },
};

export type TranslationKey = keyof typeof translations.en;

export const useTranslation = (language: 'en' | 'ar') => {
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };
  return { t };
};
