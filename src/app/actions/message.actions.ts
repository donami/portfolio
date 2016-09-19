import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class MessageActions {

  static LOAD_MESSAGE = '[Message] Load Message';
  loadMessage(): Action {
    console.log('LOAD MESSAGE FIRED');
    return {
      type: MessageActions.LOAD_MESSAGE,
    };
  };

  static LOAD_MESSAGE_SUCCESS = '[Message] Load Message Success';
  loadMessageSuccess(message): Action {
    console.log('LOAD MESSAGE SUCCESS FIRED', message);
    return {
      type: MessageActions.LOAD_MESSAGE_SUCCESS,
      payload: message
    };
  };

  static ADD_MESSAGE = '[Message] Add Message';
  addMessage(message): Action {
    console.log('ADD MESSAGE FIRED');
    return {
      type: MessageActions.ADD_MESSAGE,
      payload: message
    };
  };

  static ADD_MESSAGE_SUCCESS = '[Message] Add Message Success';
  addMessageSuccess(message): Action {
    console.log('ADD MESSAGE SUCCESS FIRED', message);
    return {
      type: MessageActions.ADD_MESSAGE_SUCCESS,
      payload: message
    };
  };

  static DELETE_MESSAGE = '[Message] Delete Message';
  deleteMessage(message): Action {
    console.log('DELETE MESSAGE FIRED');
    return {
      type: MessageActions.DELETE_MESSAGE,
      payload: message
    };
  };

  static DELETE_MESSAGE_SUCCESS = '[Message] Delete Message Success';
  deleteMessageSuccess(message): Action {
    console.log('DELETE MESSAGE SUCCESS FIRED', message);
    return {
      type: MessageActions.DELETE_MESSAGE_SUCCESS,
      payload: message
    };
  };

}
