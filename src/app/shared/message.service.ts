import { Injectable } from '@angular/core';
import { Message } from './message';
import { List } from 'immutable';

import { Observable, Subject, BehaviorSubject } from 'rxjs'

@Injectable()
export class MessageService {
  private _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(null);
  public messages: Observable<Message[]> = this._messages.asObservable();

  private data: Message[];

  constructor() {
    this.data = [];
  }

  setMessage(title: string, content: string, type: string): void {
    var message = new Message(title, content, type);
    this.data.push(message);

    this._messages.next(this.data);
  }

  removeMessage(index: number) {
    this.data.splice(index, 1);
    this._messages.next(this.data);
  }

}
