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
      this.getSites();
    });
  }

  openModalAttribute(currentName, currentId, siteAttributes): void {
    const dialogRef = this.dialog.open(ModifySiteInsideComponent, {
      width: '60%',
      data: {
        currentCategory: currentName,
        currentCategoryId: currentId,
        listCategories: this.cardsName,
        attributes: siteAttributes
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog openModalAttribute was closed');
      // FIXME: send the post only if the salva is pressed
      this.getSites();
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
  note = new FormControl('', []);
  hide = true;
  site: siteType;

  constructor(
    public dialogRef: MatDialogRef<ModifySiteInsideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private siteService: SiteService) { }

  categoryShow = false;

  setCategory() {
    this.categoryShow = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const user = 'fissoDaFrontEnd@tuttomail.com';
    const url = this.url.value.trim() === '' ? this.data.attributes.url : this.url.value.trim();
    const name = this.name.value.trim() === '' ? this.data.attributes.name : this.name.value.trim();
    let category = this.category.value.trim();
    const username = this.username.value.trim() === '' ? this.data.attributes.username : this.username.value.trim();
    const pwd = this.password.value.trim() === '' ? this.data.attributes.pwd : this.password.value.trim();
    const note = this.note.value.trim() === '' ? this.data.attributes.note : this.note.value.trim();
    const data = this.data.currentCategoryId;
    const _id = this.data.attributes._id;
    console.log('URL:', url, 'NAME:', name, 'CATEGORY:', category, 'USERNAME:', username, 'PWD:', pwd, 'DATA:', data, 'ID:', _id);
    if (category === '') {
      category = data;
      this.siteService.addSite({ _id, user,  url, name, category, username, pwd, note } as siteType)
        .subscribe(site => site);
      this.closeDialog();
    } else {
      this.siteService.addSite({ _id, user,  url, name, category, username, pwd, note } as siteType)
        .subscribe(site => site);
      this.closeDialog();
    }

  }

  getErrorMessage() {
    return this.url.hasError('required') ? 'Inserire email' :
      this.url.hasError('email') ? 'Email non valida' : '';
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

  setCategory() {
    this.categoryShow = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

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
      // TODO: redirect on the right category
      this.siteService.addSite({ user, url, name, category, username, pwd, note } as siteType)
        .subscribe(site => site);
    }
  }

  getErrorMessage() {
    return this.url.hasError('required') ? 'Inserire email' :
      this.url.hasError('email') ? 'Email non valida' : '';
  }

}
