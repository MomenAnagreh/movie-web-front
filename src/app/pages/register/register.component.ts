import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Roles } from '../../services/intefaces/contact';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('pass') pass!: ElementRef<any>;
  @ViewChild('conf') conf!: ElementRef<any>;
  form!: FormGroup;
  pwdNotMatch = 'pwdNotMatch';
  rolesEnum = Roles;

  showPassword: boolean = false;

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get pwd(): FormGroup {
    return this.form.get('pwd') as FormGroup;
  }

  get roles(): FormGroup {
    return this.form.get('roles') as FormGroup;
  }

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required], [this.asyncCheckEmail]],
      username: ['', [Validators.required], [this.asyncCheckUsername]],
      pwd: this.fb.group(
        {
          password: ['', [this.asyncCheckPassword(8)]],
          confirm: [''],
        },
        {
          validators: [this.matchPwd],
        }
      ),
      roles: this.fb.group(
        {
          role: ['', [Validators.required]],
        },
        {
          validators: [this.asyncCheckRole],
        }
      ),
    });
  }

  onSubmit() {}

  onClick() {
    const user = {
      username: this.username.value,
      email: this.email.value,
      password: this.pwd.get('password')?.value,
      role: this.roles.get('role')?.value,
    };
    this.authService.checkEmail(user.email).subscribe((result) => {
      if (result) {
        this.email.reset();
        alert('Email Already Exist');
      } else {
        this.authService.addUser(user).subscribe();
      }
    });
  }

  private asyncCheckEmail = (
    control: AbstractControl
  ): Observable<ValidationErrors> | null => {
    let regex =
      /^([a-zA-Z0-9]{4,})+([._-]?[a-zA-Z0-9]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (regex.test(control.value)) {
      return of({
        valid: true,
      });
    }
    return of({ valid: false });
  };

  private asyncCheckUsername = (
    control: AbstractControl
  ): Observable<ValidationErrors> | null => {
    let regex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

    if (regex.test(control.value) && control.value.length >= 8) {
      return of({
        valid: true,
      });
    } else {
      return of({
        valid: false,
      });
    }
  };

  private asyncCheckPassword(limitednum: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (!regex.test(control.value)) {
        return {
          valid: true,
          requiredLength: limitednum,
        };
      }
      return null;
    };
  }

  private matchPwd = (group: FormGroup): ValidationErrors | null => {
    const pwdval = group.get('password')?.value;
    const cfmval = group.get('confirm')?.value;

    if (pwdval !== cfmval) {
      return { [this.pwdNotMatch]: true };
    }
    return null;
  };

  private asyncCheckRole = (group: FormGroup): ValidationErrors | null => {
    if (!group.get('role')?.value) return { selected: false };
    return { selected: true };
  };

  showPass() {
    if (this.pass.nativeElement.type === 'password') {
      this.pass.nativeElement.type = 'text';
      this.conf.nativeElement.type = 'text';
      this.showPassword = true;
    } else {
      this.showPassword = false;
      this.pass.nativeElement.type = 'password';
      this.conf.nativeElement.type = 'password';
    }
  }
}
