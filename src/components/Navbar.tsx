import React, { useState } from 'react';
import { useStore, ActivePage } from '../context/StoreContext';
import { LOGO_URL } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    cart,
    wishlistIds,
    customer,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsChatOpen,
    setIsChatMinimized
  } = useStore();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin md:px-margin-desktop flex items-center justify-between gap-space-md lg:gap-space-lg">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('shop')} 
          className="flex items-center gap-space-md shrink-0 cursor-pointer group"
        >
          <img 
            alt="Aura Commerce Logo" 
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            src={LOGO_URL} 
          />
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight hidden sm:inline">
            Aura Commerce
          </span>
        </div>

        {/* Search & Category Selector Bar */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4">
          <div className="flex items-center bg-surface-container-lowest rounded-lg p-space-xs shadow-[0_1px_3px_rgba(15,23,42,0.04)] border border-outline-variant/30">
            <select 
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                if (activePage !== 'shop') setActivePage('shop');
              }}
              className="bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg px-space-sm py-space-xs outline-none cursor-pointer hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="audio">Premium Audio</option>
              <option value="desk">Desk Setup</option>
              <option value="wearables">Wearables</option>
              <option value="home">Home Living</option>
            </select>

            <div className="h-4 w-px bg-outline-variant mx-space-xs"></div>

            <div className="flex items-center flex-1 px-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px] mr-space-xs">search</span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== 'shop' && activePage !== 'categories' && activePage !== 'deals') {
                    setActivePage('shop');
                  }
                }}
                placeholder="Search ultra-premium products, brands..." 
                className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-outline hover:text-on-surface text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Primary Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-space-sm">
          <button
            onClick={() => handleNavClick('shop')}
            className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
              activePage === 'shop'
                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
              activePage === 'categories'
                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => handleNavClick('deals')}
            className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
              activePage === 'deals'
                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Deals
          </button>
          <button
            onClick={() => handleNavClick('track-order')}
            className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
              activePage === 'track-order'
                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Track Order
          </button>
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-space-xs sm:gap-space-sm shrink-0">
          
          {/* Super Admin & Supplier Admin Switchers */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button 
              onClick={() => handleNavClick('super-admin')}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full font-label-sm text-xs transition-all shadow-xs ${
                activePage === 'super-admin'
                  ? 'bg-amber-400 text-slate-900 font-bold ring-2 ring-primary'
                  : 'bg-primary/10 hover:bg-primary/20 text-primary font-bold'
              }`}
              title="Super Admin: Products, Pricing, Offers & Suppliers"
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span className="hidden xs:inline sm:inline">Super Admin</span>
              <span className="inline xs:hidden sm:hidden">Admin</span>
            </button>

            <button 
              onClick={() => handleNavClick('supplier-portal')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-xs transition-all shadow-xs ${
                activePage === 'supplier-portal'
                  ? 'bg-primary text-on-primary font-bold ring-2 ring-primary'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container font-semibold'
              }`}
              title="Supplier Portal: List Goods & Commission Split"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Supplier Portal</span>
            </button>
          </div>

          {/* Customer Support Trigger */}
          <button 
            onClick={() => {
              setIsChatOpen(true);
              setIsChatMinimized(false);
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            title="Live Aura Concierge"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>

          {/* Wishlist Button with Counter */}
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            title="Wishlist Vault"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {wishlistIds.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-tertiary-container text-on-tertiary font-label-sm text-[10px] leading-none rounded-full flex items-center justify-center font-bold">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Cart Button with Counter */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            title="Cart Preview"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartItemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary font-label-sm text-[10px] leading-none rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Customer Profile Pill & Quick Dropdown */}
          <div className="relative">
            <div 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-space-xs pl-space-xs cursor-pointer rounded-full hover:bg-surface-container py-space-xs px-space-xs transition-colors"
              title="Patron Profile"
            >
              <img 
                alt={customer.name} 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" 
                src={customer.avatar} 
              />
              <span className="material-symbols-outlined text-outline text-[16px]">expand_more</span>
            </div>

            {isProfileMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-surface-container">
                  <p className="font-label-md text-label-md font-bold text-on-surface">{customer.name}</p>
                  <p className="font-body-sm text-[12px] text-on-surface-variant truncate">{customer.email}</p>
                  <div className="inline-flex items-center gap-1 mt-1 bg-surface-container px-2 py-0.5 rounded-full text-[11px] text-primary font-semibold">
                    <span className="material-symbols-outlined text-[14px]">military_tech</span>
                    <span>{customer.tier}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button 
                    onClick={() => handleNavClick('track-order')}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container flex items-center gap-2 font-label-md text-label-md text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">inventory_2</span>
                    <span>Orders & Consignments</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('track-order')}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container flex items-center gap-2 font-label-md text-label-md text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">location_on</span>
                    <span>Saved Addresses ({customer.savedPlacesCount})</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('super-admin')}
                    className="w-full text-left px-4 py-2 hover:bg-amber-50 flex items-center gap-2 font-label-md text-label-md text-amber-900 border-t border-surface-container font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px] text-amber-600">admin_panel_settings</span>
                    <span>Super Admin Console</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('supplier-portal')}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container flex items-center gap-2 font-label-md text-label-md text-on-surface font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">handshake</span>
                    <span>Supplier Admin Portal</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('admin-portal')}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container flex items-center gap-2 font-label-md text-label-md text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">storefront</span>
                    <span>Merchant Operations Hub</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
