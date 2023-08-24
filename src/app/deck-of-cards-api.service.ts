import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, firstValueFrom } from 'rxjs';
import { CardSummary, Deck } from './models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DeckOfCardsAPIService {
  http = inject(HttpClient);
  deck!: Deck;
  cardSummary!: CardSummary;

  getDecks(n: number) {
    return firstValueFrom(
      this.http
        .get<string>('https://www.deckofcardsapi.com/api/deck/new/shuffle/', {
          params: {
            deck_count: n,
          },
        })
        .pipe(
          map((data) => {
            return JSON.parse(JSON.stringify(data));
          })
        )
    ).then((d) => {
      if (d) {
        this.deck = {
          deckId: d.deck_id,
          remaining: d.remaining,
          shuffled: d.shuffled,
        };
        return this.deck;
      }
      return null;
    });
  }

  drawCards(n: number, deckId: string) {
    const url = 'https://www.deckofcardsapi.com/api/deck/' + deckId + '/draw';
    return firstValueFrom(
      this.http.get<any>(url, { params: { count: n } }).pipe(
        map((data) => {
          return JSON.parse(JSON.stringify(data));
        })
      )
    ).then((d) => {
      if (d) {
        this.cardSummary = {
          deckId: d.deck_id,
          cards: [...d.cards],
          remaining: d.remaining,
        };
        return this.cardSummary;
      } return null;
    });
  }
}
