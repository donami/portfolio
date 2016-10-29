import { Action } from '@ngrx/store';

import { Work } from '../models/work';
import * as WorkActions from '../actions/work.actions';

export type WorkState = Work;

const initialState: WorkState = {
  _id: '',
  title: '',
  created_at: null,
  updated_at: null,
  description: '',
  image: '',
  link: '',
  technologies: [],
};

export default function (state = initialState, action: Action): WorkState {
    switch (action.type) {
        case WorkActions.ActionTypes.GET_COMPLETE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
