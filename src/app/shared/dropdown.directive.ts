import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

// Not using this directive because the feature is supported by the bootstrap 4 dropdown
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // binding to properties of the element the directive is placed on
  @HostBinding('class.show') isShow = false;

  // listening to a click
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    console.log(<HTMLElement> event.target);
    this.isShow = !(<HTMLElement> event.target).matches('.button') ? !this.isShow : false;
  }
  constructor(private elRef: ElementRef) {}
}
