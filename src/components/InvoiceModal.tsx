import React from 'react';
import { useStore } from '../context/StoreContext';
import { LOGO_URL } from '../data/mockData';
import { formatINR } from '../utils/currency';

export const InvoiceModal: React.FC = () => {
  const { isInvoiceModalOpen, setIsInvoiceModalOpen, selectedOrderForModal, activeOrder, customer } = useStore();

  if (!isInvoiceModalOpen) return null;

  const order = selectedOrderForModal || activeOrder;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Bar */}
        <div className="bg-surface-container-low px-space-lg py-space-sm border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold text-on-surface">
            <span className="material-symbols-outlined text-[18px] text-primary">receipt_long</span>
            <span>Tax Invoice & Authenticity Certificate</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <button 
              onClick={() => window.print()}
              className="bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm px-space-md py-1.5 rounded-lg border border-outline-variant/40 flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print</span>
            </button>
            <button 
              onClick={() => setIsInvoiceModalOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Container */}
        <div className="p-space-xl overflow-y-auto font-body-sm text-body-sm text-on-surface space-y-space-lg bg-surface-container-lowest">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-space-md border-b border-surface-container pb-space-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <img alt="Aura Logo" className="h-7 w-auto" src={LOGO_URL} />
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight">Aura Commerce Atelier</span>
              </div>
              <p className="text-on-surface-variant text-xs">
                Aura Commerce Platforms India Pvt. Ltd. • GSTIN: 27AABCA1234F1Z8 (Maharashtra)
              </p>
              <p className="text-on-surface-variant text-xs">
                402, Signature Towers, Linking Road, Bandra West, Mumbai, MH 400050
              </p>
            </div>
            <div className="text-left sm:text-right space-y-0.5">
              <p className="font-headline-md text-headline-md font-bold text-primary">INVOICE</p>
              <p className="font-mono text-xs text-outline">{order.referenceNumber}</p>
              <p className="text-xs text-on-surface-variant">Date: {order.date}</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-secondary-container/30 text-secondary">
                {order.statusLabel}
              </span>
            </div>
          </div>

          {/* Billing & Shipping Ledger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg">
            <div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold mb-1">
                Billed To
              </p>
              <p className="font-bold text-on-surface">{customer.name}</p>
              <p className="text-on-surface-variant text-xs">{customer.email}</p>
              <p className="text-on-surface-variant text-xs">{customer.phone}</p>
              <p className="text-on-surface-variant text-xs mt-1">Tier: {customer.tier} (#AUR-GOLD-1420)</p>
            </div>
            <div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold mb-1">
                Dispatch Consignment Details
              </p>
              <p className="font-bold text-on-surface">Destination Address:</p>
              <p className="text-on-surface-variant text-xs">{customer.defaultAddress}</p>
              <p className="text-on-surface-variant text-xs mt-1">Payment Method: {order.paymentMethod}</p>
              {order.carrierAwBill && (
                <p className="text-primary text-xs font-mono font-semibold">AWB: {order.carrierAwBill}</p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-surface-container rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-outline text-xs uppercase font-semibold">
                  <th className="py-2.5 px-4">Item Description</th>
                  <th className="py-2.5 px-4 text-center">Qty</th>
                  <th className="py-2.5 px-4 text-right">Unit Price</th>
                  <th className="py-2.5 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-xs">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-on-surface">{item.productTitle}</p>
                      <p className="text-on-surface-variant">{item.variantDetails}</p>
                    </td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-right font-mono">{formatINR(item.price, true)}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">{formatINR(item.price * item.quantity, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-mono">{formatINR(order.totalAmount, true)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Priority Express Logistics</span>
                <span className="text-secondary font-semibold uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Integrated GST (18%)</span>
                <span>Included (₹0.00)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-on-surface pt-2 border-t border-surface-container">
                <span>Amount Paid</span>
                <span className="text-primary font-mono">{formatINR(order.totalAmount, true)}</span>
              </div>
            </div>
          </div>

          {/* Certificate & Atelier Stamp Footer */}
          <div className="pt-space-md border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-low/30 p-space-md rounded-lg">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[28px]">verified_user</span>
              <div>
                <p className="font-bold text-xs text-on-surface">Serialized Atelier Certificate of Authenticity</p>
                <p className="text-[11px] text-on-surface-variant">Each unit individually inspected and calibrated prior to courier custody.</p>
              </div>
            </div>
            <div className="font-mono text-[10px] text-outline text-right">
              DIGITAL SIGNATURE HASH:<br />
              <span className="text-primary font-bold">SHA256: 8f42e...88a1b</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
