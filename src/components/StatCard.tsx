import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  delay = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-xl shadow-sm p-6 text-center overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease-out'
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-500 to-purple-500"
        animate={{
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-gray-500 text-sm font-medium mb-1 relative"
      >
        {title}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        className="relative"
      >
        <motion.span
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="inline-block text-2xl font-bold text-gray-900 mb-1"
        >
          {value}
        </motion.span>
      </motion.div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
          className="text-gray-600 text-sm relative"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};
