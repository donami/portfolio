import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type } from '../util';

import { Work } from '../models/work';

export const ActionTypes = {
  GET:              type('[Work] Get'),
  GET_COMPLETE:     type('[Work] Get Complete'),
  GET_FAIL:         type('[Work] Get Fail'),
  LOAD:             type('[Work] Load'),
  LOAD_COMPLETE:    type('[Work] Load Complete'),
  ADD:              type('[Work] Add'),
  ADD_COMPLETE:     type('[Work] Add Complete'),
  SAVE:             type('[Work] Save'),
  SAVE_COMPLETE:    type('[Work] Save Complete'),
  DELETE:           type('[Work] Delete'),
  DELETE_COMPLETE:  type('[Work] Delete Complete'),
};

export class getWork implements Action {
  type = ActionTypes.GET;

  constructor(public payload: number) { }
}

export class getWorkSuccess implements Action {
  type = ActionTypes.GET_COMPLETE;

  constructor(public payload: Work) { }
}

export class getWorkFail implements Action {
  type = ActionTypes.GET_FAIL;

  // constructor(public payload: any) { }
}

export class loadWorks implements Action {
  type = ActionTypes.LOAD;
}

export class loadWorksSuccess implements Action {
  type = ActionTypes.LOAD_COMPLETE;

  constructor(public payload: Work[]) { }
}

export class addWork implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Work) { }
}

export class addWorkSuccess implements Action {
  type = ActionTypes.ADD_COMPLETE;

  constructor(public payload: Work) { }
}

export class saveWork implements Action {
  type = ActionTypes.SAVE;

  constructor(public payload: Work) { }
}

export class saveWorkSuccess implements Action {
  type = ActionTypes.SAVE_COMPLETE;

  constructor(public payload: Work) { }
}

export class deleteWork implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: Work) { }
}

export class deleteWorkSuccess implements Action {
  type = ActionTypes.DELETE_COMPLETE;

  constructor(public payload: Work) { }
}

export type Actions
  = getWork
  | getWorkSuccess
  | getWorkFail
  | loadWorks
  | loadWorksSuccess
  | addWork
  | addWorkSuccess
  | saveWork
  | saveWorkSuccess
  | deleteWork
  | deleteWorkSuccess;
