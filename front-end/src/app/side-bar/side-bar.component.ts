import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  options: FormGroup;
  sidenavWidth = 70;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0
    });
  }

  ngOnInit() {
  }

  increase() {
    this.sidenavWidth = 300;
  }
  decrease() {
    this.sidenavWidth = 70;
    console.log('decrease sidenav width');
  }
}
