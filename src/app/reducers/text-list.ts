import { ActionReducer, Action } from '@ngrx/store';
import { Text } from '../shared/text.interface';
import { TextActions } from '../actions/text.actions';
import * as _ from 'lodash';

export type TextListState = Text[];

const initialState: TextListState = [];

export default function (state = initialState, action: Action): TextListState {
    switch (action.type) {

      case TextActions.LOAD_TEXTS_SUCCESS:
        return action.payload;

      case TextActions.ADD_TEXT_SUCCESS:
        return [...state, action.payload];

      case TextActions.SAVE_TEXT_SUCCESS:
        let index = _.findIndex(state, {_id: action.payload._id});
        if (index >= 0) {
          return [
            ...state.slice(0, index),
            action.payload,
            ...state.slice(index + 1)
          ];
        }
        return state;

      case TextActions.DELETE_TEXT_SUCCESS:
        return state.filter(text => {
          return text._id !== action.payload._id;
        });

      default:
        return state;
    }
}
