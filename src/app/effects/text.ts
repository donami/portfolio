import { Injectable} from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';

import { AppState } from '../reducers';
import { TextActions } from '../actions';
import { TextService } from '../shared/text.service';

@Injectable()
export class TextEffects {
    constructor (
        private update$: StateUpdates<AppState>,
        private textActions: TextActions,
        private svc: TextService,
    ) {}

    @Effect() loadTexts$ = this.update$
        .whenAction(TextActions.LOAD_TEXTS)
        .switchMap(() => this.svc.getTextList())
        .map(text => this.textActions.loadTextsSuccess(text));

    @Effect() getText$ = this.update$
        .whenAction(TextActions.GET_TEXT)
        .map<string>(toPayload)
        .switchMap(id => this.svc.getText(id))
        .map(text => this.textActions.getTextSuccess(text));

    @Effect() saveText$ = this.update$
        .whenAction(TextActions.SAVE_TEXT)
        .map(update => update.action.payload)
        .switchMap(text => this.svc.saveText(text))
        .map(text => this.textActions.saveTextSuccess(text));

    @Effect() addText$ = this.update$
        .whenAction(TextActions.ADD_TEXT)
        .map(update => update.action.payload)
        .switchMap(text => this.svc.addText(text))
        .map(text => this.textActions.addTextSuccess(text));

    @Effect() deleteText$ = this.update$
        .whenAction(TextActions.DELETE_TEXT)
        .map(update => update.action.payload)
        .switchMap(text => this.svc.deleteText(text))
        .map(text => this.textActions.deleteTextSuccess(text));
}
