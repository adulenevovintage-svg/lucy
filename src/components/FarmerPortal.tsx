import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Farmer } from '../types';
import {
  Tractor,
  ShieldCheck,
  Award,
  MapPin,
  TrendingUp,
  Plus,
  Sparkles,
  DollarSign,
  Heart,
  ChevronRight,
  Package,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const FarmerPortal: React.FC = () => {
  const {
    farmers,
    products,
    setActiveFarmerModal,
    setIsFarmerRegisterModalOpen,
    setIsAddCropModalOpen,
    setActiveTab,
    setSelectedCategory,
    orders,
  } = useApp();

  const [activeFarmerModeId, setActiveFarmerModeId] = useState<string>('f-1');
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'dashboard'>('directory');

  const selectedFarmer =
    farmers.find((f) => f.id === activeFarmerModeId) || farmers[0];

  const farmerProducts = products.filter(
    (p) => p.farmerId === selectedFarmer.id
  );

  const farmerOrders = orders.filter((o) =>
    o.items.some((item) => item.product.farmerId === selectedFarmer.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back to Website Breadcrumb Row */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={() => setActiveTab('marketplace')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-xs shadow-2xs hover:shadow-xs transition-all hover:-translate-x-0.5"
        >
          <span>← Back to Marketplace / Shopping</span>
        </button>

        <span className="text-xs text-stone-500 font-medium">
          Direct Payouts: Telebirr • CBE • Bank of Abyssinia
        </span>
      </div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 text-amber-300 text-xs font-bold border border-emerald-500/40">
            <Tractor className="w-4 h-4" />
            <span>DIRECT FARMER REGISTRY &amp; EMPOWERMENT PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Meet The Producers <span className="font-stylish-italic font-normal text-amber-200">Behind Your Harvest</span>
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-light leading-relaxed">
            Every farmer in our collective is verified, independent, and receives 100% of their listed crop prices directly via Telebirr, Commercial Bank of Ethiopia (CBE), or Bank of Abyssinia (BOA).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsFarmerRegisterModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Farm (Free & Direct)</span>
            </button>

            <button
              onClick={() => setActiveSubTab(activeSubTab === 'directory' ? 'dashboard' : 'directory')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <span>{activeSubTab === 'directory' ? 'Open Farmer Dashboard View' : 'Back to Directory'}</span>
            </button>
          </div>
        </div>

        {/* Aggregate Stats Card */}
        <div className="bg-stone-900/80 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/30 w-full md:w-auto min-w-[280px] space-y-3">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Network Direct Metrics
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-stone-800">
              <span className="text-stone-400">Registered Farms:</span>
              <span className="font-bold text-white text-sm">{farmers.length} Verified</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-800">
              <span className="text-stone-400">Total Direct Payouts:</span>
              <span className="font-bold text-amber-300 text-sm">
                ${farmers.reduce((acc, f) => acc + f.totalEarningsDirect, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-stone-400">Middleman Fee Cut:</span>
              <span className="font-black text-emerald-400 text-sm">$0.00 (0.0%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveSubTab('directory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'directory'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          All Registered Farmers ({farmers.length})
        </button>
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === 'dashboard'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <span>Farmer Management Dashboard</span>
          <span className="text-[10px] bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded-full font-black">
            Demo Portal
          </span>
        </button>
      </div>

      {/* SUB-VIEW 1: FARMER DIRECTORY & SPOTLIGHTS */}
      {activeSubTab === 'directory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {farmers.map((farmer) => {
            const crops = products.filter((p) => p.farmerId === farmer.id);
            return (
              <div
                key={farmer.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Cover Image & Avatar */}
                <div className="relative h-40 bg-stone-100 overflow-hidden">
                  <img
                    src={farmer.coverImage}
                    alt={farmer.farmName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="text-white">
                      <h3 className="font-bold text-base font-display flex items-center gap-1.5">
                        <span>{farmer.farmName}</span>
                        {farmer.verifiedBadge && (
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        )}
                      </h3>
                      <p className="text-xs text-stone-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-300" />
                        <span>{farmer.location} ({farmer.distanceKm} km away)</span>
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-300 border border-emerald-500/40">
                    {farmer.acres} Acres • Est. {farmer.establishedYear}
                  </div>
                </div>

                {/* Farmer Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-900">
                        Farmer: {farmer.name}
                      </span>
                      <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                        ★ {farmer.rating} ({farmer.reviewsCount} reviews)
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      "{farmer.bio}"
                    </p>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1.5">
                      {farmer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* Direct Payout Account Proof Badge */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-stone-800">
                        <span>Direct Wire Account:</span>
                        <span className="text-emerald-700 font-mono">
                          {farmer.bankAccount.accountNumberMasked}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Settlement: {farmer.bankAccount.payoutRouting}
                      </p>
                      <p className="text-[11px] text-amber-700 font-bold">
                        Direct Lifetime Earnings: ${farmer.totalEarningsDirect.toLocaleString()} (100% retained)
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveFarmerModal(farmer)}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>Read Story & Impact</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveFarmerModeId(farmer.id);
                        setActiveSubTab('dashboard');
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Manage & Market Crops ({crops.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-VIEW 2: FARMER MANAGEMENT DASHBOARD (Simulated View) */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Farmer Switcher Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                Managing Farm:
              </span>
              <select
                value={activeFarmerModeId}
                onChange={(e) => setActiveFarmerModeId(e.target.value)}
                className="font-bold text-sm bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-stone-900 focus:ring-2 focus:ring-emerald-700"
              >
                {farmers.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.farmName} — {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddCropModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>List New Harvest Crop</span>
              </button>

              <button
                onClick={() => setIsFarmerRegisterModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
              >
                + Add Another Farm
              </button>
            </div>
          </div>

          {/* Direct Payout Performance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Direct Platform Earnings</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-950">
                ${selectedFarmer.totalEarningsDirect.toLocaleString()}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">
                100% of price • $0 platform deductions
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Active Crop Listings</span>
                <Package className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-black text-stone-900">
                {farmerProducts.length} Crops
              </p>
              <p className="text-[11px] text-stone-500 font-medium">
                Ready for on-demand errand pickup
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Payout Wire Status</span>
                <CheckCircle className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-sm font-bold text-stone-900 truncate">
                {selectedFarmer.bankAccount.bankName}
              </p>
              <p className="text-[11px] text-teal-700 font-mono">
                {selectedFarmer.bankAccount.accountNumberMasked} (Instant ACH)
              </p>
            </div>
          </div>

          {/* Crops Currently Listed for Dispatch */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  Crops Marketed By {selectedFarmer.farmName}
                </h3>
                <p className="text-xs text-stone-500">
                  Customers can order these for immediate errand delivery.
                </p>
              </div>
              <button
                onClick={() => setIsAddCropModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Crop</span>
              </button>
            </div>

            {farmerProducts.length === 0 ? (
              <div className="text-center py-8 text-stone-500 text-xs">
                No crops listed yet for this farm. Click "Add Crop" to publish your harvest.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {farmerProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex gap-3 items-center"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-lg object-cover border border-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-stone-900 truncate">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-emerald-800 font-bold">
                        ${p.price.toFixed(2)} / {p.unit}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        Harvest: {p.harvestTimeAgo} • Stock: {p.stockQuantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
