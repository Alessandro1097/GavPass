import { User } from './../_models/user';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {

  constructor(
    private userService: UserService
  ) { }
  responseEmail: User;
  userEmail = new FormControl('', [Validators.required]);

  onSubmit() {
    const emailUser = this.userEmail.value;
    if (emailUser !== '' && emailUser !== null) {
      this.userService.recoverEmail({ emailUser } as User).subscribe((email) => {
        this.responseEmail = email;
      });
    }
  }
}
