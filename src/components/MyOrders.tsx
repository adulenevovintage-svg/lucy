import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import {
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Printer,
  ChevronRight,
  Sparkles,
  Tractor,
} from 'lucide-react';

export const MyOrders: React.FC = () => {
  const { orders, setActiveTrackingOrderId, setActiveTab } = useApp();
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(
    null
  );

  const handleTrack = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setActiveTab('tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">
            My Direct Farm Errands & Receipts
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track active deliveries, view driver telematics, and download official 100% Direct Farmer settlement receipts.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('marketplace')}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>New Farm Errand Order</span>
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const isDelivered = order.status === 'delivered';
          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-stone-900">
                        Order #{order.orderNumber}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isDelivered
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-2">
                      <span>{order.createdAt}</span>
                      <span>•</span>
                      <span className="font-bold text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {order.paymentMethod === 'cbe' ? 'Commercial Bank of Ethiopia (CBE)' : order.paymentMethod === 'telebirr' ? 'Telebirr Instant' : order.paymentMethod === 'bank_of_abyssinia' ? 'Bank of Abyssinia' : order.paymentMethod.replace('_', ' ')}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTrack(order.id)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Track Errand Live</span>
                  </button>

                  <button
                    onClick={() => setSelectedReceiptOrder(order)}
                    className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span>Receipt &amp; Wire Proof</span>
                  </button>
                </div>
              </div>

              {/* Items in this order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 bg-stone-50 rounded-xl border border-stone-200/60"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-stone-900 truncate">
                        {item.quantity}x {item.product.name}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        {item.product.farmName}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {item.product.priceEtb ? `${(item.product.priceEtb * item.quantity).toLocaleString()} ETB` : `$${(item.product.price * item.quantity).toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer & Direct Payout Stamp */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    100% Crop Value ({order.subtotalEtb ? `${order.subtotalEtb.toLocaleString()} ETB` : `$${order.subtotal.toFixed(2)}`}) Wired Directly to Local Farmer • 0% Middleman Fee
                  </span>
                </div>

                <div className="flex items-baseline gap-2 self-end sm:self-auto">
                  <span className="text-stone-500">Total Authorized:</span>
                  <span className="text-base font-black text-stone-950">
                    {order.totalEtb ? `${order.totalEtb.toLocaleString()} ETB` : `$${order.total.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setSelectedReceiptOrder(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 text-lg font-bold"
            >
              ✕
            </button>

            {/* Receipt Header */}
            <div className="text-center pb-4 border-b border-stone-200 space-y-1">
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
                Official Direct Payout Invoice
              </span>
              <h2 className="text-xl font-black text-stone-900 font-display">
                LUCY AGRICULTURE CORP
              </h2>
              <p className="text-[11px] text-stone-500">
                Direct Farm-to-Consumer Errand Platform • Zero Middleman Certified
              </p>
              <p className="text-xs font-bold font-mono text-stone-800 pt-1">
                ORDER #{selectedReceiptOrder.orderNumber}
              </p>
            </div>

            {/* Invoice Line Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between font-bold text-stone-500 uppercase text-[10px] pb-1 border-b border-stone-100">
                <span>Crop Description</span>
                <span>Direct Farmer Cut</span>
              </div>

              {selectedReceiptOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <span className="font-bold text-stone-900">
                      {item.quantity}x {item.product.name}
                    </span>
                    <p className="text-[10px] text-stone-500">
                      Farm: {item.product.farmName}
                    </p>
                  </div>
                  <span className="font-bold text-stone-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-stone-200 space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Gross Crop Subtotal:</span>
                  <span className="font-bold text-stone-900">
                    ${selectedReceiptOrder.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Lucy Agriculture Platform Cut:</span>
                  <span>$0.00 (0.00%)</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Errand Runner Delivery Dispatch:</span>
                  <span className="font-bold text-stone-900">
                    ${selectedReceiptOrder.errandDeliveryFee.toFixed(2)}
                  </span>
                </div>
                {selectedReceiptOrder.farmerTip > 0 && (
                  <div className="flex justify-between text-amber-900 font-semibold">
                    <span>Direct Farmer Tip Bonus:</span>
                    <span>+${selectedReceiptOrder.farmerTip.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between font-black text-sm text-stone-950">
                  <span>Total Paid:</span>
                  <span className="text-base text-emerald-950">
                    ${selectedReceiptOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Settlement Wire Reference Stamp */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1 text-[11px]">
                <p className="font-bold text-stone-900 flex items-center justify-between">
                  <span>Direct Bank Settlement Ref:</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {selectedReceiptOrder.farmerPayoutConfirmationId}
                  </span>
                </p>
                <p className="text-stone-500">
                  Payment Gateway: {selectedReceiptOrder.paymentMethod.toUpperCase()} • Direct Wire Authenticated
                </p>
                <p className="text-stone-500">
                  Destination: {selectedReceiptOrder.deliveryDetails.deliveryAddress}
                </p>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Tax Receipt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
