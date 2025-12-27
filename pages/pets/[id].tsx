import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import {
  ChevronLeftIcon,
  EditIcon,
  PetIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  EmailIcon,
  RoseIcon,
  PlusIcon,
  TrashIcon,
  TagIcon,
} from '@/components/icons/Icons';
import { format } from 'date-fns';
import { CustomProperty } from '@/data/mockData';

const EditPetForm: React.FC<{
  pet: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ pet, onSubmit, onCancel }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    allergies: pet.allergies,
    vaccinations: pet.vaccinations,
    notes: pet.notes,
    passedAway: pet.passedAway || false,
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
      onSubmit(formData);
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
          {t('vaccinations')}
        </label>
        <select
          value={formData.vaccinations}
          onChange={(e) => setFormData({ ...formData, vaccinations: e.target.value })}
          className="input-field"
        >
          <option value="Up to date">Up to date</option>
          <option value="Needs update">Needs update</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="passedAway"
          checked={formData.passedAway}
          onChange={(e) => setFormData({ ...formData, passedAway: e.target.checked })}
          className="w-4 h-4 text-primary-600 bg-slate-100 border-slate-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
        />
        <label htmlFor="passedAway" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          This pet has passed away
        </label>
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

export default function PetDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t, pets, clients, appointments, medicalRecords, updatePet, addPetCustomProperty, updatePetCustomProperty, removePetCustomProperty, getAllPropertyNames } = useApp();
  
  const [showEditModal, setShowEditModal] = useState(false);
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

  const pet = pets.find((p) => p.id === id);
  const owner = pet ? clients.find((c) => c.id === pet.ownerId) : null;
  const petAppointments = appointments
    .filter((a) => a.petId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const petMedicalRecords = medicalRecords
    .filter((r) => r.petId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEditPet = (data: any) => {
    updatePet(id as string, data);
    setShowEditModal(false);
  };

  const handleAddProperty = () => {
    if (newProperty.name && newProperty.value) {
      addPetCustomProperty(id as string, newProperty);
      setNewProperty({ name: '', value: '', type: 'text' });
      setShowAddPropertyModal(false);
    }
  };

  if (!pet) {
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
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
          pet.passedAway
            ? 'bg-gradient-to-br from-slate-400 to-slate-600 shadow-slate-500/30'
            : pet.species === 'Dog'
            ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/30'
            : 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/30'
        }`}>
          {pet.passedAway ? (
            <RoseIcon className="w-8 h-8 text-slate-100" />
          ) : (
            <PetIcon className="w-8 h-8 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h1 className={`text-3xl font-display font-bold ${
            pet.passedAway
              ? 'text-slate-600 dark:text-slate-300'
              : 'text-slate-800 dark:text-white'
          }`}>
            {pet.name}
            {pet.passedAway && <span className="ml-2 text-rose-500">✝</span>}
          </h1>
          <p className={`mt-1 ${
            pet.passedAway
              ? 'text-slate-500 dark:text-slate-400'
              : 'text-slate-500 dark:text-slate-400'
          }`}>
            {pet.breed} · {pet.age} {t('yearsOld')}
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
        {/* Left Column - Pet Info & Medical */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pet Details */}
          <div className={`card ${
            pet.passedAway
              ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600'
              : ''
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${
              pet.passedAway
                ? 'text-slate-600 dark:text-slate-300'
                : 'text-slate-800 dark:text-white'
            }`}>
              {t('petDetails')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className={`text-sm ${
                  pet.passedAway
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {t('species')}
                </p>
                <p className={`font-medium mt-1 ${
                  pet.passedAway
                    ? 'text-slate-600 dark:text-slate-300'
                    : 'text-slate-800 dark:text-white'
                }`}>
                  {t(pet.species.toLowerCase() as 'dog' | 'cat')}
                </p>
              </div>
              <div>
                <p className={`text-sm ${
                  pet.passedAway
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {t('breed')}
                </p>
                <p className={`font-medium mt-1 ${
                  pet.passedAway
                    ? 'text-slate-600 dark:text-slate-300'
                    : 'text-slate-800 dark:text-white'
                }`}>
                  {pet.breed}
                </p>
              </div>
              <div>
                <p className={`text-sm ${
                  pet.passedAway
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {t('age')}
                </p>
                <p className={`font-medium mt-1 ${
                  pet.passedAway
                    ? 'text-slate-600 dark:text-slate-300'
                    : 'text-slate-800 dark:text-white'
                }`}>
                  {pet.age} {t('yearsOld')}
                </p>
              </div>
              <div>
                <p className={`text-sm ${
                  pet.passedAway
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {t('allergies')}
                </p>
                <p className={`font-medium mt-1 ${
                  pet.passedAway
                    ? 'text-slate-600 dark:text-slate-300'
                    : 'text-slate-800 dark:text-white'
                }`}>
                  {pet.allergies}
                </p>
              </div>
              <div>
                <p className={`text-sm ${
                  pet.passedAway
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {t('vaccinations')}
                </p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  pet.passedAway
                    ? 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                    : pet.vaccinations === 'Up to date'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {pet.vaccinations}
                </span>
              </div>
            </div>
            {pet.notes && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className={`text-sm ${
                  pet.passedAway
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {t('notes')}
                </p>
                <p className={`mt-1 ${
                  pet.passedAway
                    ? 'text-slate-600 dark:text-slate-300'
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {pet.notes}
                </p>
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
            
            {(!pet.customProperties || pet.customProperties.length === 0) ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                {t('noCustomProperties')}
              </p>
            ) : (
              <div className="space-y-3">
                {pet.customProperties.map((prop) => (
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
                        onClick={() => removePetCustomProperty(id as string, prop.id)}
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

          {/* Medical History */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t('medicalHistory')}
            </h2>
            {petMedicalRecords.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                {t('noResults')}
              </p>
            ) : (
              <div className="space-y-4">
                {petMedicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border-l-4 border-primary-500"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        {format(new Date(record.date), 'MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {record.veterinarian}
                      </p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{record.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointments */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {t('appointmentsCalendar')}
              </h2>
              <Link
                href="/calendar"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t('scheduleAppointment')}
              </Link>
            </div>
            {petAppointments.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                {t('noAppointments')}
              </p>
            ) : (
              <div className="space-y-3">
                {petAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{apt.type}</p>
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

        {/* Right Column - Owner Info */}
        <div className="space-y-6">
          {owner && (
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                {t('owner')}
              </h2>
              <Link
                href={`/clients/${owner.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                  {owner.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{owner.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('viewDetails')}</p>
                </div>
              </Link>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <PhoneIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-300">{owner.phone}</span>
                </div>
                {owner.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <EmailIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-300">{owner.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Pet Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={t('editPet')}
      >
        <EditPetForm
          pet={pet}
          onSubmit={handleEditPet}
          onCancel={() => setShowEditModal(false)}
        />
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
              placeholder="e.g., Microchip ID, Insurance Number..."
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

