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
import * as MessageActions from './actions/message.actions';
import * as TextActions from './actions/text.actions';
import * as WorkActions from './actions/work.actions';
// import { UIActions } from './actions';
import * as UIActions from './actions/ui.actions';

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
    // public workActions: WorkActions,
    // public messageActions: MessageActions,
    // private textActions: TextActions,
    // private UIActions: UIActions
  ) {

    this.messages = store.select('messages');

    this.store.dispatch(new WorkActions.loadWorks());
    this.store.dispatch(new TextActions.loadTexts());
  }


  closeMessage(message): void {
    this.store.dispatch(new MessageActions.deleteMessage(message));
  }
}
