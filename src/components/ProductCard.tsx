import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  Clock,
  MapPin,
  Sparkles,
  Plus,
  Check,
  ShieldCheck,
  Info,
  Scale,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductModal, setActiveFarmerModal, farmers, formatPrice, currency } = useApp();
  const [justAdded, setJustAdded] = useState(false);
  const [showErrandNoteInput, setShowErrandNoteInput] = useState(false);
  const [errandNote, setErrandNote] = useState('');

  const farmer = farmers.find((f) => f.id === product.farmerId);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, errandNote);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setShowErrandNoteInput(false);
      setErrandNote('');
    }, 1500);
  };

  const handleOpenFarmer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (farmer) setActiveFarmerModal(farmer);
  };

  const savingsPercent = Math.round(
    ((product.supermarketEquivPrice - product.price) / product.supermarketEquivPrice) * 100
  );

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className="group bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Harvest Time Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/90 text-white text-[11px] font-bold backdrop-blur-md shadow-xs border border-emerald-500/30">
            <Clock className="w-3 h-3 text-emerald-300" />
            <span>{product.harvestTimeAgo}</span>
          </span>

          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Organic</span>
            </span>
          )}
        </div>

        {/* 100% Direct Cut Stamp */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-stone-900/85 text-emerald-300 text-[11px] font-bold backdrop-blur-md border border-emerald-400/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% To Farmer</span>
          </span>
        </div>

        {/* Harvest Status Bar at bottom of image */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 to-transparent p-2.5 pt-6 text-white text-xs flex justify-between items-end">
          <span className="text-[11px] font-medium text-emerald-200">
            {product.harvestStatus}
          </span>
          <span className="text-[10px] text-stone-300 bg-white/20 px-1.5 py-0.5 rounded-sm">
            Stock: {product.stockQuantity} {product.unit.split(' ')[0]}s
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Farmer clickable attribution */}
          <div
            onClick={handleOpenFarmer}
            className="flex items-center gap-2 mb-2 group/farmer hover:opacity-90 transition-opacity"
            title="Click to view farmer bio & direct payout details"
          >
            <img
              src={product.farmerAvatar}
              alt={product.farmerName}
              className="w-5 h-5 rounded-full object-cover border border-emerald-600"
            />
            <span className="text-xs font-semibold text-emerald-900 group-hover/farmer:text-emerald-700 hover:underline flex items-center gap-1 truncate">
              {product.farmName}
            </span>
            <span className="text-[11px] text-stone-600 shrink-0">({product.farmerLocation.split('(')[1] || ''}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Nutritional Highlights */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.nutritionalHighlights.slice(0, 2).map((highlight) => (
              <span
                key={highlight}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Add to Errand Action */}
        <div className="pt-3 border-t border-stone-100 space-y-2">
          {/* Price display & supermarket comparison */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-950 font-display">
                  {formatPrice(product.price, product.priceEtb)}
                </span>
                <span className="text-xs font-semibold text-stone-600">/ {product.unit}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-600">
                <span className="line-through text-stone-600">
                  Store: {formatPrice(product.supermarketEquivPrice, product.supermarketEquivPriceEtb)}
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded-sm">
                  Save {savingsPercent}%
                </span>
              </div>
            </div>

            <div className="text-right flex flex-col items-end">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                100% to farmer
              </span>
              <span className="text-[9px] text-stone-600 mt-0.5">
                Telebirr • CBE • BOA
              </span>
            </div>
          </div>

          {/* Optional Errand Note Input Toggle */}
          {showErrandNoteInput ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5"
            >
              <label className="text-[11px] font-bold text-amber-900 flex justify-between">
                <span>Errand picking note for runner:</span>
                <button
                  onClick={() => setShowErrandNoteInput(false)}
                  className="text-stone-600 hover:text-stone-900 text-xs"
                >
                  ✕
                </button>
              </label>
              <input
                type="text"
                value={errandNote}
                onChange={(e) => setErrandNote(e.target.value)}
                placeholder="e.g. Extra crisp, pick ripe bunch, double bag..."
                className="w-full text-xs p-1.5 bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowErrandNoteInput(true);
              }}
              className="text-[11px] text-stone-600 hover:text-emerald-800 flex items-center gap-1 underline decoration-dotted"
            >
              + Add errand picking note
            </button>
          )}

          {/* Add to Basket Button */}
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-800 hover:bg-emerald-900 text-white hover:shadow-md'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-200 animate-scale-in" />
                <span>Added to Errand Basket!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-emerald-300" />
                <span>Add to Errand Basket</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
