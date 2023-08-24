import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeckOfCardsAPIService } from 'src/app/deck-of-cards-api.service';
import { Deck } from 'src/app/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  noOfDecksArr = [1, 2, 3, 4];
  svc = inject(DeckOfCardsAPIService);
  selectedValue: number = 1;
  router = inject(Router);
  deck!: Deck;

  @ViewChild('decks')
  selectedDecks!: ElementRef;

  selectValue() {
    this.selectedValue = this.selectedDecks.nativeElement.value;
  }

  createDecks() {
    this.svc.getDecks(this.selectedValue).then((deck) => {
      if (deck) {
        this.deck = deck;
        console.log(this.deck);
        sessionStorage.setItem(this.deck.deckId, JSON.stringify(this.deck));
        this.router.navigate(['draw', this.deck.deckId]);
      } else {
        console.log("error")
      }
    });
  }
}
