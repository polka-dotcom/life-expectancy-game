import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export const Slider: React.FC<SliderProps> = ({ value, onChange, min, max }) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const xInput = [0, 100];
  const background = useTransform(
    x,
    xInput,
    ['linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)', 
     'linear-gradient(90deg, #60A5FA 0%, #93C5FD 100%)']
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
    animate(x, (newValue - min) / (max - min) * 100, {
      type: "spring",
      stiffness: 300,
      damping: 30
    });
  };

  return (
    <div className="w-full select-none">
      <motion.div 
        className="relative w-full h-3 rounded-lg overflow-visible"
        style={{ background }}
      >
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-transparent relative z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-8
            [&::-webkit-slider-thumb]:h-8
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:border-4
            [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-8
            [&::-moz-range-thumb]:h-8
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:border-4
            [&::-moz-range-thumb]:border-blue-500
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:hover:scale-110"
        />
      </motion.div>

      <motion.div 
        className="text-center mt-4"
        animate={{
          scale: isDragging ? 1.1 : 1,
          color: isDragging ? '#2563EB' : '#1F2937'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.span 
          className="text-3xl font-bold"
          initial={false}
          animate={{ 
            scale: isDragging ? 1.2 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {value}
        </motion.span>
        <span className="text-gray-600 ml-2">years</span>
      </motion.div>
    </div>
  );
};
