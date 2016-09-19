import { Action } from '@ngrx/store';

import { Text } from '../shared/text.interface';
import { TextActions } from '../actions';

export type TextState = Text;

const initialState: TextState = {
    _id: '',
    title: '',
    content: ''
};

export default function (state = initialState, action: Action): TextState {
    switch (action.type) {
        case TextActions.GET_TEXT_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
