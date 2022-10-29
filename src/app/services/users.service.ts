import { Injectable } from '@angular/core';
import { User } from './intefaces/contact';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];
  private isLoggedIn: boolean = false;

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
    let username = '';
    this.users.forEach((user: User) => {
      if (user.selected) username = user.username as string;
    });
    return username;
  }

  setSelectedUser(email: string) {
    this.users.forEach((user): any => {
      if (user.email === email) user.selected = true;
    });
  }

  removeSelectedUser() {
    this.users.forEach((user) => {
      user.selected = false;
    });
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }
}
