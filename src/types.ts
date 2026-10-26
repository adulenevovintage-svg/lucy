export type EthiopianBankProvider =
  | 'telebirr'
  | 'commercial_bank_of_ethiopia'
  | 'bank_of_abyssinia'
  | 'awash_bank'
  | 'other';

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  region: string;
  distanceKm: number;
  establishedYear: number;
  rating: number;
  reviewsCount: number;
  verifiedBadge: boolean;
  phone: string;
  email: string;
  acres: number;
  certifications: string[];
  bankAccount: {
    provider: EthiopianBankProvider;
    bankName: string;
    accountNumberMasked: string;
    accountHolder: string;
    payoutRouting: string;
  };
  totalEarningsDirect: number;
  activeCropsCount: number;
  story: string;
}

export type CropCategory =
  | 'All'
  | 'Fresh Vegetables'
  | 'Orchard Fruits'
  | 'Grains & Pulses'
  | 'Farm Dairy & Eggs'
  | 'Fresh Herbs'
  | 'Tubers & Roots'
  | 'Pantry Harvest';

export type HarvestStatus = 'Freshly Harvested Today' | 'Morning Picked' | 'Field Standing - Pick On Order';

export interface Product {
  id: string;
  name: string;
  category: CropCategory;
  farmerId: string;
  farmerName: string;
  farmName: string;
  farmerAvatar: string;
  farmerLocation: string;
  price: number; // in USD or base
  priceEtb: number; // in Ethiopian Birr (ETB)
  unit: string; // e.g. "kg", "500g bunch", "dozen", "5kg sack"
  image: string;
  description: string;
  harvestDate: string;
  harvestTimeAgo: string;
  harvestStatus: HarvestStatus;
  stockQuantity: number;
  isOrganic: boolean;
  nutritionalHighlights: string[];
  supermarketEquivPrice: number;
  supermarketEquivPriceEtb: number;
  farmerDirectCutPercent: number; // Always 100%
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  errandNote?: string;
}

export type DeliveryType = 'express_runner' | 'morning_slot' | 'scheduled_bulk';

export interface DeliveryDetails {
  type: DeliveryType;
  fullName: string;
  phone: string;
  deliveryAddress: string;
  landmark?: string;
  specialErrandInstructions?: string;
  preferredTimeWindow?: string;
}

export type OrderStatus =
  | 'order_confirmed'
  | 'farmer_harvesting'
  | 'courier_picked_up'
  | 'in_transit'
  | 'delivered';

export interface TrackingCheckpoint {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export type PaymentMethodType =
  | 'telebirr'
  | 'cbe'
  | 'bank_of_abyssinia'
  | 'credit_card'
  | 'cash_errands';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  subtotalEtb: number;
  errandDeliveryFee: number;
  errandDeliveryFeeEtb: number;
  farmerDirectEarnings: number; // 100% of crop subtotal
  middlemanCommission: number; // strictly $0.00
  total: number;
  totalEtb: number;
  farmerTip: number;
  farmerTipEtb: number;
  deliveryDetails: DeliveryDetails;
  paymentMethod: PaymentMethodType;
  paymentReference: string;
  status: OrderStatus;
  etaMinutes: number;
  courier: {
    name: string;
    phone: string;
    vehicle: string;
    vehiclePlate: string;
    rating: number;
    avatar: string;
  };
  checkpoints: TrackingCheckpoint[];
  farmerPayoutConfirmationId: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'harvest' | 'payout' | 'farmer_announcement';
  read: boolean;
  orderId?: string;
}
