import { Product, Order, CustomerProfile, MerchantTelemetry, Supplier, Offer, EmailNotificationConfig, EmailLogItem } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1Va_5WqsCWJ4Li3WvDg_KuHA_U2odkD6vWPzaXwFr4Fnico1TZ9PI7-QkZPY0WTkNFfJnWKKHEILLbcUI2YYpkTgYpy8m2LksrF6yuqrd_dPDqxMECjyO43a8eYMHJ-NrMjEdH6Kann3beyaRglvI7WhitOfeMzRBkopvsNmm5b5Vhhf6kHi2H8W2DuvRWFIeAm7ea8M9RG0D7WWpOoSgNbj3iqLiiB5oNNNYiXiqImxmPSIOfqoTdlrNc';

export const INITIAL_PRODUCTS: Product[] = [
  // Flagship Hero PDP Product
  {
    id: 'soundpro-anc',
    title: 'Aura SoundPro ANC',
    sku: 'AUR-ANC-PRO-01',
    category: 'Audio',
    categorySlug: 'audio',
    department: 'Premium Audio',
    price: 15999,
    originalPrice: 21999,
    discountBadge: '27% OFF',
    rating: 4.9,
    reviewCount: '1,428',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyAQk_7SRp7X-2CAvSyLTrFZ3b4Y5bch7Qf5mFE8OeZ3y2uxwy2grXZVBnaZPt4JAHaLfsiQkTeN5fNTKC32gaCr9-3y83A5wbPAYvAt8NlVTXHI0h7cGzt8Zb5cF190tnjH4cdJABGmOoQ49wc3NxL3F1KF6f3E2XLPg53edn8xfiT_SmhWxyVBVNviBNVUgUyh0PR91mILNcH3SfwpGpx7k46floIM4IfmbFa4m2dHgRA0LW_ncB',
    badge: 'Flagship Edition',
    badgeType: 'staff',
    description: 'Bespoke 40mm carbon-diaphragm transducers deliver hyper-calibrated frequency response from 10Hz to 40kHz with active hybrid noise elimination.',
    specs: {
      playtime: '45h Playtime (15 min gives 6 hours)',
      anc: '-42dB Adaptive Hybrid Noise Elimination',
      bluetooth: 'Bluetooth 5.3 Multipoint & aptX HD',
      driver: '40mm Carbon-Diaphragm Dual Transducers',
      warranty: 'Official 2-Year Studio Warranty'
    },
    variants: [
      {
        id: 'obsidian',
        name: 'Obsidian Black',
        colorName: 'Matte Obsidian',
        colorHex: '#1e2022',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChelU5OC9un7QL70spTEWt76VgnOzwsL9saIlkwF_0OiMZjnb8PQSiO6PtoxURAMpoTbKHV_Soml_ctXkn1cOMyRUoHGtGnGENTLSftyHa7Ws6duZSHpC6t3Vs_-LMMQDCaqx4-P3EEZcteZpjRpfWFMWD1UgcrhEiouWkNlj1yjPgtNCPM-DZCXrGsz2Ii4EHXDvqRNNjPmkzqmcQ9Ww22AUs6-TGtVfZ-jG5nVHo-TYiP60Xm20_',
        subtitle: 'Stealth Edition',
        inStockCount: 32
      },
      {
        id: 'slate',
        name: 'Silver Slate',
        colorName: 'Silver Slate',
        colorHex: '#cbd5e1',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgX2WoJ4dyrGcfe2s1r463HR8Ygp1vUTAzWgNHUQbxZWOpaR9RP6WE96H1QRE4FPFKmcnX8DWPA73InTs0_6HzmbzX_ebxb9ySOuO2uHyF0rSlhfnUcnK68rlpDcpR-CmwGYW7tFMKxpqs8062EDyGpfCZ3SezLdPTza-A7OtPcjJQbos58Qk9VUfx3NtRi8R_LpKcUJ7pQcfaj3JtShLoMWF262q8Prn7YzZCMJgWHXMEtJGi1L9o',
        subtitle: 'Anodized Satin',
        inStockCount: 19
      },
      {
        id: 'sage',
        name: 'Sage Green',
        colorName: 'Sage Green',
        colorHex: '#84937d',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuoPhUqrfD9Fp8ZWCf7-dVmIgqYPe9WKUO3134nVdWEhwhjauwoOH_LNNP-dkHwj-e_qIpAKyHtUgSP6Ff3FQCIzpfOJ5qtcG-NHT0soEyz2mD9MPP7TX1trRuKI83a7ZG0kUReoTR_OQasgx1CM8q87f68TPoqI3tI6Bo74xphJgNGER006qgHu_kiOAL_5jnY3keel-0eGqx8BvOYyGwO47fESs-wU65Gywe-MiKCGCTsqVY9smp',
        subtitle: 'Botanical Series',
        inStockCount: 14
      }
    ]
  },

  // Curated Grid 1
  {
    id: 'pureanc-studio',
    title: 'Spatial PureANC Studio Monitors',
    sku: 'AUR-SPAT-ANC-09',
    category: 'Acoustic Precision',
    categorySlug: 'audio',
    department: 'Premium Audio',
    price: 12499,
    originalPrice: 16999,
    discountBadge: '26% OFF',
    rating: 4.9,
    reviewCount: '1.2k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwfgeg48pIjW5OYwuUyRfGMnGvP7EkA5oB1SyIdfoItD1_jZQRbNn45OKuRlqigcSK_bVxYTUPJLb0k4ghnQ0gmy5CrdC8651iQDEurZagV8FTUjjiqPH5d3CdnH6VXPAxZnWDo9f7QMd9xvkC7m-aVI9K75h3zpN8Op061WUHwXhRH81ol4mbr39gp_fIgMAG3_N5lN3yufSoqswDe8WBP6nFsBGQpTXLWJiBD1OAl1a7lGhuVL03',
    badge: 'In Stock',
    badgeType: 'stock',
    description: 'Precision acoustic engineering monitors with zero-latency DAC integration and tactile dial attenuation.',
    specs: {
      playtime: '40h Continuous Playback',
      anc: 'Triple Hybrid Studio ANC',
      bluetooth: 'Bluetooth 5.3 + 3.5mm Low Impedance',
      warranty: '2 Year Direct Replacement'
    }
  },

  // Curated Grid 2
  {
    id: 'apex-vertical-controller',
    title: 'Apex Precision Vertical Controller',
    sku: 'AUR-VERT-MOU-02',
    category: 'Ergonomic Tools',
    categorySlug: 'desk',
    department: 'Minimal Desk Setup',
    price: 7499,
    originalPrice: 9999,
    discountBadge: 'Free Delivery',
    rating: 4.8,
    reviewCount: '840',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV3Wa97jKLrJU6WNmNvT53TP-C3StEUiI8uvqNidUYlPBVTwtwDx-pdck8IGnyTU0KcXVeTesv1NEMKxCdEdPjWNMDIS891vP_SELPCQ06mJxy5QN0p48mwpU8-jUtOx4xMLHM9Dn5180Hovu-8GG1zPIr43Rrz6uDXqRYILv7SIzKNQpHXURUMAG8LRoKhZzyXOYv4nsfTmliIrjh6AomedwkecMb443t29xJ609UK4bRpPO2rBL1',
    badge: 'Staff Pick',
    badgeType: 'staff',
    description: 'Solid CNC-machined titanium ergonomic wireless vertical mouse designed to alleviate wrist pronation tension.',
    specs: {
      playtime: '90 Days on Single USB-C Charge',
      driver: '4,000 DPI Darkfield Laser Tracking',
      bluetooth: 'Tri-Device Flow Seamless Switch',
      warranty: '3 Year Atelier Guarantee'
    }
  },

  // Curated Grid 3
  {
    id: 'lumen-beam',
    title: 'Lumen-01 Counterbalance Beam',
    sku: 'AUR-LUMEN-BEAM-01',
    category: 'Spatial Lighting',
    categorySlug: 'lighting',
    department: 'Spatial Ambience',
    price: 17499,
    originalPrice: 22499,
    discountBadge: '22% OFF',
    rating: 5.0,
    reviewCount: '310',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJoE5bLRdkRWH6x3vE_DAgCiIvkMd_AoWLGXGy0pP5p5YomAlDft5jN8Sw1w1QZht-zU60H3azoVVFyD0c2BBzp7NeADznTN8Jw1g9SBPU7tmnN28shakxo4WEg9I8jDqWu1YKeKosBtW9sYi2lcXpWBK8QjEEWbbKMZQiayz6IbY4k0XxKtT45ikLpb2U98_jWYif1lIyO3-Wtj81usUxivxHFChJEgq5fO8njjYgOgLIObXV6cTY',
    badge: 'Only 4 Left',
    badgeType: 'limited',
    description: 'Architectural anodized aluminum LED desk task lamp with warm minimalist glow and weighted kinetic fluid pivot.',
    specs: {
      playtime: '50,000 Hour CRI 98+ Diode Lifespan',
      anc: 'Zero-Flicker Continuous Stepless Dimming',
      warranty: 'Lifetime LED Module Replacement'
    }
  },

  // Curated Grid 4
  {
    id: 'saddle-hide-case',
    title: 'Saddle-Hide Monolith Case 16"',
    sku: 'AUR-LEATH-MONO-16',
    category: 'Carry Goods',
    categorySlug: 'carry',
    department: 'Lifestyle & Wearables',
    price: 7999,
    originalPrice: 10999,
    discountBadge: 'Free Shipping',
    rating: 4.7,
    reviewCount: '450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzCpzod5P_wklvNw0lqT28BGGqDGPD9b3EX1waYGXbv0L8LS-3R1iG6DgtMD3owRoFEDjZk5B0IqoM4Rt9p5Jl3oSbqdW-fApCRmaIRZcTxuuru4H9iazVa5fwa0k_UXtkXPVPnha58ZK1mDbVujCNoYBO4FH8fyd7qMasD25FLrtuz9knzySfAacmgJ2pkJz-aZdCV9Um7HKgIjMDya-nQe3hujCgQlwkWlGTvHspgVLpCuvTWD_h',
    badge: 'Artisan Handcrafted',
    badgeType: 'artisan',
    description: 'Vegetable-tanned full-grain leather sleeve lined with scratchless micro-suede and magnetic concealed clasp.',
    specs: {
      warranty: 'Lifetime Craftsmanship Guarantee'
    }
  },

  // Flash Kinetic Drop 1
  {
    id: 'magform-stand',
    title: 'MagForm Dual Atelier Stand',
    sku: 'AUR-MAG-STAND-01',
    category: 'Ergonomics',
    categorySlug: 'desk',
    department: 'Minimal Desk Setup',
    price: 10999,
    originalPrice: 16999,
    discountBadge: 'Save ₹6,000',
    rating: 4.9,
    reviewCount: '620',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_jQ2FkeF9q_0RJtPFyI4QGv90k6FKTS2_1v6aflNs7wLwDs6qaBioyGX9xgjavmPiIf9Fr2gn3VIfFZUnQE_A_SkdgKRozTVGAh5Lhz26Bs-BkdlrURQxPOztuoaKM6x2NZ81jqaBxrgXe7-uQuAdesrQ1O7c_fDgbQN1s_JD4NnYSH7eokkoXMOX_dxiOK9oO7yiqInTG6-Q7dYETTaNl6b1TmHcDqsvVJmk7dbVgkUV_8X7auPV',
    isFlashDrop: true,
    stockAllocationPercent: 82,
    stockClaimedText: '82% claimed',
    description: 'Brushed aerospace aluminum wireless charging dock with matte brass contact points holding phone & earbuds simultaneously.'
  },

  // Flash Kinetic Drop 2
  {
    id: 'reference-one-headset',
    title: 'Aura Reference One Headset',
    sku: 'AUR-REF-ONE-02',
    category: 'Acoustics',
    categorySlug: 'audio',
    department: 'Premium Audio',
    price: 24999,
    originalPrice: 34999,
    discountBadge: 'Save ₹10,000',
    rating: 5.0,
    reviewCount: '412',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_0nO2gibv4UEEDuIjneRObCEnxEv7CUjl2-vy8YrMRJd7pYY2cjefMwk3cBxJ68mco-0OrMRE-CaGU_qFdnUZiV44V-LBOcFH0WxGbxNxQHpkWddoY8yc2yMf_RgdCwKVF9UOdDGEJqgO0y6CFeaqai8H1ezN28-hiMg0DD8FeplM5xfIydPxfjAiZXsE3fdyG_tjnEk7wddTwWpx6xU2pRfTrtvp2O8IW5D1gNTOuFzOtvEY2ovu',
    isFlashDrop: true,
    stockAllocationPercent: 91,
    stockClaimedText: '91% claimed',
    description: 'Minimal matte black noise-cancelling audiophile headset with knurled metallic tactile dials and planar drivers.'
  },

  // Flash Kinetic Drop 3
  {
    id: 'cipher-75-console',
    title: 'Cipher-75 Tactile Console',
    sku: 'AUR-CIPHER-75-KB',
    category: 'Peripherals',
    categorySlug: 'desk',
    department: 'Minimal Desk Setup',
    price: 13999,
    originalPrice: 17999,
    discountBadge: 'Save ₹4,000',
    rating: 4.8,
    reviewCount: '780',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO_fro74DSoYDqvd4H-bXLSnbRhMSJ4oKhc3CajySPaH14CDs5Utrq7C8bH-kg7FMTu9VHUYJyFomDX6Ge6F5xgmV364iArv8-4883q-OMdfdBbP9EXsV50Zx1QXZLlF7YmAQJ1tL_nx_gsZZoN1WmAPk60oGc4LttcuMdGXvapo58y3864GeVlDkF4sVtW7VYYMov3gCtgZZJiolUzs5o-WA_QaeKC7EaEz2Lp0I-LUMBAbn7P1_j',
    isFlashDrop: true,
    stockAllocationPercent: 64,
    stockClaimedText: '64% claimed',
    description: 'Monochrome mechanical keyless 75 percent keyboard with low profile textured PBT keycaps and sandblasted chassis.'
  },

  // Spotlight Hero Artifact
  {
    id: 'linear-hifi-monolith',
    title: 'Linear Hi-Fi Studio Monolith',
    sku: 'AUR-HIFI-MONO-01',
    category: 'Spotlight Artifact',
    categorySlug: 'audio',
    department: 'Premium Audio',
    price: 24999,
    originalPrice: 31999,
    discountBadge: 'Save ₹7,000',
    rating: 4.9,
    reviewCount: '95',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBomrUdMhjijtnfUpJRgO9EaWBcK5MJ7lWjlRv3mKZYAJe1gCAEJ4dunN-i_0NpBazQNe8s27Di8IfGqHJPQXZh5Th2YEkJDBPtqIt68jEJAr5egVn1gNCwQDISmy6gUlT6cmeRUJZD8PahyeVnHTKZLeA50dDB8mfu_zcTNbe_8gH-rxBNqpm_KsTRb26D_6fFouDVewFVe8N5ZiVZvdlBf9Hv7xecTVjFBYFbDx_ZNSUEYEaqOykW',
    badge: 'Spotlight Artifact',
    badgeType: 'staff',
    description: 'Calibrated planar acoustic drivers housed inside an architectural brushed aluminum column.'
  },

  // Additional Catalog Products matching orders / merchant views
  {
    id: 'aura-mech-studio-kb',
    title: 'Aura Mechanical Studio Keyboard',
    sku: 'AUR-KB-STUDIO-W',
    category: 'Peripherals',
    categorySlug: 'desk',
    department: 'Minimal Desk Setup',
    price: 10999,
    rating: 4.9,
    reviewCount: '520',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQY7k3UqXqxn5RKbzRm6l0ZlDOa2XKrO4R-pxMYwHzbBad3R06tTfaNFse4jw-yTOmmPCzT5CMHQryVCl3GxHyp60pFHkM0sG9bMG_CsGmXkhDSts6V_-4T8bfQ18eEJGR68zPIkAf9ftfOov0IGkJsWylTuIibXGBAY_tlMUAPMLfGfsF_iZ_k-nyDg5EleR6yD8WVzMrw-d3q8ZKkZFQ2MUjAUbzsxzIF7NM7-gMnoznIS4P9-kK',
    badge: 'Aura Atelier Hardware',
    badgeType: 'stock',
    description: 'Matte White • Hot-Swappable Tactile Switches • Sound-dampened gasket mount design.'
  },
  {
    id: 'lumen-smart-beacon',
    title: 'Aura Lumen Smart Desk Beacon',
    sku: 'AUR-LUMEN-BEACON',
    category: 'Spatial Lighting',
    categorySlug: 'lighting',
    department: 'Spatial Ambience',
    price: 15999,
    rating: 4.8,
    reviewCount: '340',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABCxv1LL0rVkwdMIWOxodrnIxDjkeGqy3MUbRN9SI7RmpTeVaZM00WD6Qn5pk-PRX5mp6u-V7yQej2d275UQkX7C6wGMbbCzcCFaNWwtEuQ0uUvkqpObDrxXhxexnjnpLNX_730117rvapj4btu53_lvUvJ8jVfjWZr1Nw8b_QlpMUg83VzGfenMG0gekf1fuww1KaZK2rgViU_I580OUQkQPB_90wVBLamoosZ81nUO9_eG156iw9',
    badge: 'Sandstone White',
    badgeType: 'stock',
    description: 'Architectural ceramic smart audio desk lamp in off-white textured finish with brass dial accent.'
  },
  {
    id: 'merino-wool-mat',
    title: 'Merino Wool Felt Oversized Workspace Mat',
    sku: 'AUR-FELT-MAT-GR',
    category: 'Ergonomic Tools',
    categorySlug: 'desk',
    department: 'Minimal Desk Setup',
    price: 5499,
    rating: 5.0,
    reviewCount: '480',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtDYQVTZWLRozaH6WsmUSbpgf8a7fv7Cl9PH5-FabDaGwVyukIQRNA7gPsUTvq1qEL3_nehhrRNpT0QLldCkgjsNkVbQnsPm_-jyWxbCDta9olBiIz2kk2FfoWbhTQNbDdGpROA6Z_YfMNBDWtH5MP2wUtj_m9_hyCBDssg0YhGvoJ3ZqCCQ-LbwRMOxzDQ-YZe72aCs592iuMSWGFWeTBUOE5kFj79F-XeSw97g59AUBdTR0KWHl6',
    badge: 'Graphite Gray',
    badgeType: 'staff',
    description: 'Graphite Gray • 900mm x 400mm • Ultra-dense German merino wool felt with natural rubber traction base.'
  },
  {
    id: 'titanium-magstand-02',
    title: 'Aura Titanium MagStand Stand 02',
    sku: 'AUR-TITAN-MAG-02',
    category: 'Ergonomics',
    categorySlug: 'desk',
    department: 'Minimal Desk Setup',
    price: 6599,
    rating: 4.9,
    reviewCount: '290',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1qP7LWzm60-erBtr0SeJOYXKHu2CfpD3Vm-5ZXtWcuHZKGJN9qeze69-MJKUDbS30fWvqSXMqn3ASdc2Q9n-_x2k3v1L0oqTgYmw_H_1L6B2C1SSZ8KY2ywv_-ty_vT9bGt8a6gQ3RVZ3H_ov9fU_Gb-QPD9d7agzPVrDofJa4qyb9n2TASUqdAn3IdqP20o3lzTMC0lhRlaRs6LFDYzGj1LT0yKm5u8HE2zCicloD7ujz_WpvrDX',
    badge: 'Raw Titanium',
    badgeType: 'artisan',
    description: 'Raw Bead-Blasted Titanium Finish • Dual Pivot Axis with precision friction dampers.'
  },
  {
    id: 'modular-weekender-bag',
    title: 'Modular Atelier Weekender Carry 28L',
    sku: 'AUR-BAG-MOD-28L',
    category: 'Carry Goods',
    categorySlug: 'carry',
    department: 'Lifestyle & Wearables',
    price: 17999,
    rating: 4.8,
    reviewCount: '190',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs4Y5gzMgR1cxNbC4CMSgj-kjbOrzQ3LEOXUew_Kx1_RQWiJq4UbaMm5igepqPh-trLNdO23hhWHwtvb2GS3Brmy1Nc5YEPgtZ3Sk0Ptw5C7YHnvXyhUvkhxSOFrUzuUfzLszvdzDKjvccWw7B6WtIi1GmeNiFnQ6VivIz7Y575Er3OCufj77hYFfshTElo6OwA06l7x1NMNTALGANsoLdkPYJ2lGtIMgclrcu0nw8DZIUCiUhkVMH',
    badge: 'Deep Forest',
    badgeType: 'stock',
    description: 'Weatherproof ripstop sailcloth and full grain harness leather with quick release aircraft alloy hardware.'
  },

  // Merchant Portal SKUs
  {
    id: 'apex-studio-audio-sk',
    title: 'Aura Apex Studio Audio',
    sku: 'AUD-992',
    category: 'High-Fidelity Audio',
    categorySlug: 'audio',
    department: 'Premium Audio',
    price: 29999,
    rating: 5.0,
    reviewCount: '318',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYW1GWlQ8yqGsMvSFlRiy0vZwJ_41Ty4FFdmCVnPbNzt4Xyd8deoxTnuAL8Vt8q7GUMiBy3D6sbRb9zF_xm5sJ6ewvR4SSpANjlfdcOdc2DzQWAya8OMG5h5XOK-0zipw8137pk5cVFSTICLcTAH8lj2bXdWx5NyfSKddIajdRus7CIDTXQ19IafrKTXMG22SDuKRLQgqOjxjCtzh_3eSDjBzrwSqEiNviUK_iBaJiCeAdnPVlJtnE',
    badge: '318 Sold',
    badgeType: 'staff',
    description: 'High-end acoustic wireless noise canceling headphones on concrete plinth with brushed graphite finish.'
  },
  {
    id: 'helios-ring-gen4',
    title: 'Helios Biometric Ring Gen 4',
    sku: 'WRB-014',
    category: 'Wearables & Biometrics',
    categorySlug: 'wearables',
    department: 'Lifestyle & Wearables',
    price: 18999,
    rating: 4.8,
    reviewCount: '194',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMQBf_5oIh4jVJNnPHY4ed4shHJqEGvu1fEgah2_Xh5SkFgnTDSlLLx7mL1c1SvICJpnjH1-jABiRA1SYCzuyblFz3FXzluEkSD94SpSTW2cH08Yo7MXgVyPZKF1k6byPfqk4t_RrpELXRjgbNMzwAl5GZuD5G_Pau-i6_-7x-lamtvtowe1G-4iG7hoPxqsOu8I-dNSNNAco_GjhTS-7mraAg__75vl-6jW2OYIWPRCXicksRO_dc',
    badge: '194 Sold',
    badgeType: 'stock',
    description: 'Titanium smart wearable fitness ring with optical PPG biometrics and continuous skin temp telemetry.'
  },
  {
    id: 'sylvan-nebulizer',
    title: 'Sylvan Ultrasonic Nebulizer',
    sku: 'HOM-448',
    category: 'Home & Sanctuary',
    categorySlug: 'home',
    department: 'Home Essentials',
    price: 9999,
    rating: 4.9,
    reviewCount: '210',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZv-esXL4txXtJk7DoQnCWrJpuW0779u8KrNV-RkDO8uMwuzkEsc8cCE-2nqquwa56A7kFh8sLfSdYoY-aoXiSIi_iAEpzEA8SpBMUCqEWbtjdN9GjDzzF2OFXtln9N47RnLrLowQY4UsC3x5tXwaTZLrZ1ZA8ps58wvlaSPxC1wMv6hUDcXDRvRZStXNqyAWew7wM8iS1_K9CGG-da08KCHj7IhJtadzBQpHogJnp0NThV2cUCjcd',
    badge: 'Only 3 Left',
    badgeType: 'limited',
    description: 'Sleek architectural ceramic aroma diffuser emitting delicate ambient micro-mist.'
  }
];

