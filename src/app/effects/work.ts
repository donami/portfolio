import { Injectable} from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs';

import { AppState } from '../reducers';
import * as WorkActions from '../actions/work.actions';
import { WorkService } from '../services/work.service';

@Injectable()
export class WorkEffects {
  constructor(
    private actions$: Actions,
    private svc: WorkService,
  ) {};

  @Effect()
  loadWorks$ = this.actions$
    .ofType(WorkActions.ActionTypes.LOAD)
    .switchMap(() => this.svc.getAllWorks())
    .map(works => new WorkActions.loadWorksSuccess(works));


  @Effect()
  getWork$ = this.actions$
    .ofType(WorkActions.ActionTypes.GET)
    .map<string>(toPayload)
    .switchMap((id) => this.svc.getWork(id)
      .map((work => new WorkActions.getWorkSuccess(work)))
      .catch( () => Observable.of(new WorkActions.getWorkFail()))
    );

  @Effect()
  getWorkFail = this.actions$
    .ofType(WorkActions.ActionTypes.GET_FAIL)
    .map(() => go(['/404']));

  @Effect()
  saveWork$ = this.actions$
      .ofType(WorkActions.ActionTypes.SAVE)
      .map(action => action.payload)
      .switchMap(work => this.svc.saveWork(work))
      .map(work => new WorkActions.saveWorkSuccess(work));

  @Effect()
  addWork$ = this.actions$
      .ofType(WorkActions.ActionTypes.ADD)
      .map(action => action.payload)
      .switchMap(work => this.svc.addWorkObs(work))
      .map(work => new WorkActions.addWorkSuccess(work));

  @Effect()
  deleteWork$ = this.actions$
      .ofType(WorkActions.ActionTypes.DELETE)
      .map(action => action.payload)
      .switchMap(work => this.svc.deleteWork(work))
      .map(work => new WorkActions.deleteWorkSuccess(work));
}
