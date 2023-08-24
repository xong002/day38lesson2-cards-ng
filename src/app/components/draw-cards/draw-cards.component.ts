import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckOfCardsAPIService } from 'src/app/deck-of-cards-api.service';
import { CardSummary, Deck } from 'src/app/models';

@Component({
  selector: 'app-draw-cards',
  templateUrl: './draw-cards.component.html',
  styleUrls: ['./draw-cards.component.css'],
})
export class DrawCardsComponent {
  svc = inject(DeckOfCardsAPIService);
  cardSummary!: CardSummary;
  remainingCards!: number;
  deck!: Deck;
  route = inject(ActivatedRoute);

  @ViewChild('noOfCards')
  noOfCards!: ElementRef;

  ngOnInit() {
    const d = sessionStorage.getItem(this.route.snapshot.params['id']);
    if (d) 
     this.remainingCards = JSON.parse(d).remaining;
  }

  drawCards() {
    const n = this.noOfCards.nativeElement.value;
    this.svc.drawCards(n, this.svc.deck.deckId).then((d) => {
      if (d) {
        this.cardSummary = d;
        this.remainingCards = this.cardSummary.remaining
        console.log(this.cardSummary);
      } else console.log('error');
    });
  }
}
