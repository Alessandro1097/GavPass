import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit() {
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

}
