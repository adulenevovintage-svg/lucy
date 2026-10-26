import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Clock,
  Sparkles,
  ShieldCheck,
  MapPin,
  Plus,
  Check,
  Heart,
  Scale,
} from 'lucide-react';

export const CropDetailModal: React.FC = () => {
  const {
    activeProductModal,
    setActiveProductModal,
    addToCart,
    setActiveFarmerModal,
    farmers,
    formatPrice,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [errandNote, setErrandNote] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const farmer = farmers.find((f) => f.id === product.farmerId);

  const handleAdd = () => {
    addToCart(product, quantity, errandNote);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setActiveProductModal(null);
    }, 900);
  };

  const savingsPercent = Math.round(
    ((product.supermarketEquivPrice - product.price) / product.supermarketEquivPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-8">
        {/* Crop Hero Image */}
        <div className="relative aspect-16/9 sm:aspect-2/1 bg-stone-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setActiveProductModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-900/90 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 border border-emerald-500/40">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{product.harvestDate} ({product.harvestTimeAgo})</span>
            </span>
            {product.isOrganic && (
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider">
                100% Organic Certified
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Farmer clickable banner */}
          <div
            onClick={() => {
              if (farmer) {
                setActiveProductModal(null);
                setActiveFarmerModal(farmer);
              }
            }}
            className="p-3 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={product.farmerAvatar}
                alt={product.farmerName}
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600"
              />
              <div>
                <h4 className="font-bold text-xs text-stone-900 flex items-center gap-1">
                  <span>Grown by {product.farmerName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </h4>
                <p className="text-[11px] text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-700" />
                  <span>{product.farmName} • {product.farmerLocation}</span>
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 underline">
              View Farm Story →
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Direct Guarantee */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-950 font-display">
                  {formatPrice(product.price, product.priceEtb)}
                </span>
                <span className="text-xs font-semibold text-stone-600 ml-1">
                  / {product.unit}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs line-through text-stone-400">
                  Supermarket price: {formatPrice(product.supermarketEquivPrice, product.supermarketEquivPriceEtb)}
                </span>
                <p className="text-xs font-bold text-emerald-700">
                  You save {savingsPercent}% directly
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% Direct Payout to Farm Gate via Telebirr, CBE or BOA</span>
              </span>
              <span className="font-bold font-mono">0% Middleman Cut</span>
            </div>
          </div>

          {/* Nutritional Highlights */}
          <div>
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
              Nutritional & Harvest Profile:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.nutritionalHighlights.map((nh) => (
                <span
                  key={nh}
                  className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold border border-stone-200"
                >
                  ✓ {nh}
                </span>
              ))}
              <span className="px-3 py-1 bg-amber-50 text-amber-900 rounded-lg text-xs font-semibold border border-amber-200">
                ⚡ Picked Fresh Today
              </span>
            </div>
          </div>

          {/* Errand Note Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Custom Errand Picking Preference for Courier:
            </label>
            <input
              type="text"
              value={errandNote}
              onChange={(e) => setErrandNote(e.target.value)}
              placeholder="e.g. Choose firmer avocados, pack tender greens gently..."
              className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
            />
          </div>

          {/* Quantity & Add Action */}
          <div className="pt-3 border-t border-stone-200 flex items-center gap-4">
            <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-sm text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-800 hover:bg-emerald-900 text-white hover:shadow-lg'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Added to Errand Basket!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-emerald-300" />
                  <span>
                    Add to Errand Basket ($
                    {(product.price * quantity).toFixed(2)})
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
