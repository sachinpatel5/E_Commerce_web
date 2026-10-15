import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { formatINR } from '../utils/currency';

export const StorefrontView: React.FC = () => {
  const {
    products,
    openProductDetail,
    addToCart,
    toggleWishlist,
    isWishlisted,
    selectedDepartment,
    setSelectedDepartment,
    searchQuery,
    activeQuickFilters,
    toggleQuickFilter,
    sortBy,
    setSortBy
  } = useStore();

  // Flash kinetic drops countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 38, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 38, seconds: 19 }; // loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products
  const filteredProducts = products.filter(p => {
    // Department filter
    if (selectedDepartment !== 'all') {
      const matchDept = p.categorySlug === selectedDepartment || 
        p.department.toLowerCase().includes(selectedDepartment.toLowerCase()) ||
        p.category.toLowerCase().includes(selectedDepartment.toLowerCase());
      if (!matchDept) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query));
      if (!matchSearch) return false;
    }

    // Quick filters
    if (activeQuickFilters.under10k && p.price >= 10000) return false;
    if (activeQuickFilters.topRated && p.rating < 4.5) return false;
    if (activeQuickFilters.freeShipping && p.price < 5000 && p.discountBadge !== 'Free Shipping') return false;
    if (activeQuickFilters.inStock && p.badge === 'Only 4 Left') return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Highest Customer Rating') return b.rating - a.rating;
    return 0; // Featured
  });

  const flashItems = products.filter(p => p.isFlashDrop);

  return (
    <div className="flex flex-col w-full">
      
      {/* Top Curated Editorial Hero & Announcement Frame */}
      <section className="relative w-full overflow-hidden bg-surface-container-low">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            
            {/* Left: Asymmetrical Headline & CTA Block */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-space-lg">
              <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-sm mb-space-md border border-outline-variant/30">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Autumn Edition 04 / 2025</span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Archived Atelier Releases</span>
              </div>

              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mb-space-md max-w-2xl">
                Crafted for <span className="text-primary italic font-normal">Modern</span> Living.
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-lg">
                An uncompromising curation of tactile desktop ergonomics, precision acoustic engineering, and minimal architectural essentials crafted for singular focus.
              </p>

              <div className="flex flex-wrap items-center gap-space-md mb-space-xl w-full sm:w-auto">
                <button 
                  onClick={() => openProductDetail('soundpro-anc')}
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-xl py-space-md rounded-lg shadow-md transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center gap-space-xs"
                >
                  <span>Explore Curated Vault</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <a 
                  href="#catalog-grid"
                  className="bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-lg text-label-lg px-space-lg py-space-md rounded-lg shadow-sm transition-colors flex items-center gap-space-xs border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-outline text-[18px]">tune</span>
                  <span>Filter Catalog</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md w-full pt-space-md border-t-0 bg-surface-container-lowest/70 backdrop-blur-md p-space-md rounded-xl shadow-sm border border-outline-variant/20">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">Fast Priority Delivery</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] truncate">Same-day dispatch</p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">7-Day Free Returns</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] truncate">Automated courier pickup</p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[20px]">encrypted</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">Secure UPI / Card</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] truncate">Instant zero-fee flow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Layered Showcase Visual */}
            <div className="lg:col-span-5 relative mt-space-lg lg:mt-0">
              <div 
                onClick={() => openProductDetail('linear-hifi-monolith')}
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-surface-container-highest cursor-pointer group"
              >
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="High-end minimalist industrial tech workspace" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBomrUdMhjijtnfUpJRgO9EaWBcK5MJ7lWjlRv3mKZYAJe1gCAEJ4dunN-i_0NpBazQNe8s27Di8IfGqHJPQXZh5Th2YEkJDBPtqIt68jEJAr5egVn1gNCwQDISmy6gUlT6cmeRUJZD8PahyeVnHTKZLeA50dDB8mfu_zcTNbe_8gH-rxBNqpm_KsTRb26D_6fFouDVewFVe8N5ZiVZvdlBf9Hv7xecTVjFBYFbDx_ZNSUEYEaqOykW" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex flex-col justify-end p-space-lg">
                  <div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-xl shadow-lg flex items-center justify-between border border-outline-variant/30">
                    <div>
                      <span className="font-label-sm text-label-sm text-tertiary-container font-bold uppercase tracking-wider">
                        Spotlight Artifact
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Linear Hi-Fi Studio Monolith</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Calibrated planar acoustic drivers</p>
                    </div>
                    <div className="text-right pl-space-sm shrink-0">
                      <p className="font-label-sm text-label-sm line-through text-outline">₹31,999</p>
                      <p className="font-headline-md text-headline-md text-primary font-bold">₹24,999</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floated Architectural Pill Accent */}
              <div className="absolute -top-4 -right-4 bg-surface-container-lowest shadow-lg px-space-md py-space-xs rounded-full flex items-center gap-space-xs hidden sm:flex border border-outline-variant/30">
                <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Precision Verified Batch</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instant Category Ribbon */}
      <section className="w-full bg-surface-container-lowest shadow-sm py-space-md border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">Select Domain</span>
            <button 
              onClick={() => setSelectedDepartment('all')} 
              className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline"
            >
              View All 18 Departments →
            </button>
          </div>

          <div className="flex items-center gap-space-sm overflow-x-auto pb-space-xs no-scrollbar">
            <button 
              onClick={() => setSelectedDepartment('all')}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full shrink-0 shadow-sm transition-all ${
                selectedDepartment === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">memory</span>
              <span className="font-label-md text-label-md font-semibold">All Departments</span>
            </button>

            <button 
              onClick={() => setSelectedDepartment('audio')}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full shrink-0 transition-colors ${
                selectedDepartment === 'audio'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">headphones</span>
              <span className="font-label-md text-label-md">Premium Audio</span>
            </button>

            <button 
              onClick={() => setSelectedDepartment('desk')}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full shrink-0 transition-colors ${
                selectedDepartment === 'desk'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
              <span className="font-label-md text-label-md">Minimal Desk Setup</span>
            </button>

            <button 
              onClick={() => setSelectedDepartment('wearables')}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full shrink-0 transition-colors ${
                selectedDepartment === 'wearables'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">watch</span>
              <span className="font-label-md text-label-md">Lifestyle & Wearables</span>
            </button>

            <button 
              onClick={() => setSelectedDepartment('home')}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full shrink-0 transition-colors ${
                selectedDepartment === 'home'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">chair</span>
              <span className="font-label-md text-label-md">Home Essentials</span>
            </button>

            <button 
              onClick={() => setSelectedDepartment('lighting')}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full shrink-0 transition-colors ${
                selectedDepartment === 'lighting'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">nest_heat_link_gen_3</span>
              <span className="font-label-md text-label-md">Spatial Ambience</span>
            </button>
          </div>
        </div>
      </section>

      {/* Flash Deals Countdown Section (Bento Highlight) */}
      <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-container/10 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md mb-space-lg">
            <div>
              <div className="flex items-center gap-space-xs mb-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[22px]">timer</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">Limited Vault Allotment</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Flash Kinetic Drops</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Exclusive unit pricing terminating strictly at round close.</p>
            </div>

            {/* Real-time Countdown Timer Badge */}
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm border border-outline-variant/30">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium mr-space-xs">Ends in:</span>
              <div className="flex items-center gap-1 font-headline-sm text-headline-sm font-bold text-on-surface tabular-nums">
                <span className="bg-surface-container px-2 py-0.5 rounded text-primary">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-outline">:</span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-primary">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-outline">:</span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-error animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Flash Items Bento Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
            {flashItems.map((item) => (
              <div 
                key={item.id}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/30 group"
              >
                <div 
                  onClick={() => openProductDetail(item.id)}
                  className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container mb-space-md cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2 left-2 bg-error text-on-error font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {item.discountBadge || '-30% Flash'}
                  </span>
                </div>

                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{item.category}</span>
                  <h3 
                    onClick={() => openProductDetail(item.id)}
                    className="font-headline-sm text-headline-sm text-on-surface mb-1 cursor-pointer hover:text-primary transition-colors"
                  >
                    {item.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-space-xs mb-space-sm">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">{formatINR(item.price)}</span>
                    {item.originalPrice && (
                      <span className="font-body-sm text-body-sm text-outline line-through">{formatINR(item.originalPrice)}</span>
                    )}
                    <span className="font-label-sm text-label-sm text-secondary font-semibold ml-auto">
                      {item.discountBadge || `Save ${formatINR(item.originalPrice ? item.originalPrice - item.price : 4000)}`}
                    </span>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="space-y-1 mb-space-md">
                    <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Stock allocation</span>
                      <span className="font-bold text-tertiary">{item.stockClaimedText || '80% claimed'}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div 
                        className="h-full bg-tertiary-container rounded-full transition-all duration-500" 
                        style={{ width: `${item.stockAllocationPercent || 75}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => addToCart(item, 1)}
                  className="w-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md py-space-sm rounded-lg transition-colors flex items-center justify-center gap-space-xs active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>Claim Discount</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Quick-Tag Search Toolbar */}
      <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop w-full mb-space-lg" id="catalog-grid">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-space-md">
            
            {/* Quick Keyword Filter Form */}
            <div className="flex items-center gap-space-xs w-full lg:w-96 bg-surface-container-low px-space-md py-space-xs rounded-lg">
              <span className="material-symbols-outlined text-outline text-[20px]">filter_list</span>
              <input 
                type="text"
                placeholder="Refine specifications, material, chipset..." 
                className="bg-transparent font-body-sm text-body-sm text-on-surface outline-none w-full placeholder:text-outline"
                onChange={(e) => useStore().setSearchQuery(e.target.value)}
              />
            </div>

            {/* Active Filter Pills Bar */}
            <div className="flex flex-wrap items-center gap-space-xs w-full lg:w-auto">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1">Quick Filters:</span>
              
              <button 
                onClick={() => toggleQuickFilter('under10k')}
                className={`filter-pill font-label-sm text-label-sm px-space-md py-1.5 rounded-full flex items-center gap-1 transition-all ${
                  activeQuickFilters.under10k 
                    ? 'bg-on-surface text-surface' 
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span>Under ₹10,000</span>
                {activeQuickFilters.under10k && (
                  <span className="material-symbols-outlined text-[14px]">close</span>
                )}
              </button>

              <button 
                onClick={() => toggleQuickFilter('topRated')}
                className={`filter-pill font-label-sm text-label-sm px-space-md py-1.5 rounded-full flex items-center gap-1 transition-all ${
                  activeQuickFilters.topRated 
                    ? 'bg-on-surface text-surface' 
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-tertiary-container">star</span>
                <span>Top Rated 4.5+</span>
              </button>

              <button 
                onClick={() => toggleQuickFilter('freeShipping')}
                className={`filter-pill font-label-sm text-label-sm px-space-md py-1.5 rounded-full flex items-center gap-1 transition-all ${
                  activeQuickFilters.freeShipping 
                    ? 'bg-on-surface text-surface' 
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-secondary">local_shipping</span>
                <span>Free Shipping</span>
              </button>

              <button 
                onClick={() => toggleQuickFilter('inStock')}
                className={`filter-pill font-label-sm text-label-sm px-space-md py-1.5 rounded-full flex items-center gap-1 transition-all ${
                  activeQuickFilters.inStock 
                    ? 'bg-on-surface text-surface' 
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>In Stock</span>
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-space-xs shrink-0 self-end lg:self-auto">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container text-on-surface font-label-sm text-label-sm rounded-lg px-space-sm py-1.5 outline-none cursor-pointer"
              >
                <option>Featured Curations</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Customer Rating</option>
                <option>Latest Atelier Release</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* Curated Product Grid */}
      <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop w-full pb-space-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {sortedProducts.map((product) => {
            const wishActive = isWishlisted(product.id);
            return (
              <div 
                key={product.id}
                className="group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden border border-outline-variant/30"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div 
                    onClick={() => openProductDetail(product.id)}
                    className="relative w-full aspect-square bg-surface-container-low overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          product.badgeType === 'limited' ? 'bg-tertiary' : 'bg-secondary'
                        }`}></span>
                        <span className={`font-label-sm text-[10px] font-bold uppercase ${
                          product.badgeType === 'limited' ? 'text-tertiary' : 'text-secondary'
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Heart Toggle */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-all hover:scale-110 ${
                        wishActive ? 'text-error' : 'text-outline hover:text-error'
                      }`}
                      title={wishActive ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <span 
                        className="material-symbols-outlined text-[18px]" 
                        style={{ fontVariationSettings: wishActive ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-space-md">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{product.category}</span>
                    <h3 
                      onClick={() => openProductDetail(product.id)}
                      className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors line-clamp-1 mt-0.5 cursor-pointer font-bold"
                    >
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-amber-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">{product.rating}</span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">({product.reviewCount} reviews)</span>
                    </div>

                    <div className="flex items-baseline gap-space-xs mt-space-sm">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{formatINR(product.price)}</span>
                      {product.originalPrice && (
                        <span className="font-body-sm text-body-sm text-outline line-through">{formatINR(product.originalPrice)}</span>
                      )}
                      {product.discountBadge && (
                        <span className="font-label-sm text-label-sm text-secondary font-semibold ml-auto">
                          {product.discountBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-space-md pb-space-md">
                  <button 
                    onClick={() => addToCart(product, 1)}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-space-xs active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination & Catalog Counter */}
        <div className="mt-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Showing <span className="font-bold text-on-surface">{sortedProducts.length}</span> of{' '}
            <span className="font-bold text-on-surface">64</span> verified products
          </span>

          <div className="flex items-center gap-space-xs">
            <button className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-outline cursor-not-allowed">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-9 h-9 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold">1</button>
            <button className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors">2</button>
            <button className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors">3</button>
            <span className="px-1 text-outline">...</span>
            <button className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors">8</button>
            <button className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
