import {Component, Input, OnInit} from '@angular/core';
import {cardType} from '../type-card-container';
import {SidenavService} from '../_services/sidenav.service';
import { SidebarService } from '../_services/sidebar.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() card: cardType;
  constructor(
    public sideNavService: SidenavService,
    public sideBarService: SidebarService
  ) { }

  ngOnInit() {
  }
}
