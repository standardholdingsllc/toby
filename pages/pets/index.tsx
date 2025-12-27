import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  SearchIcon,
  EyeIcon,
  PetIcon,
  UserIcon,
} from '@/components/icons/Icons';

export default function PetsPage() {
  const { t, pets } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');

  const filteredPets = useMemo(() => {
    let result = pets;
    
    if (speciesFilter !== 'all') {
      result = result.filter((pet) => pet.species === speciesFilter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(query) ||
          pet.breed.toLowerCase().includes(query) ||
          pet.ownerName.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [pets, searchQuery, speciesFilter]);

  const speciesCounts = useMemo(() => ({
    all: pets.length,
    Dog: pets.filter((p) => p.species === 'Dog').length,
    Cat: pets.filter((p) => p.species === 'Cat').length,
  }), [pets]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
          {t('petsList')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {pets.length} {t('pets').toLowerCase()}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
            placeholder={t('searchPets')}
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'Dog', 'Cat'] as const).map((species) => (
            <button
              key={species}
              onClick={() => setSpeciesFilter(species)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                speciesFilter === species
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
            >
              {species === 'all' ? 'All' : t(species.toLowerCase() as 'dog' | 'cat')} ({speciesCounts[species]})
            </button>
          ))}
        </div>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-stagger">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="card hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                pet.species === 'Dog'
                  ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                  : 'bg-gradient-to-br from-purple-400 to-purple-600'
              }`}>
                <PetIcon className="w-7 h-7 text-white" />
              </div>
              <Link
                href={`/pets/${pet.id}`}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
              >
                <EyeIcon className="w-5 h-5 text-slate-500" />
              </Link>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
              {pet.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {pet.breed} · {pet.age} {t('yearsOld')}
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <UserIcon className="w-4 h-4" />
              <Link
                href={`/clients/${pet.ownerId}`}
                className="hover:text-primary-500 transition-colors"
              >
                {pet.ownerName}
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">{t('vaccinations')}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  pet.vaccinations === 'Up to date'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {pet.vaccinations}
                </span>
              </div>
            </div>

            <Link
              href={`/pets/${pet.id}`}
              className="mt-4 block text-center py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {t('viewDetails')}
            </Link>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}

