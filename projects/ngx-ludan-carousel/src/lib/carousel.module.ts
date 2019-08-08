import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselItemModule } from './carousel-item/carousel-item.module';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule, CarouselItemModule],
  declarations: [CarouselComponent],
  exports: [CarouselComponent, CarouselItemModule]
})
export class CarouselModule {}
