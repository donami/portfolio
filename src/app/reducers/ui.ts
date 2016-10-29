  import { Action } from '@ngrx/store';

import { UI } from '../shared/ui.interface';
import * as UIActions from '../actions/ui.actions';

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
      case UIActions.ActionTypes.OPEN_COMPLETE: {
        state.components[action.payload].open = !state.components[action.payload].open;
        return state;
      }
      case UIActions.ActionTypes.OPEN: {
        return state;
      }
      default: {
        return state;
      }
    }
}
