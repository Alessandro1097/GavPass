import { noteTypeCategories } from '../type-note-categories';
import { NoteService } from '../_services/note.service';
import {Component, Input, OnInit} from '@angular/core';
import {cardType} from '../type-card-container';
import {SidenavService} from '../_services/sidenav.service';
import { SidebarService } from '../_services/sidebar.service';
import { noteType } from '../_services/note-type';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  note: noteType[];
  noteCategoies: noteTypeCategories[];
  noteNames: noteTypeCategories[];

  constructor(
    private noteService: NoteService,
    public sideNavService: SidenavService,
    public sideBarService: SidebarService
  ) { }

  ngOnInit() {
    this.getNotes();
    this.getNotesName();
    this.getNotesCategories();
  }

  getNotesCategories(): void {
    this.noteService.getNote().subscribe(notes => this.note = notes);
  }

  getNotes(): void {
    this.noteService.getCategoryNoteList().subscribe(noteCategoies => this.noteCategoies = noteCategoies);
  }

  getNotesName(): void {
    this.noteService.getNoteName().subscribe(noteName => this.noteNames = noteName);
  }

  get datae() { return JSON.stringify(this.noteCategoies); }
  get data() { return JSON.stringify(this.noteNames); }
  get piru() { return JSON.stringify(this.note); }
}
