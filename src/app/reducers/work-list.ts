import { ActionReducer, Action } from '@ngrx/store';
import { Work } from '../models/work';
import * as WorkActions from '../actions/work.actions';
import * as _ from 'lodash';

export type WorkListState = Work[];

const initialState: WorkListState = [];

export default function (state = initialState, action: Action): WorkListState {
    switch (action.type) {

      case WorkActions.ActionTypes.LOAD_COMPLETE:
        return action.payload;

      case WorkActions.ActionTypes.ADD_COMPLETE:
        return [...state, action.payload];

      case WorkActions.ActionTypes.SAVE_COMPLETE:
        let index = _.findIndex(state, {_id: action.payload._id});
        if (index >= 0) {
          return [
            ...state.slice(0, index),
            action.payload,
            ...state.slice(index + 1)
          ];
        }
        return state;

      case WorkActions.ActionTypes.DELETE_COMPLETE:
        return state.filter(work => {
          return work._id !== action.payload._id;
        });

      default:
        return state;
    }
}
