import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types';
import { formatINR, formatINRWithDecimals } from '../utils/currency';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isWishlisted,
    customer,
    placeOrder,
    setActivePage,
    showToast
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants?.[0] || {
      id: 'default',
      name: 'Default Edition',
      colorName: 'Matte Obsidian',
      colorHex: '#1e2022',
      image: product.image,
      subtitle: 'Standard Edition',
      inStockCount: 32
    }
  );

  // Quantity stepper
  const [quantity, setQuantity] = useState(1);

  // Payment tab state: 'upi' | 'card' | 'other'
  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'other'>('upi');

  // Payment inputs
  const [vpaInput, setVpaInput] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank Direct Corporate / Retail');
  const [isCod, setIsCod] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(customer.defaultAddress);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Pre-authorization confirmation banner state
  const [isPreAuthorized, setIsPreAuthorized] = useState(false);
  const [authorizedOrderRef, setAuthorizedOrderRef] = useState('');

  const wishActive = isWishlisted(product.id);

  const unitPrice = product.price;
  const codFee = isCod ? 49.00 : 0.00;
  const orderSubtotal = unitPrice * quantity;
  const orderTotal = orderSubtotal + codFee;

  const handleVariantSwitch = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    showToast(`Switched finish to ${variant.name}`);
  };

  const handleQuantityAdjust = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAuthorizePayment = (methodDesc: string) => {
    const createdOrder = placeOrder(methodDesc, deliveryAddress);
    setAuthorizedOrderRef(createdOrder.referenceNumber);
    setIsPreAuthorized(true);
    showToast(`Payment pre-authorized via ${methodDesc}! Consignment order placed.`);

    // Scroll to feedback
    const notice = document.getElementById('paymentSuccessNotice');
    notice?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const focusCheckoutTab = () => {
    const panel = document.getElementById('checkoutPanel');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      panel.classList.add('ring-4', 'ring-primary');
      setTimeout(() => {
        panel.classList.remove('ring-4', 'ring-primary');
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* Top Breadcrumb & Live Ticker Bar */}
      <div className="w-full bg-surface-container-low border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant flex-wrap">
            <button 
              onClick={() => setActivePage('shop')} 
              className="hover:text-primary transition-colors flex items-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant">/</span>
            <button 
              onClick={() => setActivePage('shop')} 
              className="hover:text-primary transition-colors"
            >
              {product.department}
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold truncate max-w-xs md:max-w-none">
              {product.title}
            </span>
          </nav>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-0.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span className="font-label-sm text-label-sm text-secondary font-bold">14 viewing right now</span>
            </div>
            <div className="hidden sm:flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              <span>Official 2-Year Studio Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas: Two-Column Product Showcase & Responsive Checkout Dock */}
      <div className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-desktop py-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          
          {/* LEFT COLUMN: Product Visual Studio & Deep Specs (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-space-lg">
            
            {/* Main Media Frame & Gallery */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 relative overflow-hidden group">
              
              {/* Floating Status Badges */}
              <div className="absolute top-space-md left-space-md z-10 flex flex-col gap-space-xs">
                <span className="bg-primary text-on-primary font-label-sm text-label-sm font-semibold px-space-sm py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Flagship Edition
                </span>
                <span className="bg-surface-container-high/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-medium px-space-sm py-0.5 rounded-full shadow-sm">
                  Studio Reference Gen.4
                </span>
              </div>

              {/* Wishlist Floating Icon Button */}
              <button 
                onClick={() => toggleWishlist(product.id)}
                aria-label="Add to Wishlist" 
                className={`absolute top-space-md right-space-md z-10 w-10 h-10 rounded-full bg-surface/90 hover:bg-surface-container-highest backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-95 ${
                  wishActive ? 'text-error' : 'text-on-surface-variant hover:text-tertiary'
                }`}
                type="button"
              >
                <span 
                  className="material-symbols-outlined text-[20px] transition-colors"
                  style={{ fontVariationSettings: wishActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>

              {/* Primary Interactive High-Res Image Viewport */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low flex items-center justify-center">
                <img 
                  id="mainProductImg"
                  src={selectedVariant.image || product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />

                {/* Micro Audio Waveform Overlay */}
                <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-md px-space-sm py-1 rounded-full flex items-center gap-space-xs shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[16px]">graphic_eq</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Lossless 24-bit/96kHz</span>
                </div>
              </div>

              {/* Color Swatch & Thumbnail Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-space-md pt-space-xs">
                  <div className="flex items-center justify-between mb-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-md text-label-md text-on-surface font-bold">Acoustic Finish:</span>
                      <span className="font-label-md text-label-md text-primary font-semibold">
                        {selectedVariant.colorName || selectedVariant.name}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 
                      {selectedVariant.inStockCount || 32} Units In Stock
                    </span>
                  </div>

                  {/* Thumbnail Swatch Array */}
                  <div className="grid grid-cols-3 gap-space-sm">
                    {product.variants.map((v) => {
                      const isActive = selectedVariant.id === v.id;
                      return (
                        <button 
                          key={v.id}
                          onClick={() => handleVariantSwitch(v)}
                          className={`variant-btn p-space-xs rounded-lg flex items-center gap-space-sm text-left transition-all shadow-sm ${
                            isActive 
                              ? 'ring-2 ring-primary bg-surface-container' 
                              : 'bg-surface-container-low hover:bg-surface-container'
                          }`}
                          type="button"
                        >
                          <div className="w-12 h-12 rounded bg-surface-dim overflow-hidden shrink-0">
                            <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">{v.name}</p>
                            <span className="font-body-sm text-[11px] text-on-surface-variant block">{v.subtitle || 'Edition'}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Spec Badges & High-Velocity Metrics Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px]">battery_charging_full</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface font-bold">45h Playtime</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Fast charge: 15 min gives 6 hours audio</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-secondary-container/40 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[22px]">hearing</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface font-bold">Active Hybrid ANC</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">-42dB adaptive noise elimination</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px]">bluetooth</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface font-bold">Bluetooth 5.3</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Multipoint auto-switch & aptX HD</p>
                </div>
              </div>
            </div>

            {/* Technical Acoustic Performance Card with Inline SVG Telemetry */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row gap-space-lg items-center justify-between">
              <div className="space-y-space-xs max-w-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Acoustic Architecture</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Precision Neutral Soundstage</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Bespoke 40mm carbon-diaphragm transducers deliver hyper-calibrated frequency response from 10Hz to 40kHz.
                </p>
              </div>

              {/* Inline SVG Frequency Curve Telemetry Visualization */}
              <div className="w-full md:w-56 h-24 bg-surface-container-low rounded-lg p-space-xs flex flex-col justify-between shrink-0 border border-surface-container">
                <div className="flex items-center justify-between px-space-xs">
                  <span className="font-label-sm text-[10px] text-on-surface-variant">Freq: 10Hz - 40kHz</span>
                  <span className="font-label-sm text-[10px] text-secondary font-bold">THD &lt; 0.05%</span>
                </div>

                <svg className="w-full h-12 overflow-visible text-primary" viewBox="0 0 200 50">
                  <defs>
                    <linearGradient id="eqGlow" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M 0,35 Q 25,32 50,22 T 100,18 T 150,24 T 200,15 L 200,50 L 0,50 Z" fill="url(#eqGlow)"></path>
                  <path d="M 0,35 Q 25,32 50,22 T 100,18 T 150,24 T 200,15" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                  <circle cx="50" cy="22" fill="#0037b0" r="3"></circle>
                  <circle cx="100" cy="18" fill="#006c49" r="3"></circle>
                  <circle cx="150" cy="24" fill="#0037b0" r="3"></circle>
                </svg>

                <div className="flex justify-between px-space-xs font-label-sm text-[9px] text-outline">
                  <span>Low-Bass</span>
                  <span>Mid-Voice</span>
                  <span>Air Treble</span>
                </div>
              </div>
            </div>

          </section>

          {/* RIGHT COLUMN: Sticky Seamless Checkout Slide & Payment Engine (5 cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-space-md sticky top-24">
            
            {/* Main Product Title & Cart Config Header */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
              <div className="flex items-start justify-between gap-space-sm">
                <div>
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Aura Pro Studio Series</span>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5">{product.title}</h1>
                  
                  <div className="flex items-center gap-space-xs mt-1">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">{product.rating}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">({product.reviewCount} verified audiophiles)</span>
                  </div>
                </div>

                {/* Pricing Pill */}
                <div className="text-right">
                  {product.originalPrice && (
                    <span className="font-label-sm text-label-sm text-on-surface-variant line-through block">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  <div className="font-display-sm text-display-sm text-primary tracking-tight font-bold">
                    {formatINR(product.price)}
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Quick CTA Bar */}
              <div className="flex items-center gap-space-md pt-space-xs">
                {/* Counter */}
                <div className="flex items-center bg-surface-container-low rounded-lg p-1 shadow-inner border border-surface-container">
                  <button 
                    onClick={() => handleQuantityAdjust(-1)}
                    className="w-8 h-8 rounded bg-surface hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <span className="font-label-lg text-label-lg text-on-surface px-space-md w-8 text-center font-bold">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantityAdjust(1)}
                    className="w-8 h-8 rounded bg-surface hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>

                {/* Express Checkout Trigger */}
                <button 
                  onClick={focusCheckoutTab}
                  type="button"
                  className="flex-1 bg-primary hover:bg-primary-container text-on-primary py-space-sm px-space-md rounded-lg font-label-lg text-label-lg transition-all shadow-md flex items-center justify-center gap-space-xs active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[20px]">flash_on</span>
                  <span>Express Checkout</span>
                </button>
              </div>
            </div>

            {/* Embedded Interactive Checkout Card / Drawer */}
            <div 
              id="checkoutPanel" 
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md border border-outline-variant/30 space-y-space-md transition-all"
            >
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">Instant Payment Gate</span>
                </div>
                <div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-secondary-container/20 px-space-sm py-0.5 rounded-full font-semibold">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span>256-Bit Encrypted</span>
                </div>
              </div>

              {/* Order Cost Ledger Breakdown */}
              <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-xs font-body-sm text-body-sm">
                <div className="flex items-center justify-between text-on-surface">
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{quantity}x {product.title}</span>
                    <span className="text-outline text-xs">({selectedVariant.colorName || selectedVariant.name})</span>
                  </span>
                  <span className="font-semibold">{formatINR(orderSubtotal, true)}</span>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Express Air Courier (Bluedart)</span>
                  <span className="text-secondary font-semibold uppercase text-xs tracking-wider">COMPLIMENTARY</span>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Integrated GST (18% Included)</span>
                  <span>₹0.00</span>
                </div>

                {isCod && (
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span>COD Doorstep Handling Surcharge</span>
                    <span>+₹49.00</span>
                  </div>
                )}

                <div className="pt-space-xs flex items-center justify-between text-on-surface font-headline-sm text-headline-sm border-t border-surface-container mt-1">
                  <span>Final Total</span>
                  <span className="text-primary font-bold">{formatINR(orderTotal, true)}</span>
                </div>
              </div>

              {/* Dynamic Payment Tab Selection System */}
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider mb-space-xs">
                  Select Payment Method
                </p>

                {/* Tab Headers */}
                <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-lg">
                  <button 
                    onClick={() => setPaymentTab('upi')}
                    className={`py-space-xs px-1 rounded-md font-label-sm text-label-sm text-center font-semibold transition-all flex items-center justify-center gap-1 ${
                      paymentTab === 'upi'
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                    <span>UPI / QR</span>
                  </button>

                  <button 
                    onClick={() => setPaymentTab('card')}
                    className={`py-space-xs px-1 rounded-md font-label-sm text-label-sm text-center font-semibold transition-all flex items-center justify-center gap-1 ${
                      paymentTab === 'card'
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">credit_card</span>
                    <span>Cards</span>
                  </button>

                  <button 
                    onClick={() => setPaymentTab('other')}
                    className={`py-space-xs px-1 rounded-md font-label-sm text-label-sm text-center font-semibold transition-all flex items-center justify-center gap-1 ${
                      paymentTab === 'other'
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">account_balance</span>
                    <span>Net/COD</span>
                  </button>
                </div>

                {/* Tab Content 1: UPI / Instant QR */}
                {paymentTab === 'upi' && (
                  <div className="pt-space-md space-y-space-md">
                    <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col sm:flex-row items-center gap-space-md">
                      
                      {/* Dynamic QR Code SVG Block */}
                      <div className="w-32 h-32 bg-surface-container-lowest p-2 rounded-lg shadow-sm flex flex-col items-center justify-center shrink-0 border border-surface-container">
                        <svg className="w-full h-full text-on-surface" viewBox="0 0 100 100">
                          <rect fill="currentColor" height="28" rx="2" width="28" x="5" y="5"></rect>
                          <rect fill="#ffffff" height="20" rx="1" width="20" x="9" y="9"></rect>
                          <rect fill="currentColor" height="12" width="12" x="13" y="13"></rect>
                          <rect fill="currentColor" height="28" rx="2" width="28" x="67" y="5"></rect>
                          <rect fill="#ffffff" height="20" rx="1" width="20" x="71" y="9"></rect>
                          <rect fill="currentColor" height="12" width="12" x="75" y="13"></rect>
                          <rect fill="currentColor" height="28" rx="2" width="28" x="5" y="67"></rect>
                          <rect fill="#ffffff" height="20" rx="1" width="20" x="9" y="71"></rect>
                          <rect fill="currentColor" height="12" width="12" x="13" y="75"></rect>
                          <circle cx="42" cy="12" fill="currentColor" r="3"></circle>
                          <circle cx="52" cy="12" fill="currentColor" r="3"></circle>
                          <circle cx="42" cy="22" fill="currentColor" r="3"></circle>
                          <rect fill="currentColor" height="16" width="8" x="48" y="24"></rect>
                          <rect fill="currentColor" height="6" width="16" x="15" y="42"></rect>
                          <rect fill="currentColor" height="6" width="28" x="36" y="42"></rect>
                          <rect fill="currentColor" height="18" width="16" x="72" y="42"></rect>
                          <circle cx="42" cy="68" fill="currentColor" r="3"></circle>
                          <rect fill="currentColor" height="14" width="12" x="48" y="60"></rect>
                          <circle cx="70" cy="74" fill="currentColor" r="3"></circle>
                          <circle cx="85" cy="74" fill="currentColor" r="3"></circle>
                          <rect fill="currentColor" height="6" width="22" x="66" y="82"></rect>
                        </svg>
                        <span className="font-label-sm text-[9px] text-on-surface-variant mt-1 font-mono">Scan via App</span>
                      </div>

                      {/* UPI Apps Info & Instant Scan Helper */}
                      <div className="space-y-space-xs text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-surface text-on-surface font-label-sm text-[10px] rounded font-semibold shadow-xs border border-outline-variant/30">
                            GPay
                          </span>
                          <span className="px-2 py-0.5 bg-surface text-on-surface font-label-sm text-[10px] rounded font-semibold shadow-xs border border-outline-variant/30">
                            PhonePe
                          </span>
                          <span className="px-2 py-0.5 bg-surface text-on-surface font-label-sm text-[10px] rounded font-semibold shadow-xs border border-outline-variant/30">
                            Paytm
                          </span>
                          <span className="px-2 py-0.5 bg-surface text-on-surface font-label-sm text-[10px] rounded font-semibold shadow-xs border border-outline-variant/30">
                            Cred
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface font-medium">Scan dynamic QR for zero-latency confirmation.</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">Auto-detects active bank handles instantly.</p>
                      </div>
                    </div>

                    {/* UPI VPA Direct ID Field */}
                    <div className="space-y-1">
                      <label className="block font-label-sm text-label-sm text-on-surface font-medium" htmlFor="upiIdInput">
                        Or enter Virtual Payment Address (VPA):
                      </label>
                      <div className="flex items-center gap-space-xs">
                        <input 
                          id="upiIdInput" 
                          type="text" 
                          value={vpaInput}
                          onChange={(e) => setVpaInput(e.target.value)}
                          placeholder="e.g. sarah@oksbi" 
                          className="flex-1 bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm px-space-md py-space-xs rounded-lg outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                        />
                        <button 
                          onClick={() => handleAuthorizePayment(vpaInput.trim() ? `UPI (${vpaInput})` : 'UPI (PhonePe QR)')}
                          className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-space-xs rounded-lg transition-colors whitespace-nowrap shadow-sm"
                          type="button"
                        >
                          Verify & Pay
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Credit / Debit Card */}
                {paymentTab === 'card' && (
                  <div className="pt-space-md space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Accepted Networks</span>
                      <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface font-bold">
                        <span className="px-1.5 py-0.5 bg-surface-container rounded">VISA</span>
                        <span className="px-1.5 py-0.5 bg-surface-container rounded">Mastercard</span>
                        <span className="px-1.5 py-0.5 bg-surface-container rounded">RuPay</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-0.5">Card Number</label>
                      <div className="relative flex items-center">
                        <input 
                          type="text" 
                          maxLength={19}
                          defaultValue="4532 •••• •••• 8892" 
                          placeholder="4532 •••• •••• 8892" 
                          className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm px-space-md py-space-xs rounded-lg outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                        />
                        <span className="material-symbols-outlined text-outline absolute right-3 text-[18px]">credit_card</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-space-sm">
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface-variant mb-0.5">Expiry Date</label>
                        <input 
                          type="text" 
                          maxLength={5} 
                          defaultValue="10/28"
                          placeholder="MM / YY" 
                          className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm px-space-md py-space-xs rounded-lg outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                        />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface-variant mb-0.5">CVV / CVC</label>
                        <input 
                          type="password" 
                          maxLength={4} 
                          defaultValue="492"
                          placeholder="•••" 
                          className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm px-space-md py-space-xs rounded-lg outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-0.5">Cardholder Name</label>
                      <input 
                        type="text" 
                        defaultValue={customer.name}
                        placeholder="Cardholder Name" 
                        className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm px-space-md py-space-xs rounded-lg outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                      />
                    </div>

                    <button 
                      onClick={() => handleAuthorizePayment('Mastercard ending in 8892')}
                      className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-space-sm rounded-lg transition-colors shadow-sm mt-space-xs font-semibold"
                      type="button"
                    >
                      Authorize {formatINR(orderTotal, true)}
                    </button>
                  </div>
                )}

                {/* Tab Content 3: Net Banking & COD */}
                {paymentTab === 'other' && (
                  <div className="pt-space-md space-y-space-sm">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-0.5">Select Preferred Bank</label>
                      <select 
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-lg outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                      >
                        <option>HDFC Bank Direct Corporate / Retail</option>
                        <option>ICICI Bank Internet Banking</option>
                        <option>State Bank of India (SBI)</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>

                    <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between border border-surface-container">
                      <div className="flex items-center gap-space-xs">
                        <input 
                          type="checkbox" 
                          id="codOption" 
                          checked={isCod}
                          onChange={(e) => setIsCod(e.target.checked)}
                          className="accent-primary w-4 h-4 cursor-pointer"
                        />
                        <label className="font-body-sm text-body-sm text-on-surface font-medium cursor-pointer" htmlFor="codOption">
                          Cash on Delivery (COD)
                        </label>
                      </div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant font-mono">+₹49.00 handling</span>
                    </div>

                    <button 
                      onClick={() => handleAuthorizePayment(isCod ? 'Cash on Delivery (COD)' : `NetBanking (${selectedBank})`)}
                      className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-space-sm rounded-lg transition-colors shadow-sm font-semibold"
                      type="button"
                    >
                      Confirm & Proceed ({formatINR(orderTotal, true)})
                    </button>
                  </div>
                )}
              </div>

              {/* Verified Dispatch Address Bar */}
              <div className="pt-space-xs bg-surface-container-low/70 p-space-sm rounded-lg flex items-center justify-between border border-surface-container">
                <div className="flex items-center gap-space-xs min-w-0">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">local_shipping</span>
                  <div className="truncate">
                    {isEditingAddress ? (
                      <input 
                        type="text" 
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="bg-surface-container-lowest px-2 py-0.5 rounded text-xs w-full text-on-surface"
                      />
                    ) : (
                      <>
                        <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">
                          Dispatch: {deliveryAddress}
                        </p>
                        <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                          Arrives Tomorrow via Priority Air Courier
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="font-label-sm text-label-sm text-primary hover:underline shrink-0 ml-space-sm font-semibold" 
                  type="button"
                >
                  {isEditingAddress ? 'Save' : 'Change'}
                </button>
              </div>

              {/* Real-Time Confirmation Banner Container */}
              {isPreAuthorized && (
                <div 
                  id="paymentSuccessNotice"
                  className="bg-secondary-container p-space-md rounded-lg flex items-start gap-space-sm text-on-secondary-container animate-fade-in border border-secondary"
                >
                  <span className="material-symbols-outlined text-secondary text-[24px] mt-0.5">task_alt</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-label-md font-bold">Transaction Pre-Authorized ({authorizedOrderRef})</p>
                    <p className="font-body-sm text-[12px]">Consignment booked with carrier logistics. Priority fulfillment initialized.</p>
                    <button 
                      onClick={() => setActivePage('track-order')}
                      className="mt-2 bg-secondary text-on-secondary px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 hover:opacity-95"
                    >
                      <span>Track Consignment Order</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>
      </div>

      {/* Bottom Interactive Atelier Specs & Trust Guarantee Row */}
      <section className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-desktop py-space-xl">
        <div className="bg-surface-container-low rounded-xl p-space-lg border border-surface-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold">
                <span className="material-symbols-outlined text-[20px]">tune</span>
                <span>Spatial Audio Engine</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Embedded head-tracking IMU gyroscopes render genuine 360-degree holographic soundscapes.
              </p>
            </div>

            <div className="space-y-space-xs">
              <div className="flex items-center gap-2 text-secondary font-label-lg text-label-lg font-bold">
                <span className="material-symbols-outlined text-[20px]">mic</span>
                <span>ClearVoice 8-Mic Array</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Beamforming microphones isolate human vocal timbre while suppressing wind and urban noise.
              </p>
            </div>

            <div className="space-y-space-xs">
              <div className="flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Atelier Guarantee</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Individually acoustic-calibrated with an included serialized frequency certificate.
              </p>
            </div>

            <div className="space-y-space-xs">
              <div className="flex items-center gap-2 text-tertiary-container font-label-lg text-label-lg font-bold">
                <span className="material-symbols-outlined text-[20px]">recycling</span>
                <span>Circular Hardware</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Constructed with 84% recycled aerospace alloy and replaceable modular acoustic cushions.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
