import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  OPEN:             type('[UI] Open'),
  OPEN_COMPLETE:    type('[UI] Open Complete'),
  LOAD:             type('[UI] Load'),
};

export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor(public payload: any) { }
}

export class OpenCompleteAction implements Action {
  type = ActionTypes.OPEN_COMPLETE;

  constructor(public payload: any) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
}

export type Actions
  = OpenAction
  | OpenCompleteAction
  | LoadAction;
