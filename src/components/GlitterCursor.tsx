import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export default function GlitterCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let particleId = 0;
    const colors = ['#ff2982', '#ff85b3', '#ffffff', '#e9d5ff', '#ffb6d9'];

    const handleMouseMove = (e: MouseEvent) => {
      // Limit frequency slightly to avoid overloading
      if (Math.random() > 0.4) return;

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomSize = Math.random() * 12 + 6; // 6px to 18px
      const randomRotation = Math.random() * 360;

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY + window.scrollY,
        size: randomSize,
        color: randomColor,
        rotation: randomRotation,
      };

      setParticles((prev) => [...prev.slice(-25), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" id="glitter-container">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 0.5, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: p.y - p.size / 2 + 50, // drift down
              x: p.x - p.size / 2 + (Math.random() * 20 - 10), // drift drift
              rotate: p.rotation + 90
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
            }}
          >
            {/* Twinkling star shape */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: p.color, filter: 'drop-shadow(0 0 3px rgba(255,41,130,0.5))' }}
            >
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
