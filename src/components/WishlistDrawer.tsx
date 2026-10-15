import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistIds,
    products,
    toggleWishlist,
    addToCart,
    openProductDetail
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-space-md border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-tertiary-container text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Curated Wishlist</h2>
              <span className="bg-surface-container px-2 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface font-semibold">
                {wishlistedProducts.length} items
              </span>
            </div>
            <button 
              onClick={() => setIsWishlistOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-space-md space-y-space-md">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-space-sm">
                <span className="material-symbols-outlined text-outline text-[48px]">favorite_border</span>
                <p className="font-label-lg text-label-lg text-on-surface">Your wishlist vault is empty</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mx-auto">
                  Click the heart icon on any curated tech piece to save it for future releases.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex gap-space-md p-space-sm rounded-xl bg-surface-container-low/70 border border-surface-container"
                >
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-20 h-20 rounded-lg object-cover bg-surface-container shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductDetail(product.id);
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openProductDetail(product.id);
                          }}
                          className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors line-clamp-1 cursor-pointer font-bold"
                        >
                          {product.title}
                        </h4>
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="text-error hover:scale-110 transition-transform p-0.5"
                          title="Remove from wishlist"
                        >
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            favorite
                          </span>
                        </button>
                      </div>
                      <p className="font-body-sm text-[11px] text-on-surface-variant">{product.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        {formatINR(product.price)}
                      </span>
                      <button 
                        onClick={() => {
                          addToCart(product, 1);
                        }}
                        className="bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm px-space-md py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
