import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  GlobeIcon, 
  CalendarIcon, 
  UsersIcon, 
  MegaphoneIcon,
  PetIcon
} from '@/components/icons/Icons';

export default function Home() {
  const { t, language, setLanguage } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <PetIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-slate-900 dark:text-white">
              {t('appName')}
            </span>
          </div>

          <div className="flex items-center gap-4">
             {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            >
              <GlobeIcon className="w-5 h-5" />
            </button>
            
            <a 
              href="mailto:sales@toby.com" 
              className="hidden sm:block text-slate-600 dark:text-slate-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('contactSales')}
            </a>
            
            <Link 
              href="/dashboard"
              className="btn-primary"
            >
              {t('accessAccount')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 lg:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
               {t('landingTitle')}
             </span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('landingSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link 
              href="/dashboard"
              className="btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-500/20"
            >
              {t('accessAccount')}
            </Link>
            <a 
              href="mailto:sales@toby.com"
              className="px-8 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl"
            >
              {t('contactSales')}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
         <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-center text-slate-900 dark:text-white mb-16">
              {t('featuresTitle')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
               {/* Feature 1 */}
               <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-500 dark:text-blue-400">
                     <CalendarIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                     {t('feature1Title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     {t('feature1Desc')}
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-6 text-emerald-500 dark:text-emerald-400">
                     <UsersIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                     {t('feature2Title')}
                  </h3>
                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     {t('feature2Desc')}
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-6 text-amber-500 dark:text-amber-400">
                     <MegaphoneIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                     {t('feature3Title')}
                  </h3>
                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     {t('feature3Desc')}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
         <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white mb-8">
               {t('readyToStart')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
               {t('getInTouch')}
            </p>
            <a 
              href="mailto:sales@toby.com"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
               {t('contactSales')}
            </a>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
         <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <PetIcon className="w-5 h-5 text-white" />
               </div>
               <span className="font-display font-bold text-slate-900 dark:text-white">
                  {t('appName')}
               </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
               {t('copyright')}
            </p>
         </div>
      </footer>
    </div>
  );
}
