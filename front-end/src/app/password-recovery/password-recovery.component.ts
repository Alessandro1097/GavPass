import { User } from './../_models/user';
import { UserService } from './../_services/user.service';
import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {

  constructor(
    private userService: UserService,
  ) { }
  responseEmail: User;
  userEmail = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.userEmail.hasError('required') ? 'You must enter a value' :
      this.userEmail.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    const emailUser = this.userEmail.value;
    if (this.userEmail.status !== 'INVALID') {
      this.userService.recoverEmail({ emailUser } as User).subscribe((email) => {
        this.responseEmail = email;
      });
    }
  }
}
