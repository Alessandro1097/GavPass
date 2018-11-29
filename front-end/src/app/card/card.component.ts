import {Component, OnInit} from '@angular/core';
import {cardType} from '../type-card-container';
import {CardService} from '../card.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private cardService: CardService) { }

  selectedCard: cardType;

  cards: cardType[];

  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }
}
