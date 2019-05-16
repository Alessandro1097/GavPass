import { noteTypeCategories } from '../type-note-categories';
import { NoteService } from '../_services/note.service';
import {Component, Input, OnInit, Inject} from '@angular/core';
import {cardType} from '../type-card-container';
import {SidenavService} from '../_services/sidenav.service';
import { SidebarService } from '../_services/sidebar.service';
import { noteType } from '../_services/note-type';
import {AddSiteComponent} from '../card/card.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import { DialogData } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  note: noteType[];
  noteCategories: noteTypeCategories[];
  noteNames: noteTypeCategories[];

  constructor(
    private noteService: NoteService,
    public sideNavService: SidenavService,
    public sideBarService: SidebarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getNotes();
    this.getNotesName();
    this.getNotesCategories();
  }

  getNotes(): void {
    this.noteService.getNote().subscribe(notes => this.note = notes);
  }

  getNotesCategories(): void {
    this.noteService.getCategoryNoteList().subscribe(noteCategories => this.noteCategories = noteCategories);
  }

  getNotesName(): void {
    this.noteService.getNoteName().subscribe(noteName => this.noteNames = noteName);
  }

  get data() { return JSON.stringify(this.noteNames); }

  addNote() {
    const dialogRef = this.dialog.open(AddSiteComponent, {
      width: '60%',
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}

@Component({
  selector: './app-add-note',
  templateUrl: './add-note.component.html',
})

export class AddNoteComponent {
  @Input() card: cardType;
  notes: noteType[];

  constructor(
    public dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private cardService: CardService,
    // private siteService: SiteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openSnackSuccess(selectedCategory): void {
    const messageAddedCategory = 'Site added to: ' + selectedCategory;
    this.snackBar.open(messageAddedCategory, 'Okay!', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }

  onSubmit() {
    /** const currentToken = localStorage.getItem('currentUser');
    const user = JSON.parse(currentToken).user;
    const url = this.url.value.trim();
    const name = this.name.value.trim();
    const category = this.category.value.trim();
    const username = this.username.value.trim();
    const pwd = this.password.value.trim();
    const note = this.note.value.trim();
    let selectedCategory;
    this.siteService.addSite({user, url, name, category, username, pwd, note} as siteType).subscribe(site => site);
    for (let index = 0; index < this.cards.length; index++) {
      if (this.cards[index]._id === category) {
        selectedCategory = this.cards[index].name;
      }
    }
    this.router.navigate([`/detail/${selectedCategory}`]);
    this.openSnackSuccess(selectedCategory);*/
  }

  getErrorMessage() {
    /** return this.url.hasError('required') ? 'You must enter a value' :
      this.url.hasError('email') ? 'Not a valid email' : '';*/
  }
}
