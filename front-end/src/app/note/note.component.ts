import { noteTypeCategories } from '../type-note-categories';
import { NoteService } from '../_services/note.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { cardType } from '../type-card-container';
import { SidenavService } from '../_services/sidenav.service';
import { SidebarService } from '../_services/sidebar.service';
import { noteType } from '../note-type';
import { AddSiteComponent } from '../card/card.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../app.component';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  categoriesNote: noteTypeCategories[];
  collapsed = [];

  constructor(
    private noteService: NoteService,
    public sideNavService: SidenavService,
    public sideBarService: SidebarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNote().subscribe(categoriesNote => this.categoriesNote = categoriesNote);
  }

  get data() { return JSON.stringify(this.categoriesNote); }

  addNote() {
    const dialogRef = this.dialog.open(AddNoteComponent, {
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

export class AddNoteComponent implements OnInit {
  @Input() card: cardType;
  notes: noteType[];
  noteCategories: noteTypeCategories[];

  title = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private cardService: CardService,
    // private siteService: SiteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private noteService: NoteService
  ) {
  }

  ngOnInit() {
    this.getNotesCategories();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getNotesCategories(): void {
    this.noteService.getCategoryNoteList().subscribe(noteCategories => this.noteCategories = noteCategories);
  }

  openSnackSuccess(): void {
    const messageAddedCategory = 'Site added to: ';
    this.snackBar.open(messageAddedCategory, 'Okay!', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }

   onSubmit() {
    const currentToken = localStorage.getItem('currentUser');
    const user = JSON.parse(currentToken).user;
    const title = this.title.value.trim();
    const text = this.description.value.trim();
    const category = this.category.value.trim();
    console.log(user, title, text, category);
    this.noteService.addNote({user, category, text, title} as noteType).subscribe(note => note);
    this.openSnackSuccess();
  }

  getErrorMessage() {
    return this.title.hasError('required') ? 'You must enter a value' :
      this.title.hasError('email') ? 'Not a valid email' : '';
  }
}
