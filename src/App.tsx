/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Heart, HelpCircle, Phone, MapPin, Mail, 
  Instagram, Music, Play, Pause, ChevronLeft, ChevronRight, 
  Star, Calendar, ListCollapse, MessageSquareHeart, Grid3X3, X
} from 'lucide-react';

// Modular Y2K Sub-components
import GlitterCursor from './components/GlitterCursor';
import SparkleOverlay from './components/SparkleOverlay';
import WelcomeScreen from './components/WelcomeScreen';
import NailServices, { SALON_SERVICES } from './components/NailServices';
import NailGallery, { GALLERY_ITEMS } from './components/NailGallery';
import NailReviews, { INITIAL_REVIEWS } from './components/NailReviews';
import NailBooking from './components/NailBooking';
import FAQSection from './components/FAQSection';
import { PageId } from './types';

// Web Soundtrack simulation
const SOUNDTRACK_ALBUMS = [
  { title: "Toxic (Glitter Mix)", artist: "Britney S.", length: "2:04" },
  { title: "Stars Are Blind", artist: "Paris H.", length: "3:52" },
  { title: "Glamorous (Nail Polish)", artist: "Fergie", length: "4:12" },
  { title: "Rich Girl Pink", artist: "Gwen S.", length: "1:87" }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PageId>('home');
  
  // Custom states for booking presets
  const [presetServiceId, setPresetServiceId] = useState<string>('classic-mani');
  const [presetAddons, setPresetAddons] = useState<string[]>([]);
  
  // Rotating Slide Index
  const [activeSlide, setActiveSlide] = useState(0);
  const slideshowImages = [
    {
      title: "Barbie Mirror Chrome Set",
      subtitle: "Mirrored space-pink metallic tips topped with custom 3D decals.",
      img: "/src/assets/images/pink_chrome_nails_1781476906413.jpg"
    },
    {
      title: "Beverly Hills French",
      subtitle: "The ultimate 2004 classic square tips outlined in silver diamond glitz.",
      img: "/src/assets/images/rhinestone_french_tips_1781476918577.jpg"
    },
    {
      title: "Glittery Butterfly Dreams",
      subtitle: "3D butterflies and baby pink chrome stars painted over soft lavender gel.",
      img: "/src/assets/images/butterfly_nails_1781476930855.jpg"
    },
    {
      title: "Cosmic Starburst Airbrush",
      subtitle: "Juicy airbrushed star overlays combined with ultra-slick topcoat glass shine.",
      img: "/src/assets/images/airbrushed_star_nails_1781476947563.jpg"
    },
    {
      title: "Swarovski Diamond Armor",
      subtitle: "Thick premium glitter acrylic bases armored with heavy rhinestones and charms.",
      img: "/src/assets/images/glitter_acrylic_nails_1781476959173.jpg"
    }
  ];

  // Simulated retro iPod Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showIpod, setShowIpod] = useState(false);

  // Auto rotate banner carousel
  useEffect(() => {
    if (activeTab !== 'home') return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeTab, slideshowImages.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const handleSelectServiceFromQuote = (serviceId: string, addons: string[]) => {
    setPresetServiceId(serviceId);
    setPresetAddons(addons);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTrack = SOUNDTRACK_ALBUMS[currentTrackIndex];

  return (
    <div className="min-h-screen bg-[#ffb6c1] bg-[radial-gradient(rgba(255,255,255,0.45)_1.5px,transparent_1.5px)] bg-[size:18px_18px] relative text-[#5a0b2c] flex flex-col justify-between">
      {/* Glitz mouse cursors and overlays */}
      <GlitterCursor />
      <SparkleOverlay />

      {/* Loading gate screen */}
      <WelcomeScreen onFinished={() => setLoading(false)} />

      {/* Main Container */}
      {!loading && (
        <div className="flex-1 flex flex-col justify-between">
          
          {/* TOP MARQUEE TICKER TAPE */}
          <div className="bg-gradient-to-r from-hotpink-600 via-pink-500 to-purple-600 text-white font-mono text-xs tracking-widest py-1.5 overflow-hidden whitespace-nowrap shadow-sm border-b border-hotpink-400 select-none z-30">
            <div className="flex animate-marquee">
              <span className="mx-4">💅 SPARKLE WITH CONFIDENCE 💅</span>
              <span className="mx-4">⚡ SERVING MAIN CHARACTER ENERGY SINCE 2004 ⚡</span>
              <span className="mx-4">💎 GENUINE SWAROVSKI CRYSTALS 💎</span>
              <span className="mx-4">🌸 CHROME FRENCH TIPS & ACRYLICS 🌸</span>
              <span className="mx-4">💄 JUICY COUTURE INSPIRED 💄</span>
              <span className="mx-4">🦋 BEST STYLISTS IN BEVERLY HILLS 🦋</span>
              
              {/* Duplicate for seamless infinite scroll */}
              <span className="mx-4">💅 SPARKLE WITH CONFIDENCE 💅</span>
              <span className="mx-4">⚡ SERVING MAIN CHARACTER ENERGY SINCE 2004 ⚡</span>
              <span className="mx-4">💎 GENUINE SWAROVSKI CRYSTALS 💎</span>
              <span className="mx-4">🌸 CHROME FRENCH TIPS & ACRYLICS 🌸</span>
              <span className="mx-4">💄 JUICY COUTURE INSPIRED 💄</span>
              <span className="mx-4">🦋 BEST STYLISTS IN BEVERLY HILLS 🦋</span>
            </div>
          </div>

          {/* GLAM HEADER */}
          <header className="sticky top-0 bg-white/70 backdrop-blur-md border-b-4 border-[#ff69b4] py-4 px-6 z-40 shadow-sm" id="main-header">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Brand Logo with rhinestone style crown */}
              <div 
                onClick={() => setActiveTab('home')} 
                className="flex items-center gap-2.5 cursor-pointer group active:scale-95 transition-transform"
              >
                <span className="text-4xl animate-bounce">🦋</span>
                
                <div>
                  <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-[#FF1493] leading-none" style={{ fontFamily: "'Brush Script MT', 'Comfortaa', cursive" }}>
                    Pink Velvet Nails
                  </h1>
                  <span className="font-y2k text-[10px] font-extrabold tracking-widest text-[#5a0b2c] uppercase">
                    💎 BEVERLY HILLS LUXURY STUDIO 💎
                  </span>
                </div>
              </div>

              {/* Juicy Retro Tab Menu Links */}
              <nav className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 bg-white/80 p-1.5 rounded-full border-2 border-[#ff69b4]/50 shadow-inner">
                {(['home', 'services', 'gallery', 'reviews', 'book', 'faq'] as PageId[]).map((tab) => {
                  const isActive = activeTab === tab;
                  
                  // Label mapper
                  let label = 'Home';
                  let tabIcon = <Sparkles size={13} />;
                  if (tab === 'services') { label = 'Services'; tabIcon = <ListCollapse size={13} />; }
                  if (tab === 'gallery') { label = 'Lookbook'; tabIcon = <Grid3X3 size={13} />; }
                  if (tab === 'reviews') { label = 'Diary Reviews'; tabIcon = <MessageSquareHeart size={13} />; }
                  if (tab === 'book') { label = 'Reserve VIP'; tabIcon = <Calendar size={13} />; }
                  if (tab === 'faq') { label = 'FAQ'; tabIcon = <HelpCircle size={13} />; }

                  return (
                    <button
                      key={tab}
                      id={`nav-tab-${tab}`}
                      onClick={() => {
                        setActiveTab(tab);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3 md:px-4 py-2 rounded-full font-bubble text-xs tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#FF1493] to-[#FF69B4] text-white font-bold border border-[#FF69B4] shadow-md scale-102' 
                          : 'text-[#5a0b2c] hover:bg-[#ffd1dc]/55 hover:text-[#ff1493] font-semibold'
                      }`}
                    >
                      {tabIcon}
                      {label}
                    </button>
                  );
                })}
              </nav>

              {/* Soundtrack Quick Controller */}
              <div className="flex items-center gap-2">
                <button
                  id="music-box-trigger"
                  onClick={() => setShowIpod(!showIpod)}
                  className={`p-2.5 rounded-full border-2 cursor-pointer select-none transition-transform active:scale-95 ${
                    showIpod 
                      ? 'bg-[#ff1493] text-white border-[#ff69b4]' 
                      : 'bg-white hover:bg-[#ffd1dc]/40 border-pink-200 text-[#ff1493]'
                  }`}
                  title="Y2K iPod Sound Track"
                >
                  <Music size={16} className={isPlaying ? "animate-spin" : ""} />
                </button>

                <button
                  id="quick-book-direct"
                  onClick={() => {
                    setActiveTab('book');
                    window.scrollTo({ top: 0, behavior: 'auto' });
                  }}
                  className="bg-gradient-to-r from-[#FF1493] to-[#ff69b4] text-white text-xs font-black font-bubble uppercase tracking-wider py-2.5 px-5 rounded-full shadow-[0_0_12px_rgba(255,20,147,0.4)] hover:scale-105 active:scale-98 transition-transform border-2 border-white cursor-pointer"
                >
                  Book Appointment ✨
                </button>
              </div>
            </div>
          </header>

          {/* NOSTALGIC RETRO IPOD WIDGET OVERLAY */}
          <AnimatePresence>
            {showIpod && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-64 bg-slate-100 rounded-3xl p-4 shadow-2xl border-4 border-zinc-300 text-[#1e293b] select-none flex flex-col items-center relative"
                id="retro-ipod-player"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowIpod(false)}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ff1493] text-white flex items-center justify-center border-2 border-white shadow-md hover:scale-110 active:scale-95 cursor-pointer transition-transform z-50"
                  title="Close iPod"
                >
                  <X size={14} strokeWidth={3} />
                </button>

                {/* Screen */}
                <div className="w-full bg-[#cdf0cd] rounded-xl border-3 border-zinc-400 p-3 h-24 flex flex-col justify-between font-mono text-zinc-800 shadow-inner">
                  <div className="flex justify-between text-[10px] uppercase font-bold border-b border-zinc-600/30 pb-0.5">
                    <span>IPod Mini</span>
                    <span>11:24 PM</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center py-1 overflow-hidden">
                    <p className="text-[11px] font-bold tracking-tight text-ellipsis whitespace-nowrap overflow-hidden">
                      🎵 {currentTrack.title}
                    </p>
                    <p className="text-[9px] text-zinc-600 mt-0.5">
                      Artist: {currentTrack.artist} ({currentTrack.length})
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-zinc-600/30">
                    <span>{isPlaying ? "[ PLAYING ]" : "[ PAUSED ]"}</span>
                    {/* Simulated visual equalizer bars */}
                    <div className="flex gap-0.5 items-end h-2.5 mb-0.5">
                      <span className={`w-1 bg-zinc-800 transition-all ${isPlaying ? 'animate-[bounce_0.6s_infinite]' : 'h-1'}`} />
                      <span className={`w-1 bg-zinc-800 transition-all ${isPlaying ? 'animate-[bounce_0.8s_infinite]' : 'h-1.5'}`} style={{ animationDelay: '0.2s' }} />
                      <span className={`w-1 bg-zinc-800 transition-all ${isPlaying ? 'animate-[bounce_0.5s_infinite]' : 'h-0.5'}`} style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>

                {/* Classic Scroll Wheel */}
                <div className="w-28 h-28 rounded-full bg-white border-2 border-zinc-200 mt-4 relative flex items-center justify-center shadow-inner">
                  {/* Wheel labels */}
                  <span className="absolute top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Menu</span>
                  <button 
                    onClick={() => {
                      setCurrentTrackIndex(prev => (prev - 1 + SOUNDTRACK_ALBUMS.length) % SOUNDTRACK_ALBUMS.length);
                      setIsPlaying(true);
                    }}
                    className="absolute left-2 text-gray-400 hover:text-black hover:scale-115 transition-transform"
                  >
                    ⏮
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentTrackIndex(prev => (prev + 1) % SOUNDTRACK_ALBUMS.length);
                      setIsPlaying(true);
                    }}
                    className="absolute right-2 text-gray-400 hover:text-black hover:scale-115 transition-transform"
                  >
                    ⏭
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute bottom-2 text-gray-400 hover:text-black scale-90"
                  >
                    {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                  </button>

                  {/* Metal Middle button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-zinc-300 hover:bg-zinc-400 border border-zinc-400 shadow flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <div className="w-4 h-4 rounded-full bg-white/40" />
                  </button>
                </div>

                <p className="text-[9px] text-gray-400 mt-3 italic">
                  *Click center key to toggle virtual beats
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DYNAMIC VIEW ROUTER */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              
              {/* HOME TABS */}
              {activeTab === 'home' && (
                <motion.div
                  key="home-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* HERO SPLASH BANNER */}
                  <section className="relative overflow-hidden py-16 md:py-24 px-6 text-center max-w-7xl mx-auto flex flex-col items-center">
                    {/* Glowing orb backdrop */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-hotpink-200/50 via-pink-100/30 to-transparent blur-3xl -z-10" />

                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6 max-w-3xl"
                    >
                      {/* Subtitle tag */}
                      <span className="font-bubble px-4 py-1.5 rounded-full bg-hotpink-100/70 border border-hotpink-250/50 text-hotpink-600 font-bold text-xs tracking-widest uppercase inline-flex items-center gap-1.5 shadow-sm">
                        👸 Est. 2004 👸
                      </span>

                      {/* Major Slogan */}
                      <h2 className="font-bubble text-5xl md:text-7xl font-extrabold text-[#8c1240] leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-hotpink-600 to-purple-800 drop-shadow-sm px-2">
                        "Serving Main Character Energy Since 2004."
                      </h2>

                      {/* Welcome message text */}
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans leading-relaxed">
                        At <strong className="text-hotpink-600">Pink Velvet Nails</strong>, we believe every manicure should make you feel like the prettiest version of yourself. Whether you're getting ready for prom, girls' night, or just because, we've got the perfect set waiting for you.
                      </p>

                      {/* Interactive visual button anchors */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                          id="hero-book-btn"
                          onClick={() => {
                            setActiveTab('book');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full sm:w-auto btn-glam text-white py-4 px-8 rounded-full font-bubble text-xs uppercase tracking-widest font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Calendar size={15} /> Book Your Appointment
                        </button>

                        <button
                          id="hero-services-btn"
                          onClick={() => {
                            setActiveTab('services');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full sm:w-auto bg-white hover:bg-hotpink-50/50 transition-all py-4 px-8 rounded-full font-bubble text-xs uppercase tracking-widest font-bold border border-pink-200 text-hotpink-600 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          View Our Services
                        </button>
                      </div>
                    </motion.div>
                  </section>

                  {/* HIGH-FASHION ROTATING SLIDER CAROUSEL */}
                  <section className="py-12 bg-white/50 border-t border-b border-pink-100" id="rotating-banner-carousel">
                    <div className="max-w-5xl mx-auto px-4">
                      <div className="text-center mb-6">
                        <h3 className="font-bubble text-lg md:text-xl font-bold text-[#8c1240]/90 flex items-center justify-center gap-1.5 uppercase tracking-widest">
                          ✨ Trending Nail sets ✨
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-y2k font-bold">
                          Fresh Off The Manicure Desk
                        </p>
                      </div>

                      {/* Active slide layout */}
                      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white rhinestone-border group">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full relative"
                          >
                            <img
                              src={slideshowImages[activeSlide].img}
                              alt={slideshowImages[activeSlide].title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Dark gloss gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                            {/* Caption specs */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 font-bubble text-white">
                              <span className="text-[10px] font-y2k tracking-widest text-pink-300 font-extrabold uppercase bg-hotpink-600/90 py-1 px-3 rounded-full border border-pink-300 inline-block mb-3">
                                IN-STUDIO ART
                              </span>
                              <h4 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-hotpink-200">
                                {slideshowImages[activeSlide].title}
                              </h4>
                              <p className="text-xs md:text-sm font-sans font-medium text-pink-50/90 mt-2 max-w-xl">
                                {slideshowImages[activeSlide].subtitle}
                              </p>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Slide Navigation Manual Arrows */}
                        <button
                          id="btn-prev-slide"
                          onClick={handlePrevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 hover:bg-white text-hotpink-600 rounded-full flex items-center justify-center border border-pink-200 transition-transform hover:scale-108 cursor-pointer select-none"
                        >
                          <ChevronLeft size={18} strokeWidth={3} />
                        </button>
                        <button
                          id="btn-next-slide"
                          onClick={handleNextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 hover:bg-white text-hotpink-600 rounded-full flex items-center justify-center border border-pink-200 transition-transform hover:scale-108 cursor-pointer select-none"
                        >
                          <ChevronRight size={18} strokeWidth={3} />
                        </button>

                        {/* Slider Dot Indicators */}
                        <div className="absolute top-4 right-4 flex gap-1 bg-black/40 px-3 py-1 bg-backdrop/20 backdrop-blur-xs rounded-full">
                          {slideshowImages.map((_, i) => (
                            <button
                              key={i}
                              id={`slide-dot-${i}`}
                              onClick={() => setActiveSlide(i)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                activeSlide === i ? 'bg-hotpink-500 w-4' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* THE BOUTIQUE DIARY STICKERS & HELLO RETRO GRID */}
                  <section className="py-16 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                      <div className="space-y-6">
                        <span className="font-bubble px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-bold text-xs uppercase tracking-wider">
                          💎 Only The Best 💎
                        </span>
                        <h3 className="font-bubble text-3xl md:text-4xl font-extrabold text-[#8c1240]">
                          Glossy Tips, Metallic Silvers & Pure Princess Treatment.
                        </h3>
                        <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed">
                          Pink Velvet Nails isn't just a basic manicure lounge—it's a lifestyle. Inspired by the golden age of rhinestone-studded flip phones, sweet-smelling strawberry lip glosses, and hot-pink tracksuits, we design our studio of services to make every guest sparkle like a pop diva on tour.
                        </p>

                        <div className="space-y-3 font-bubble text-sm text-hotpink-700/95 font-bold">
                          <div className="flex items-center gap-2">
                            <Heart size={14} fill="#ff2982" className="text-hotpink-500 animate-pulse" />
                            <span>100% Certified Chip-Free Gel & Fine Acrylic bases</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart size={14} fill="#ff2982" className="text-hotpink-500 animate-pulse" />
                            <span>Custom Handpainted butterfly art & Y2K designs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart size={14} fill="#ff2982" className="text-hotpink-500 animate-pulse" />
                            <span>Genuine Swarovski rhinestones & silver chrome trims</span>
                          </div>
                        </div>

                        <button
                          id="about-cta-btn"
                          onClick={() => {
                            setActiveTab('services');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="btn-silver font-bubble text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl cursor-pointer inline-flex items-center gap-2 animate-bounce mt-4"
                        >
                          <ListCollapse size={14} /> Calculate Your Custom Dream Set
                        </button>
                      </div>

                      {/* Polaroid stacked fan layout mockup */}
                      <div className="relative h-96 flex items-center justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-pink-300 to-[#ff2982] rounded-full blur-3xl opacity-30 -z-10" />

                        {/* Polaroid overlay cards */}
                        <motion.div
                          animate={{ rotate: -8, y: -20, x: -30 }}
                          className="absolute w-56 p-3 bg-white shadow-xl rounded-sm border border-pink-100"
                        >
                          <img
                            src="/src/assets/images/butterfly_nails_1781476930855.jpg"
                            alt="Butterfly Accent"
                            className="w-full aspect-square object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <p className="font-bubble text-[#8c1240] text-center font-bold text-xs mt-3">
                            Butterfly Decals 🦋
                          </p>
                        </motion.div>

                        <motion.div
                          animate={{ rotate: 10, y: 15, x: 25 }}
                          className="absolute w-56 p-3 bg-white shadow-2xl rounded-sm border border-pink-100 z-10"
                        >
                          <img
                            src="/src/assets/images/pink_chrome_nails_1781476906413.jpg"
                            alt="Mirror Chrome Accent"
                            className="w-full aspect-square object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <p className="font-bubble text-[#8c1240] text-center font-bold text-xs mt-3">
                            3D Silver Metallics 💿
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </section>

                  {/* INSTAGRAM GRID PREVIEW SECTION */}
                  <section className="py-16 bg-[#fff2f7] border-t border-b border-pink-150">
                    <div className="max-w-7xl mx-auto px-4">
                      <div className="text-center mb-12">
                        <span className="text-xs font-y2k font-bold tracking-widest text-[#8c1240] uppercase flex justify-center items-center gap-1">
                          <Instagram size={14} /> @PinkVelvetNailsBeverlyHills
                        </span>
                        <h3 className="font-bubble text-3xl font-extrabold text-[#8c1240] mt-2">
                          Featured on the Feed
                        </h3>
                        <p className="text-gray-500 text-xs mt-1 italic font-sans">
                          Double tap to love our latest updates & manicure designs!
                        </p>
                      </div>

                      {/* Mock Instagram Feed Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {GALLERY_ITEMS.slice(0, 4).map((post) => (
                          <div
                            key={post.id}
                            id={`insta-post-${post.id}`}
                            className="bg-white rounded-2xl overflow-hidden shadow border border-pink-100 hover:shadow-lg transition-all duration-300 relative group cursor-pointer"
                          >
                            <img
                              src={post.image}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className="w-full aspect-square object-cover"
                            />
                            {/* Inst overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white font-bubble text-xs">
                              <span className="text-right text-[10px] font-mono">💖 1.2k likes</span>
                              <div>
                                <p className="font-bold">{post.title}</p>
                                <p className="text-[10px] font-sans font-medium text-pink-100 mt-1">#pinkvelvet #beverlyhills</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {/* SERVICES PAGE TAB */}
              {activeTab === 'services' && (
                <motion.div
                  key="services-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NailServices onSelectServiceForBooking={handleSelectServiceFromQuote} />
                </motion.div>
              )}

              {/* GALLERY LOOKBOOK TAB */}
              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NailGallery />
                </motion.div>
              )}

              {/* REVIEWS COMMENTS TAB */}
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NailReviews />
                </motion.div>
              )}

              {/* LIVE SCHEDULER WIZARD TAB */}
              {activeTab === 'book' && (
                <motion.div
                  key="book-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NailBooking initialServiceId={presetServiceId} initialAddons={presetAddons} />
                </motion.div>
              )}

              {/* FAQ TAB */}
              {activeTab === 'faq' && (
                <motion.div
                  key="faq-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FAQSection />
                </motion.div>
              )}

            </AnimatePresence>
          </main>

          {/* GLAM FOOTER */}
          <footer className="bg-white/80 backdrop-blur-md border-t-4 border-[#ff69b4] py-12 px-6 text-[#5a0b2c] relative z-20" id="main-footer animate-fade-in">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Brand statement (col 1) */}
              <div className="space-y-4 md:col-span-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🦋</span>
                  <h4 className="font-bubble text-2xl font-black italic tracking-tighter text-[#ff1493] leading-none" style={{ fontFamily: "'Brush Script MT', 'Comfortaa', cursive" }}>
                    Pink Velvet Nails
                  </h4>
                </div>

                <p className="text-[#5a0b2c]/80 text-xs font-medium leading-relaxed max-w-sm">
                  We are a luxury, nostalgic, and unapologetically gorgeous salon specialized in giving you that premium starlet treatment inside of Beverly Hills.
                </p>

                {/* Slogan requested: "Because life's too short for boring nails." */}
                <h5 className="font-bubble text-[#ff1493] font-black italic text-sm tracking-wide">
                  "Because life’s too short for boring nails."
                </h5>
              </div>

              {/* Column 2: Navigation link shortcuts */}
              <div className="space-y-3 font-bubble">
                <h4 className="text-xs font-black tracking-widest text-[#ff1493] uppercase">
                  ⭐ Glam Directory ⭐
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span onClick={() => { setActiveTab('home'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-[#5a0b2c] hover:text-[#ff1493] font-semibold cursor-pointer transition-colors">Home Base</span>
                  <span onClick={() => { setActiveTab('services'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-[#5a0b2c] hover:text-[#ff1493] font-semibold cursor-pointer transition-colors">Manicure Pricelist</span>
                  <span onClick={() => { setActiveTab('gallery'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-[#5a0b2c] hover:text-[#ff1493] font-semibold cursor-pointer transition-colors">Designs Lookbook</span>
                  <span onClick={() => { setActiveTab('reviews'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-[#5a0b2c] hover:text-[#ff1493] font-semibold cursor-pointer transition-colors">Diva guestbook</span>
                  <span onClick={() => { setActiveTab('book'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-[#5a0b2c] hover:text-[#ff1493] font-semibold cursor-pointer transition-colors">Reserve VIP slot</span>
                  <span onClick={() => { setActiveTab('faq'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-[#5a0b2c] hover:text-[#ff1493] font-semibold cursor-pointer transition-colors">FAQ Support</span>
                </div>
              </div>

              {/* Column 3: Social handle circles */}
              <div className="space-y-3">
                <h4 className="font-bubble text-xs font-black tracking-widest text-[#ff1493] uppercase">
                  Social Handles
                </h4>
                <div className="flex gap-2.5">
                  <a href="#instagram" className="w-10 h-10 border-2 border-[#ffd1dc] bg-[#ffd1dc]/40 rounded-full flex items-center justify-center text-[#ff1493] hover:bg-[#ff1493] hover:text-white hover:scale-108 transition-all">
                    <Instagram size={16} />
                  </a>
                  <a href="#phone" className="w-10 h-10 border-2 border-[#ffd1dc] bg-[#ffd1dc]/40 rounded-full flex items-center justify-center text-[#ff1493] hover:bg-[#ff1493] hover:text-white hover:scale-108 transition-all">
                    <Phone size={16} />
                  </a>
                  <a href="#mail" className="w-10 h-10 border-2 border-[#ffd1dc] bg-[#ffd1dc]/40 rounded-full flex items-center justify-center text-[#ff1493] hover:bg-[#ff1493] hover:text-white hover:scale-108 transition-all">
                    <Mail size={16} />
                  </a>
                </div>

                <div className="text-[10px] text-[#5a0b2c]/60 font-bold uppercase tracking-wider font-mono">
                  © 2026 PINK VELVET GROUP. ALL FICTIONAL CONTENT. 
                </div>
              </div>

            </div>
          </footer>

        </div>
      )}
    </div>
  );
}
