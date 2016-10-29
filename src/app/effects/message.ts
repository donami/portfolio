import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppState } from '../reducers';
import * as MessageActions from '../actions/message.actions';
import { MessageService } from '../shared/message.service';


@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private svc: MessageService
  ) {}

  @Effect()
  addMessage$ = this.actions$
    .ofType(MessageActions.ActionTypes.ADD)
    .map(action => action.payload)
    .map(message => new MessageActions.addMessageSuccess(message));

  @Effect()
  deleteMessage$ = this.actions$
    .ofType(MessageActions.ActionTypes.DELETE)
    .map(action => action.payload)
    .map(message => new MessageActions.deleteMessageSuccess(message));
}
