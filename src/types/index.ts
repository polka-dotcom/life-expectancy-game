export interface Country {
  name: string;
  lifeExpectancy: number;
  fact: string;
}

export interface GameState {
  currentRound: number;
  totalRounds: number;
  score: number;
  guesses: Array<{
    country: string;
    actual: number;
    guess: number;
    difference: number;
  }>;
}

export interface GameSettings {
  totalRounds: number;
  minLifeExpectancy: number;
  maxLifeExpectancy: number;
}
