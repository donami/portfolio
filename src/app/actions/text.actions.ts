import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Text } from '../shared/text.interface';
import { type } from '../util';

export const ActionTypes = {
  LOAD:             type('[Text] Load'),
  LOAD_COMPLETE:    type('[Text] Load Complete'),
  GET:              type('[Text] Get'),
  GET_COMPLETE:     type('[Text] Get Complete'),
  ADD:              type('[Text] Add'),
  ADD_COMPLETE:     type('[Text] Add Complete'),
  SAVE:             type('[Text] Save'),
  SAVE_COMPLETE:    type('[Text] Save Complete'),
  DELETE:           type('[Text] Delete'),
  DELETE_COMPLETE:  type('[Text] Delete Complete'),
};


export class loadTexts implements Action {
  type = ActionTypes.LOAD;
}

export class loadTextsSuccess implements Action {
  type = ActionTypes.LOAD_COMPLETE;

  constructor(public payload: any) { }
}

export class getText implements Action {
  type = ActionTypes.GET;
  constructor(public payload: any) { }
}

export class getTextSuccess implements Action {
  type = ActionTypes.GET_COMPLETE;

  constructor(public payload: any) { }
}

export class saveText implements Action {
  type = ActionTypes.SAVE;
  constructor(public payload: any) { }
}

export class saveTextSuccess implements Action {
  type = ActionTypes.SAVE_COMPLETE;

  constructor(public payload: any) { }
}

export class addText implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: any) { }
}

export class addTextSuccess implements Action {
  type = ActionTypes.ADD_COMPLETE;

  constructor(public payload: any) { }
}

export class deleteText implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: any) { }
}

export class deleteTextSuccess implements Action {
  type = ActionTypes.DELETE_COMPLETE;

  constructor(public payload: any) { }
}

export type Actions
  = loadTexts
  | loadTextsSuccess
  | getText
  | getTextSuccess
  | saveText
  | saveTextSuccess
  | addText
  | addTextSuccess
  | deleteText
  | deleteTextSuccess;

/*@Injectable()
export class TextActions {
  static LOAD_TEXTS = '[Text] Load Texts';
  loadTexts(): Action {
    return {
      type: TextActions.LOAD_TEXTS
    };
  };

  static LOAD_TEXTS_SUCCESS = '[Text] Load Texts Success';
  loadTextsSuccess(texts): Action {
    return {
      type: TextActions.LOAD_TEXTS_SUCCESS,
      payload: texts,
    }
  };

  static GET_TEXT = '[Text] Get Text';
  getText(id): Action {
    return {
      type: TextActions.GET_TEXT,
      payload: id,
    };
  };

  static GET_TEXT_SUCCESS = '[Text] Get Text Success';
  getTextSuccess(text): Action {
    return {
      type: TextActions.GET_TEXT_SUCCESS,
      payload: text,
    }
  };

  static ADD_TEXT = '[Text] Add Text';
  addText(text): Action {
    return {
      type: TextActions.ADD_TEXT,
      payload: text
    };
  }

  static ADD_TEXT_SUCCESS = '[Text] Add Text Success';
  addTextSuccess(text): Action {
    return {
      type: TextActions.ADD_TEXT_SUCCESS,
      payload: text
    };
  }

  static SAVE_TEXT = '[Text] Save Text';
  saveText(text): Action {
    return {
      type: TextActions.SAVE_TEXT,
      payload: text
    };
  }

  static SAVE_TEXT_SUCCESS = '[Text] Save Text Success';
  saveTextSuccess(text): Action {
    return {
      type: TextActions.SAVE_TEXT_SUCCESS,
      payload: text
    };
  }

  static DELETE_TEXT = '[Text] Delete Text';
  deleteText(text): Action {
    return {
      type: TextActions.DELETE_TEXT,
      payload: text
    };
  }

  static DELETE_TEXT_SUCCESS = '[Text] Delete Text Success';
  deleteTextSuccess(text): Action {
    return {
      type: TextActions.DELETE_TEXT_SUCCESS,
      payload: text
    };
  }

}
*/
