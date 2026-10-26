import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { RealTimeTracker } from './components/RealTimeTracker';
import { FarmerPortal } from './components/FarmerPortal';
import { PriceTransparency } from './components/PriceTransparency';
import { MyOrders } from './components/MyOrders';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FarmerRegisterModal } from './components/FarmerRegisterModal';
import { AddCropModal } from './components/AddCropModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { CropDetailModal } from './components/CropDetailModal';
import { FarmerModal } from './components/FarmerModal';
import {
  Sprout,
  ShieldCheck,
  Zap,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  Mail,
  Tractor,
  ArrowUp,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    products,
    selectedCategory,
    searchQuery,
    filterOrganic,
    filterHarvestToday,
    farmers,
    setActiveFarmerModal,
    setIsFarmerRegisterModalOpen,
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products based on category, search, organic, harvest
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }
    if (filterOrganic && !p.isOrganic) {
      return false;
    }
    if (
      filterHarvestToday &&
      !p.harvestStatus.toLowerCase().includes('today') &&
      !p.harvestTimeAgo.toLowerCase().includes('hr')
    ) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchFarmer = p.farmerName.toLowerCase().includes(q);
      const matchFarm = p.farmName.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchName && !matchFarmer && !matchFarm && !matchCategory) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcf9] text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navigation */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Tab Routing */}
      <main className="flex-1">
        {activeTab === 'marketplace' && (
          <div className="space-y-8 pb-16">
            {/* Hero Section */}
            <HeroBanner />

            {/* Marketplace Crop Catalog Container */}
            <div id="crops-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* Category & Filters */}
              <CategoryFilter />

              {/* Header with Results Count & Direct Guarantee */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display tracking-tight">
                    {selectedCategory === 'All' ? (
                      <>
                        All Farm-Fresh{' '}
                        <span className="font-stylish-italic font-normal text-emerald-700">
                          Crops &amp; Goods
                        </span>
                      </>
                    ) : (
                      selectedCategory
                    )}
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Showing {filteredProducts.length} crop items available for direct errand delivery.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto bg-emerald-50 text-emerald-900 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% of price goes directly to listed farmer</span>
                </div>
              </div>

              {/* Crops Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 max-w-lg mx-auto my-8">
                  <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                    <Sprout className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">No Fresh Crops Found</h3>
                  <p className="text-xs text-stone-700">
                    No items match your active filter combination. Try clearing your search or switching categories.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Meet the Farmers Highlight Section */}
              <div className="mt-16 pt-12 border-t border-stone-200/80 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Direct Farm Gate Collective
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-2 tracking-tight">
                      Meet Our Registered{' '}
                      <span className="font-stylish-italic font-normal text-emerald-700">
                        Local Farmers
                      </span>
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Independent producers who grow, harvest, and hand off your produce directly to our errand runners.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('farmer_portal')}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
                  >
                    <span>View All Farmers ({farmers.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {farmers.slice(0, 4).map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setActiveFarmerModal(f)}
                      className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={f.avatar}
                          alt={f.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-stone-900 truncate group-hover:text-emerald-800">
                            {f.farmName}
                          </h4>
                          <p className="text-[11px] text-stone-700 truncate">
                            {f.name}
                          </p>
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            {f.distanceKm} km away
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-stone-700 line-clamp-2">
                        "{f.bio}"
                      </p>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-emerald-800">
                          100% Direct Payout
                        </span>
                        <span className="text-amber-800 font-bold">
                          ★ {f.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Errand & Direct Delivery Explainer Banner */}
              <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-8 text-white mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center text-amber-300">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base font-display">
                    1. You Place An Errand Order
                  </h4>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Select your fresh crops, vegetables, eggs, or fruit. Add custom picking notes (e.g. ripeness preference).
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center text-amber-300">
                    <Tractor className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base font-display">
                    2. Farmer Packs & Dispatches
                  </h4>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    100% of your crop purchase is credited instantly to the farmer’s account. The farmer crates your harvest at their gate.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center text-amber-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base font-display">
                    3. Courier Rushes Direct To You
                  </h4>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Our electric courier runner collects the insulated crate and navigates straight to your doorstep with live GPS telematics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Tracking Tab */}
        {activeTab === 'tracking' && <RealTimeTracker />}

        {/* Farmer Portal Tab */}
        {activeTab === 'farmer_portal' && <FarmerPortal />}

        {/* Zero Middleman Manifesto Tab */}
        {activeTab === 'zero_middleman_manifesto' && <PriceTransparency />}

        {/* My Orders Tab */}
        {activeTab === 'my_orders' && <MyOrders />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white border-t border-stone-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Charter */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <Sprout className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="font-black text-lg tracking-tight font-display text-white">
                  LUCY AGRICULTURE <span className="text-emerald-400">CORP</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Direct farm-to-door grocery errand platform connecting consumers and family farms with strictly 0% third-party markups.
              </p>
              <div className="pt-1 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Direct Farmer Settlement Guarantee</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
                Platform Services
              </h4>
              <ul className="space-y-1.5 text-stone-400">
                <li>
                  <button
                    onClick={() => setActiveTab('marketplace')}
                    className="hover:text-emerald-300 transition-colors"
                  >
                    Fresh Harvest Marketplace
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className="hover:text-emerald-300 transition-colors"
                  >
                    Real-Time Errand GPS Telematics
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('farmer_portal')}
                    className="hover:text-emerald-300 transition-colors"
                  >
                    Registered Farmers Directory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('zero_middleman_manifesto')}
                    className="hover:text-emerald-300 transition-colors"
                  >
                    The 0% Middleman Price Model
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: For Farmers */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
                Farmer Collective
              </h4>
              <ul className="space-y-1.5 text-stone-400">
                <li>
                  <button
                    onClick={() => setIsFarmerRegisterModalOpen(true)}
                    className="hover:text-amber-300 text-amber-400 font-semibold transition-colors"
                  >
                    + Register Your Family Farm
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('farmer_portal')}
                    className="hover:text-emerald-300 transition-colors"
                  >
                    Farmer Dispatch Dashboard
                  </button>
                </li>
                <li>
                  <span className="text-stone-500">Instant ACH Settlement</span>
                </li>
                <li>
                  <span className="text-stone-500">No Shelf Listing Fees</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Trust & Dispatch Hotline */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
                Ethiopian Payment Rails
              </h4>
              <p className="text-stone-400 text-[11px]">
                Direct Farmer Settlement Partners:
              </p>
              <div className="space-y-1 text-stone-300 text-xs">
                <p className="flex items-center gap-1.5 font-bold text-cyan-300">
                  <span>✓ Telebirr Mobile Wallet</span>
                </p>
                <p className="flex items-center gap-1.5 font-bold text-purple-300">
                  <span>✓ Commercial Bank of Ethiopia (CBE)</span>
                </p>
                <p className="flex items-center gap-1.5 font-bold text-amber-300">
                  <span>✓ Bank of Abyssinia (BOA)</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 text-xs text-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} LUCY AGRICULTURE CORP. Direct Ethiopian Farmer Empowerment.
            </p>
            <div className="flex items-center gap-4 text-stone-300">
              <span className="hover:text-stone-200 cursor-pointer">Telebirr Direct</span>
              <span>•</span>
              <span className="hover:text-stone-200 cursor-pointer">CBE Direct</span>
              <span>•</span>
              <span className="hover:text-stone-200 cursor-pointer">BOA Direct</span>
              <span>•</span>
              <span className="hover:text-stone-200 cursor-pointer">0% Middleman Pact</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-emerald-900/90 hover:bg-emerald-800 text-white shadow-xl hover:shadow-2xl border border-emerald-700/60 transition-all duration-300 backdrop-blur-md flex items-center gap-2 group animate-scale-in"
          title="Back to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold text-emerald-100 pr-1">
            Top
          </span>
        </button>
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CheckoutModal />
      <FarmerRegisterModal />
      <AddCropModal />
      <NotificationDrawer />
      <CropDetailModal />
      <FarmerModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
