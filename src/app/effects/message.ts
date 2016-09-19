import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';

import { AppState } from '../reducers';
import { MessageActions } from '../actions';
import { MessageService } from '../shared/message.service';


@Injectable()
export class MessageEffects {
  constructor(
    private update$: StateUpdates<AppState>,
    private messageActions: MessageActions,
    private svc: MessageService
  ) {}

  @Effect() addMessage$ = this.update$
      .whenAction(MessageActions.ADD_MESSAGE)
      .map(update => update.action.payload)
      // .switchMap(message => this.svc.addWorkObs(message))
      .map(message => this.messageActions.addMessageSuccess(message));

  @Effect() deleteMessage$ = this.update$
      .whenAction(MessageActions.DELETE_MESSAGE)
      .map(update => update.action.payload)
      // .switchMap(message => this.svc.addWorkObs(message))
      .map(message => this.messageActions.deleteMessageSuccess(message));
}
