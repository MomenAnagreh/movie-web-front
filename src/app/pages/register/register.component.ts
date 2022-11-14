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
import { map } from 'rxjs/operators';

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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z0-9]{4,})+([._-]?[a-zA-Z0-9]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          ),
        ],
        [this.asyncCheckEmail],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
          ),
        ],
      ],
      pwd: this.fb.group(
        {
          password: ['', [this.checkPassword(8)]],
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
          validators: [this.checkRole],
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

    return this.authService.addUser(user).subscribe();
  }

  private asyncCheckEmail = (
    control: AbstractControl
  ): Observable<ValidationErrors> | null => {
    return this.authService.checkEmail(control.value).pipe(
      map((val) => {
        if (val) {
          return { valid: true, hasemail: true };
        } else {
          return { valid: true, hasemail: false };
        }
      })
    );
  };

  private checkPassword(limitednum: number): ValidatorFn {
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

  private checkRole = (group: FormGroup): ValidationErrors | null => {
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
