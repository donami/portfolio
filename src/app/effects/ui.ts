import { Injectable} from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';

import { AppState } from '../reducers';
import { UIActions } from '../actions';
import { UIService } from '../services/ui.service';

@Injectable()
export class UIEffects {
    constructor (
        private update$: StateUpdates<AppState>,
        private actions: UIActions,
        private svc: UIService,
    ) {}

    @Effect() open$ = this.update$
      .whenAction(UIActions.OPEN)
      .map(component => this.actions.openComponentComplete(component.action.payload));
}
