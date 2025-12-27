import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  GlobeIcon, 
  CalendarIcon, 
  UsersIcon, 
  MegaphoneIcon,
  PetIcon,
  ChartIcon,
  WhatsAppIcon,
  CheckIcon,
  BanknotesIcon,
} from '@/components/icons/Icons';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

// Stats counter animation
function AnimatedStat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl lg:text-6xl font-display font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/80 font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const { t, language, setLanguage, darkMode, toggleDarkMode } = useApp();
  const containerRef = useScrollReveal();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: CalendarIcon,
      title: language === 'es' ? 'Agenda Inteligente' : 'Smart Scheduling',
      desc: language === 'es' 
        ? 'Calendario drag-and-drop con recordatorios automáticos. Reduce las citas perdidas hasta un 40%.'
        : 'Drag-and-drop calendar with automatic reminders. Reduce no-shows by up to 40%.',
      iconColor: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/30',
    },
    {
      icon: UsersIcon,
      title: language === 'es' ? 'CRM de Pacientes' : 'Patient CRM',
      desc: language === 'es'
        ? 'Historial médico completo de cada mascota. Accesible desde cualquier dispositivo, en cualquier momento.'
        : 'Complete medical history for every pet. Accessible from any device, anytime.',
      iconColor: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
      icon: WhatsAppIcon,
      title: language === 'es' ? 'WhatsApp Integrado' : 'WhatsApp Integration',
      desc: language === 'es'
        ? 'Comunícate con tus clientes donde ya están. Recordatorios y seguimientos automatizados.'
        : 'Communicate with clients where they already are. Automated reminders and follow-ups.',
      iconColor: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/30',
    },
    {
      icon: BanknotesIcon,
      title: language === 'es' ? 'Facturación Simple' : 'Simple Billing',
      desc: language === 'es'
        ? 'Genera facturas profesionales en segundos. Control total de ingresos y pagos pendientes.'
        : 'Generate professional invoices in seconds. Full control of revenue and pending payments.',
      iconColor: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/30',
    },
    {
      icon: ChartIcon,
      title: language === 'es' ? 'Analytics en Tiempo Real' : 'Real-time Analytics',
      desc: language === 'es'
        ? 'Dashboards que te muestran exactamente cómo va tu negocio. Toma decisiones informadas.'
        : 'Dashboards showing exactly how your business is doing. Make informed decisions.',
      iconColor: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/30',
    },
    {
      icon: MegaphoneIcon,
      title: language === 'es' ? 'Marketing Automatizado' : 'Automated Marketing',
      desc: language === 'es'
        ? 'Campañas de email y WhatsApp que se envían solas. Mantén a tus clientes comprometidos.'
        : 'Email and WhatsApp campaigns that send themselves. Keep your clients engaged.',
      iconColor: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/30',
    },
  ];

  const problems = [
    {
      stat: '73%',
      text: language === 'es' 
        ? 'de clínicas usan papel o Excel para gestionar citas'
        : 'of clinics use paper or Excel to manage appointments',
    },
    {
      stat: '27%',
      text: language === 'es'
        ? 'de veterinarias tienen presencia digital básica'
        : 'of vet clinics have basic digital presence',
    },
    {
      stat: '40%',
      text: language === 'es'
        ? 'de ingresos perdidos por citas no confirmadas'
        : 'of revenue lost to unconfirmed appointments',
    },
  ];

  const testimonials = [
    {
      name: 'Dra. María García',
      role: language === 'es' ? 'Clínica Veterinaria San Borja' : 'San Borja Veterinary Clinic',
      text: language === 'es'
        ? '"Toby transformó completamente cómo manejamos nuestra clínica. Los recordatorios automáticos redujeron nuestras citas perdidas en un 60%."'
        : '"Toby completely transformed how we run our clinic. Automatic reminders reduced our no-shows by 60%."',
      avatar: '👩‍⚕️',
    },
    {
      name: 'Dr. Carlos Mendoza',
      role: language === 'es' ? 'Hospital Veterinario Lima Norte' : 'Lima Norte Veterinary Hospital',
      text: language === 'es'
        ? '"Por fin un software pensado para veterinarios peruanos. La integración con WhatsApp es exactamente lo que necesitábamos."'
        : '"Finally software designed for Peruvian veterinarians. WhatsApp integration is exactly what we needed."',
      avatar: '👨‍⚕️',
    },
    {
      name: 'Dra. Ana Lucía Torres',
      role: language === 'es' ? 'Pet Care Miraflores' : 'Pet Care Miraflores',
      text: language === 'es'
        ? '"El dashboard de finanzas me da visibilidad total de mi negocio. Ahora tomo decisiones basadas en datos reales."'
        : '"The finance dashboard gives me complete visibility into my business. Now I make decisions based on real data."',
      avatar: '👩‍💼',
    },
  ];

  const pricingPlans = [
    {
      name: language === 'es' ? 'Inicial' : 'Starter',
      price: '99',
      desc: language === 'es' ? 'Para clínicas pequeñas' : 'For small clinics',
      features: language === 'es' 
        ? ['1 veterinario', 'Calendario básico', 'Hasta 100 pacientes', 'Soporte por email']
        : ['1 veterinarian', 'Basic calendar', 'Up to 100 patients', 'Email support'],
      popular: false,
    },
    {
      name: language === 'es' ? 'Profesional' : 'Professional',
      price: '199',
      desc: language === 'es' ? 'La opción más popular' : 'Most popular choice',
      features: language === 'es'
        ? ['Hasta 5 veterinarios', 'WhatsApp integrado', 'Pacientes ilimitados', 'Analytics avanzados', 'Soporte prioritario']
        : ['Up to 5 veterinarians', 'WhatsApp integration', 'Unlimited patients', 'Advanced analytics', 'Priority support'],
      popular: true,
    },
    {
      name: language === 'es' ? 'Enterprise' : 'Enterprise',
      price: '349',
      desc: language === 'es' ? 'Para hospitales veterinarios' : 'For veterinary hospitals',
      features: language === 'es'
        ? ['Veterinarios ilimitados', 'API personalizada', 'Múltiples sucursales', 'Gerente de cuenta dedicado', 'SLA garantizado']
        : ['Unlimited veterinarians', 'Custom API', 'Multiple locations', 'Dedicated account manager', 'Guaranteed SLA'],
      popular: false,
    },
  ];

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-black/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 rotate-3 hover:rotate-0 transition-transform duration-300">
              <PetIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Toby
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              {language === 'es' ? 'Funciones' : 'Features'}
            </a>
            <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              {language === 'es' ? 'Precios' : 'Pricing'}
            </a>
            <a href="#testimonials" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              {language === 'es' ? 'Testimonios' : 'Testimonials'}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              <GlobeIcon className="w-5 h-5" />
            </button>
            
            <a 
              href="mailto:ventas@toby.pe" 
              className="hidden sm:block text-slate-700 dark:text-slate-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {language === 'es' ? 'Contactar' : 'Contact'}
            </a>
            
            <Link 
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20"
            >
              {language === 'es' ? 'Acceder' : 'Login'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 landing-hero-gradient noise-overlay">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-accent-400/15 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Text */}
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-8">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                {language === 'es' ? '🇵🇪 Hecho para veterinarios peruanos' : '🇵🇪 Made for Peruvian veterinarians'}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                {language === 'es' ? (
                  <>
                    Tu clínica,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-emerald-500 animate-gradient">
                      simplificada
                    </span>
                  </>
                ) : (
                  <>
                    Your clinic,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-emerald-500 animate-gradient">
                      simplified
                    </span>
                  </>
                )}
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-xl">
                {language === 'es' 
                  ? 'La plataforma todo-en-uno para gestionar citas, pacientes, facturación y comunicación. Diseñada específicamente para clínicas veterinarias en Perú.'
                  : 'The all-in-one platform to manage appointments, patients, billing, and communication. Designed specifically for veterinary clinics in Peru.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {language === 'es' ? 'Probar gratis' : 'Try free'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a 
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  {language === 'es' ? 'Ver demo' : 'Watch demo'}
                </a>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {['👩‍⚕️', '👨‍⚕️', '👩‍💼', '👨‍💼'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-lg">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-white">+150</span> {language === 'es' ? 'clínicas confían en Toby' : 'clinics trust Toby'}
                </div>
              </div>
            </div>

            {/* Right column - Dashboard preview */}
            <div className="reveal reveal-delay-2 relative">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl" />
                
                {/* Dashboard mockup */}
                <div className="relative glass-card-strong rounded-3xl p-2 shadow-2xl">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden">
                    {/* Browser bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-slate-700 rounded-lg px-4 py-1.5 text-slate-400 text-sm">
                          app.toby.pe/dashboard
                        </div>
                      </div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { label: language === 'es' ? 'Citas hoy' : 'Appointments', value: '12', color: 'text-blue-400' },
                          { label: language === 'es' ? 'Ingresos' : 'Revenue', value: 'S/2,450', color: 'text-emerald-400' },
                          { label: language === 'es' ? 'Pacientes' : 'Patients', value: '847', color: 'text-purple-400' },
                        ].map((stat, i) => (
                          <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-slate-400 text-sm">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold">{language === 'es' ? 'Próximas citas' : 'Upcoming'}</span>
                          <span className="text-primary-400 text-sm">{language === 'es' ? 'Ver todo' : 'View all'}</span>
                        </div>
                        {[
                          { time: '09:00', pet: 'Luna', type: language === 'es' ? 'Vacunación' : 'Vaccination' },
                          { time: '10:30', pet: 'Max', type: language === 'es' ? 'Consulta' : 'Checkup' },
                          { time: '11:00', pet: 'Bella', type: language === 'es' ? 'Cirugía' : 'Surgery' },
                        ].map((apt, i) => (
                          <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-700/50 last:border-0">
                            <span className="text-slate-400 text-sm w-12">{apt.time}</span>
                            <span className="text-white">{apt.pet}</span>
                            <span className="text-slate-500 text-sm ml-auto">{apt.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -right-4 top-1/4 glass-card-strong rounded-2xl p-4 shadow-xl animate-float-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <WhatsAppIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{language === 'es' ? 'Recordatorio enviado' : 'Reminder sent'}</div>
                      <div className="text-xs text-slate-500">Luna - {language === 'es' ? 'Mañana 9:00' : 'Tomorrow 9:00'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-sm">{language === 'es' ? 'Descubre más' : 'Discover more'}</span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-slate-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              {language === 'es' ? 'El problema que resolvemos' : 'The problem we solve'}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Las clínicas veterinarias en Perú enfrentan desafíos operativos críticos que limitan su crecimiento.'
                : 'Veterinary clinics in Peru face critical operational challenges that limit their growth.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} text-center p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50`}>
                <div className="text-6xl lg:text-7xl font-display font-bold text-primary-400 mb-4">
                  {problem.stat}
                </div>
                <p className="text-slate-300 text-lg">{problem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6">
              {language === 'es' ? 'FUNCIONALIDADES' : 'FEATURES'}
            </span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
              {language === 'es' ? 'Todo lo que necesitas' : 'Everything you need'}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {language === 'es'
                ? 'Una plataforma completa diseñada para las necesidades reales de las clínicas veterinarias.'
                : 'A complete platform designed for the real needs of veterinary clinics.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className={`reveal reveal-delay-${(i % 3) + 1} group p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 feature-card-hover`}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-primary-500 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <AnimatedStat value={3323} label={language === 'es' ? 'Clínicas en Perú' : 'Clinics in Peru'} />
            <AnimatedStat value={53} suffix="%" label={language === 'es' ? 'Hogares con perros' : 'Households with dogs'} />
            <AnimatedStat value={150} suffix="+" label={language === 'es' ? 'Clínicas activas' : 'Active clinics'} />
            <AnimatedStat value={40} suffix="%" label={language === 'es' ? 'Menos citas perdidas' : 'Fewer no-shows'} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6">
              {language === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
              {language === 'es' ? 'Lo que dicen nuestros clientes' : 'What our clients say'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className={`reveal reveal-delay-${i + 1} p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-black/20`}
              >
                <div className="text-4xl mb-6">{testimonial.avatar}</div>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 italic">
                  {testimonial.text}
                </p>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6">
              {language === 'es' ? 'PRECIOS' : 'PRICING'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
              {language === 'es' ? 'Planes simples y transparentes' : 'Simple, transparent pricing'}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Sin costos ocultos. Cancela cuando quieras.'
                : 'No hidden fees. Cancel anytime.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`reveal reveal-delay-${i + 1} relative p-8 rounded-3xl ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-primary-500 to-primary-600 text-white scale-105 shadow-2xl shadow-primary-500/30' 
                    : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-500 text-white text-sm font-bold">
                    {language === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-primary-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {plan.desc}
                  </p>
                </div>
                
                <div className="mb-8">
                  <span className={`text-5xl font-display font-bold ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    S/{plan.price}
                  </span>
                  <span className={`${plan.popular ? 'text-primary-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    /{language === 'es' ? 'mes' : 'mo'}
                  </span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <CheckIcon className={`w-5 h-5 ${plan.popular ? 'text-primary-200' : 'text-primary-500'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-slate-600 dark:text-slate-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/dashboard"
                  className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-white text-primary-600 hover:bg-primary-50'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                  }`}
                >
                  {language === 'es' ? 'Comenzar ahora' : 'Get started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-slate-900 dark:bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10 reveal">
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-8">
            {language === 'es' 
              ? '¿Listo para transformar tu clínica?'
              : 'Ready to transform your clinic?'}
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Únete a más de 150 clínicas que ya confían en Toby. Prueba gratis por 14 días.'
              : 'Join over 150 clinics that already trust Toby. Try free for 14 days.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-500 text-white font-bold text-lg shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              {language === 'es' ? 'Comenzar gratis' : 'Start free'}
            </Link>
            <a 
              href="mailto:ventas@toby.pe"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              {language === 'es' ? 'Hablar con ventas' : 'Talk to sales'}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <PetIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold text-white">Toby</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm">
                {language === 'es' 
                  ? 'La plataforma de gestión veterinaria líder en Perú. Simplifica tu clínica, mejora tu servicio.'
                  : 'The leading veterinary management platform in Peru. Simplify your clinic, improve your service.'}
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold text-white mb-4">{language === 'es' ? 'Producto' : 'Product'}</h4>
              <ul className="space-y-3">
                {(language === 'es' 
                  ? ['Funciones', 'Precios', 'Integraciones', 'API', 'Actualizaciones']
                  : ['Features', 'Pricing', 'Integrations', 'API', 'Updates']
                ).map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">{language === 'es' ? 'Empresa' : 'Company'}</h4>
              <ul className="space-y-3">
                {(language === 'es' 
                  ? ['Nosotros', 'Blog', 'Carreras', 'Prensa', 'Contacto']
                  : ['About', 'Blog', 'Careers', 'Press', 'Contact']
                ).map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-4">{language === 'es' ? 'Legal' : 'Legal'}</h4>
              <ul className="space-y-3">
                {(language === 'es' 
                  ? ['Privacidad', 'Términos', 'Seguridad', 'Cookies', 'Licencias']
                  : ['Privacy', 'Terms', 'Security', 'Cookies', 'Licenses']
                ).map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 Toby Inc. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>🇵🇪</span>
              <span>{language === 'es' ? 'Hecho con ❤️ en Lima, Perú' : 'Made with ❤️ in Lima, Peru'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
