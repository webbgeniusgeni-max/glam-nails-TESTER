import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, HelpCircle, Plus, Check, Scissors, Brush, HeartHandshake } from 'lucide-react';
import { NailService } from '../types';

interface NailServicesProps {
  onSelectServiceForBooking: (serviceId: string, addons: string[]) => void;
}

export const SALON_SERVICES: NailService[] = [
  // Manicures
  { id: 'classic-mani', name: 'Classic Manicure', price: 25, category: 'manicure', description: 'Nail shaping, cuticle care, hand and arm massage, and classic polish of your choice.' },
  { id: 'gel-mani', name: 'Gel Manicure', price: 40, category: 'manicure', description: 'Long-lasting high-gloss gel polish cured under UV. Zero chip promise for up to 3 weeks!' },
  
  // Acrylics
  { id: 'acrylic-set', name: 'Acrylic Full Set', price: 60, category: 'acrylics', description: 'Full set of custom shaped acrylic tips in your preferred length with high-gloss finish.' },
  { id: 'acrylic-fill', name: 'Acrylic Fill', price: 45, category: 'acrylics', description: 'Maintenance fill recommended every 2-3 weeks to keep your acrylic set flawless.' },
  
  // Pedicures
  { id: 'pedi-classic', name: 'Classic Pedicure', price: 45, category: 'pedicure', description: 'Warm foot soak, professional exfoliating scrub, nail care, and standard pretty polish.' },
  { id: 'pedi-deluxe', name: 'Deluxe Spa Pedicure', price: 65, category: 'pedicure', description: 'Rose petal bath, organic sugar scrub, ultimate clay mask with hot towel wrap, and massage.' },
  
  // Add-ons
  { id: 'addon-french', name: 'French Tips', price: 15, category: 'addons', description: 'Elegant precision-drawn edge tips in bright white or any neon colour.', isAddon: true },
  { id: 'addon-chrome', name: 'Chrome Finish', price: 20, category: 'addons', description: 'Sleek, futuristic mirror-like chrome powder in metallic gold, pink or silver.', isAddon: true },
  { id: 'addon-art', name: 'Nail Art', price: 10, category: 'addons', description: 'Handdrawn Y2K starbursts, cherries, flames, or glitter stripes.', isAddon: true },
  
  // Kids
  { id: 'mini-mani', name: 'Kids\' Mini Mani', price: 18, category: 'kids', description: 'Gentle quick trim, sweet message lotion, and custom toxic-free glitter sparkle polish.' },
];

