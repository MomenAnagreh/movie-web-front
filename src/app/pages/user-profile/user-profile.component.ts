import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user = {
    username: '',
    color: '',
    selected: true,
    email: '',
    password: '',
  };

  constructor(public userService: UsersService) {
    this.user = this.userService.getSelectedUser();
  }

  ngOnInit(): void {}
}
