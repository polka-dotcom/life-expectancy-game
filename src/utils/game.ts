import { Country } from '@/types';

export const calculateScore = (actual: number, guess: number): number => {
  return Math.abs(actual - guess);
};

export const getRandomCountry = (countries: Country[]): Country => {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
};

export const formatScore = (score: number): string => {
  return score.toFixed(1);
};
