import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  TrendingUp,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Tractor,
  DollarSign,
  AlertTriangle,
  Award,
} from 'lucide-react';

export const PriceTransparency: React.FC = () => {
  const { setActiveTab, setIsFarmerRegisterModalOpen } = useApp();
  const [basketValue, setBasketValue] = useState<number>(50);

  // Math for comparison:
  // Supermarket: Farmer receives ~18%, Middlemen/Wholesale/Retail consume 82%
  const supermarketFarmerEarnings = Number((basketValue * 0.18).toFixed(2));
  const supermarketMiddlemanCut = Number((basketValue * 0.82).toFixed(2));

  // Lucy Agriculture Corp:
  // Farmer receives 100% of basketValue
  const lucyFarmerEarnings = Number(basketValue.toFixed(2));
  const lucyMiddlemanCut = 0.0;
  const extraToFarmer = Number((lucyFarmerEarnings - supermarketFarmerEarnings).toFixed(2));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          <span>OUR UNCOMPROMISING CORE PACT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 font-display tracking-tight">
          No Middlemen. No Brokers. <br />
          <span className="text-emerald-700 font-stylish-italic font-normal">100% Direct</span> To Farmers.
        </h1>
        <p className="text-base text-stone-600 leading-relaxed font-light">
          Traditional supermarkets force family farms to sell at rock-bottom wholesale prices while marking up produce 300% on store shelves.
          <strong className="text-stone-900"> Lucy Agriculture Corp changes the game completely:</strong> we connect you directly as an errand delivery run, returning 100% of product pricing to the producers who feed us.
        </p>
      </div>

      {/* Interactive Value Comparison Calculator */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700" />
              <span>Interactive Direct Farmer Impact Calculator</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Adjust your grocery basket size to see the massive difference direct errand ordering creates.
            </p>
          </div>
          <div className="flex items-baseline gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
            <span className="text-xs font-semibold text-emerald-800">Your Basket:</span>
            <span className="text-2xl font-black text-emerald-950">${basketValue}.00</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-stone-600">
            <span>$15 (Daily fresh bunch)</span>
            <span>$50 (Family weekly veggies)</span>
            <span>$120 (Wholesale pantry & farm harvest)</span>
          </div>
          <input
            type="range"
            min="15"
            max="120"
            step="5"
            value={basketValue}
            onChange={(e) => setBasketValue(Number(e.target.value))}
            className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
          />
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Supermarket Model Card */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-700">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-base">Traditional Supermarket Supply Chain</h4>
              </div>
              <span className="text-xs font-extrabold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
                Farmer gets ~18%
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-600">What the Farmer Earns:</span>
                <span className="font-bold text-stone-800">${supermarketFarmerEarnings}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-red-700">
                <span>Middlemen, brokers & distributor cuts:</span>
                <span className="font-bold">-${supermarketMiddlemanCut}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 text-xs text-stone-500 space-y-1">
                <p>• Produce stored in cold warehouses for 8 to 14 days</p>
                <p>• Chemically waxed and artificial ethylene gas-ripened</p>
                <p>• Farmers must absorb transit spoils and delayed 90-day payments</p>
              </div>
            </div>
          </div>

          {/* Lucy Agriculture Corp Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-6 border-2 border-emerald-500/60 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-200">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h4 className="font-bold text-base font-display">LUCY AGRICULTURE CORP Model</h4>
              </div>
              <span className="text-xs font-black text-emerald-950 bg-amber-300 px-2.5 py-0.5 rounded-md shadow-xs">
                FARMER GETS 100%
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-emerald-100">Direct Wire to Farmer:</span>
                <span className="font-black text-2xl text-amber-300">${lucyFarmerEarnings}.00</span>
              </div>
              <div className="flex justify-between items-center text-sm text-emerald-300">
                <span>Platform Middleman Fee:</span>
                <span className="font-bold">$0.00 (0.0% Commission)</span>
              </div>
              <div className="pt-2 border-t border-emerald-800 text-xs text-emerald-100 space-y-1">
                <p className="flex items-center gap-1 font-semibold text-amber-200">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+${extraToFarmer} extra direct income to the farmer!</span>
                </p>
                <p>• Harvested within hours of delivery dispatch</p>
                <p>• Errand runner handles door-to-door express transport</p>
                <p>• Instant settlement to farmer’s registered direct account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of The Direct Producer Promise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Tractor className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-base text-stone-900 font-display">
            Direct Farm Gate Handoff
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Our couriers perform personal errand pickups directly at the farm gate. Crops never pass through intermediate central distribution centers or grading depots.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-base text-stone-900 font-display">
            True Price Autonomy
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Farmers set their own fair retail prices based on their sustainable input costs, organic seeds, and living wages for farm hands — not what commodity trading boards dictate.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-base text-stone-900 font-display">
            Traceable Origin & Story
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every crop bundle has a face, a verified farm name, and a harvest timestamp. You know exactly whose family soil and hands grew the food on your table.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-display">Ready To Support Real Farmers Directly?</h3>
          <p className="text-xs text-emerald-100 max-w-xl">
            Place an errand delivery order today and taste what crops harvested this morning actually taste like.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('marketplace')}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-md transition-colors"
          >
            Order Fresh Crops Now
          </button>
          <button
            onClick={() => setIsFarmerRegisterModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            Register As A Farmer
          </button>
        </div>
      </div>
    </div>
  );
};
