import {Component, OnInit} from '@angular/core';
import {SidenavService} from '../_services/sidenav.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public username;
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
      this.username = JSON.parse(currentToken).user;
      this.logged = true;
    } else {
      this.logged = false;
    }
  }
}
