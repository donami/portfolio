import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
  // REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../reducers';
import * as MessageActions from '../../actions/message.actions';
import * as UIActions from '../../actions/ui.actions';
import { Message } from '../../shared/message';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {

  segment: {
    state: string
  };

  works: Observable<any>;
  texts: Observable<any>;
  ui$: Observable<any>;
  ui: any;

  constructor(
    private store: Store<AppState>,
    // private messageActions: MessageActions,
  ) {
    this.works = store.select('works');
    this.texts = store.select('texts');
    this.ui$ = store.select('ui');
    this.ui$.subscribe(data => {
      this.ui = data;
    });
  }

  message(data): void {
    this.store.dispatch(new MessageActions.addMessage(data));
  }

  toggleUIComponent(component): void {
    this.store.dispatch(new UIActions.OpenAction(component));
  }

}
