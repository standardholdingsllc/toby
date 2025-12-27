import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import {
  BanknotesIcon,
  ReceiptIcon,
  DocumentTextIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
  EditIcon,
  EmailIcon,
} from '@/components/icons/Icons';
import { format } from 'date-fns';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
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
import { FinanceRecord, FinanceItem, monthlyFinanceSummary, paymentMethodsData } from '@/data/mockData';

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

type TabType = 'overview' | 'payments' | 'invoices' | 'receipts';

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color: string;
  trend?: string;
}> = ({ icon, label, value, subValue, color, trend }) => (
  <div className="card p-5">
    <div className="flex items-start justify-between">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend.startsWith('+') 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-2xl font-display font-bold text-slate-800 dark:text-white">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
      {subValue && (
        <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{subValue}</p>
      )}
    </div>
  </div>
);

export default function FinancePage() {
  const { 
    t, 
    clients, 
    pets, 
    appointments,
    financeRecords, 
    addFinanceRecord, 
    updateFinanceRecord,
    deleteFinanceRecord,
    showToast 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FinanceRecord | null>(null);
  const [recordType, setRecordType] = useState<'payment' | 'invoice' | 'receipt'>('payment');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  // Form state
  const [formData, setFormData] = useState({
    type: 'payment' as 'payment' | 'invoice' | 'receipt',
    clientId: '',
    petId: '',
    appointmentId: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending' as 'paid' | 'pending' | 'overdue' | 'cancelled',
    paymentMethod: 'cash' as 'cash' | 'card' | 'transfer' | 'other',
    notes: '',
    items: [] as FinanceItem[],
  });

  // Calculate stats
  const stats = useMemo(() => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const thisMonthRecords = financeRecords.filter(r => {
      const date = new Date(r.date);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    });
    
    const totalRevenue = thisMonthRecords
      .filter(r => r.status === 'paid')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const pendingAmount = financeRecords
      .filter(r => r.status === 'pending')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const overdueAmount = financeRecords
      .filter(r => r.status === 'overdue')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const totalTransactions = thisMonthRecords.length;
    
    return {
      totalRevenue,
      pendingAmount,
      overdueAmount,
      totalTransactions,
    };
  }, [financeRecords]);

  // Filter records
  const filteredRecords = useMemo(() => {
    let filtered = [...financeRecords];
    
    // Filter by tab
    if (activeTab === 'invoices') {
      filtered = filtered.filter(r => r.type === 'invoice');
    } else if (activeTab === 'receipts') {
      filtered = filtered.filter(r => r.type === 'receipt');
    } else if (activeTab === 'payments') {
      filtered = filtered.filter(r => r.type === 'payment' || r.status === 'paid');
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.clientName.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.invoiceNumber?.toLowerCase().includes(query) ||
        r.receiptNumber?.toLowerCase().includes(query)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [financeRecords, activeTab, searchQuery, statusFilter]);

  // Chart data
  const revenueChartData = {
    labels: monthlyFinanceSummary.map(d => d.month),
    datasets: [
      {
        label: t('revenue'),
        data: monthlyFinanceSummary.map(d => d.revenue),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const paymentMethodsChartData = {
    labels: paymentMethodsData.map(d => d.method),
    datasets: [{
      data: paymentMethodsData.map(d => d.amount),
      backgroundColor: paymentMethodsData.map(d => d.color),
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: '#94a3b8' },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' },
      },
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { 
          color: '#94a3b8',
          callback: (value: any) => `S/ ${value / 1000}k`,
        },
      },
    },
  };

  const handleAddRecord = () => {
    const client = clients.find(c => c.id === formData.clientId);
    const pet = pets.find(p => p.id === formData.petId);
    
    const newRecord: Omit<FinanceRecord, 'id'> = {
      type: formData.type,
      clientId: formData.clientId,
      clientName: client?.name || '',
      petId: formData.petId || undefined,
      petName: pet?.name || undefined,
      appointmentId: formData.appointmentId || undefined,
      amount: formData.amount,
      description: formData.description,
      date: formData.date,
      status: formData.status,
      paymentMethod: formData.type === 'receipt' || formData.status === 'paid' ? formData.paymentMethod : undefined,
      invoiceNumber: formData.type === 'invoice' ? `INV-${new Date().getFullYear()}-${String(financeRecords.length + 1).padStart(3, '0')}` : undefined,
      receiptNumber: formData.type === 'receipt' ? `REC-${new Date().getFullYear()}-${String(financeRecords.length + 1).padStart(3, '0')}` : undefined,
      items: formData.items.length > 0 ? formData.items : undefined,
      notes: formData.notes || undefined,
    };
    
    addFinanceRecord(newRecord);
    setShowAddModal(false);
    resetForm();
  };

  const handleMarkAsPaid = (record: FinanceRecord) => {
    updateFinanceRecord(record.id, { 
      status: 'paid',
      paymentMethod: 'cash',
      receiptNumber: `REC-${new Date().getFullYear()}-${String(financeRecords.length + 1).padStart(3, '0')}`,
    });
  };

  const resetForm = () => {
    setFormData({
      type: 'payment',
      clientId: '',
      petId: '',
      appointmentId: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      paymentMethod: 'cash',
      notes: '',
      items: [],
    });
  };

  const addItem = () => {
    const newItem: FinanceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateItem = (itemId: string, field: keyof FinanceItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updated.total = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return item;
      }),
    }));
  };

  const removeItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'overdue':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'cancelled':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BanknotesIcon className="w-6 h-6 text-white" />}
          label={t('totalRevenue')}
          value={`S/ ${stats.totalRevenue.toLocaleString()}`}
          color="bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/30"
          trend="+12%"
        />
        <StatCard
          icon={<ClockIcon className="w-6 h-6 text-white" />}
          label={t('pendingPayments')}
          value={`S/ ${stats.pendingAmount.toLocaleString()}`}
          subValue={`${financeRecords.filter(r => r.status === 'pending').length} ${t('invoices').toLowerCase()}`}
          color="bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30"
        />
        <StatCard
          icon={<ExclamationTriangleIcon className="w-6 h-6 text-white" />}
          label={t('overduePayments')}
          value={`S/ ${stats.overdueAmount.toLocaleString()}`}
          subValue={`${financeRecords.filter(r => r.status === 'overdue').length} ${t('invoices').toLowerCase()}`}
          color="bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/30"
        />
        <StatCard
          icon={<ReceiptIcon className="w-6 h-6 text-white" />}
          label={t('recentTransactions')}
          value={stats.totalTransactions.toString()}
          subValue="This month"
          color="bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {t('revenueByMonth')}
          </h3>
          <div className="h-[300px]">
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {t('paymentMethods')}
          </h3>
          <div className="h-[250px]">
            <Doughnut
              data={paymentMethodsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8' },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            {t('recentTransactions')}
          </h3>
          <button
            onClick={() => setActiveTab('payments')}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {financeRecords.slice(0, 5).map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  record.type === 'receipt' 
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : record.type === 'invoice'
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  {record.type === 'receipt' ? (
                    <ReceiptIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : record.type === 'invoice' ? (
                    <DocumentTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <BanknotesIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{record.clientName}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{record.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800 dark:text-white">
                  S/ {record.amount.toLocaleString()}
                </p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadge(record.status)}`}>
                  {t(record.status as any)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecordsTable = () => (
    <div className="card">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search')}
            className="input-field pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option value="all">{t('status')}: All</option>
          <option value="paid">{t('paid')}</option>
          <option value="pending">{t('pending')}</option>
          <option value="overdue">{t('overdue')}</option>
        </select>
        <button
          onClick={() => {
            setRecordType(activeTab === 'invoices' ? 'invoice' : activeTab === 'receipts' ? 'receipt' : 'payment');
            setFormData(prev => ({ ...prev, type: activeTab === 'invoices' ? 'invoice' : activeTab === 'receipts' ? 'receipt' : 'payment' }));
            setShowAddModal(true);
          }}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <PlusIcon className="w-5 h-5" />
          {activeTab === 'invoices' ? t('addInvoice') : activeTab === 'receipts' ? t('addReceipt') : t('addPayment')}
        </button>
      </div>

      {/* Table */}
      {filteredRecords.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-8">{t('noResults')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('clients')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Description</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('amount')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('status')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <React.Fragment key={record.id}>
                  <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-4">
                      <p className="text-sm text-slate-800 dark:text-white">
                        {format(new Date(record.date), 'MMM d, yyyy')}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {record.invoiceNumber || record.receiptNumber || '-'}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{record.clientName}</p>
                      {record.petName && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">{record.petName}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {record.description}
                      </p>
                      {record.items && record.items.length > 0 && (
                        <button
                          onClick={() => toggleRowExpand(record.id)}
                          className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 mt-1"
                        >
                          {expandedRows.has(record.id) ? (
                            <>
                              <ChevronUpIcon className="w-3 h-3" />
                              Hide items
                            </>
                          ) : (
                            <>
                              <ChevronDownIcon className="w-3 h-3" />
                              {record.items.length} items
                            </>
                          )}
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        S/ {record.amount.toLocaleString()}
                      </p>
                      {record.paymentMethod && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                          {t(record.paymentMethod as any)}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadge(record.status)}`}>
                        {t(record.status as any)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {record.status === 'pending' && (
                          <button
                            onClick={() => handleMarkAsPaid(record)}
                            className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors"
                            title={t('markAsPaid')}
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        )}
                        {record.status === 'overdue' && (
                          <button
                            onClick={() => showToast('Reminder sent!')}
                            className="p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
                            title={t('sendReminder')}
                          >
                            <EmailIcon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedRecord(record);
                            setShowDetailModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                          title="View"
                        >
                          <PrinterIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFinanceRecord(record.id)}
                          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                          title={t('delete')}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Expanded row for items */}
                  {expandedRows.has(record.id) && record.items && (
                    <tr>
                      <td colSpan={6} className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
                        <table className="w-full">
                          <thead>
                            <tr className="text-xs text-slate-500 dark:text-slate-400">
                              <th className="text-left py-1 px-2">Item</th>
                              <th className="text-center py-1 px-2">Qty</th>
                              <th className="text-right py-1 px-2">Unit Price</th>
                              <th className="text-right py-1 px-2">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.items.map((item) => (
                              <tr key={item.id} className="text-sm">
                                <td className="py-1 px-2 text-slate-700 dark:text-slate-300">{item.description}</td>
                                <td className="py-1 px-2 text-center text-slate-600 dark:text-slate-400">{item.quantity}</td>
                                <td className="py-1 px-2 text-right text-slate-600 dark:text-slate-400">S/ {item.unitPrice}</td>
                                <td className="py-1 px-2 text-right font-medium text-slate-800 dark:text-white">S/ {item.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
            {t('finance')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {t('financeOverview')}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['overview', 'payments', 'invoices', 'receipts'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {tab === 'overview' && <ChartIcon className="w-4 h-4" />}
            {tab === 'payments' && <BanknotesIcon className="w-4 h-4" />}
            {tab === 'invoices' && <DocumentTextIcon className="w-4 h-4" />}
            {tab === 'receipts' && <ReceiptIcon className="w-4 h-4" />}
            {t(tab as any) || tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? renderOverviewTab() : renderRecordsTable()}

      {/* Add Record Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title={formData.type === 'invoice' ? t('addInvoice') : formData.type === 'receipt' ? t('addReceipt') : t('addPayment')}
        size="lg"
      >
        <div className="space-y-4">
          {/* Type Selection */}
          <div className="flex gap-2">
            {(['payment', 'invoice', 'receipt'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFormData(prev => ({ ...prev, type }))}
                className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
                  formData.type === type
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {t(type === 'payment' ? 'payments' : type === 'invoice' ? 'invoices' : 'receipts' as any)}
              </button>
            ))}
          </div>

          {/* Client Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('clients')} *
            </label>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
              className="input-field"
            >
              <option value="">Select client...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          {/* Pet Selection (Optional) */}
          {formData.clientId && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('pets')} (Optional)
              </label>
              <select
                value={formData.petId}
                onChange={(e) => setFormData(prev => ({ ...prev, petId: e.target.value }))}
                className="input-field"
              >
                <option value="">Select pet...</option>
                {pets.filter(p => p.ownerId === formData.clientId).map((pet) => (
                  <option key={pet.id} value={pet.id}>{pet.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Date and Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('date')} *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('status')}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="input-field"
              >
                <option value="pending">{t('pending')}</option>
                <option value="paid">{t('paid')}</option>
                <option value="overdue">{t('overdue')}</option>
              </select>
            </div>
          </div>

          {/* Payment Method (for paid records) */}
          {(formData.type === 'receipt' || formData.status === 'paid') && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('paymentMethod')}
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                className="input-field"
              >
                <option value="cash">{t('cash')}</option>
                <option value="card">{t('card')}</option>
                <option value="transfer">{t('transfer')}</option>
                <option value="other">{t('other')}</option>
              </select>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-field"
              placeholder="Enter description..."
            />
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('items')}
              </label>
              <button
                onClick={addItem}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                {t('addItem')}
              </button>
            </div>
            {formData.items.length > 0 ? (
              <div className="space-y-2">
                {formData.items.map((item) => (
                  <div key={item.id} className="flex gap-2 items-start p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                      className="input-field flex-1"
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      className="input-field w-20"
                      placeholder="Qty"
                    />
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="input-field w-24"
                      placeholder="Price"
                    />
                    <span className="w-20 py-2 text-right font-medium text-slate-800 dark:text-white">
                      S/ {item.total}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-lg font-semibold text-slate-800 dark:text-white">
                    {t('total')}: S/ {calculateTotal()}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                No items added. Add items or enter a manual amount below.
              </p>
            )}
          </div>

          {/* Manual Amount (if no items) */}
          {formData.items.length === 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('amount')} *
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                min="0"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('notes')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="input-field min-h-[80px]"
              placeholder="Additional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
              className="btn-secondary"
            >
              {t('cancel')}
            </button>
            <button
              onClick={() => {
                const finalAmount = formData.items.length > 0 ? calculateTotal() : formData.amount;
                setFormData(prev => ({ ...prev, amount: finalAmount }));
                handleAddRecord();
              }}
              disabled={!formData.clientId || !formData.description || (formData.items.length === 0 && formData.amount === 0)}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('save')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail/Print Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedRecord(null);
        }}
        title={selectedRecord?.type === 'invoice' ? t('invoices') : t('receipts')}
        size="md"
      >
        {selectedRecord && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {selectedRecord.invoiceNumber || selectedRecord.receiptNumber}
                </p>
                <p className="text-lg font-semibold text-slate-800 dark:text-white">
                  {format(new Date(selectedRecord.date), 'MMMM d, yyyy')}
                </p>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusBadge(selectedRecord.status)}`}>
                {t(selectedRecord.status as any)}
              </span>
            </div>

            {/* Client Info */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('clients')}</p>
              <p className="font-medium text-slate-800 dark:text-white">{selectedRecord.clientName}</p>
              {selectedRecord.petName && (
                <p className="text-sm text-slate-600 dark:text-slate-300">{t('pets')}: {selectedRecord.petName}</p>
              )}
            </div>

            {/* Items */}
            {selectedRecord.items && selectedRecord.items.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('items')}</p>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2">Item</th>
                      <th className="text-center py-2">Qty</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRecord.items.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 dark:border-slate-700/50">
                        <td className="py-2 text-sm text-slate-700 dark:text-slate-300">{item.description}</td>
                        <td className="py-2 text-sm text-center text-slate-600 dark:text-slate-400">{item.quantity}</td>
                        <td className="py-2 text-sm text-right text-slate-600 dark:text-slate-400">S/ {item.unitPrice}</td>
                        <td className="py-2 text-sm text-right font-medium text-slate-800 dark:text-white">S/ {item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-lg font-semibold text-slate-800 dark:text-white">{t('total')}</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                S/ {selectedRecord.amount.toLocaleString()}
              </p>
            </div>

            {/* Payment Method */}
            {selectedRecord.paymentMethod && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">{t('paymentMethod')}</span>
                <span className="text-slate-800 dark:text-white capitalize">{t(selectedRecord.paymentMethod as any)}</span>
              </div>
            )}

            {/* Notes */}
            {selectedRecord.notes && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-300">{selectedRecord.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => showToast('Printing...')}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <PrinterIcon className="w-4 h-4" />
                {t('printReceipt')}
              </button>
              <button
                onClick={() => showToast('Downloading...')}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                {t('downloadInvoice')}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// Import ChartIcon for the overview tab
import { ChartIcon } from '@/components/icons/Icons';

