import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Filter, ExternalLink, Camera } from 'lucide-react';
import { GalleryItem } from '../types';

// Let's import the actual generated images. We can define our list.
export const GALLERY_ITEMS: (GalleryItem & { initialLikes: number })[] = [
  {
    id: 'gal-chrome',
    title: 'Liquid Pink Chrome',
    category: 'Chrome',
    image: '/src/assets/images/pink_chrome_nails_1781476906413.jpg',
    tags: ['Chrome Finish', 'Y2K Swirls', '3D Metal'],
    description: 'Ultra-glossy hot pink base styled with futuristic 3D silver metallic drips and liquid chrome curves.',
    initialLikes: 204
  },
  {
    id: 'gal-french',
    title: 'Elle Woods Hot Pink French',
    category: 'French',
    image: '/src/assets/images/rhinestone_french_tips_1781476918577.jpg',
    tags: ['French Tips', 'Glitter Accent', 'Square Cut'],
    description: 'Vibrant hot pink french tips embedded with luxury Swarovski crystals and silver lining outlines.',
    initialLikes: 187
  },
  {
    id: 'gal-butterfly',
    title: 'Dreamy Lavender Butterflies',
    category: 'Butterfly',
    image: '/src/assets/images/butterfly_nails_1781476930855.jpg',
    tags: ['Butterfly Art', 'Lavender Ombre', 'Sparkles'],
    description: 'Hand-painted holographic butterflies set against a soft baby pink and purple gel gradient topcoat.',
    initialLikes: 352
  },
  {
    id: 'gal-airbrush',
    title: 'Y2K Starburst Airbrush',
    category: 'Airbrush',
    image: '/src/assets/images/airbrushed_star_nails_1781476947563.jpg',
    tags: ['Airbrushed', 'Star motif', 'Pastel Aura'],
    description: 'Throwback airbrushed neon core stars on soft pastel gradient coffin nails, 2004 rave nostalgia.',
    initialLikes: 412
  },
  {
    id: 'gal-rhinestone',
    title: 'Diamond Velvet Solitaire',
    category: 'Glitter',
    image: '/src/assets/images/glitter_acrylic_nails_1781476959173.jpg',
    tags: ['Rhinestones', 'Glitter Base', 'Heart Charms'],
    description: 'Long thick-shattered hot pink glitter acrylics completely armored with crystals and tiny chrome hearts.',
    initialLikes: 589
  },
  {
    id: 'gal-glitter-sets',
    title: 'Bling-Bling Disco Acrylics',
    category: 'Glitter',
    // We can reuse the gorgeous glitter set with a different caption to represent "Glitter Acrylics"
    image: '/src/assets/images/glitter_acrylic_nails_1781476959173.jpg',
    tags: ['Glitter Acrylics', '3D Gems', 'Paris Hilton Vibe'],
    description: 'Luxurious reflective premium pink core glitter powder acrylics optimized for intense dancefloor strobe shining.',
    initialLikes: 247
  }
];

