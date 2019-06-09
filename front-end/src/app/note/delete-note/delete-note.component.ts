import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from 'src/app/app.component';
import { noteType } from 'src/app/note-type';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-delete-note',
  templateUrl: './delete-note.component.html',
  styleUrls: ['./delete-note.component.css']
})
export class DeleteNoteComponent {

  categoriesNote: noteType[];

  constructor(
    public dialogRef: MatDialogRef<DeleteNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
  ) { }

  getNotes(): void {
    this.noteService.getNote().subscribe(categoriesNote => this.categoriesNote = categoriesNote);
  }

  deleteNote() {
    const _id = this.data.noteId;
    console.log(_id);
    this.noteService.deleteNote({ _id } as noteType).subscribe(categoriesNote => {
      this.getNotes();
      this.closeDialog();
    });
    this.openSnackSuccessDelete();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openSnackSuccessDelete(): void {
    const messageAddedCategory = 'Note deleted succesfully!';
    this.snackBar.open(messageAddedCategory, 'Okay!', {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

}
