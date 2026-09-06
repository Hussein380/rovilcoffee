'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  Minimize2, 
  Maximize2,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Package,
  Ship,
  Coffee,
  Leaf
} from 'lucide-react';
import Image from 'next/image';

interface SuggestedProduct {
  id: string;
  name: string;
  category: string;
  categoryLabel?: string;
  tagline: string;
  image: string;
  priceRetailUSD: number;
  priceRetailKES: number;
  unitWeight: string;
  wholesalePriceUSD?: number;
  wholesaleMOQ?: string;
  origin: string;
  flavorNotes?: string[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  displayedContent?: string;
  isTyping?: boolean;
  timestamp: string;
  suggestedProducts?: SuggestedProduct[];
}

const DISCOVERY_CARDS = [
  {
    icon: Coffee,
    title: 'Coffee Export Grades',
    sub: 'AA, AB, PB Screen Sizes & Cupping',
    prompt: 'What coffee export grades are available and what are their screen sizes and cup profiles?',
  },
  {
    icon: Leaf,
    title: 'Royal Purple & Teas',
    sub: 'Antioxidant Cultivars & Black CTC',
    prompt: 'Tell me about your Kenyan Royal Purple Tea and Black CTC export grades.',
  },
  {
    icon: Package,
    title: 'Wholesale & MOQs',
    sub: 'Container Volumes & Case Pricing',
    prompt: 'What are your wholesale minimum order quantities (MOQs) and pricing terms?',
  },
  {
    icon: Ship,
    title: 'Port of Mombasa Shipping',
    sub: 'FCL / LCL Transit & FOB/CIF',
    prompt: 'How does container export shipping work from the Port of Mombasa?',
  },
];

const QUICK_PRODUCT_CHIPS = [
  { label: 'Grade AA Coffee 250g', prompt: 'Tell me about the ROVIL Single Origin Arabica Grade AA 250g pouch and pricing.' },
  { label: 'Royal Purple Tea 100g', prompt: 'Tell me about the ROVIL Royal Purple Tea 100g luxury canister and benefits.' },
];

const STORAGE_KEY = 'rovil_chat_session_history_v2';

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialWelcomeMessage: Message = {
    id: 'welcome-msg',
    role: 'assistant',
    content: `Hello and welcome to Rovil Coffee & Tea, licensed Kenyan exporter.\n\nI can assist you with our single-origin coffees (Grades AA, AB, PB), specialty teas, retail packaging, wholesale volume pricing, and international ocean shipping from the Port of Mombasa.\n\nHow can I help you today?`,
    displayedContent: `Hello and welcome to Rovil Coffee & Tea, licensed Kenyan exporter.\n\nI can assist you with our single-origin coffees (Grades AA, AB, PB), specialty teas, retail packaging, wholesale volume pricing, and international ocean shipping from the Port of Mombasa.\n\nHow can I help you today?`,
    isTyping: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Restore chat session from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not restore chat session:', e);
    }
  }, []);

  // Save chat session on update
  useEffect(() => {
    try {
      if (messages.length > 1 || (messages.length === 1 && messages[0].id !== 'welcome-msg')) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (e) {
      console.warn('Could not save chat session:', e);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized, messages]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  // Typewriter effect function
  const typeMessageOut = (messageId: string, fullText: string) => {
    const words = fullText.split(' ');
    let currentWordIndex = 0;
    
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      currentWordIndex++;
      const currentText = words.slice(0, currentWordIndex).join(' ');

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId
            ? {
                ...m,
                displayedContent: currentText,
                isTyping: currentWordIndex < words.length,
              }
            : m
        )
      );

      scrollToBottom();

      if (currentWordIndex >= words.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 22);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessageId = 'user-' + Date.now();
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMessageId,
        role: 'user',
        content: query,
        displayedContent: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const replyText = data.content || 'I am here to assist you with Rovil Coffee & Tea products and export services.';
      const assistantMessageId = 'assistant-' + Date.now();

      // Add assistant message and start typewriter
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: replyText,
          displayedContent: '',
          isTyping: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedProducts: data.suggestedProducts || [],
        },
      ]);

      setIsLoading(false);
      typeMessageOut(assistantMessageId, replyText);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackId = 'assistant-err-' + Date.now();
      const fallbackText = 'We are experiencing a temporary network delay. You can reach our export sales team directly on WhatsApp at +254 721 487 948 or email info@rovil.co.ke.';
      
      setMessages((prev) => [
        ...prev,
        {
          id: fallbackId,
          role: 'assistant',
          content: fallbackText,
          displayedContent: fallbackText,
          isTyping: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setMessages([
      {
        id: 'welcome-msg-reset',
        role: 'assistant',
        content: `Conversation reset. How can I help you regarding Rovil Coffee and Tea today?`,
        displayedContent: `Conversation reset. How can I help you regarding Rovil Coffee and Tea today?`,
        isTyping: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to format clean markdown (bold, lists, headers) into clean JSX
  const renderFormattedContent = (text: string, isTyping?: boolean) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1">
        {lines.map((line, idx) => {
          const parseBold = (str: string) => {
            const parts = str.split(/(\*\*.*?\*\*)/g);
            return parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx} className="font-semibold text-[#3d2314]">{part.slice(2, -2)}</strong>;
              }
              return part;
            });
          };

          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-xs text-[#5a3825] mt-2 mb-1 uppercase tracking-wide">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('* ') || line.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 ml-1.5 my-0.5 text-xs text-stone-700 leading-relaxed">
                <span className="text-[#8c5835] font-bold">•</span>
                <span>{parseBold(line.substring(2))}</span>
              </div>
            );
          }
          if (line.trim() === '') {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="text-xs text-stone-700 leading-relaxed">
              {parseBold(line)}
            </p>
          );
        })}
        {isTyping && (
          <span className="inline-block w-1.5 h-3.5 bg-[#8c5835] ml-0.5 animate-pulse align-middle" />
        )}
      </div>
    );
  };

  return (
    <>
      {/* ------------------- MOBILE BACKDROP ------------------- */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/45 backdrop-blur-xs z-40 sm:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* ------------------- AI CHAT WINDOW (Mobile Bottom Sheet / Desktop Card) ------------------- */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out font-sans flex flex-col overflow-hidden bg-white/98 backdrop-blur-xl shadow-2xl border border-stone-200/90
            ${/* Mobile: Bottom Sheet */ ''}
            inset-x-0 bottom-0 max-h-[88dvh] h-[86dvh] rounded-t-3xl
            ${/* Desktop: Floating Window anchored cleanly */ ''}
            sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[430px] sm:h-[540px] sm:max-h-[calc(100dvh-7.5rem)] sm:rounded-2xl
          `}
          style={{
            boxShadow: '0 25px 50px -12px rgba(45, 26, 15, 0.45), 0 0 0 1px rgba(140, 88, 53, 0.12)',
          }}
        >
          {/* Mobile Drag Handle */}
          <div className="flex justify-center pt-2 pb-1 sm:hidden bg-[#3d2314] cursor-pointer" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#3d2314] via-[#54331d] to-[#6f4327] text-white px-4 py-3 flex items-center justify-between shadow-sm select-none shrink-0 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200">
                <svg
                  className="w-4.5 h-4.5 text-amber-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="6" width="18" height="13" rx="3" fill="currentColor" fillOpacity="0.15" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <circle cx="12" cy="2" r="1" fill="currentColor" />
                  <circle cx="8.5" cy="11.5" r="1" fill="#fde68a" />
                  <circle cx="15.5" cy="11.5" r="1" fill="#fde68a" />
                  <path d="M9 15c.83.8 2 1.2 3 1.2s2.17-.4 3-1.2" stroke="#fde68a" strokeWidth="1.6" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#3d2314] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs tracking-wide">Rovil Export Specialist</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium border border-emerald-400/30">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-stone-300/90 leading-tight">Licensed Kenyan Exporter (AFA)</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reset Conversation"
                className="p-1.5 hover:bg-white/10 rounded-lg text-stone-300 hover:text-white transition-colors"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="hidden sm:inline-flex p-1.5 hover:bg-white/10 rounded-lg text-stone-300 hover:text-white transition-colors"
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 hover:bg-white/10 rounded-lg text-stone-300 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Chat Body */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-stone-50/70 text-xs chat-scroll">
            {/* Messages List */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-start gap-2 max-w-[92%]">
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#54331d] text-amber-200 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold shadow-xs">
                      R
                    </div>
                  )}
                  
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 shadow-sm text-stone-800 transition-all ${
                      msg.role === 'user'
                        ? 'bg-[#54331d] text-white rounded-br-xs'
                        : 'bg-white border border-stone-200/90 rounded-bl-xs'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="text-xs text-white leading-relaxed">{msg.content}</p>
                    ) : (
                      renderFormattedContent(msg.displayedContent ?? msg.content, msg.isTyping)
                    )}

                    {/* Suggested Products Cards */}
                    {!msg.isTyping && msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-stone-200/70 space-y-2 animate-fadeIn">
                        <p className="text-[10px] font-semibold text-[#8c5835] uppercase tracking-wider flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3" /> Featured Catalog Items
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.suggestedProducts.map((prod) => (
                            <div
                              key={prod.id}
                              className="bg-stone-50 hover:bg-stone-100/90 rounded-xl p-2 border border-stone-200/90 flex items-center gap-2.5 transition-all"
                            >
                              {prod.image ? (
                                <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-stone-200">
                                  <Image
                                    src={prod.image}
                                    alt={prod.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-11 h-11 rounded-lg bg-stone-200 text-[#54331d] flex items-center justify-center font-bold text-xs shrink-0">
                                  ROVIL
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-stone-800 text-[11px] truncate">
                                  {prod.name}
                                </h5>
                                <p className="text-[10px] text-stone-500 truncate">
                                  {prod.unitWeight} • ${prod.priceRetailUSD} USD (~KES {prod.priceRetailKES?.toLocaleString()})
                                </p>
                                <a
                                  href={`https://wa.me/254721487948?text=${encodeURIComponent(
                                    `Hello Rovil Coffee & Tea, I would like to inquire about: ${prod.name} ($${prod.priceRetailUSD} / ${prod.unitWeight})`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 hover:text-emerald-800 mt-0.5 group"
                                >
                                  <span>Order on WhatsApp</span>
                                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Message Actions (Copy & Forward to WhatsApp) */}
                    {msg.role === 'assistant' && !msg.isTyping && (
                      <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-end gap-3 text-[10px] text-stone-400">
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="hover:text-stone-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                              <span className="text-emerald-600 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <a
                          href={`https://wa.me/254721487948?text=${encodeURIComponent(
                            `Rovil Export Question Reference:\n${msg.content.slice(0, 300)}...`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                          title="Forward to Export Desk WhatsApp"
                        >
                          <Share2 className="w-2.5 h-2.5" />
                          <span>WhatsApp Desk</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-medium shadow-xs">
                      You
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-stone-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Human-like Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 max-w-[80%] animate-pulse">
                <div className="w-6 h-6 rounded-full bg-[#54331d] text-amber-200 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  R
                </div>
                <div className="bg-white border border-stone-200/90 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#8c5835] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8c5835] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8c5835] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[10px] text-stone-500 ml-1">Typing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Discovery Grid (Only shown when conversation is fresh) */}
            {messages.length <= 2 && !isLoading && (
              <div className="mt-4 pt-1 space-y-3">
                <div>
                  <p className="text-[11px] font-semibold text-stone-700 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#8c5835]" /> Quick Discovery
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {DISCOVERY_CARDS.map((card, idx) => {
                      const IconComponent = card.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(card.prompt)}
                          className="bg-white hover:bg-stone-50 text-left p-2.5 rounded-xl border border-stone-200/90 shadow-xs hover:border-[#8c5835]/50 transition-all group active:scale-98 cursor-pointer flex flex-col justify-between"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#54331d]/10 text-[#54331d] flex items-center justify-center mb-1.5 group-hover:bg-[#54331d] group-hover:text-amber-200 transition-colors">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[11px] text-stone-800 leading-tight group-hover:text-[#54331d]">
                              {card.title}
                            </h4>
                            <p className="text-[9.5px] text-stone-500 mt-0.5 line-clamp-1 leading-normal">
                              {card.sub}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Popular Product Inquiries */}
                <div className="pt-1">
                  <p className="text-[10px] font-medium text-stone-500 mb-1.5">
                    Popular Product Queries:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PRODUCT_CHIPS.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleSendMessage(chip.prompt)}
                        className="bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-full px-2.5 py-1 text-[10.5px] text-left transition-all hover:border-[#8c5835] hover:text-[#54331d] active:scale-95 cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer / Input */}
          <div className="p-3 bg-white border-t border-stone-200 shrink-0 pb-safe">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about coffee grades, teas, prices, shipping..."
                disabled={isLoading}
                className="flex-1 bg-stone-100/90 text-stone-800 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8c5835]/30 focus:bg-white border border-transparent focus:border-[#8c5835]/40 transition-all disabled:opacity-50 placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[#54331d] hover:bg-[#3d2314] text-white p-2.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center shrink-0 active:scale-95 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Direct Contact Escalation */}
            <div className="flex items-center justify-between mt-2 pt-1.5 text-[10px] text-stone-500 border-t border-stone-100">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Kenya Coffee Directorate Licensed
              </span>
              <a
                href="https://wa.me/254721487948?text=Hello%20Rovil%20Coffee%20%26%20Tea%2C%20I%20would%20like%20to%20speak%20with%20an%20export%20officer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-0.5"
              >
                Direct Export Desk <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- FLOATING ACTION BUTTONS (Ergonomic Mobile & Desktop) ------------------- */}
      <div className="fixed bottom-4 right-3.5 sm:bottom-5 sm:right-6 z-40 flex flex-col items-end gap-2 font-sans">
        {/* 1. Floating WhatsApp Button */}
        <div className="relative group flex items-center">
          <span className="hidden sm:inline-block absolute right-15 top-1/2 -translate-y-1/2 whitespace-nowrap bg-stone-900/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-10 border border-white/10">
            WhatsApp Export Desk (+254 721 487 948)
          </span>

          <a
            href="https://wa.me/254721487948?text=Hello%20Rovil%20Coffee%20%26%20Tea%2C%20I%20would%20like%20to%20inquire%20about%20your%20Kenyan%20coffee%20and%20tea%20exports"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center bg-[#25D366] hover:bg-[#20ba59] text-white w-11 h-11 sm:w-13 sm:h-13 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{ boxShadow: '0 6px 20px -3px rgba(37, 211, 102, 0.45)' }}
            aria-label="Chat on WhatsApp (+254 721 487 948)"
          >
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
            <svg
              className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 fill-current relative z-10"
              viewBox="0 0 24 24"
            >
              <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12C2.031 13.805 2.508 15.516 3.391 17.031L2 22.125L7.266 20.766C8.734 21.562 10.344 22 12.031 22C17.547 22 22.031 17.516 22.031 12C22.031 6.484 17.547 2 12.031 2ZM12.031 20.312C10.516 20.312 9.078 19.906 7.828 19.156L7.516 18.969L4.391 19.781L5.234 16.734L5.031 16.406C4.219 15.109 3.781 13.578 3.781 12C3.781 7.453 7.484 3.75 12.031 3.75C16.578 3.75 20.281 7.453 20.281 12C20.281 16.547 16.578 20.312 12.031 20.312ZM16.562 14.656C16.312 14.531 15.094 13.938 14.859 13.859C14.625 13.781 14.469 13.734 14.312 13.969C14.156 14.203 13.688 14.75 13.547 14.906C13.406 15.062 13.266 15.078 13.016 14.953C12.766 14.828 11.953 14.562 11 13.719C10.25 13.047 9.75 12.219 9.594 11.969C9.438 11.719 9.578 11.578 9.703 11.453C9.812 11.344 9.953 11.156 10.078 11.016C10.203 10.875 10.25 10.766 10.328 10.609C10.406 10.453 10.359 10.312 10.297 10.188C10.234 10.062 9.766 8.922 9.578 8.453C9.391 7.984 9.203 8.047 9.062 8.047C8.938 8.047 8.781 8.031 8.625 8.031C8.469 8.031 8.219 8.094 8 8.328C7.781 8.562 7.172 9.141 7.172 10.312C7.172 11.484 8.031 12.609 8.156 12.766C8.281 12.922 9.844 15.344 12.234 16.375C12.812 16.625 13.25 16.781 13.594 16.891C14.172 17.078 14.688 17.047 15.109 16.984C15.578 16.906 16.547 16.391 16.75 15.828C16.953 15.266 16.953 14.781 16.891 14.688C16.828 14.594 16.703 14.547 16.453 14.422L16.562 14.656Z" />
            </svg>
          </a>
        </div>

        {/* 2. Floating AI Chatbot Button */}
        <div className="relative group flex items-center">
          {!isOpen && (
            <button
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
              }}
              className="hidden sm:flex items-center gap-2 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-md mr-2 border border-amber-500/30 transition-all transform hover:scale-102 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Chat with AI Assistant</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsMinimized(false);
            }}
            className="relative flex items-center justify-center bg-gradient-to-br from-[#3d2314] via-[#54331d] to-[#8c5835] hover:from-[#2e1a0e] hover:to-[#6f4327] text-white w-11 h-11 sm:w-13 sm:h-13 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-amber-400/40 cursor-pointer"
            style={{ boxShadow: '0 6px 20px -3px rgba(61, 35, 20, 0.55)' }}
            aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
          >
            <span className="absolute -inset-1 rounded-full bg-amber-500 opacity-25 animate-pulse pointer-events-none" />

            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 relative z-10 transition-transform duration-200" />
            ) : (
              <div className="relative z-10 flex items-center justify-center">
                <svg
                  className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 text-amber-200 drop-shadow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="6" width="18" height="13" rx="4" fill="currentColor" fillOpacity="0.15" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <circle cx="12" cy="2" r="1" fill="currentColor" />
                  <circle cx="8.5" cy="11.5" r="1" fill="#fde68a" />
                  <circle cx="15.5" cy="11.5" r="1" fill="#fde68a" />
                  <path d="M9 15c.83 1 2 1.5 3 1.5s2.17-.5 3-1.5" stroke="#fde68a" strokeWidth="1.6" />
                  <path d="M2 10v4" />
                  <path d="M22 10v4" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#3d2314] rounded-full" />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
