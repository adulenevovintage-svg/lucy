import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  MapPin,
  Calendar,
  Award,
  DollarSign,
  Heart,
  CheckCircle2,
  Tractor,
} from 'lucide-react';

export const FarmerModal: React.FC = () => {
  const {
    activeFarmerModal,
    setActiveFarmerModal,
    products,
    setActiveProductModal,
    setActiveTab,
  } = useApp();

  if (!activeFarmerModal) return null;

  const farmer = activeFarmerModal;
  const farmerCrops = products.filter((p) => p.farmerId === farmer.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-8">
        {/* Cover Image & Profile Header */}
        <div className="relative h-48 sm:h-56 bg-stone-900 overflow-hidden">
          <img
            src={farmer.coverImage}
            alt={farmer.farmName}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

          <button
            onClick={() => setActiveFarmerModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-white pb-1">
              <h2 className="text-xl sm:text-2xl font-black font-display flex items-center gap-2">
                <span>{farmer.farmName}</span>
                {farmer.verifiedBadge && (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                )}
              </h2>
              <p className="text-xs text-stone-200 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{farmer.location} • {farmer.distanceKm} km from you</span>
              </p>
            </div>
          </div>
        </div>

        {/* Farmer Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="block text-base sm:text-xl font-black text-stone-900">
                {farmer.acres}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                Total Acres
              </span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="block text-base sm:text-xl font-black text-emerald-950">
                100%
              </span>
              <span className="text-[11px] font-semibold text-emerald-800">
                Direct Price Retained
              </span>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="block text-base sm:text-xl font-black text-amber-900">
                Est. {farmer.establishedYear}
              </span>
              <span className="text-[11px] font-semibold text-amber-800">
                Family Land
              </span>
            </div>
          </div>

          {/* Farmer Story on Middleman Elimination */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-700" />
              <span>Farmer's Direct Soil Story</span>
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200 italic">
              "{farmer.story}"
            </p>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              Verified Agricultural Standards:
            </h4>
            <div className="flex flex-wrap gap-2">
              {farmer.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-lg flex items-center gap-1 border border-emerald-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{cert}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Direct Wire Settlement Assurance */}
          <div className="p-4 bg-stone-900 text-white rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Middleman Ethiopian Settlement Ledger</span>
              </span>
              <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                {farmer.bankAccount.bankName}
              </span>
            </div>
            <p className="text-stone-300">
              All crop revenue from customer errand baskets is routed automatically to {farmer.farmName}'s verified {farmer.bankAccount.bankName} account ({farmer.bankAccount.accountNumberMasked}) with zero intermediary holding fees.
            </p>
          </div>

          {/* Active Crops from this farm */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center justify-between">
              <span>Fresh Harvests from {farmer.farmName}</span>
              <span className="text-xs text-emerald-800 font-semibold">
                {farmerCrops.length} Crops Available
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {farmerCrops.map((crop) => (
                <div
                  key={crop.id}
                  onClick={() => {
                    setActiveFarmerModal(null);
                    setActiveProductModal(crop);
                  }}
                  className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer flex gap-3 items-center transition-colors"
                >
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-stone-900 truncate">
                      {crop.name}
                    </h5>
                    <p className="text-xs font-black text-emerald-800">
                      ${crop.price.toFixed(2)} / {crop.unit}
                    </p>
                    <p className="text-[10px] text-stone-500">
                      {crop.harvestTimeAgo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
