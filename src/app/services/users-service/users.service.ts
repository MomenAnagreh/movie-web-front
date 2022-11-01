import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../intefaces/contact';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];
  private users$ = new BehaviorSubject<User[]>(this.users);

  constructor() {}

  checkEmail(email: string) {
    let check = false;
    this.users.forEach((user: User): any => {
      if (user.email === email) {
        check = true;
      }
    });
    return check;
  }

  addUser(info: User) {
    const user = {
      username: info.username,
      email: info.email,
      password: info.password,
      role: info.role,
    };
    this.users = [...this.users, user];
    this.users$.next(this.users);
  }

  testEmail(email: string) {
    let check = false;
    this.users.forEach((user): any => {
      if (user.email === email) {
        check = true;
      }
    });
    return check;
  }

  testPassword(email: string, pass: any) {
    let check = false;
    this.users.forEach((user): any => {
      if (user.email === email) {
        if (user.password === pass) {
          check = true;
        }
      }
    });
    return check;
  }

  getSelectedUser() {
    let username = { username: '', color: '', selected: false };
    this.users.forEach((user: User) => {
      if (user.selected) {
        username.username = user.username?.toUpperCase() as string;
        username.color = user.color as string;
        username.selected = user.selected;
      }
    });
    return username;
  }

  setSelectedUser(email: string) {
    this.users.forEach((user): any => {
      if (user.email === email) {
        user.selected = true;
      }
      if (!user.color) {
        user.color =
          '#' +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')
            .toUpperCase();
      }
    });
  }

  removeSelectedUser() {
    this.users.forEach((user) => {
      user.selected = false;
    });
  }
}
