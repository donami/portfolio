import { ActionReducer, Action } from '@ngrx/store';
import { MessageActions } from '../actions';
import { Message } from '../shared/message';

export type MessageListState = Message[];

const initialState: MessageListState = [];


export default function (state = initialState, action: Action): MessageListState {

  switch (action.type) {

    case MessageActions.LOAD_MESSAGE:
      return state;

    case MessageActions.LOAD_MESSAGE_SUCCESS:
      return state;

    case MessageActions.ADD_MESSAGE:
      return state;

    case MessageActions.ADD_MESSAGE_SUCCESS:
      return [...state, action.payload];

    case MessageActions.DELETE_MESSAGE:
      return state;

    case MessageActions.DELETE_MESSAGE_SUCCESS:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];

    default:
      return state;
  }

}
