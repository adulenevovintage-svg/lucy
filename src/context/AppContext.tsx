import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Farmer,
  Product,
  CartItem,
  Order,
  AppNotification,
  CropCategory,
  DeliveryDetails,
  OrderStatus,
  PaymentMethodType,
} from '../types';
import {
  INITIAL_FARMERS,
  INITIAL_PRODUCTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVE_ORDER,
} from '../data/mockData';
import { sound } from '../utils/sound';

interface AppContextType {
  // State
  farmers: Farmer[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  notifications: AppNotification[];
  activeTab: 'marketplace' | 'tracking' | 'farmer_portal' | 'zero_middleman_manifesto' | 'my_orders';
  selectedCategory: CropCategory;
  searchQuery: string;
  filterOrganic: boolean;
  filterHarvestToday: boolean;
  currency: 'ETB' | 'USD';
  activeFarmerModal: Farmer | null;
  activeProductModal: Product | null;
  isCheckoutModalOpen: boolean;
  isFarmerRegisterModalOpen: boolean;
  isAddCropModalOpen: boolean;
  isNotificationDrawerOpen: boolean;
  activeTrackingOrderId: string | null;

  // Setters & Actions
  setActiveTab: (tab: 'marketplace' | 'tracking' | 'farmer_portal' | 'zero_middleman_manifesto' | 'my_orders') => void;
  setSelectedCategory: (cat: CropCategory) => void;
  setSearchQuery: (query: string) => void;
  setFilterOrganic: (val: boolean) => void;
  setFilterHarvestToday: (val: boolean) => void;
  setCurrency: (cur: 'ETB' | 'USD') => void;
  formatPrice: (usd: number, etb?: number) => string;
  setActiveFarmerModal: (farmer: Farmer | null) => void;
  setActiveProductModal: (product: Product | null) => void;
  setIsCheckoutModalOpen: (open: boolean) => void;
  setIsFarmerRegisterModalOpen: (open: boolean) => void;
  setIsAddCropModalOpen: (open: boolean) => void;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  setActiveTrackingOrderId: (orderId: string | null) => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number, errandNote?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  updateCartErrandNote: (productId: string, errandNote: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartSubtotalEtb: number;

  // Order operations
  placeOrder: (
    deliveryDetails: DeliveryDetails,
    paymentMethod: PaymentMethodType,
    farmerTip: number
  ) => Order;
  advanceOrderTracking: (orderId: string) => void;

  // Farmer operations
  registerFarmer: (data: Omit<Farmer, 'id' | 'rating' | 'reviewsCount' | 'verifiedBadge' | 'totalEarningsDirect' | 'activeCropsCount'>) => Farmer;
  addFarmerProduct: (data: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'farmerDirectCutPercent'>) => Product;

  // Notification operations
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
  addNotification: (title: string, message: string, type: AppNotification['type'], orderId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FARMERS: 'lucy_agri_farmers_v2',
  PRODUCTS: 'lucy_agri_products_v2',
  CART: 'lucy_agri_cart_v2',
  ORDERS: 'lucy_agri_orders_v2',
  NOTIFICATIONS: 'lucy_agri_notifications_v2',
  CURRENCY: 'lucy_agri_currency_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or fallback to defaults
  const [farmers, setFarmers] = useState<Farmer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FARMERS);
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : [INITIAL_ACTIVE_ORDER];
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [currency, setCurrency] = useState<'ETB' | 'USD'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
    return saved === 'USD' ? 'USD' : 'ETB';
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'marketplace' | 'tracking' | 'farmer_portal' | 'zero_middleman_manifesto' | 'my_orders'>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterHarvestToday, setFilterHarvestToday] = useState(false);

  const [activeFarmerModal, setActiveFarmerModal] = useState<Farmer | null>(null);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isFarmerRegisterModalOpen, setIsFarmerRegisterModalOpen] = useState(false);
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('order-sample-1');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  // Price formatter helper
  const formatPrice = (usd: number, etb?: number): string => {
    if (currency === 'ETB') {
      const etbVal = etb !== undefined ? etb : Math.round(usd * 125);
      return `${etbVal.toLocaleString()} ETB`;
    }
    return `$${usd.toFixed(2)}`;
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1, errandNote: string = '') => {
    sound.playChime();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, errandNote: errandNote || item.errandNote }
            : item
        );
      }
      return [...prev, { product, quantity, errandNote }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const updateCartErrandNote = (productId: string, errandNote: string) => {
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, errandNote } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = Number(cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2));
  const cartSubtotalEtb = Math.round(cart.reduce((acc, item) => acc + (item.product.priceEtb || Math.round(item.product.price * 125)) * item.quantity, 0));

  // Add Notification helper
  const addNotification = (
    title: string,
    message: string,
    type: AppNotification['type'],
    orderId?: string
  ) => {
    sound.playDispatch();
    const newNotif: AppNotification = {
      id: `n-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
      orderId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Place Order with Telebirr, CBE, BOA, etc.
  const placeOrder = (
    deliveryDetails: DeliveryDetails,
    paymentMethod: PaymentMethodType,
    farmerTip: number
  ): Order => {
    const errandDeliveryFee = deliveryDetails.type === 'express_runner' ? 3.50 : 2.50;
    const errandDeliveryFeeEtb = deliveryDetails.type === 'express_runner' ? 440 : 310;
    const farmerTipEtb = Math.round(farmerTip * 125);
    const subtotal = cartSubtotal;
    const subtotalEtb = cartSubtotalEtb;
    const total = Number((subtotal + errandDeliveryFee + farmerTip).toFixed(2));
    const totalEtb = subtotalEtb + errandDeliveryFeeEtb + farmerTipEtb;
    const orderNum = `LC-${Math.floor(1000 + Math.random() * 9000)}`;

    const paymentPrefixMap: Record<PaymentMethodType, string> = {
      telebirr: 'TELEBIRR-DIR',
      cbe: 'CBE-DIRECT',
      bank_of_abyssinia: 'BOA-DIRECT',
      credit_card: 'CARD-DIRECT',
      cash_errands: 'CASH-ESCROW',
    };

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: 'Just now',
      items: [...cart],
      subtotal,
      subtotalEtb,
      errandDeliveryFee,
      errandDeliveryFeeEtb,
      farmerDirectEarnings: subtotal,
      middlemanCommission: 0.00,
      farmerTip,
      farmerTipEtb,
      total,
      totalEtb,
      deliveryDetails,
      paymentMethod,
      paymentReference: `${paymentPrefixMap[paymentMethod]}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      status: 'order_confirmed',
      etaMinutes: deliveryDetails.type === 'express_runner' ? 32 : 55,
      courier: {
        name: 'Julian Vance (Farm Runner #08)',
        phone: '+251 92 892 4112',
        vehicle: 'Electric Cargo Scooter with Insulated Farm Box',
        vehiclePlate: 'ET-AGRI-742',
        rating: 4.97,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      checkpoints: [
        {
          status: 'order_confirmed',
          label: 'Direct Order Received by Farmer',
          description: `Order transmitted to farmer. $${subtotal.toFixed(2)} earmarked directly without platform deduction.`,
          timestamp: 'Just now',
          isCompleted: true,
          isCurrent: true,
        },
        {
          status: 'farmer_harvesting',
          label: 'Farmer Packing Fresh Harvest',
          description: 'Farmer is personally selecting, weighing, and packing your crops.',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: 'courier_picked_up',
          label: 'Errand Runner Farm Handoff',
          description: 'Courier arrives at farm gate and inspects crate freshness.',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: 'in_transit',
          label: 'Direct Transit to Destination',
          description: 'Courier riding direct route with zero intermediate warehouse stops.',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: 'delivered',
          label: 'Doorstep Delivery Complete',
          description: 'Fresh crops safely handed over at your doorstep.',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false,
        },
      ],
      farmerPayoutConfirmationId: `DIR-PAYOUT-${Math.random().toString(36).substring(2, 7).toUpperCase()}-VERIFIED`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrder.id);
    clearCart();

    // Trigger celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#16a34a', '#eab308', '#f97316'],
      });
    } catch {
      // Confetti fallback
    }

    sound.playSuccess();

    // Notify user & farmer
    addNotification(
      `Order ${orderNum} Confirmed!`,
      `Your direct errand order is with the farmer. 100% of product price ($${subtotal.toFixed(2)}) routed directly to farmer.`,
      'order',
      newOrder.id
    );

    // Auto update farmer total earnings
    const primaryFarmerId = cart[0]?.product.farmerId;
    if (primaryFarmerId) {
      setFarmers((prev) =>
        prev.map((f) =>
          f.id === primaryFarmerId
            ? { ...f, totalEarningsDirect: f.totalEarningsDirect + subtotal }
            : f
        )
      );
    }

    return newOrder;
  };

  // Advance simulation tracking step
  const advanceOrderTracking = (orderId: string) => {
    const steps: OrderStatus[] = [
      'order_confirmed',
      'farmer_harvesting',
      'courier_picked_up',
      'in_transit',
      'delivered',
    ];

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const currentIdx = steps.indexOf(ord.status);
        if (currentIdx === -1 || currentIdx >= steps.length - 1) {
          // Reset to beginning or loop for testing
          return {
            ...ord,
            status: 'order_confirmed',
            etaMinutes: 35,
            checkpoints: ord.checkpoints.map((cp, idx) => ({
              ...cp,
              isCompleted: idx === 0,
              isCurrent: idx === 0,
              timestamp: idx === 0 ? 'Just now' : 'Pending',
            })),
          };
        }

        const nextStatus = steps[currentIdx + 1];
        const nextEta = Math.max(0, ord.etaMinutes - 8);
        const updatedCheckpoints = ord.checkpoints.map((cp, idx) => {
          if (idx <= currentIdx + 1) {
            return {
              ...cp,
              isCompleted: idx < currentIdx + 1,
              isCurrent: idx === currentIdx + 1,
              timestamp: idx <= currentIdx + 1 ? 'Just now' : cp.timestamp,
            };
          }
          return { ...cp, isCompleted: false, isCurrent: false };
        });

        sound.playDispatch();

        const statusDescriptions: Record<OrderStatus, string> = {
          order_confirmed: 'Order accepted by farm',
          farmer_harvesting: 'Farmer is currently packing your fresh harvest crate!',
          courier_picked_up: 'Runner Julian collected the crate from farm gate!',
          in_transit: 'Runner Julian is on the highway heading to your address!',
          delivered: 'Runner has delivered your fresh farm crate! Enjoy farm freshness.',
        };

        addNotification(
          `Order ${ord.orderNumber} Status Updated`,
          statusDescriptions[nextStatus],
          'order',
          ord.id
        );

        return {
          ...ord,
          status: nextStatus,
          etaMinutes: nextEta,
          checkpoints: updatedCheckpoints,
        };
      })
    );
  };

  // Register farmer
  const registerFarmer = (
    data: Omit<Farmer, 'id' | 'rating' | 'reviewsCount' | 'verifiedBadge' | 'totalEarningsDirect' | 'activeCropsCount'>
  ): Farmer => {
    const newFarmer: Farmer = {
      ...data,
      id: `f-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      verifiedBadge: true,
      totalEarningsDirect: 0,
      activeCropsCount: 0,
    };
    setFarmers((prev) => [newFarmer, ...prev]);
    addNotification(
      'Farmer Registered Successfully!',
      `Welcome ${newFarmer.name} to Lucy Agriculture Corp. 100% direct payouts activated.`,
      'farmer_announcement'
    );
    sound.playSuccess();
    return newFarmer;
  };

  // Add Farmer Crop
  const addFarmerProduct = (
    data: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'farmerDirectCutPercent'>
  ): Product => {
    const newProd: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      farmerDirectCutPercent: 100,
    };
    setProducts((prev) => [newProd, ...prev]);

    // Update farmer crops count
    setFarmers((prev) =>
      prev.map((f) =>
        f.id === data.farmerId ? { ...f, activeCropsCount: f.activeCropsCount + 1 } : f
      )
    );

    addNotification(
      'New Crop Listed for Direct Delivery',
      `${data.name} listed from ${data.farmName} at $${data.price.toFixed(2)}/${data.unit}.`,
      'harvest'
    );
    sound.playSuccess();
    return newProd;
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        farmers,
        products,
        cart,
        orders,
        notifications,
        activeTab,
        selectedCategory,
        searchQuery,
        filterOrganic,
        filterHarvestToday,
        currency,
        activeFarmerModal,
        activeProductModal,
        isCheckoutModalOpen,
        isFarmerRegisterModalOpen,
        isAddCropModalOpen,
        isNotificationDrawerOpen,
        activeTrackingOrderId,

        setActiveTab,
        setSelectedCategory,
        setSearchQuery,
        setFilterOrganic,
        setFilterHarvestToday,
        setCurrency,
        formatPrice,
        setActiveFarmerModal,
        setActiveProductModal,
        setIsCheckoutModalOpen,
        setIsFarmerRegisterModalOpen,
        setIsAddCropModalOpen,
        setIsNotificationDrawerOpen,
        setActiveTrackingOrderId,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartErrandNote,
        clearCart,
        cartCount,
        cartSubtotal,
        cartSubtotalEtb,

        placeOrder,
        advanceOrderTracking,

        registerFarmer,
        addFarmerProduct,

        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
