import { ActionReducer, Action } from '@ngrx/store';
import { Work } from '../models/work';
import { WorkActions } from '../actions/work.actions';
import * as _ from 'lodash';

export type WorkListState = Work[];

const initialState: WorkListState = [];

export default function (state = initialState, action: Action): WorkListState {
    switch (action.type) {

      case WorkActions.LOAD_WORKS_SUCCESS:
        return action.payload;

      case WorkActions.ADD_WORK_SUCCESS:
        return [...state, action.payload];

      case WorkActions.SAVE_WORK_SUCCESS:
        let index = _.findIndex(state, {_id: action.payload._id});
        if (index >= 0) {
          return [
            ...state.slice(0, index),
            action.payload,
            ...state.slice(index + 1)
          ];
        }
        return state;

      case WorkActions.DELETE_WORK_SUCCESS:
        return state.filter(work => {
          return work._id !== action.payload._id;
        });

      default:
        return state;
    }
}
