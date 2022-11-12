import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Roles } from '../../services/intefaces/contact';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  form!: FormGroup;
  rolesEnum = Roles;
  show: boolean = false;

  get roles(): FormGroup {
    return this.form.get('roles') as FormGroup;
  }

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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

  private asyncCheckRole = (group: FormGroup): ValidationErrors | null => {
    if (!group.get('role')?.value) return { selected: false };
    return { selected: true };
  };

  changeRole() {
    this.show = true;
  }

  handleRole() {
    this.show = false;
    this.authService.upgradeRole(this.roles.value.role).subscribe();
  }

  goBack() {
    this.show = false;
  }

  deleteUser() {
    this.authService.deleteUser().subscribe((data) => {
      if (data.status === 401) {
        alert("You must be 'ADMIN' to delete this Account");
      }
    });
  }
}
