import {Component, Inject, Input, OnInit} from '@angular/core';
import {cardType} from '../type-card-container';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '../card.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogData} from '../app.component';
import {CARDS} from '../mock-card';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css'],
})
export class CardDetailComponent implements OnInit {
  @Input() card: cardType;
  cards: cardType[];
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cardService.getCard(id)
      .subscribe(card => this.card = card);
  }

  goBack(): void {
    this.location.back();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddSiteDialog, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // TODO: open dialog with the data of the selected item
  openModalAttribute(attributes): void {
    //console.log(attributes);
    const dialogRef = this.dialog.open(DialogAttributesDialog, {
      width: '60%',
      data: {
        dataAttributes: attributes,
        dataType: this.card.type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: './dialog-add-site-dialog',
  templateUrl: './dialog-add-site.html',
})
export class DialogAddSiteDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogAddSiteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  cardCategories = CARDS;

  closeDialog(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: './dialog-attributes-dialog',
  templateUrl: './dialog-attributes-dialog.html',
})
export class DialogAttributesDialog{

  constructor(
    public dialogRef: MatDialogRef<DialogAttributesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  cardCategories = CARDS;

  categoryShow = false;

  setCategory(): void {
    this.categoryShow = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
