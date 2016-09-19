import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
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
  REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../reducers';
import { TextActions } from '../../../actions';
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
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
    <div class="ui raised segment">

      <h3 class="pointer" (click)="setState('list')" (click)="toggleState()">Manage texts <i class="angle link icon" [class.down]="this.segment.state == 'inactive'" [class.up]="this.segment.state =='active'"></i></h3>

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

      <div class="ui text-container" [@segmentState]="segment.state" *ngIf="states.list">

        <div class="ui large middle aligned list">
          <div class="item" *ngFor="let text of (texts | async)">

            <div class="right floated content">
              <button class="mini ui button" (click)="selectText(text)">Edit</button>
            </div>

            <div class="content">
              {{ text?.title }}
            </div>

          </div>
        </div>

        <div class="ui buttons">
          <button class="ui button" (click)="toggleState('inactive')">Cancel</button>
          <div class="or"></div>
          <button class="ui positive button" (click)="setState('add')">Add</button>
        </div>

      </div>
    </div>
  `
})
export class FormEditTextComponent implements OnInit{

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
  errorMessage: string;

  constructor(
    private store: Store<AppState>,
    private textActions: TextActions,
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

  onSubmit(data: Text): void {
    this.store.dispatch(this.textActions.saveText(data));
    this.sendMessage.emit(new Message('Updated successfully!', 'Text was updated successfully', 'positive'));
    this.setState('list');
  }

  onSubmitAddForm(data: Text): void {
    this.store.dispatch(this.textActions.addText(data));
    this.sendMessage.emit(new Message('Added successfully!', 'Text was added successfully', 'positive'));

    this.setState('list');
  }

  toggleState(state?: string): void {
    if (state) {
      this.segment.state = state;
      return;
    }

    if (this.segment.state == 'active') {
      this.segment.state = 'inactive';
    }
    else {
      this.segment.state = 'active';
    }
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

}
