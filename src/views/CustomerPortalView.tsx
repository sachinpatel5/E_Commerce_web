import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { formatINR, formatINRWithDecimals } from '../utils/currency';

export const CustomerPortalView: React.FC = () => {
  const {
    customer,
    orders,
    activeOrder,
    setSelectedOrderForModal,
    setIsGpsModalOpen,
    setIsInvoiceModalOpen,
    openProductDetail,
    addToCart,
    products,
    wishlistIds,
    toggleWishlist,
    setIsChatOpen,
    setIsChatMinimized,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'payments' | 'security'>('orders');
  const [orderFilter, setOrderFilter] = useState('all-2024');

  // Filter archived orders
  const archivedOrders = orders.filter(o => o.id !== activeOrder.id);
  const displayedArchived = archivedOrders.filter(o => {
    if (orderFilter === 'delivered') return o.status === 'Delivered';
    if (orderFilter === 'cancelled') return o.status === 'Cancelled';
    return true;
  });

  const handleOpenInvoice = (order: Order) => {
    setSelectedOrderForModal(order);
    setIsInvoiceModalOpen(true);
  };

  const handleOpenGps = (order: Order) => {
    setSelectedOrderForModal(order);
    setIsGpsModalOpen(true);
  };

  const handleReorder = (productTitle: string, price: number) => {
    const matched = products.find(p => p.title.toLowerCase().includes(productTitle.toLowerCase().slice(0, 10)));
    if (matched) {
      addToCart(matched, 1);
    } else {
      showToast(`Reordered "${productTitle}" (${formatINR(price, true)})`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-lg space-y-space-xl">
        
        {/* Profile Editorial Hero Header */}
        <section className="relative bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-surface-container opacity-60 blur-3xl pointer-events-none"></div>
          <div className="absolute right-36 bottom-0 w-64 h-64 rounded-full bg-secondary-container/20 opacity-50 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
              
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md bg-surface-container-high ring-4 ring-primary/10">
                  <img alt={customer.name} className="w-full h-full object-cover" src={customer.avatar} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-1 shadow-sm flex items-center justify-center" title="Verified Patron">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
              </div>

              {/* Patron Bio Details */}
              <div className="space-y-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    Account Member Since {customer.memberSince}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Tier Verified
                  </span>
                </div>

                <h1 className="font-display-sm text-display-sm text-on-surface tracking-tight">
                  {customer.name}
                </h1>

                <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                  <div className="inline-flex items-center gap-space-xs bg-surface-container-high text-on-surface font-label-md text-label-md px-space-sm py-1 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-tertiary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      military_tech
                    </span>
                    <span className="font-semibold text-on-surface">{customer.tier}</span>
                    <span className="text-on-surface-variant font-normal">({customer.points} pts)</span>
                  </div>

                  <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">alternate_email</span>
                    {customer.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Bento Strip */}
            <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap items-center gap-space-sm">
              <div 
                onClick={() => setActiveTab('orders')}
                className="flex-1 sm:flex-none bg-surface-container-low hover:bg-surface-container px-space-md py-space-sm rounded-lg transition-colors cursor-pointer border border-surface-container"
              >
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase text-outline">Active Orders</span>
                </div>
                <p className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                  {String(customer.activeOrdersCount).padStart(2, '0')}
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('orders')}
                className="flex-1 sm:flex-none bg-surface-container-low hover:bg-surface-container px-space-md py-space-sm rounded-lg transition-colors cursor-pointer border border-surface-container"
              >
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-outline text-[16px]">receipt_long</span>
                  <span className="font-label-sm text-label-sm uppercase text-outline">Total Orders</span>
                </div>
                <p className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                  {String(customer.totalOrdersCount).padStart(2, '0')}
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('addresses')}
                className="flex-1 sm:flex-none bg-surface-container-low hover:bg-surface-container px-space-md py-space-sm rounded-lg transition-colors cursor-pointer border border-surface-container"
              >
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-outline text-[16px]">pin_drop</span>
                  <span className="font-label-sm text-label-sm uppercase text-outline">Saved Places</span>
                </div>
                <p className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                  {String(customer.savedPlacesCount).padStart(2, '0')}
                </p>
              </div>

              <button 
                onClick={() => setActiveTab('security')}
                className="bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md px-space-md py-3 rounded-lg flex items-center justify-center gap-space-xs transition-colors shadow-sm shrink-0 border border-outline-variant/30 font-semibold" 
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                <span>Preferences</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bespoke Modern Segmented Tab Bar */}
        <nav aria-label="Portal Navigation" className="w-full bg-surface-container-lowest p-1.5 rounded-xl shadow-sm border border-outline-variant/30 flex items-center gap-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`shrink-0 flex items-center gap-space-xs px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${
              activeTab === 'orders'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>Order History</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-label-sm ${
              activeTab === 'orders' ? 'bg-surface-container-lowest/20' : 'bg-surface-container'
            }`}>
              {customer.activeOrdersCount}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`shrink-0 flex items-center gap-space-xs px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${
              activeTab === 'wishlist'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span>Wishlist</span>
            <span className="ml-0.5 bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded-full text-label-sm">
              {wishlistIds.length} items
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('addresses')}
            className={`shrink-0 flex items-center gap-space-xs px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${
              activeTab === 'addresses'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span>Saved Addresses</span>
          </button>

          <button 
            onClick={() => setActiveTab('payments')}
            className={`shrink-0 flex items-center gap-space-xs px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${
              activeTab === 'payments'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            <span>Payment & UPI IDs</span>
          </button>

          <button 
            onClick={() => setActiveTab('security')}
            className={`shrink-0 flex items-center gap-space-xs px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${
              activeTab === 'security'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">lock_reset</span>
            <span>Security & Password</span>
          </button>
        </nav>

        {/* TAB 1: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <>
            {/* Active High-Velocity Order Card */}
            <section className="space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-3 h-3 rounded-full bg-secondary animate-ping"></div>
                  <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                    Active Consignment Tracking
                  </h2>
                </div>
                <span className="font-label-md text-label-md text-secondary font-semibold bg-secondary-container/30 px-space-sm py-1 rounded-full border border-secondary/30">
                  In Transit • Guaranteed Priority
                </span>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm border border-outline-variant/30 relative overflow-hidden space-y-space-xl">
                
                {/* Card Top Bar: Metadata & Instant Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-lg border border-surface-container">
                  <div className="flex flex-wrap items-center gap-x-space-lg gap-y-space-xs">
                    <div>
                      <p className="font-label-sm text-label-sm uppercase text-outline">Consignment Order</p>
                      <p className="font-label-lg text-label-lg text-on-surface font-bold tracking-tight">
                        {activeOrder.referenceNumber}
                      </p>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm uppercase text-outline">Date Booked</p>
                      <p className="font-body-md text-body-md text-on-surface">{activeOrder.date}</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm uppercase text-outline">Carrier Airway Bill</p>
                      <p className="font-body-md text-body-md text-primary font-semibold font-mono">
                        {activeOrder.carrierAwBill}
                      </p>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm uppercase text-outline">Estimated Delivery</p>
                      <p className="font-label-lg text-label-lg text-secondary font-bold">
                        {activeOrder.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-xs shrink-0">
                    <button 
                      onClick={() => handleOpenInvoice(activeOrder)}
                      className="bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md px-space-md py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors border border-outline-variant/40" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      <span>Invoice (PDF)</span>
                    </button>
                    <button 
                      onClick={() => handleOpenGps(activeOrder)}
                      className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02]" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">radar</span>
                      <span>Track Live GPS</span>
                    </button>
                  </div>
                </div>

                {/* 4-Stage Progress Bar with Interactive Pin */}
                <div className="pt-space-sm pb-space-xs">
                  <div className="relative">
                    {/* Background line */}
                    <div className="absolute top-6 left-6 right-6 h-1 bg-surface-container rounded-full hidden sm:block"></div>
                    {/* Progress fill */}
                    <div className="absolute top-6 left-6 w-[66%] h-1 bg-primary rounded-full hidden sm:block transition-all duration-700"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-lg relative z-10">
                      
                      {/* Step 1: Confirmed */}
                      <div className="flex sm:flex-col items-center sm:items-center gap-space-md sm:gap-space-sm text-left sm:text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm shrink-0">
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-label-md text-label-md text-on-surface font-semibold">Order Confirmed</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Oct 24, 10:14 AM</p>
                          <span className="inline-block text-[10px] font-semibold text-secondary uppercase bg-secondary-container/20 px-1.5 rounded">
                            Completed
                          </span>
                        </div>
                      </div>

                      {/* Step 2: Packed */}
                      <div className="flex sm:flex-col items-center sm:items-center gap-space-md sm:gap-space-sm text-left sm:text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm shrink-0">
                          <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-label-md text-label-md text-on-surface font-semibold">Packed & Sealed</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Oct 24, 04:30 PM</p>
                          <span className="inline-block text-[10px] font-semibold text-secondary uppercase bg-secondary-container/20 px-1.5 rounded">
                            QC Passed
                          </span>
                        </div>
                      </div>

                      {/* Step 3: In Transit (Active Pulse) */}
                      <div className="flex sm:flex-col items-center sm:items-center gap-space-md sm:gap-space-sm text-left sm:text-center relative">
                        <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-primary ring-4 ring-primary flex items-center justify-center shadow-md shrink-0 animate-pulse">
                          <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-label-md text-label-md text-primary font-bold">Shipped • In Transit</p>
                          <div className="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full text-on-surface font-label-sm text-label-sm shadow-sm mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                            <span>{activeOrder.currentLocation}</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-outline">Updated 42 mins ago</p>
                        </div>
                      </div>

                      {/* Step 4: Scheduled Delivery */}
                      <div className="flex sm:flex-col items-center sm:items-center gap-space-md sm:gap-space-sm text-left sm:text-center opacity-70">
                        <div className="w-12 h-12 rounded-full bg-surface-container text-outline flex items-center justify-center shadow-sm shrink-0">
                          <span className="material-symbols-outlined text-[20px]">home_pin</span>
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-label-md text-label-md text-on-surface font-semibold">Out for Delivery</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Est. Tomorrow by 6 PM</p>
                          <span className="inline-block text-[10px] font-semibold text-outline uppercase bg-surface-container px-1.5 rounded">
                            Scheduled
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Product Preview Drawer Snippet */}
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="bg-surface-container-low/70 p-space-md rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-surface-container">
                    <div className="flex items-center gap-space-md">
                      <div className="w-20 h-20 rounded-lg bg-surface-container-lowest overflow-hidden shadow-sm shrink-0 flex items-center justify-center p-2 border border-surface-container">
                        <img className="w-full h-full object-contain" alt={item.productTitle} src={item.image} />
                      </div>
                      <div className="space-y-1">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                          Aura Atelier Hardware
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {item.productTitle}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.variantDetails}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-xl w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <p className="font-label-sm text-label-sm uppercase text-outline">Billed Amount</p>
                        <p className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                          {formatINR(item.price, true)}
                        </p>
                        <span className="font-label-sm text-label-sm text-secondary font-medium">
                          {activeOrder.paymentMethod}
                        </span>
                      </div>
                      <button 
                        onClick={() => openProductDetail('soundpro-anc')}
                        className="bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md px-space-md py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1 border border-outline-variant/40" 
                        type="button"
                      >
                        <span>View Details</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Past Orders Section Header & Filter Toolbar */}
            <section className="space-y-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                    Archived & Fulfilled Orders
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Review historical records, warranties, invoices, and expedited reorders.
                  </p>
                </div>

                <div className="flex items-center gap-space-xs self-start sm:self-auto">
                  <div className="bg-surface-container-lowest rounded-lg px-space-sm py-1.5 shadow-sm border border-outline-variant/30 flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-outline text-[18px]">filter_list</span>
                    <select 
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      className="bg-transparent font-label-md text-label-md text-on-surface outline-none cursor-pointer font-medium"
                    >
                      <option value="all-2024">All Orders (2024)</option>
                      <option value="delivered">Delivered Only</option>
                      <option value="cancelled">Cancelled & Refunded</option>
                      <option value="2023">Year 2023 Archive</option>
                    </select>
                  </div>

                  <div className="bg-surface-container-lowest rounded-lg px-space-sm py-1.5 shadow-sm border border-outline-variant/30 flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-outline text-[18px]">calendar_today</span>
                    <span className="font-label-md text-label-md text-on-surface font-medium">Last 6 Months</span>
                  </div>
                </div>
              </div>

              {/* Past Orders List */}
              <div className="space-y-space-md">
                {displayedArchived.map((order) => {
                  const isDelivered = order.status === 'Delivered';
                  const isCancelled = order.status === 'Cancelled';

                  return (
                    <article 
                      key={order.id}
                      className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-space-md ${
                        isCancelled ? 'opacity-90' : 'hover:shadow-md transition-shadow'
                      }`}
                    >
                      {/* Sub-header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm bg-surface-container-low/40 p-space-md rounded-lg border border-surface-container">
                        <div className="flex flex-wrap items-center gap-x-space-lg gap-y-1">
                          <div>
                            <p className="font-label-sm text-label-sm uppercase text-outline">Order Reference</p>
                            <p className="font-label-lg text-label-lg text-on-surface font-semibold">{order.referenceNumber}</p>
                          </div>
                          <div>
                            <p className="font-label-sm text-label-sm uppercase text-outline">
                              {isCancelled ? 'Request Date' : 'Delivery Date'}
                            </p>
                            <p className="font-body-md text-body-md text-on-surface">
                              {isCancelled ? `Cancelled on ${order.date}` : `Delivered on ${order.deliveryDate || order.date}`}
                            </p>
                          </div>
                          <div>
                            <p className="font-label-sm text-label-sm uppercase text-outline">
                              {isCancelled ? 'Refund Status' : 'Payment'}
                            </p>
                            <p className={`font-body-md text-body-md ${isCancelled ? 'text-secondary font-semibold' : 'text-on-surface'}`}>
                              {isCancelled ? order.refundStatus : order.paymentMethod}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-space-xs">
                          <span className={`inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold ${
                            isDelivered 
                              ? 'bg-secondary-container/20 text-secondary' 
                              : isCancelled 
                              ? 'bg-surface-container text-on-surface-variant'
                              : 'bg-primary-fixed text-primary'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isDelivered ? 'bg-secondary' : isCancelled ? 'bg-outline' : 'bg-primary'
                            }`}></span>
                            {order.statusLabel}
                          </span>

                          <button 
                            onClick={() => handleOpenInvoice(order)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors" 
                            title="Order receipt" 
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">receipt</span>
                          </button>
                        </div>
                      </div>

                      {/* Line Items */}
                      <div className="space-y-space-sm divide-y divide-surface-container">
                        {order.items.map((item, i) => (
                          <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center pt-space-xs">
                            <div className="md:col-span-8 flex items-center gap-space-md">
                              <div className="w-16 h-16 rounded-lg bg-surface-container-low shrink-0 overflow-hidden flex items-center justify-center p-1.5 border border-surface-container">
                                <img className="w-full h-full object-contain" alt={item.productTitle} src={item.image} />
                              </div>
                              <div className="min-w-0 space-y-0.5">
                                <h4 className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                                  {item.productTitle}
                                </h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                  {item.variantDetails}
                                </p>
                                <p className="font-label-md text-label-md text-on-surface font-semibold pt-0.5">
                                  {formatINR(item.price, true)}
                                </p>
                              </div>
                            </div>

                            <div className="md:col-span-4 flex flex-wrap md:flex-nowrap items-center justify-start md:justify-end gap-space-xs">
                              {item.isReviewed ? (
                                <button className="bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md px-space-md py-1.5 rounded-lg transition-colors flex items-center gap-1.5 border border-surface-container">
                                  <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                                  <span>Reviewed {item.reviewRating || '5.0'}</span>
                                </button>
                              ) : isDelivered ? (
                                <button 
                                  onClick={() => showToast(`Review form opened for ${item.productTitle}`)}
                                  className="bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md px-space-md py-2 rounded-lg transition-colors flex items-center gap-1.5 border border-surface-container" 
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[16px]">star</span>
                                  <span>Write Review</span>
                                </button>
                              ) : null}

                              <button 
                                onClick={() => handleReorder(item.productTitle, item.price)}
                                className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5" 
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[16px]">sync</span>
                                <span>{isCancelled ? 'Reopen / Reorder' : 'Buy Again'}</span>
                              </button>

                              <button 
                                onClick={() => {
                                  setIsChatOpen(true);
                                  setIsChatMinimized(false);
                                }}
                                className="text-outline hover:text-on-surface p-2 rounded-lg hover:bg-surface-container transition-colors" 
                                title="Order Assistance" 
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md bg-surface-container-low px-space-lg py-space-md rounded-xl border border-surface-container">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Showing <span className="font-semibold text-on-surface">1 – {displayedArchived.length}</span> of{' '}
                  <span className="font-semibold text-on-surface">{customer.totalOrdersCount}</span> recorded orders
                </p>
                <div className="flex items-center gap-space-xs">
                  <button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-outline flex items-center justify-center disabled:opacity-50 border border-surface-container">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center shadow-sm">
                    1
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center border border-surface-container">
                    2
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center border border-surface-container">
                    3
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors border border-surface-container">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-space-md">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Your Curated Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {products.filter(p => wishlistIds.includes(p.id)).map(p => (
                <div key={p.id} className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                  <div>
                    <span className="text-xs text-outline uppercase">{p.category}</span>
                    <h4 className="font-bold text-on-surface">{p.title}</h4>
                    <p className="text-primary font-bold text-lg mt-1">{formatINR(p.price)}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => addToCart(p, 1)}
                      className="flex-1 bg-primary text-on-primary py-2 rounded-lg text-xs font-semibold"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 text-error hover:bg-surface-container rounded-lg"
                    >
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-space-md">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Saved Delivery Destinations</h2>
              <button 
                onClick={() => showToast('New address prompt opened')}
                className="bg-primary text-on-primary px-space-md py-2 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Place</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low border-2 border-primary space-y-1 relative">
                <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-3 right-3">
                  Default Destination
                </span>
                <p className="font-bold text-on-surface">Bandra Architectural Studio</p>
                <p className="text-xs text-on-surface-variant">402, Signature Towers, Linking Road</p>
                <p className="text-xs text-on-surface-variant">Bandra West, Mumbai, MH 400050</p>
                <p className="text-xs text-outline mt-2">Contact: Sarah Jenkins (+91 98201 49201)</p>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                <p className="font-bold text-on-surface">Indiranagar Creative Loft</p>
                <p className="text-xs text-on-surface-variant">Apartment 5B, 100 Feet Road</p>
                <p className="text-xs text-on-surface-variant">Indiranagar, Bengaluru, KA 560038</p>
                <button 
                  onClick={() => showToast('Set Indiranagar Creative Loft as default')}
                  className="text-xs text-primary font-semibold hover:underline mt-2 block"
                >
                  Make Default
                </button>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                <p className="font-bold text-on-surface">Cyber City Tech Center</p>
                <p className="text-xs text-on-surface-variant">Tower B, 14th Floor, DLF Cyber City</p>
                <p className="text-xs text-on-surface-variant">Gurugram, Haryana 122002</p>
                <button 
                  onClick={() => showToast('Set Cyber City Tech Center as default')}
                  className="text-xs text-primary font-semibold hover:underline mt-2 block"
                >
                  Make Default
                </button>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: PAYMENT & UPI IDS */}
        {activeTab === 'payments' && (
          <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-space-md">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Saved Payment Gateways & UPI Handles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[32px] text-primary">qr_code_scanner</span>
                  <div>
                    <p className="font-bold text-on-surface">sarah@oksbi</p>
                    <p className="text-xs text-secondary font-semibold">Verified UPI VPA (State Bank of India)</p>
                  </div>
                </div>
                <span className="bg-secondary-container/40 text-secondary text-xs px-2 py-0.5 rounded-full font-bold">Active</span>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[32px] text-primary">credit_card</span>
                  <div>
                    <p className="font-bold text-on-surface">Mastercard •••• 4102</p>
                    <p className="text-xs text-on-surface-variant">Expires 09/27 • Apple Pay Linked</p>
                  </div>
                </div>
                <span className="text-xs text-outline">Preferred</span>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: SECURITY */}
        {activeTab === 'security' && (
          <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-space-md">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Account Security & Authentication</h2>
            <div className="space-y-space-sm max-w-xl">
              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Two-Factor Hardware Token (WebAuthn)</p>
                  <p className="text-xs text-on-surface-variant">Biometric TouchID & YubiKey enabled</p>
                </div>
                <span className="bg-secondary text-on-secondary text-xs px-2 py-0.5 rounded font-bold">Enabled</span>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Encrypted Session Tokens</p>
                  <p className="text-xs text-on-surface-variant">Auto-invalidate on suspicious proxy detection</p>
                </div>
                <button onClick={() => showToast('All background sessions revoked')} className="text-xs text-error font-semibold hover:underline">
                  Revoke All
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Support Concierge Banner Box */}
        <section className="bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-space-lg rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Aura Concierge & Hardware Protection
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                As a Gold Member, you enjoy lifetime claim resolution under 2 hours and dedicated priority replacement support.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-xs shrink-0 w-full md:w-auto">
            <button 
              onClick={() => showToast('Opening Atelier Warranty Handbook PDF')}
              className="flex-1 md:flex-none bg-surface-container-lowest hover:bg-surface text-on-surface font-label-md text-label-md px-space-md py-2.5 rounded-lg shadow-sm transition-colors text-center border border-outline-variant/30 font-semibold" 
              type="button"
            >
              Warranty Handbook
            </button>
            <button 
              onClick={() => {
                setIsChatOpen(true);
                setIsChatMinimized(false);
              }}
              className="flex-1 md:flex-none bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-2.5 rounded-lg shadow-sm transition-colors text-center font-semibold" 
              type="button"
            >
              Contact Concierge
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
