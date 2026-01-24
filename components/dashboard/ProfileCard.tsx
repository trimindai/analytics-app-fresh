'use client';

import { Check, Crown } from 'lucide-react';
import { Profile } from '@/types';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';

interface ProfileCardProps {
  profile: Profile;
  isSelected?: boolean;
  isDetected?: boolean;
  confidence?: number;
  onSelect: (id: string) => void;
}

export function ProfileCard({
  profile,
  isSelected = false,
  isDetected = false,
  confidence = 0,
  onSelect,
}: ProfileCardProps) {
  const { language } = useAppStore();
  const { t } = useTranslation(language);

  const isPremium = profile.isPremium;

  return (
    <div
      onClick={() => !isPremium && onSelect(profile.id)}
      className={`relative p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
        isPremium
          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50'
          : isSelected
          ? 'border-teal-500 bg-teal-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute -top-2 -right-2">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            <Crown className="w-3 h-3" />
            {t('premium')}
          </span>
        </div>
      )}

      {/* Detected Badge */}
      {isDetected && !isPremium && (
        <div className="absolute -top-2 left-4">
          <span className="inline-flex items-center gap-1 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            <Check className="w-3 h-3" />
            {t('detected')} {confidence}%
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-3">{profile.icon}</div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-1">
        PROFILE {profile.id}
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        {language === 'ar' ? profile.nameAr : profile.name}
      </p>

      {/* Industries */}
      <div className="flex flex-wrap gap-1 mb-3">
        {(language === 'ar' ? profile.industriesAr : profile.industries)
          .slice(0, 3)
          .map((industry, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {industry}
            </span>
          ))}
      </div>

      {/* Stats */}
      {!isPremium && profile.cardCount && (
        <div className="text-xs text-gray-500">
          {profile.cardCount} Cards | {profile.dashboardCount} Dashboards
        </div>
      )}

      {/* Premium CTA */}
      {isPremium && (
        <button className="mt-3 w-full py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-medium rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-colors">
          {t('contactSales')}
        </button>
      )}

      {/* Selected Check */}
      {isSelected && !isPremium && (
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: profile.color }}
        >
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
