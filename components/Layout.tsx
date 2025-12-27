import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApp } from '@/context/AppContext';
import {
  CalendarIcon,
  UsersIcon,
  PetIcon,
  MegaphoneIcon,
  ChartIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  SunIcon,
  MoonIcon,
  GlobeIcon,
  UserIcon,
  BanknotesIcon,
} from './icons/Icons';
import Toast from './Toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, language, setLanguage, darkMode, toggleDarkMode, currentUser, toasts } = useApp();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: '/calendar', icon: CalendarIcon, label: 'calendar' as const },
    { href: '/clients', icon: UsersIcon, label: 'clients' as const },
    { href: '/pets', icon: PetIcon, label: 'pets' as const },
    { href: '/marketing', icon: MegaphoneIcon, label: 'marketing' as const },
    { href: '/finance', icon: BanknotesIcon, label: 'finance' as const },
    { href: '/dashboard', icon: ChartIcon, label: 'dashboard' as const },
    { href: '/settings', icon: SettingsIcon, label: 'settings' as const },
  ];

  const isActive = (href: string) => router.pathname.startsWith(href);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl
            border-r border-white/50 dark:border-slate-700/50 shadow-xl
            transform transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:shadow-none
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Logo */}
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <PetIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-slate-800 dark:text-white">
                  {t('appName')}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t('appTagline')}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{t(item.label)}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <Link
              href="/profile"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {t(currentUser.role as 'admin' | 'veterinarian' | 'receptionist')}
                </p>
              </div>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-b border-white/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between px-4 lg:px-8 h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <MenuIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>

              {/* Page Title - Mobile */}
              <div className="lg:hidden font-display font-semibold text-slate-800 dark:text-white">
                {t('appName')}
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2">
                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-600/50 transition-all"
                  title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
                >
                  <GlobeIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase">
                    {language}
                  </span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-600/50 transition-all"
                  title={darkMode ? t('lightMode') : t('darkMode')}
                >
                  {darkMode ? (
                    <SunIcon className="w-5 h-5 text-amber-500" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  );
};

export default Layout;

