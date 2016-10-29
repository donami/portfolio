import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOAD:             type('[Message] Load'),
  LOAD_COMPLETE:    type('[Message] Load Complete'),
  ADD:              type('[Message] Add'),
  ADD_COMPLETE:     type('[Message] Add Complete'),
  DELETE:           type('[Message] Delete'),
  DELETE_COMPLETE:  type('[Message] Delete Complete'),
};

export class loadMessage implements Action {
  type = ActionTypes.LOAD;
}

export class loadMessageSuccess implements Action {
  type = ActionTypes.LOAD_COMPLETE;

  constructor(public payload: any) { }
}

export class addMessage implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: any) { }
}

export class addMessageSuccess implements Action {
  type = ActionTypes.ADD_COMPLETE;

  constructor(public payload: any) { }
}

export class deleteMessage implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: any) { }
}

export class deleteMessageSuccess implements Action {
  type = ActionTypes.DELETE_COMPLETE;

  constructor(public payload: any) { }
}

export type Actions
  = loadMessage
  | loadMessageSuccess
  | addMessage
  | addMessageSuccess
  | deleteMessage
  | deleteMessageSuccess;

/*
@Injectable()
export class MessageActions {

  static LOAD_MESSAGE = '[Message] Load Message';
  loadMessage(): Action {
    return {
      type: MessageActions.LOAD_MESSAGE,
    };
  };

  static LOAD_MESSAGE_SUCCESS = '[Message] Load Message Success';
  loadMessageSuccess(message): Action {
    return {
      type: MessageActions.LOAD_MESSAGE_SUCCESS,
      payload: message
    };
  };

  static ADD_MESSAGE = '[Message] Add Message';
  addMessage(message): Action {
    return {
      type: MessageActions.ADD_MESSAGE,
      payload: message
    };
  };

  static ADD_MESSAGE_SUCCESS = '[Message] Add Message Success';
  addMessageSuccess(message): Action {
    return {
      type: MessageActions.ADD_MESSAGE_SUCCESS,
      payload: message
    };
  };

  static DELETE_MESSAGE = '[Message] Delete Message';
  deleteMessage(message): Action {
    return {
      type: MessageActions.DELETE_MESSAGE,
      payload: message
    };
  };

  static DELETE_MESSAGE_SUCCESS = '[Message] Delete Message Success';
  deleteMessageSuccess(message): Action {
    return {
      type: MessageActions.DELETE_MESSAGE_SUCCESS,
      payload: message
    };
  };

}
*/
