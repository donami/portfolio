import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from './reducers';
import { MessageActions } from './actions';
import { TextActions } from './actions';
import { WorkActions } from './actions';
import { UIActions } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('mAnimation', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class AppComponent {
  messages: Observable<any>;

  constructor(
    public store: Store<AppState>,
    public workActions: WorkActions,
    public messageActions: MessageActions,
    private textActions: TextActions,
    private UIActions: UIActions
  ) {

    this.messages = store.select('messages');

    this.store.dispatch(workActions.loadWorks());
    this.store.dispatch(textActions.loadTexts());
    this.store.dispatch(UIActions.load());
  }


  closeMessage(message): void {
    this.store.dispatch(this.messageActions.deleteMessage(message));
  }
}
