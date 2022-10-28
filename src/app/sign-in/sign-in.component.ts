import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../services/intefaces/contact';
import { HomePageService } from '../services/home-page.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('pass') pass!: ElementRef<any>;

  contact: User = {};
  autharized: boolean = false;
  show: boolean = false;
  activate: boolean = false;
  noData: boolean = false;

  constructor(
    public homePageService: HomePageService,
    public userService: UsersService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.autharized = false;
    // this.activate = false;
    this.userService.users.map((user) => {
      if (
        user.email === this.contact.email &&
        user.password === this.contact.password
      ) {
        this.autharized = true;
        this.homePageService.isLoggedIn = true;
        this.userService.users.map((user) => {
          user.selected = true;
        });
      } else user.selected = false;
    });
  }

  showError() {
    if (!this.autharized && this.contact.password && this.contact.email) {
      this.activate = true;
    } else {
      this.activate = false;
    }
    if (!this.contact.password && !this.contact.email) {
      this.noData = true;
    } else {
      this.noData = false;
    }
    if (!this.contact.password && this.contact.email) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  showPass() {
    if (this.pass.nativeElement.type === 'password')
      this.pass.nativeElement.type = 'text';
    else this.pass.nativeElement.type = 'password';
  }
}
