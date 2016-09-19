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
  REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../reducers';
import { MessageActions } from '../../actions';
import { Message } from '../../shared/message';
import { LoginComponent } from '../../components/login/login.component';

import { FormEditWorkComponent } from './forms/formEditWork.component';
import { FormEditTextComponent } from './forms/formEditText.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  directives: [
    FormEditWorkComponent,
    FormEditTextComponent,
    REACTIVE_FORM_DIRECTIVES
  ],
})
export class AdminComponent {

  segment: {
    state: string
  };

  works: Observable<any>;
  texts: Observable<any>;

  constructor(private store: Store<AppState>, private messageActions: MessageActions) {
    this.works = store.select('works');
    this.texts = store.select('texts');
  }

  message(data): void {
    this.store.dispatch(this.messageActions.addMessage(data));
  }

}
