import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HomePageService } from '../services/home-page.service';
import { UsersService } from '../services/users.service';

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

  constructor(
    public userService: UsersService,
    public homePageService: HomePageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required], [this.asyncCheckEmail]],
      username: ['', [Validators.required], [this.asyncCheckUsername]],
      pwd: this.fb.group(
        {
          password: ['', [this.minlen(8)]],
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

  onSubmit() {
    console.log(this.form.value);
  }

  onClick() {
    const user = {
      username: this.username.value,
      email: this.email.value,
      password: this.pwd.get('password')?.value,
      role: this.roles.get('role')?.value,
    };
    this.userService.addUser(user);
  }

  private asyncCheckEmail = async (control: FormControl) => {
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (regex.test(control.value)) {
      if (this.userService.checkEmail(control.value)) {
        return {
          valid: true,
          hasemail: true,
        };
      } else {
        return {
          valid: true,
          hasemail: false,
        };
      }
    } else {
      return {
        valid: false,
        hasemail: false,
      };
    }
  };

  private asyncCheckUsername = async (control: FormControl) => {
    let regex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

    if (regex.test(control.value) && control.value.length >= 8) {
      return {
        valid: true,
      };
    } else {
      return {
        valid: false,
      };
    }
  };

  private minlen(limitednum: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      if (control.value.length < limitednum) {
        return {
          minlen: true,
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

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

enum Roles {
  User,
  Admin,
  Super,
}
