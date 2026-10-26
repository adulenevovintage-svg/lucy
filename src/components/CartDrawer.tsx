import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DeliveryType } from '../types';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Zap,
  Clock,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartSubtotalEtb,
    currency,
    formatPrice,
    removeFromCart,
    updateCartQuantity,
    updateCartErrandNote,
    clearCart,
    setIsCheckoutModalOpen,
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('express_runner');
  const [farmerTip, setFarmerTip] = useState<number>(2.0);

  if (!isOpen) return null;

  const errandDeliveryFee = deliveryType === 'express_runner' ? 3.50 : 2.50;
  const finalTotal = Number((cartSubtotal + errandDeliveryFee + farmerTip).toFixed(2));

  const handleProceedToCheckout = () => {
    onClose();
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 className="font-bold text-base text-stone-900 font-display">
                Farm Errand Basket ({cartCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Zero Middleman Guarantee Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">100% Crop Value Guarantee</p>
                <p className="text-[11px] text-emerald-800">
                  Every cent of the ${cartSubtotal.toFixed(2)} crop subtotal goes directly to the independent farmers. Zero platform cut.
                </p>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">Your Basket is Empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Pick from fresh heirloom tomatoes, sweet orchard fruits, or pasture eggs directly from local farmers!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Items List */}
                <div className="divide-y divide-stone-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-3.5 space-y-2">
                      <div className="flex items-start gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-stone-900 leading-tight">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-emerald-700 font-medium">
                            {item.product.farmName}
                          </p>
                          <p className="text-xs font-bold text-stone-900 mt-1">
                            {formatPrice(item.product.price, item.product.priceEtb)}{' '}
                            <span className="text-[10px] text-stone-500 font-normal">
                              / {item.product.unit}
                            </span>
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-stone-200 rounded text-stone-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-stone-200 rounded text-stone-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Item-specific errand note input */}
                      <div className="pl-1">
                        <input
                          type="text"
                          value={item.errandNote || ''}
                          onChange={(e) =>
                            updateCartErrandNote(item.product.id, e.target.value)
                          }
                          placeholder="Errand picking preference (e.g. firm, ripe, stems on)..."
                          className="w-full text-[11px] p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600 placeholder-stone-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Errand Dispatch Option */}
                <div className="pt-3 border-t border-stone-200 space-y-2">
                  <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                    <span>Errand Dispatch Mode:</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Direct Runner</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setDeliveryType('express_runner')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        deliveryType === 'express_runner'
                          ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Express Runner</span>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5">Direct Farm Gate (~35m)</p>
                      <p className="text-xs font-black text-emerald-900 mt-1">$3.50</p>
                    </button>

                    <button
                      onClick={() => setDeliveryType('morning_slot')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        deliveryType === 'morning_slot'
                          ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>Dawn Harvest</span>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5">Tomorrow 7-9 AM</p>
                      <p className="text-xs font-black text-emerald-900 mt-1">$2.50</p>
                    </button>
                  </div>
                </div>

                {/* Direct Farmer Tip */}
                <div className="pt-2 border-t border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-500" />
                      <span>Optional Direct Farmer Bonus:</span>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">100% to farmer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[0, 1.0, 2.0, 5.0].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setFarmerTip(tip)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          farmerTip === tip
                            ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {tip === 0 ? 'None' : `+$${tip}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              {/* Ethiopian Payment Badge Strip */}
              <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-[11px]">
                <span className="font-bold text-stone-700">Supported Direct Wires:</span>
                <span className="font-bold text-emerald-800">Telebirr • CBE • BOA</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Fresh Crops Subtotal:</span>
                  <span className="font-bold text-stone-900">
                    {currency === 'ETB'
                      ? `${cartSubtotalEtb.toLocaleString()} ETB ($${cartSubtotal.toFixed(2)})`
                      : `$${cartSubtotal.toFixed(2)} (${cartSubtotalEtb.toLocaleString()} ETB)`}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Middleman Platform Cut:</span>
                  <span className="font-black">0.00 ETB (Zero Commission)</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Errand Runner Delivery:</span>
                  <span className="font-bold text-stone-900">
                    {currency === 'ETB' ? '440 ETB ($3.50)' : '$3.50 (440 ETB)'}
                  </span>
                </div>
                {farmerTip > 0 && (
                  <div className="flex justify-between text-amber-900">
                    <span>Direct Farmer Bonus Tip:</span>
                    <span className="font-bold">
                      +{currency === 'ETB' ? `${Math.round(farmerTip * 125)} ETB` : `$${farmerTip.toFixed(2)}`}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="font-extrabold text-stone-900 text-sm">Total:</span>
                  <div className="text-right">
                    <span className="font-black text-xl text-emerald-950 block">
                      {currency === 'ETB'
                        ? `${(cartSubtotalEtb + 440 + Math.round(farmerTip * 125)).toLocaleString()} ETB`
                        : `$${finalTotal.toFixed(2)}`}
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold">
                      {currency === 'ETB'
                        ? `($${finalTotal.toFixed(2)} USD)`
                        : `(${(cartSubtotalEtb + 440 + Math.round(farmerTip * 125)).toLocaleString()} ETB)`}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Pay with Telebirr / CBE / BOA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
