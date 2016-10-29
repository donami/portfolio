import { ActionReducer, Action } from '@ngrx/store';
import * as MessageActions from '../actions/message.actions';
import { Message } from '../shared/message';

export type MessageListState = Message[];

const initialState: MessageListState = [];


export default function (state = initialState, action: Action): MessageListState {

  switch (action.type) {

    case MessageActions.ActionTypes.LOAD:
      return state;

    case MessageActions.ActionTypes.LOAD_COMPLETE:
      return state;

    case MessageActions.ActionTypes.ADD:
      return state;

    case MessageActions.ActionTypes.ADD_COMPLETE:
      return [...state, action.payload];

    case MessageActions.ActionTypes.DELETE:
      return state;

    case MessageActions.ActionTypes.DELETE_COMPLETE:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];

    default:
      return state;
  }

}
