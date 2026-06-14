import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface FloatingItem {
  id: number;
  type: 'sparkle' | 'heart' | 'star' | 'butterfly';
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export default function SparkleOverlay() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const types: ('sparkle' | 'heart' | 'star' | 'butterfly')[] = ['sparkle', 'heart', 'star', 'butterfly'];
    const colors = [
      'rgba(255, 41, 130, 0.15)', // transparent neon hotpink
      'rgba(255, 182, 217, 0.2)',  // transparent baby pink
      'rgba(233, 213, 255, 0.2)',  // transparent lavender
      'rgba(255, 255, 255, 0.35)', // transparent white shimmer
    ];

    const count = 25;
    const generated: FloatingItem[] = Array.from({ length: count }).map((_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * (type === 'butterfly' ? 24 : 16) + 12;
      return {
        id: i,
        type,
        x: Math.random() * 100, // percentage x
        y: Math.random() * 100, // percentage y
        size,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10, // 10 to 20 seconds
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setItems(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" id="ambient-sparkles-container">
      {items.map((item) => {
        let path = '';
        if (item.type === 'star') {
          // 4-point starburst
          path = 'M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z';
        } else if (item.type === 'heart') {
          path = 'M12 4.435C10.011 1.717 6.136 1.345 3.4 3.9C0.665 6.456 0.166 10.422 2.5 13.5C4.834 16.578 12 22 12 22S19.166 16.578 21.5 13.5C23.834 10.422 23.335 6.456 20.6 3.9C17.864 1.345 13.989 1.717 12 4.435Z';
        } else if (item.type === 'sparkle') {
          path = 'M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z';
        } else {
          // Butterfly shape
          path = 'M12 10C11.5 8 9 4 5 4C2 4 1 6 1 8C1 11 4 13 8 13C8.5 13 9 12.8 9.5 12.5C9 13.5 8 16 5 16C3 16 2.5 17.5 2.5 18.5C2.5 19.5 3.5 20.5 5 20.5C9 20.5 11 18 12 15C13 18 15 20.5 19 20.5C20.5 20.5 21.5 19.5 21.5 18.5C21.5 17.5 21 16 19 16C16 16 15 13.5 14.5 12.5C15 12.8 15.5 13 16 13C20 13 23 11 23 8C23 6 22 4 19 4C15 4 12.5 8 12 10Z';
        }

        return (
          <motion.div
            key={item.id}
            initial={{ 
              opacity: 0, 
              x: `${item.x}vw`, 
              y: `${item.y}vh`,
              scale: 0.8
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [`${item.y}vh`, `${item.y - 12}vh`],
              x: [
                `${item.x}vw`, 
                `${item.x + (item.type === 'butterfly' ? 4 : 1.5)}vw`, 
                `${item.x - (item.type === 'butterfly' ? 2 : 0.5)}vw`, 
                `${item.x}vw`
              ],
              rotate: [0, item.type === 'butterfly' ? 20 : 180, item.type === 'butterfly' ? -15 : 360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: item.size,
              height: item.size,
              color: item.color,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d={path} />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
