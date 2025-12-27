import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  SettingsIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  UsersIcon,
  CheckIcon,
} from '@/components/icons/Icons';

export default function SettingsPage() {
  const { t, language, setLanguage, darkMode, toggleDarkMode, showToast } = useApp();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveSettings = () => {
    showToast(t('settingsSaved'));
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
          {t('settingsTitle')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your app preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Quick Links */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/profile"
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{t('myProfile')}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">View and edit your profile</p>
              </div>
            </Link>
            
            <Link
              href="/team"
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{t('teamManagement')}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage team members</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Language Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <GlobeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {t('languageSettings')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('selectLanguage')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                language === 'en'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {language === 'en' && <CheckIcon className="w-4 h-4" />}
              🇺🇸 {t('english')}
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                language === 'es'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {language === 'es' && <CheckIcon className="w-4 h-4" />}
              🇪🇸 {t('spanish')}
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              {darkMode ? (
                <MoonIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              ) : (
                <SunIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {t('themeSettings')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Choose your preferred theme
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => darkMode && toggleDarkMode()}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                !darkMode
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <SunIcon className="w-4 h-4" />
              {t('lightMode')}
            </button>
            <button
              onClick={() => !darkMode && toggleDarkMode()}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                darkMode
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <MoonIcon className="w-4 h-4" />
              {t('darkMode')}
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {t('notificationSettings')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your notifications
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 dark:text-slate-300">
                {t('emailNotifications')}
              </span>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  emailNotifications
                    ? 'bg-primary-500'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    emailNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 dark:text-slate-300">
                {t('smsNotifications')}
              </span>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  smsNotifications
                    ? 'bg-primary-500'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    smsNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button onClick={handleSaveSettings} className="btn-primary">
            {t('saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
}

