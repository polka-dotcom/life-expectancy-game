import React from 'react';
import { motion } from 'framer-motion';

interface GuessResultProps {
  actual: number;
  guess: number;
}

export const GuessResult: React.FC<GuessResultProps> = ({ actual, guess }) => {
  const difference = Math.abs(actual - guess);
  const isClose = difference <= 5;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="space-y-6 p-6 bg-white/10 backdrop-blur-md rounded-lg text-center"
    >
      <h3 className="text-2xl font-semibold text-white">
        {isClose ? "Great guess!" : "Nice try!"}
      </h3>
      
      <div className="space-y-2">
        <p className="text-xl text-gray-300">
          Your guess: <span className="text-blue-400 font-semibold">{guess}</span>
        </p>
        <p className="text-xl text-gray-300">
          Actual: <span className="text-purple-400 font-semibold">{actual}</span>
        </p>
        <p className="text-lg text-gray-400">
          Difference: {difference.toFixed(1)} years
        </p>
      </div>
      
      {isClose && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-green-400 text-xl"
        >
          🎉 Within 5 years! Extra points!
        </motion.div>
      )}
    </motion.div>
  );
};
