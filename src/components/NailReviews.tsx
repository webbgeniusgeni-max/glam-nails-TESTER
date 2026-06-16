import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, Heart, Star, Plus } from 'lucide-react';
import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    rating: 5,
    text: "I walked out feeling like Elle Woods. The attention to detail was amazing!",
    author: 'Jessica R.',
    date: 'June 12, 2026',
    avatarLetter: 'J',
    sticker: '👛'
  },
  {
    id: 'rev-2',
    rating: 5,
    text: "The cutest salon ever. The butterfly nail art is unreal.",
    author: 'Kayla M.',
    date: 'June 08, 2026',
    avatarLetter: 'K',
    sticker: '🦋'
  },
  {
    id: 'rev-3',
    rating: 5,
    text: "I've never gotten so many compliments on my nails. Obsessed!",
    author: 'Brianna T.',
    date: 'June 01, 2026',
    avatarLetter: 'B',
    sticker: '💅'
  },
  {
    id: 'rev-4',
    rating: 5,
    text: "The deluxe pedicure was so relaxing and my nails lasted weeks.",
    author: 'Ashley P.',
    date: 'May 28, 2026',
    avatarLetter: 'A',
    sticker: '🌸'
  },
  {
    id: 'rev-5',
    rating: 5,
    text: "The pink Y2K aesthetic alone is worth visiting. Love this place!",
    author: 'Danielle S.',
    date: 'May 19, 2026',
    avatarLetter: 'D',
    sticker: '💄'
  }
];

