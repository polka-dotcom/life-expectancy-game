'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/Slider';
import { GuessResult } from '@/components/GuessResult';
import { useGameState } from '@/hooks/useGameState';
import { useCountries } from '@/hooks/useCountries';
import { calculateScore } from '@/utils/game';
import { Country } from '@/types';

export default function GamePage() {
  const { gameState, setGameState } = useGameState();
  const { getRandomCountry } = useCountries();
  const [guess, setGuess] = useState(70);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [nextCountry, setNextCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!currentCountry) {
      const initialCountry = getRandomCountry();
      setCurrentCountry(initialCountry);
      setNextCountry(getRandomCountry());
    }
  }, []);

  const handleGuess = async () => {
    if (!currentCountry || isTransitioning) return;

    setIsTransitioning(true);
    setShowResult(true);
    
    const error = calculateScore(currentCountry.lifeExpectancy, guess);
    
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      score: prev.score + error,
      guesses: [...prev.guesses, {
        country: currentCountry.name,
        actual: currentCountry.lifeExpectancy,
        guess,
        difference: error
      }]
    }));

    if (gameState.currentRound + 1 >= gameState.totalRounds) {
      window.location.href = '/results';
      return;
    }
  };

  const handleResultAnimationComplete = () => {
    setTimeout(() => {
      setShowResult(false);
      if (nextCountry) {
        setCurrentCountry(nextCountry);
        setNextCountry(getRandomCountry());
        setGuess(70);
      }
      setIsTransitioning(false);
    }, 3000);
  };

  if (!currentCountry) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-blue-600 font-semibold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-8 -right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          
          <div className="relative w-full bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="block text-2xl text-gray-600 mb-2">Guess the life expectancy in:</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCountry.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {currentCountry.name}
                </motion.div>
              </AnimatePresence>
            </h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Slider
                value={guess}
                onChange={setGuess}
                min={0}
                max={90}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <button
                onClick={handleGuess}
                disabled={isTransitioning}
                className={`relative w-full py-4 rounded-lg text-lg font-semibold transition-all text-center ${
                  isTransitioning
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                Submit Guess
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold">
                Round {gameState.currentRound + 1} of {gameState.totalRounds}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <GuessResult
        actual={currentCountry.lifeExpectancy}
        guess={guess}
        isVisible={showResult}
        onAnimationComplete={handleResultAnimationComplete}
      />
    </>
  );
}
