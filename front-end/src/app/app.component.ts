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
export class AppComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private username;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    const currentToken = localStorage.getItem('currentUser');
    if(currentToken) {
      const currentT = JSON.parse(currentToken).user;
      this.username = currentT;
      console.log(this.username);
    }
  }
}
