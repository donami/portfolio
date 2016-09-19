import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Work } from '../models/work';

@Injectable()
export class WorkActions {

  static GET_WORK = '[Work] Get Work';
  getWork(id): Action {
    return {
      type: WorkActions.GET_WORK,
      payload: id,
    };
  };

  static GET_WORK_SUCCESS = '[Work] Get Work Success';
  getWorkSuccess(work): Action {
    return {
      type: WorkActions.GET_WORK_SUCCESS,
      payload: work,
    }
  };

  static GET_WORK_FAIL = '[Work] Get Work Fail';
  getWorkFail(): Action {
    return {
      type: WorkActions.GET_WORK_FAIL,
      payload: {error: 'NotFound'}
    }
  };

  static LOAD_WORKS = '[Work] Load works';
  loadWorks(): Action {
    return {
      type: WorkActions.LOAD_WORKS
    };
  };

  static LOAD_WORKS_SUCCESS = '[Work] Load works success';
  loadWorksSuccess(works): Action {
    return {
      type: WorkActions.LOAD_WORKS_SUCCESS,
      payload: works,
    }
  };

  static ADD_WORK = '[Work] Add Work';
  addWork(work): Action {
    return {
      type: WorkActions.ADD_WORK,
      payload: work
    };
  }

  static ADD_WORK_SUCCESS = '[Work] Add Work Success';
  addWorkSuccess(work): Action {
    return {
      type: WorkActions.ADD_WORK_SUCCESS,
      payload: work
    };
  }

  static SAVE_WORK = '[Work] Save Work';
  saveWork(work): Action {
    return {
      type: WorkActions.SAVE_WORK,
      payload: work
    };
  }

  static SAVE_WORK_SUCCESS = '[Work] Save Work Success';
  saveWorkSuccess(work): Action {
    return {
      type: WorkActions.SAVE_WORK_SUCCESS,
      payload: work
    };
  }

  static DELETE_WORK = '[Work] Delete Work';
  deleteWork(work): Action {
    return {
      type: WorkActions.DELETE_WORK,
      payload: work
    };
  }

  static DELETE_WORK_SUCCESS = '[Work] Delete Work Success';
  deleteWorkSuccess(work): Action {
    return {
      type: WorkActions.DELETE_WORK_SUCCESS,
      payload: work
    };
  }


}
