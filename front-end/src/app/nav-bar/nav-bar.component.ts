import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
    this.getUsername();
    this.checkUserStatus();
  }

  getUsername() {
    const currentToken = localStorage.getItem('currentUser');
    if (currentToken) {
      const currentT = JSON.parse(currentToken).user;
      this.username = currentT;
    }
  }

  checkUserStatus() {
    const currentToken = localStorage.getItem('currentUser');
    currentToken ? this.logged = true : this.logged = false;
  }
}
