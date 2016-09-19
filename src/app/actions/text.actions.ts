import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Text } from '../shared/text.interface';

@Injectable()
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
