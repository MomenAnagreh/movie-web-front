import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('pass') pass!: ElementRef<any>;
  form!: FormGroup;
  showPassword: boolean = false;

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(private userService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required], [this.asyncCheckEmail]],
      password: ['', [Validators.required], [this.asyncCheckPassword]],
    });
  }

  onSubmit(form: NgForm) {}

  onClick() {
    this.userService.setSelectedUser(this.email.value);
  }

  private asyncCheckEmail = async (control: FormControl) => {
    if (this.userService.testEmail(control.value)) {
      return {
        valid: true,
      };
    }
    return { valid: false };
  };

  private asyncCheckPassword = async (control: FormControl) => {
    if (this.userService.testPassword(this.email.value, control.value)) {
      return {
        valid: true,
      };
    }
    return { valid: false };
  };

  showPass() {
    if (this.pass.nativeElement.type === 'password') {
      this.pass.nativeElement.type = 'text';
      this.showPassword = true;
    } else {
      this.showPassword = false;
      this.pass.nativeElement.type = 'password';
    }
  }
}
