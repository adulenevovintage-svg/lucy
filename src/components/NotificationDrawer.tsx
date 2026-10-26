import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  CheckCheck,
  Package,
  Sprout,
  DollarSign,
  AlertCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
    setActiveTrackingOrderId,
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const handleNotificationClick = (notif: (typeof notifications)[0]) => {
    markNotificationRead(notif.id);
    if (notif.orderId) {
      setActiveTrackingOrderId(notif.orderId);
      setActiveTab('tracking');
      setIsNotificationDrawerOpen(false);
    }
  };

  const getIcon = (type: (typeof notifications)[0]['type']) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-emerald-600" />;
      case 'harvest':
        return <Sprout className="w-4 h-4 text-amber-500" />;
      case 'payout':
        return <DollarSign className="w-4 h-4 text-teal-600" />;
      case 'farmer_announcement':
        return <AlertCircle className="w-4 h-4 text-emerald-700" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsNotificationDrawerOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-800" />
              <h2 className="font-bold text-base text-stone-900 font-display">
                Real-Time Errand Notifications
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-stone-500 text-xs">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    n.read
                      ? 'bg-stone-50/70 border-stone-200 text-stone-600 hover:bg-stone-100'
                      : 'bg-emerald-50/80 border-emerald-300 text-stone-900 shadow-xs hover:bg-emerald-100/60'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      n.read ? 'bg-stone-200 text-stone-600' : 'bg-white shadow-xs'
                    }`}
                  >
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs ${
                          n.read ? 'font-semibold' : 'font-bold text-emerald-950'
                        }`}
                      >
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-stone-600 shrink-0">
                        {n.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                      {n.message}
                    </p>
                    {n.orderId && (
                      <p className="text-[10px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1 hover:underline">
                        <span>View Live Errand Tracker</span>
                        <ArrowRight className="w-3 h-3" />
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 text-center">
            <p className="text-[11px] text-stone-600">
              Direct telemetry events pushed in real-time from farm dispatch stations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
