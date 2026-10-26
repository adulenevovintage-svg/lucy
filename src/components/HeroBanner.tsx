import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Tractor,
  ShieldCheck,
  Zap,
  HeartHandshake,
  TrendingUp,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab, setIsFarmerRegisterModalOpen } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-700/40">
      {/* Decorative background grid pattern & ambient glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a7f3d0_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-400/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
              <HeartHandshake className="w-4 h-4 text-emerald-300" />
              <span>Proud Direct Producer Model • Zero Middlemen</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white font-display">
              Fresh Harvests <span className="font-stylish-italic font-normal text-amber-200">Run Direct</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-300">
                From Soil To Your Kitchen.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl font-light leading-relaxed">
              Order fresh crops and groceries as an on-demand errand dispatched directly from local family farms.
              <strong className="text-white font-semibold"> 100% of your crop purchase price goes straight into the farmer’s hands</strong>,
              maximizing farm income while giving you produce picked hours ago.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const element = document.getElementById('crops-grid');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 text-emerald-950" />
                <span>Order Fresh Crops Errand</span>
              </button>

              <button
                onClick={() => setActiveTab('zero_middleman_manifesto')}
                className="px-5 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-600/60 text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-emerald-300" />
                <span>See Why Farmers Earn 4x More</span>
              </button>

              <button
                onClick={() => setIsFarmerRegisterModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Tractor className="w-4 h-4 text-amber-300" />
                <span>Are You A Farmer? Register Free</span>
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-emerald-700/40 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>0% Platform Commission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Live GPS Errand Tracking</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Harvested Same-Day</span>
              </div>
            </div>

            {/* Promoted Ethiopian Direct Payment Systems */}
            <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-emerald-500/40 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Official Ethiopian Direct Settlement Partners
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold">100% to Farmer</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-stone-800/80 rounded-xl border border-cyan-500/30">
                  <span className="block font-black text-cyan-300 text-xs sm:text-sm">Telebirr</span>
                  <span className="text-[9px] text-stone-300">Instant Mobile Wallet</span>
                </div>
                <div className="p-2 bg-stone-800/80 rounded-xl border border-purple-500/30">
                  <span className="block font-black text-purple-300 text-xs sm:text-sm">CBE Birr</span>
                  <span className="text-[9px] text-stone-300">Commercial Bank</span>
                </div>
                <div className="p-2 bg-stone-800/80 rounded-xl border border-amber-500/30">
                  <span className="block font-black text-amber-300 text-xs sm:text-sm">Abyssinia</span>
                  <span className="text-[9px] text-stone-300">BOA Direct Wire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Card: Direct Transparency Spotlight */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-stone-900/90 to-emerald-950/90 rounded-2xl p-6 border border-emerald-500/30 shadow-2xl backdrop-blur-md relative">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Live Direct Payout Ledger
                  </span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-900/80 text-emerald-200 border border-emerald-700/60">
                  Zero Broker Cut
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div className="bg-emerald-900/40 rounded-xl p-4 border border-emerald-700/40">
                  <div className="flex justify-between items-center text-xs text-emerald-300 mb-1">
                    <span>Traditional Supermarket Model:</span>
                    <span className="font-bold text-red-300">Farmer gets ~18%</span>
                  </div>
                  <div className="w-full bg-stone-800 rounded-full h-2.5 overflow-hidden flex">
                    <div className="bg-red-500 h-2.5 w-[18%]" title="Farmer" />
                    <div className="bg-stone-600 h-2.5 w-[82%]" title="Middlemen, brokers & wholesale markups" />
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1 flex justify-between">
                    <span>82% consumed by middlemen syndicates</span>
                    <span>10-14 days old produce</span>
                  </div>
                </div>

                <div className="bg-emerald-800/50 rounded-xl p-4 border border-emerald-400/50 shadow-inner">
                  <div className="flex justify-between items-center text-xs text-emerald-200 mb-1">
                    <span className="font-bold text-emerald-300">LUCY AGRICULTURE CORP:</span>
                    <span className="font-extrabold text-amber-300 text-sm">FARMER GETS 100%</span>
                  </div>
                  <div className="w-full bg-stone-800 rounded-full h-3 overflow-hidden flex">
                    <div className="bg-gradient-to-r from-emerald-400 to-amber-300 h-3 w-full" />
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-2 flex justify-between font-medium">
                    <span>Zero middleman commission</span>
                    <span className="text-amber-200">Harvested hours ago</span>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-900/80 rounded-xl border border-emerald-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Active Farm Runners</p>
                      <p className="text-emerald-400 text-[11px]">Direct express dispatch ready</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className="text-amber-300 hover:text-amber-200 font-semibold text-xs flex items-center gap-1 hover:underline"
                  >
                    View Map →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
