import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  submitted = false;
  email = new FormControl('', [Validators.required]);
  pwd = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    const email = this.email.value.trim();
    const pwd = this.pwd.value.trim();
    const phone = this.phone.value.trim();
    const role = "user";

    this.userService.createUser({ email, pwd, phone, role} as User).subscribe(user => user);
    console.log('Aggiunto!');
  }

  // API to insert user: email, pwd, phone, role

}
