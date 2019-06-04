import { Component } from '@angular/core';

export interface DialogData {
  _id: number;
  name: string;
  currentSiteId: number;
  listCategories: {
    _id: number;
    name: string;
  };
  currentCategoryId: number;
  currentCategory: string;
  attributes: {
    _id: number,
    url: string,
    name: string,
    username: string,
    pwd: string,
    note: string
  };
  categoryId: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
