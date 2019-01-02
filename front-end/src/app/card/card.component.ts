import { Component, Inject, OnInit } from '@angular/core';
import { cardType } from '../type-card-container';
import { CardService } from '../card.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DialogData } from '../app.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private cardService: CardService, public dialog: MatDialog) { }

  cards: cardType[];
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
    const dialogRef = this.dialog.open(DialogAddSiteDialog, {
      width: '60%',
      data: {
        name: this.cardsName
      }
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => { });
  }
}

@Component({
  selector: './dialog-add-site-dialog',
  templateUrl: './dialog-add-site.html',
})

export class DialogAddSiteDialog {

  url = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DialogAddSiteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  closeDialog(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.url.hasError('required') ? 'You must enter a value' :
      this.url.hasError('email') ? 'Not a valid email' :
        '';
  }

  get dataInfo() { return JSON.stringify(this.data.name); }

}
