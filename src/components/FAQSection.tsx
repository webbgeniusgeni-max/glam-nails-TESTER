import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles, Heart } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do you accept walk-ins or are appointments required?',
    answer: 'We love spontaneous divas! While we always try our best to accommodate walk-ins, our scheduling fills up high-key fast. We highly recommend reserving your VIP Main Character slot online to guarantee zero waiting time.'
  },
  {
    id: 'faq-2',
    question: 'How long does a full Acrylic Set typically last?',
    answer: 'A custom-designed Acrylic Set lasts about 3 to 4 weeks before needing a professional maintenance fill. To extend your longevity, make sure to wear cute gloves while washing dishes and apply premium cuticle oil daily!'
  },
  {
    id: 'faq-3',
    question: 'What is the difference between Gel and Classic polish?',
    answer: 'Gel manicures are cured under a professional UV lamp, drying completely in under 60 seconds with an legendary, chip-free gloss finish of up to 3 weeks. Classic polish dries naturally, taking around 20 minutes to harden fully.'
  },
  {
    id: 'faq-4',
    question: 'Oh no, a rhinestone fell off! What should I do?',
    answer: "No worries, baby! Bring your nails back into the boutique within 5 days of your appointment, and we'll re-glue your crystal gems or fix any minor chips completely free of charge. We got you covered!"
  },
  {
    id: 'faq-5',
    question: 'Are your kids mini manis safe for young divas?',
    answer: 'Absolutely! Our Kids’ Mini Mani uses toxic-free, water-based glitter polishes and organic honey lotions designed to be soft and ultra-safe. This treatment is open to all little princesses up to 12 years old.'
  },
  {
    id: 'faq-6',
    question: 'How can I safely remove my gel or acrylic nails?',
    answer: 'Never peel or pull! Peeling can peel away micro-layers of your natural nails. Slip into the salon and let our artists provide a safe, gentle organic oil foil soak-off treatment to preserve your natural nail beds.'
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto" id="faq-section">
      {/* FAQ Header */}
      <div className="text-center mb-12 relative animate-fade-in">
        <span className="font-bubble px-4 py-1.5 rounded-full bg-purple-100/75 border border-purple-200/80 text-purple-600 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm">
          <HelpCircle size={12} /> Got Questions? <HelpCircle size={12} />
        </span>
        <h2 className="font-bubble text-3xl md:text-4xl font-extrabold text-[#8c1240] mt-3">
          Frequently Sparked Questions
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-pink-300 via-hotpink-400 to-purple-300 mx-auto rounded-full mt-3" />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              id={`faq-accordion-${faq.id}`}
              className="bg-white rounded-2xl border-2 border-pink-100 overflow-hidden hover:border-hotpink-200 transition-all duration-300 shadow-sm"
            >
              {/* Question Trigger */}
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full py-4 px-6 flex justify-between items-center text-left hover:bg-hotpink-50/20 transition-all"
              >
                <span className="font-bubble text-[#8c1240] font-bold text-sm md:text-base leading-snug flex items-center gap-2">
                  <Heart size={14} fill={isOpen ? "#ff2982" : "none"} className={isOpen ? "text-[#ff2982] scale-110" : "text-pink-300"} />
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#8c1240] transition-transform duration-300 shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-hotpink-600' : ''
                  }`}
                />
              </button>

              {/* Answer block */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 pt-1 text-gray-600 font-sans text-xs md:text-sm leading-relaxed border-t border-dashed border-pink-50">
                      <p className="pl-6 relative">
                        <Sparkles size={12} className="text-hotpink-400 absolute left-0 top-1 animate-pulse" />
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
