import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import {
  MapPin,
  Bike,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Thermometer,
  Compass,
  ArrowRight,
  Package,
  FileCheck,
  RefreshCw,
  AlertCircle,
  Truck,
  Building,
} from 'lucide-react';

export const RealTimeTracker: React.FC = () => {
  const { orders, activeTrackingOrderId, setActiveTrackingOrderId, advanceOrderTracking, setActiveTab } = useApp();
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showPayoutProof, setShowPayoutProof] = useState(false);

  // Live timer tick for animated telematics
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentOrder =
    orders.find((o) => o.id === activeTrackingOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">No Active Errands To Track</h2>
        <p className="text-stone-600 mb-6">
          Order farm-fresh crops and groceries to experience our real-time direct delivery tracking!
        </p>
        <button
          onClick={() => setActiveTab('marketplace')}
          className="px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-700 transition-colors"
        >
          Browse Fresh Farm Market
        </button>
      </div>
    );
  }

  // Calculate runner position on SVG map path based on status
  const statusProgressMap: Record<OrderStatus, number> = {
    order_confirmed: 0.08,
    farmer_harvesting: 0.25,
    courier_picked_up: 0.45,
    in_transit: 0.72,
    delivered: 1.0,
  };

  const progressFactor = statusProgressMap[currentOrder.status] ?? 0.5;

  // Path coordinates for the SVG route
  // Start: (80, 220) Farm -> Waypoint 1 (220, 140) -> Waypoint 2 (380, 200) -> Destination (520, 90)
  const currentRunnerX = 80 + progressFactor * (520 - 80);
  // Curve calculation for vertical path
  const currentRunnerY =
    220 - Math.sin(progressFactor * Math.PI) * 70 - progressFactor * (220 - 90);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Order Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h1 className="text-2xl font-black text-stone-900 font-display">
              Live Errand Dispatch <span className="font-stylish-italic font-normal text-emerald-700">Telematics</span>
            </h1>
          </div>
          <p className="text-xs text-stone-600">
            Real-time direct tracking between local farm gate and your delivery destination.
          </p>
        </div>

        {/* Switch order if multiple orders */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-700">Tracking Order:</span>
            <select
              value={currentOrder.id}
              onChange={(e) => setActiveTrackingOrderId(e.target.value)}
              className="text-xs font-bold py-2 px-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber} ({o.status.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map & Telematics (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-6 border border-stone-800 shadow-xl relative overflow-hidden">
            {/* Map Header Status */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                  GPS SATELLITE TELEMATICS ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {currentOrder.status === 'delivered'
                    ? 'Delivered'
                    : `Est. ETA: ~${currentOrder.etaMinutes} mins`}
                </span>
              </div>
            </div>

            {/* Interactive SVG Map Container */}
            <div className="relative mt-4 bg-stone-950/80 rounded-xl p-2 sm:p-4 border border-stone-800 aspect-16/10 sm:aspect-16/9 flex items-center justify-center overflow-hidden">
              {/* Subtle Map Grid lines */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              <svg
                viewBox="0 0 600 320"
                className="w-full h-full drop-shadow-md select-none"
              >
                <defs>
                  {/* Route Gradient */}
                  <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                </defs>

                {/* Country roads / topography background strokes */}
                <path
                  d="M 20 280 Q 150 290 280 250 T 560 270"
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
                <path
                  d="M 50 60 Q 200 40 380 90 T 580 40"
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                {/* Main Errand Route Path */}
                <path
                  d="M 80 220 Q 200 130 340 180 T 520 90"
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 220 Q 200 130 340 180 T 520 90"
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Origin: Farm Gate */}
                <g transform="translate(80, 220)">
                  <circle r="22" fill="#065f46" opacity="0.4" className="animate-ping" />
                  <circle r="16" fill="#047857" stroke="#34d399" strokeWidth="2" />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    🚜
                  </text>
                  <text
                    x="0"
                    y="32"
                    textAnchor="middle"
                    fill="#a7f3d0"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    Farm Gate
                  </text>
                </g>

                {/* Destination: Customer Doorstep */}
                <g transform="translate(520, 90)">
                  <circle r="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    🏡
                  </text>
                  <text
                    x="0"
                    y="30"
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    Your Door
                  </text>
                </g>

                {/* Moving Errand Courier Marker */}
                <g
                  transform={`translate(${currentRunnerX}, ${currentRunnerY})`}
                  style={{ transition: 'all 1s ease-in-out' }}
                >
                  <circle
                    r="24"
                    fill="#f59e0b"
                    opacity="0.3"
                    className="animate-pulse-glow"
                  />
                  <circle
                    r="15"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="shadow-lg"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="10"
                    fontWeight="black"
                  >
                    ⚡
                  </text>
                  <rect
                    x="-40"
                    y="-30"
                    width="80"
                    height="18"
                    rx="9"
                    fill="#0f172a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-18"
                    textAnchor="middle"
                    fill="#fef3c7"
                    fontSize="8.5"
                    fontWeight="bold"
                  >
                    Runner Julian
                  </text>
                </g>
              </svg>

              {/* In-Map Telematics Floating Badges */}
              <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md border border-stone-700 rounded-lg p-2 text-[11px] flex items-center gap-3">
                <div className="flex items-center gap-1 text-emerald-400">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>Insulated Box: 7.8°C</span>
                </div>
                <div className="w-px h-3 bg-stone-700" />
                <div className="flex items-center gap-1 text-amber-300">
                  <Bike className="w-3.5 h-3.5" />
                  <span>Speed: {currentOrder.status === 'delivered' ? '0' : '29'} km/h</span>
                </div>
              </div>

              <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-md border border-stone-700 rounded-lg px-2.5 py-1 text-[11px] text-stone-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Direct Farm Dispatch</span>
              </div>
            </div>

            {/* Simulation Controller Action Bar */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-medium">Demo Testing Tool:</span>
                <button
                  onClick={() => advanceOrderTracking(currentOrder.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Advance Courier Step</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCallModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Courier</span>
                </button>

                <button
                  onClick={() => setShowPayoutProof(true)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Farmer Payout Proof</span>
                </button>
              </div>
            </div>
          </div>

          {/* Courier Card & Direct Errands Promise */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentOrder.courier.avatar}
                alt={currentOrder.courier.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-stone-900 text-sm">
                    {currentOrder.courier.name}
                  </h4>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-sm">
                    ★ {currentOrder.courier.rating}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  {currentOrder.courier.vehicle} • Plate: {currentOrder.courier.vehiclePlate}
                </p>
                <p className="text-[11px] text-emerald-800 font-medium flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Certified Fresh-Handling Errand Runner</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCallModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Contact Courier ({currentOrder.courier.phone})</span>
            </button>
          </div>
        </div>

        {/* Right Column: Checkpoint Timeline & Errand Basket Checklist (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Timeline Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <h3 className="font-bold text-base text-stone-900 font-display mb-4 flex items-center justify-between">
              <span>Errand Progress Timeline</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Order #{currentOrder.orderNumber}
              </span>
            </h3>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {currentOrder.checkpoints.map((cp, idx) => (
                <div key={idx} className="relative">
                  {/* Indicator Dot */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      cp.isCurrent
                        ? 'bg-amber-400 border-amber-600 text-stone-950 animate-bounce'
                        : cp.isCompleted
                        ? 'bg-emerald-600 border-white text-white'
                        : 'bg-stone-100 border-stone-300 text-stone-400'
                    }`}
                  >
                    {cp.isCompleted ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h5
                        className={`text-xs font-bold ${
                          cp.isCurrent
                            ? 'text-amber-900 font-extrabold'
                            : cp.isCompleted
                            ? 'text-stone-900'
                            : 'text-stone-600'
                        }`}
                      >
                        {cp.label}
                      </h5>
                      <span className="text-[10px] text-stone-600">{cp.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                      {cp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Errand Checklist & Crop Items */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-emerald-700" />
                <span>Items in Errand Basket ({currentOrder.items.length})</span>
              </h4>
              <span className="text-xs font-black text-emerald-900">
                ${currentOrder.subtotal.toFixed(2)}
              </span>
            </div>

            <div className="divide-y divide-stone-100 max-h-56 overflow-y-auto pr-1">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-start gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 truncate">
                      {item.quantity}x {item.product.name}
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      From {item.product.farmName}
                    </p>
                    {item.errandNote && (
                      <p className="text-[10px] text-amber-800 bg-amber-50 p-1 rounded-sm mt-1 border border-amber-200">
                        Errand Note: "{item.errandNote}"
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-stone-800">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery address & errand instructions */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Destination: {currentOrder.deliveryDetails.deliveryAddress}</span>
              </div>
              {currentOrder.deliveryDetails.specialErrandInstructions && (
                <p className="text-[11px] text-stone-600 pl-5">
                  Errand note: {currentOrder.deliveryDetails.specialErrandInstructions}
                </p>
              )}
            </div>

            {/* Farmer Direct Assurance Ribbon */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-xs flex items-center justify-between">
              <div>
                <p className="font-bold text-emerald-200">100% Direct To Farmer</p>
                <p className="text-[10px] text-emerald-100/80">
                  Zero commission deducted. Ref #{currentOrder.farmerPayoutConfirmationId.substring(0, 15)}...
                </p>
              </div>
              <button
                onClick={() => setShowPayoutProof(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Call Simulation Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-bounce">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900">
                Calling Courier {currentOrder.courier.name}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Encrypted errand line: {currentOrder.courier.phone}
              </p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 text-left border border-stone-200">
              <p className="font-semibold text-stone-900 mb-1">Direct Runner Communication:</p>
              <p>
                "Hello! This is Julian. I am currently riding down the Valley Highway with your insulated fresh crop crate. Will reach your doorstep in about {currentOrder.etaMinutes} minutes!"
              </p>
            </div>
            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors"
            >
              Close Call
            </button>
          </div>
        </div>
      )}

      {/* Payout Proof Modal */}
      {showPayoutProof && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-stone-900 font-display">
                  Official Direct Farmer Settlement
                </h3>
              </div>
              <button
                onClick={() => setShowPayoutProof(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 space-y-1">
                <p className="font-bold flex items-center justify-between">
                  <span>Settlement Status:</span>
                  <span className="text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-full font-black">
                    SETTLED 100%
                  </span>
                </p>
                <p className="text-[11px] text-emerald-800">
                  Transaction Ref: {currentOrder.farmerPayoutConfirmationId}
                </p>
              </div>

              <div className="divide-y divide-stone-100 text-stone-700">
                <div className="py-2 flex justify-between">
                  <span>Gross Crop Value:</span>
                  <span className="font-bold text-stone-900">
                    {currentOrder.subtotalEtb ? `${currentOrder.subtotalEtb.toLocaleString()} ETB` : `$${currentOrder.subtotal.toFixed(2)}`}
                  </span>
                </div>
                <div className="py-2 flex justify-between text-emerald-700 font-semibold">
                  <span>LUCY AGRICULTURE Middleman Cut:</span>
                  <span className="font-bold">0.00 ETB (0.0%)</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Direct Payment Method:</span>
                  <span className="font-bold text-emerald-800 uppercase">
                    {currentOrder.paymentMethod === 'telebirr' ? 'Telebirr Mobile Wallet' : currentOrder.paymentMethod === 'cbe' ? 'Commercial Bank of Ethiopia (CBE)' : currentOrder.paymentMethod === 'bank_of_abyssinia' ? 'Bank of Abyssinia (BOA)' : currentOrder.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                <div className="py-2 flex justify-between text-sm font-black text-emerald-950 bg-emerald-100/50 p-2.5 rounded-xl">
                  <span>Direct Wire Sent to Farmer:</span>
                  <span>
                    {currentOrder.totalEtb ? `${currentOrder.totalEtb.toLocaleString()} ETB` : `$${(currentOrder.subtotal + currentOrder.farmerTip).toFixed(2)}`}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 italic">
                * Lucy Agriculture Corp guarantees that zero commissions or hidden fees are deducted. Funds are transferred via Telebirr, CBE, or Bank of Abyssinia direct settlement rails.
              </p>
            </div>

            <button
              onClick={() => setShowPayoutProof(false)}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
