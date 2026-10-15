import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    openProductDetail,
    showToast
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    openProductDetail('soundpro-anc');
    setTimeout(() => {
      const panel = document.getElementById('checkoutPanel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-space-md border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Curated Basket</h2>
              <span className="bg-surface-container px-2 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface font-semibold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-space-md space-y-space-md">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-space-sm">
                <span className="material-symbols-outlined text-outline text-[48px]">shopping_basket</span>
                <p className="font-label-lg text-label-lg text-on-surface">Your basket is currently empty</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mx-auto">
                  Explore our curated atelier catalog to add precision engineered tech essentials.
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary text-on-primary font-label-md text-label-md px-space-lg py-2 rounded-lg mt-2 inline-flex items-center gap-1"
                >
                  <span>Explore Vault</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedVariant?.id || 'std'}`}
                  className="flex gap-space-md p-space-sm rounded-xl bg-surface-container-low/70 border border-surface-container hover:border-outline-variant/50 transition-colors"
                >
                  <img 
                    src={item.selectedVariant?.image || item.product.image} 
                    alt={item.product.title} 
                    className="w-20 h-20 rounded-lg object-cover bg-surface-container shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(false);
                      openProductDetail(item.product.id);
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            openProductDetail(item.product.id);
                          }}
                          className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors line-clamp-1 cursor-pointer font-bold"
                        >
                          {item.product.title}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-outline hover:text-error transition-colors p-0.5"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      <p className="font-body-sm text-[11px] text-on-surface-variant">
                        {item.selectedVariant ? item.selectedVariant.name : item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-surface-container rounded-lg p-0.5">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded bg-surface hover:bg-surface-container-high flex items-center justify-center text-on-surface text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-label-sm text-label-sm font-bold text-on-surface">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded bg-surface hover:bg-surface-container-high flex items-center justify-center text-on-surface text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        {formatINR(item.product.price * item.quantity, true)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-space-md border-t border-surface-container bg-surface-container-lowest space-y-space-sm">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-space-xs">
                <input 
                  type="text" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (try AURA10)" 
                  className="flex-1 bg-surface-container-low px-space-sm py-1.5 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none uppercase font-mono"
                />
                <button 
                  type="submit" 
                  className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm px-space-md py-1.5 rounded-lg transition-colors font-semibold"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between bg-secondary-container/20 text-secondary px-space-sm py-1 rounded-md text-xs font-semibold">
                  <span>Coupon {appliedCoupon} active</span>
                  <span>-{formatINR(cartDiscount, true)}</span>
                </div>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1 font-body-sm text-body-sm pt-1">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>{formatINR(cartSubtotal, true)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Express Courier</span>
                  <span className="text-secondary font-semibold uppercase text-xs">Complimentary</span>
                </div>
                <div className="flex justify-between text-on-surface font-headline-sm text-headline-sm pt-1 border-t border-surface-container">
                  <span>Total</span>
                  <span className="text-primary font-bold">{formatINR(cartTotal, true)}</span>
                </div>
              </div>

              {/* Express Checkout Button */}
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-sm rounded-lg font-label-lg text-label-lg transition-all shadow-md flex items-center justify-center gap-space-xs"
              >
                <span className="material-symbols-outlined text-[20px]">flash_on</span>
                <span>Proceed to Instant Checkout</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-outline pt-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">encrypted</span>
                <span>256-bit encrypted checkout with UPI & card authorization</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
