import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../_services/sidenav.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private username;
  opened: boolean;
  events: string[] = [];
  logged: boolean;

  constructor(
    public sideNavService: SidenavService,
  ) {}

  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    const currentToken = localStorage.getItem('currentUser');
    if (currentToken) {
      const currentT = JSON.parse(currentToken).user;
      this.username = currentT;
      this.logged = true;
    } else {
      this.logged = false;
    }
  }
}
