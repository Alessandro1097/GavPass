import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SidebarService } from '../_services/sidebar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  options: FormGroup;
  sidenavWidth = 70;

  constructor(fb: FormBuilder,
    public sidebarService: SidebarService
    ) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0
    });
  }

  increase() {
    this.sidenavWidth = 300;
  }
  decrease() {
    this.sidenavWidth = 70;
  }
}
