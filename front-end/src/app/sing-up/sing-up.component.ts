import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {
  submitted = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  pwd = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    this.submitted = true;
    const email = this.email.value.trim();
    const pwd = this.pwd.value.trim();
    const phone = this.phone.value.trim();
    const role = 'user';
    if (this.email.status !== 'INVALID' && pwd && phone) {
      this.userService.createUser({ email, pwd, phone, role} as User).subscribe(user => user);
      this.router.navigate([`/login`]);
      // aggiungere un messaggio che dica che la registrazione è andata a buon fine e di controllare la mail
    }
  }

}
