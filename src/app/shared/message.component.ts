import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'message',
  template: `
    <div class="ui {{ type }} message">
      <i class="close icon" (click)="closeMessage()"></i>
      <div class="header">
        {{ title }}
      </div>
      <p>{{ message }}</p>
    </div>
  `
})
export class MessageComponent {
  @Input() title: string;
  @Input() type: string;
  @Input() message: string;
  @Output() closeClickFire = new EventEmitter();

  constructor() {}

  closeMessage(): void {
    this.closeClickFire.emit({});
  }
}
