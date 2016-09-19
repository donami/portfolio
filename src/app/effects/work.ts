import { Injectable} from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';

import { AppState } from '../reducers';
import { WorkActions } from '../actions';
import { WorkService } from '../services/work.service';

@Injectable()
export class WorkEffects {
    constructor (
        private update$: StateUpdates<AppState>,
        private workActions: WorkActions,
        private svc: WorkService,
    ) {}

    @Effect() loadWorks$ = this.update$
        .whenAction(WorkActions.LOAD_WORKS)
        .switchMap(() => this.svc.getAllWorks())
        .map(works => this.workActions.loadWorksSuccess(works));

    // @Effect() getWork$ = this.update$
    //     .whenAction(WorkActions.GET_WORK)
    //     .map<string>(toPayload)
    //     .switchMap(id => this.svc.getWork(id))
    //     .map(work => this.workActions.getWorkSuccess(work));
    //
    @Effect() saveWork$ = this.update$
        .whenAction(WorkActions.SAVE_WORK)
        .map(update => update.action.payload)
        .switchMap(work => this.svc.saveWork(work))
        .map(work => this.workActions.saveWorkSuccess(work));

    @Effect() addWork$ = this.update$
        .whenAction(WorkActions.ADD_WORK)
        .map(update => update.action.payload)
        .switchMap(work => this.svc.addWorkObs(work))
        .map(work => this.workActions.addWorkSuccess(work));

    @Effect() deleteWork$ = this.update$
        .whenAction(WorkActions.DELETE_WORK)
        .map(update => update.action.payload)
        .switchMap(work => this.svc.deleteWork(work))
        .map(work => this.workActions.deleteWorkSuccess(work));
}
