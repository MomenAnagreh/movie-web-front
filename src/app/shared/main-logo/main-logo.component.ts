import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.css'],
})
export class MainLogoComponent implements OnInit {
  constructor(public userService: UsersService) {}

  ngOnInit(): void {}
}
