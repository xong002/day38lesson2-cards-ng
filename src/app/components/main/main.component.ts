import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeckOfCardsAPIService } from 'src/app/deck-of-cards-api.service';
import { DeckOfCardsApi1Service } from 'src/app/deck-of-cards-api1.service';
import { Deck } from 'src/app/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  noOfDecksArr = [1, 2, 3, 4];
  selectedValue: number = this.noOfDecksArr[0];
  // svc = inject(DeckOfCardsAPIService);
  svc1 = inject(DeckOfCardsApi1Service);
  router = inject(Router);
  deck!: Deck;

  @ViewChild('decks')
  selectedDecks!: ElementRef;

  selectValue() {
    this.selectedValue = this.selectedDecks.nativeElement.value;
  }

  createDecks() {
    // this.svc.getDecks(this.selectedValue).then((deck) => {
    //   if (deck) {
    //     this.deck = deck;
    //     console.log(this.deck);
    //     sessionStorage.setItem(this.deck.deckId, JSON.stringify(this.deck));
    //     this.router.navigate(['draw', this.deck.deckId]);
    //   } else {
    //     console.log("error")
    //   }
    // });

    this.svc1.getDecks(this.selectedValue).subscribe((data : any)=> {
      this.deck = {
        deckId: (data as any).deck_id,
        remaining: (data as any).remaining,
        shuffled: (data as any).shuffled
      }
      // sessionStorage.setItem(this.deck.deckId, JSON.stringify(this.deck))
      this.router.navigate(['/draw', this.deck.deckId])
    })

  }
}
