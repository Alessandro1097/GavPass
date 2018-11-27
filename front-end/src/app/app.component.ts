import {ChangeDetectorRef, Component, OnDestroy, Inject} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CARDS} from './mock-card';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-add-category.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  cardCategories = CARDS;

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
