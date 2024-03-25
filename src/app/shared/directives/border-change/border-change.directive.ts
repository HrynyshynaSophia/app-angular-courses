import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
const FRESH_COURSE_PERIOD = 14; //days
const FRESH_COURSE_BORDER_CLASS = 'border-fresh';
const UPCOMING_COURSE_BORDER_CLASS = 'border-upcoming';

@Directive({
  selector: '[appBorderChange]',
})
export class BorderChangeDirective implements AfterViewInit {
  @Input('appBorderChange') public date!: string;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.changeBorder();
  }

  private changeBorder() {
    const currentDate: Date = new Date();
    const creationDate: Date = new Date(this.date);
    if (
      creationDate < currentDate &&
      creationDate >= new Date(currentDate.getDate() - FRESH_COURSE_PERIOD)
    ) {
      this.el.nativeElement.classList.add(FRESH_COURSE_BORDER_CLASS);
    } else if (creationDate > currentDate) {
      this.el.nativeElement.classList.add(UPCOMING_COURSE_BORDER_CLASS);
    }
  }
}
