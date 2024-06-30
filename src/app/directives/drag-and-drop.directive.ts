import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  stateStyle = {
    'border': 'dashed 2px grey'
  }

  @Output() stateStyleEmitter: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  @HostListener('dragover', ['$event'])
  @HostListener('mouseover', ['$event'])
  changeStateActive() {
    this.stateStyle = {
      'border': 'dashed 2px #28be53'
    }
    this.stateStyleEmitter.emit(this.stateStyle);
  }

  @HostListener('dragleave', ['$event'])
  @HostListener('mouseleave', ['$event'])
  changeStateInactive() {
    this.stateStyle = {
      'border': 'dashed 2px grey'
    }

    this.stateStyleEmitter.emit(this.stateStyle);
  }
}
