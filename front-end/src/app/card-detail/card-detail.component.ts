import { Component, Inject, Input, OnInit } from '@angular/core';
import { cardType } from '../type-card-container';
import { siteType } from '../type-site';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '../card.service';
import { SiteService } from '../site.service';
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
  sites: siteType[];

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private siteService: SiteService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCard();
    this.getCategoriesName();
    this.getSites();
  }

  getCard(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.cardService.getCard(name)
      .subscribe(card => this.card = card);
  }

  getCategoriesName(): void {
    this.cardService.getCategoriesName().subscribe(cardsName => this.cardsName = cardsName);
  }

  getSites(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.siteService.getSites(name).subscribe(sites => this.sites = sites);
  }

  goBack(): void {
    this.location.back();
  }

  openModifySite(currentName, currentId): void {
    const dialogRef = this.dialog.open(AddSiteInsideComponent, {
      width: '60%',
      data: {
        currentCategory: currentName,
        currentCategoryId: currentId,
        listCategories: this.cardsName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog openModifySite was closed');
    });
  }

  openModalAttribute(currentName, siteAttributes): void {
    const dialogRef = this.dialog.open(ModifySiteInsideComponent, {
      width: '60%',
      data: {
        currentCategory: currentName,
        listCategories: this.cardsName,
        attributes: siteAttributes
      }
    });
    console.log(this);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog openModalAttribute was closed');
    });
  }

}

@Component({
  selector: './app-dialog-modify-site-inside',
  templateUrl: './modify-site-inside.component.html',
})
export class ModifySiteInsideComponent {

  url = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<ModifySiteInsideComponent>,
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
  selector: './app-dialog-add-site-inside',
  templateUrl: './add-site-inside.component.html',
})
export class AddSiteInsideComponent {

  url = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  currentCategory = new FormControl(this.data.currentCategory, []);
  category = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  note = new FormControl('', []);
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<AddSiteInsideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private siteService: SiteService) { }

  categoryShow = false;

  setCategory(): void {
    this.categoryShow = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // create post of the site inside the card detail
  onSubmit() {
    const user = 'fissoDaFrontEnd@tuttomail.com';
    const url = this.url.value.trim();
    const name = this.name.value.trim();
    let category = this.category.value.trim();
    const username = this.username.value.trim();
    const pwd = this.password.value.trim();
    const note = this.note.value.trim();
    const data = this.data.currentCategoryId;
    if (category === '') {
      category = data;
      this.siteService.addSite({ user, url, name, category, username, pwd, note } as siteType)
      .subscribe(site => site);
    } else {
      this.siteService.addSite({ user, url, name, category, username, pwd, note } as siteType)
      .subscribe(site => site);
    }
  }

  getErrorMessage() {
    return this.url.hasError('required') ? 'You must enter a value' :
      this.url.hasError('email') ? 'Not a valid email' :
        '';
  }

}
