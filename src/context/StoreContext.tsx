import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ProductVariant, 
  CartItem, 
  Order, 
  CustomerProfile, 
  MerchantTelemetry, 
  UserRole, 
  Supplier, 
  Offer, 
  EmailNotificationConfig, 
  EmailLogItem 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CUSTOMER, 
  INITIAL_ORDERS, 
  INITIAL_TELEMETRY,
  INITIAL_SUPPLIERS,
  INITIAL_OFFERS,
  INITIAL_EMAIL_CONFIG,
  INITIAL_EMAIL_LOGS
} from '../data/mockData';

export type ActivePage = 
  | 'shop' 
  | 'categories' 
  | 'deals' 
  | 'track-order' 
  | 'admin-portal' 
  | 'pdp'
  | 'super-admin'
  | 'supplier-portal'
  | 'oracle-console';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface StoreContextType {
  // Navigation & Role Switching
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedProductId: string;
  openProductDetail: (productId: string) => void;

  // Catalog & Product Operations
  products: Product[];
  addNewProduct: (product: Product) => void;
  updateProductDiscount: (productId: string, discountPercent: number) => void;
  triggerFlashOffer: (productId: string, discountPercent: number) => void;
  approveSupplierProduct: (productId: string, approved: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  activeQuickFilters: {
    under10k: boolean;
    topRated: boolean;
    freeShipping: boolean;
    inStock: boolean;
  };
  toggleQuickFilter: (filterKey: 'under10k' | 'topRated' | 'freeShipping' | 'inStock') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;

  // Cart & Offers
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartDiscount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Offers Engine (Super Admin Controlled)
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id' | 'appliedCount'>) => void;
  toggleOffer: (offerId: string) => void;
  deleteOffer: (offerId: string) => void;

  // Suppliers Management (Super Admin Controlled)
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id' | 'joinedDate' | 'productsCount' | 'totalRevenue' | 'rating'>) => void;
  toggleSupplierAdminAccess: (supplierId: string) => void;
  updateSupplierCommission: (supplierId: string, rate: number) => void;
  currentSupplierId: string;
  setCurrentSupplierId: (id: string) => void;

  // Email Notification Center (Super Admin Controlled)
  emailConfig: EmailNotificationConfig;
  updateEmailConfig: (config: Partial<EmailNotificationConfig>) => void;
  emailLogs: EmailLogItem[];
  triggerTestEmail: (templateType: EmailLogItem['templateType']) => void;
  deleteEmailLog: (id: string) => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Orders & Customer
  customer: CustomerProfile;
  orders: Order[];
  activeOrder: Order;
  selectedOrderForModal: Order | null;
  setSelectedOrderForModal: (order: Order | null) => void;
  isGpsModalOpen: boolean;
  setIsGpsModalOpen: (open: boolean) => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  placeOrder: (paymentMethod: string, address: string) => Order;

  // Telemetry
  telemetry: MerchantTelemetry;

  // Aura Assistant Concierge Chat
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isChatMinimized: boolean;
  setIsChatMinimized: (min: boolean) => void;
  chatMessages: ChatMessage[];
  sendMessage: (text: string) => void;

  // Global Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('shop');
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [selectedProductId, setSelectedProductId] = useState<string>('soundpro-anc');

  // Products
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [activeQuickFilters, setActiveQuickFilters] = useState({
    under10k: false,
    topRated: false,
    freeShipping: false,
    inStock: false,
  });
  const [sortBy, setSortBy] = useState<string>('Featured Curations');

  // Multi-Vendor Suppliers State
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [currentSupplierId, setCurrentSupplierId] = useState<string>('sup-1');

  // Offers & Coupons State
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);

  // Email Notifications State
  const [emailConfig, setEmailConfig] = useState<EmailNotificationConfig>(INITIAL_EMAIL_CONFIG);
  const [emailLogs, setEmailLogs] = useState<EmailLogItem[]>(INITIAL_EMAIL_LOGS);

  // Customer & Orders
  const [customer, setCustomer] = useState<CustomerProfile>(INITIAL_CUSTOMER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrder] = useState<Order>(INITIAL_ORDERS[0]);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  // Modals
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Telemetry
  const [telemetry, setTelemetry] = useState<MerchantTelemetry>(INITIAL_TELEMETRY);

  // Cart & Drawers
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(['soundpro-anc', 'magstand-02']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Concierge Chat Drawer
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Good afternoon. I am your Aura Atelier Concierge. How may I assist your curation, consignment tracking, or private releases today?',
      time: '2:40 PM'
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleQuickFilter = (filterKey: 'under10k' | 'topRated' | 'freeShipping' | 'inStock') => {
    setActiveQuickFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        (!variant || item.selectedVariant?.id === variant.id)
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, {
          product,
          quantity,
          selectedVariant: variant || product.variants?.[0]
        }];
      }
    });

    showToast(`Added ${quantity}x "${product.title}" to basket!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed item from basket.');
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const matchedOffer = offers.find(o => o.code.toUpperCase() === code.trim().toUpperCase() && o.active);
    if (matchedOffer) {
      setAppliedCoupon(matchedOffer.code);
      setOffers(prev => prev.map(o => o.id === matchedOffer.id ? { ...o, appliedCount: o.appliedCount + 1 } : o));
      showToast(`${matchedOffer.code} applied! ${matchedOffer.discountPercent}% discount active.`);
      return true;
    } else {
      showToast('Invalid or expired coupon code. Try AURA10 or DIWALI25.');
      return false;
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const activeOffer = offers.find(o => o.code === appliedCoupon);
  const discountMultiplier = activeOffer ? activeOffer.discountPercent / 100 : 0;
  const cartDiscount = cartSubtotal * discountMultiplier;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const toggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from wishlist' : 'Saved to your wishlist');
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  // Product Ingestion & Management
  const addNewProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    setTelemetry(prev => ({
      ...prev,
      criticalSkusCount: Math.max(1, prev.criticalSkusCount + 1)
    }));
    
    // If added by supplier, increment supplier product count
    if (product.supplierId) {
      setSuppliers(prev => prev.map(s => s.id === product.supplierId ? { ...s, productsCount: s.productsCount + 1 } : s));
    }
    showToast(`SKU "${product.sku}" published successfully!`);
  };

  const updateProductDiscount = (productId: string, discountPercent: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const orig = p.originalPrice || p.price;
        const newPrice = Math.round(orig * (1 - discountPercent / 100));
        return {
          ...p,
          originalPrice: orig,
          price: newPrice,
          discountPercent,
          discountBadge: discountPercent > 0 ? `${discountPercent}% OFF` : undefined
        };
      }
      return p;
    }));
    showToast(`Discount updated to ${discountPercent}%!`);
  };

  const triggerFlashOffer = (productId: string, discountPercent: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const orig = p.originalPrice || p.price;
        const newPrice = Math.round(orig * (1 - discountPercent / 100));
        return {
          ...p,
          isFlashDrop: true,
          originalPrice: orig,
          price: newPrice,
          discountPercent,
          discountBadge: `Flash -${discountPercent}%`
        };
      }
      return p;
    }));
    showToast(`Kinetic Flash Offer launched at -${discountPercent}%!`);
  };

  const approveSupplierProduct = (productId: string, approved: boolean) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          approvalStatus: approved ? 'APPROVED' : 'REJECTED'
        };
      }
      return p;
    }));
    showToast(approved ? 'Supplier product approved and live!' : 'Supplier product rejected.');
  };

  // Supplier Admin Management
  const addSupplier = (newSupData: Omit<Supplier, 'id' | 'joinedDate' | 'productsCount' | 'totalRevenue' | 'rating'>) => {
    const newSupplier: Supplier = {
      ...newSupData,
      id: `sup-${Date.now()}`,
      joinedDate: 'Just Now',
      productsCount: 0,
      totalRevenue: 0,
      rating: 5.0
    };
    setSuppliers(prev => [newSupplier, ...prev]);

    // Send email alert to super admin
    if (emailConfig.notifyOnSupplierSignup) {
      sendEmailLog({
        toEmail: emailConfig.superAdminEmail,
        subject: `[Aura Commerce] 🤝 New Supplier Onboarded: ${newSupplier.companyName}`,
        templateType: 'SUPPLIER_INVITE',
        previewText: `${newSupplier.contactName || newSupplier.name} (${newSupplier.email}) was granted supplier portal access with ${newSupplier.commissionRate}% commission.`,
        htmlBody: `<div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Supplier Admin Created</h3>
          <p>Company: <strong>${newSupplier.companyName}</strong></p>
          <p>GSTIN: ${newSupplier.gstin}</p>
          <p>Contact: ${newSupplier.contactName || newSupplier.name} (${newSupplier.email})</p>
          <p>Commission Rate: ${newSupplier.commissionRate}%</p>
        </div>`,
        status: 'DELIVERED'
      });
    }

    showToast(`Supplier "${newSupplier.companyName}" onboarded with Admin access!`);
  };

  const toggleSupplierAdminAccess = (supplierId: string) => {
    setSuppliers(prev => prev.map(s => {
      if (s.id === supplierId) {
        const nextState = !s.adminAccessGranted;
        showToast(nextState ? `Granted Admin Portal access to ${s.companyName}` : `Revoked Admin access for ${s.companyName}`);
        return { ...s, adminAccessGranted: nextState, status: nextState ? 'ACTIVE' : 'SUSPENDED' };
      }
      return s;
    }));
  };

  const updateSupplierCommission = (supplierId: string, rate: number) => {
    setSuppliers(prev => prev.map(s => s.id === supplierId ? { ...s, commissionRate: rate } : s));
    showToast(`Commission rate adjusted to ${rate}%`);
  };

  // Offers Engine Management
  const addOffer = (offerData: Omit<Offer, 'id' | 'appliedCount'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: `off-${Date.now()}`,
      appliedCount: 0
    };
    setOffers(prev => [newOffer, ...prev]);
    showToast(`Promo Offer "${newOffer.code}" activated!`);
  };

  const toggleOffer = (offerId: string) => {
    setOffers(prev => prev.map(o => {
      if (o.id === offerId) {
        const next = !o.active;
        showToast(next ? `Offer "${o.code}" activated` : `Offer "${o.code}" paused`);
        return { ...o, active: next };
      }
      return o;
    }));
  };

  const deleteOffer = (offerId: string) => {
    setOffers(prev => prev.filter(o => o.id !== offerId));
    showToast('Offer deleted.');
  };

  // Email Notification Engine
  const updateEmailConfig = (config: Partial<EmailNotificationConfig>) => {
    setEmailConfig(prev => ({ ...prev, ...config }));
    showToast('Email notification preferences saved!');
  };

  const sendEmailLog = (log: Omit<EmailLogItem, 'id' | 'timestamp'>) => {
    const newLogItem: EmailLogItem = {
      ...log,
      id: `em-${Date.now()}`,
      timestamp: 'Just now'
    };
    setEmailLogs(prev => [newLogItem, ...prev]);
  };

  const triggerTestEmail = (templateType: EmailLogItem['templateType']) => {
    const recipient = emailConfig.superAdminEmail;
    let subject = '[Aura Commerce] 🔔 Test Notification';
    let previewText = 'This is a test notification generated by the Super Admin email engine.';
    let htmlBody = `<div style="padding: 20px; font-family: Arial, sans-serif;"><h2>Aura Notification Dispatch</h2><p>Dispatch to ${recipient} verified.</p></div>`;

    if (templateType === 'NEW_ORDER') {
      subject = `[Aura Commerce] 📦 Order Notification Test to ${recipient}`;
      previewText = `Simulated order received: #AC-${Math.floor(80000 + Math.random() * 9999)} (₹24,999.00)`;
    } else if (templateType === 'LOW_STOCK') {
      subject = `[Aura Commerce] ⚠️ Low Inventory Alert Test to ${recipient}`;
      previewText = 'Simulated alert: Studio Monolith (2 units remaining in Atelier Central)';
    } else if (templateType === 'FLASH_OFFER') {
      subject = `[Aura Commerce] 🔥 Flash Discount Campaign Launched`;
      previewText = 'Festive flash drops live with -25% off vouchers.';
    }

    sendEmailLog({
      toEmail: recipient,
      subject,
      templateType,
      previewText,
      htmlBody,
      status: 'DELIVERED'
    });

    showToast(`Test email dispatched to ${recipient}!`);
  };

  const deleteEmailLog = (id: string) => {
    setEmailLogs(prev => prev.filter(l => l.id !== id));
  };

  // Placing Order
  const placeOrder = (paymentMethod: string, address: string): Order => {
    const newRef = `#AC-${Math.floor(88000 + Math.random() * 11000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      referenceNumber: newRef,
      date: 'Just Now',
      status: 'Processing',
      statusLabel: 'Order Confirmed & Pre-Authorized',
      paymentMethod,
      totalAmount: cartTotal > 0 ? cartTotal : 15999.00,
      carrierAwBill: `BLUEDART-EXP-${Math.floor(7000000 + Math.random() * 900000)}`,
      estimatedDelivery: 'In 2 Business Days',
      currentLocation: 'Aura Atelier Fulfilment Center (Mumbai)',
      timelineStep: 1,
      customerName: customer.name,
      customerEmail: customer.email,
      shippingAddress: address,
      items: cart.length > 0 ? cart.map(c => ({
        id: `item-${Date.now()}-${c.product.id}`,
        productTitle: c.product.title,
        variantDetails: `${c.selectedVariant?.name || 'Standard'} • Qty: ${c.quantity}`,
        price: c.product.price,
        quantity: c.quantity,
        image: c.selectedVariant?.image || c.product.image,
        supplierId: c.product.supplierId
      })) : [
        {
          id: `item-${Date.now()}`,
          productTitle: 'Aura SoundPro ANC',
          variantDetails: 'Obsidian Black • Qty: 1',
          price: 15999.00,
          quantity: 1,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyAQk_7SRp7X-2CAvSyLTrFZ3b4Y5bch7Qf5mFE8OeZ3y2uxwy2grXZVBnaZPt4JAHaLfsiQkTeN5fNTKC32gaCr9-3y83A5wbPAYvAt8NlVTXHI0h7cGzt8Zb5cF190tnjH4cdJABGmOoQ49wc3NxL3F1KF6f3E2XLPg53edn8xfiT_SmhWxyVBVNviBNVUgUyh0PR91mILNcH3SfwpGpx7k46floIM4IfmbFa4m2dHgRA0LW_ncB',
          supplierId: 'sup-1'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCustomer(prev => ({
      ...prev,
      totalOrdersCount: prev.totalOrdersCount + 1,
      activeOrdersCount: prev.activeOrdersCount + 1,
      points: prev.points + Math.round(newOrder.totalAmount * 1.5)
    }));
    setTelemetry(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + newOrder.totalAmount,
      grossOrders: prev.grossOrders + 1
    }));

    // Trigger Super Admin Email Notification automatically
    if (emailConfig.notifyOnNewOrder) {
      sendEmailLog({
        toEmail: emailConfig.superAdminEmail,
        subject: `[Aura Commerce] 📦 High-Velocity Order ${newRef} Received (₹${newOrder.totalAmount.toLocaleString('en-IN')})`,
        templateType: 'NEW_ORDER',
        previewText: `New order from ${customer.name} for ${newOrder.items.length} item(s). Payment via ${paymentMethod}.`,
        htmlBody: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #1e2022;">
          <h2 style="color: #0037b0;">New Order Confirmed: ${newRef}</h2>
          <p>Recipient: ${emailConfig.superAdminEmail}</p>
          <p><strong>Customer:</strong> ${customer.name} (${customer.email})</p>
          <p><strong>Amount:</strong> ₹${newOrder.totalAmount.toLocaleString('en-IN')}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Shipping:</strong> ${address}</p>
        </div>`,
        status: 'DELIVERED'
      });
    }

    clearCart();
    return newOrder;
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: 'Just now'
    };
    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let reply = 'Thank you for reaching out! A dedicated concierge specialist is reviewing your inquiry.';
      const lower = trimmed.toLowerCase();

      if (lower.includes('order') || lower.includes('track') || lower.includes('ship')) {
        reply = `Consignment #AC-89241 is currently in transit with Bluedart Air Cargo (Mumbai Hub). Expected delivery is tomorrow to ${customer.defaultAddress}.`;
      } else if (lower.includes('refund') || lower.includes('upi')) {
        reply = 'UPI and Instant QR refunds are credited directly to your virtual payment address within 15–45 minutes of return inspection.';
      } else if (lower.includes('supplier') || lower.includes('vendor')) {
        reply = 'Suppliers can onboard via the Super Admin Portal to obtain dedicated catalog and revenue management credentials.';
      } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('code')) {
        reply = 'You can use code "AURA10" for 10% off or "DIWALI25" for 25% off festive orders!';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: 'Just now'
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        currentRole,
        setCurrentRole,
        selectedProductId,
        openProductDetail,
        products,
        addNewProduct,
        updateProductDiscount,
        triggerFlashOffer,
        approveSupplierProduct,
        searchQuery,
        setSearchQuery,
        selectedDepartment,
        setSelectedDepartment,
        activeQuickFilters,
        toggleQuickFilter,
        sortBy,
        setSortBy,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        cartDiscount,
        appliedCoupon,
        applyCoupon,
        isCartOpen,
        setIsCartOpen,
        offers,
        addOffer,
        toggleOffer,
        deleteOffer,
        suppliers,
        addSupplier,
        toggleSupplierAdminAccess,
        updateSupplierCommission,
        currentSupplierId,
        setCurrentSupplierId,
        emailConfig,
        updateEmailConfig,
        emailLogs,
        triggerTestEmail,
        deleteEmailLog,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        isWishlistOpen,
        setIsWishlistOpen,
        customer,
        orders,
        activeOrder,
        selectedOrderForModal,
        setSelectedOrderForModal,
        isGpsModalOpen,
        setIsGpsModalOpen,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        placeOrder,
        telemetry,
        isChatOpen,
        setIsChatOpen,
        isChatMinimized,
        setIsChatMinimized,
        chatMessages,
        sendMessage,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
