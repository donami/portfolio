import { Action } from '@ngrx/store';

import { Work } from '../models/work';
import { WorkActions } from '../actions';

export type WorkState = Work;

const initialState: WorkState = {
  _id: '',
  title: '',
  created_at: null,
  updated_at: null,
  description: '',
  image: '',
  link: '',
};

export default function (state = initialState, action: Action): WorkState {
    switch (action.type) {
        case WorkActions.GET_WORK_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
