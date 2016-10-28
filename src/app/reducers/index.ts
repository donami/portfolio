import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
import {storeLogger} from 'ngrx-store-logger';
import {combineReducers} from '@ngrx/store';

import workListReducer, * as fromWorkList from './work-list';
import workReducer, * as fromWork from './work';
import messageReducer, * as fromMessage from './message';
import textListReducer, * as fromTextList from './text-list';
import textReducer, * as fromText from './text';
import uiReducer, * as fromUI from './ui';
import { RouterState } from '@ngrx/router-store';

export interface AppState {
    router: RouterState,
    works: fromWorkList.WorkListState,
    work: fromWork.WorkState,
    messages: fromMessage.MessageListState;
    texts: fromTextList.TextListState;
    text: fromText.TextState;
    ui: fromUI.UIState;
};

//uncomment the storeLogger import and this line
//and comment out the other export default line to turn on
//the store logger to see the actions as they flow through the store
//turned this off by default as i found the logger kinda noisy

export default compose(storeLogger(), combineReducers)({
// export default compose(combineReducers)({
    work: workReducer,
    works: workListReducer,
    messages: messageReducer,
    texts: textListReducer,
    text: textReducer,
    ui: uiReducer
});
