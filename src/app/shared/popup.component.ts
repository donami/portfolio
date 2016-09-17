import { Component, Input } from '@angular/core';

@Component({
  selector: 'popup',
  template: `
    <div class="ui message">
      <div class="header">
        {{ title }}
      </div>

      <p>
        <ng-content></ng-content>
      </p>
    </div>
  `
})
export class PopupComponent {

  @Input() title: string;

  constructor() {}
}
