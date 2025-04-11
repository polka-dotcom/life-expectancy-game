import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuessResultProps {
  actual: number;
  guess: number;
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export const GuessResult: React.FC<GuessResultProps> = ({
  actual,
  guess,
  isVisible,
  onAnimationComplete
}) => {
  const difference = Math.abs(actual - guess);
  const isClose = difference <= 3;
  const isFair = difference <= 7;
  
  const getMessage = () => {
    if (isClose) return "Excellent guess!";
    if (isFair) return "Not bad!";
    return "Keep trying!";
  };

  const getEmoji = () => {
    if (isClose) return "🎯";
    if (isFair) return "👍";
    return "💪";
  };

  const getGradient = () => {
    if (isClose) return "from-green-600 to-emerald-600";
    if (isFair) return "from-blue-600 to-cyan-600";
    return "from-purple-600 to-pink-600";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onAnimationComplete={onAnimationComplete}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-6xl mb-6 text-center"
            >
              {getEmoji()}
            </motion.div>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-3xl font-bold mb-6 text-center bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`}
            >
              {getMessage()}
            </motion.h3>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3
              }}
              className="text-center mb-8"
            >
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {difference.toFixed(1)}
              </span>
              <span className="text-xl text-gray-500 ml-2">years off</span>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
              >
                <span className="text-gray-600">Your guess</span>
                <span className="text-xl font-semibold text-gray-900">{guess}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
              >
                <span className="text-gray-600">Actual</span>
                <span className="text-xl font-semibold text-gray-900">{actual}</span>
              </motion.div>
            </div>

            {isClose && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.6 
                }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">⭐</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
