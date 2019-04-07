import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebarWidth: number;

  constructor() { }

  openSidebar() {
    this.sidebarWidth = 300;
  }

  closeSidebar() {
    this.sidebarWidth = 70;
  }
}
