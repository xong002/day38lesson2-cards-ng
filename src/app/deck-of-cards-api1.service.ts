import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsApi1Service {
  http = inject(HttpClient);
  deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/"
  cardUrl = "https://www.deckofcardsapi.com/api/deck/"

  getDecks(n: number) {
    return this.http.get<any>(this.deckUrl, { params: { deck_count: n } });
  }

  getCardSummary(deckId: string) {
    return this.http.get<any>(this.cardUrl + deckId);
  }

  drawCards(deckId: string, n: number) {
    return this.http.get<any>(this.cardUrl + deckId + "/draw/", { params: { count: n } })
  }

}
