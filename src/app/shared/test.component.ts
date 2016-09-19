import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'testComponent',
  template: `
    <div (click)="fireEvent()">hej</div>
  `
})
export class TestComponent {
  @Output() myOutput = new EventEmitter();
  constructor() {}

  fireEvent(): void {
    this.myOutput.emit({'markus': 'hej'});
  }
}
