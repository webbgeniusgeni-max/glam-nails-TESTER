import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, Mail, MapPin, Sparkles, Heart, Clock, User, CheckCircle, Smartphone } from 'lucide-react';
import { AppointmentRequest, NailArtist } from '../types';
import { SALON_SERVICES } from './NailServices';

interface NailBookingProps {
  initialServiceId?: string;
  initialAddons?: string[];
}

export const NAIL_ARTISTS: NailArtist[] = [
  {
    id: 'art-chanel',
    name: 'Chanel',
    vibe: 'Bling Queen & 3D Charms ✨',
    bio: 'Heavy rhinestones, cute metallic decals, and 3D bows are my love language.',
    favoriteDesign: 'Liquid Crown Chrome Acrylics',
    availabilities: ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM']
  },
  {
    id: 'art-brittany',
    name: 'Brittany',
    vibe: 'Airbrush starburst Guru 🎨',
    bio: 'Recreating authentic early-2000s cyber starbursts, cherries, and retro flame sets.',
    favoriteDesign: 'Neon Cloud Airbrush Coffin Set',
    availabilities: ['09:00 AM', '1:00 PM', '3:30 PM', '5:00 PM']
  },
  {
    id: 'art-paris',
    name: 'Paris',
    vibe: 'Chrome-mirror Master 💿',
    bio: 'Mirror-powders, foil foils, and standard baby-pink french tips inspired by Beverly Hills 2004.',
    favoriteDesign: 'Ultra Silver Edge French',
    availabilities: ['10:30 AM', '12:00 PM', '2:30 PM', '4:00 PM']
  },
  {
    id: 'art-destiny',
    name: 'Destiny',
    vibe: 'Hand-painted Butterfly Artist 🦋',
    bio: 'Specialist in delicate hand-brushed butterflies, flowers, and micro-artwork overlays.',
    favoriteDesign: 'Deluxe Lavender Dream Ombre',
    availabilities: ['09:30 AM', '11:00 AM', '1:30 PM', '3:00 PM']
  }
];

