import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from 'src/app/app.component';
import { noteType } from 'src/app/note-type';
import { NoteService } from 'src/app/_services/note.service';
import { noteTypeCategories } from 'src/app/type-note-categories';

@Component({
  selector: 'app-delete-note',
  templateUrl: './delete-note-category.component.html',
  styleUrls: ['./delete-note-category.component.css']
})
export class DeleteNoteComponent implements OnInit {

  categoriesNote: noteType[];

  constructor(
    public dialogRef: MatDialogRef<DeleteNoteComponent>,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  getNotes(): void {
    this.noteService.getNote().subscribe(categoriesNote => this.categoriesNote = categoriesNote);
  }

  deleteCategoryNote(): void {
    console.log(this);
     const _id = this.data.categoryId;
     this.noteService.deleteCategoryNote({ _id } as noteTypeCategories).subscribe(categoriesNote => {
      this.getNotes();
      this.closeDialog();
  });
    this.openSnackSuccessDelete();
  }

  openSnackSuccessDelete(): void {
    const messageAddedCategory = 'Note deleted succesfully!';
    this.snackBar.open(messageAddedCategory, 'Okay!', {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
