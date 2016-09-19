import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
// import {storeLogger} from 'ngrx-store-logger';
import {combineReducers} from '@ngrx/store';

import workReducer, * as fromWorkList from './work';
import messageReducer, * as fromMessage from './message';
import textListReducer, * as fromTextList from './text-list';
import textReducer, * as fromText from './text';

export interface AppState {
    works: fromWorkList.WorkListState,
    messages: fromMessage.MessageListState;
    texts: fromTextList.TextListState;
    text: fromText.TextState;
};

//uncomment the storeLogger import and this line
//and comment out the other export default line to turn on
//the store logger to see the actions as they flow through the store
//turned this off by default as i found the logger kinda noisy

// export default compose(storeLogger(), combineReducers)({
export default compose(combineReducers)({
    works: workReducer,
    messages: messageReducer,
    texts: textListReducer,
    text: textReducer
});
