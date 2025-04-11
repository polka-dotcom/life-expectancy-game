import { useState, useEffect } from 'react';
import { GameState } from '@/types';

const INITIAL_STATE: GameState = {
  currentRound: 0,
  totalRounds: 5,
  score: 0,
  guesses: [],
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load saved game state from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gameState');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return INITIAL_STATE;
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gameState', JSON.stringify(gameState));
    }
  }, [gameState]);

  const resetGame = () => {
    setGameState(INITIAL_STATE);
  };

  return {
    gameState,
    setGameState,
    resetGame,
  };
};
