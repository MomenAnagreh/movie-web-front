import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../intefaces/contact';
import { HomePageService } from '../services/home-page.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('pass') pass!: ElementRef<any>;
  contact: User = {};
  show: boolean = false;
  activate: boolean = false;

  constructor(
    public userService: UsersService,
    public homePageService: HomePageService
  ) {
    console.log(userService.users);
  }

  ngOnInit(): void {}

  onHover(form: NgForm) {
    this.show = false;
    if (!this.userService.addUser(this.contact)) {
      this.show = true;
    } else {
      this.activate = false;
      this.homePageService.isLoggedIn = true;
      this.userService.users.map((user) => {
        if (user.email === this.contact.email) user.selected = true;
        else user.selected = false;
      });
    }
  }

  onClick() {
    if (this.show && this.contact.email) this.activate = true;
    else {
      this.activate = false;
    }
    console.log(this.userService.users);
  }

  showPass() {
    if (this.pass.nativeElement.type === 'password')
      this.pass.nativeElement.type = 'text';
    else this.pass.nativeElement.type = 'password';
  }
}
