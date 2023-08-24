export interface Deck {
  deckId: string;
  remaining: number;
  shuffled: boolean;
}

export interface Card {
  code: string;
  image: string;
}

export interface CardSummary {
  deckId: string;
  cards: Card[];
  remaining: number;
}
