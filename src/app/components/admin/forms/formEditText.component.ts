import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  trigger,
  state,
  animate,
  style,
  transition
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../reducers';
import * as TextActions from '../../../actions/text.actions';
import { Text } from '../../../shared/text';
import { Message } from '../../../shared/message';

@Component({
  selector: 'formEditText',
  animations: [
    trigger('segmentState', [
      state('inactive', style({
        opacity: 0,
        height: 0
      })),
      state('active', style({
        opacity: 1,
        height: '*'
      })),
      transition('active <=> inactive', [
        animate('0.2s 12ms ease-in')
      ]),
    ])
  ],
  template: `
    <div class="ui raised segment">

      <h3 class="pointer" (click)="setState('list')" (click)="toggleState()">Manage texts <i class="angle link icon" [class.down]="this.segment.state == 'inactive'" [class.up]="this.segment.state =='active'"></i></h3>

      <!-- Edit state -->
      <div *ngIf="states.edit">
        <popup title="Edit text">

          <form [formGroup]="form" class="ui form" (ngSubmit)="onSubmit(form.value)">

            <div class="field">
              <label for="title">Title</label>
              <input type="text" [formControl]="form.controls['title']" placeholder="The title for the text">
            </div>

            <div class="field">
              <label for="content">Content</label>
              <textarea [formControl]="form.controls['content']" placeholder="Content"></textarea>
            </div>

            <div class="ui buttons">
              <button class="ui button" type="button" (click)="setState('list')">Cancel</button>
              <div class="or"></div>
              <button class="ui positive button" type="submit">Save</button>
            </div>

          </form>

        </popup>
      </div>
      <!-- End edit state -->

      <!-- Add state -->
      <div *ngIf="this.states.add">
        <popup title="Add text">
          <form [formGroup]="addForm" class="ui form" (ngSubmit)="onSubmitAddForm(addForm.value)">

            <div class="field">
              <label for="title">Title</label>
              <input type="text" [formControl]="addForm.controls['title']" placeholder="The title for the text">
            </div>

            <div class="field">
              <label for="content">Content</label>
              <textarea [formControl]="addForm.controls['content']" placeholder="Content"></textarea>
            </div>

            <div class="ui buttons">
              <button class="ui button" type="button" (click)="setState('list')">Cancel</button>
              <div class="or"></div>
              <button class="ui positive button" type="submit">Save</button>
            </div>

          </form>
        </popup>
      </div>
      <!-- End add state -->

      <!-- List state -->
      <div class="ui text-container" [@segmentState]="segment.state" *ngIf="states.list">

        <div class="ui large middle aligned list">
          <div class="item" *ngFor="let text of (texts | async)">

            <div class="right floated content">
              <button class="mini ui button" (click)="selectText(text)">Edit</button>
              <button class="mini ui red button" (click)="deleteText(text)">Delete</button>
            </div>

            <div class="content">
              {{ text?.title }}
            </div>

          </div>
        </div>

        <div class="ui buttons">
          <button class="ui button" (click)="toggleState()">Cancel</button>
          <div class="or"></div>
          <button class="ui positive button" (click)="setState('add')">Add</button>
        </div>

      </div>
      <!-- End list state -->
    </div>
  `
})
export class FormEditTextComponent implements OnInit, OnChanges {
  @Output() sendMessage = new EventEmitter();

  form: FormGroup;
  addForm: FormGroup;

  states: {
    add: boolean,
    edit: boolean,
    list: boolean,
  };

  segment: {
    state: string;
  }

  popup: {
    state: string;
    hidden: boolean;
  }

  textAddForm: {
    hidden: boolean;
  }

  private selectedText;

  @Input() texts;
  @Input() open: any;
  @Output() toggleUIComponent = new EventEmitter();

  errorMessage: string;

  constructor(
    private store: Store<AppState>,
    // private textActions: TextActions,
    private _fb: FormBuilder)
  {
    this.form = _fb.group({
      '_id': [''],
      'title': ['', Validators.required],
      'content': ['', Validators.required],
      '__v': [''],
    });

    this.addForm = _fb.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required]
    });

    this.segment = {
      state: 'inactive'
    };

    this.textAddForm = {
      hidden: false
    };

    this.popup = {
      state: 'inactive',
      hidden: true,
    };

    this.states = {
      add: false,
      edit: false,
      list: true
    };

  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let openChanges = changes['open'];

    if (openChanges.currentValue === true) {
      this.segment.state = 'active';
    }
    else {
      this.segment.state = 'inactive';
    }
  }

  onSubmit(data: Text): void {
    this.store.dispatch(new TextActions.saveText(data));
    this.sendMessage.emit(new Message('Updated successfully!', 'Text was updated successfully', 'positive'));
    this.setState('list');
  }

  onSubmitAddForm(data: Text): void {
    this.store.dispatch(new TextActions.addText(data));
    this.sendMessage.emit(new Message('Added successfully!', 'Text was added successfully', 'positive'));

    this.setState('list');
  }

  toggleState(state?: string): void {
    this.toggleUIComponent.emit('texts');
  }

  setState(state: string): void {
    this.states.add = false;
    this.states.edit = false;
    this.states.list = false;

    this.states[state] = true;
  }

  togglePopup(): void {
    this.popup.hidden = !this.popup.hidden;
  }

  selectText(text: Text): void {
    this.selectedText = text;
    (<FormGroup>this.form).setValue(text, { onlySelf: true });

    this.setState('edit');
  }

  // Delete text
  deleteText(text: Text): void {
    this.store.dispatch(new TextActions.deleteText(text));
    this.sendMessage.emit(new Message('Removed succesfully!', 'Text was removed successfully', 'info'));
  }

}
