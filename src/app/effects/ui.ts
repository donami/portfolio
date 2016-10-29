import { Injectable} from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AppState } from '../reducers';
import * as UIActions from '../actions/ui.actions';
import { UIService } from '../services/ui.service';

@Injectable()
export class UIEffects {
  constructor(
    private actions$: Actions,
    private svc: UIService,
  ) {};

  @Effect()
  open$ = this.actions$
    .ofType(UIActions.ActionTypes.OPEN)
    .map(action => new UIActions.OpenCompleteAction(action.payload));
}
