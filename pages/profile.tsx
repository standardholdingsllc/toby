import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '@/context/AppContext';
import {
  ChevronLeftIcon,
  UserIcon,
  EmailIcon,
} from '@/components/icons/Icons';

export default function ProfilePage() {
  const router = useRouter();
  const { t, currentUser, setCurrentUser, language, setLanguage, showToast } = useApp();
  
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name: formData.name,
      email: formData.email,
    });
    showToast(t('profileUpdated'));
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
            {t('myProfile')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {t('personalInfo')}
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        {/* Profile Card */}
        <div className="card mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/30">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
                {currentUser.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 capitalize">
                {t(currentUser.role as 'admin' | 'veterinarian' | 'receptionist')}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('email')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('role')}
              </label>
              <input
                type="text"
                value={t(formData.role as 'admin' | 'veterinarian' | 'receptionist')}
                disabled
                className="input-field bg-slate-100 dark:bg-slate-700 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Role cannot be changed from this page
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('languageSettings')}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
                className="input-field"
              >
                <option value="en">🇺🇸 {t('english')}</option>
                <option value="es">🇪🇸 {t('spanish')}</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button type="submit" className="btn-primary">
                {t('updateProfile')}
              </button>
            </div>
          </form>
        </div>

        {/* Account Info */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Account Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500 dark:text-slate-400">User ID</span>
              <span className="font-mono text-sm text-slate-700 dark:text-slate-300">
                {currentUser.id}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500 dark:text-slate-400">Account Status</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500 dark:text-slate-400">Password</span>
              <button
                disabled
                className="text-sm text-slate-400 cursor-not-allowed"
              >
                Change Password (Demo disabled)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

