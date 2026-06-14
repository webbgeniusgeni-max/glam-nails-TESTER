import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onFinished: () => void;
}

export default function WelcomeScreen({ onFinished }: WelcomeScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setVisible(false);
            onFinished();
          }, 400); // let user absorb full completeness
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4; // increment
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-tr from-[#ffe3f0] via-[#ffb6d9] to-[#ffd1e6]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Sparkles Floating around loading */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/4 left-1/4 text-hotpink-500 opacity-60"
            >
              <Sparkles size={48} />
            </motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-1/4 right-1/4 text-purple-400 opacity-60"
            >
              <Sparkles size={36} />
            </motion.div>
          </div>

          <div className="relative text-center px-4 max-w-md">
            {/* Crown or Nail polish cartoon illustration */}
            <div className="relative mb-8 flex justify-center">
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  scale: [1, 1.05, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 2.2, 
                  repeat: Infinity,
                  ease: 'easeInOut' 
                }}
                className="relative z-10 w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-lg border-4 border-hotpink-400"
              >
                {/* Custom Vector Style Nail Polish Bottle */}
                <div className="relative flex flex-col items-center justify-center">
                  <div className="w-4 h-8 bg-zinc-700 rounded-t-sm" /> {/* cap */}
                  <div className="w-12 h-10 bg-gradient-to-b from-hotpink-300 to-hotpink-600 rounded-b-md border-t-2 border-white flex items-center justify-center relative shadow-inner overflow-hidden">
                    <div className="absolute top-1 left-2 w-8 h-2 bg-white/40 blur-[0.5px] rounded-full" />
                    <Sparkles size={16} className="text-white animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Decorative Silver Wings / Ribbon background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-xl opacity-50 animate-pulse" />
            </div>

            {/* Title text */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bubble text-3xl font-bold tracking-tight text-hotpink-600 mb-2 drop-shadow-sm"
            >
              Pink Velvet Nails
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-y2k text-sm tracking-widest text-[#8c1240] uppercase font-bold"
            >
              Polishing Perfection...
            </motion.p>

            {/* Glowing Rhinestone Progress Bar */}
            <div className="mt-8 w-64 h-5 bg-white/70 rounded-full p-1 border border-hotpink-300 shadow-inner relative overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-hotpink-400 via-hotpink-600 to-purple-400 rounded-full relative"
                style={{ width: `${progress}%` }}
                layout
              >
                {/* Shiny gloss overlay */}
                <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-[length:200%_100%] animate-pulse" />
              </motion.div>
            </div>
            
            {/* Quick status tracker */}
            <div className="mt-2 text-xs font-mono font-medium text-hotpink-700/80">
              {progress < 40 && "Shaping Acrylics..."}
              {progress >= 40 && progress < 70 && "Applying Hot Pink Base..."}
              {progress >= 70 && progress < 90 && "Sticking Rhinestones..."}
              {progress >= 90 && "Applying Glossy Topcoat..."}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
