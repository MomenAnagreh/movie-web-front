import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.css'],
})
export class MainLogoComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
