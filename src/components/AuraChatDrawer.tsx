import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const AuraChatDrawer: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    isChatMinimized,
    setIsChatMinimized,
    chatMessages,
    sendMessage
  } = useStore();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen && !isChatMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen, isChatMinimized]);

  if (!isChatOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  const handleSuggestion = (text: string) => {
    sendMessage(text);
  };

  return (
    <div 
      id="aura-support-drawer"
      className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-surface-container-lowest rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.18)] border border-outline-variant/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {/* Chat Header */}
      <div className="bg-primary px-space-md py-space-sm text-on-primary flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold font-headline-sm">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-primary"></span>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold leading-tight">Aura Assistant</h4>
            <p className="font-body-sm text-[11px] opacity-90 leading-tight">Verified Live Concierge • Instant</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsChatMinimized(!isChatMinimized)}
            className="w-7 h-7 rounded hover:bg-primary-container/40 flex items-center justify-center text-on-primary transition-colors"
            title={isChatMinimized ? 'Maximize' : 'Minimize'}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isChatMinimized ? 'expand_less' : 'remove'}
            </span>
          </button>
          <button 
            onClick={() => setIsChatOpen(false)}
            className="w-7 h-7 rounded hover:bg-primary-container/40 flex items-center justify-center text-on-primary transition-colors"
            title="Close Chat"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {/* Collapsible Body */}
      {!isChatMinimized && (
        <>
          {/* Chat Messages Stream */}
          <div 
            className="p-space-md flex-1 max-h-80 overflow-y-auto space-y-space-md bg-surface-container-low/40"
            id="chat-messages"
          >
            {/* Timestamp Badge */}
            <div className="text-center">
              <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded-full">
                Today, 2:42 PM
              </span>
            </div>

            {/* Rendered Messages */}
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start gap-space-xs'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0 mt-1">
                    <span className="material-symbols-outlined text-[15px]">headset_mic</span>
                  </div>
                )}
                <div 
                  className={`p-space-sm rounded-2xl shadow-sm max-w-[85%] ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-on-primary rounded-tr-none' 
                      : 'bg-surface-container-lowest text-on-surface rounded-tl-none'
                  }`}
                >
                  <p className="font-body-sm text-body-sm leading-relaxed">{msg.text}</p>
                  <span className={`font-label-sm text-[10px] block text-right mt-1 ${
                    msg.sender === 'user' ? 'opacity-75 text-on-primary' : 'text-outline'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Quick Suggestion Pills */}
            <div className="pl-8 space-y-1.5 pt-1">
              <p className="font-label-sm text-[11px] text-on-surface-variant font-medium">Quick suggestions:</p>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => handleSuggestion('Track recent order')}
                  className="chat-pill bg-surface-container-lowest hover:bg-surface-container hover:text-primary text-on-surface font-label-sm text-[12px] px-3 py-1 rounded-full shadow-sm transition-colors text-left"
                >
                  📦 Track recent order
                </button>
                <button 
                  onClick={() => handleSuggestion('UPI refund timeline')}
                  className="chat-pill bg-surface-container-lowest hover:bg-surface-container hover:text-primary text-on-surface font-label-sm text-[12px] px-3 py-1 rounded-full shadow-sm transition-colors text-left"
                >
                  ⚡ UPI refund timeline
                </button>
                <button 
                  onClick={() => handleSuggestion('Warranty info')}
                  className="chat-pill bg-surface-container-lowest hover:bg-surface-container hover:text-primary text-on-surface font-label-sm text-[12px] px-3 py-1 rounded-full shadow-sm transition-colors text-left"
                >
                  🛡️ Warranty info
                </button>
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Section */}
          <div className="p-space-sm bg-surface-container-lowest border-t border-surface-container/60 shadow-inner flex flex-col gap-space-xs">
            <form onSubmit={handleSubmit} className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded-xl">
              <button 
                type="button" 
                title="Attach invoice or receipt" 
                onClick={() => handleSuggestion('Attached reference #AC-89241 invoice')}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type query for live concierge..." 
                className="flex-1 bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none py-1.5"
              />
              <button 
                type="submit" 
                className="w-8 h-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>

            <div className="flex items-center justify-between px-space-xs">
              <span className="font-body-sm text-[10px] text-outline">Encrypted &amp; PCI-DSS compliant assistance</span>
              <span className="font-body-sm text-[10px] text-secondary font-medium flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Live
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
