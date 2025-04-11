import { useState, useCallback } from 'react';
import { Country } from '@/types';
import { countries } from '@/data/countries';

export const useCountries = () => {
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());

  const getRandomCountry = useCallback((): Country => {
    // Filter out already used countries
    const availableCountries = countries.filter(
      country => !usedCountries.has(country.name)
    );

    // If all countries have been used, reset the used countries
    if (availableCountries.length === 0) {
      setUsedCountries(new Set());
      return countries[Math.floor(Math.random() * countries.length)];
    }

    // Get a random country from the available ones
    const country = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    
    // Mark this country as used
    setUsedCountries(prev => new Set([...prev, country.name]));
    
    return country;
  }, [usedCountries]);

  const resetUsedCountries = useCallback(() => {
    setUsedCountries(new Set());
  }, []);

  return {
    getRandomCountry,
    resetUsedCountries,
    totalCountries: countries.length,
  };
};
