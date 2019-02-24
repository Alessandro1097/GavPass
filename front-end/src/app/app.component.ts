import { ChangeDetectorRef, Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

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
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
