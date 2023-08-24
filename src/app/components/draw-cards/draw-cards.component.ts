import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckOfCardsAPIService } from 'src/app/deck-of-cards-api.service';
import { DeckOfCardsApi1Service } from 'src/app/deck-of-cards-api1.service';
import { CardSummary, Deck } from 'src/app/models';

@Component({
  selector: 'app-draw-cards',
  templateUrl: './draw-cards.component.html',
  styleUrls: ['./draw-cards.component.css'],
})
export class DrawCardsComponent {
  // svc = inject(DeckOfCardsAPIService);
  svc1 = inject(DeckOfCardsApi1Service);
  cardSummary!: CardSummary;
  remainingCards!: number;
  deckId!: string;
  route = inject(ActivatedRoute);
  router = inject(Router)

  @ViewChild('noOfCards')
  noOfCards!: ElementRef;

  ngOnInit() {
    this.deckId = this.route.snapshot.params['id']
    // const d = sessionStorage.getItem(this.deckId);
    // if (d)
    //   this.remainingCards = JSON.parse(d).remaining;
    // else this.router.navigate(['/'])

    this.svc1.getCardSummary(this.deckId).subscribe((data) => {
      this.cardSummary = {
        deckId : data.deckId,
        cards: data.cards,
        remaining: data.remaining
      }
      this.remainingCards = this.cardSummary.remaining
    })
  }

  drawCards() {
    // const n = this.noOfCards.nativeElement.value;
    // this.svc.drawCards(n, this.svc.deck.deckId).then((d) => {
    //   if (d) {
    //     this.cardSummary = d;
    //     this.remainingCards = this.cardSummary.remaining
    //     console.log(this.cardSummary);
    //   } else console.log('error');
    // });
    const n = this.noOfCards.nativeElement.value;
    this.svc1.drawCards(this.deckId, n).subscribe((data : any) => {
      this.cardSummary = {
        deckId : data.deckId,
        cards: data.cards,
        remaining: data.remaining
      }
      this.remainingCards = this.cardSummary.remaining
    })
  }

  clear(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
