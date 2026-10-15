import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';
import { Product } from '../types';

export const SupplierPortalView: React.FC = () => {
  const {
    suppliers,
    currentSupplierId,
    setCurrentSupplierId,
    products,
    addNewProduct,
    orders,
    setActivePage,
    showToast
  } = useStore();

  const activeSupplier = suppliers.find(s => s.id === currentSupplierId) || suppliers[0];

  // Filter products by this supplier
  const supplierProducts = products.filter(p => p.supplierId === activeSupplier.id || p.supplierName === activeSupplier.companyName);

  // New Supplier Product State
  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<'electronics' | 'audio' | 'desk' | 'wearables' | 'home' | 'apparel' | 'lighting' | 'carry'>('audio');
  const [price, setPrice] = useState(14999);
  const [stock, setStock] = useState(25);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const commissionRate = activeSupplier.commissionRate || 10;
  const netSupplierRevenuePerUnit = Math.round(price * (1 - commissionRate / 100));

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !sku.trim()) {
      showToast('Title and SKU are required');
      return;
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title,
      sku: sku.toUpperCase(),
      category: category === 'audio' ? 'High-Fidelity Audio' : category === 'lighting' ? 'Spatial Lighting' : 'Industrial Tech',
      categorySlug: category,
      department: 'Supplier Partner Collection',
      price,
      originalPrice: Math.round(price * 1.15),
      discountBadge: 'New Partner Item',
      rating: 5.0,
      reviewCount: 'Launch',
      image: imageUrl.trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyAQk_7SRp7X-2CAvSyLTrFZ3b4Y5bch7Qf5mFE8OeZ3y2uxwy2grXZVBnaZPt4JAHaLfsiQkTeN5fNTKC32gaCr9-3y83A5wbPAYvAt8NlVTXHI0h7cGzt8Zb5cF190tnjH4cdJABGmOoQ49wc3NxL3F1KF6f3E2XLPg53edn8xfiT_SmhWxyVBVNviBNVUgUyh0PR91mILNcH3SfwpGpx7k46floIM4IfmbFa4m2dHgRA0LW_ncB',
      supplierId: activeSupplier.id,
      supplierName: activeSupplier.companyName,
      approvalStatus: 'APPROVED',
      isFeatured: false,
      inStockCount: stock,
      description: description || `Crafted by ${activeSupplier.companyName}. Certified for Aura Atelier catalog.`
    };

    addNewProduct(newProd);
    setTitle('');
    setSku('');
    setImageUrl('');
    setDescription('');
    showToast(`"${title}" submitted by ${activeSupplier.companyName} and listed on storefront!`);
  };

  return (
    <div className="min-h-screen bg-background pb-space-xl">
      
      {/* Header */}
      <section className="bg-surface-container-low border-b border-surface-container py-space-lg px-margin md:px-margin-desktop shadow-xs">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          
          <div className="flex items-center gap-space-md">
            <img 
              src={activeSupplier.avatar} 
              alt={activeSupplier.companyName} 
              className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/20 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {activeSupplier.companyName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary uppercase">
                  Verified Supplier Admin
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Executive: <span className="font-bold text-on-surface">{activeSupplier.name}</span> • GSTIN: <code className="font-mono">{activeSupplier.gstin}</code> • City: {activeSupplier.city}
              </p>
            </div>
          </div>

          {/* Switch Active Supplier Test Dropdown */}
          <div className="flex items-center gap-space-sm self-start md:self-auto flex-wrap">
            <div className="bg-surface-container-lowest px-space-sm py-1 rounded-lg border border-surface-container flex items-center gap-2">
              <span className="text-xs text-outline font-semibold">Switch Vendor:</span>
              <select
                value={currentSupplierId}
                onChange={(e) => setCurrentSupplierId(e.target.value)}
                className="bg-transparent text-xs font-bold text-primary outline-none cursor-pointer"
              >
                {suppliers.filter(s => s.adminAccessGranted).map(s => (
                  <option key={s.id} value={s.id}>
                    {s.companyName} ({s.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setActivePage('super-admin')}
              className="bg-primary text-on-primary font-label-sm text-xs px-space-md py-2 rounded-lg font-bold shadow-xs hover:bg-primary-container transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>Back to Super Admin</span>
            </button>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop pt-space-lg space-y-space-xl">
        
        {/* Metric Cards for this Supplier */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-1">
            <span className="font-label-sm text-xs text-outline uppercase font-semibold">Gross Dispatched Revenue</span>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">
              {formatINR(activeSupplier.totalRevenue || 1845000)}
            </p>
            <span className="text-xs text-secondary font-semibold">Billed through Aura Platform</span>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-1">
            <span className="font-label-sm text-xs text-outline uppercase font-semibold">Platform Commission</span>
            <p className="font-headline-md text-headline-md font-bold text-primary">
              {commissionRate}%
            </p>
            <span className="text-xs text-on-surface-variant font-medium">Standard contract agreement</span>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-1">
            <span className="font-label-sm text-xs text-outline uppercase font-semibold">Live Listed SKUs</span>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">
              {supplierProducts.length}
            </p>
            <span className="text-xs text-emerald-600 font-bold">100% Active in Storefront</span>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-1">
            <span className="font-label-sm text-xs text-outline uppercase font-semibold">Next Payout Cycle</span>
            <p className="font-headline-md text-headline-md font-bold text-secondary">
              Friday
            </p>
            <span className="text-xs text-outline font-mono">NEFT / RTGS Direct Bank</span>
          </div>
        </div>

        {/* Content Layout: Add Product + Product List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          
          {/* Add Product by Supplier Form (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">add_business</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                List New Product for Sale
              </h3>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              As an authorized Supplier Admin for <span className="font-bold">{activeSupplier.companyName}</span>, your products are immediately available to patrons.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-space-sm">
              <div>
                <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Product Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Planar Wireless Studio Buds"
                  className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Supplier SKU *</label>
                  <input 
                    type="text" 
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="VND-AUDIO-09"
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container font-medium"
                  >
                    <option value="audio">High-End Audio</option>
                    <option value="lighting">Spatial Lighting</option>
                    <option value="desk">Minimalist Peripherals</option>
                    <option value="wearables">Biometric Wearables</option>
                    <option value="electronics">Industrial Tech</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Price (₹) *</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm font-bold outline-none border border-surface-container"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Stock Count</label>
                  <input 
                    type="number" 
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                  />
                </div>
              </div>

              {/* Commission Split Insight */}
              <div className="bg-surface-container-low p-space-sm rounded-lg text-xs space-y-1">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Retail Price:</span>
                  <span className="font-bold text-on-surface">{formatINR(price)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Aura Platform Commission ({commissionRate}%):</span>
                  <span className="text-error font-medium">-{formatINR(price * (commissionRate / 100))}</span>
                </div>
                <div className="flex justify-between text-secondary font-bold pt-1 border-t border-surface-container">
                  <span>Net Payout to Your Bank:</span>
                  <span>{formatINR(netSupplierRevenuePerUnit)}</span>
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Product Photo URL</label>
                <input 
                  type="url" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-xs outline-none border border-surface-container"
                />
              </div>

              <div>
                <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Specifications & Warranty</label>
                <textarea 
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe materials, driver dimensions, or finish details..."
                  className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-xs outline-none border border-surface-container"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                <span>Submit SKU to Live Catalog</span>
              </button>
            </form>
          </div>

          {/* Supplier Listed Products (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
            <div className="flex items-center justify-between border-b border-surface-container pb-space-sm">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Catalog Listed by {activeSupplier.companyName} ({supplierProducts.length})
              </h3>
              <span className="text-xs text-outline">Verified Live in Storefront</span>
            </div>

            {supplierProducts.length === 0 ? (
              <div className="py-12 text-center text-outline">
                <span className="material-symbols-outlined text-[40px]">inventory</span>
                <p className="mt-1 font-semibold text-sm">No items listed yet</p>
                <p className="text-xs">Use the form on the left to add your first product batch.</p>
              </div>
            ) : (
              <div className="space-y-space-sm max-h-[550px] overflow-y-auto pr-1">
                {supplierProducts.map(prod => (
                  <div 
                    key={prod.id}
                    className="p-space-sm bg-surface-container-low rounded-lg border border-surface-container flex items-center gap-space-md hover:border-primary/40 transition-colors"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      className="w-16 h-16 rounded-lg object-cover bg-surface-container shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-outline font-bold">{prod.sku}</span>
                        <span className="text-[10px] bg-secondary-container/30 text-secondary font-bold px-1.5 py-0.2 rounded">
                          {prod.category}
                        </span>
                      </div>
                      <h4 className="font-label-md text-label-md font-bold text-on-surface truncate mt-0.5">
                        {prod.title}
                      </h4>
                      <p className="text-xs font-bold text-primary mt-0.5">
                        {formatINR(prod.price)} <span className="text-outline font-normal">({prod.inStockCount || 35} in stock)</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

    </div>
  );
};
