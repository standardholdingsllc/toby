import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  MegaphoneIcon,
  WhatsAppIcon,
  EmailIcon,
  SendIcon,
  ClockIcon,
  UsersIcon,
} from '@/components/icons/Icons';
import { format } from 'date-fns';

export default function MarketingPage() {
  const { t, clients, campaigns, addCampaign } = useApp();
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [message, setMessage] = useState('');
  const [selectAll, setSelectAll] = useState(true);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSending, setIsSending] = useState(false);

  const handleClientToggle = (clientId: string) => {
    setSelectAll(false);
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(true);
    setSelectedClients([]);
  };

  const recipientCount = selectAll ? clients.length : selectedClients.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    if (!message.trim()) newErrors.message = t('required');
    if (!selectAll && selectedClients.length === 0) newErrors.recipients = t('required');
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSending(true);
      
      // Simulate sending delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      addCampaign({
        channel,
        message,
        recipients: recipientCount,
      });
      
      setMessage('');
      setIsSending(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
          {t('marketingCampaigns')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {t('sendMessage')} {t('to').toLowerCase()} {clients.length} {t('clients').toLowerCase()}
        </p>
      </div>

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

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('recipients')}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-5 h-5 rounded-lg text-primary-500 focus:ring-primary-400"
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
                  
                  {!selectAll && (
                    <div className="max-h-40 overflow-y-auto space-y-1 p-2 rounded-xl border-2 border-slate-200 dark:border-slate-600">
                      {clients.map((client) => (
                        <label
                          key={client.id}
                          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedClients.includes(client.id)}
                            onChange={() => handleClientToggle(client.id)}
                            className="w-4 h-4 rounded text-primary-500 focus:ring-primary-400"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {client.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {errors.recipients && (
                  <p className="text-red-500 text-sm mt-1">{errors.recipients}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('message')}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field min-h-[150px]"
                  placeholder={t('writeMessage')}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
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
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t('campaignHistory')}
            </h2>
            
            {campaigns.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                {t('noResults')}
              </p>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
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
                    </div>
                    
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-3">
                      {campaign.message}
                    </p>
                    
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
                <span className="text-slate-600 dark:text-slate-300">Total Campaigns</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {campaigns.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Email Campaigns</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {campaigns.filter((c) => c.channel === 'email').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">WhatsApp Campaigns</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {campaigns.filter((c) => c.channel === 'whatsapp').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

