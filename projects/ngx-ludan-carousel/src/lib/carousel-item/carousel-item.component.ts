import { Component, ViewChild } from '@angular/core';
import { CarouselComponent } from './../carousel.component';

@Component({
  selector: 'ludan-carousel-item',
  styleUrls: ['carousel-item.component.scss'],
  template: `
    <ng-template #carouselItem>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class CarouselItemComponent {
  constructor(private carousel: CarouselComponent) {
    this.carousel.addItem(this);
  }
  @ViewChild('carouselItem', { static: false }) carouselItem: any;
}
