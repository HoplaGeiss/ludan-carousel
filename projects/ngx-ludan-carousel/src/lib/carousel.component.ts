import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

const ICON_WIDTH = 40;
const ITEM_WIDTH = 130;

@Component({
  selector: 'ludan-carousel',
  styleUrls: ['./carousel.component.scss'],
  template: `
    <div class="wrapper" (window:resize)="onResize()">
      <div class="carousel-wrapper">
        <div class="carousel">
          <ul>
            <li
              *ngFor="let item of items; let i = index"
              (click)="translateToItem(i)"
            >
              <ng-container
                *ngTemplateOutlet="item.carouselItem"
              ></ng-container>
            </li>
          </ul>
        </div>
      </div>

      <div
        *ngIf="slideNumber > 1"
        class="arrow-left"
        (click)="slideLeft()"
        [class.disabled]="translation === 0"
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
        *ngIf="slideNumber > 1"
        class="arrow-right"
        (click)="slideRight()"
        [class.disabled]="currentSlide === slideNumber - 1"
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
  items: CarouselItemComponent[] = [];
  currentSlide = 0;
  carousel: HTMLElement;
  translation = 0;
  elementsPerSlide: number;
  slideNumber: number;
  carouselWrapper: HTMLElement;
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
    this.elementsPerSlide = Math.floor(this.carouselWrapperWidth / ITEM_WIDTH);
    this.slideNumber = Math.ceil(this.items.length / this.elementsPerSlide);

    // The carousel is 100 * ng batches wide
    this.carousel.style.width = 100 * this.slideNumber + '%';
    this.changeDetectorRef.detectChanges();
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
      this.carouselWrapperWidth =
        this.carouselWrapper.offsetWidth - 2 * ICON_WIDTH;

      this.renderBatches();
    }
  }

  slideLeft = () => {
    this.slide(1);
  }

  slideRight = () => {
    if (this.currentSlide !== this.slideNumber - 1) this.slide(-1);
  }

  slide = (direction: number) => {
    this.currentSlide = this.currentSlide - direction;
    if (this.currentSlide < 0) this.currentSlide = 0;
    this.translation = -this.currentSlide * this.elementsPerSlide * ITEM_WIDTH;
    this.carousel.style.transform = 'translateX(' + this.translation + 'px)';
  }

  translateToItem = (index: number) => {
    this.translation = -(index * ITEM_WIDTH);
    this.currentSlide = Math.floor(index / this.elementsPerSlide);
    this.carousel.style.transform = 'translateX(' + this.translation + 'px)';
  }
}