export const INITIAL_CUSTOMER: CustomerProfile = {
  name: 'Sarah Jenkins',
  email: 's.jenkins@studio-minimal.design',
  tier: 'Aura Gold Member',
  points: 1420,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMh2Wxei5PAo8jHhyAnBXd9H8q2OTRGgvisb7z9MLi0B-AolSttpIBvS5Po8cJ11HGZpDPduV1UdHw3PDc-ljMHnDFEGywJxJxBYBgYHJ0rL5shKFORTL0jPIaTSqDU9DYnP6Sose44Fctr21vMqzht1odUH_eoxRTIIV-aMRVplN5MI_stk4VhFCqg3-QCtg9pu9P2OCgP0Ix-UHAjLJ-23V9m1TH1-KxjEPB2SBkvm4ARBN8MyxI',
  memberSince: '2022',
  activeOrdersCount: 1,
  totalOrdersCount: 14,
  savedPlacesCount: 3,
  phone: '+91 98201 44829',
  defaultAddress: 'Suite 402, Signature Towers, 12th Road, Khar West, Mumbai, MH 400052'
};

export const INITIAL_ORDERS: Order[] = [
  // Active Consignment Order
  {
    id: 'ord-active-89241',
    referenceNumber: '#AC-89241',
    date: 'Oct 24, 2024',
    status: 'In Transit',
    statusLabel: 'Shipped • In Transit',
    paymentMethod: 'Prepaid via UPI (PhonePe) • Verified',
    totalAmount: 10999.00,
    carrierAwBill: 'BLUEDART-EXP-7729104',
    estimatedDelivery: 'Tomorrow • by 6:00 PM',
    currentLocation: 'Departed Hub - Mumbai Air Logistics',
    timelineStep: 3,
    trackingUpdates: [
      { time: 'Today 2:00 PM', text: 'Departed Hub - Air Cargo Terminal', location: 'Mumbai Air Logistics (BOM)' },
      { time: 'Today 11:30 AM', text: 'Customs cleared & dispatched to sort facility', location: 'Atelier Central Hub (Bandra)' },
      { time: 'Oct 24 4:30 PM', text: 'Packed, sealed, serialized inspection QC passed', location: 'Warehouse Station 4 (Bhiwandi)' },
      { time: 'Oct 24 10:14 AM', text: 'Order confirmed & GST tax invoice issued', location: 'Aura Commerce India' }
    ],
    items: [
      {
        id: 'item-89241-1',
        productTitle: 'Aura Mechanical Studio Keyboard',
        variantDetails: 'Matte White • Hot-Swappable Tactile Switches • Qty: 1',
        price: 10999.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQY7k3UqXqxn5RKbzRm6l0ZlDOa2XKrO4R-pxMYwHzbBad3R06tTfaNFse4jw-yTOmmPCzT5CMHQryVCl3GxHyp60pFHkM0sG9bMG_CsGmXkhDSts6V_-4T8bfQ18eEJGR68zPIkAf9ftfOov0IGkJsWylTuIibXGBAY_tlMUAPMLfGfsF_iZ_k-nyDg5EleR6yD8WVzMrw-d3q8ZKkZFQ2MUjAUbzsxzIF7NM7-gMnoznIS4P9-kK'
      }
    ]
  },
  // Fulfilled Order 1
  {
    id: 'ord-87119',
    referenceNumber: '#AC-87119',
    date: 'Sep 16, 2024',
    deliveryDate: 'Sep 18, 2024',
    status: 'Delivered',
    statusLabel: 'Delivered Successfully',
    paymentMethod: 'HDFC Corporate Visa ending in 4102',
    totalAmount: 15999.00,
    items: [
      {
        id: 'item-87119-1',
        productTitle: 'Aura Lumen Smart Desk Beacon • Sandstone White',
        variantDetails: 'Includes 18W Fast Charging Dock • Standard Warranty: 2 Years',
        price: 15999.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABCxv1LL0rVkwdMIWOxodrnIxDjkeGqy3MUbRN9SI7RmpTeVaZM00WD6Qn5pk-PRX5mp6u-V7yQej2d275UQkX7C6wGMbbCzcCFaNWwtEuQ0uUvkqpObDrxXhxexnjnpLNX_730117rvapj4btu53_lvUvJ8jVfjWZr1Nw8b_QlpMUg83VzGfenMG0gekf1fuww1KaZK2rgViU_I580OUQkQPB_90wVBLamoosZ81nUO9_eG156iw9'
      }
    ]
  },
  // Fulfilled Order 2 (Multi-item)
  {
    id: 'ord-85402',
    referenceNumber: '#AC-85402',
    date: 'Aug 10, 2024',
    deliveryDate: 'Aug 12, 2024',
    status: 'Delivered',
    statusLabel: 'Delivered Successfully',
    paymentMethod: 'Google Pay • sarah@oksbi',
    totalAmount: 12098.00,
    items: [
      {
        id: 'item-85402-1',
        productTitle: 'Merino Wool Felt Oversized Workspace Mat',
        variantDetails: 'Graphite Gray • 900mm x 400mm • Non-slip base',
        price: 5499.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtDYQVTZWLRozaH6WsmUSbpgf8a7fv7Cl9PH5-FabDaGwVyukIQRNA7gPsUTvq1qEL3_nehhrRNpT0QLldCkgjsNkVbQnsPm_-jyWxbCDta9olBiIz2kk2FfoWbhTQNbDdGpROA6Z_YfMNBDWtH5MP2wUtj_m9_hyCBDssg0YhGvoJ3ZqCCQ-LbwRMOxzDQ-YZe72aCs592iuMSWGFWeTBUOE5kFj79F-XeSw97g59AUBdTR0KWHl6',
        isReviewed: true,
        reviewRating: 5.0
      },
      {
        id: 'item-85402-2',
        productTitle: 'Aura Titanium MagStand Stand 02',
        variantDetails: 'Raw Bead-Blasted Titanium Finish • Dual Pivot Axis',
        price: 6599.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1qP7LWzm60-erBtr0SeJOYXKHu2CfpD3Vm-5ZXtWcuHZKGJN9qeze69-MJKUDbS30fWvqSXMqn3ASdc2Q9n-_x2k3v1L0oqTgYmw_H_1L6B2C1SSZ8KY2ywv_-ty_vT9bGt8a6gQ3RVZ3H_ov9fU_Gb-QPD9d7agzPVrDofJa4qyb9n2TASUqdAn3IdqP20o3lzTMC0lhRlaRs6LFDYzGj1LT0yKm5u8HE2zCicloD7ujz_WpvrDX'
      }
    ]
  },
  // Cancelled Order 3
  {
    id: 'ord-81992',
    referenceNumber: '#AC-81992',
    date: 'Jul 04, 2024',
    status: 'Cancelled',
    statusLabel: 'Cancelled by Customer',
    paymentMethod: 'UPI (PhonePe) • 9820144829@ybl',
    totalAmount: 17999.00,
    refundStatus: '₹17,999.00 Refunded to UPI VPA',
    items: [
      {
        id: 'item-81992-1',
        productTitle: 'Modular Atelier Weekender Carry 28L',
        variantDetails: 'Color: Deep Forest / Slate • Auto-cancelled before dispatch',
        price: 17999.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs4Y5gzMgR1cxNbC4CMSgj-kjbOrzQ3LEOXUew_Kx1_RQWiJq4UbaMm5igepqPh-trLNdO23hhWHwtvb2GS3Brmy1Nc5YEPgtZ3Sk0Ptw5C7YHnvXyhUvkhxSOFrUzuUfzLszvdzDKjvccWw7B6WtIi1GmeNiFnQ6VivIz7Y575Er3OCufj77hYFfshTElo6OwA06l7x1NMNTALGANsoLdkPYJ2lGtIMgclrcu0nw8DZIUCiUhkVMH'
      }
    ]
  }
];

