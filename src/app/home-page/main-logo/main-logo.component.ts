import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.css'],
})
export class MainLogoComponent implements OnInit {
  constructor(public homePageService: HomePageService) {}

  ngOnInit(): void {}
}
