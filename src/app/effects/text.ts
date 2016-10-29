import { Injectable} from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { AppState } from '../reducers';
import * as TextActions from '../actions/text.actions';
import { TextService } from '../shared/text.service';

@Injectable()
export class TextEffects {
  constructor(
    private actions$: Actions,
    private svc: TextService,
  ) {};

  @Effect()
  loadTexts$ = this.actions$
    .ofType(TextActions.ActionTypes.LOAD)
    .switchMap(() => this.svc.getTextList())
    .map(text => new TextActions.loadTextsSuccess(text));

  @Effect()
  getText$ = this.actions$
    .ofType(TextActions.ActionTypes.GET)
    .map<string>(toPayload)
    .switchMap(id => this.svc.getText(id))
    .map(text => new TextActions.getTextSuccess(text));


  @Effect()
  saveText$ = this.actions$
    .ofType(TextActions.ActionTypes.SAVE)
    .map(action => action.payload)
    .switchMap(text => this.svc.saveText(text))
    .map(text => new TextActions.saveTextSuccess(text));

  @Effect()
  addText$ = this.actions$
    .ofType(TextActions.ActionTypes.ADD)
    .map(action => action.payload)
    .switchMap(text => this.svc.addText(text))
    .map(text => new TextActions.addTextSuccess(text));

  @Effect()
  deleteText$ = this.actions$
    .ofType(TextActions.ActionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(text => this.svc.deleteText(text))
    .map(text => new TextActions.deleteTextSuccess(text));
}
