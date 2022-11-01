import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frequently-asked-questions',
  templateUrl: './frequently-asked-questions.component.html',
  styleUrls: ['./frequently-asked-questions.component.css'],
})
export class FrequentlyAskedQuestionsComponent implements OnInit {
  discription = {} as any;
  parentId: any;

  constructor() {}

  ngOnInit(): void {}

  show(event: any) {
    this.parentId =
      event.target.nodeName === 'BUTTON'
        ? event.target.id
        : event.target.parentElement.id;

    if (this.discription[this.parentId]) {
      this.discription[this.parentId] = !this.discription[this.parentId];
    } else {
      this.discription[this.parentId] = true;
      Object.keys(this.discription).map((key: any) => {
        if (key !== this.parentId) this.discription[key] = false;
      });
    }
  }
}
