import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <ludan-carousel [items]="widgets"></ludan-carousel>
  `
})
export class AppComponent implements OnInit {
  widgets: Array<object>;

  ngOnInit() {
    this.widgets = this.generateWidgets(30);
  }

  generateWidgets = (num: number) => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push({ title: 'Widget' + i });
    }
    return result;
  }
}
