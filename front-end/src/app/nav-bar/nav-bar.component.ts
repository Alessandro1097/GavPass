import { NavBarService } from './../_services/nav-bar.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router, Event } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public username;
  public rappresentativeElement;
  private observerRouter: Subscription;

  constructor(
    private router: Router,
    private navBarService: NavBarService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // observable on router
    this.observerRouter = this.router.events.subscribe(
      () => {
        this.getRouteSituation();
      }
    );
    this.getUsername();
  }

  ngOnDestroy() {
    this.observerRouter.unsubscribe();
  }

  getUsername() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.user;
  }

  getRouteSituation() {
    const url = this.router.url;
    switch (url) {
      case '/cards':
        if (url) {}
        this.rappresentativeElement = 'nelle categorie';
        break;
      case '/notes':
          this.rappresentativeElement = 'nelle note';
      break;
      default:
        this.rappresentativeElement = 'nei siti';
      break;
    }
  }

}
