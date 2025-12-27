import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import ChatWindow from '@/components/ChatWindow';
import {
  ChevronLeftIcon,
  EditIcon,
  PhoneIcon,
  EmailIcon,
  PetIcon,
  CalendarIcon,
  WhatsAppIcon,
  PlusIcon,
  TrashIcon,
  TagIcon,
} from '@/components/icons/Icons';
import { format } from 'date-fns';
import { CustomProperty } from '@/data/mockData';

const EditClientForm: React.FC<{
  client: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ client, onSubmit, onCancel }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: client.name,
    phone: client.phone,
    email: client.email,
    address: client.address,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t('required');
    if (!formData.phone.trim()) newErrors.phone = t('required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
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
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('address')}
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="input-field min-h-[80px]"
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

const AddPetForm: React.FC<{
  clientId: string;
  clientName: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ clientId, clientName, onSubmit, onCancel }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: 1,
    allergies: 'None',
    vaccinations: 'Up to date',
    notes: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t('required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        ownerId: clientId,
        ownerName: clientName,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('petName')} *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-field"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t('species')}
          </label>
          <select
            value={formData.species}
            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
            className="input-field"
          >
            <option value="Dog">{t('dog')}</option>
            <option value="Cat">{t('cat')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t('age')}
          </label>
          <input
            type="number"
            min="0"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('breed')}
        </label>
        <input
          type="text"
          value={formData.breed}
          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('allergies')}
        </label>
        <input
          type="text"
          value={formData.allergies}
          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('notes')}
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="input-field min-h-[80px]"
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

