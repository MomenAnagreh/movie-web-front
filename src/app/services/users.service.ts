import { Injectable } from '@angular/core';
import { User } from '../intefaces/contact';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users: User[] = [];
  private userFound: boolean = false;

  constructor() {}

  addUser(info: User) {
    this.userFound = false;
    this.users.map((user) => {
      if (user.email === info.email) this.userFound = true;
    });
    if (this.userFound) {
      return false;
    } else {
      this.users.push(info);
      return true;
    }
  }
}
