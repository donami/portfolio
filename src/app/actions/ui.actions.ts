import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class UIActions {
  static LOAD = '[UI] Load';
  load(): Action {
    return {
      type: UIActions.LOAD
    };
  };

  static OPEN = '[UI] Open';
  openComponent(component): Action {
    return {
      type: UIActions.OPEN,
      payload: component,
    };
  };

  static OPEN_SUCCESS = '[UI] Open Success';
  openComponentComplete(component): Action {
    return {
      type: UIActions.OPEN_SUCCESS,
      payload: component
    }
  };

}
