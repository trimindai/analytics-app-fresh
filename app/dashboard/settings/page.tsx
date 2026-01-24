'use client';

import { User, Bell, Globe, Palette, Shield, CreditCard } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { LanguageToggle } from '@/components/layout/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  const { language } = useAppStore();
  const { t } = useTranslation(language);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">
          {t('settings')}
        </h1>
        <p className="text-gray-500 mt-1">
          {language === 'ar'
            ? 'إدارة إعدادات حسابك'
            : 'Manage your account settings'}
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white border border-gray-200 w-full justify-start">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            {language === 'ar' ? 'الإشعارات' : 'Notifications'}
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {language === 'ar' ? 'اللغة' : 'Language'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 card-shadow space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-bold text-2xl">D</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Dalal</h3>
                <p className="text-sm text-gray-500">demo@trimind.com</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{language === 'ar' ? 'الاسم الأول' : 'First Name'}</Label>
                <Input defaultValue="Dalal" />
              </div>
              <div className="space-y-2">
                <Label>{language === 'ar' ? 'اسم العائلة' : 'Last Name'}</Label>
                <Input defaultValue="Al-Sabah" />
              </div>
              <div className="space-y-2">
                <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input defaultValue="demo@trimind.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label>{language === 'ar' ? 'الشركة' : 'Company'}</Label>
                <Input defaultValue="Trimind Analytics" />
              </div>
            </div>

            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              {t('save')}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 card-shadow space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {language === 'ar'
                      ? 'استلم الرؤى والتقارير عبر البريد الإلكتروني'
                      : 'Receive insights and reports via email'}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'ar' ? 'تنبيهات الأولوية العالية' : 'High Priority Alerts'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {language === 'ar'
                      ? 'احصل على إشعار فوري للرؤى العاجلة'
                      : 'Get notified immediately for urgent insights'}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'ar' ? 'التقارير الأسبوعية' : 'Weekly Digest'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {language === 'ar'
                      ? 'ملخص أسبوعي لأدائك'
                      : 'Weekly summary of your performance'}
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="language" className="mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 card-shadow space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'اختر اللغة' : 'Select Language'}
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                {language === 'ar'
                  ? 'اختر لغة الواجهة المفضلة لديك'
                  : 'Choose your preferred interface language'}
              </p>
              <LanguageToggle />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {language === 'ar'
                  ? 'سيتم تطبيق تغييرات اللغة فورًا على جميع الصفحات.'
                  : 'Language changes will be applied immediately across all pages.'}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
