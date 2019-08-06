import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'ludan-carousel',
  styleUrls: ['./carousel.component.scss'],
  template: `
    <div class="wrapper">
      <div class="carousel-wrapper">
        <div class="carousel">
          <ul *ngFor="let items of batches">
            <li *ngFor="let item of items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 414.295 414.295"
                width="40px"
                height="40px"
              >
                <path
                  d="M342.804
                129.011l69.12-69.12a8 8 0 0
                0-5.36-13.68l.24.48-37.6-1.28-1.28-37.6a8 8 0 0
                0-13.68-5.36l-69.04 68.72a8 8 0 0 0-2.32 5.92v8C200.799 28.544
                88.417 49.247 31.87 131.331S-3.975 325.798 78.11 382.345c82.084
                56.547 194.467 35.844 251.014-46.24 42.471-61.651 42.471-143.122
                0-204.774h8a8.004 8.004 0 0 0 5.68-2.32zm2.4 104.8c.12
                90.928-73.495 164.737-164.423
                164.857-90.928.12-164.737-73.495-164.857-164.423-.12-90.928
                73.495-164.737 164.423-164.857a164.64 164.64 0 0 1 103.497
                36.423l.4 13.36-32 32c-45.521-39.897-114.766-35.337-154.663
                10.184-39.897 45.521-35.337 114.766 10.184 154.663 45.521 39.897
                114.766 35.337 154.663-10.184 35.846-40.9 36.279-101.899
                1.016-143.303l32-32 13.2.48a164.486 164.486 0 0 1 36.56
                102.8zm-169.76 5.36a8 8 0 0 0 11.28 0l16-16a23.993 23.993 0 0 1
                2.4 10.32c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24
                24-24c3.576.021 7.102.841 10.32 2.4l-16 16a8 8 0 0 0 0
                11.28zm27.68-39.04c-18.422-12.192-43.24-7.142-55.432
                11.28s-7.142 43.24 11.28 55.432 43.24 7.142 55.432-11.28a40 40 0
                0 0 0-44.152l37.92-37.92c33.243 39.472 28.192 98.419-11.28
                131.662-39.472 33.243-98.419
                28.192-131.662-11.28-33.243-39.472-28.192-98.419 11.28-131.662
                34.782-29.292 85.6-29.292 120.382 0l-37.92
                37.92zm97.28-85.92l-1.12-34.08 53.6-53.6.88 26.64a8 8 0 0 0 8
                8l26.64.88-53.92 53.28-34.08-1.12z"
                />
              </svg>
              <div class="text">{{ item.title }}</div>
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
  @Input() items: Array<object>;
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
