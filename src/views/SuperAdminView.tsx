import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';
import { LOGO_URL, ORACLE_SCHEMA_DDL } from '../data/mockData';
import { Product, Supplier, Offer, EmailLogItem } from '../types';

export const SuperAdminView: React.FC = () => {
  const {
    products,
    addNewProduct,
    updateProductDiscount,
    triggerFlashOffer,
    approveSupplierProduct,
    suppliers,
    addSupplier,
    toggleSupplierAdminAccess,
    updateSupplierCommission,
    offers,
    addOffer,
    toggleOffer,
    deleteOffer,
    emailConfig,
    updateEmailConfig,
    emailLogs,
    triggerTestEmail,
    deleteEmailLog,
    telemetry,
    setActivePage,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'catalog' | 'suppliers' | 'offers' | 'email' | 'oracle'>('catalog');

  // Product Upload Form State
  const [productTitle, setProductTitle] = useState('Aura Titanium Monolith Luminary');
  const [productSku, setProductSku] = useState('AUR-TITAN-LUM-01');
  const [productCategory, setProductCategory] = useState<'lighting' | 'electronics' | 'audio' | 'desk' | 'wearables' | 'home' | 'apparel' | 'carry'>('lighting');
  const [productDepartment, setProductDepartment] = useState('Spatial Ambience');
  const [productPrice, setProductPrice] = useState(24999);
  const [productOriginalPrice, setProductOriginalPrice] = useState(32999);
  const [productDiscountPercent, setProductDiscountPercent] = useState(24);
  const [productCostPerUnit, setProductCostPerUnit] = useState(12000);
  const [productStockCount, setProductStockCount] = useState(45);
  const [productDescription, setProductDescription] = useState('Precision milled titanium spatial LED fixture with kinetic fluid counterbalance and 3000K warm acoustic ambience.');
  const [productSupplierId, setProductSupplierId] = useState('sup-1');
  const [isFlashDrop, setIsFlashDrop] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAJoE5bLRdkRWH6x3vE_DAgCiIvkMd_AoWLGXGy0pP5p5YomAlDft5jN8Sw1w1QZht-zU60H3azoVVFyD0c2BBzp7NeADznTN8Jw1g9SBPU7tmnN28shakxo4WEg9I8jDqWu1YKeKosBtW9sYi2lcXpWBK8QjEEWbbKMZQiayz6IbY4k0XxKtT45ikLpb2U98_jWYif1lIyO3-Wtj81usUxivxHFChJEgq5fO8njjYgOgLIObXV6cTY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCpwnt7wKeFzlS82ZNnMz0z_UPbtCKXsVLBmanwOKU-IGIchLHFbDhZl-dhpX5yvFEwfMT7uzvb6CYwo9DTWd1WP5di4-by9oDn8Kox-eQMkK3O6_BuCcbLCt6fMQVykFDUjurQw4zWhKkrBMcGotvhHPMNnJG7LlYdenTz7RYlH11lG-I05iV-rDuVomc6LpgTsDNHZE0i_zWBaDQXm5A65KNyxHX8ebccpTJqnbx6aUk5vq22SVEv'
  ]);

  // Supplier Onboarding Form State
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newSupplierEmail, setNewSupplierEmail] = useState('');
  const [newSupplierPhone, setNewSupplierPhone] = useState('');
  const [newSupplierGstin, setNewSupplierGstin] = useState('');
  const [newSupplierCity, setNewSupplierCity] = useState('');
  const [newSupplierCommission, setNewSupplierCommission] = useState(12);

  // New Offer Form State
  const [offerCode, setOfferCode] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerPercent, setOfferPercent] = useState(15);
  const [offerMinAmount, setOfferMinAmount] = useState(10000);
  const [offerExpiry, setOfferExpiry] = useState('2025-12-31');
  const [offerDescription, setOfferDescription] = useState('');

  // Email Config State
  const [adminEmailInput, setAdminEmailInput] = useState(emailConfig.superAdminEmail);
  const [selectedEmailPreview, setSelectedEmailPreview] = useState<EmailLogItem | null>(null);

  // Helper for adding image to gallery
  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setUploadedImages(prev => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
      showToast('Image added to product gallery');
    }
  };

  // Quick preset sample pictures
  const samplePictures = [
    { name: 'Titanium Audio', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyAQk_7SRp7X-2CAvSyLTrFZ3b4Y5bch7Qf5mFE8OeZ3y2uxwy2grXZVBnaZPt4JAHaLfsiQkTeN5fNTKC32gaCr9-3y83A5wbPAYvAt8NlVTXHI0h7cGzt8Zb5cF190tnjH4cdJABGmOoQ49wc3NxL3F1KF6f3E2XLPg53edn8xfiT_SmhWxyVBVNviBNVUgUyh0PR91mILNcH3SfwpGpx7k46floIM4IfmbFa4m2dHgRA0LW_ncB' },
    { name: 'Minimal Peripheral', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYf0o0H63Z0a_z7o83xPjQj89uFqfV5wF3b6x1-RQWiJq4UbaMm5igepqPh-trLNdO23hhWHwtvb2GS3Brmy1Nc5YEPgtZ3Sk0Ptw5C7YHnvXyhUvkhxSOFrUzuUfzLszvdzDKjvccWw7B6WtIi1GmeNiFnQ6VivIz7Y575Er3OCufj77hYFfshTElo6OwA06l7x1NMNTALGANsoLdkPYJ2lGtIMgclrcu0nw8DZIUCiUhkVMH' },
    { name: 'Spatial Lighting', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJoE5bLRdkRWH6x3vE_DAgCiIvkMd_AoWLGXGy0pP5p5YomAlDft5jN8Sw1w1QZht-zU60H3azoVVFyD0c2BBzp7NeADznTN8Jw1g9SBPU7tmnN28shakxo4WEg9I8jDqWu1YKeKosBtW9sYi2lcXpWBK8QjEEWbbKMZQiayz6IbY4k0XxKtT45ikLpb2U98_jWYif1lIyO3-Wtj81usUxivxHFChJEgq5fO8njjYgOgLIObXV6cTY' }
  ];

  const handlePublishProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle.trim() || !productSku.trim()) {
      showToast('Title and SKU are mandatory');
      return;
    }

    const assignedSup = suppliers.find(s => s.id === productSupplierId);

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: productTitle,
      sku: productSku,
      category: productCategory === 'lighting' ? 'Spatial Lighting' : productCategory === 'audio' ? 'High-Fidelity Audio' : 'Industrial Tech',
      categorySlug: productCategory,
      department: productDepartment,
      price: productPrice,
      originalPrice: productOriginalPrice,
      discountPercent: productDiscountPercent,
      discountBadge: productDiscountPercent > 0 ? `${productDiscountPercent}% OFF` : undefined,
      rating: 5.0,
      reviewCount: '1 (New Release)',
      image: uploadedImages[0] || samplePictures[0].url,
      images: uploadedImages,
      badge: isFlashDrop ? 'Kinetic Flash' : 'Super Admin Pick',
      badgeType: isFlashDrop ? 'limited' : 'staff',
      isFlashDrop,
      stockAllocationPercent: 80,
      stockClaimedText: 'New Launch Batch',
      description: productDescription,
      supplierId: productSupplierId,
      supplierName: assignedSup?.companyName || 'Aura Direct Atelier',
      approvalStatus: 'APPROVED',
      isFeatured: true,
      inStockCount: productStockCount,
      specs: {
        warranty: '2 Year Direct Replacement Guarantee',
        driver: 'Calibrated Planar Micro-Transducers',
        anc: 'Adaptive -42dB Active Isolation'
      }
    };

    addNewProduct(newProd);
    showToast(`Published "${productTitle}" at ${formatINR(productPrice)}!`);
  };

  const handleCreateSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim() || !newSupplierEmail.trim()) {
      showToast('Company name and email required');
      return;
    }

    addSupplier({
      name: newContactName || 'Lead Executive',
      companyName: newCompanyName,
      email: newSupplierEmail,
      phone: newSupplierPhone || '+91 98200 12345',
      gstin: newSupplierGstin || '27AAACB0000A1Z0',
      status: 'ACTIVE',
      adminAccessGranted: true,
      commissionRate: newSupplierCommission,
      city: newSupplierCity || 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });

    setNewCompanyName('');
    setNewContactName('');
    setNewSupplierEmail('');
    setNewSupplierPhone('');
    setNewSupplierGstin('');
    setNewSupplierCity('');
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerCode.trim() || !offerTitle.trim()) {
      showToast('Offer title and promo code are required');
      return;
    }

    addOffer({
      title: offerTitle,
      code: offerCode.toUpperCase().trim(),
      discountPercent: offerPercent,
      discountType: 'PERCENTAGE',
      minOrderAmount: offerMinAmount,
      expiryDate: offerExpiry,
      active: true,
      description: offerDescription || `${offerPercent}% off on qualifying purchases`
    });

    setOfferCode('');
    setOfferTitle('');
    setOfferDescription('');
  };

  const handleSaveEmailConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmailConfig({ superAdminEmail: adminEmailInput });
  };

  return (
    <div className="min-h-screen bg-background pb-space-xl">
      
      {/* Super Admin Top Control Plane Banner */}
      <section className="bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary py-space-lg px-margin md:px-margin-desktop shadow-md border-b border-primary-fixed/20">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-amber-300 text-[22px]">admin_panel_settings</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-amber-200 font-bold">
                Platform Super Admin Console
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-300 font-label-sm text-[11px] font-mono">ROLE_SUPER_ADMIN</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-primary tracking-tight">
              Aura Central Operations & Vendor Governance
            </h1>
            <p className="font-body-sm text-body-sm text-on-primary/80">
              Direct access for <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">{emailConfig.superAdminEmail}</span> • Multi-Vendor Management • Oracle DB Schema • Java 21 Backend
            </p>
          </div>

          <div className="flex items-center gap-space-xs flex-wrap">
            <button 
              onClick={() => setActivePage('shop')}
              className="bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 text-white font-label-md text-label-md px-space-md py-2 rounded-lg transition-all flex items-center gap-1.5 backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              <span>View Storefront</span>
            </button>
            <button 
              onClick={() => setActivePage('supplier-portal')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-label-md text-label-md px-space-md py-2 rounded-lg font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              <span>Switch to Supplier Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs Bar */}
      <div className="sticky top-20 z-30 bg-surface/95 backdrop-blur-xl border-b border-surface-container shadow-xs">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop flex items-center gap-space-xs overflow-x-auto py-space-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all shrink-0 font-semibold ${
              activeTab === 'catalog'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
            <span>Upload Products & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('suppliers')}
            className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all shrink-0 font-semibold ${
              activeTab === 'suppliers'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Supplier Admin Access ({suppliers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all shrink-0 font-semibold ${
              activeTab === 'offers'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">local_offer</span>
            <span>Discounts & Offers Engine ({offers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all shrink-0 font-semibold ${
              activeTab === 'email'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
            <span>Email Notification Center</span>
            <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {emailLogs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('oracle')}
            className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all shrink-0 font-semibold ${
              activeTab === 'oracle'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">database</span>
            <span>Java 21 & Oracle DB Architecture</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop pt-space-lg">
        
        {/* ========================================================================= */}
        {/* TAB 1: PRODUCT UPLOAD, PICTURES, PRICING & DISCOUNTS */}
        {/* ========================================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-space-xl animate-in fade-in duration-200">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Super Admin Product & Media Ingestion
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Upload high-res product photos, assign vendors, set Indian Rupee retail pricing, and activate flash discounts.
                </p>
              </div>

              <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span>Active Catalog: {products.length} Products Live</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              
              {/* Product Form Left Column (7 cols) */}
              <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
                <form onSubmit={handlePublishProduct} className="space-y-space-md">
                  
                  {/* Basic Details */}
                  <div className="space-y-space-sm">
                    <div>
                      <label className="block font-label-sm text-label-sm font-bold text-on-surface mb-1">
                        Product Title *
                      </label>
                      <input 
                        type="text" 
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        placeholder="e.g. Aura PureANC Master Headset"
                        className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div>
                        <label className="block font-label-sm text-label-sm font-bold text-on-surface mb-1">
                          Primary SKU Code *
                        </label>
                        <input 
                          type="text" 
                          value={productSku}
                          onChange={(e) => setProductSku(e.target.value)}
                          className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-on-surface font-mono text-sm outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm font-bold text-on-surface mb-1">
                          Assign Supplier (Multi-Vendor)
                        </label>
                        <select 
                          value={productSupplierId}
                          onChange={(e) => setProductSupplierId(e.target.value)}
                          className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary border border-surface-container cursor-pointer font-semibold"
                        >
                          {suppliers.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.companyName} ({s.commissionRate}% comm.)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pictures & Image Uploader */}
                  <div className="space-y-space-xs pt-space-xs border-t border-surface-container">
                    <label className="block font-label-sm text-label-sm font-bold text-on-surface">
                      Product Pictures Gallery ({uploadedImages.length} images)
                    </label>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Enter image URLs, paste web links, or pick sample architectural artifacts.
                    </p>

                    <div className="flex gap-space-xs">
                      <input 
                        type="url" 
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-body-sm text-body-sm outline-none border border-surface-container"
                      />
                      <button 
                        type="button"
                        onClick={handleAddImage}
                        className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm px-space-md py-2 rounded-lg font-bold transition-colors"
                      >
                        + Add Image
                      </button>
                    </div>

                    {/* Quick Preset Sample Pictures */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="font-label-sm text-[11px] text-outline font-semibold">Presets:</span>
                      {samplePictures.map((sample, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setUploadedImages(prev => [...prev, sample.url])}
                          className="text-[11px] bg-surface-container hover:bg-surface-container-high text-primary px-2 py-0.5 rounded font-semibold transition-colors"
                        >
                          + {sample.name}
                        </button>
                      ))}
                    </div>

                    {/* Image Preview Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-2">
                      {uploadedImages.map((img, idx) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden aspect-square border border-surface-container group bg-surface-container">
                          <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 bg-error text-on-error w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove picture"
                          >
                            ×
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 bg-surface/90 text-[9px] font-bold px-1 rounded text-primary">
                              Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing, Discounts & INR Architecture */}
                  <div className="pt-space-xs border-t border-surface-container space-y-space-sm">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">
                      Financials & Rupee (`₹`) Pricing Matrix
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                      <div>
                        <label className="block font-label-sm text-label-sm font-semibold text-on-surface-variant mb-1">
                          Selling Price (₹) *
                        </label>
                        <input 
                          type="number" 
                          value={productPrice}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setProductPrice(val);
                            if (productOriginalPrice > val) {
                              setProductDiscountPercent(Math.round(((productOriginalPrice - val) / productOriginalPrice) * 100));
                            }
                          }}
                          className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-headline-sm text-headline-sm font-bold outline-none border border-surface-container"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm font-semibold text-on-surface-variant mb-1">
                          MSRP / Original Price (₹)
                        </label>
                        <input 
                          type="number" 
                          value={productOriginalPrice}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setProductOriginalPrice(val);
                            if (val > productPrice) {
                              setProductDiscountPercent(Math.round(((val - productPrice) / val) * 100));
                            }
                          }}
                          className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-body-md text-body-md outline-none border border-surface-container"
                        />
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm font-semibold text-on-surface-variant mb-1">
                          Discount (% OFF)
                        </label>
                        <input 
                          type="number" 
                          value={productDiscountPercent}
                          onChange={(e) => {
                            const pct = parseFloat(e.target.value) || 0;
                            setProductDiscountPercent(pct);
                            if (productOriginalPrice > 0) {
                              setProductPrice(Math.round(productOriginalPrice * (1 - pct / 100)));
                            }
                          }}
                          className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-secondary font-headline-sm text-headline-sm font-bold outline-none border border-surface-container"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-space-sm">
                      <div>
                        <label className="block font-label-sm text-label-sm font-semibold text-on-surface-variant mb-1">
                          Procurement Cost per Unit (₹)
                        </label>
                        <input 
                          type="number" 
                          value={productCostPerUnit}
                          onChange={(e) => setProductCostPerUnit(parseFloat(e.target.value) || 0)}
                          className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-body-md text-body-md outline-none border border-surface-container"
                        />
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm font-semibold text-on-surface-variant mb-1">
                          Initial Stock Quantity
                        </label>
                        <input 
                          type="number" 
                          value={productStockCount}
                          onChange={(e) => setProductStockCount(parseInt(e.target.value) || 0)}
                          className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-body-md text-body-md outline-none border border-surface-container"
                        />
                      </div>
                    </div>

                    {/* Calculated Gross Margin Callout */}
                    <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-on-surface">
                      <span className="font-body-sm text-body-sm">Projected Gross Margin per Unit:</span>
                      <span className="font-label-md text-label-md text-secondary font-bold">
                        {Math.round(((productPrice - productCostPerUnit) / productPrice) * 100)}% ({formatINR(productPrice - productCostPerUnit)} profit)
                      </span>
                    </div>

                    {/* Flash Drop Toggle */}
                    <div className="flex items-center justify-between bg-surface-container-low p-space-sm rounded-lg">
                      <div className="flex items-center gap-space-xs">
                        <input 
                          type="checkbox" 
                          id="flashDropCheckbox" 
                          checked={isFlashDrop}
                          onChange={(e) => setIsFlashDrop(e.target.checked)}
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                        <label htmlFor="flashDropCheckbox" className="font-body-sm text-body-sm text-on-surface font-semibold cursor-pointer">
                          Publish into "Kinetic Flash Drops" with Live Countdown
                        </label>
                      </div>
                      <span className="text-[11px] font-bold text-tertiary uppercase bg-tertiary-fixed px-2 py-0.5 rounded">
                        Frontpage Bento
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-label-sm text-label-sm font-bold text-on-surface mb-1">
                      Aura Editorial Description
                    </label>
                    <textarea 
                      rows={3}
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-body-sm text-body-sm outline-none border border-surface-container"
                    />
                  </div>

                  {/* Submission */}
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-3 rounded-lg shadow-md transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                    <span>Publish Product to Storefront ({formatINR(productPrice)})</span>
                  </button>
                </form>
              </div>

              {/* Live Preview Card & Existing Catalog Manager (5 cols) */}
              <div className="lg:col-span-5 space-y-space-md">
                
                {/* Live Card Preview */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-xs">
                  <span className="font-label-sm text-[11px] text-outline uppercase font-bold tracking-wider">
                    Storefront Live Preview
                  </span>
                  
                  <div className="rounded-xl overflow-hidden border border-surface-container bg-surface-container-lowest flex flex-col justify-between">
                    <div className="relative aspect-video bg-surface-container">
                      <img 
                        src={uploadedImages[0] || samplePictures[0].url} 
                        alt={productTitle} 
                        className="w-full h-full object-cover" 
                      />
                      {productDiscountPercent > 0 && (
                        <span className="absolute top-2 left-2 bg-error text-on-error font-label-sm text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {productDiscountPercent}% OFF
                        </span>
                      )}
                      {isFlashDrop && (
                        <span className="absolute top-2 right-2 bg-tertiary-container text-on-tertiary font-label-sm text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ⚡ Flash Drop
                        </span>
                      )}
                    </div>
                    <div className="p-space-sm space-y-1">
                      <p className="text-[11px] text-outline uppercase font-mono">{productSku}</p>
                      <h4 className="font-label-md text-label-md font-bold text-on-surface truncate">
                        {productTitle}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">
                          {formatINR(productPrice)}
                        </span>
                        {productOriginalPrice > productPrice && (
                          <span className="font-body-sm text-xs text-outline line-through">
                            {formatINR(productOriginalPrice)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-secondary font-semibold">
                        Assigned: {suppliers.find(s => s.id === productSupplierId)?.companyName || 'Aura Direct'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant Discount Adjuster on Live Catalog */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-sm">
                  <h3 className="font-label-md text-label-md font-bold text-on-surface">
                    Quick Discount Adjuster on Live Products
                  </h3>
                  <div className="space-y-space-xs max-h-72 overflow-y-auto divide-y divide-surface-container">
                    {products.slice(0, 5).map(prod => (
                      <div key={prod.id} className="pt-2 pb-1 flex items-center justify-between gap-space-sm">
                        <div className="min-w-0 flex-1">
                          <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                            {prod.title}
                          </p>
                          <p className="text-xs text-primary font-bold">
                            {formatINR(prod.price)} {prod.discountBadge && <span className="text-secondary ml-1">({prod.discountBadge})</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateProductDiscount(prod.id, 10)}
                            className="bg-surface-container hover:bg-primary hover:text-on-primary text-[10px] font-bold px-2 py-1 rounded transition-colors"
                          >
                            10%
                          </button>
                          <button
                            type="button"
                            onClick={() => updateProductDiscount(prod.id, 20)}
                            className="bg-surface-container hover:bg-primary hover:text-on-primary text-[10px] font-bold px-2 py-1 rounded transition-colors"
                          >
                            20%
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerFlashOffer(prod.id, 30)}
                            className="bg-tertiary-fixed hover:bg-tertiary text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            title="Trigger 30% Flash Offer"
                          >
                            ⚡ Flash 30%
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SUPPLIERS MANAGEMENT & ACCESS DELEGATION */}
        {/* ========================================================================= */}
        {activeTab === 'suppliers' && (
          <div className="space-y-space-xl animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Supplier Admin Access & Multi-Vendor Governance
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Grant other vendors admin access to list and sell their products on Aura Commerce. Set commission rates and audit catalog submissions.
                </p>
              </div>

              <div className="bg-surface-container px-space-md py-1.5 rounded-lg font-label-sm text-label-sm text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Oracle DB Table: <code className="font-mono">SUPPLIERS</code></span>
              </div>
            </div>

            {/* Registered Suppliers Table */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
              <div className="p-space-md border-b border-surface-container flex items-center justify-between">
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                  Onboarded Vendors & Delegated Admins ({suppliers.length})
                </h3>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Platform Commission Model: 10% – 15% Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-outline font-label-sm text-[11px] uppercase tracking-wider">
                      <th className="py-space-sm px-space-md">Supplier / Company</th>
                      <th className="py-space-sm px-space-md">GSTIN & Location</th>
                      <th className="py-space-sm px-space-md">Admin Access</th>
                      <th className="py-space-sm px-space-md">Commission</th>
                      <th className="py-space-sm px-space-md">Products</th>
                      <th className="py-space-sm px-space-md text-right">Settled Revenue</th>
                      <th className="py-space-sm px-space-md text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container text-body-sm text-body-sm">
                    {suppliers.map(sup => (
                      <tr key={sup.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-space-md px-space-md">
                          <div className="flex items-center gap-space-sm">
                            <img src={sup.avatar} alt={sup.companyName} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
                            <div>
                              <p className="font-label-md text-label-md font-bold text-on-surface">{sup.companyName}</p>
                              <p className="text-xs text-on-surface-variant">{sup.name} • {sup.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md">
                          <p className="font-mono text-xs font-bold text-on-surface">{sup.gstin}</p>
                          <p className="text-xs text-outline">{sup.city}</p>
                        </td>
                        <td className="py-space-md px-space-md">
                          <button
                            type="button"
                            onClick={() => toggleSupplierAdminAccess(sup.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-xs font-bold transition-all ${
                              sup.adminAccessGranted
                                ? 'bg-secondary-container/30 text-secondary border border-secondary/40'
                                : 'bg-surface-container text-outline border border-outline-variant/30'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${sup.adminAccessGranted ? 'bg-secondary' : 'bg-outline'}`}></span>
                            <span>{sup.adminAccessGranted ? 'Admin Active' : 'Access Revoked'}</span>
                          </button>
                        </td>
                        <td className="py-space-md px-space-md">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-primary">{sup.commissionRate}%</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newRate = prompt(`Enter new commission rate % for ${sup.companyName}:`, String(sup.commissionRate));
                                if (newRate && !isNaN(Number(newRate))) {
                                  updateSupplierCommission(sup.id, Number(newRate));
                                }
                              }}
                              className="text-outline hover:text-primary p-1"
                              title="Edit commission"
                            >
                              <span className="material-symbols-outlined text-[14px]">edit</span>
                            </button>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md font-bold text-on-surface">
                          {sup.productsCount} SKUs
                        </td>
                        <td className="py-space-md px-space-md text-right font-mono font-bold text-on-surface">
                          {formatINR(sup.totalRevenue)}
                        </td>
                        <td className="py-space-md px-space-md text-right">
                          <button
                            type="button"
                            onClick={() => {
                              showToast(`Loaded vendor portal preview for ${sup.companyName}`);
                              setActivePage('supplier-portal');
                            }}
                            className="bg-primary/10 hover:bg-primary text-primary hover:text-on-primary font-label-sm text-xs px-2.5 py-1 rounded-md transition-colors font-bold"
                          >
                            Enter Vendor Console →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add New Supplier Admin Access Modal/Form */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">person_add</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Onboard New Supplier & Grant Admin Credentials
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                The new supplier will receive an automated invitation to list products on Aura Commerce.
              </p>

              <form onSubmit={handleCreateSupplier} className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Company / Brand Name *</label>
                  <input 
                    type="text" 
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="e.g. Vesper Acoustic Labs"
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Contact Person Name</label>
                  <input 
                    type="text" 
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="e.g. Rajesh Nair"
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Supplier Login Email *</label>
                  <input 
                    type="email" 
                    value={newSupplierEmail}
                    onChange={(e) => setNewSupplierEmail(e.target.value)}
                    placeholder="rajesh@vesper.in"
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Official GSTIN Number</label>
                  <input 
                    type="text" 
                    value={newSupplierGstin}
                    onChange={(e) => setNewSupplierGstin(e.target.value)}
                    placeholder="27AABCV1234F1Z9"
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container font-mono"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Operating City / State</label>
                  <input 
                    type="text" 
                    value={newSupplierCity}
                    onChange={(e) => setNewSupplierCity(e.target.value)}
                    placeholder="Hyderabad, Telangana"
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Platform Commission Rate (%)</label>
                  <input 
                    type="number" 
                    value={newSupplierCommission}
                    onChange={(e) => setNewSupplierCommission(Number(e.target.value))}
                    min={0}
                    max={50}
                    className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container font-bold"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end">
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-xl py-2.5 rounded-lg shadow-sm font-bold flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Grant Supplier Admin Access & Notify Email</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DISCOUNTS & OFFERS ENGINE */}
        {/* ========================================================================= */}
        {activeTab === 'offers' && (
          <div className="space-y-space-xl animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Super Admin Discounts, Coupons & Offers Hub
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Create promo vouchers, limited-time festival discounts, flash drops, and threshold deductions.
                </p>
              </div>

              <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary font-bold">
                <span className="material-symbols-outlined text-[18px]">sell</span>
                <span>{offers.filter(o => o.active).length} Active Campaigns</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              
              {/* Active Offers List (7 cols) */}
              <div className="lg:col-span-7 space-y-space-md">
                {offers.map(offer => (
                  <div 
                    key={offer.id}
                    className={`bg-surface-container-lowest p-space-md rounded-xl shadow-sm border transition-all ${
                      offer.active ? 'border-primary/40 bg-surface-container-lowest' : 'border-outline-variant/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-space-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg font-bold text-primary bg-primary-fixed px-2.5 py-0.5 rounded">
                            {offer.code}
                          </span>
                          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                            {offer.discountPercent}% OFF
                          </span>
                          {offer.bannerTag && (
                            <span className="text-[10px] font-bold bg-secondary-container/40 text-secondary px-2 py-0.5 rounded-full">
                              {offer.bannerTag}
                            </span>
                          )}
                        </div>
                        <h4 className="font-label-md text-label-md font-bold text-on-surface mt-1">{offer.title}</h4>
                        <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">{offer.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleOffer(offer.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            offer.active 
                              ? 'bg-secondary text-on-secondary' 
                              : 'bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          {offer.active ? 'Active' : 'Paused'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteOffer(offer.id)}
                          className="text-outline hover:text-error p-1"
                          title="Delete offer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-space-sm pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-outline font-medium">
                      <span>Min Order: {formatINR(offer.minOrderAmount)}</span>
                      <span>Expires: {offer.expiryDate}</span>
                      <span className="text-primary font-bold">{offer.appliedCount} customers claimed</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Create New Offer Form (5 cols) */}
              <div className="lg:col-span-5 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">add_circle</span>
                  <span>Create New Promo Voucher</span>
                </h3>

                <form onSubmit={handleCreateOffer} className="space-y-space-sm">
                  <div>
                    <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Coupon Code (Uppercase) *</label>
                    <input 
                      type="text" 
                      value={offerCode}
                      onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                      placeholder="e.g. WINTER30"
                      className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-mono font-bold text-sm outline-none border border-surface-container"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Offer Title *</label>
                    <input 
                      type="text" 
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      placeholder="e.g. Winter Atelier Solstice Benefit"
                      className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm">
                    <div>
                      <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Discount % *</label>
                      <input 
                        type="number" 
                        value={offerPercent}
                        onChange={(e) => setOfferPercent(Number(e.target.value))}
                        min={1}
                        max={80}
                        className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Min. Order Value (₹)</label>
                      <input 
                        type="number" 
                        value={offerMinAmount}
                        onChange={(e) => setOfferMinAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Expiry Date</label>
                    <input 
                      type="date" 
                      value={offerExpiry}
                      onChange={(e) => setOfferExpiry(e.target.value)}
                      className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-sm outline-none border border-surface-container"
                    />
                  </div>

                  <div>
                    <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">Description</label>
                    <textarea 
                      rows={2}
                      value={offerDescription}
                      onChange={(e) => setOfferDescription(e.target.value)}
                      placeholder="Campaign details shown to customers..."
                      className="w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface text-xs outline-none border border-surface-container"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 rounded-lg font-bold shadow-sm transition-all"
                  >
                    Activate Coupon Code
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: EMAIL NOTIFICATION CENTER */}
        {/* ========================================================================= */}
        {activeTab === 'email' && (
          <div className="space-y-space-xl animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Super Admin Email Alert & Notification Hub
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Configure recipient emails, toggle automatic system triggers, and monitor live outgoing transmission logs.
                </p>
              </div>

              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={() => triggerTestEmail('NEW_ORDER')}
                  className="bg-primary text-on-primary font-label-sm text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Test Order Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerTestEmail('LOW_STOCK')}
                  className="bg-error text-on-error font-label-sm text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>Test Stock Alert</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              
              {/* Settings Column (5 cols) */}
              <div className="lg:col-span-5 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">mark_email_read</span>
                  <span>Recipient & Trigger Settings</span>
                </h3>

                <form onSubmit={handleSaveEmailConfig} className="space-y-space-sm">
                  <div>
                    <label className="block font-label-sm text-xs font-bold text-on-surface mb-1">
                      Super Admin Destination Email *
                    </label>
                    <input 
                      type="email" 
                      value={adminEmailInput}
                      onChange={(e) => setAdminEmailInput(e.target.value)}
                      placeholder="sachinpatel808@gmail.com"
                      className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-on-surface font-semibold text-sm outline-none border border-surface-container focus:ring-2 focus:ring-primary"
                      required
                    />
                    <p className="text-[11px] text-outline mt-1">
                      All high-priority operational dispatches will route to this inbox.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-surface-container space-y-space-xs">
                    <p className="font-label-sm text-xs font-bold text-on-surface">Automated Alert Triggers</p>
                    
                    <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer">
                      <span className="text-xs font-medium text-on-surface">Every Pre-Authorized Customer Order</span>
                      <input 
                        type="checkbox" 
                        checked={emailConfig.notifyOnNewOrder}
                        onChange={(e) => updateEmailConfig({ notifyOnNewOrder: e.target.checked })}
                        className="accent-primary w-4 h-4 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer">
                      <span className="text-xs font-medium text-on-surface">Critical Low Stock Threshold (&lt; 10 units)</span>
                      <input 
                        type="checkbox" 
                        checked={emailConfig.notifyOnLowStock}
                        onChange={(e) => updateEmailConfig({ notifyOnLowStock: e.target.checked })}
                        className="accent-primary w-4 h-4 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer">
                      <span className="text-xs font-medium text-on-surface">New Supplier Onboarding Applications</span>
                      <input 
                        type="checkbox" 
                        checked={emailConfig.notifyOnSupplierSignup}
                        onChange={(e) => updateEmailConfig({ notifyOnSupplierSignup: e.target.checked })}
                        className="accent-primary w-4 h-4 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer">
                      <span className="text-xs font-medium text-on-surface">Live Consignment Dispatched via Bluedart</span>
                      <input 
                        type="checkbox" 
                        checked={emailConfig.notifyOnConsignmentDispatched}
                        onChange={(e) => updateEmailConfig({ notifyOnConsignmentDispatched: e.target.checked })}
                        className="accent-primary w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 rounded-lg font-bold shadow-sm transition-all"
                  >
                    Save Email Preferences
                  </button>
                </form>
              </div>

              {/* Outgoing Email Audit Logs (7 cols) */}
              <div className="lg:col-span-7 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">history</span>
                    <span>Email Dispatch Audit Stream ({emailLogs.length})</span>
                  </h3>
                  <span className="text-xs text-secondary font-bold bg-secondary-container/30 px-2 py-0.5 rounded">
                    SMTP Relay Active
                  </span>
                </div>

                <div className="space-y-space-sm max-h-[500px] overflow-y-auto pr-1">
                  {emailLogs.map(log => (
                    <div 
                      key={log.id}
                      className="p-space-sm bg-surface-container-low rounded-lg border border-surface-container hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase bg-primary-fixed text-primary px-1.5 py-0.5 rounded">
                              {log.templateType}
                            </span>
                            <span className="text-xs text-outline font-mono">{log.timestamp}</span>
                            <span className="text-xs font-bold text-secondary">{log.status}</span>
                          </div>
                          <h4 className="font-label-md text-label-md font-bold text-on-surface mt-1 truncate">
                            {log.subject}
                          </h4>
                          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                            To: <span className="text-primary font-mono">{log.toEmail}</span> — {log.previewText}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedEmailPreview(log)}
                            className="text-xs bg-surface-container hover:bg-surface-container-high px-2 py-1 rounded text-primary font-semibold"
                          >
                            Preview
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteEmailLog(log.id)}
                            className="text-outline hover:text-error p-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Email Preview Modal */}
            {selectedEmailPreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs animate-in fade-in">
                <div className="bg-surface-container-lowest max-w-xl w-full rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden">
                  <div className="bg-primary text-on-primary p-space-md flex items-center justify-between">
                    <div>
                      <h4 className="font-label-lg text-label-lg font-bold">Email Message Render Preview</h4>
                      <p className="text-xs opacity-90">To: {selectedEmailPreview.toEmail}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedEmailPreview(null)}
                      className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <div className="p-space-lg max-h-[70vh] overflow-y-auto">
                    <p className="font-bold text-sm text-on-surface mb-2">{selectedEmailPreview.subject}</p>
                    <div 
                      className="border border-surface-container rounded-lg p-4 bg-white text-slate-900"
                      dangerouslySetInnerHTML={{ __html: selectedEmailPreview.htmlBody }}
                    />
                  </div>

                  <div className="p-space-sm bg-surface-container-low flex justify-end">
                    <button
                      onClick={() => setSelectedEmailPreview(null)}
                      className="bg-primary text-on-primary text-xs px-4 py-1.5 rounded-lg font-bold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: JAVA 21 & ORACLE DATABASE ARCHITECTURE CONSOLE */}
        {/* ========================================================================= */}
        {activeTab === 'oracle' && (
          <div className="space-y-space-xl animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Enterprise Java 21 & Oracle Database 23c Architecture
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Production-grade Spring Boot 3.3.x backend, Oracle Autonomous/Free DB DDL, JPA multi-tenant RBAC, and JavaMailSender service.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-200">
                  Oracle Database 23c / 19c
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full border border-amber-200">
                  Java 21 (LTS)
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                  Spring Boot 3.3
                </span>
              </div>
            </div>

            {/* Architecture Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined text-[20px]">database</span>
                  <h4>Oracle Relational Tables</h4>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  9 Core Tables (`USERS`, `ROLES`, `SUPPLIERS`, `PRODUCTS`, `OFFERS`, `ORDERS`, `ORDER_ITEMS`, `EMAIL_NOTIFICATIONS`).
                </p>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 space-y-1">
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <span className="material-symbols-outlined text-[20px]">security</span>
                  <h4>Spring Security 6 & JWT</h4>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Role-based access checks (`@PreAuthorize("hasRole('SUPER_ADMIN')")`) for product pricing, supplier grants, and email alerts.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 space-y-1">
                <div className="flex items-center gap-2 text-tertiary-container font-bold">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                  <h4>Spring Mail SMTP</h4>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Asynchronous email dispatch (`@Async JavaMailSender`) forwarding HTML receipts directly to `sachinpatel808@gmail.com`.
                </p>
              </div>
            </div>

            {/* Interactive Oracle DDL Viewer */}
            <div className="bg-slate-950 text-slate-100 p-space-lg rounded-xl shadow-lg border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between pb-space-sm border-b border-slate-800 mb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-400 font-bold ml-2">oracle-ddl-schema.sql</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(ORACLE_SCHEMA_DDL);
                    showToast('Oracle DDL SQL copied to clipboard!');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 font-sans font-bold"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>Copy SQL</span>
                </button>
              </div>

              <pre className="overflow-x-auto max-h-96 text-[11px] leading-relaxed text-emerald-300">
                {ORACLE_SCHEMA_DDL}
              </pre>
            </div>

            {/* Spring Boot Connection YAML & Instructions */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 space-y-space-md">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Running the Java 21 + Oracle Backend Locally
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="bg-surface-container-low p-space-md rounded-lg font-mono text-xs space-y-1">
                  <p className="font-bold text-primary"># application.yml (Oracle & SMTP)</p>
                  <pre className="text-[11px] text-on-surface-variant leading-relaxed">
{`spring:
  datasource:
    url: jdbc:oracle:thin:@//localhost:1521/XEPDB1
    username: aura_admin
    password: \${ORACLE_PASSWORD:AuraSecret2025}
    driver-class-name: oracle.jdbc.OracleDriver
  jpa:
    database-platform: org.hibernate.dialect.OracleDialect
    hibernate:
      ddl-auto: update
  mail:
    host: smtp.gmail.com
    port: 587
    username: sachinpatel808@gmail.com
    password: \${GMAIL_APP_PASSWORD}
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true`}
                  </pre>
                </div>

                <div className="space-y-space-xs text-body-sm text-sm">
                  <h4 className="font-bold text-on-surface">Deployment & GitHub Instructions</h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-on-surface-variant">
                    <li>Start the Oracle DB container: <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-xs font-bold">docker compose up -d oracle-db</code></li>
                    <li>Compile the Java 21 backend: <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-xs font-bold">mvn clean install</code></li>
                    <li>Launch Spring Boot: <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-xs font-bold">mvn spring-boot:run</code> (Port 8080)</li>
                    <li>The React Vite frontend connects seamlessly via <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-xs font-bold">VITE_API_URL=http://localhost:8080/api/v1</code></li>
                  </ol>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
