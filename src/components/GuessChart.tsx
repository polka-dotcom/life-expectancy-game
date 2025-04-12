import React from 'react';
import { motion } from 'framer-motion';
import { GuessData } from '@/types';

interface GuessChartProps {
  guesses: GuessData[];
}

export const GuessChart: React.FC<GuessChartProps> = ({ guesses }) => {
  const minValue = 40;
  const maxValue = 90;
  const range = maxValue - minValue;

  const getPosition = (value: number) => {
    return ((value - minValue) / range) * 100;
  };

  return (
    <div className="w-full">
      <div className="space-y-8">
        {guesses.map((guess, index) => {
          const guessPos = getPosition(guess.guess);
          const actualPos = getPosition(guess.actual);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-white">{guess.country}</span>
                <span className="text-gray-300">Diff: {guess.difference.toFixed(1)}</span>
              </div>

              <div className="relative h-16">
                {/* Connection line */}
                <motion.div
                  className="absolute top-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{
                    left: `${Math.min(guessPos, actualPos)}%`,
                    width: `${Math.abs(actualPos - guessPos)}%`,
                    opacity: 0.3
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                />

                {/* Your guess dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${guessPos}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                  <div className="mt-1 text-xs text-blue-400">{guess.guess.toFixed(1)}</div>
                </motion.div>

                {/* Actual value dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${actualPos}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                >
                  <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                  <div className="mt-1 text-xs text-purple-400">{guess.actual.toFixed(1)}</div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm shadow-blue-500/50"></div>
          <span className="text-sm text-gray-300">Your Guess</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
          <span className="text-sm text-gray-300">Actual</span>
        </div>
      </div>
    </div>
  );
};
