import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(private router: Router) { }

  getRouterSituation(): string {
    return this.router.url;
  }
}
