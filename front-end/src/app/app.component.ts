import { ChangeDetectorRef, Component, OnDestroy, Inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

export interface DialogData {
  _id: number;
  name: string;
  currentSiteId: number;
  currentCategoryId: number;
  currentCategory: string;
  attributes: { _id: number, url: string, name: string, username: string, pwd: string, note: string };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
