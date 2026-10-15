import React from 'react';
import { useStore } from '../context/StoreContext';

export const LiveGpsModal: React.FC = () => {
  const { isGpsModalOpen, setIsGpsModalOpen, activeOrder } = useStore();

  if (!isGpsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary px-space-lg py-space-md text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-[20px] animate-pulse">radar</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm font-bold">Live Air Consignment Radar</h3>
                <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Live GPS
                </span>
              </div>
              <p className="font-body-sm text-[12px] opacity-90">
                AWB: {activeOrder.carrierAwBill} • Air Cargo Boeing 777-F
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsGpsModalOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-primary-container/40 flex items-center justify-center text-on-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Simulated High-Tech Flight & Route Map Canvas */}
        <div className="relative w-full h-64 bg-slate-950 overflow-hidden flex items-center justify-center">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
          
          {/* Radar Circles */}
          <div className="absolute w-72 h-72 rounded-full border border-primary/30 animate-ping opacity-25"></div>
          <div className="absolute w-96 h-96 rounded-full border border-primary/20"></div>

          {/* SVG Flight Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 240">
            <defs>
              <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#006c49" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#1d4ed8" stopOpacity="1" />
                <stop offset="100%" stopColor="#747686" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Trajectory */}
            <path 
              d="M 80 180 Q 280 40 520 120" 
              fill="none" 
              stroke="url(#flightGradient)" 
              strokeWidth="3" 
              strokeDasharray="6 4"
            />
            {/* Origin Pin: Mumbai Logistics */}
            <circle cx="80" cy="180" r="6" fill="#006c49" />
            <circle cx="80" cy="180" r="12" fill="#006c49" opacity="0.3" className="animate-pulse" />

            {/* In-Transit Plane Position */}
            <g transform="translate(360, 85) rotate(-15)">
              <circle cx="0" cy="0" r="14" fill="#1d4ed8" opacity="0.3" className="animate-ping" />
              <circle cx="0" cy="0" r="8" fill="#1d4ed8" />
              <path d="M -6 -4 L 0 6 L 6 -4 Z" fill="#ffffff" />
            </g>

            {/* Destination Pin: Regional Sorting */}
            <circle cx="520" cy="120" r="6" fill="#747686" />
          </svg>

          {/* Overlay Map Telemetry Badges */}
          <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono shadow-md">
            <span className="text-emerald-400 font-bold">ALT:</span> 34,000 FT • <span className="text-cyan-400 font-bold">SPD:</span> 540 KTS
          </div>
          <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono shadow-md">
            <span className="text-amber-400 font-bold">CABIN TEMP:</span> 18.5°C • SECURE
          </div>
          <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono shadow-md">
            <span>ORIGIN: </span><span className="text-emerald-400">BOM (Mumbai Air Hub)</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono shadow-md">
            <span>DEST: </span><span className="text-cyan-400">BLR Regional Sort Node (Bengaluru)</span>
          </div>
        </div>

        {/* Checkpoint Details */}
        <div className="p-space-lg space-y-space-md bg-surface-container-low/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-space-sm border-b border-surface-container">
            <div>
              <p className="font-label-sm text-label-sm uppercase text-outline">Active Leg</p>
              <p className="font-label-lg text-label-lg text-on-surface font-bold">
                {activeOrder.currentLocation}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-label-sm text-label-sm uppercase text-outline">Estimated Final Delivery</p>
              <p className="font-label-lg text-label-lg text-secondary font-bold">
                {activeOrder.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-space-sm">
            <p className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
              Telemetry Checkpoints
            </p>
            {activeOrder.trackingUpdates?.map((up, i) => (
              <div key={i} className="flex items-start gap-space-sm font-body-sm text-body-sm">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${i === 0 ? 'bg-primary animate-ping' : 'bg-outline-variant'}`}></span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-on-surface">{up.text}</span>
                    <span className="text-outline text-xs">{up.time}</span>
                  </div>
                  <p className="text-on-surface-variant text-xs">{up.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-space-sm flex justify-end">
            <button 
              onClick={() => setIsGpsModalOpen(false)}
              className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-lg py-2 rounded-lg transition-colors"
            >
              Close Telemetry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
