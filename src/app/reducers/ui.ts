import { Action } from '@ngrx/store';

import { UI } from '../shared/ui.interface';
import { UIActions } from '../actions';

export type UIState = UI;

const initialState: UIState = {
  components: {
    works: {
      open: false,
    },
    texts: {
      open: false,
    }
  }
};

export default function (state = initialState, action: Action): UIState {
    switch (action.type) {
      case UIActions.OPEN_SUCCESS: {
        state.components[action.payload].open = !state.components[action.payload].open;
        return state;
      }
      case UIActions.OPEN: {
        return state;
      }
      default: {
        return state;
      }
    }
}
