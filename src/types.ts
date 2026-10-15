export type UserRole = 'SUPER_ADMIN' | 'SUPPLIER_ADMIN' | 'CUSTOMER';

export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  image: string;
  subtitle?: string;
  inStockCount?: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  categorySlug: 'electronics' | 'audio' | 'desk' | 'wearables' | 'home' | 'apparel' | 'lighting' | 'carry';
  department: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  discountPercent?: number;
  rating: number;
  reviewCount: number | string;
  image: string;
  images?: string[];
  badge?: string;
  badgeType?: 'stock' | 'staff' | 'limited' | 'artisan';
  isFlashDrop?: boolean;
  stockAllocationPercent?: number;
  stockClaimedText?: string;
  description?: string;
  sku: string;
  variants?: ProductVariant[];
  supplierId?: string;
  supplierName?: string;
  approvalStatus?: 'APPROVED' | 'PENDING_REVIEW' | 'REJECTED';
  isFeatured?: boolean;
  inStockCount?: number;
  specs?: {
    playtime?: string;
    anc?: string;
    bluetooth?: string;
    driver?: string;
    warranty?: string;
  };
}

export interface Supplier {
  id: string;
  name: string;
  contactName?: string;
  companyName: string;
  email: string;
  phone: string;
  gstin: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  adminAccessGranted: boolean;
  commissionRate: number; // e.g. 12%
  joinedDate: string;
  productsCount: number;
  totalRevenue: number;
  avatar: string;
  rating: number;
  city: string;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  discountPercent: number;
  discountType: 'PERCENTAGE' | 'FLAT_INR';
  minOrderAmount: number;
  expiryDate: string;
  active: boolean;
  appliedCount: number;
  description: string;
  bannerTag?: string;
}

export interface EmailNotificationConfig {
  superAdminEmail: string;
  notifyOnNewOrder: boolean;
  notifyOnLowStock: boolean;
  notifyOnSupplierSignup: boolean;
  notifyOnPriceDrop: boolean;
  notifyOnConsignmentDispatched: boolean;
  smtpServer: string;
  smtpPort: number;
  smtpUser: string;
  isSimulatedMode: boolean;
}

export interface EmailLogItem {
  id: string;
  timestamp: string;
  toEmail: string;
  subject: string;
  templateType: 'NEW_ORDER' | 'LOW_STOCK' | 'SUPPLIER_INVITE' | 'FLASH_OFFER' | 'CONSIGNMENT_STATUS';
  previewText: string;
  htmlBody: string;
  status: 'DELIVERED' | 'QUEUED' | 'SIMULATED';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface OrderItem {
  id: string;
  productTitle: string;
  variantDetails: string;
  price: number;
  quantity: number;
  image: string;
  isReviewed?: boolean;
  reviewRating?: number;
  supplierId?: string;
}

export interface Order {
  id: string;
  referenceNumber: string;
  date: string;
  deliveryDate?: string;
  status: 'In Transit' | 'Delivered' | 'Cancelled' | 'Processing';
  statusLabel: string;
  paymentMethod: string;
  totalAmount: number;
  carrierAwBill?: string;
  estimatedDelivery?: string;
  currentLocation?: string;
  timelineStep?: number;
  items: OrderItem[];
  refundStatus?: string;
  trackingUpdates?: { time: string; text: string; location: string }[];
  customerEmail?: string;
  customerName?: string;
  shippingAddress?: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  tier: string;
  points: number;
  avatar: string;
  memberSince: string;
  activeOrdersCount: number;
  totalOrdersCount: number;
  savedPlacesCount: number;
  phone: string;
  defaultAddress: string;
}

export interface MerchantTelemetry {
  totalRevenue: number;
  revenueChangePercent: number;
  grossOrders: number;
  ordersChangePercent: number;
  conversionRate: number;
  avgOrderValue: number;
  aovChange: number;
  criticalSkusCount: number;
  pendingPick: number;
  packedAndStaged: number;
  enRoute: number;
}
