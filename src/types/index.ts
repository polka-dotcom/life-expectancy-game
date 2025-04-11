export interface Country {
  name: string;
  lifeExpectancy: number;
}

export interface GuessData {
  country: string;
  actual: number;
  guess: number;
  difference: number;
}

export interface GameState {
  currentRound: number;
  totalRounds: number;
  score: number;
  guesses: GuessData[];
}

export interface GameSettings {
  totalRounds: number;
  minLifeExpectancy: number;
  maxLifeExpectancy: number;
}
