'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useGameState } from '@/hooks/useGameState';
import { GuessChart } from '@/components/GuessChart';
import { StatCard } from '@/components/StatCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ResultsPage() {
  const { gameState, resetGame } = useGameState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration issues
  }

  if (gameState.guesses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen p-8"
      >
        <h1 className="text-2xl font-bold mb-4">No game results found</h1>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start New Game
        </Link>
      </motion.div>
    );
  }

  const averageError = gameState.score / gameState.guesses.length;
  const bestGuess = Math.min(...gameState.guesses.map(g => Math.abs(g.difference)));
  const worstGuess = Math.max(...gameState.guesses.map(g => Math.abs(g.difference)));

  const getBestWorstCountries = () => {
    const best = gameState.guesses.find(g => Math.abs(g.difference) === bestGuess)?.country;
    const worst = gameState.guesses.find(g => Math.abs(g.difference) === worstGuess)?.country;
    return { best, worst };
  };

  const { best, worst } = getBestWorstCountries();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Results</h1>
          <p className="text-lg text-gray-600">
            You completed {gameState.guesses.length} rounds!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Average Error"
            value={`${averageError.toFixed(1)} years`}
            description="Lower is better"
            delay={0.2}
          />
          <StatCard
            title="Best Guess"
            value={`${bestGuess.toFixed(1)} years`}
            description={best ? `Country: ${best}` : undefined}
            delay={0.3}
          />
          <StatCard
            title="Worst Guess"
            value={`${worstGuess.toFixed(1)} years`}
            description={worst ? `Country: ${worst}` : undefined}
            delay={0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Your Guesses</h2>
          <GuessChart guesses={gameState.guesses} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <Link
            href="/"
            onClick={resetGame}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Play Again
          </Link>
          <Link
            href="https://data.worldbank.org/indicator/SP.DYN.LE00.IN"
            target="_blank"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