export default function NailBooking({ initialServiceId, initialAddons }: NailBookingProps) {
  // Booking Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState(initialServiceId || 'classic-mani');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(initialAddons || []);
  const [artistId, setArtistId] = useState('art-chanel');
  const [date, setDate] = useState('2026-06-18');
  const [time, setTime] = useState('2:00 PM');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [receiptCode, setReceiptCode] = useState('');

  // Update form if props change from service quote click
  useEffect(() => {
    if (initialServiceId) {
      setServiceId(initialServiceId);
    }
    if (initialAddons) {
      setSelectedAddons(initialAddons);
    }
  }, [initialServiceId, initialAddons]);

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate server side delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      // Generate a cute random Juicy-feeling confirmation code
      const randStr = Math.random().toString(36).substring(2, 7).toUpperCase();
      setReceiptCode(`PVN-2004-${randStr}`);
    }, 1500);
  };

  const selectedBaseService = SALON_SERVICES.find(s => s.id === serviceId) || SALON_SERVICES[0];
  const selectedAddonObjs = SALON_SERVICES.filter(s => selectedAddons.includes(s.id));
  const totalCostEstimate = selectedBaseService.price + selectedAddonObjs.reduce((sum, item) => sum + item.price, 0);
  const artistObj = NAIL_ARTISTS.find(a => a.id === artistId) || NAIL_ARTISTS[0];

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setServiceId('classic-mani');
    setSelectedAddons([]);
    setArtistId('art-chanel');
    setDate('2026-06-18');
    setTime('2:00 PM');
    setSpecialRequests('');
    setIsConfirmed(false);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto" id="booking-section">
      {/* Title */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-pink-100 blur-2xl opacity-70 rounded-full" />
        <span className="font-bubble px-4 py-1.5 rounded-full bg-hotpink-100/75 border border-hotpink-200/80 text-hotpink-600 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm animate-pulse">
          <Calendar size={12} /> Live Scheduling <Calendar size={12} />
        </span>
        <h2 className="font-bubble text-4xl md:text-5xl font-extrabold text-[#8c1240] mt-3 drop-shadow-sm">
          Claim Main Character Status
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-pink-300 via-hotpink-400 to-purple-400 mx-auto rounded-full mt-4" />
        <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm md:text-base font-sans">
          Lock in your pampering slot. Select your aesthetic designer and get ready to be absolutely spoiled!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          <motion.div
            key="booking-form-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            {/* Contact Information & Hours (4 Cols) */}
            <div className="lg:col-span-4 space-y-8 flex flex-col justify-between">
              <div className="y2k-panel p-8 rounded-3xl rhinestone-border bg-white shadow-lg space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-pink-150">
                  <Smartphone className="text-hotpink-600 animate-bounce" size={20} />
                  <h3 className="font-bubble text-lg font-bold text-[#8c1240]">
                    Diva Hotline
                  </h3>
                </div>

                <div className="space-y-4 text-sm font-sans text-gray-600">
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-hotpink-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-y2k font-bold text-xs uppercase tracking-wider text-hotpink-700">Telephone:</p>
                      <p className="font-mono text-[#8c1240] font-bold">(555) 247-8193</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-[#f06595] mt-1 shrink-0" />
                    <div>
                      <p className="font-y2k font-bold text-xs uppercase tracking-wider text-hotpink-700">Email:</p>
                      <p className="font-mono text-[#8c1240] font-bold">hello@pinkvelvetnails.example</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-purple-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-y2k font-bold text-xs uppercase tracking-wider text-hotpink-700">Beverly Hills Salon:</p>
                      <p className="leading-relaxed font-semibold text-gray-800">
                        123 Glamour Lane, Suite 204<br />
                        Beverly Hills, CA 90210
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Notice badge */}
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-[11px] leading-relaxed text-purple-700">
                  💖 <span className="font-bold">Demonstration Only:</span> Pink Velvet Nails is a fictional nail boutique concept. All contact details and address references are conceptual proxies.
                </div>
              </div>

              {/* Fictional Hours Card */}
              <div className="y2k-panel p-8 rounded-3xl border-2 border-pink-100 bg-white space-y-5">
                <h4 className="font-bubble text-md font-bold text-hotpink-600">
                  💅 Studio Hours
                </h4>
                <div className="space-y-2 text-xs font-mono font-medium text-gray-500">
                  <div className="flex justify-between border-b border-pink-50 pb-1">
                    <span>Monday–Friday</span>
                    <span className="text-[#8c1240] font-bold">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-pink-50 pb-1">
                    <span>Saturday</span>
                    <span className="text-[#8c1240] font-bold">09:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>Sunday (Princess Day)</span>
                    <span className="text-hotpink-500 font-extrabold">11:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Request Form (8 Cols) */}
            <div className="lg:col-span-8 y2k-panel p-8 md:p-10 rounded-3xl bg-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-hotpink-500 via-pink-400 to-purple-400" />
              
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* Step 1: Personal Coordinates */}
                <div className="space-y-4">
                  <h3 className="font-bubble text-lg font-bold text-hotpink-600 flex items-center gap-1.5 border-b border-pink-100 pb-2">
                    <span className="bg-hotpink-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center font-extrabold text-[10px]">1</span>
                    Your Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">Diva Name:</label>
                      <input
                        type="text"
                        required
                        placeholder="Elle Woods"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs rounded-xl py-2.5 px-4 border border-pink-100 bg-pink-50/20 text-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-hotpink-300 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">Phone Number:</label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 247-8193"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs rounded-xl py-2.5 px-4 border border-pink-100 bg-pink-50/20 text-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-hotpink-300 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">Diva Email Address:</label>
                      <input
                        type="email"
                        required
                        placeholder="elle@bruins.example"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs rounded-xl py-2.5 px-4 border border-pink-100 bg-pink-50/20 text-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-hotpink-300 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Styling Set Menu */}
                <div className="space-y-4">
                  <h3 className="font-bubble text-lg font-bold text-hotpink-600 flex items-center gap-1.5 border-b border-pink-100 pb-2">
                    <span className="bg-hotpink-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center font-extrabold text-[10px]">2</span>
                    Service menu & Addons
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Base select */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-y2k uppercase tracking-wider text-[#8c1240]">Base Manicure or Pedicure:</label>
                      <div className="space-y-2">
                        {SALON_SERVICES.filter(s => !s.isAddon).map((serv) => (
                          <div
                            key={serv.id}
                            id={`book-serv-${serv.id}`}
                            onClick={() => setServiceId(serv.id)}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                              serviceId === serv.id
                                ? 'bg-hotpink-50/70 border-hotpink-400 font-bold'
                                : 'bg-white border-pink-50 hover:bg-pink-50/20'
                            }`}
                          >
                            <span className="text-xs text-gray-700">{serv.name}</span>
                            <span className="text-xs font-extrabold text-hotpink-600">${serv.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Addons checkbox cards */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-y2k uppercase tracking-wider text-[#8c1240]">Optional Bling Add-ons:</label>
                      <div className="grid grid-cols-1 gap-2">
                        {SALON_SERVICES.filter(s => s.isAddon).map((add) => {
                          const isSel = selectedAddons.includes(add.id);
                          return (
                            <div
                              key={add.id}
                              id={`book-addon-${add.id}`}
                              onClick={() => handleAddonToggle(add.id)}
                              className={`p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                                isSel 
                                  ? 'bg-purple-100/40 border-purple-300 font-bold' 
                                  : 'bg-white border-pink-50 hover:bg-pink-50/10'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                  isSel ? 'bg-purple-500 border-purple-500 text-white' : 'border-pink-200'
                                }`}>
                                  {isSel && <span className="text-[10px] font-bold">✓</span>}
                                </div>
                                <span className="text-xs text-gray-700">{add.name}</span>
                              </div>
                              <span className="text-xs font-bold text-purple-600">+${add.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Artist selectors */}
                <div className="space-y-4">
                  <h3 className="font-bubble text-lg font-bold text-hotpink-600 flex items-center gap-1.5 border-b border-pink-100 pb-2">
                    <span className="bg-hotpink-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center font-extrabold text-[10px]">3</span>
                    Choose Your Creative Designer
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {NAIL_ARTISTS.map((artist) => (
                      <div
                        key={artist.id}
                        id={`book-art-${artist.id}`}
                        onClick={() => {
                          setArtistId(artist.id);
                          setTime(artist.availabilities[0]); // default to first open slot
                        }}
                        className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                          artistId === artist.id
                            ? 'bg-gradient-to-b from-hotpink-50/70 to-pink-100/70 border-hotpink-400 shadow-md scale-102'
                            : 'bg-white border-pink-50 hover:border-pink-200'
                        }`}
                      >
                        <div className="w-12 h-12 bg-pink-100 border border-hotpink-200 rounded-full mx-auto mb-2 flex items-center justify-center font-bubble text-md font-bold text-hotpink-600">
                          {artist.name[0]}
                        </div>
                        <h4 className="font-bubble text-sm font-bold text-[#8c1240]">
                          {artist.name}
                        </h4>
                        <p className="text-[9px] uppercase font-mono font-bold tracking-tight text-gray-400 mt-1">
                          {artist.vibe}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Picked artist bio blurb */}
                  <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 flex items-center gap-3">
                    <User size={24} className="text-hotpink-400" />
                    <div>
                      <p className="text-xs text-gray-600 italic">
                        " {artistObj.bio} "
                      </p>
                      <p className="text-[10px] font-y2k font-bold text-hotpink-500 uppercase mt-1">
                        Favorite set to design: {artistObj.favoriteDesign}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4: DateTime Picker */}
                <div className="space-y-4">
                  <h3 className="font-bubble text-lg font-bold text-hotpink-600 flex items-center gap-1.5 border-b border-pink-100 pb-2">
                    <span className="bg-hotpink-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center font-extrabold text-[10px]">4</span>
                    Scheduling Calendar
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">Preferred Date:</label>
                      <input
                        type="date"
                        required
                        value={date}
                        min="2026-06-15"
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full text-xs rounded-xl py-2.5 px-4 border border-pink-100 bg-pink-50/20 text-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-hotpink-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">Open Slots on {date}:</label>
                      <div className="grid grid-cols-4 gap-2">
                        {artistObj.availabilities.map((hour) => (
                          <button
                            type="button"
                            key={hour}
                            id={`time-slot-${hour}`}
                            onClick={() => setTime(hour)}
                            className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all text-center ${
                              time === hour
                                ? 'bg-purple-500 border-purple-500 text-white shadow-sm'
                                : 'bg-white border-pink-100 text-[#8c1240] hover:border-pink-300'
                            }`}
                          >
                            {hour}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Notes & Submit */}
                <div className="space-y-4 pt-4 border-t border-dashed border-pink-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-700">Special Sparkle Requests & Length Preferences:</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. I want extra holographic butterflies on my ring fingers and sharp stiletto nails!"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full text-xs rounded-xl py-2.5 px-4 border border-pink-100 bg-pink-50/20 text-gray-750 font-sans focus:outline-none focus:ring-2 focus:ring-hotpink-300 resize-none"
                    />
                  </div>

                  <div className="p-4 bg-hotpink-50 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-y2k tracking-widest text-[#8c1240]/80 uppercase font-bold">Estimated Session cost:</p>
                      <h4 className="font-bubble text-2xl font-extrabold text-hotpink-600">
                        ${totalCostEstimate}
                      </h4>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-10 py-4 btn-glam text-white font-bubble font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Polishing slot...
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} className="animate-pulse" /> Reserve My Main Character Slot
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          /* Simulated Ticket View on Complete */
          <motion.div
            key="booking-success-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-xl mx-auto"
          >
            {/* The Ticket Graphic - stylized like a glossy velvet card with rhinestone beads */}
            <div className="relative y2k-panel p-8 rounded-3xl rhinestone-border bg-white shadow-2xl text-center overflow-hidden">
              {/* Glossy ribbons */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-hotpink-500 via-pink-300 to-purple-400" />
              
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-50 border-2 border-green-400 rounded-full flex items-center justify-center text-green-500 shadow-md">
                  <CheckCircle size={36} />
                </div>
              </div>

              <span className="font-bubble px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold text-[10px] tracking-wider uppercase inline-flex items-center gap-1 shadow-sm">
                Reservation Confirmed
              </span>
              
              <h3 className="font-bubble text-3xl font-extrabold text-[#8c1240] mt-3">
                Your Velvet VIP Ticket
              </h3>

              <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto rounded-full my-4" />

              {/* Fictional alert */}
              <p className="text-[11px] font-semibold text-purple-600 italic bg-purple-50 py-1.5 px-3 rounded-lg max-w-sm mx-auto mb-6">
                🌸 Simulated booking complete! Copy your ticket credentials below.
              </p>

              {/* Ticket Details */}
              <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100 text-left space-y-4">
                <div className="flex justify-between border-b border-pink-100 pb-2">
                  <span className="text-xs font-y2k font-bold text-hotpink-500 uppercase">TICKET NUMBER</span>
                  <span className="text-xs font-mono font-extrabold text-purple-700">{receiptCode}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <p className="font-y2k font-bold text-[11px] text-[#8c1240]/80 uppercase">CLIENT PRINCESS</p>
                    <p className="font-bold text-gray-800">{name || 'Lovely Diva'}</p>
                  </div>
                  <div>
                    <p className="font-y2k font-bold text-[11px] text-[#8c1240]/80 uppercase">STYLING DESIGNER</p>
                    <p className="font-bold text-gray-800">{artistObj.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans pt-2 border-t border-pink-50">
                  <div>
                    <p className="font-y2k font-bold text-[11px] text-[#8c1240]/80 uppercase">APPOINTMENT HOUR</p>
                    <p className="font-bold text-gray-800 flex items-center gap-1">
                      <Clock size={12} className="text-purple-400" /> {time}
                    </p>
                  </div>
                  <div>
                    <p className="font-y2k font-bold text-[11px] text-[#8c1240]/80 uppercase">RESERVED SLOT</p>
                    <p className="font-bold text-gray-800 flex items-center gap-1">
                      <Calendar size={12} className="text-purple-400" /> {date}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-pink-100 text-xs">
                  <p className="font-y2k font-bold text-[11px] text-[#8c1240]/80 uppercase mb-1">STYLING SELECTIONS</p>
                  <p className="font-bold text-gray-800 leading-snug">
                    💅 {selectedBaseService.name} 
                    {selectedAddonObjs.length > 0 && (
                      <span className="text-hotpink-600">
                        {' '} + {selectedAddonObjs.map(a => a.name).join(', ')}
                      </span>
                    )}
                  </p>
                  {specialRequests && (
                    <p className="text-[11px] italic text-gray-500 mt-1">
                      Notes: "{specialRequests}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t-2 border-dashed border-pink-200 text-center">
                  <p className="text-[10px] font-y2k tracking-widest text-[#8c1240]/80 uppercase font-bold">VIP CO-STYLING ESTIMATE</p>
                  <p className="font-bubble text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-hotpink-600 to-purple-600">
                    ${totalCostEstimate}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 text-xs text-center text-gray-500 leading-relaxed font-sans max-w-sm mx-auto">
                Please arrive 5 minutes early to adjust your rhinestones. Call us on our Diva hotline at <strong className="text-hotpink-600">(555) 247-8193</strong> with questions.
              </div>

              {/* Reset CTA */}
              <button
                id="reset-booking-btn"
                onClick={handleReset}
                className="mt-8 btn-silver py-2 px-6 rounded-xl text-xs uppercase tracking-wider font-bold transition-transform hover:scale-105 cursor-pointer select-none font-bubble"
              >
                Schedule Another Set
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
