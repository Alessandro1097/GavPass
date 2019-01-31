import { AddSiteInsideComponent } from './../card-detail/card-detail.component';
import { Router } from '@angular/router';
import { SiteService } from './../site.service';
import { CardService } from './../card.service';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { cardType } from '../type-card-container';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DialogData } from '../app.component';
import { FormControl, Validators } from '@angular/forms';
import { siteType } from '../type-site';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(
    private cardService: CardService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  // list of all the card and id
  cards: cardType[];
  // list of all the categories
  cardsName: cardType[];

  ngOnInit() {
    this.getCards();
    this.getCategoriesName();
  }

  getCards(): void {
    this.cardService.getCards().subscribe(cards => this.cards = cards);
  }

  getCategoriesName(): void {
    this.cardService.getCategoriesName().subscribe(cardsName => this.cardsName = cardsName);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSiteComponent, {
      width: '60%',
      data: {
        name: this.cardsName
      }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}

@Component({
  selector: './app-add-site',
  templateUrl: './add-site.component.html',
})

export class AddSiteComponent implements OnInit {
  @Input() card: cardType;
  sites: siteType[];
  cards: cardType[];
  hide = true;

  user = new FormControl('', [Validators.required]);
  url = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  note = new FormControl('', []);

  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards().subscribe(cards => this.cards = cards);
  }

  constructor(
    public dialogRef: MatDialogRef<AddSiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cardService: CardService,
    private siteService: SiteService,
    public dialog: MatDialog,
    private router: Router) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openDialogSucess(): void {
    const dialogRef = this.dialog.open(AddSiteSucessfullyComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  onSubmit() {
    const user = 'fissoDaFrontEnd@tuttomail.com';
    const url = this.url.value.trim();
    const name = this.name.value.trim();
    const category = this.category.value.trim();
    const username = this.username.value.trim();
    const pwd = this.password.value.trim();
    const note = this.note.value.trim();
    let selectedCategory = '';
    this.siteService.addSite({ user, url, name, category, username, pwd, note } as siteType).subscribe(site => site);
    for (let index = 0; index < this.cards.length; index++) {
      if (this.cards[index]._id === category) {
        selectedCategory = this.cards[index].name;
      }
    }
    const urlToGo = `/detail/${selectedCategory}`;
    this.router.navigate([urlToGo]);
    this.openDialogSucess();
  }

  getErrorMessage() {
    return this.url.hasError('required') ? 'You must enter a value' :
      this.url.hasError('email') ? 'Not a valid email' : '';
  }
}

@Component({
  selector: './app-added-site-sucessfully',
  templateUrl: './added-site-sucessfully.component.html',
})

export class AddSiteSucessfullyComponent implements OnInit {

  ngOnInit() {}

  constructor(
    public dialogRef: MatDialogRef<AddSiteSucessfullyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}