export default function NailServices({ onSelectServiceForBooking }: NailServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Design Quote States
  const [selectedBase, setSelectedBase] = useState<string>('gel-mani');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-chrome']);

  const categories = [
    { id: 'all', label: 'All Services', icon: HeartHandshake },
    { id: 'manicure', label: 'Manicures', icon: Scissors },
    { id: 'acrylics', label: 'Acrylic Full Sets', icon: Brush },
    { id: 'pedicure', label: 'Pedicures', icon: Sparkles },
    { id: 'addons', label: 'Glam Add-Ons', icon: Brush },
    { id: 'kids', label: 'Princess Mini', icon: Heart },
  ];

  const filteredServices = activeCategory === 'all' 
    ? SALON_SERVICES 
    : SALON_SERVICES.filter(s => s.category === activeCategory);

  // Quote calculation
  const baseService = SALON_SERVICES.find(s => s.id === selectedBase) || SALON_SERVICES[0];
  const queryAddons = SALON_SERVICES.filter(s => selectedAddons.includes(s.id));
  const estimatedTotal = baseService.price + queryAddons.reduce((sum, addon) => sum + addon.price, 0);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  const handleBookWithCustomQuote = () => {
    onSelectServiceForBooking(selectedBase, selectedAddons);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto" id="services-section">
      {/* Title block */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-pink-100 blur-2xl opacity-70 rounded-full" />
        <span className="font-bubble px-4 py-1.5 rounded-full bg-hotpink-100/75 border border-hotpink-200/80 text-hotpink-600 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm">
          <Sparkles size={12} className="animate-pulse" /> Glamour Pricelist <Sparkles size={12} className="animate-pulse" />
        </span>
        <h2 className="font-bubble text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-hotpink-600 to-purple-600 mt-3 drop-shadow-sm">
          Our Nail Studio Offerings
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-pink-300 via-hotpink-500 to-purple-400 mx-auto rounded-full mt-4" />
        <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm md:text-base">
          All our treatments are infused with pure love, high-grade organic luxury oils, and that high-key retro glitter spark. Scroll down to custom-build your dream set!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Price list catalogue */}
        <div className="lg:col-span-2 space-y-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start pb-4 border-b border-pink-100">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-y2k text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive 
                      ? 'bg-gradient-to-r from-hotpink-500 to-hotpink-600 text-white shadow-md scale-105 border border-hotpink-400' 
                      : 'bg-white text-hotpink-600 border border-pink-100 hover:border-hotpink-300 hover:bg-hotpink-50/50'
                  }`}
                >
                  <Icon size={14} className={isActive ? "animate-bounce" : ""} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* List display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  id={`service-${service.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="y2k-panel p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-2 border-pink-100 hover:border-hotpink-300 relative group overflow-hidden"
                >
                  {/* Heart decoration on hover */}
                  <div className="absolute top-2 right-2 text-pink-200 group-hover:text-hotpink-300 group-hover:scale-125 transition-transform duration-300">
                    <Heart size={16} fill="currentColor" />
                  </div>

                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="font-bubble text-lg font-bold text-hotpink-600 group-hover:text-hotpink-700 transition-colors duration-300">
                        {service.name}
                      </h4>
                      <span className="font-y2k text-lg font-extrabold text-[#8c1240] shrink-0 bg-hotpink-100/50 px-3 py-1 rounded-lg border border-hotpink-200/50">
                        ${service.price}{service.id === 'acrylic-set' || service.id === 'addon-art' ? '+' : ''}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed font-sans mt-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-dashed border-pink-100 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-y2k text-pink-500 font-bold bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                      {service.category}
                    </span>

                    {/* Quick quote interactive binders */}
                    {service.isAddon ? (
                      <button
                        onClick={() => toggleAddon(service.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                          selectedAddons.includes(service.id)
                            ? 'bg-hotpink-500 text-white shadow-sm'
                            : 'bg-white border border-pink-200 text-hotpink-500 hover:border-hotpink-400'
                        }`}
                      >
                        {selectedAddons.includes(service.id) ? (
                          <>
                            <Check size={12} strokeWidth={3} /> Added Add-On
                          </>
                        ) : (
                          <>
                            <Plus size={12} /> Add to Dream Set
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedBase(service.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                          selectedBase === service.id
                            ? 'bg-purple-500 text-white shadow-sm border border-purple-400'
                            : 'bg-white border border-pink-200 text-purple-600 hover:border-purple-300'
                        }`}
                      >
                        {selectedBase === service.id ? (
                          <>
                            <Check size={12} strokeWidth={3} /> Selected Base
                          </>
                        ) : (
                          <>
                            Set Base Mani
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Studio customization visual calculator - right rail */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 y2k-panel p-8 rounded-3xl rhinestone-border overflow-hidden bg-white shadow-xl">
            {/* Glossy top detail stripes */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-hotpink-400 via-pink-400 to-purple-400" />
            
            <div className="flex items-center gap-2 mb-6">
              <Heart size={20} fill="#ff2982" className="text-[#ff2982] animate-pulse" />
              <h3 className="font-bubble text-xl font-extrabold text-[#8c1240]">
                Glam Design Studio
              </h3>
            </div>
            
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Custom-combo your treatment below to see an instant estimate for your dream set!
            </p>

            {/* Base Selector Dropdown */}
            <div className="space-y-4 mb-6">
              <label className="block text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">
                1. Select Base Set
              </label>
              <select
                id="quote-base-select"
                value={selectedBase}
                onChange={(e) => setSelectedBase(e.target.value)}
                className="w-full text-sm rounded-xl py-2 px-3 border border-pink-100 bg-pink-50/50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-hotpink-400 font-sans"
              >
                {SALON_SERVICES.filter(s => !s.isAddon).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (${s.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Addons Checklist */}
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">
                2. Customize Add-ons:
              </label>
              <div className="space-y-2">
                {SALON_SERVICES.filter(s => s.isAddon).map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-hotpink-50/70 border-hotpink-300' 
                          : 'bg-white border-pink-100 hover:bg-pink-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          isChecked ? 'bg-hotpink-500 border-hotpink-500 text-white' : 'border-pink-300 bg-white'
                        }`}>
                          {isChecked && <Check size={10} strokeWidth={4} />}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{addon.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-hotpink-600">+${addon.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total quote display block */}
            <div className="p-5 rounded-2xl bg-[#fff0f6] border border-hotpink-200/50 flex flex-col items-center justify-center relative mb-6">
              <div className="absolute top-1 right-2 text-hotpink-300/30 font-bubble text-3xl select-none">
                2004
              </div>
              
              <span className="text-xs font-y2k tracking-widest text-[#8c1240]/80 uppercase font-bold">
                Estimated Glam Total:
              </span>
              <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-hotpink-600 to-purple-600 mt-2 font-bubble tracking-tight">
                ${estimatedTotal}
              </span>
              <span className="text-[10px] text-gray-500 mt-1 italic text-center leading-tight">
                *Final cost calculated by artist based on nail length, tips & 3D charms.
              </span>
            </div>

            {/* CTA action */}
            <button
              onClick={handleBookWithCustomQuote}
              className="w-full btn-glam text-white font-bubble py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Sparkles size={14} className="animate-pulse" />
              Lock In This Set Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
