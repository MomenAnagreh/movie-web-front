import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required], [this.asyncCheckEmail]],
      password: ['', [Validators.required], [this.asyncCheckPassword]],
    });

    localStorage.clear();
  }

  onSubmit(form: NgForm) {}

  onClick() {
    const user = {
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.checkEmail(user.email).subscribe((result) => {
      if (result) {
        this.authService.login(user).subscribe(
          (res) => {},
          (err) => {
            this.form.reset();
            alert('Invalid Password');
          }
        );
      } else {
        this.form.reset();
        alert('Invalid Email');
      }
    });
  }

  private asyncCheckEmail = async (control: FormControl) => {
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (regex.test(control.value)) {
      return {
        valid: true,
      };
    }
    return { valid: false };
  };

  private asyncCheckPassword = async (control: FormControl) => {
    if (control.value.length >= 8) {
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

  navigate() {
    this.router.navigate(['/signup']);
  }
}
