import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LOGO_URL, LIVE_ORDERS_STREAM } from '../data/mockData';
import { Product } from '../types';
import { formatINR } from '../utils/currency';

export const MerchantAdminView: React.FC = () => {
  const {
    telemetry,
    addNewProduct,
    setActivePage,
    showToast
  } = useStore();

  const [activeAdminNav, setActiveAdminNav] = useState<'analytics' | 'inventory' | 'fulfillment'>('analytics');
  const [orderStreamFilter, setOrderStreamFilter] = useState<'all' | 'pending' | 'dispatched'>('all');

  // Product Ingestion Form States
  const [title, setTitle] = useState('Aura Horizon Spatial Audio Visor');
  const [sku, setSku] = useState('AUR-SPATIAL-2025');
  const [category, setCategory] = useState('Electronics');
  const [regularPrice, setRegularPrice] = useState(42999);
  const [salePrice, setSalePrice] = useState(37999);
  const [costPerUnit, setCostPerUnit] = useState(16500);
  const [taxBracket, setTaxBracket] = useState('18');
  const [unitsAvailable, setUnitsAvailable] = useState(120);
  const [lowStockAlert, setLowStockAlert] = useState(15);
  const [allowBackorder, setAllowBackorder] = useState(true);
  const [keywords, setKeywords] = useState('spatial audio, dolby atmos, luxury electronics, carbon headset');
  
  // Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Variant palette tags
  const [colors, setColors] = useState([
    { name: 'Obsidian Black', hex: '#0f172a' },
    { name: 'Astral Silver', hex: '#cbd5e1' },
    { name: 'Terra Cotta', hex: '#b45309' }
  ]);
  const [selectedSize, setSelectedSize] = useState('Standard (M)');

  // Calculations
  const grossProfit = salePrice - costPerUnit;
  const grossMargin = salePrice > 0 ? ((grossProfit / salePrice) * 100).toFixed(1) : '0';

  const handlePublish = () => {
    if (!title.trim() || !sku.trim()) {
      showToast('Please provide a title and SKU');
      return;
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title,
      sku,
      category,
      categorySlug: 'electronics',
      department: 'Industrial Tech',
      price: salePrice > 0 ? salePrice : regularPrice,
      originalPrice: regularPrice,
      discountBadge: `${Math.round(((regularPrice - salePrice) / regularPrice) * 100)}% OFF`,
      rating: 5.0,
      reviewCount: '1 (Launch)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH53tYQfadM8XuVC3si860yGt04ffn5-R00GEyBg2Ae8-YYz_SXEzD0G_ff7CHfC2BfUHn5SIEPA0xzOfM3qli6H0yFoA0xuqlpZCu4Ff91hmHvqE_BUva0Dnblv2PUf2ONohJCJKsf93K0pWv_KckFM01xRs3rebU9EqjYYBhF3DxYDFdJo8F-d13xBUEADrhoNNY97vQMmr2extKl60jw6aAlRzZooAxeltsckFDkhys1k0yVD5j',
      badge: 'New Release',
      badgeType: 'staff',
      description: `Experience next-generation planar acoustic drivers with low-latency spatial rendering. Available in ${colors.map(c => c.name).join(', ')}.`,
      specs: {
        driver: 'Bespoke Dual Planar Micro-Transducers',
        warranty: '2 Year Direct Replacement'
      }
    };

    addNewProduct(newProd);
  };

  const filteredOrders = LIVE_ORDERS_STREAM.filter(ord => {
    if (orderStreamFilter === 'pending') return ord.lifecycle === 'Processing';
    if (orderStreamFilter === 'dispatched') return ord.lifecycle === 'Dispatched';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-background">
      
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between p-space-md border-r border-surface-container hidden lg:flex">
        <div className="space-y-space-lg">
          <div 
            onClick={() => setActivePage('shop')} 
            className="flex items-center gap-space-sm px-space-sm py-space-xs cursor-pointer group"
          >
            <img alt="Aura Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
              Aura Admin
            </span>
          </div>

          <nav className="flex flex-col gap-space-xs">
            <button 
              onClick={() => setActiveAdminNav('analytics')}
              className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left font-semibold ${
                activeAdminNav === 'analytics'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">query_stats</span>
              <span>Analytics & Sales</span>
            </button>

            <button 
              onClick={() => {
                setActiveAdminNav('inventory');
                setIsModalOpen(true);
              }}
              className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left font-semibold ${
                activeAdminNav === 'inventory'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span>Inventory Matrix</span>
            </button>

            <button 
              onClick={() => setActiveAdminNav('fulfillment')}
              className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left font-semibold ${
                activeAdminNav === 'fulfillment'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              <span>Fulfillment Hub</span>
            </button>

            <button 
              onClick={() => setActivePage('shop')}
              className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md text-left font-semibold border-t border-surface-container mt-2 pt-3"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">storefront</span>
              <span className="text-primary font-bold">Switch to Storefront</span>
            </button>
          </nav>
        </div>

        {/* User Card */}
        <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline-variant/30">
          <div className="flex items-center gap-space-xs">
            <img 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMh2Wxei5PAo8jHhyAnBXd9H8q2OTRGgvisb7z9MLi0B-AolSttpIBvS5Po8cJ11HGZpDPduV1UdHw3PDc-ljMHnDFEGywJxJxBYBgYHJ0rL5shKFORTL0jPIaTSqDU9DYnP6Sose44Fctr21vMqzht1odUH_eoxRTIIV-aMRVplN5MI_stk4VhFCqg3-QCtg9pu9P2OCgP0Ix-UHAjLJ-23V9m1TH1-KxjEPB2SBkvm4ARBN8MyxI" 
            />
            <div className="leading-tight">
              <p className="font-label-sm text-label-sm text-on-surface font-bold">Chief Merchandiser</p>
              <p className="font-body-sm text-[11px] text-on-surface-variant">Aura HQ</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px]">more_vert</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 w-full">
        
        {/* Top Header */}
        <header className="sticky top-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg border-b border-surface-container">
          <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-lg w-72 sm:w-96 shadow-[0_1px_3px_rgba(15,23,42,0.04)] border border-outline-variant/30">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search telemetry, SKUs, buyers..." 
              className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-space-md">
            <button 
              onClick={() => setActivePage('shop')}
              className="lg:hidden text-xs bg-primary text-on-primary px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Storefront</span>
            </button>
            <span 
              onClick={() => showToast('No unread merchant alarms')}
              className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface text-[20px]"
            >
              notifications
            </span>
            <span 
              onClick={() => showToast('Platform configuration settings')}
              className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface text-[20px]"
            >
              settings
            </span>
            <img 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMh2Wxei5PAo8jHhyAnBXd9H8q2OTRGgvisb7z9MLi0B-AolSttpIBvS5Po8cJ11HGZpDPduV1UdHw3PDc-ljMHnDFEGywJxJxBYBgYHJ0rL5shKFORTL0jPIaTSqDU9DYnP6Sose44Fctr21vMqzht1odUH_eoxRTIIV-aMRVplN5MI_stk4VhFCqg3-QCtg9pu9P2OCgP0Ix-UHAjLJ-23V9m1TH1-KxjEPB2SBkvm4ARBN8MyxI" 
            />
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-4 sm:p-8 space-y-space-xl">
          
          {/* Header Context & Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-sm text-outline font-label-sm uppercase tracking-wider">
                <span>Aura Enterprise Hub</span>
                <span className="inline-block w-1 h-1 rounded-full bg-outline"></span>
                <span className="text-secondary font-label-sm flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> Systems Active
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                Operations Telemetry & Catalog
              </h1>
            </div>

            <div className="flex items-center gap-space-sm self-start md:self-auto">
              <button 
                onClick={() => showToast('Exporting operations audit CSV...')}
                className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors shadow-sm border border-outline-variant/30 font-semibold" 
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Export Audit</span>
              </button>
              <button 
                onClick={() => {
                  setIsModalOpen(true);
                  const formEl = document.getElementById('productModal');
                  formEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary transition-all shadow-md active:scale-95 font-semibold" 
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add New SKU</span>
              </button>
            </div>
          </div>

          {/* Telemetry Cards Metric Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
            
            {/* Metric 1: Revenue */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Total Revenue</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
              </div>
              <div>
                <span className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
                  {formatINR(telemetry.totalRevenue, true)}
                </span>
                <div className="flex items-center gap-space-xs mt-space-xs">
                  <span className="inline-flex items-center gap-0.5 text-secondary font-label-md text-label-md font-bold">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +{telemetry.revenueChangePercent}%
                  </span>
                  <span className="text-outline font-body-sm text-body-sm">vs last cycle</span>
                </div>
              </div>
              <div className="w-full mt-space-sm h-8">
                <svg className="w-full h-full text-secondary opacity-80" fill="none" preserveAspectRatio="none" viewBox="0 0 100 24">
                  <path d="M0 20 L15 17 L30 19 L45 11 L60 14 L75 7 L90 9 L100 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <path d="M0 20 L15 17 L30 19 L45 11 L60 14 L75 7 L90 9 L100 2 V 24 H 0 Z" fill="currentColor" fillOpacity="0.08"></path>
                </svg>
              </div>
            </div>

            {/* Metric 2: Orders Count */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Gross Orders</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </div>
              </div>
              <div>
                <span className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
                  {telemetry.grossOrders.toLocaleString('en-IN')}
                </span>
                <div className="flex items-center gap-space-xs mt-space-xs">
                  <span className="inline-flex items-center gap-0.5 text-secondary font-label-md text-label-md font-bold">
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                    +{telemetry.ordersChangePercent}%
                  </span>
                  <span className="text-outline font-body-sm text-body-sm">conversion rate {telemetry.conversionRate}%</span>
                </div>
              </div>
              <div className="w-full bg-surface-container rounded-full h-1.5 mt-space-sm overflow-hidden">
                <div className="bg-primary-container h-1.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Metric 3: AOV */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Avg. Order Value</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
              </div>
              <div>
                <span className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
                  {formatINR(telemetry.avgOrderValue, true)}
                </span>
                <div className="flex items-center gap-space-xs mt-space-xs">
                  <span className="inline-flex items-center gap-0.5 text-secondary font-label-md text-label-md font-bold">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +{formatINR(telemetry.aovChange, true)}
                  </span>
                  <span className="text-outline font-body-sm text-body-sm">basket expansion</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                <span>Target ₹6,500</span>
                <span className="text-secondary font-semibold">104% of plan</span>
              </div>
            </div>

            {/* Metric 4: Low Stock Alert */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Inventory Critical</span>
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-sm text-display-sm text-tertiary tracking-tight font-bold">
                    {telemetry.criticalSkusCount}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-tertiary font-bold">SKUs</span>
                </div>
                <div className="flex items-center gap-space-xs mt-space-xs">
                  <span className="text-tertiary font-label-md text-label-md font-semibold">Reorder trigger imminent</span>
                </div>
              </div>
              <div className="mt-space-sm flex items-center justify-between">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-surface-variant text-on-surface-variant font-label-sm text-[10px] flex items-center justify-center font-bold">A1</div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-surface-variant text-on-surface-variant font-label-sm text-[10px] flex items-center justify-center font-bold">W9</div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-surface-variant text-on-surface-variant font-label-sm text-[10px] flex items-center justify-center font-bold">E4</div>
                </div>
                <button 
                  onClick={() => showToast('Low stock alerts: WRB-014 (3 left), HOM-448 (2 left)')}
                  className="text-primary font-label-sm text-label-sm hover:underline font-bold" 
                  type="button"
                >
                  Inspect SKUs →
                </button>
              </div>
            </div>

          </div>

          {/* Active Management Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            
            {/* Left Column: Trending Merchandising & Health (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Trending Merchandising</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Top-converting units this 24-hr window</p>
                  </div>
                  <span className="material-symbols-outlined text-outline">tune</span>
                </div>

                <div className="space-y-space-sm mt-space-sm">
                  {/* Product 1 */}
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-md hover:bg-surface-container transition-colors border border-surface-container">
                    <img 
                      className="w-14 h-14 rounded-lg object-cover bg-surface-container shrink-0" 
                      alt="Aura Apex Studio Audio" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYW1GWlQ8yqGsMvSFlRiy0vZwJ_41Ty4FFdmCVnPbNzt4Xyd8deoxTnuAL8Vt8q7GUMiBy3D6sbRb9zF_xm5sJ6ewvR4SSpANjlfdcOdc2DzQWAya8OMG5h5XOK-0zipw8137pk5cVFSTICLcTAH8lj2bXdWx5NyfSKddIajdRus7CIDTXQ19IafrKTXMG22SDuKRLQgqOjxjCtzh_3eSDjBzrwSqEiNviUK_iBaJiCeAdnPVlJtnE" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-label-md text-on-surface truncate font-semibold">Aura Apex Studio Audio</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Audio • SKU: AUD-992</p>
                      <p className="font-label-sm text-label-sm text-primary font-bold mt-0.5">{formatINR(28999)}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container/30 text-on-secondary-container font-semibold">
                        318 sold
                      </span>
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-md hover:bg-surface-container transition-colors border border-surface-container">
                    <img 
                      className="w-14 h-14 rounded-lg object-cover bg-surface-container shrink-0" 
                      alt="Helios Biometric Ring" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMQBf_5oIh4jVJNnPHY4ed4shHJqEGvu1fEgah2_Xh5SkFgnTDSlLLx7mL1c1SvICJpnjH1-jABiRA1SYCzuyblFz3FXzluEkSD94SpSTW2cH08Yo7MXgVyPZKF1k6byPfqk4t_RrpELXRjgbNMzwAl5GZuD5G_Pau-i6_-7x-lamtvtowe1G-4iG7hoPxqsOu8I-dNSNNAco_GjhTS-7mraAg__75vl-6jW2OYIWPRCXicksRO_dc" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-label-md text-on-surface truncate font-semibold">Helios Biometric Ring Gen 4</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Wearables • SKU: WRB-014</p>
                      <p className="font-label-sm text-label-sm text-primary font-bold mt-0.5">{formatINR(18499)}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container/30 text-on-secondary-container font-semibold">
                        194 sold
                      </span>
                    </div>
                  </div>

                  {/* Product 3 */}
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-md hover:bg-surface-container transition-colors border border-surface-container">
                    <img 
                      className="w-14 h-14 rounded-lg object-cover bg-surface-container shrink-0" 
                      alt="Sylvan Diffuser" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZv-esXL4txXtJk7DoQnCWrJpuW0779u8KrNV-RkDO8uMwuzkEsc8cCE-2nqquwa56A7kFh8sLfSdYoY-aoXiSIi_iAEpzEA8SpBMUCqEWbtjdN9GjDzzF2OFXtln9N47RnLrLowQY4UsC3x5tXwaTZLrZ1ZA8ps58wvlaSPxC1wMv6hUDcXDRvRZStXNqyAWew7wM8iS1_K9CGG-da08KCHj7IhJtadzBQpHogJnp0NThV2cUCjcd" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-label-md text-on-surface truncate font-semibold">Sylvan Ultrasonic Nebulizer</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Home • SKU: HOM-448</p>
                      <p className="font-label-sm text-label-sm text-primary font-bold mt-0.5">{formatINR(9499)}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-tertiary font-semibold">
                        Only 3 Left
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fulfillment Health */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-space-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Fulfillment Health</h3>
                  <span className="text-secondary font-label-sm text-label-sm font-bold bg-secondary-container/40 px-2 py-0.5 rounded-full border border-secondary/20">
                    Optimal 99.4%
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Next carrier dispatch cycle commences in 2h 45m across regional logistics nodes.
                </p>
                <div className="flex gap-space-xs">
                  <div className="flex-1 p-space-xs bg-surface-container-low rounded text-center border border-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Pending Pick</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{telemetry.pendingPick}</span>
                  </div>
                  <div className="flex-1 p-space-xs bg-surface-container-low rounded text-center border border-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Packed & Staged</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{telemetry.packedAndStaged}</span>
                  </div>
                  <div className="flex-1 p-space-xs bg-surface-container-low rounded text-center border border-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">En Route</span>
                    <span className="font-headline-sm text-headline-sm text-secondary font-bold">{telemetry.enRoute}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Orders Stream Table (8 cols) */}
            <div className="lg:col-span-8 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md border-b border-surface-container">
                  <div>
                    <div className="flex items-center gap-space-xs">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Live Orders Stream</h2>
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Synchronized gateway transactions across domestic endpoints
                    </p>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <button 
                      onClick={() => setOrderStreamFilter('all')}
                      className={`px-space-sm py-1 rounded font-label-sm text-label-sm font-semibold transition-colors ${
                        orderStreamFilter === 'all' 
                          ? 'bg-surface-container-high text-on-surface shadow-xs' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      All ({LIVE_ORDERS_STREAM.length})
                    </button>
                    <button 
                      onClick={() => setOrderStreamFilter('pending')}
                      className={`px-space-sm py-1 rounded font-label-sm text-label-sm font-semibold transition-colors ${
                        orderStreamFilter === 'pending' 
                          ? 'bg-surface-container-high text-on-surface shadow-xs' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      Pending (1)
                    </button>
                    <button 
                      onClick={() => setOrderStreamFilter('dispatched')}
                      className={`px-space-sm py-1 rounded font-label-sm text-label-sm font-semibold transition-colors ${
                        orderStreamFilter === 'dispatched' 
                          ? 'bg-surface-container-high text-on-surface shadow-xs' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      Dispatched (1)
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto mt-space-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
                        <th className="py-space-sm px-space-md rounded-l-lg">Order ID</th>
                        <th className="py-space-sm px-space-md">Customer</th>
                        <th className="py-space-sm px-space-md">Payment Instrument</th>
                        <th className="py-space-sm px-space-md text-right">Gross Total</th>
                        <th className="py-space-sm px-space-md text-center">Lifecycle</th>
                        <th className="py-space-sm px-space-md text-right rounded-r-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                      {filteredOrders.map((ord, idx) => (
                        <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                          <td className="py-space-md px-space-md font-label-md text-label-md text-primary font-semibold font-mono">
                            {ord.id}
                          </td>
                          <td className="py-space-md px-space-md">
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md text-on-surface font-semibold">{ord.customerName}</span>
                              <span className="font-label-sm text-label-sm text-outline">{ord.customerEmail}</span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface font-medium">
                              <span className="material-symbols-outlined text-[14px] text-primary">
                                {ord.instrumentType === 'upi' ? 'account_balance_wallet' : 'credit_card'}
                              </span>
                              {ord.instrument}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md text-right font-label-md text-label-md font-bold text-on-surface">
                            {formatINR(ord.total, true)}
                          </td>
                          <td className="py-space-md px-space-md text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${ord.lifecycleStyle}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${ord.dotColor}`}></span> {ord.lifecycle}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md text-right">
                            <button 
                              onClick={() => showToast(`Manifest details loaded for order ${ord.id}`)}
                              className="p-1.5 hover:bg-surface-container rounded-lg text-outline hover:text-on-surface transition-colors" 
                              title="Manage Manifest"
                            >
                              <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-space-md flex items-center justify-between text-outline font-label-sm text-label-sm border-t border-surface-container mt-2">
                <span>Showing {filteredOrders.length} of 1,280 settled dispatches</span>
                <div className="flex items-center gap-space-xs">
                  <button className="px-space-sm py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">Prev</button>
                  <button className="px-space-sm py-1 rounded bg-primary-container text-on-primary font-bold">1</button>
                  <button className="px-space-sm py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">2</button>
                  <button className="px-space-sm py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">Next</button>
                </div>
              </div>
            </div>

          </div>

          {/* Product Upload & Ingestion Drawer/Panel */}
          {isModalOpen && (
            <div 
              id="productModal"
              className="bg-surface-container-lowest rounded-2xl shadow-xl p-space-lg mb-space-xl relative overflow-hidden transition-all duration-300 border border-outline-variant/30"
            >
              {/* Modal Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-lg gap-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold">
                    <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                      Product Upload & Inventory Management
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Publish physical SKUs, set tax brackets, and construct variant matrices
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant font-semibold">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Auto-Draft Enabled
                  </span>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-space-xs text-outline hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[22px]">close</span>
                  </button>
                </div>
              </div>

              {/* Ingestion Form */}
              <form onSubmit={(e) => { e.preventDefault(); handlePublish(); }} className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl pt-space-lg">
                
                {/* Column 1: Core Details & Visual Assets (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-space-lg">
                  
                  {/* Basic Identification */}
                  <div className="space-y-space-md">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider mb-space-xs font-semibold">
                        Product Title *
                      </label>
                      <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Ergonomic Leather Desk Mat" 
                        className="w-full h-11 px-space-md bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all border border-surface-container"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider mb-space-xs font-semibold">
                          Primary SKU *
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="w-full h-11 px-space-md bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all border border-surface-container font-mono"
                          />
                          <span className="absolute right-3 top-3 text-secondary material-symbols-outlined text-[18px]">verified</span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider mb-space-xs font-semibold">
                          Merchandise Category *
                        </label>
                        <div className="relative">
                          <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-11 px-space-md bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all appearance-none cursor-pointer border border-surface-container"
                          >
                            <option value="Electronics">Electronics</option>
                            <option value="Home">Home & Sanctuary</option>
                            <option value="Audio">High-Fidelity Audio</option>
                            <option value="Wearables">Wearables & Biometrics</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline text-[20px]">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drag-and-drop Visual & 3D Assets */}
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider mb-space-xs font-semibold">
                      Media Assets & 3D Spatial Models
                    </label>
                    <div 
                      onClick={() => showToast('Asset library browser opened')}
                      className="group relative bg-surface-container-low hover:bg-surface-container p-space-xl rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center border border-dashed border-outline-variant"
                    >
                      <div className="w-16 h-16 rounded-full bg-surface-container group-hover:bg-surface-container-lowest flex items-center justify-center text-primary mb-space-sm transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                      </div>
                      <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Drag & drop product imagery, ProRes videos, or .USDZ / .GLTF 3D objects
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Accepts PNG, WebP, AVIF, or GLTF up to 120MB per asset
                      </p>
                      <div className="mt-space-md flex items-center gap-space-sm">
                        <button className="px-space-md py-space-xs bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:shadow transition-shadow font-semibold" type="button">
                          Browse Files
                        </button>
                        <button className="px-space-md py-space-xs bg-primary-fixed text-primary font-label-md text-label-md rounded-lg hover:bg-primary-fixed-dim transition-colors font-semibold" type="button">
                          Import from Digital Asset Library
                        </button>
                      </div>
                    </div>

                    {/* Previews Staged Strip */}
                    <div className="grid grid-cols-4 gap-space-sm mt-space-sm">
                      <div className="relative group rounded-lg overflow-hidden bg-surface-container h-24 border border-surface-container">
                        <img 
                          className="w-full h-full object-cover" 
                          alt="Primary AR visor" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH53tYQfadM8XuVC3si860yGt04ffn5-R00GEyBg2Ae8-YYz_SXEzD0G_ff7CHfC2BfUHn5SIEPA0xzOfM3qli6H0yFoA0xuqlpZCu4Ff91hmHvqE_BUva0Dnblv2PUf2ONohJCJKsf93K0pWv_KckFM01xRs3rebU9EqjYYBhF3DxYDFdJo8F-d13xBUEADrhoNNY97vQMmr2extKl60jw6aAlRzZooAxeltsckFDkhys1k0yVD5j" 
                        />
                        <span className="absolute top-1 left-1 bg-surface/90 text-on-surface font-label-sm text-[10px] px-1.5 py-0.5 rounded font-bold shadow-xs">
                          Primary
                        </span>
                      </div>

                      <div className="relative group rounded-lg overflow-hidden bg-surface-container h-24 border border-surface-container">
                        <img 
                          className="w-full h-full object-cover" 
                          alt="Hinge macro detail" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpwnt7wKeFzlS82ZNnMz0z_UPbtCKXsVLBmanwOKU-IGIchLHFbDhZl-dhpX5yvFEwfMT7uzvb6CYwo9DTWd1WP5di4-by9oDn8Kox-eQMkK3O6_BuCcbLCt6fMQVykFDUjurQw4zWhKkrBMcGotvhHPMNnJG7LlYdenTz7RYlH11lG-I05iV-rDuVomc6LpgTsDNHZE0i_zWBaDQXm5A65KNyxHX8ebccpTJqnbx6aUk5vq22SVEv" 
                        />
                      </div>

                      <div className="relative rounded-lg bg-surface-container-low flex flex-col items-center justify-center text-primary font-label-sm text-label-sm h-24 border border-surface-container">
                        <span className="material-symbols-outlined text-[24px]">view_in_ar</span>
                        <span className="mt-1 font-mono text-xs">model.gltf</span>
                        <span className="text-[10px] text-secondary font-bold">Verified 3D</span>
                      </div>

                      <div 
                        onClick={() => showToast('Upload additional multi-angle images')}
                        className="rounded-lg bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface cursor-pointer h-24 border border-surface-container"
                      >
                        <span className="material-symbols-outlined text-[28px]">add</span>
                      </div>
                    </div>
                  </div>

                  {/* Variant Matrix Generator */}
                  <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                    <div className="flex items-center justify-between mb-space-sm">
                      <div>
                        <h3 className="font-label-lg text-label-lg text-on-surface font-bold">Variant Generator</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Configure multi-attribute SKU permutations</p>
                      </div>
                      <button 
                        onClick={() => showToast('Added variant attribute')}
                        className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline font-semibold" 
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span> Add Option
                      </button>
                    </div>

                    {/* Variant 1: Colorway */}
                    <div className="mb-space-md">
                      <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                        Color Palette
                      </span>
                      <div className="flex flex-wrap gap-space-xs">
                        {colors.map((c, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-sm border border-outline-variant/30">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }}></span> {c.name}
                            <button 
                              type="button"
                              onClick={() => setColors(colors.filter((_, i) => i !== idx))}
                              className="text-outline hover:text-error ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Variant 2: Headband Sizing */}
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                        Cushion Fit Sizes
                      </span>
                      <div className="flex flex-wrap gap-space-xs">
                        {['Standard (M)', 'Extended (L/XL)'].map(size => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm font-semibold transition-colors ${
                              selectedSize === size
                                ? 'bg-primary-container text-on-primary'
                                : 'bg-surface-container-lowest text-on-surface border border-outline-variant/30'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Column 2: Financials, Inventory Thresholds & SEO (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-space-lg">
                  
                  {/* Pricing & Financials Panel */}
                  <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-md border border-surface-container">
                    <h3 className="font-label-lg text-label-lg text-on-surface flex items-center gap-2 font-bold">
                      <span className="material-symbols-outlined text-[18px] text-primary">sell</span>
                      Pricing Architecture
                    </h3>

                    <div className="grid grid-cols-2 gap-space-sm">
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Regular Price (₹) *</label>
                        <input 
                          type="number" 
                          step="1" 
                          value={regularPrice}
                          onChange={(e) => setRegularPrice(parseFloat(e.target.value) || 0)}
                          className="w-full h-11 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none border border-surface-container"
                        />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Sale Price (₹)</label>
                        <input 
                          type="number" 
                          step="1" 
                          value={salePrice}
                          onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                          className="w-full h-11 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none border border-surface-container"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-space-sm">
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Cost per Unit (₹)</label>
                        <input 
                          type="number" 
                          step="1" 
                          value={costPerUnit}
                          onChange={(e) => setCostPerUnit(parseFloat(e.target.value) || 0)}
                          className="w-full h-11 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none border border-surface-container"
                        />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Tax Bracket</label>
                        <select 
                          value={taxBracket}
                          onChange={(e) => setTaxBracket(e.target.value)}
                          className="w-full h-11 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none cursor-pointer border border-surface-container font-medium"
                        >
                          <option value="18">GST Tier 3 (18%)</option>
                          <option value="12">GST Tier 2 (12%)</option>
                          <option value="5">GST Tier 1 (5%)</option>
                          <option value="0">Zero Rated (0%)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between text-on-surface border border-surface-container">
                      <span className="font-body-sm text-body-sm">Estimated Gross Margin</span>
                      <span className="font-label-md text-label-md text-secondary font-bold">
                        {grossMargin}% ({formatINR(grossProfit, true)} profit)
                      </span>
                    </div>
                  </div>

                  {/* Stock & Alert Thresholds */}
                  <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-md border border-surface-container">
                    <h3 className="font-label-lg text-label-lg text-on-surface flex items-center gap-2 font-bold">
                      <span className="material-symbols-outlined text-[18px] text-primary">warehouse</span>
                      Stock Quantity & Telemetry
                    </h3>

                    <div className="grid grid-cols-2 gap-space-sm">
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Units Available *</label>
                        <input 
                          type="number" 
                          value={unitsAvailable}
                          onChange={(e) => setUnitsAvailable(parseInt(e.target.value) || 0)}
                          className="w-full h-11 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none border border-surface-container"
                        />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Low-Stock Alert *</label>
                        <input 
                          type="number" 
                          value={lowStockAlert}
                          onChange={(e) => setLowStockAlert(parseInt(e.target.value) || 0)}
                          className="w-full h-11 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none border border-surface-container"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-space-sm pt-space-xs">
                      <input 
                        type="checkbox" 
                        id="backorder" 
                        checked={allowBackorder}
                        onChange={(e) => setAllowBackorder(e.target.checked)}
                        className="w-4 h-4 text-primary rounded cursor-pointer accent-primary" 
                      />
                      <label className="font-body-sm text-body-sm text-on-surface cursor-pointer select-none" htmlFor="backorder">
                        Allow continuous ordering when inventory reaches zero
                      </label>
                    </div>
                  </div>

                  {/* SEO & Tags */}
                  <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-sm border border-surface-container">
                    <h3 className="font-label-lg text-label-lg text-on-surface flex items-center gap-2 font-bold">
                      <span className="material-symbols-outlined text-[18px] text-primary">tag</span>
                      Metadata & Search Tags
                    </h3>

                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">
                        Keywords (Comma separated)
                      </label>
                      <input 
                        type="text" 
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="w-full h-11 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none border border-surface-container"
                      />
                    </div>

                    <div className="pt-space-xs">
                      <span className="font-label-sm text-label-sm text-outline block mb-1 font-semibold">Google SERP Preview</span>
                      <div className="p-space-sm bg-surface-container-lowest rounded-lg border border-surface-container">
                        <p className="font-label-sm text-label-sm text-primary truncate">aura.store/products/spatial-audio-visor</p>
                        <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          {title} | Official Store
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                          Experience next-generation planar acoustic drivers with low-latency spatial rendering. Available in Obsidian and Astral Silver.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Submission Row */}
                  <div className="flex items-center justify-end gap-space-sm pt-space-md mt-auto">
                    <button 
                      onClick={() => showToast('Draft saved to local buffer')}
                      className="px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors font-semibold" 
                      type="button"
                    >
                      Save Draft
                    </button>
                    <button 
                      type="submit"
                      className="px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all flex items-center gap-2 active:scale-95 font-semibold"
                    >
                      <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                      <span>Publish to Storefront</span>
                    </button>
                  </div>

                </div>
              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
