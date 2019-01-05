import { Component, Inject, Input, OnInit } from '@angular/core';
import { cardType } from '../type-card-container';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '../card.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import 'rxjs-compat/add/operator/do';
import { DialogData } from '../app.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css'],
})
export class CardDetailComponent implements OnInit {
  @Input() card: cardType;
  cards: cardType[];
  cardsName: cardType[];

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCard();
    this.getCategoriesName();
  }

  getCard(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.cardService.getCard(name)
      .subscribe(card => this.card = card);
  }

  getCategoriesName(): void {
    this.cardService.getCategoriesName().subscribe(cardsName => this.cardsName = cardsName);
  }

  goBack(): void {
    this.location.back();
  }

  openModifySite(currentName): void {
    const dialogRef = this.dialog.open(DialogModifySite, {
      width: '60%',
      data: {
        currentCategory: currentName,
        listCategories: this.cardsName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog openModifySite was closed');
    });
  }

  openModalAttribute(currentName, cardAttributes): void {
    const dialogRef = this.dialog.open(DialogAttributesDialog, {
      width: '60%',
      data: {
        currentCategory: currentName,
        listCategories: this.cardsName,
        attributes: cardAttributes
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog openModalAttribute was closed');
    });
  }

}

@Component({
  selector: './dialog-attributes-dialog',
  templateUrl: './dialog-attributes-dialog.html',
})
export class DialogAttributesDialog {

  url = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DialogAttributesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  categoryShow = false;

  setCategory(): void {
    this.categoryShow = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.url.hasError('required') ? 'You must enter a value' :
      this.url.hasError('email') ? 'Not a valid email' :
        '';
  }

}

@Component({
  selector: './dialog-modify-site',
  templateUrl: './dialog-modify-site-inside.html',
})
export class DialogModifySite {

  url = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DialogModifySite>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  categoryShow = false;

  setCategory(): void {
    this.categoryShow = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.url.hasError('required') ? 'You must enter a value' :
      this.url.hasError('email') ? 'Not a valid email' :
        '';
  }

}
