import React from 'react';
import { motion } from 'framer-motion';
import { GuessData } from '@/types';

interface GuessChartProps {
  guesses: GuessData[];
}

export const GuessChart: React.FC<GuessChartProps> = ({ guesses }) => {
  const maxHeight = 200;
  const barWidth = 40;
  const spacing = 20;

  return (
    <div className="w-full overflow-x-auto">
      <div 
        className="min-w-fit p-4"
        style={{ 
          width: Math.max(300, (barWidth + spacing) * guesses.length)
        }}
      >
        <div className="flex items-end justify-center h-[200px] mb-4">
          {guesses.map((guess, index) => {
            const height = Math.min(maxHeight, (maxHeight * Math.min(guess.difference, 15)) / 15);
            
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center mx-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="w-10 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-center space-x-4">
          {guesses.map((guess, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <span className="text-sm font-medium text-gray-600 mb-1">
                {guess.country}
              </span>
              <span className="text-xs text-gray-500">
                Diff: {guess.difference.toFixed(1)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
