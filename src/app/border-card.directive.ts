import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmBorderCard]'
})
export class BorderCardDirective {
  constructor(private el: ElementRef) { 
    this.setBorder('#f5f5f5');
    this.setHeight(180);
  }

  @Input('pkmBorderCard') berderColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.berderColor || '#009688');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('#f5f5f5');

  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`
  }

}
