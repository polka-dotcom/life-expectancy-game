import { Country } from '@/types';

export const calculateScore = (difference: number): number => {
  // Score decreases as difference increases
  // Perfect guess (difference = 0) = 100 points
  // Difference of 5 years = 50 points
  // Difference of 10 years = 25 points
  // More than 15 years difference = 0 points
  if (difference === 0) return 100;
  if (difference <= 5) return Math.round(100 - (difference * 10));
  if (difference <= 10) return Math.round(50 - ((difference - 5) * 5));
  if (difference <= 15) return Math.round(25 - ((difference - 10) * 5));
  return 0;
};

export const getRandomCountry = (countries: Country[]): Country => {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
};

export const formatScore = (score: number): string => {
  return score.toFixed(1);
};
