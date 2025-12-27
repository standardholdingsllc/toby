import React, { useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  DollarIcon,
  CalendarIcon,
  UsersIcon,
  PetIcon,
  RefreshIcon,
  ClockIcon,
  BanknotesIcon,
  ReceiptIcon,
  ExclamationTriangleIcon,
} from '@/components/icons/Icons';
import { revenueData, appointmentsByMonth, appointmentsByType, monthlyFinanceSummary } from '@/data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatCard: React.FC<{
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}> = ({ icon: Icon, label, value, trend, color }) => (
  <div className="stat-card group hover:scale-[1.02] transition-transform">
    <div className="flex items-start justify-between">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-3xl font-display font-bold text-slate-800 dark:text-white">
        {value}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { t, clients, pets, appointments, financeRecords } = useApp();

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const appointmentsThisWeek = appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return aptDate >= weekStart && aptDate <= weekEnd && apt.status === 'scheduled';
    }).length;
    
    const newClientsThisMonth = clients.filter((client) => {
      const createdDate = new Date(client.createdAt);
      return createdDate.getMonth() === thisMonth && createdDate.getFullYear() === thisYear;
    }).length;
    
    // Calculate revenue from finance records
    const thisMonthRecords = financeRecords.filter(r => {
      const date = new Date(r.date);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    });
    
    const revenueThisMonth = thisMonthRecords
      .filter(r => r.status === 'paid')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const pendingAmount = financeRecords
      .filter(r => r.status === 'pending')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const overdueAmount = financeRecords
      .filter(r => r.status === 'overdue')
      .reduce((sum, r) => sum + r.amount, 0);
    
    return {
      revenue: `S/ ${revenueThisMonth.toLocaleString()}`,
      appointmentsThisWeek,
      newClientsThisMonth,
      totalPets: pets.length,
      pendingAmount,
      overdueAmount,
    };
  }, [clients, pets, appointments, financeRecords]);

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          callback: (value: number | string) => `S/ ${Number(value) / 1000}k`,
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  // Chart data - using monthly finance summary for more accurate data
  const revenueChartData = {
    labels: monthlyFinanceSummary.map((d) => d.month),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyFinanceSummary.map((d) => d.revenue),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
      },
      {
        label: 'Profit',
        data: monthlyFinanceSummary.map((d) => d.profit),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  const appointmentsChartData = {
    labels: appointmentsByMonth.map((d) => d.month),
    datasets: [
      {
        data: appointmentsByMonth.map((d) => d.count),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderRadius: 8,
        maxBarThickness: 40,
      },
    ],
  };

  const appointmentTypesData = {
    labels: appointmentsByType.map((d) => d.type),
    datasets: [
      {
        data: appointmentsByType.map((d) => d.count),
        backgroundColor: appointmentsByType.map((d) => d.color),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
            {t('businessDashboard')}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400">
            <ClockIcon className="w-4 h-4" />
            <span className="text-sm">{t('updatedJustNow')}</span>
          </div>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <RefreshIcon className="w-4 h-4" />
          {t('refresh')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-stagger">
        <StatCard
          icon={DollarIcon}
          label={t('revenueThisMonth')}
          value={stats.revenue}
          trend="+12%"
          color="bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/30"
        />
        <StatCard
          icon={CalendarIcon}
          label={t('appointmentsThisWeek')}
          value={stats.appointmentsThisWeek}
          color="bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30"
        />
        <StatCard
          icon={UsersIcon}
          label={t('newClientsThisMonth')}
          value={stats.newClientsThisMonth}
          trend="+5"
          color="bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shadow-purple-500/30"
        />
        <StatCard
          icon={PetIcon}
          label={t('totalPets')}
          value={stats.totalPets}
          color="bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30"
        />
      </div>

      {/* Finance Summary Cards */}
      {(stats.pendingAmount > 0 || stats.overdueAmount > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/finance" className="card hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-amber-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/30">
                <BanknotesIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  S/ {stats.pendingAmount.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('pendingPayments')}</p>
              </div>
            </div>
          </Link>
          
          {stats.overdueAmount > 0 && (
            <Link href="/finance" className="card hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-red-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-100 dark:bg-red-900/30">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    S/ {stats.overdueAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('overduePayments')}</p>
                </div>
              </div>
            </Link>
          )}
          
          <Link href="/finance" className="card hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-primary-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30">
                <ReceiptIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {financeRecords.filter(r => r.status === 'paid').length}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('paidInvoices')}</p>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
            {t('revenueOverTime')}
          </h2>
          <div className="h-[300px]">
            <Line data={revenueChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Appointments by Month Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
            {t('appointmentsByMonth')}
          </h2>
          <div className="h-[300px]">
            <Bar data={appointmentsChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Appointments by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
            {t('appointmentsByType')}
          </h2>
          <div className="h-[280px]">
            <Doughnut data={appointmentTypesData} options={doughnutOptions} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {appointments
              .filter((a) => a.status === 'scheduled')
              .slice(0, 5)
              .map((apt, index) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    apt.type === 'Check-up' || apt.type === 'checkup'
                      ? 'bg-primary-100 dark:bg-primary-900/30'
                      : apt.type === 'Vaccination' || apt.type === 'vaccination'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : apt.type === 'Surgery' || apt.type === 'surgery'
                      ? 'bg-amber-100 dark:bg-amber-900/30'
                      : 'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    <CalendarIcon className={`w-5 h-5 ${
                      apt.type === 'Check-up' || apt.type === 'checkup'
                        ? 'text-primary-600 dark:text-primary-400'
                        : apt.type === 'Vaccination' || apt.type === 'vaccination'
                        ? 'text-blue-600 dark:text-blue-400'
                        : apt.type === 'Surgery' || apt.type === 'surgery'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-purple-600 dark:text-purple-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-white truncate">
                      {apt.petName} - {apt.type}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      <Link
                        href={`/clients/${apt.ownerId}`}
                        className="hover:text-primary-500 transition-colors"
                      >
                        {apt.ownerName}
                      </Link> · {apt.date} at {apt.time}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {t('scheduled')}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

