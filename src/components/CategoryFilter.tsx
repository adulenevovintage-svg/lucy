import React from 'react';
import { useApp } from '../context/AppContext';
import { CropCategory } from '../types';
import {
  Search,
  Filter,
  Check,
  Sparkles,
  Carrot,
  Apple,
  Egg,
  Wheat,
  Flower2,
  Package,
} from 'lucide-react';

const CATEGORIES: { label: CropCategory; icon: React.ReactNode }[] = [
  { label: 'All', icon: <Sparkles className="w-4 h-4" /> },
  { label: 'Fresh Vegetables', icon: <Carrot className="w-4 h-4" /> },
  { label: 'Orchard Fruits', icon: <Apple className="w-4 h-4" /> },
  { label: 'Farm Dairy & Eggs', icon: <Egg className="w-4 h-4" /> },
  { label: 'Grains & Pulses', icon: <Wheat className="w-4 h-4" /> },
  { label: 'Fresh Herbs', icon: <Flower2 className="w-4 h-4" /> },
  { label: 'Tubers & Roots', icon: <Carrot className="w-4 h-4" /> },
  { label: 'Pantry Harvest', icon: <Package className="w-4 h-4" /> },
];

export const CategoryFilter: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filterOrganic,
    setFilterOrganic,
    filterHarvestToday,
    setFilterHarvestToday,
  } = useApp();

  return (
    <div className="sticky top-[72px] sm:top-[76px] z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-sm p-3.5 sm:p-4 space-y-3 transition-all duration-300">
      {/* Top Search & Toggle Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crops, vegetables, eggs, or farmer name..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Harvested Today Toggle */}
          <button
            onClick={() => setFilterHarvestToday(!filterHarvestToday)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              filterHarvestToday
                ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                filterHarvestToday ? 'bg-stone-950 text-amber-300' : 'border border-stone-300'
              }`}
            >
              {filterHarvestToday && <Check className="w-2.5 h-2.5" />}
            </span>
            <span>Harvested Today Only</span>
          </button>

          {/* Organic Only Toggle */}
          <button
            onClick={() => setFilterOrganic(!filterOrganic)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              filterOrganic
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                filterOrganic ? 'bg-emerald-900 text-emerald-300' : 'border border-stone-300'
              }`}
            >
              {filterOrganic && <Check className="w-2.5 h-2.5" />}
            </span>
            <span>100% Certified Organic</span>
          </button>
        </div>
      </div>

      {/* Category Horizontal Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 hover:text-stone-900'
              }`}
            >
              <span className={isSelected ? 'text-emerald-300' : 'text-stone-500'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
