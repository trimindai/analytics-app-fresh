'use client';

import { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { useAppStore } from '@/lib/store/useAppStore';
import { useTranslation } from '@/lib/i18n/translations';
import { getAllProfiles } from '@/config/profiles';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Step = 'upload' | 'preview' | 'classifying' | 'profile' | 'success';

export default function UploadPage() {
  const { language, setCurrentProfileId } = useAppStore();
  const { t } = useTranslation(language);
  const profiles = getAllProfiles();

  const [step, setStep] = useState<Step>('upload');
  const [selectedProfile, setSelectedProfile] = useState<string>('A');
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setStep('classifying');
    
    // Simulate classification progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 15;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => setStep('profile'), 500);
      }
      setProgress(prog);
    }, 200);
  };

  const handleContinue = () => {
    setCurrentProfileId(selectedProfile);
    setStep('success');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step: Upload */}
      {step === 'upload' && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              {t('uploadTitle')}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'ar'
                ? 'قم بتحميل بياناتك للبدء في التحليل'
                : 'Upload your data to start analyzing'}
            </p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              isDragging
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
          >
            <div className="flex justify-center mb-4">
              <div className="flex gap-2">
                <FileSpreadsheet className="w-10 h-10 text-green-500" />
                <FileSpreadsheet className="w-10 h-10 text-blue-500" />
                <FileSpreadsheet className="w-10 h-10 text-purple-500" />
              </div>
            </div>

            <p className="text-lg font-medium text-gray-700 mb-2">
              {t('dropzoneText')}
            </p>
            <p className="text-gray-500 mb-4">{t('orClickBrowse')}</p>

            <input
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5" />
              {language === 'ar' ? 'اختر ملف' : 'Choose File'}
            </label>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">{t('supportedFormats')}</p>
              <p className="text-sm text-gray-500">{t('maxFileSize')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step: Classifying */}
      {step === 'classifying' && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              {language === 'ar' ? 'جاري التحليل...' : 'Analyzing your data...'}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'ar'
                ? 'يقوم الذكاء الاصطناعي بتحليل بياناتك'
                : 'AI is classifying your data structure'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <FileSpreadsheet className="w-8 h-8 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">{fileName}</p>
                <p className="text-sm text-gray-500">Processing...</p>
              </div>
            </div>

            <Progress value={progress} className="h-3 mb-4" />

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className={`w-4 h-4 ${progress > 20 ? 'text-green-500' : 'text-gray-300'}`} />
                <span>Reading file structure</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className={`w-4 h-4 ${progress > 40 ? 'text-green-500' : 'text-gray-300'}`} />
                <span>Detecting columns and data types</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className={`w-4 h-4 ${progress > 60 ? 'text-green-500' : 'text-gray-300'}`} />
                <span>Matching to analytics profiles</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className={`w-4 h-4 ${progress > 80 ? 'text-green-500' : 'text-gray-300'}`} />
                <span>Generating recommendations</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step: Profile Selection */}
      {step === 'profile' && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              {t('selectProfile')}
            </h1>
            <p className="text-teal-600 mt-2">
              {t('aiDetected')} Profile A {t('withConfidence')} 94% {t('confidence')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isSelected={selectedProfile === profile.id}
                isDetected={profile.id === 'A'}
                confidence={94}
                onSelect={setSelectedProfile}
              />
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setStep('upload')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Button>
            <Button
              onClick={handleContinue}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white"
            >
              {t('continue')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step: Success */}
      {step === 'success' && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              {language === 'ar' ? 'تم بنجاح!' : 'Success!'}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'ar'
                ? 'تم إعداد لوحة التحكم الخاصة بك'
                : 'Your dashboard is ready'}
            </p>
          </div>

          <Button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8"
          >
            {language === 'ar' ? 'اذهب إلى لوحة التحكم' : 'Go to Dashboard'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
