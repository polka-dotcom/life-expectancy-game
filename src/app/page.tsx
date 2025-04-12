'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Life Expectancy Game
          </h1>
          
          <p className="text-xl text-gray-300">
            Test your knowledge about global health! Guess the life expectancy in different countries around the world.
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <Link 
              href="/game"
              className="relative block w-full py-4 rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
            >
              Start Game
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">How to Play</h3>
              <p className="text-gray-300">Use the slider to guess the life expectancy in years for the displayed country. The closer your guess, the more points you earn!</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Features</h3>
              <ul className="text-gray-300 list-disc list-inside">
                <li>Real-time feedback</li>
                <li>Score tracking</li>
                <li>Multiple rounds</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
