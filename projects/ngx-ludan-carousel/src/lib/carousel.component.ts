import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  selector: 'ludan-carousel',
  styleUrls: ['./carousel.component.scss'],
  template: `
    <div class="wrapper" (window:resize)="onResize($event)">
      <div class="carousel-wrapper">
        <div class="carousel">
          <ul *ngFor="let items of batches">
            <li *ngFor="let item of items">
              <ng-container
                *ngTemplateOutlet="item.carouselItem"
              ></ng-container>
            </li>
          </ul>
        </div>
      </div>

      <div
        *ngIf="batches.length > 1"
        class="arrow-left"
        (click)="slideLeft(currentItem)"
        [class.disabled]="currentItem === 0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 477.175 477.175"
          width="22px"
          height="22px"
          class="icon"
        >
          <path
            d="M145.188
          238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1
          225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3
          9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"
          />
        </svg>
      </div>

      <div
        *ngIf="batches.length > 1"
        class="arrow-right"
        (click)="slideRight(currentItem)"
        [class.disabled]="currentItem === batches.length - 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 129 129"
          width="22px"
          height="22px"
          class="icon"
        >
          <path
            d="M40.4
          121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2
          0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9
          53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"
          />
        </svg>
      </div>
    </div>
  `
})
export class CarouselComponent implements OnInit, AfterViewChecked {
  items = [];
  currentItem = 0;
  carousel: any;
  position = 0;
  increment: any;
  translation = 0;
  elementsPerSlide: number;
  batches: Array<Array<object>> = [];
  carouselWidth: number;
  carouselWrapper: any;
  carouselWrapperWidth: number;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carousel = this.elementRef.nativeElement.querySelector('.carousel');
    this.carouselWrapper = this.elementRef.nativeElement.querySelector(
      '.carousel-wrapper'
    );
  }

  addItem(item: CarouselItemComponent): void {
    this.items.push(item);
  }

  renderBatches = () => {
    const itemWidth = 130;

    // we split the items in batches
    this.elementsPerSlide = Math.floor(this.carouselWrapperWidth / itemWidth);
    this.batches = this.chunk(this.items, this.elementsPerSlide);

    // The carousel is 100 * ng batches wide
    this.carousel.style.width = 100 * this.batches.length + '%';

    this.increment = 100 / this.batches.length;

    this.changeDetectorRef.detectChanges();
  }

  setBatchSize = () => {
    const ulElements = this.elementRef.nativeElement.querySelectorAll('ul');

    // Each ul element needs to be 100 / nb batches wide.
    for (let i = 0; i < ulElements.length; i++) {
      ulElements[i].style.width = 100 / this.batches.length + '%';
    }
  }

  onResize = () => {
    // Just the fact of having this, forces ngAfterViewChecked to run
  }

  // On size changes, recalculate the bacthes
  ngAfterViewChecked() {
    if (
      this.carouselWrapper.offsetWidth !== 0 &&
      this.carouselWrapper.offsetWidth !== this.carouselWrapperWidth
    ) {
      this.carouselWrapperWidth = this.carouselWrapper.offsetWidth;

      this.renderBatches();
      this.setBatchSize();
    }
  }

  slideLeft = currentItem => {
    if (currentItem !== 0) {
      this.slide(1);
    }
  }

  slideRight = currentItem => {
    if (currentItem !== this.batches.length - 1) {
      this.slide(-1);
    }
  }

  slide = (direction: number) => {
    this.currentItem = this.currentItem - direction;
    this.translation = this.translation + direction * this.increment;
    this.carousel.style.transform = 'translateX(' + this.translation + '%)';
  }

  chunk = (arr, n) => {
    return arr
      .slice(0, ((arr.length + n - 1) / n) | 0)
      .map((c, i) => arr.slice(n * i, n * i + n));
  }
}