export default function NailGallery() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [likes, setLikes] = useState<Record<string, number>>(
    GALLERY_ITEMS.reduce((acc, current) => ({ ...acc, [current.id]: current.initialLikes }), {})
  );
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filters = ['All', 'Chrome', 'French', 'Butterfly', 'Airbrush', 'Glitter'];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal trigger
    if (hasLiked[id]) {
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasLiked(prev => ({ ...prev, [id]: true }));
    }
  };

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto" id="gallery-section">
      {/* Page header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-pink-150 blur-2xl opacity-60 rounded-full" />
        <span className="font-bubble px-4 py-1.5 rounded-full bg-purple-100/75 border border-purple-200/80 text-purple-600 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm">
          <Camera size={12} className="animate-spin" /> Virtual Lookbook <Camera size={12} className="animate-spin" />
        </span>
        <h2 className="font-bubble text-4xl md:text-5xl font-extrabold text-[#8c1240] mt-3 drop-shadow-sm">
          The Pink Velvet Portfolio
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-300 via-hotpink-400 to-pink-300 mx-auto rounded-full mt-4" />
        <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm md:text-base">
          Behold, our hall of fame. Every manicure is crafted by hand by our visual therapists. Filter by vibe to discover your future signature design!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center pb-8 border-b border-pink-100 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            id={`filter-btn-${filter}`}
            onClick={() => setSelectedFilter(filter)}
            className={`px-5 py-2 rounded-full font-y2k text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
              selectedFilter === filter
                ? 'bg-[#ff2982] text-white shadow-md scale-105 border border-hotpink-400 font-bubble'
                : 'bg-white text-hotpink-600 border border-pink-100 hover:border-hotpink-300'
            }`}
          >
            {filter === 'All' ? '💖 View All' : filter}
          </button>
        ))}
      </div>

      {/* Polaroid Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const liked = hasLiked[item.id];
            return (
              <motion.div
                key={item.id}
                id={`gallery-item-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveItem(item)}
                className="bg-white p-5 pb-8 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 cursor-pointer relative group flex flex-col justify-between"
                style={{
                  transform: `rotate(${(index % 2 === 0 ? 1.5 : -1.5) * (index % 3 === 0 ? 0.7 : 1.2)}deg)`
                }}
              >
                {/* Polaroid glossy image frame */}
                <div className="overflow-hidden relative bg-pink-50 rounded-xs aspect-square border-2 border-pink-100/50">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"
                  />
                  
                  {/* Decorative Sparkle Spark */}
                  <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-xs px-2 py-1 rounded-full text-[10px] font-y2k font-bold text-hotpink-600 flex items-center gap-1">
                    <Sparkles size={8} className="animate-spin text-hotpink-400" />
                    {item.category}
                  </div>

                  {/* Heart sticker liked counter overlay on mobile/hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bubble text-xs uppercase tracking-widest font-bold bg-hotpink-500/90 py-2 px-4 rounded-xl border border-white flex items-center gap-1.5 shadow-md">
                      <Camera size={14} /> Flip Preview
                    </span>
                  </div>
                </div>

                {/* Polaroid Text Area */}
                <div className="mt-5 text-center font-bubble">
                  {/* Heart Like button styled as glitter sticky seal */}
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs uppercase tracking-widest font-y2k text-pink-400 font-bold">
                      PVN PORTAL
                    </span>
                    <button
                      id={`like-btn-${item.id}`}
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-pink-55/70 hover:bg-hotpink-100/60 transition-colors cursor-pointer group/like"
                    >
                      <Heart
                        size={15}
                        fill={liked ? '#ff2982' : 'none'}
                        className={`transition-transform duration-300 ${
                          liked ? 'text-[#ff2982] scale-125' : 'text-pink-400 group-hover/like:scale-110'
                        }`}
                      />
                      <span className="text-xs font-y2k font-bold text-[#8c1240]">
                        {likes[item.id]}
                      </span>
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-hotpink-600 tracking-tight leading-snug hover:text-hotpink-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 font-sans text-xs mt-2 line-clamp-2 px-1">
                    {item.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1 justify-center">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-y2k tracking-wider font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100"
                      >
                        #{tag.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Polaroid Detailed modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-lg bg-white p-6 rounded-sm shadow-2xl border border-pink-100 flex flex-col"
            >
              <div className="aspect-square w-full rounded-xs overflow-hidden relative border-2 border-pink-100">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Close Button as starburst sticker */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-3 right-3 bg-white hover:bg-hotpink-100 border border-hotpink-300 text-[#8c1240] h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-transform hover:scale-110 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 text-center font-bubble">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Heart size={16} fill="#ff2982" className="text-hotpink-500" />
                  <span className="text-xs uppercase tracking-widest text-[#8c1240] font-bold font-y2k">
                    Active Nail Set Showcase
                  </span>
                </div>
                
                <h3 className="text-2xl font-extrabold text-[#8c1240]">
                  {activeItem.title}
                </h3>
                
                <p className="text-gray-600 font-sans text-sm mt-3 leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-pink-100 flex justify-center gap-2">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-bold text-hotpink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveItem(null)}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-hotpink-500 to-purple-500 text-white font-bubble text-xs uppercase tracking-wider font-bold rounded-xl hover:opacity-95 shadow-md cursor-pointer inline-flex items-center gap-1 items-stretch"
                >
                  Gorgeous! Close Lookbook
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
