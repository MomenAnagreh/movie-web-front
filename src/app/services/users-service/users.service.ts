import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../intefaces/contact';
import { Movie } from '../intefaces/movies';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];
  private users$ = new BehaviorSubject<User[]>(this.users);

  private wishList: Movie[] = [];
  private wishList$ = new BehaviorSubject<Movie[]>(this.wishList);
  wishListMovies$ = this.wishList$.asObservable();

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
      wishlist: [],
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
    let selectedUser = {
      username: '',
      color: '',
      selected: false,
      email: '',
      password: '',
    };
    this.users.forEach((user: User) => {
      if (user.selected) {
        selectedUser.username = user.username?.toUpperCase() as string;
        selectedUser.color = user.color as string;
        selectedUser.selected = user.selected;
        selectedUser.email = user.email as string;
        selectedUser.password = user.password;
      }
    });
    return selectedUser;
  }

  setSelectedUser(email: string) {
    this.users.forEach((user): any => {
      if (user.email === email) {
        user.selected = true;
        if (!user.color) {
          user.color =
            '#' +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, '0')
              .toUpperCase();
        }
        this.wishList = user.wishlist as Movie[];
        this.wishList$.next(this.wishList);
      } else {
        user.selected = false;
      }
    });
  }

  removeSelectedUser() {
    this.users.forEach((user) => {
      user.selected = false;
    });
  }

  addToWishList(movie: Movie) {
    this.users.forEach((user): any => {
      if (user.email === this.getSelectedUser().email) {
        user.wishlist?.push(movie);
        this.wishList = user.wishlist as Movie[];
        this.wishList$.next(this.wishList);
      }
    });
  }

  removeFromWishList(id: number) {
    this.users.forEach((user): any => {
      if (user.email === this.getSelectedUser().email) {
        user.wishlist = user.wishlist?.filter((item) => item.id !== id);
        this.wishList = user.wishlist as Movie[];
        this.wishList$.next(this.wishList);
      }
    });
  }
}
