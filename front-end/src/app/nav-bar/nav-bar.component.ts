import {Component, OnInit} from '@angular/core';
import {SidenavService} from '../_services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public username;
  public rappresentativeElement;
  logged: boolean;

  constructor(
    public sideNavService: SidenavService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUsername();
    this.getRouteSituation();
  }

  getRouteSituation() {
    const route = this.router.url;
    switch (this.router.url) {
      case '/':
        console.log('siamo nelle categorie');
        this.rappresentativeElement = 'nelle categorie';
        break;
      case '/notes':
          console.log('siamo nelle note');
          this.rappresentativeElement = 'nelle note';
      break;
      default:
        console.log('siamo nei siti');
        this.rappresentativeElement = 'nei siti';
    }
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