export const INITIAL_TELEMETRY: MerchantTelemetry = {
  totalRevenue: 3980250.00,
  revenueChangePercent: 14.2,
  grossOrders: 1280,
  ordersChangePercent: 8.6,
  conversionRate: 3.4,
  avgOrderValue: 6450.00,
  aovChange: 420.00,
  criticalSkusCount: 4,
  pendingPick: 42,
  packedAndStaged: 118,
  enRoute: 870
};

export const LIVE_ORDERS_STREAM = [
  {
    id: '#AUR-88421',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.d@nexus.in',
    instrument: 'UPI - PhonePe',
    instrumentType: 'upi',
    total: 29999.00,
    lifecycle: 'Paid',
    lifecycleStyle: 'bg-secondary-container/40 text-on-secondary-container',
    dotColor: 'bg-secondary'
  },
  {
    id: '#AUR-88420',
    customerName: 'Vikramaditya Roy',
    customerEmail: 'v.roy@alumni.tech',
    instrument: 'HDFC Visa Card',
    instrumentType: 'card',
    total: 37499.00,
    lifecycle: 'Processing',
    lifecycleStyle: 'bg-primary-fixed text-on-primary-fixed-variant',
    dotColor: 'bg-primary animate-pulse'
  },
  {
    id: '#AUR-88419',
    customerName: 'Pooja Venkatesh',
    customerEmail: 'pooja.v@designworks.co',
    instrument: 'UPI - GooglePay',
    instrumentType: 'upi',
    total: 9999.00,
    lifecycle: 'Dispatched',
    lifecycleStyle: 'bg-surface-container text-on-surface-variant',
    dotColor: 'bg-outline'
  },
  {
    id: '#AUR-88418',
    customerName: 'Sameer Chopra',
    customerEmail: 'sameer@chopraholdings.com',
    instrument: 'ICICI Platinum',
    instrumentType: 'card',
    total: 58990.00,
    lifecycle: 'Paid',
    lifecycleStyle: 'bg-secondary-container/40 text-on-secondary-container',
    dotColor: 'bg-secondary'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Rohit Singhania',
    companyName: 'Aura Audio Atelier',
    email: 'rohit@auraatelier.in',
    phone: '+91 98201 88410',
    gstin: '27AAACA1234F1Z1',
    status: 'ACTIVE',
    adminAccessGranted: true,
    commissionRate: 10,
    joinedDate: 'Jan 15, 2024',
    productsCount: 6,
    totalRevenue: 1845000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    city: 'Mumbai, Maharashtra'
  },
  {
    id: 'sup-2',
    name: 'Priya Nambiar',
    companyName: 'Zenith Minimal Peripherals',
    email: 'priya@zenithperipherals.com',
    phone: '+91 98450 12890',
    gstin: '29AABCZ9876Q1Z9',
    status: 'ACTIVE',
    adminAccessGranted: true,
    commissionRate: 12,
    joinedDate: 'Mar 02, 2024',
    productsCount: 4,
    totalRevenue: 980000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    city: 'Bengaluru, Karnataka'
  },
  {
    id: 'sup-3',
    name: 'Amit Kulkarni',
    companyName: 'Helios Biometric Hardware',
    email: 'amit@helioswearables.io',
    phone: '+91 98110 99420',
    gstin: '07AABCH4321E1Z4',
    status: 'ACTIVE',
    adminAccessGranted: true,
    commissionRate: 15,
    joinedDate: 'May 10, 2024',
    productsCount: 3,
    totalRevenue: 640000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4.7,
    city: 'New Delhi, NCR'
  },
  {
    id: 'sup-4',
    name: 'Meera Sen',
    companyName: 'Sylvan Spatial Ambience',
    email: 'meera@sylvanspatial.in',
    phone: '+91 98300 77123',
    gstin: '19AABCS5544R1Z2',
    status: 'PENDING',
    adminAccessGranted: false,
    commissionRate: 12,
    joinedDate: 'Oct 12, 2024',
    productsCount: 1,
    totalRevenue: 0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 4.5,
    city: 'Kolkata, West Bengal'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: 'Autumn Launch Voucher',
    code: 'AURA10',
    discountPercent: 10,
    discountType: 'PERCENTAGE',
    minOrderAmount: 5000,
    expiryDate: 'Nov 30, 2025',
    active: true,
    appliedCount: 428,
    description: 'Instant 10% discount on orders above ₹5,000 across all atelier departments.',
    bannerTag: 'Popular Choice'
  },
  {
    id: 'off-2',
    title: 'Festive Luminary Drop',
    code: 'DIWALI25',
    discountPercent: 25,
    discountType: 'PERCENTAGE',
    minOrderAmount: 15000,
    expiryDate: 'Nov 15, 2025',
    active: true,
    appliedCount: 194,
    description: 'Exclusive 25% festival allocation on High-End Audio, Spatial Lighting, and Mechanical Keyboards.',
    bannerTag: 'Limited Vault'
  },
  {
    id: 'off-3',
    title: 'New Patron Privilege',
    code: 'FIRSTPATRON',
    discountPercent: 15,
    discountType: 'PERCENTAGE',
    minOrderAmount: 10000,
    expiryDate: 'Dec 31, 2025',
    active: true,
    appliedCount: 812,
    description: 'Welcome benefit for verified new patrons on their inaugural acquisition.',
    bannerTag: 'Patron Welcome'
  },
  {
    id: 'off-4',
    title: 'Kinetic Flash Drop',
    code: 'FLASH30',
    discountPercent: 30,
    discountType: 'PERCENTAGE',
    minOrderAmount: 20000,
    expiryDate: 'Oct 31, 2025',
    active: false,
    appliedCount: 76,
    description: 'Automated 30% reduction on selected flash drops terminating at countdown close.'
  }
];

