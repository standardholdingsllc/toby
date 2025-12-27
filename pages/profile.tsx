import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '@/context/AppContext';
import {
  ChevronLeftIcon,
  UserIcon,
  CreditCardIcon,
} from '@/components/icons/Icons';

export default function ProfilePage() {
  const router = useRouter();
  const { t, currentUser, setCurrentUser, language, setLanguage, showToast } = useApp();
  
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
  });

  // Mock payment method state
  const [paymentMethod, setPaymentMethod] = useState({
    hasCard: true,
    cardLast4: '4532',
    cardBrand: 'Visa',
    expiryMonth: '12',
    expiryYear: '2026',
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

        {/* Billing Section */}
        <div className="card mt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CreditCardIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {t('billing')}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('paymentMethod')}
              </p>
            </div>
          </div>

          {/* Current Plan */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('currentPlan')}</p>
                <p className="text-xl font-display font-bold text-slate-800 dark:text-white">
                  {t('professionalPlan')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  S/ 149<span className="text-sm font-normal text-slate-500 dark:text-slate-400">{t('perMonth')}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('nextBillingDate')}: 15 Ene 2026
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          {paymentMethod.hasCard ? (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-4">
                <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold tracking-wider">{paymentMethod.cardBrand.toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800 dark:text-white">
                    {t('cardEndingIn')} •••• {paymentMethod.cardLast4}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('expiresOn')} {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => showToast(t('paymentMethodUpdated'))}
                    className="px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                  >
                    {t('changePaymentMethod')}
                  </button>
                  <button 
                    onClick={() => {
                      setPaymentMethod({ ...paymentMethod, hasCard: false });
                      showToast(t('paymentMethodRemoved'));
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    {t('removePaymentMethod')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => {
                setPaymentMethod({
                  hasCard: true,
                  cardLast4: '4532',
                  cardBrand: 'Visa',
                  expiryMonth: '12',
                  expiryYear: '2026',
                });
                showToast(t('paymentMethodUpdated'));
              }}
              className="w-full p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/20 transition-all group"
            >
              <div className="flex items-center justify-center gap-3">
                <CreditCardIcon className="w-6 h-6 text-slate-400 group-hover:text-primary-500 transition-colors" />
                <span className="font-medium text-slate-600 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {t('addPaymentMethod')}
                </span>
              </div>
            </button>
          )}

          {/* Billing History */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t('billingHistory')}
            </h4>
            <div className="space-y-2">
              {[
                { date: '15 Dic 2025', amount: 'S/ 149.00', status: 'paid' },
                { date: '15 Nov 2025', amount: 'S/ 149.00', status: 'paid' },
                { date: '15 Oct 2025', amount: 'S/ 149.00', status: 'paid' },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{invoice.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-800 dark:text-white">{invoice.amount}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Pagado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

