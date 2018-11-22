import {Component, Input, OnInit} from '@angular/core';
import {cardType} from '../type-card-container';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  @Input() card: cardType;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cardService.getCard(id)
      .subscribe(card => this.card = card);
  }
}
