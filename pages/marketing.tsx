import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import {
  MegaphoneIcon,
  WhatsAppIcon,
  EmailIcon,
  SendIcon,
  ClockIcon,
  UsersIcon,
  TagIcon,
  TemplateIcon,
  WorkflowIcon,
  SegmentIcon,
  SparklesIcon,
  BoltIcon,
  PlayIcon,
  PauseIcon,
  FilterIcon,
  CopyIcon,
  ArrowTrendingUpIcon,
  EnvelopeOpenIcon,
  CursorArrowRaysIcon,
  ChartIcon,
  CalendarIcon,
  PlusIcon,
  SearchIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/icons/Icons';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, isToday } from 'date-fns';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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

type TabType = 'campaigns' | 'templates' | 'segments' | 'automations' | 'analytics' | 'calendar' | 'quickActions';

// Tab Button Component
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}> = ({ active, onClick, icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
      active
        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
    }`}
  >
    {icon}
    <span>{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
        active ? 'bg-white/20 text-white' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

// Stat Card Component
const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  color: string;
}> = ({ icon, label, value, subValue, color }) => (
  <div className="card p-4">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        {subValue && (
          <p className="text-xs text-primary-600 dark:text-primary-400 mt-0.5">{subValue}</p>
        )}
      </div>
    </div>
  </div>
);

export default function MarketingPage() {
  const { t, clients, pets, campaigns, segments, templates, workflows, addCampaign, updateWorkflow } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectAll, setSelectAll] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string>('');
  
  // Quick Action Modal State
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  const [quickActionType, setQuickActionType] = useState<string>('');
  const [confirmText, setConfirmText] = useState('');
  const [quickActionRecipients, setQuickActionRecipients] = useState(0);
  
  // Template Modal State
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  
  // Calendar State
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  // Calculate stats
  const stats = useMemo(() => {
    const emailCampaigns = campaigns.filter(c => c.channel === 'email' && c.status === 'sent');
    const totalOpened = emailCampaigns.reduce((sum, c) => sum + (c.stats?.opened || 0), 0);
    const totalDelivered = emailCampaigns.reduce((sum, c) => sum + (c.stats?.delivered || 0), 0);
    const totalClicked = emailCampaigns.reduce((sum, c) => sum + (c.stats?.clicked || 0), 0);
    const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipients, 0);
    const activeWorkflows = workflows.filter(w => w.status === 'active').length;
    
    return {
      totalCampaigns: campaigns.length,
      emailCampaigns: emailCampaigns.length,
      whatsappCampaigns: campaigns.filter(c => c.channel === 'whatsapp').length,
      avgOpenRate: totalDelivered > 0 ? Math.round((totalOpened / totalDelivered) * 100) : 0,
      avgClickRate: totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0,
      totalReach: totalRecipients,
      activeWorkflows,
    };
  }, [campaigns, workflows]);

  // Available tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    campaigns.forEach(c => c.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [campaigns]);

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    let filtered = [...campaigns];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.message.toLowerCase().includes(query) ||
        c.subject?.toLowerCase().includes(query) ||
        c.segmentName?.toLowerCase().includes(query)
      );
    }
    if (filterTag) {
      filtered = filtered.filter(c => c.tags?.includes(filterTag));
    }
    return filtered;
  }, [campaigns, searchQuery, filterTag]);

  const recipientCount = useMemo(() => {
    if (selectedSegment) {
      const segment = segments.find(s => s.id === selectedSegment);
      return segment?.clientCount || 0;
    }
    if (selectAll) return clients.length;
    return selectedClients.length;
  }, [selectAll, selectedClients, selectedSegment, clients, segments]);

  const handleClientToggle = (clientId: string) => {
    setSelectAll(false);
    setSelectedSegment('');
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(true);
    setSelectedSegment('');
    setSelectedClients([]);
  };

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegment(segmentId);
    setSelectAll(false);
    setSelectedClients([]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleUseTemplate = (template: any) => {
    setMessage(template.content);
    if (template.subject) setSubject(template.subject);
    if (template.channel !== 'both') setChannel(template.channel);
    setShowTemplateModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    if (!message.trim()) newErrors.message = t('required');
    if (channel === 'email' && !subject.trim()) newErrors.subject = t('required');
    if (!selectAll && !selectedSegment && selectedClients.length === 0) newErrors.recipients = t('required');
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSending(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const segment = selectedSegment ? segments.find(s => s.id === selectedSegment) : null;
      
      addCampaign({
        channel,
        subject: channel === 'email' ? subject : undefined,
        message,
        recipients: recipientCount,
        segmentId: selectedSegment || undefined,
        segmentName: segment?.name,
        tags: selectedTags,
        status: 'sent',
        stats: {
          delivered: channel === 'email' ? Math.floor(recipientCount * 0.98) : recipientCount,
          opened: channel === 'email' ? Math.floor(recipientCount * 0.6) : 0,
          clicked: channel === 'email' ? Math.floor(recipientCount * 0.25) : 0,
          bounced: channel === 'email' ? Math.floor(recipientCount * 0.02) : 0,
        },
      });
      
      setMessage('');
      setSubject('');
      setSelectedTags([]);
      setIsSending(false);
    }
  };

  // Quick Action handlers
  const handleQuickAction = (type: string) => {
    let recipients = 0;
    switch (type) {
      case 'appointment':
        recipients = 8; // Tomorrow's appointments
        break;
      case 'vaccination':
        recipients = segments.find(s => s.id === 'seg-2')?.clientCount || 3;
        break;
      case 'reengagement':
        recipients = segments.find(s => s.id === 'seg-3')?.clientCount || 2;
        break;
      case 'holiday':
        recipients = clients.length;
        break;
    }
    setQuickActionType(type);
    setQuickActionRecipients(recipients);
    setConfirmText('');
    setShowQuickActionModal(true);
  };

  const executeQuickAction = () => {
    const confirmWord = t('sendConfirmation');
    if (confirmText.toUpperCase() !== confirmWord) return;
    
    let campaignData: any = {
      channel: 'email',
      recipients: quickActionRecipients,
      tags: [],
      status: 'sent',
      stats: {
        delivered: Math.floor(quickActionRecipients * 0.98),
        opened: Math.floor(quickActionRecipients * 0.65),
        clicked: Math.floor(quickActionRecipients * 0.3),
        bounced: Math.floor(quickActionRecipients * 0.02),
      },
    };
    
    switch (quickActionType) {
      case 'appointment':
        campaignData.subject = 'Reminder: Your Appointment Tomorrow';
        campaignData.message = 'Hi {{client_name}}, this is a reminder that {{pet_name}} has an appointment tomorrow. Please arrive 10 minutes early!';
        campaignData.tags = ['reminder', 'appointment'];
        break;
      case 'vaccination':
        campaignData.subject = '{{pet_name}}\'s Vaccination is Due';
        campaignData.message = 'Hi {{client_name}}, {{pet_name}} is due for their vaccination. Schedule an appointment today!';
        campaignData.tags = ['reminder', 'vaccination'];
        campaignData.segmentId = 'seg-2';
        campaignData.segmentName = 'Vaccination Due';
        break;
      case 'reengagement':
        campaignData.subject = 'We Miss You!';
        campaignData.message = 'Hi {{client_name}}, it\'s been a while since we\'ve seen {{pet_name}}. Schedule a check-up today and get 10% off!';
        campaignData.tags = ['reengagement', 'promotion'];
        campaignData.segmentId = 'seg-3';
        campaignData.segmentName = 'Inactive Clients';
        break;
      case 'holiday':
        campaignData.subject = 'Happy Holidays from Toby Clinic! 🎄';
        campaignData.message = 'Wishing you and your furry friends a wonderful holiday season! Thank you for being part of the Toby family.';
        campaignData.tags = ['holiday', 'greeting'];
        break;
    }
    
    addCampaign(campaignData);
    setShowQuickActionModal(false);
    setConfirmText('');
  };

  const toggleWorkflowStatus = (workflowId: string, currentStatus: string) => {
    updateWorkflow(workflowId, {
      status: currentStatus === 'active' ? 'paused' : 'active'
    });
  };

  // Chart data for analytics
  const emailPerformanceData = {
    labels: ['Nov 1', 'Nov 8', 'Nov 15', 'Nov 22', 'Dec 1', 'Dec 8', 'Dec 15', 'Dec 22'],
    datasets: [
      {
        label: t('openRate'),
        data: [58, 62, 55, 68, 61, 72, 65, 70],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: t('clickRate'),
        data: [22, 28, 20, 32, 25, 35, 28, 33],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const channelDistributionData = {
    labels: ['Email', 'WhatsApp'],
    datasets: [{
      data: [stats.emailCampaigns, stats.whatsappCampaigns],
      backgroundColor: ['#3b82f6', '#22c55e'],
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
        ticks: { color: '#94a3b8', callback: (value: any) => `${value}%` },
      },
    },
  };

  // Calendar data
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = monthStart.getDay();
  const paddedDays = [...Array(startDay).fill(null), ...calendarDays];
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

  const getCampaignsForDay = (date: Date) => {
    return campaigns.filter(c => {
      const campaignDate = new Date(c.sentAt);
      return isSameDay(campaignDate, date);
    });
  };

  // Render different tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return renderCampaignsTab();
      case 'templates':
        return renderTemplatesTab();
      case 'segments':
        return renderSegmentsTab();
      case 'automations':
        return renderAutomationsTab();
      case 'analytics':
        return renderAnalyticsTab();
      case 'calendar':
        return renderCalendarTab();
      case 'quickActions':
        return renderQuickActionsTab();
      default:
        return null;
    }
  };

  // Campaigns Tab
  const renderCampaignsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* New Campaign Form */}
      <div className="lg:col-span-2">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <MegaphoneIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {t('newCampaign')}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Channel Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('channel')}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setChannel('email')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                    channel === 'email'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <EmailIcon className="w-5 h-5" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('whatsapp')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                    channel === 'whatsapp'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Recipients - Segments */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('recipients')}
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <input
                    type="radio"
                    checked={selectAll && !selectedSegment}
                    onChange={handleSelectAll}
                    className="w-5 h-5 text-primary-500 focus:ring-primary-400"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-slate-800 dark:text-white">
                      {t('allClients')}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                      ({clients.length})
                    </span>
                  </div>
                </label>
                
                {/* Segment options */}
                <div className="border-t border-slate-200 dark:border-slate-600 pt-2 mt-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                    <SegmentIcon className="w-3 h-3" />
                    {t('segments')}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {segments.slice(0, 6).map((segment) => (
                      <label
                        key={segment.id}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                          selectedSegment === segment.id
                            ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-400'
                            : 'bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          checked={selectedSegment === segment.id}
                          onChange={() => handleSegmentSelect(segment.id)}
                          className="sr-only"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                          {segment.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                          ({segment.clientCount})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.recipients && (
                <p className="text-red-500 text-sm mt-1">{errors.recipients}</p>
              )}
            </div>

            {/* Subject (Email only) */}
            {channel === 'email' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('subject')}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-field"
                  placeholder={t('emailSubject')}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
            )}

            {/* Message */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('message')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(true)}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  <TemplateIcon className="w-3 h-3" />
                  {t('useTemplate')}
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field min-h-[150px]"
                placeholder={t('writeMessage')}
              />
              {/* Merge tags hint */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t('mergeTags')}: {'{{client_name}}'}, {'{{pet_name}}'}, {'{{clinic_name}}'}
              </p>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('campaignTags')}
              </label>
              <div className="flex flex-wrap gap-2">
                {['reminder', 'promotion', 'greeting', 'health', 'holiday', 'birthday'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {t(tag as any) || tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <UsersIcon className="w-4 h-4" />
                <span>
                  {recipientCount} {t('recipients').toLowerCase()}
                </span>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('loading')}
                  </>
                ) : (
                  <>
                    <SendIcon className="w-5 h-5" />
                    {t('sendCampaign')}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Campaign History */}
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {t('campaignHistory')}
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0"
              >
                <option value="">{t('filterByTag')}</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          
          {filteredCampaigns.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">
              {t('noResults')}
            </p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {campaign.channel === 'email' ? (
                      <EmailIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <WhatsAppIcon className="w-4 h-4 text-green-500" />
                    )}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      campaign.channel === 'email'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {campaign.channel.toUpperCase()}
                    </span>
                    {campaign.segmentName && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        → {campaign.segmentName}
                      </span>
                    )}
                  </div>
                  
                  {campaign.subject && (
                    <p className="text-sm font-medium text-slate-800 dark:text-white mb-1">
                      {campaign.subject}
                    </p>
                  )}
                  
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-2">
                    {campaign.message}
                  </p>
                  
                  {/* Tags */}
                  {campaign.tags && campaign.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {campaign.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Stats for email */}
                  {campaign.channel === 'email' && campaign.stats && (
                    <div className="grid grid-cols-3 gap-2 mb-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-600/50">
                      <div className="text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('opened')}</p>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {campaign.stats.delivered > 0 
                            ? Math.round((campaign.stats.opened / campaign.stats.delivered) * 100) 
                            : 0}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('clicked')}</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {campaign.stats.opened > 0 
                            ? Math.round((campaign.stats.clicked / campaign.stats.opened) * 100) 
                            : 0}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('delivered')}</p>
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {campaign.stats.delivered}/{campaign.recipients}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* WhatsApp E2E notice */}
                  {campaign.channel === 'whatsapp' && (
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-600/50 mb-2">
                      <LockClosedIcon className="w-3 h-3 text-slate-400" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t('noTrackingAvailable')}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {format(new Date(campaign.sentAt), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-3 h-3" />
                      {campaign.recipients} {t('recipients').toLowerCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
            {t('overview')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">{t('totalCampaigns')}</span>
              <span className="font-semibold text-slate-800 dark:text-white">
                {stats.totalCampaigns}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">{t('emailCampaigns')}</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {stats.emailCampaigns}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">{t('whatsappCampaigns')}</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {stats.whatsappCampaigns}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">{t('avgOpenRate')}</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {stats.avgOpenRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Templates Tab
  const renderTemplatesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div key={template.id} className="card hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {template.channel === 'email' ? (
                <EmailIcon className="w-5 h-5 text-blue-500" />
              ) : template.channel === 'whatsapp' ? (
                <WhatsAppIcon className="w-5 h-5 text-green-500" />
              ) : (
                <div className="flex gap-1">
                  <EmailIcon className="w-4 h-4 text-blue-500" />
                  <WhatsAppIcon className="w-4 h-4 text-green-500" />
                </div>
              )}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                template.category === 'reminder' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                template.category === 'promotion' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                template.category === 'greeting' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' :
                template.category === 'followup' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                template.category === 'reengagement' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {t(template.category as any) || template.category}
              </span>
            </div>
            {template.isSystem && (
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {t('systemTemplate')}
              </span>
            )}
          </div>
          
          <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
            {template.name}
          </h3>
          
          {template.subject && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-medium">{t('subject')}:</span> {template.subject}
            </p>
          )}
          
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
            {template.content}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <button
            onClick={() => {
              setSelectedTemplate(template);
              handleUseTemplate(template);
              setActiveTab('campaigns');
            }}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            <CopyIcon className="w-4 h-4" />
            {t('useTemplate')}
          </button>
        </div>
      ))}
    </div>
  );

  // Segments Tab
  const renderSegmentsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {segments.map((segment) => (
        <div key={segment.id} className="card hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <SegmentIcon className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              segment.isSystem
                ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
            }`}>
              {segment.isSystem ? t('systemSegment') : t('customSegment')}
            </span>
          </div>
          
          <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
            {segment.name}
          </h3>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {segment.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-white">{segment.clientCount}</span> {t('clientsInSegment')}
              </span>
            </div>
            <button
              onClick={() => {
                handleSegmentSelect(segment.id);
                setActiveTab('campaigns');
              }}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              {t('sendCampaign')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Automations Tab
  const renderAutomationsTab = () => (
    <div className="space-y-6">
      {/* Active Automations Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<WorkflowIcon className="w-5 h-5 text-white" />}
          label={t('activeAutomations')}
          value={workflows.filter(w => w.status === 'active').length}
          color="bg-gradient-to-br from-primary-400 to-primary-600"
        />
        <StatCard
          icon={<SendIcon className="w-5 h-5 text-white" />}
          label={t('totalSent')}
          value={workflows.reduce((sum, w) => sum + w.stats.sent, 0)}
          color="bg-gradient-to-br from-blue-400 to-blue-600"
        />
        <StatCard
          icon={<EnvelopeOpenIcon className="w-5 h-5 text-white" />}
          label={t('avgOpenRate')}
          value={`${Math.round(
            workflows.reduce((sum, w) => sum + (w.stats.sent > 0 ? (w.stats.opened / w.stats.sent) * 100 : 0), 0) / workflows.length
          )}%`}
          color="bg-gradient-to-br from-purple-400 to-purple-600"
        />
      </div>

      {/* Workflow List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  workflow.status === 'active'
                    ? 'bg-gradient-to-br from-primary-400 to-primary-600'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  <WorkflowIcon className={`w-5 h-5 ${
                    workflow.status === 'active' ? 'text-white' : 'text-slate-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {workflow.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {workflow.description}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                workflow.status === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : workflow.status === 'paused'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {t(workflow.status as any)}
              </span>
            </div>
            
            {/* Trigger Info */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 mb-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                {t('workflowTrigger')}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {workflow.trigger.type === 'days_before_appointment' && `${workflow.trigger.value} ${t('daysBeforeAppointment')}`}
                {workflow.trigger.type === 'days_after_visit' && `${workflow.trigger.value} ${t('daysAfterVisit')}`}
                {workflow.trigger.type === 'pet_birthday' && t('petBirthday')}
                {workflow.trigger.type === 'vaccination_due' && `${t('vaccinationDueIn')} ${workflow.trigger.value} ${t('days')}`}
                {workflow.trigger.type === 'new_client' && t('newClientSignup')}
                {workflow.trigger.type === 'inactive_client' && `${t('inactiveFor')} ${workflow.trigger.value}+ ${t('days')}`}
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2 mb-4">
              {workflow.actions.map((action, idx) => (
                <div key={idx} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700">
                  {action.type === 'send_email' ? (
                    <EmailIcon className="w-3 h-3 text-blue-500" />
                  ) : (
                    <WhatsAppIcon className="w-3 h-3 text-green-500" />
                  )}
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    {action.type === 'send_email' ? 'Email' : 'WhatsApp'}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 mb-4">
              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('totalSent')}</p>
                <p className="text-lg font-semibold text-slate-800 dark:text-white">{workflow.stats.sent}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('opened')}</p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{workflow.stats.opened}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('clicked')}</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{workflow.stats.clicked}</p>
              </div>
            </div>
            
            {/* Toggle Button */}
            <button
              onClick={() => toggleWorkflowStatus(workflow.id, workflow.status)}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl font-medium transition-all ${
                workflow.status === 'active'
                  ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400'
              }`}
            >
              {workflow.status === 'active' ? (
                <>
                  <PauseIcon className="w-4 h-4" />
                  {t('pauseWorkflow')}
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4" />
                  {t('activateWorkflow')}
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Analytics Tab
  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<SendIcon className="w-5 h-5 text-white" />}
          label={t('totalReach')}
          value={stats.totalReach}
          color="bg-gradient-to-br from-slate-400 to-slate-600"
        />
        <StatCard
          icon={<EnvelopeOpenIcon className="w-5 h-5 text-white" />}
          label={t('avgOpenRate')}
          value={`${stats.avgOpenRate}%`}
          subValue="Email only"
          color="bg-gradient-to-br from-blue-400 to-blue-600"
        />
        <StatCard
          icon={<CursorArrowRaysIcon className="w-5 h-5 text-white" />}
          label={t('avgClickRate')}
          value={`${stats.avgClickRate}%`}
          subValue="Email only"
          color="bg-gradient-to-br from-green-400 to-green-600"
        />
        <StatCard
          icon={<WorkflowIcon className="w-5 h-5 text-white" />}
          label={t('activeAutomations')}
          value={stats.activeWorkflows}
          color="bg-gradient-to-br from-purple-400 to-purple-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Over Time */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {t('emailPerformance')}
          </h3>
          <div className="h-[300px]">
            <Line data={emailPerformanceData} options={chartOptions} />
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {t('channel')} Distribution
          </h3>
          <div className="h-[250px]">
            <Doughnut
              data={channelDistributionData}
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

      {/* WhatsApp Notice */}
      <div className="card bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
            <LockClosedIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">
              {t('whatsappDelivery')}
            </h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              {t('noTrackingAvailable')}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Campaign Performance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          {t('recentCampaigns')} - {t('emailPerformance')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('campaigns')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('recipients')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('delivered')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('openRate')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">{t('clickRate')}</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.filter(c => c.channel === 'email').slice(0, 5).map((campaign) => (
                <tr key={campaign.id} className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-800 dark:text-white truncate max-w-[200px]">
                      {campaign.subject || campaign.message.substring(0, 40)}...
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {format(new Date(campaign.sentAt), 'MMM d, yyyy')}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-slate-600 dark:text-slate-300">
                    {campaign.recipients}
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-slate-600 dark:text-slate-300">
                    {campaign.stats?.delivered || 0}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {campaign.stats && campaign.stats.delivered > 0
                        ? Math.round((campaign.stats.opened / campaign.stats.delivered) * 100)
                        : 0}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {campaign.stats && campaign.stats.opened > 0
                        ? Math.round((campaign.stats.clicked / campaign.stats.opened) * 100)
                        : 0}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Calendar Tab
  const renderCalendarTab = () => (
    <div className="card">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <h2 className="text-xl font-display font-semibold text-slate-800 dark:text-white">
          {format(calendarMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 py-2"
          >
            {t(day)}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {paddedDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="min-h-[100px]" />;
          }

          const dayCampaigns = getCampaignsForDay(day);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[100px] p-2 rounded-xl border-2 transition-all ${
                isCurrentDay
                  ? 'border-primary-400 bg-primary-50/50 dark:bg-primary-900/20'
                  : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isCurrentDay ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {format(day, 'd')}
                {isCurrentDay && (
                  <span className="ml-1 text-xs text-primary-500">({t('today')})</span>
                )}
              </div>
              <div className="space-y-1">
                {dayCampaigns.slice(0, 2).map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`text-xs p-1.5 rounded-lg text-white truncate ${
                      campaign.channel === 'email' ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    title={campaign.subject || campaign.message}
                  >
                    {campaign.channel === 'email' ? '📧' : '💬'} {campaign.recipients} sent
                  </div>
                ))}
                {dayCampaigns.length > 2 && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 pl-1">
                    +{dayCampaigns.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Email</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">WhatsApp</span>
        </div>
      </div>
    </div>
  );

  // Quick Actions Tab
  const renderQuickActionsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Appointment Reminders */}
      <div className="card hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => handleQuickAction('appointment')}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
              {t('sendAppointmentReminders')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Send reminders to all clients with appointments tomorrow
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <UsersIcon className="w-4 h-4" />
              <span>~8 {t('recipients').toLowerCase()}</span>
            </div>
          </div>
          <BoltIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>

      {/* Vaccination Reminders */}
      <div className="card hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => handleQuickAction('vaccination')}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
              {t('sendVaccinationReminders')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Remind clients whose pets have vaccinations due
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
              <UsersIcon className="w-4 h-4" />
              <span>~{segments.find(s => s.id === 'seg-2')?.clientCount || 3} {t('recipients').toLowerCase()}</span>
            </div>
          </div>
          <BoltIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>

      {/* Re-engagement */}
      <div className="card hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => handleQuickAction('reengagement')}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
              {t('sendReengagement')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Reach out to clients inactive for 90+ days
            </p>
            <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
              <UsersIcon className="w-4 h-4" />
              <span>~{segments.find(s => s.id === 'seg-3')?.clientCount || 2} {t('recipients').toLowerCase()}</span>
            </div>
          </div>
          <BoltIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>

      {/* Holiday Greeting */}
      <div className="card hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => handleQuickAction('holiday')}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-2xl">🎄</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
              {t('sendHolidayGreeting')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Send holiday greetings to all clients
            </p>
            <div className="flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400">
              <UsersIcon className="w-4 h-4" />
              <span>{clients.length} {t('recipients').toLowerCase()}</span>
            </div>
          </div>
          <BoltIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
          {t('marketingCampaigns')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {t('sendMessage')} {t('to').toLowerCase()} {clients.length} {t('clients').toLowerCase()}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <TabButton
          active={activeTab === 'campaigns'}
          onClick={() => setActiveTab('campaigns')}
          icon={<MegaphoneIcon className="w-4 h-4" />}
          label={t('campaigns')}
          badge={campaigns.length}
        />
        <TabButton
          active={activeTab === 'templates'}
          onClick={() => setActiveTab('templates')}
          icon={<TemplateIcon className="w-4 h-4" />}
          label={t('templates')}
          badge={templates.length}
        />
        <TabButton
          active={activeTab === 'segments'}
          onClick={() => setActiveTab('segments')}
          icon={<SegmentIcon className="w-4 h-4" />}
          label={t('segments')}
          badge={segments.length}
        />
        <TabButton
          active={activeTab === 'automations'}
          onClick={() => setActiveTab('automations')}
          icon={<WorkflowIcon className="w-4 h-4" />}
          label={t('automations')}
          badge={workflows.filter(w => w.status === 'active').length}
        />
        <TabButton
          active={activeTab === 'analytics'}
          onClick={() => setActiveTab('analytics')}
          icon={<ChartIcon className="w-4 h-4" />}
          label={t('analytics')}
        />
        <TabButton
          active={activeTab === 'calendar'}
          onClick={() => setActiveTab('calendar')}
          icon={<CalendarIcon className="w-4 h-4" />}
          label={t('marketingCalendar')}
        />
        <TabButton
          active={activeTab === 'quickActions'}
          onClick={() => setActiveTab('quickActions')}
          icon={<BoltIcon className="w-4 h-4" />}
          label={t('quickActions')}
        />
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Template Selection Modal */}
      <Modal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        title={t('templates')}
        size="lg"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              onClick={() => handleUseTemplate(template)}
            >
              <div className="flex items-center gap-2 mb-2">
                {template.channel === 'email' ? (
                  <EmailIcon className="w-4 h-4 text-blue-500" />
                ) : template.channel === 'whatsapp' ? (
                  <WhatsAppIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <>
                    <EmailIcon className="w-4 h-4 text-blue-500" />
                    <WhatsAppIcon className="w-4 h-4 text-green-500" />
                  </>
                )}
                <span className="font-medium text-slate-800 dark:text-white">
                  {template.name}
                </span>
              </div>
              {template.subject && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {t('subject')}: {template.subject}
                </p>
              )}
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                {template.content}
              </p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Quick Action Confirmation Modal */}
      <Modal
        isOpen={showQuickActionModal}
        onClose={() => setShowQuickActionModal(false)}
        title={t('confirmSendTitle')}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  {t('confirmSendMessage')} <strong>{quickActionRecipients}</strong> {t('recipients').toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('typeToConfirm')}
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="input-field"
              placeholder={t('sendConfirmation')}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowQuickActionModal(false)}
              className="btn-secondary"
            >
              {t('cancel')}
            </button>
            <button
              onClick={executeQuickAction}
              disabled={confirmText.toUpperCase() !== t('sendConfirmation')}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendIcon className="w-4 h-4" />
              {t('sendCampaign')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