export const INITIAL_EMAIL_CONFIG: EmailNotificationConfig = {
  superAdminEmail: 'sachinpatel808@gmail.com',
  notifyOnNewOrder: true,
  notifyOnLowStock: true,
  notifyOnSupplierSignup: true,
  notifyOnPriceDrop: true,
  notifyOnConsignmentDispatched: true,
  smtpServer: 'smtp.gmail.com',
  smtpPort: 587,
  smtpUser: 'sachinpatel808@gmail.com',
  isSimulatedMode: true
};

export const INITIAL_EMAIL_LOGS: EmailLogItem[] = [
  {
    id: 'em-101',
    timestamp: 'Just now',
    toEmail: 'sachinpatel808@gmail.com',
    subject: '[Aura Commerce] 📦 High-Velocity Order Received: #AC-89241 (₹15,999)',
    templateType: 'NEW_ORDER',
    previewText: 'New order placed by Sarah Jenkins for Aura SoundPro ANC Headphones finish Matte Obsidian. Payment authorized via UPI.',
    htmlBody: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #1e2022; line-height: 1.6;">
      <h2 style="color: #0037b0; margin-bottom: 8px;">Order Notification: #AC-89241</h2>
      <p>Hello Super Admin (sachinpatel808@gmail.com),</p>
      <p>A new customer transaction has been pre-authorized on Aura Commerce:</p>
      <div style="background: #f1f4ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Customer:</strong> Sarah Jenkins (sarah.j@atelier-arch.com)</p>
        <p><strong>Billed Total:</strong> ₹15,999.00 (Incl. 18% GST)</p>
        <p><strong>Payment Instrument:</strong> UPI (PhonePe QR) • Verified Instant</p>
        <p><strong>Dispatch Destination:</strong> Bandra Architectural Studio, Mumbai, MH 400050</p>
        <p><strong>Fulfillment Partner:</strong> Bluedart Priority Express Air Courier</p>
      </div>
      <p style="color: #535f70; font-size: 13px;">Consignment booked automatically. Telemetry monitoring is active in the operations hub.</p>
    </div>`,
    status: 'DELIVERED'
  },
  {
    id: 'em-102',
    timestamp: '1 hour ago',
    toEmail: 'sachinpatel808@gmail.com',
    subject: '[Aura Commerce] ⚠️ Critical Low-Stock Trigger: Helios Biometric Ring (3 units left)',
    templateType: 'LOW_STOCK',
    previewText: 'SKU WRB-014 has reached critical stock threshold (3 units). Reorder trigger with supplier Amit Kulkarni recommended.',
    htmlBody: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #1e2022; line-height: 1.6;">
      <h2 style="color: #ba1a1a; margin-bottom: 8px;">Critical Inventory Warning</h2>
      <p>Hello Super Admin,</p>
      <p>The following SKU has breached the automatic safety reorder buffer:</p>
      <div style="background: #fff8f6; border-left: 4px solid #ba1a1a; padding: 15px; margin: 15px 0;">
        <p><strong>Item:</strong> Helios Biometric Ring Gen 4 (SKU: WRB-014)</p>
        <p><strong>Assigned Supplier:</strong> Helios Biometric Hardware (amit@helioswearables.io)</p>
        <p><strong>Remaining Stock:</strong> 3 units (Allocation 94% claimed)</p>
      </div>
      <p>You can adjust lead time thresholds or issue a restock procurement PO directly from the Supplier Admin console.</p>
    </div>`,
    status: 'DELIVERED'
  },
  {
    id: 'em-103',
    timestamp: 'Yesterday',
    toEmail: 'sachinpatel808@gmail.com',
    subject: '[Aura Commerce] 🤝 Supplier Admin Registration: Sylvan Spatial Ambience',
    templateType: 'SUPPLIER_INVITE',
    previewText: 'Meera Sen (meera@sylvanspatial.in) has submitted supplier credentials for review and requested vendor access.',
    htmlBody: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #1e2022; line-height: 1.6;">
      <h2 style="color: #0037b0; margin-bottom: 8px;">New Supplier Application Pending Approval</h2>
      <p>Hello Super Admin,</p>
      <p>A new supplier has completed registration and awaits your authorization:</p>
      <div style="background: #f1f4ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Company:</strong> Sylvan Spatial Ambience</p>
        <p><strong>Representative:</strong> Meera Sen (+91 98300 77123)</p>
        <p><strong>GSTIN:</strong> 19AABCS5544R1Z2 (Kolkata)</p>
        <p><strong>Proposed Category:</strong> Spatial Lighting & Ultrasonic Nebulizers</p>
      </div>
      <p>Approve in Super Admin Portal to grant Supplier Admin dashboard access.</p>
    </div>`,
    status: 'DELIVERED'
  }
];

export const ORACLE_SCHEMA_DDL = `-- ============================================================================
-- AURA COMMERCE - ORACLE DATABASE 23c / 19c ENTERPRISE DDL SCHEMA
-- Compatible with Oracle Database Free, XE, Enterprise Edition, and OCI Autonomous DB
-- ============================================================================

-- 1. ROLES & ACCESS CONTROL TABLE
CREATE TABLE roles (
    role_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    role_name VARCHAR2(50) NOT NULL UNIQUE,
    description VARCHAR2(255)
);

INSERT INTO roles (role_name, description) VALUES ('ROLE_SUPER_ADMIN', 'Full platform authority, supplier onboarding, pricing, offers, email notifications');
INSERT INTO roles (role_name, description) VALUES ('ROLE_SUPPLIER_ADMIN', 'Manage vendor catalog, inventory batches, and order dispatches');
INSERT INTO roles (role_name, description) VALUES ('ROLE_CUSTOMER', 'Browse catalog, place orders, track live GPS consignments');

-- 2. USERS TABLE (BCrypt Encrypted Passwords)
CREATE TABLE users (
    user_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    email VARCHAR2(150) NOT NULL UNIQUE,
    password_hash VARCHAR2(255) NOT NULL,
    full_name VARCHAR2(120) NOT NULL,
    phone_number VARCHAR2(20),
    is_active NUMBER(1) DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id NUMBER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    role_id NUMBER NOT NULL REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 3. SUPPLIERS (VENDORS) TABLE
CREATE TABLE suppliers (
    supplier_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    user_id NUMBER REFERENCES users(user_id),
    company_name VARCHAR2(150) NOT NULL,
    contact_name VARCHAR2(100) NOT NULL,
    email VARCHAR2(150) NOT NULL,
    phone VARCHAR2(25) NOT NULL,
    gstin VARCHAR2(20) NOT NULL UNIQUE,
    commission_rate NUMBER(5,2) DEFAULT 10.00 CHECK (commission_rate BETWEEN 0 AND 100),
    status VARCHAR2(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PENDING', 'SUSPENDED')),
    admin_access_granted NUMBER(1) DEFAULT 1 CHECK (admin_access_granted IN (0, 1)),
    city VARCHAR2(100),
    rating NUMBER(2,1) DEFAULT 4.8,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PRODUCTS TABLE (Prices in INR, Multi-Vendor, Offers & Discount Support)
CREATE TABLE products (
    product_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    supplier_id NUMBER REFERENCES suppliers(supplier_id) ON DELETE SET NULL,
    sku VARCHAR2(60) NOT NULL UNIQUE,
    title VARCHAR2(255) NOT NULL,
    category VARCHAR2(100) NOT NULL,
    category_slug VARCHAR2(50) NOT NULL,
    department VARCHAR2(100) NOT NULL,
    price NUMBER(12,2) NOT NULL CHECK (price >= 0),
    original_price NUMBER(12,2),
    discount_percent NUMBER(5,2) DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
    cost_per_unit NUMBER(12,2),
    tax_bracket_percent NUMBER(4,1) DEFAULT 18.0,
    in_stock_count NUMBER DEFAULT 50 CHECK (in_stock_count >= 0),
    low_stock_threshold NUMBER DEFAULT 10,
    primary_image_url VARCHAR2(1000) NOT NULL,
    description CLOB,
    specs_json CLOB,
    approval_status VARCHAR2(20) DEFAULT 'APPROVED' CHECK (approval_status IN ('APPROVED', 'PENDING_REVIEW', 'REJECTED')),
    is_featured NUMBER(1) DEFAULT 0 CHECK (is_featured IN (0, 1)),
    is_flash_drop NUMBER(1) DEFAULT 0 CHECK (is_flash_drop IN (0, 1)),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PRODUCT GALLERY IMAGES
CREATE TABLE product_images (
    image_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    product_id NUMBER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    image_url VARCHAR2(1000) NOT NULL,
    display_order NUMBER DEFAULT 1,
    is_primary NUMBER(1) DEFAULT 0 CHECK (is_primary IN (0, 1))
);

-- 6. OFFERS & COUPONS ENGINE
CREATE TABLE offers (
    offer_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    code VARCHAR2(40) NOT NULL UNIQUE,
    title VARCHAR2(150) NOT NULL,
    discount_percent NUMBER(5,2) NOT NULL CHECK (discount_percent BETWEEN 0 AND 100),
    discount_type VARCHAR2(20) DEFAULT 'PERCENTAGE' CHECK (discount_type IN ('PERCENTAGE', 'FLAT_INR')),
    min_order_amount NUMBER(12,2) DEFAULT 0,
    expiry_date DATE NOT NULL,
    is_active NUMBER(1) DEFAULT 1 CHECK (is_active IN (0, 1)),
    applied_count NUMBER DEFAULT 0,
    description VARCHAR2(500),
    created_by_user_id NUMBER REFERENCES users(user_id)
);

-- 7. ORDERS & CONSIGNMENT TRACKING
CREATE TABLE orders (
    order_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    order_reference VARCHAR2(50) NOT NULL UNIQUE,
    customer_user_id NUMBER REFERENCES users(user_id),
    customer_name VARCHAR2(120) NOT NULL,
    customer_email VARCHAR2(150) NOT NULL,
    shipping_address VARCHAR2(500) NOT NULL,
    total_amount NUMBER(12,2) NOT NULL,
    discount_applied NUMBER(12,2) DEFAULT 0,
    payment_method VARCHAR2(100) NOT NULL,
    payment_status VARCHAR2(30) DEFAULT 'AUTHORIZED',
    order_status VARCHAR2(30) DEFAULT 'In Transit' CHECK (order_status IN ('Processing', 'In Transit', 'Delivered', 'Cancelled')),
    carrier_awb VARCHAR2(60),
    estimated_delivery VARCHAR2(60),
    current_gps_location VARCHAR2(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. ORDER ITEMS (Line Items linked to Product and Supplier for Revenue Share)
CREATE TABLE order_items (
    order_item_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    order_id NUMBER NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id NUMBER REFERENCES products(product_id),
    supplier_id NUMBER REFERENCES suppliers(supplier_id),
    product_title VARCHAR2(255) NOT NULL,
    variant_details VARCHAR2(255),
    unit_price NUMBER(12,2) NOT NULL,
    quantity NUMBER NOT NULL CHECK (quantity > 0),
    item_total NUMBER(12,2) NOT NULL,
    commission_amount NUMBER(12,2) DEFAULT 0
);

-- 9. EMAIL NOTIFICATIONS AUDIT LOG
CREATE TABLE email_notifications (
    notification_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    recipient_email VARCHAR2(150) NOT NULL,
    subject VARCHAR2(255) NOT NULL,
    template_type VARCHAR2(40) NOT NULL,
    preview_snippet VARCHAR2(500),
    html_content CLOB,
    delivery_status VARCHAR2(20) DEFAULT 'SENT' CHECK (delivery_status IN ('SENT', 'FAILED', 'QUEUED', 'SIMULATED')),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ORACLE PL/SQL TRIGGER: Auto-Update Timestamp & Stock Level Check
CREATE OR REPLACE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/
`;

