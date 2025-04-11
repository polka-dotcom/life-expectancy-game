import React from 'react';
import { motion } from 'framer-motion';
import { GameState } from '@/types';

interface GuessChartProps {
  guesses: GameState['guesses'];
}

export const GuessChart: React.FC<GuessChartProps> = ({ guesses }) => {
  const maxDifference = Math.max(...guesses.map(g => Math.abs(g.difference)));
  
  return (
    <div className="w-full space-y-3">
      {guesses.map((guess, index) => (
        <motion.div
          key={index}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{guess.country}</span>
            <span className="text-gray-600">
              Difference: {Math.abs(guess.difference).toFixed(1)} years
            </span>
          </div>
          <div className="h-8 bg-gray-100 rounded-lg relative overflow-hidden">
            {/* Actual value line */}
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 bg-green-500"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              style={{ left: `${(guess.actual / 90) * 100}%` }}
            />
            {/* User's guess line */}
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 bg-blue-500"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              style={{ left: `${(guess.guess / 90) * 100}%` }}
            />
            {/* Difference area */}
            <motion.div
              className={`absolute top-0 bottom-0 ${
                guess.guess > guess.actual ? 'bg-red-200' : 'bg-blue-200'
              }`}
              initial={{ width: 0 }}
              animate={{
                width: `${(Math.abs(guess.actual - guess.guess) / 90) * 100}%`
              }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              style={{
                left: `${(Math.min(guess.actual, guess.guess) / 90) * 100}%`,
                opacity: 0.5,
              }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>Your guess: {guess.guess}</span>
            <span>Actual: {guess.actual}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
