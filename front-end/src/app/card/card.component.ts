import {Component, Inject, OnInit} from '@angular/core';
import {cardType} from '../type-card-container';
import {CardService} from '../card.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogData} from '../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private cardService: CardService, public dialog: MatDialog) { }

  selectedCard: cardType;

  cards: cardType[];

  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCategoryDialog, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: './dialog-add-category-dialog',
  templateUrl: './dialog-add-category.html',
})
export class DialogAddCategoryDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogAddCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog(){
    this.dialogRef.close();
  }

}
