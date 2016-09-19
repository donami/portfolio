import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'message',
  template: `
    <div class="ui {{ data.type }} message">
      <i class="close icon" (click)="closeMessage()"></i>
      <div class="header">
        {{ data.title }}
      </div>
      <p>{{ data.message }}</p>
    </div>
  `,
})
export class MessageComponent implements OnInit{
  @Input() title: string;
  @Input() type: string;
  @Input() message: string;
  @Input() index: number;
  @Output() closeClickFire = new EventEmitter();

  data: Message;
  state: string;

  constructor() {}

  ngOnInit() {
    this.data = new Message(this.title, this.message, this.type);
    this.state = 'active';
  }

  closeMessage(): void {
    this.state = 'inactive';
    this.closeClickFire.emit(this.index);
  }
}
