import {Component, OnInit} from '@angular/core';
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
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUsername();
    this.getRouteSituation();
  }

  getRouteSituation() {
    switch (this.router.url) {
      case '/':
        this.rappresentativeElement = 'nelle categorie';
        break;
      case '/notes':
          this.rappresentativeElement = 'nelle note';
      break;
      default:
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
