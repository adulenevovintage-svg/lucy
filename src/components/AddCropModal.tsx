import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CropCategory, HarvestStatus } from '../types';
import { X, Sprout, Plus, Sparkles, Image, Check } from 'lucide-react';

export const AddCropModal: React.FC = () => {
  const { isAddCropModalOpen, setIsAddCropModalOpen, farmers, addFarmerProduct } =
    useApp();

  const [selectedFarmerId, setSelectedFarmerId] = useState<string>(
    farmers[0]?.id || 'f-1'
  );
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CropCategory>('Fresh Vegetables');
  const [price, setPrice] = useState<number>(3.20);
  const [unit, setUnit] = useState('1 kg crate');
  const [supermarketPrice, setSupermarketPrice] = useState<number>(5.50);
  const [stockQuantity, setStockQuantity] = useState<number>(30);
  const [harvestStatus, setHarvestStatus] =
    useState<HarvestStatus>('Freshly Harvested Today');
  const [harvestTimeAgo, setHarvestTimeAgo] = useState('Harvested 2 hrs ago');
  const [description, setDescription] = useState('');
  const [isOrganic, setIsOrganic] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80'
  );

  const samplePhotoPresets = [
    {
      label: 'Carrots',
      url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Bell Peppers',
      url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Blueberries',
      url: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Salad Greens',
      url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Wild Mushrooms',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    },
  ];

  if (!isAddCropModalOpen) return null;

  const currentFarmer =
    farmers.find((f) => f.id === selectedFarmerId) || farmers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    addFarmerProduct({
      name,
      category,
      farmerId: currentFarmer.id,
      farmerName: currentFarmer.name,
      farmName: currentFarmer.farmName,
      farmerAvatar: currentFarmer.avatar,
      farmerLocation: currentFarmer.location,
      price: Number(price),
      priceEtb: Math.round(Number(price) * 125),
      unit,
      image: imageUrl,
      description:
        description ||
        `Freshly harvested ${name} directly from ${currentFarmer.farmName}. Zero middleman markups.`,
      harvestDate: 'Today, Dawn Picked',
      harvestTimeAgo,
      harvestStatus,
      stockQuantity: Number(stockQuantity) || 25,
      isOrganic,
      nutritionalHighlights: ['Direct Farm Fresh', 'Unwaxed', 'Nutrient Dense'],
      supermarketEquivPrice: Number(supermarketPrice) || Number(price) * 1.6,
      supermarketEquivPriceEtb: Math.round((Number(supermarketPrice) || Number(price) * 1.6) * 125),
    });

    setIsAddCropModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-300" />
            <h2 className="text-lg font-bold font-display">
              List Fresh Harvest Crop
            </h2>
          </div>
          <button
            onClick={() => setIsAddCropModalOpen(false)}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
          {/* Select Farm */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Listing on Behalf of Farm:
            </label>
            <select
              value={selectedFarmerId}
              onChange={(e) => setSelectedFarmerId(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-emerald-700"
            >
              {farmers.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.farmName} ({f.name})
                </option>
              ))}
            </select>
          </div>

          {/* Crop Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Crop / Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Crisp Orange Rainbow Carrots"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CropCategory)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-700"
              >
                <option value="Fresh Vegetables">Fresh Vegetables</option>
                <option value="Orchard Fruits">Orchard Fruits</option>
                <option value="Farm Dairy & Eggs">Farm Dairy & Eggs</option>
                <option value="Grains & Pulses">Grains & Pulses</option>
                <option value="Fresh Herbs">Fresh Herbs</option>
                <option value="Tubers & Roots">Tubers & Roots</option>
                <option value="Pantry Harvest">Pantry Harvest</option>
              </select>
            </div>
          </div>

          {/* Pricing & Units */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Direct Price ($) *
              </label>
              <input
                type="number"
                step="0.10"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="3.20"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-emerald-950 focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Selling Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. 1 kg crate, dozen"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Store Comparison ($)
              </label>
              <input
                type="number"
                step="0.10"
                value={supermarketPrice}
                onChange={(e) => setSupermarketPrice(Number(e.target.value))}
                placeholder="5.50"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Harvest status & Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Harvest Freshness
              </label>
              <select
                value={harvestStatus}
                onChange={(e) => setHarvestStatus(e.target.value as HarvestStatus)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-700"
              >
                <option value="Freshly Harvested Today">Freshly Harvested Today</option>
                <option value="Morning Picked">Morning Picked</option>
                <option value="Field Standing - Pick On Order">
                  Field Standing - Pick On Order
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Available Stock Count
              </label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                placeholder="40"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Quick Photo Presets */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Select Crop Photo Preset (or provide custom URL):
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {samplePhotoPresets.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setImageUrl(preset.url)}
                  className={`px-2.5 py-1 rounded-lg border font-medium text-[11px] ${
                    imageUrl === preset.url
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Organic checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="organicCheck"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
            />
            <label htmlFor="organicCheck" className="font-semibold text-stone-800">
              100% Certified Organic & Chemical-Free
            </label>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-stone-200">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Crop for Immediate Errand Dispatch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
