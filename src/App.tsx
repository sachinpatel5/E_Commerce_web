import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuraChatDrawer } from './components/AuraChatDrawer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { LiveGpsModal } from './components/LiveGpsModal';
import { InvoiceModal } from './components/InvoiceModal';

import { StorefrontView } from './views/StorefrontView';
import { ProductDetailView } from './views/ProductDetailView';
import { CustomerPortalView } from './views/CustomerPortalView';
import { MerchantAdminView } from './views/MerchantAdminView';
import { SuperAdminView } from './views/SuperAdminView';
import { SupplierPortalView } from './views/SupplierPortalView';

const MainAppContent: React.FC = () => {
  const { activePage, toastMessage } = useStore();

  const isMerchantAdmin = activePage === 'admin-portal';
  const isSuperAdmin = activePage === 'super-admin';
  const isSupplierPortal = activePage === 'supplier-portal';

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Global Navbar */}
      {!isMerchantAdmin && <Navbar />}

      {/* Main View Router */}
      <main className={`flex-1 w-full ${!isMerchantAdmin ? 'pt-20' : ''}`}>
        {isMerchantAdmin && <MerchantAdminView />}
        {isSuperAdmin && <SuperAdminView />}
        {isSupplierPortal && <SupplierPortalView />}
        {activePage === 'shop' && <StorefrontView />}
        {activePage === 'categories' && <StorefrontView />}
        {activePage === 'deals' && <StorefrontView />}
        {activePage === 'pdp' && <ProductDetailView />}
        {activePage === 'track-order' && <CustomerPortalView />}
      </main>

      {/* Global Footer (Visible on Storefront and Customer views) */}
      {!isMerchantAdmin && !isSuperAdmin && <Footer />}

      {/* Interactive Global Overlays & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <AuraChatDrawer />
      <LiveGpsModal />
      <InvoiceModal />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 left-6 z-50 bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-xl shadow-xl flex items-center gap-space-sm animate-in fade-in slide-in-from-bottom-2 duration-200 border border-inverse-on-surface/20"
        >
          <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
            check_circle
          </span>
          <div>
            <p className="font-label-md text-label-md font-bold">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
