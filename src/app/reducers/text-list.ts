import { ActionReducer, Action } from '@ngrx/store';
import { Text } from '../shared/text.interface';
import * as TextActions from '../actions/text.actions';
import * as _ from 'lodash';

export type TextListState = Text[];

const initialState: TextListState = [];

export default function (state = initialState, action: Action): TextListState {
    switch (action.type) {

      case TextActions.ActionTypes.LOAD_COMPLETE:
        return action.payload;

      case TextActions.ActionTypes.ADD_COMPLETE:
        return [...state, action.payload];

      case TextActions.ActionTypes.SAVE_COMPLETE:
        let index = _.findIndex(state, {_id: action.payload._id});
        if (index >= 0) {
          return [
            ...state.slice(0, index),
            action.payload,
            ...state.slice(index + 1)
          ];
        }
        return state;

      case TextActions.ActionTypes.DELETE_COMPLETE:
        return state.filter(text => {
          return text._id !== action.payload._id;
        });

      default:
        return state;
    }
}
