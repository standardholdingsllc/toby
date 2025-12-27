import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import {
  PlusIcon,
  SearchIcon,
  EyeIcon,
  PetIcon,
  PhoneIcon,
  EmailIcon,
} from '@/components/icons/Icons';

const ClientForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}> = ({ onSubmit, onCancel, initialData }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t('required');
    if (!formData.phone.trim()) newErrors.phone = t('required');
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        numberOfPets: initialData?.numberOfPets || 0,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('name')} *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-field"
          placeholder={t('clientName')}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('phone')} *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="input-field"
          placeholder="+1 555-0000"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
          placeholder="email@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('address')}
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="input-field min-h-[80px]"
          placeholder={t('address')}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          {t('cancel')}
        </button>
        <button type="submit" className="btn-primary">
          {t('save')}
        </button>
      </div>
    </form>
  );
};

export default function ClientsPage() {
  const { t, clients, pets, addClient } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.phone.includes(query)
    );
  }, [clients, searchQuery]);

  const handleAddClient = (data: any) => {
    addClient(data);
    setShowAddModal(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
            {t('clientsList')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {clients.length} {t('clients').toLowerCase()}
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          {t('addClient')}
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
            placeholder={t('searchClients')}
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
        {filteredClients.map((client) => {
          const clientPets = pets.filter((p) => p.ownerId === client.id);
          
          return (
            <div
              key={client.id}
              className="card hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                  {client.name.charAt(0)}
                </div>
                <Link
                  href={`/clients/${client.id}`}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <EyeIcon className="w-5 h-5 text-slate-500" />
                </Link>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {client.name}
              </h3>

              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                {client.email && (
                  <div className="flex items-center gap-2">
                    <EmailIcon className="w-4 h-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <PetIcon className="w-4 h-4" />
                    <span>
                      {clientPets.length} {clientPets.length === 1 ? 'pet' : 'pets'}
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {clientPets.slice(0, 3).map((pet) => (
                      <div
                        key={pet.id}
                        className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-medium ${
                          pet.species === 'Dog'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                        title={pet.name}
                      >
                        {pet.name.charAt(0)}
                      </div>
                    ))}
                    {clientPets.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
                        +{clientPets.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/clients/${client.id}`}
                className="mt-4 block text-center py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {t('viewDetails')}
              </Link>
            </div>
          );
        })}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">{t('noResults')}</p>
        </div>
      )}

      {/* Add Client Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('addClient')}
      >
        <ClientForm
          onSubmit={handleAddClient}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
}

