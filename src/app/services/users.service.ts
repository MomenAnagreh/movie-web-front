import { Injectable } from '@angular/core';
import { User } from './intefaces/contact';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];

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

    this.users.push(user);
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
    let username = { username: '', color: '' };
    this.users.forEach((user: User) => {
      if (user.selected) {
        username.username = user.username?.toUpperCase() as string;
        username.color = user.color as string;
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
