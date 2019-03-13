import {Component, Input, OnInit} from '@angular/core';
import {cardType} from '../type-card-container';
import {SidenavService} from '../_services/sidenav.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() card: cardType;
  constructor(
    public sideNavService: SidenavService,
  ) { }

  ngOnInit() {
  }
}
