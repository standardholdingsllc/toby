import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import {
  ChevronLeftIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
  EmailIcon,
} from '@/components/icons/Icons';

const AddUserForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'receptionist' as 'admin' | 'veterinarian' | 'receptionist',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t('required');
    if (!formData.email.trim()) newErrors.email = t('required');
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
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
          placeholder="Full Name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('email')} *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input-field"
          placeholder="email@toby.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {t('role')}
        </label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
          className="input-field"
        >
          <option value="receptionist">{t('receptionist')}</option>
          <option value="veterinarian">{t('veterinarian')}</option>
          <option value="admin">{t('admin')}</option>
        </select>
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

export default function TeamPage() {
  const router = useRouter();
  const { t, users, currentUser, addUser, removeUser, showToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAddUser = (data: any) => {
    addUser(data);
    setShowAddModal(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser.id) {
      showToast("You can't remove yourself", 'error');
      return;
    }
    removeUser(userId);
    setShowDeleteConfirm(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'veterinarian':
        return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400';
      case 'receptionist':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
              {t('teamManagement')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {users.length} team members
            </p>
          </div>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          {t('addUser')}
        </button>
      </div>

      {/* Team List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-4 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t('name')}
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t('email')}
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t('role')}
                </th>
                <th className="text-right py-4 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">
                          {user.name}
                          {user.id === currentUser.id && (
                            <span className="ml-2 text-xs text-primary-500">{t('you')}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <EmailIcon className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {t(user.role as 'admin' | 'veterinarian' | 'receptionist')}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {user.id !== currentUser.id ? (
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                        title={t('delete')}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="card text-center">
          <p className="text-3xl font-display font-bold text-purple-600 dark:text-purple-400">
            {users.filter((u) => u.role === 'admin').length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('admin')}s
          </p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-display font-bold text-primary-600 dark:text-primary-400">
            {users.filter((u) => u.role === 'veterinarian').length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('veterinarian')}s
          </p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-display font-bold text-blue-600 dark:text-blue-400">
            {users.filter((u) => u.role === 'receptionist').length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('receptionist')}s
          </p>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('addUser')}
      >
        <AddUserForm
          onSubmit={handleAddUser}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title={t('confirm')}
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <TrashIcon className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            {t('confirmRemoveUser')}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="btn-secondary"
            >
              {t('cancel')}
            </button>
            <button
              onClick={() => showDeleteConfirm && handleDeleteUser(showDeleteConfirm)}
              className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
            >
              {t('delete')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

