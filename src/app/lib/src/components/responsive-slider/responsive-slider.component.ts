import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Renderer2 } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'aps-responsive-slider',
  templateUrl: './responsive-slider.component.html',
  styleUrls: ['./responsive-slider.component.less']
})
export class ResponsiveSliderComponent extends SliderComponent implements OnInit {

  @ViewChild('sliderHandle') sliderHandle: ElementRef;
  private isDragging: boolean;
  private handleCursorOffset: number;

  @Output()
  public valueChanged: EventEmitter<number> = new EventEmitter();

  private renderer2: Renderer2;
  private mouseMoveListener: () => void;
  private mouseUpListener: () => void;
  private touchMoveListener: () => void;
  private touchEndListener: () => void;

  constructor(renderer2: Renderer2, elRef: ElementRef) {
    super(elRef);
    this.renderer2 = renderer2;
  }

  ngOnInit() {
    super.ngOnInit();

    this.isDragging = false;

    if (!this.initialValue) {
      this.initialValue = this.minValue;
    }

    if (this.initialValue > this.maxValue) {
      this.initialValue = this.maxValue;
    } else if (this.initialValue < this.minValue) {
      this.initialValue = this.minValue;
    }

    setTimeout(() => {
        this.valueChanged.emit(this.initialValue);
    });
  }

  onHandleMouseDown(event: MouseEvent) {
    this.mouseMoveListener = this.renderer2.listen('document', 'mousemove', (evt: MouseEvent) => {
      this.onMouseMove(evt);
    });

    this.mouseUpListener = this.renderer2.listen('document', 'mouseup', (evt: MouseEvent) => {
      this.onMouseUp();
    });

    this.dragStart(event.offsetX);
  }

  onHandleTouch(event: TouchEvent) {
    event.preventDefault();

    this.touchMoveListener = this.renderer2.listen('document', 'touchmove', (evt: TouchEvent) => {
      this.onTouchMove(evt);
    });

    this.touchEndListener = this.renderer2.listen('document', 'touchend', (evt: TouchEvent) => {
      this.onMouseUp();
    });

    const offsetX = event.touches ? (event.touches[0].clientX - this.handleLeft) : -1;
    this.dragStart(offsetX);
  }

  onTrackMouseDown(event: MouseEvent) {
    this.mouseMoveListener = this.renderer2.listen('document', 'mousemove', (evt: MouseEvent) => {
      this.onMouseMove(evt);
    });

    this.mouseUpListener = this.renderer2.listen('document', 'mouseup', (evt: MouseEvent) => {
      this.onMouseUp();
    });

    this.isDragging = true;
    this.handleCursorOffset = 0;
    this.mouseDownX = event.clientX;
    this.handleLeft = this.mouseDownX - (this.handleWidth / 2) - this.leftPos;
    this.handleLeftCss = this.handleLeft + 'px';

    const calculatedValue = (this.mouseDownX - this.leftPos) * this.conversionFactor;
    this.valueChanged.emit(calculatedValue);
  }

  onTrackTouch(event: TouchEvent) {
    event.preventDefault();

    this.touchMoveListener = this.renderer2.listen('document', 'touchmove', (evt: TouchEvent) => {
      this.onTouchMove(evt);
    });

    this.touchEndListener = this.renderer2.listen('document', 'touchend', (evt: TouchEvent) => {
      this.onMouseUp();
    });

    this.isDragging = true;
    this.handleCursorOffset = 0;
    this.mouseDownX = event.touches[0].clientX;
    this.handleLeft = this.mouseDownX - (this.handleWidth / 2) - this.leftPos;
    this.handleLeftCss = this.handleLeft + 'px';

    const calculatedValue = (this.mouseDownX - this.leftPos) * this.conversionFactor;
    this.valueChanged.emit(calculatedValue);
  }

  private onMouseUp(): void {
    this.isDragging = false;

    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }

    if (this.mouseUpListener) {
      this.mouseUpListener();
    }
  }

  private onMouseMove(event: MouseEvent): void {
    this.updateSlider(event.clientX);
  }

  private onTouchMove(event: TouchEvent) {
    const xPos = event.touches ? event.touches[0].clientX : -1;
    this.updateSlider(xPos);
  }

  private updateSlider(mouseX: number): void {
    if (this.isDragging) {
      if (mouseX < 0) {
        return;
      }

      if (mouseX > (this.rightPos + this.handleCursorOffset)) {
        mouseX = this.rightPos + this.handleCursorOffset;
      } else if (mouseX < (this.leftPos + this.handleCursorOffset)) {
        mouseX = this.leftPos + this.handleCursorOffset;
      }

      const handleToLeftDiff = mouseX - this.leftPos - this.handleCursorOffset;
      let calculatedValue = (handleToLeftDiff * this.conversionFactor) + this.minValue;

      if (calculatedValue > this.maxValue) {
        calculatedValue = this.maxValue;
      } else if (calculatedValue < this.minValue) {
          calculatedValue = this.minValue;
      }

      this.valueChanged.emit(calculatedValue); // TODO only emit if value is different to previous one?

      this.updateHandleHorizontalOffset(handleToLeftDiff);
    }
  }

  private dragStart(offsetX: number) {
    if (offsetX < 0) {
      return;
    }

    this.isDragging = true;
    this.handleCursorOffset = offsetX - (this.handleWidth / 2);
  }
}
