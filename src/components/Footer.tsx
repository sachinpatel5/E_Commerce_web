import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LOGO_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  const { setActivePage, isChatOpen, setIsChatOpen, setIsChatMinimized, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    showToast(`Subscribed ${newsletterEmail} to private atelier releases!`);
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] mt-space-xl">
      {/* 4 Trust Badges Strip */}
      <div className="bg-surface-container-low py-space-lg">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-lg">
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Authentic Guarantee</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Direct from vetted ateliers</p>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-secondary text-[28px]">local_shipping</span>
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Complimentary Express</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">On all orders above ₹1,999</p>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-primary text-[28px]">published_with_changes</span>
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Seamless 30-Day Returns</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Automated doorstep pick-up</p>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-secondary text-[28px]">lock</span>
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Encrypted Checkout</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">PCI-DSS Tier-1 compliant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <div className="flex items-center gap-space-md">
              <img alt="Aura Commerce Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
              <span className="font-headline-sm text-headline-sm text-on-surface">Aura Commerce</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Curating elevated architectural goods, tech objects, and high-velocity commerce essentials crafted for modern living.
            </p>
            <div className="pt-space-sm">
              <p className="font-label-md text-label-md text-on-surface mb-space-xs">Subscribe to Private Releases</p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-space-xs max-w-md">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your institutional email" 
                  className="flex-1 bg-surface-container px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none focus:ring-1 focus:ring-primary"
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-lg py-space-xs rounded-lg transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Catalog Department Links */}
          <div>
            <p className="font-label-lg text-label-lg text-on-surface mb-space-md font-bold">Catalog</p>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li onClick={() => setActivePage('shop')} className="hover:text-on-surface cursor-pointer transition-colors">New Releases</li>
              <li onClick={() => setActivePage('categories')} className="hover:text-on-surface cursor-pointer transition-colors">Industrial Tech</li>
              <li onClick={() => setActivePage('categories')} className="hover:text-on-surface cursor-pointer transition-colors">Minimalist Peripherals</li>
              <li onClick={() => setActivePage('categories')} className="hover:text-on-surface cursor-pointer transition-colors">Spatial Objects</li>
              <li onClick={() => setActivePage('deals')} className="hover:text-on-surface cursor-pointer transition-colors">Private Vault Sale</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <p className="font-label-lg text-label-lg text-on-surface mb-space-md font-bold">Customer Care</p>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li onClick={() => setActivePage('track-order')} className="hover:text-on-surface cursor-pointer transition-colors">Order Tracking</li>
              <li onClick={() => showToast('Returns policy: Automated doorstep pickup within 30 days.')} className="hover:text-on-surface cursor-pointer transition-colors">Returns & Exchanges</li>
              <li onClick={() => showToast('Shipping: Complimentary express on orders over ₹1,999.')} className="hover:text-on-surface cursor-pointer transition-colors">Shipping Rates</li>
              <li onClick={() => showToast('Official 2-Year Studio Warranty on all items.')} className="hover:text-on-surface cursor-pointer transition-colors">Warranty Claims</li>
              <li onClick={() => { setIsChatOpen(true); setIsChatMinimized(false); }} className="hover:text-on-surface cursor-pointer transition-colors">Contact Concierge</li>
            </ul>
          </div>

          {/* Enterprise & Policies */}
          <div>
            <p className="font-label-lg text-label-lg text-on-surface mb-space-md font-bold">Enterprise & Policies</p>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li onClick={() => setActivePage('admin-portal')} className="hover:text-on-surface cursor-pointer transition-colors font-semibold text-primary">Merchant Central</li>
              <li onClick={() => showToast('Privacy Policy: End-to-end encrypted user tokens.')} className="hover:text-on-surface cursor-pointer transition-colors">Privacy Policy</li>
              <li onClick={() => showToast('Terms: Curated limited releases.')} className="hover:text-on-surface cursor-pointer transition-colors">Terms of Service</li>
              <li onClick={() => showToast('Responsible Sourcing: 84% recycled aerospace alloy.')} className="hover:text-on-surface cursor-pointer transition-colors">Responsible Sourcing</li>
              <li onClick={() => showToast('Developer API documentation available for enterprise partners.')} className="hover:text-on-surface cursor-pointer transition-colors">API Documentation</li>
            </ul>
          </div>
        </div>

        {/* Payment Partners & Copyright */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-low px-space-lg py-space-md rounded-xl">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="font-label-sm text-label-sm text-on-surface-variant mr-space-xs">Trusted Payment Partners:</span>
            <span className="px-space-sm py-space-xs bg-surface-container-lowest rounded text-on-surface font-label-sm text-label-sm font-bold shadow-[0_1px_3px_rgba(15,23,42,0.02)]">UPI</span>
            <span className="px-space-sm py-space-xs bg-surface-container-lowest rounded text-on-surface font-label-sm text-label-sm font-bold shadow-[0_1px_3px_rgba(15,23,42,0.02)]">RuPay</span>
            <span className="px-space-sm py-space-xs bg-surface-container-lowest rounded text-on-surface font-label-sm text-label-sm font-bold shadow-[0_1px_3px_rgba(15,23,42,0.02)]">VISA</span>
            <span className="px-space-sm py-space-xs bg-surface-container-lowest rounded text-on-surface font-label-sm text-label-sm font-bold shadow-[0_1px_3px_rgba(15,23,42,0.02)]">Mastercard</span>
            <span className="px-space-sm py-space-xs bg-surface-container-lowest rounded text-on-surface font-label-sm text-label-sm font-bold shadow-[0_1px_3px_rgba(15,23,42,0.02)]">NetBanking</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025 Aura Commerce Platforms Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Concierge Action Trigger when chat drawer is closed */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => {
              setIsChatOpen(true);
              setIsChatMinimized(false);
            }}
            type="button"
            className="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary pl-space-md pr-space-lg py-space-sm rounded-full shadow-[0_12px_32px_rgba(15,23,42,0.18)] transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
            <span className="font-label-md text-label-md font-semibold">Customer Support</span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
          </button>
        </div>
      )}
    </footer>
  );
};
