import { NoteService } from '../_services/note.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { SidenavService } from '../_services/sidenav.service';
import { SidebarService } from '../_services/sidebar.service';
import { noteType } from '../note-type';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../app.component';
import { FormControl, Validators } from '@angular/forms';
import { noteTypeCategories } from '../type-note-categories';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  categoriesNote: noteType[];
  collapsed = [];

  constructor(
    private noteService: NoteService,
    public sideNavService: SidenavService,
    public sideBarService: SidebarService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNote().subscribe(categoriesNote => this.categoriesNote = categoriesNote);
  }

  addNotep() {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      width: '60%',
      height: '75%',
      panelClass: 'sticky-note'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getNotes();
    });
  }

  addNoteCategories() {
    const dialogRef = this.dialog.open(AddNoteCategoriesComponent, {
      width: '60%',
      height: '40%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getNotes();
    });
  }

  deleteNote(noteId): void {
    const _id = noteId;
    this.noteService.deleteNote({ _id } as noteType).subscribe(note => note);
    this.getNotes();
    this.openSnackSuccessDelete();
  }

  openSnackSuccessDelete(): void {
    const messageAddedCategory = 'Note deleted succesfully!';
    this.snackBar.open(messageAddedCategory, 'Okay!', {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

  deleteCategory(id) {
    console.log(id);
    // this.noteService.deleteCategory({ id } as noteType).subscribe(category => category);
    this.openSnackSuccess();
  }

  openSnackSuccess(): void {
    const messageAddedCategory = 'Category successfully deleted!';
    this.snackBar.open(messageAddedCategory, 'Okay!', {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

}

@Component({
  selector: './app-add-note',
  templateUrl: './add-note.component.html',
})

export class AddNoteComponent implements OnInit {
  notes: noteType[];
  noteCategories: noteTypeCategories[];

  title = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private noteService: NoteService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getNotesCategories();
  }

  submit() {
    const currentToken = localStorage.getItem('currentUser');
    const user = JSON.parse(currentToken).user;
    const title = this.title.value.trim();
    const text = this.description.value.trim();
    const category = this.category.value.trim();
    if (title !== '' && text !== '' && category !== '') {
      this.noteService.addNote({ user, category, text, title } as noteType).subscribe(note => note);
      this.closeDialog();
      this.openSnackSuccess();
    } else {
      this.getErrorMessage();
    }
    // TODO: open the category selected
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getNotesCategories(): void {
    this.noteService.getCategoryNoteList().subscribe(noteCategories => this.noteCategories = noteCategories);
  }

  openSnackSuccess(): void {
    const messageAddedCategory = 'Note added succesfully!';
    this.snackBar.open(messageAddedCategory, 'Okay!', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }

  getErrorMessage() {
    return this.title.hasError('required') ? 'You must enter a value' :
      this.title.hasError('email') ? 'Not a valid email' : '';
  }
}

@Component({
  selector: './app-add-note-categories',
  templateUrl: './add-note-categories.component.html',
})

export class AddNoteCategoriesComponent implements OnInit {

  newCategory = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<AddNoteCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private noteService: NoteService,
  ) {
  }

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const currentToken = localStorage.getItem('currentUser');
    const user = JSON.parse(currentToken).user;
    const name = this.newCategory.value.trim();
    this.noteService.addNoteCategory({ name } as noteTypeCategories).subscribe(newCategoryName => newCategoryName);
    this.closeDialog();
  }
}
