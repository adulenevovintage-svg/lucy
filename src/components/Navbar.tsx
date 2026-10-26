import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  ShoppingBag,
  Bell,
  MapPin,
  Tractor,
  Scale,
  Clock,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  ArrowUpRight,
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    cartSubtotal,
    cartSubtotalEtb,
    currency,
    setCurrency,
    unreadNotificationsCount,
    setIsNotificationDrawerOpen,
    setIsFarmerRegisterModalOpen,
    orders,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasActiveOrder = orders.some((o) => o.status !== 'delivered');

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Top Direct Guarantee Ribbon - subtle compact collapse on scroll */}
      <div
        className={`bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-emerald-100 transition-all duration-300 border-b border-emerald-800/40 ${
          isScrolled ? 'py-1 text-[11px]' : 'py-1.5 text-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-extrabold uppercase tracking-wider text-amber-300 text-[10px] sm:text-[11px] bg-emerald-800/80 px-2 py-0.5 rounded-full border border-emerald-600/60">
              Direct Farmer Settlement
            </span>
            <span className="text-emerald-100/90 font-medium truncate">
              Instant Payouts via <strong className="text-cyan-300 font-bold">Telebirr</strong>, <strong className="text-purple-300 font-bold">Commercial Bank of Ethiopia (CBE)</strong> &amp; <strong className="text-amber-300 font-bold">Bank of Abyssinia (BOA)</strong> • Zero Middlemen
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-emerald-200/90 text-xs shrink-0 font-medium">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <span>100% Ethiopian Farmer Payout</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-600" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Harvested Fresh Today</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-300 ${
          isScrolled ? 'shadow-md py-2.5' : 'shadow-xs py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Identity with stylish Fraunces font */}
            <div
              className="flex items-center gap-3.5 cursor-pointer group shrink-0"
              onClick={() => setActiveTab('marketplace')}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 border border-emerald-600/30">
                <Sprout className="w-6 h-6 text-emerald-200 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-emerald-950 font-display">
                    LUCY <span className="font-stylish-italic font-normal text-emerald-700">Agriculture</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-stone-900 text-amber-300 px-2 py-0.5 rounded-full border border-stone-800 shadow-2xs">
                    CORP
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium tracking-normal flex items-center gap-1.5 mt-0.5">
                  <span className="text-stone-700 font-semibold">Direct Farm-to-Consumer Errands</span>
                  <span className="text-emerald-700 font-bold">• Zero Middlemen</span>
                </p>
              </div>
            </div>

            {/* Desktop Center Navigation Segmented Controls */}
            <nav className="hidden lg:flex items-center p-1 bg-stone-100/90 rounded-2xl border border-stone-200/70 shadow-inner">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'marketplace'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>Marketplace</span>
              </button>

              <button
                onClick={() => setActiveTab('tracking')}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'tracking'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Live Errand Tracker</span>
                {hasActiveOrder && (
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('farmer_portal')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'farmer_portal'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
                }`}
              >
                <Tractor className="w-3.5 h-3.5" />
                <span>Farmer Hub</span>
              </button>

              <button
                onClick={() => setActiveTab('zero_middleman_manifesto')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'zero_middleman_manifesto'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>0% Middleman Model</span>
              </button>

              <button
                onClick={() => setActiveTab('my_orders')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'my_orders'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>My Orders</span>
              </button>
            </nav>

            {/* Right Action Icons & Buttons with balanced spacing */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Currency Toggle (ETB / USD) */}
              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setCurrency('ETB')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currency === 'ETB'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  ETB
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currency === 'USD'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  USD ($)
                </button>
              </div>

              {/* Farmer Quick Registration CTA */}
              <button
                onClick={() => setIsFarmerRegisterModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/90 text-stone-900 border border-amber-300 font-bold text-xs transition-all shadow-2xs hover:scale-102"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Register Farm</span>
              </button>

              {/* Notification Center Trigger */}
              <button
                onClick={() => setIsNotificationDrawerOpen(true)}
                className="relative p-2.5 rounded-xl text-stone-700 hover:text-emerald-950 hover:bg-stone-100 transition-colors border border-stone-200/60 bg-stone-50"
                title="Real-Time Telematics & Harvest Alerts"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-black rounded-full px-1 border-2 border-white animate-bounce shadow-xs">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Cart Button with preview summary in active currency */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-900/15 transition-all group hover:scale-102"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-950 text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-emerald-900">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold leading-tight">
                    {cartCount === 0 ? 'Errand Basket' : `${cartCount} items`}
                  </span>
                  {cartCount > 0 && (
                    <span className="text-[10px] text-emerald-200 font-semibold leading-none">
                      {currency === 'ETB'
                        ? `${cartSubtotalEtb.toLocaleString()} ETB`
                        : `$${cartSubtotal.toFixed(2)}`}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-between border-b border-stone-200/80 bg-stone-100/90 backdrop-blur-md px-3 py-2 text-xs font-semibold gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'marketplace'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Sprout className="w-3.5 h-3.5" /> Marketplace
        </button>
        <button
          onClick={() => setActiveTab('tracking')}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'tracking'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" /> Errand Tracking
          {hasActiveOrder && <span className="w-2 h-2 rounded-full bg-amber-400" />}
        </button>
        <button
          onClick={() => setActiveTab('farmer_portal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'farmer_portal'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Tractor className="w-3.5 h-3.5" /> Farmers
        </button>
        <button
          onClick={() => setActiveTab('zero_middleman_manifesto')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'zero_middleman_manifesto'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5" /> 0% Cut
        </button>
        <button
          onClick={() => setActiveTab('my_orders')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'my_orders'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <PackageCheck className="w-3.5 h-3.5" /> Orders
        </button>
      </div>
    </header>
  );
};