export default function NailReviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [selectedSticker, setSelectedSticker] = useState('💅');
  const [formOpen, setFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const STICKERS = ['💅', '🦋', '💄', '👛', '🌸', '🍒', '⭐', '🎈', '🍭', '💖'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;

    const review: Review = {
      id: `rev-custom-${Date.now()}`,
      rating: newRating,
      text: newText,
      author: newAuthor,
      date: 'Just now',
      avatarLetter: newAuthor.charAt(0).toUpperCase(),
      sticker: selectedSticker
    };

    setReviews([review, ...reviews]);
    setNewAuthor('');
    setNewText('');
    setNewRating(5);
    setSuccessMsg(true);
    setFormOpen(false);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto animate-fade-in" id="reviews-section">
      {/* Page Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-pink-100 blur-2xl opacity-70 rounded-full" />
        <span className="font-bubble px-4 py-1.5 rounded-full bg-hotpink-100/75 border border-hotpink-200/80 text-hotpink-600 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm">
          <MessageCircle size={12} className="animate-pulse" /> Guest Journal <MessageCircle size={12} className="animate-pulse" />
        </span>
        <h2 className="font-bubble text-4xl md:text-5xl font-extrabold text-[#8c1240] mt-3 drop-shadow-sm">
          Wall of Love & Kisses
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-pink-300 via-hotpink-400 to-purple-400 mx-auto rounded-full mt-4" />
        
        {/* Important Fictional Notice banner */}
        <div className="mt-4 inline-block bg-purple-50 border border-purple-150 rounded-lg py-1 px-4 text-xs font-y2k font-bold text-purple-700 shadow-sm animate-pulse">
          💫 Note: All testimonials below are fictional sample reviews for demonstration purposes.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Reviews Listing Feed (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-pink-150">
            <h3 className="font-bubble text-xl font-bold text-hotpink-600 flex items-center gap-2">
              💌 Guest Comments ({reviews.length})
            </h3>
            <button
              id="write-wall-btn"
              onClick={() => setFormOpen(!formOpen)}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-hotpink-300 text-hotpink-600 bg-white hover:bg-hotpink-50 transition-all flex items-center gap-1 cursor-pointer select-none"
            >
              <Plus size={14} /> Write on Our Wall
            </button>
          </div>

          {/* Success toast inside column */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2 shadow-inner"
              >
                Sparkle! Your guest testimonial has been posted onto our screen. Thank you, diva! 💖💎
              </motion.div>
            )}
          </AnimatePresence>

          {/* Review items */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {reviews.map((rev, index) => (
                <motion.div
                  key={rev.id}
                  id={`review-card-${rev.id}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.1, 0.4) }}
                  className="y2k-panel p-6 rounded-3xl relative hover:shadow-lg hover:border-hotpink-300 transition-all duration-300 flex flex-col md:flex-row gap-4 items-start"
                >
                  {/* Avatar section */}
                  <div className="flex md:flex-col items-center gap-3 md:gap-2 shrink-0">
                    <div className="w-12 h-12 rounded-full border-2 border-hotpink-300 bg-gradient-to-tr from-hotpink-200 to-purple-200 flex items-center justify-center font-bubble font-extrabold text-hotpink-600 text-lg shadow-sm relative">
                      {rev.avatarLetter}
                      {rev.sticker && (
                        <div className="absolute -bottom-2 -right-2 text-md animate-bounce">
                          {rev.sticker}
                        </div>
                      )}
                    </div>
                    <div className="text-left md:text-center">
                      <h4 className="font-mono text-sm font-extrabold text-[#8c1240]">
                        {rev.author}
                      </h4>
                      <p className="text-[10px] font-mono font-medium text-gray-400">
                        {rev.date}
                      </p>
                    </div>
                  </div>

                  {/* Message bubble */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={15} fill="#ff2982" className="text-[#ff2982]" />
                      ))}
                    </div>

                    <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Fictional Stamp tagger */}
                  <span className="absolute top-2 right-4 text-[9px] font-y2k font-bold text-pink-300 tracking-wider">
                    TESTIMONIAL VERIFIED
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Guestbook Wall Form (1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 y2k-panel p-8 rounded-3xl rhinestone-border overflow-hidden bg-white shadow-xl">
            {/* Mirror sheen detail */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-hotpink-400" />
            
            <div className="flex items-center gap-1.5 mb-6">
              <Heart size={20} fill="#ff2982" className="text-hotpink-500 animate-pulse" />
              <h3 className="font-bubble text-lg font-extrabold text-[#8c1240]">
                Write on Our Wall
              </h3>
            </div>

            <p className="text-gray-500 font-sans text-xs leading-relaxed mb-6">
              Did our salon nails make you feel like main character royalty? Scribble down your review below!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-750">
                  Diva Name:
                </label>
                <input
                  type="text"
                  id="guest-name-field"
                  required
                  placeholder="e.g. Sharpay E."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs rounded-xl py-2.5 px-4 border border-pink-100 bg-pink-50/30 text-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-hotpink-300 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-750">
                  Select Your Stamp Sticker:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {STICKERS.map((st) => (
                    <button
                      key={st}
                      type="button"
                      id={`sticker-btn-${st}`}
                      onClick={() => setSelectedSticker(st)}
                      className={`h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                        selectedSticker === st 
                          ? 'border-hotpink-500 bg-hotpink-100 scale-110 shadow-sm' 
                          : 'border-pink-50 bg-pink-50/20 hover:border-pink-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-750">
                  Star Glitter Score:
                </label>
                <div className="flex items-center gap-1 bg-white p-2 rounded-xl border border-pink-100 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      id={`star-btn-${star}`}
                      onClick={() => setNewRating(star)}
                      className="text-pink-300 hover:scale-125 transition-transform"
                    >
                      <Star
                        size={22}
                        fill={star <= newRating ? '#ff2982' : 'none'}
                        className={star <= newRating ? 'text-[#ff2982]' : 'text-pink-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-y2k uppercase tracking-wider text-hotpink-750">
                  Your Manicure Diary entry:
                </label>
                <textarea
                  id="guest-message-field"
                  required
                  rows={3}
                  placeholder="I can't stop staring at my butterflies!"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full text-xs rounded-xl py-2.5 px-4 border border-pink-100 bg-pink-50/30 text-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-hotpink-300 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-glam text-white py-3 px-4 rounded-xl text-xs uppercase tracking-widest font-bubble font-bold inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer select-none"
              >
                <Sparkles size={14} className="animate-spin text-white" />
                Scribble on Wall
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
