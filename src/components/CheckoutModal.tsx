import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DeliveryDetails, PaymentMethodType } from '../types';
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Building,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Sparkles,
  Zap,
  ArrowRight,
  Loader2,
  DollarSign,
  QrCode,
  Smartphone,
  Check,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    cartSubtotalEtb,
    currency,
    formatPrice,
    placeOrder,
    setActiveTab,
  } = useApp();

  const [fullName, setFullName] = useState('Clara Jenkins');
  const [phone, setPhone] = useState('+251 91 174 9218');
  const [deliveryAddress, setDeliveryAddress] = useState('Bole Medhanealem, Suite 4B, Addis Ababa');
  const [landmark, setLandmark] = useState('Behind Edna Mall Roundabout');
  const [specialInstructions, setSpecialInstructions] = useState('Leave with front gate reception if bell rings. Keep veggies insulated.');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('telebirr');

  // Ethiopian payment inputs
  const [telebirrPhone, setTelebirrPhone] = useState('0911 234 567');
  const [cbeAccount, setCbeAccount] = useState('1000 4829 1928');
  const [boaAccount, setBoaAccount] = useState('1829 3829 1104');

  // Card fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('842');

  const [farmerTip, setFarmerTip] = useState(2.00);
  const [farmerTipEtb, setFarmerTipEtb] = useState(250);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const errandDeliveryFee = 3.50;
  const errandDeliveryFeeEtb = 440;
  const total = Number((cartSubtotal + errandDeliveryFee + farmerTip).toFixed(2));
  const totalEtb = cartSubtotalEtb + errandDeliveryFeeEtb + farmerTipEtb;

  // Preset quick fill test data
  const handleFillTelebirr = () => setTelebirrPhone('0912 345 678');
  const handleFillCbe = () => setCbeAccount('1000 8921 4410');
  const handleFillBoa = () => setBoaAccount('1829 4412 8892');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress || !fullName || !phone) return;

    setIsProcessing(true);

    setTimeout(() => {
      const deliveryDetails: DeliveryDetails = {
        type: 'express_runner',
        fullName,
        phone,
        deliveryAddress,
        landmark,
        specialErrandInstructions: specialInstructions,
        preferredTimeWindow: 'Within 35 minutes (Express Runner)',
      };

      placeOrder(deliveryDetails, paymentMethod, farmerTip);
      setIsProcessing(false);
      setIsCheckoutModalOpen(false);
      setActiveTab('tracking');
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <h2 className="text-xl font-bold font-display">
                Direct Farmer Payment &amp; Errand Wire
              </h2>
            </div>
            <p className="text-xs text-emerald-200">
              Telebirr • Commercial Bank of Ethiopia (CBE) • Bank of Abyssinia (BOA)
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Zero Middleman Affirmation Ribbon */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>
                  100% of Crop Price ({cartSubtotalEtb.toLocaleString()} ETB / ${cartSubtotal.toFixed(2)}) Sent Directly to Farmer
                </span>
              </p>
              <p className="text-[11px] text-emerald-700">
                LUCY AGRICULTURE CORP fee: $0.00 (0 ETB). No broker deductions.
              </p>
            </div>
            <span className="font-mono text-xs font-bold bg-emerald-200/80 px-2.5 py-1 rounded-md text-emerald-900">
              0% MIDDLEMAN
            </span>
          </div>

          {/* Section 1: Errand Delivery Destination */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>1. Delivery Destination &amp; Errand Instructions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Recipient Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Contact Phone (for Errand Runner SMS/Call)
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 9..."
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-stone-700 mb-1">
                  Street Address &amp; Subcity / Landmark (Addis Ababa / Regional)
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Bole Medhanealem, House 412, Addis Ababa"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-stone-700 mb-1">
                  Special Errand Picking &amp; Gate Instructions
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Ring bell, leave with guard, choose firm red tomatoes..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Ethiopian Payment Gateways */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>2. Select Direct Payment Gateway</span>
              </h3>
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                EthSwitch &amp; Direct Bank Certified
              </span>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {/* Telebirr */}
              <button
                type="button"
                onClick={() => setPaymentMethod('telebirr')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'telebirr'
                    ? 'border-cyan-600 bg-cyan-50/80 text-cyan-950 font-black ring-2 ring-cyan-500 shadow-sm'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  TB
                </div>
                <span>Telebirr</span>
                <span className="text-[9px] text-cyan-700 font-bold bg-cyan-100 px-1.5 py-0.2 rounded-full">
                  Most Popular
                </span>
              </button>

              {/* Commercial Bank of Ethiopia (CBE) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cbe')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'cbe'
                    ? 'border-purple-600 bg-purple-50/80 text-purple-950 font-black ring-2 ring-purple-500 shadow-sm'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-purple-800 text-amber-300 flex items-center justify-center font-black text-xs shadow-xs">
                  CBE
                </div>
                <span>CBE Birr</span>
                <span className="text-[9px] text-purple-700 font-bold bg-purple-100 px-1.5 py-0.2 rounded-full">
                  Direct Wire
                </span>
              </button>

              {/* Bank of Abyssinia (BOA) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bank_of_abyssinia')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'bank_of_abyssinia'
                    ? 'border-amber-600 bg-amber-50/80 text-amber-950 font-black ring-2 ring-amber-500 shadow-sm'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xs shadow-xs">
                  BOA
                </div>
                <span>Abyssinia</span>
                <span className="text-[9px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.2 rounded-full">
                  Instant P2P
                </span>
              </button>

              {/* Card (Diaspora / Int'l) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'credit_card'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600 shadow-sm'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold'
                }`}
              >
                <CreditCard className="w-6 h-6 text-emerald-700" />
                <span>Card / Diaspora</span>
                <span className="text-[9px] text-stone-500">USD to ETB</span>
              </button>

              {/* Cash on Errand Arrival */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash_errands')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 col-span-2 sm:col-span-1 ${
                  paymentMethod === 'cash_errands'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600 shadow-sm'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold'
                }`}
              >
                <DollarSign className="w-6 h-6 text-emerald-700" />
                <span>Cash on Arrival</span>
                <span className="text-[9px] text-stone-500">Pay Runner</span>
              </button>
            </div>

            {/* TELEBIRR DETAILS PANEL */}
            {paymentMethod === 'telebirr' && (
              <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-cyan-700" />
                    <span className="font-black text-cyan-950">
                      Telebirr Direct Instant Settlement
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillTelebirr}
                    className="text-[11px] font-bold bg-cyan-200/80 hover:bg-cyan-300 text-cyan-900 px-2 py-0.5 rounded-lg transition-colors"
                  >
                    Test Telebirr #
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-[11px] font-bold text-cyan-900 mb-1">
                      Your Telebirr Mobile Number
                    </label>
                    <input
                      type="text"
                      value={telebirrPhone}
                      onChange={(e) => setTelebirrPhone(e.target.value)}
                      placeholder="0911 000 000"
                      className="w-full px-3 py-2 bg-white border border-cyan-300 rounded-xl font-mono text-cyan-950 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                    />
                    <p className="text-[10px] text-cyan-700 mt-1">
                      Dial <span className="font-bold">*127#</span> or confirm via Telebirr SuperApp prompt.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-cyan-200 flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-800">
                      <QrCode className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-cyan-950 text-[11px]">Direct Farmer QR</p>
                      <p className="text-[10px] text-cyan-800 font-mono">
                        Merchant: LUCY-AGRI-FARM-01
                      </p>
                      <p className="text-[10px] text-emerald-700 font-bold">100% Payout Guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COMMERCIAL BANK OF ETHIOPIA (CBE) DETAILS PANEL */}
            {paymentMethod === 'cbe' && (
              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-purple-800" />
                    <span className="font-black text-purple-950">
                      Commercial Bank of Ethiopia (CBE / CBE Birr)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillCbe}
                    className="text-[11px] font-bold bg-purple-200/80 hover:bg-purple-300 text-purple-900 px-2 py-0.5 rounded-lg transition-colors"
                  >
                    Test CBE Account
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-[11px] font-bold text-purple-950 mb-1">
                      CBE Account Number / CBE Birr ID
                    </label>
                    <input
                      type="text"
                      value={cbeAccount}
                      onChange={(e) => setCbeAccount(e.target.value)}
                      placeholder="1000 0000 0000"
                      className="w-full px-3 py-2 bg-white border border-purple-300 rounded-xl font-mono text-purple-950 focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                    />
                    <p className="text-[10px] text-purple-700 mt-1">
                      Funds clear directly to farmer's registered CBE branch account within 10 seconds.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-purple-950">
                      <span>CBE Direct Payout:</span>
                      <span className="text-emerald-700 font-mono font-black">0% FEE</span>
                    </div>
                    <p className="text-[10px] text-stone-600">
                      Destination: Samuel Kiprono &amp; Almaz Tadesse Agricultural Enterprise
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BANK OF ABYSSINIA DETAILS PANEL */}
            {paymentMethod === 'bank_of_abyssinia' && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-amber-700" />
                    <span className="font-black text-amber-950">
                      Bank of Abyssinia (BOA / Apollo Direct)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillBoa}
                    className="text-[11px] font-bold bg-amber-200/80 hover:bg-amber-300 text-amber-900 px-2 py-0.5 rounded-lg transition-colors"
                  >
                    Test BOA Account
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-[11px] font-bold text-amber-950 mb-1">
                      Bank of Abyssinia Account Number
                    </label>
                    <input
                      type="text"
                      value={boaAccount}
                      onChange={(e) => setBoaAccount(e.target.value)}
                      placeholder="1829 0000 0000"
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl font-mono text-amber-950 focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                    />
                    <p className="text-[10px] text-amber-800 mt-1">
                      Instant P2P wire to farmer's BOA account via Apollo Digital Banking.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                    <p className="font-bold text-stone-900 text-[11px]">BOA Direct Transfer</p>
                    <p className="text-[10px] text-stone-600">
                      Zero transaction fees for agricultural direct producer deliveries.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CARD DETAILS PANEL */}
            {paymentMethod === 'credit_card' && (
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-700">Encrypted Card (Diaspora / International)</span>
                  <span className="text-[10px] text-stone-500">Auto-settled in ETB to farmer</span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 0000 0000 0000"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl font-mono text-stone-900"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl font-mono text-stone-900"
                    />
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl font-mono text-stone-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cash_errands' && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 text-xs text-amber-950">
                <p className="font-bold">Inspect Freshness Before Cash Release</p>
                <p className="text-[11px] text-amber-800">
                  You can inspect your crops upon arrival in Addis Ababa or region and pay runner Julian in cash or via Telebirr on delivery.
                </p>
              </div>
            )}
          </div>

          {/* Transparent Order Summary in ETB and USD */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Crops Subtotal ({cart.length} items):</span>
              <span className="font-bold text-stone-900">
                {cartSubtotalEtb.toLocaleString()} ETB (${cartSubtotal.toFixed(2)})
              </span>
            </div>
            <div className="flex justify-between text-emerald-800 font-semibold">
              <span>LUCY AGRICULTURE CORP Fee:</span>
              <span className="font-bold">0.00 ETB (0% Middleman Cut)</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Direct Errand Runner Dispatch:</span>
              <span className="font-bold text-stone-900">
                {errandDeliveryFeeEtb} ETB (${errandDeliveryFee.toFixed(2)})
              </span>
            </div>
            <div className="flex justify-between text-amber-800 font-semibold">
              <span>Direct Farmer Tip:</span>
              <span>+{farmerTipEtb} ETB (+${farmerTip.toFixed(2)})</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
              <span className="font-black text-stone-900">Total Authorized:</span>
              <div className="text-right">
                <span className="font-black text-xl text-emerald-950 block">
                  {totalEtb.toLocaleString()} ETB
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  (${total.toFixed(2)} USD equivalent)
                </span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>
                  Clearing {paymentMethod.toUpperCase()} Direct Settlement...
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-emerald-300" />
                <span>
                  Authorize &amp; Dispatch via {paymentMethod === 'cbe' ? 'CBE' : paymentMethod === 'bank_of_abyssinia' ? 'Bank of Abyssinia' : paymentMethod === 'telebirr' ? 'Telebirr' : paymentMethod.toUpperCase()} ({totalEtb.toLocaleString()} ETB)
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