export default function ClientDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t, clients, pets, appointments, updateClient, addPet, messages, addMessage, showToast, addClientCustomProperty, removeClientCustomProperty, getAllPropertyNames } = useApp();
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callStatus, setCallStatus] = useState<'calling' | 'ended'>('calling');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showPropertySuggestions, setShowPropertySuggestions] = useState(false);
  const [newProperty, setNewProperty] = useState<Omit<CustomProperty, 'id'>>({
    name: '',
    value: '',
    type: 'text',
  });

  // Get existing property names for suggestions
  const existingPropertyNames = useMemo(() => getAllPropertyNames(), [getAllPropertyNames]);
  
  // Filter suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!newProperty.name) return existingPropertyNames.slice(0, 5);
    return existingPropertyNames.filter(p => 
      p.name.toLowerCase().includes(newProperty.name.toLowerCase())
    ).slice(0, 5);
  }, [newProperty.name, existingPropertyNames]);

  const client = clients.find((c) => c.id === id);
  const clientPets = pets.filter((p) => p.ownerId === id);
  const clientAppointments = appointments
    .filter((a) => a.ownerId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const clientMessages = messages[id as string] || [];

  const handleEditClient = (data: any) => {
    updateClient(id as string, data);
    setShowEditModal(false);
  };

  const handleAddPet = (data: any) => {
    addPet(data);
    setShowAddPetModal(false);
  };

  const handleSendMessage = (text: string) => {
    addMessage(id as string, { sender: 'clinic', text });
    showToast(t('messageSent'));
  };

  const handleCall = () => {
    setCallStatus('calling');
    setShowCallModal(true);
    setTimeout(() => {
      setCallStatus('ended');
      setTimeout(() => {
        setShowCallModal(false);
        showToast(t('callEnded'));
      }, 1500);
    }, 3000);
  };

  const handleAddProperty = () => {
    if (newProperty.name && newProperty.value) {
      addClientCustomProperty(id as string, newProperty);
      setNewProperty({ name: '', value: '', type: 'text' });
      setShowAddPropertyModal(false);
    }
  };

  if (!client) {
    return (
      <div className="animate-fade-in text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">{t('loading')}</p>
      </div>
    );
  }

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
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
            {client.name}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {t('memberSince')}: {format(new Date(client.createdAt), 'MMM yyyy')}
          </p>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="btn-secondary flex items-center gap-2"
        >
          <EditIcon className="w-4 h-4" />
          {t('edit')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Info & Pets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t('clientDetails')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('phone')}</p>
                  <p className="font-medium text-slate-800 dark:text-white">{client.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <EmailIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('email')}</p>
                  <p className="font-medium text-slate-800 dark:text-white">{client.email || '-'}</p>
                </div>
              </div>
            </div>
            {client.address && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('address')}</p>
                <p className="font-medium text-slate-800 dark:text-white mt-1">{client.address}</p>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
              <button
                onClick={handleCall}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors font-medium"
              >
                <PhoneIcon className="w-4 h-4" />
                {t('callClient')}
              </button>
              <Link
                href="/calendar"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50 transition-colors font-medium"
              >
                <CalendarIcon className="w-4 h-4" />
                {t('scheduleAppointment')}
              </Link>
            </div>
          </div>

          {/* Pets */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {t('pets')} ({clientPets.length})
              </h2>
              <button
                onClick={() => setShowAddPetModal(true)}
                className="btn-primary text-sm flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                {t('addPet')}
              </button>
            </div>
            
            {clientPets.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                {t('noResults')}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientPets.map((pet) => (
                  <Link
                    key={pet.id}
                    href={`/pets/${pet.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      pet.species === 'Dog'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      <PetIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{pet.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {pet.breed} · {pet.age} {t('yearsOld')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Custom Properties Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <TagIcon className="w-5 h-5 text-primary-500" />
                {t('customProperties')}
              </h2>
              <button
                onClick={() => setShowAddPropertyModal(true)}
                className="btn-secondary text-sm flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                {t('addProperty')}
              </button>
            </div>
            
            {(!client.customProperties || client.customProperties.length === 0) ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                {t('noCustomProperties')}
              </p>
            ) : (
              <div className="space-y-3">
                {client.customProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  >
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{prop.name}</p>
                      <p className="font-medium text-slate-800 dark:text-white">{prop.value}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300">
                        {t(`${prop.type}Type` as any) || prop.type}
                      </span>
                      <button
                        onClick={() => removeClientCustomProperty(id as string, prop.id)}
                        className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Appointments */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t('appointmentsCalendar')}
            </h2>
            {clientAppointments.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                {t('noAppointments')}
              </p>
            ) : (
              <div className="space-y-3">
                {clientAppointments.slice(0, 5).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">
                          {apt.petName} - {apt.type}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {format(new Date(apt.date), 'MMM d, yyyy')} at {apt.time}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : apt.status === 'completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {t(apt.status as 'scheduled' | 'completed' | 'cancelled')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Communications */}
        <div className="space-y-6">
          <div className="card h-[500px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <WhatsAppIcon className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {t('whatsappChat')}
              </h2>
            </div>
            <ChatWindow
              messages={clientMessages}
              onSend={handleSendMessage}
            />
          </div>
        </div>
      </div>

      {/* Edit Client Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={t('editClient')}
      >
        <EditClientForm
          client={client}
          onSubmit={handleEditClient}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Add Pet Modal */}
      <Modal
        isOpen={showAddPetModal}
        onClose={() => setShowAddPetModal(false)}
        title={t('addPet')}
      >
        <AddPetForm
          clientId={client.id}
          clientName={client.name}
          onSubmit={handleAddPet}
          onCancel={() => setShowAddPetModal(false)}
        />
      </Modal>

      {/* Call Modal */}
      <Modal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        title={t('callClient')}
        size="sm"
      >
        <div className="text-center py-8">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            callStatus === 'calling'
              ? 'bg-green-100 dark:bg-green-900/30 animate-pulse-soft'
              : 'bg-slate-100 dark:bg-slate-700'
          }`}>
            <PhoneIcon className={`w-10 h-10 ${
              callStatus === 'calling'
                ? 'text-green-600 dark:text-green-400'
                : 'text-slate-500'
            }`} />
          </div>
          <p className="text-lg font-medium text-slate-800 dark:text-white">
            {callStatus === 'calling' ? `${t('calling')} ${client.name}...` : t('callEnded')}
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{client.phone}</p>
        </div>
      </Modal>

      {/* Add Custom Property Modal */}
      <Modal
        isOpen={showAddPropertyModal}
        onClose={() => {
          setShowAddPropertyModal(false);
          setShowPropertySuggestions(false);
          setNewProperty({ name: '', value: '', type: 'text' });
        }}
        title={t('addProperty')}
        size="sm"
      >
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('propertyName')} *
            </label>
            <input
              type="text"
              value={newProperty.name}
              onChange={(e) => setNewProperty(prev => ({ ...prev, name: e.target.value }))}
              onFocus={() => setShowPropertySuggestions(true)}
              onBlur={() => setTimeout(() => setShowPropertySuggestions(false), 200)}
              className="input-field"
              placeholder="e.g., Company Name, Referral Source..."
            />
            {/* Property suggestions dropdown */}
            {showPropertySuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto">
                <div className="p-2 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  {t('existingProperties')}
                </div>
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.name}
                    type="button"
                    onClick={() => {
                      setNewProperty(prev => ({ 
                        ...prev, 
                        name: suggestion.name,
                        type: suggestion.type 
                      }));
                      setShowPropertySuggestions(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span className="text-slate-800 dark:text-white">{suggestion.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {suggestion.count} {t('uses')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('propertyType')}
            </label>
            <select
              value={newProperty.type}
              onChange={(e) => setNewProperty(prev => ({ ...prev, type: e.target.value as any }))}
              className="input-field"
            >
              <option value="text">{t('textType')}</option>
              <option value="number">{t('numberType')}</option>
              <option value="date">{t('dateType')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('propertyValue')} *
            </label>
            {newProperty.type === 'date' ? (
              <input
                type="date"
                value={newProperty.value}
                onChange={(e) => setNewProperty(prev => ({ ...prev, value: e.target.value }))}
                className="input-field"
              />
            ) : newProperty.type === 'number' ? (
              <input
                type="number"
                value={newProperty.value}
                onChange={(e) => setNewProperty(prev => ({ ...prev, value: e.target.value }))}
                className="input-field"
              />
            ) : (
              <input
                type="text"
                value={newProperty.value}
                onChange={(e) => setNewProperty(prev => ({ ...prev, value: e.target.value }))}
                className="input-field"
                placeholder="Enter value..."
              />
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                setShowAddPropertyModal(false);
                setNewProperty({ name: '', value: '', type: 'text' });
              }}
              className="btn-secondary"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleAddProperty}
              disabled={!newProperty.name || !newProperty.value}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('save')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

