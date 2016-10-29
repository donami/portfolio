import { Action } from '@ngrx/store';

import { Text } from '../shared/text.interface';
import * as TextActions from '../actions/text.actions';

export type TextState = Text;

const initialState: TextState = {
    _id: '',
    title: '',
    content: ''
};

export default function (state = initialState, action: Action): TextState {
    switch (action.type) {
        case TextActions.ActionTypes.GET_COMPLETE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
