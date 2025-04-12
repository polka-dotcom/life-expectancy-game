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
  }, [currentCountry, getRandomCountry]);

  const handleGuess = async () => {
    if (!currentCountry || isTransitioning) return;
    
    setIsTransitioning(true);
    setShowResult(true);
    
    const difference = Math.abs(currentCountry.lifeExpectancy - guess);
    const score = calculateScore(difference);
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + score,
      currentRound: prev.currentRound + 1,
      guesses: [...prev.guesses, {
        country: currentCountry.name,
        actual: currentCountry.lifeExpectancy,
        guess,
        difference,
      }],
    }));

    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setShowResult(false);
    setIsTransitioning(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (gameState.currentRound + 1 >= gameState.totalRounds) {
      window.location.href = '/results';
    } else {
      setCurrentCountry(nextCountry);
      setNextCountry(getRandomCountry());
      setGuess(70);
      setIsTransitioning(false);
    }
  };

  if (!currentCountry) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Guess the Life Expectancy
            </h1>
            <p className="text-xl text-gray-300">
              Round {gameState.currentRound + 1} of {gameState.totalRounds}
            </p>
            <div className="text-2xl font-semibold text-white">
              {currentCountry.name}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {showResult ? (
                <GuessResult
                  key="result"
                  actual={currentCountry.lifeExpectancy}
                  guess={guess}
                />
              ) : (
                <motion.div
                  key="slider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <Slider 
                    value={guess} 
                    onChange={setGuess}
                    min={40}
                    max={90}
                  />
                  
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
              )}
            </AnimatePresence>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-300">
              Score: {gameState.score}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
