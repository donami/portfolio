import {
  Component,
  OnInit,
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
import { TextService } from '../../shared/text.service';
import { Text } from '../../shared/text';

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
  providers: [TextService],
  template: `

    <div class="ui raised segment">

      <div class="ui success message" *ngIf="this.message">
        <i class="close icon"></i>
        <div class="header">
          Success
        </div>
        <p>{{ this.message }}</p>
      </div>

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
          <div class="item" *ngFor="let text of texts">

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

  texts: Text[];
  errorMessage: string;
  message: string;

  constructor(private textService: TextService, private _fb: FormBuilder) {
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

  ngOnInit() {
    this.getTexts();
  }

  onSubmit(data: Text): void {
    this.textService.updateText(data)
      .then(text => {
        this.texts.map((obj) => {
          if (obj._id == text._id) {
            obj.title = text.title;
            obj.content = text.content;
            return obj;
          }

          this.togglePopup();

          this.message = 'Text was successfully updated';

        }, (err) => this.errorMessage = err);
      });
  }

  onSubmitAddForm(data: any): void {
    let text = new Text(data.title, data.content);
    this.textService.createText(text)
      .then( (text) => {
        this.texts.push(text);

        this.message = 'Text was successfully created';
      }, (err) => this.errorMessage = err);
  }

  getTexts(): void {
    this.textService.getTextList()
                       .then(
                         text => this.texts = text,
                         error =>  this.errorMessage = <any>error);
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

    // this.popup.hidden = false;
    this.setState('edit');
  }

}
