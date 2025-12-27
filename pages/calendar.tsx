import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ClockIcon,
} from '@/components/icons/Icons';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';

const appointmentTypes = ['checkup', 'vaccination', 'surgery', 'grooming', 'emergency', 'other'] as const;

const AppointmentForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  clients: any[];
  pets: any[];
}> = ({ onSubmit, onCancel, initialData, clients, pets }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    date: initialData?.date || format(new Date(), 'yyyy-MM-dd'),
    time: initialData?.time || '09:00',
    ownerId: initialData?.ownerId || '',
    petId: initialData?.petId || '',
    type: initialData?.type || 'checkup',
    notes: initialData?.notes || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const selectedClient = clients.find(c => c.id === formData.ownerId);
  const clientPets = pets.filter(p => p.ownerId === formData.ownerId);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.date) newErrors.date = t('required');
    if (!formData.time) newErrors.time = t('required');
    if (!formData.ownerId) newErrors.ownerId = t('required');
    if (!formData.petId) newErrors.petId = t('required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const pet = pets.find(p => p.id === formData.petId);
      const client = clients.find(c => c.id === formData.ownerId);
      onSubmit({
        ...formData,
        petName: pet?.name || '',
        ownerName: client?.name || '',
        status: 'scheduled',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t('date')} *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="input-field"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t('time')} *
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="input-field"
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('owner')} *
        </label>
        <select
          value={formData.ownerId}
          onChange={(e) => setFormData({ ...formData, ownerId: e.target.value, petId: '' })}
          className="input-field"
        >
          <option value="">-- {t('selectClients')} --</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {errors.ownerId && <p className="text-red-500 text-sm mt-1">{errors.ownerId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('petName')} *
        </label>
        <select
          value={formData.petId}
          onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
          className="input-field"
          disabled={!formData.ownerId}
        >
          <option value="">-- {t('searchPets')} --</option>
          {clientPets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name} ({pet.species})
            </option>
          ))}
        </select>
        {errors.petId && <p className="text-red-500 text-sm mt-1">{errors.petId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('appointmentType')}
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="input-field"
        >
          {appointmentTypes.map((type) => (
            <option key={type} value={type}>
              {t(type)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('notes')}
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="input-field min-h-[100px]"
          placeholder={t('notes')}
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

export default function CalendarPage() {
  const { t, appointments, clients, pets, addAppointment, updateAppointment } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad the beginning of the month
  const startDay = monthStart.getDay();
  const paddedDays = [...Array(startDay).fill(null), ...days];

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(
      (apt) => apt.date === format(date, 'yyyy-MM-dd') && apt.status !== 'cancelled'
    );
  };

  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const dayAppointments = getAppointmentsForDay(date);
    if (dayAppointments.length === 1) {
      setSelectedAppointment(dayAppointments[0]);
      setShowDetailsModal(true);
    } else if (dayAppointments.length > 1) {
      // Show list of appointments for the day - for simplicity, show the first one
      setSelectedAppointment(dayAppointments[0]);
      setShowDetailsModal(true);
    }
  };

  const handleAddAppointment = (data: any) => {
    addAppointment(data);
    setShowAddModal(false);
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, { status: 'cancelled' });
      setShowDetailsModal(false);
      setSelectedAppointment(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Check-up':
      case 'checkup':
        return 'bg-primary-500';
      case 'Vaccination':
      case 'vaccination':
        return 'bg-blue-500';
      case 'Surgery':
      case 'surgery':
        return 'bg-amber-500';
      case 'Grooming':
      case 'grooming':
        return 'bg-purple-500';
      case 'Emergency':
      case 'emergency':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
            {t('appointmentsCalendar')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {format(currentMonth, 'MMMM yyyy')}
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          {t('addAppointment')}
        </button>
      </div>

      {/* Calendar */}
      <div className="card">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <h2 className="text-xl font-display font-semibold text-slate-800 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={handleNextMonth}
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

            const dayAppointments = getAppointmentsForDay(day);
            const isCurrentDay = isToday(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <div
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                className={`
                  min-h-[100px] p-2 rounded-xl border-2 cursor-pointer transition-all
                  ${isCurrentDay ? 'border-primary-400 bg-primary-50/50 dark:bg-primary-900/20' : 'border-transparent'}
                  ${isSelected ? 'ring-2 ring-primary-400' : ''}
                  hover:bg-slate-50 dark:hover:bg-slate-700/50
                `}
              >
                <div
                  className={`
                    text-sm font-medium mb-1
                    ${isCurrentDay ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'}
                  `}
                >
                  {format(day, 'd')}
                  {isCurrentDay && (
                    <span className="ml-1 text-xs text-primary-500">({t('today')})</span>
                  )}
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 3).map((apt) => (
                    <div
                      key={apt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAppointment(apt);
                        setShowDetailsModal(true);
                      }}
                      className={`
                        text-xs p-1.5 rounded-lg text-white truncate
                        ${getTypeColor(apt.type)}
                        hover:opacity-80 transition-opacity
                      `}
                    >
                      {apt.time} - {apt.petName}
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 pl-1">
                      +{dayAppointments.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          {appointmentTypes.slice(0, 5).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getTypeColor(type)}`} />
              <span className="text-sm text-slate-600 dark:text-slate-400">{t(type)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Appointment Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('addAppointment')}
        size="lg"
      >
        <AppointmentForm
          onSubmit={handleAddAppointment}
          onCancel={() => setShowAddModal(false)}
          clients={clients}
          pets={pets}
          initialData={selectedDate ? { date: format(selectedDate, 'yyyy-MM-dd') } : undefined}
        />
      </Modal>

      {/* Appointment Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAppointment(null);
        }}
        title={t('appointmentDetails')}
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${getTypeColor(selectedAppointment.type)}`} />
              <span className="font-medium text-slate-800 dark:text-white capitalize">
                {t(selectedAppointment.type.toLowerCase() as any) || selectedAppointment.type}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                {t(selectedAppointment.status as 'scheduled' | 'completed' | 'cancelled')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('date')}</p>
                <p className="font-medium text-slate-800 dark:text-white">
                  {format(new Date(selectedAppointment.date), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('time')}</p>
                <p className="font-medium text-slate-800 dark:text-white flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  {selectedAppointment.time}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('petName')}</p>
              <p className="font-medium text-slate-800 dark:text-white">
                {selectedAppointment.petName}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('owner')}</p>
              <p className="font-medium text-slate-800 dark:text-white">
                {selectedAppointment.ownerName}
              </p>
            </div>

            {selectedAppointment.notes && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('notes')}</p>
                <p className="text-slate-700 dark:text-slate-300">
                  {selectedAppointment.notes}
                </p>
              </div>
            )}

            {selectedAppointment.status === 'scheduled' && (
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleCancelAppointment}
                  className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors font-medium"
                >
                  {t('cancel')} {t('appointmentsCalendar').split(' ')[0]}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

