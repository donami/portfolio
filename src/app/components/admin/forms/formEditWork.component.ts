import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Work } from '../../../models/work';
import { Message } from '../../../shared/message';
import { WorkActions } from '../../../actions';
import { AppState } from '../../../reducers';
import { FileUploadComponent } from './file-upload.component';
import { AddTechnologyComponent } from './add-technology.component';

@Component({
  selector: 'formEditWork',
  directives: [
    FileUploadComponent,
    AddTechnologyComponent,
  ],
  template: `
    <div class="ui raised segment">
      <h3 (click)="setState('list')" class="pointer" (click)="toggleOpen()">Edit works</h3>

      <!-- Add work -->
      <div *ngIf="states.add">
        <form [formGroup]="addForm" (ngSubmit)="onSubmitAdd(addForm.value, addForm.valid)" class="ui form" id="add-work-form">

          <div class="field">
            <label for="title">Title</label>
            <input type="text" [formControl]="addForm.controls['title']" placeholder="The title of your work">
          </div>

          <div class="field">
            <label for="title">Description</label>
            <textarea [formControl]="addForm.controls['description']" placeholder="Describe your work"></textarea>
          </div>

          <technology (saveTechnologies)="setTechnologies($event)" (unsavedChangesEvent)="setUnsavedChanges($event)"></technology>

          <file-upload (fileUploaded)="getFile($event)"></file-upload>

          <div class="field">
            <label for="title">Link</label>
            <div class="ui labeled input">
              <div class="ui label">
                http://
              </div>
              <input type="text" [formControl]="addForm.controls['link']" placeholder="yourwork.com">
            </div>
          </div>

          <div class="ui buttons">
            <button class="ui button" (click)="setState('list')" type="button">Cancel</button>
            <div class="or"></div>
            <button class="ui positive button" [class.disabled]="unsavedChanges" type="submit">Add</button>
          </div>

        </form>
      </div>
      <!-- End add work -->

      <!-- Edit work -->
      <div *ngIf="states.edit">

        <form [formGroup]="form" (ngSubmit)="onSubmit(form.value, form.valid)" class="ui form">

          <div class="field">
            <label for="title">Title</label>
            <input [formControl]="form.controls['title']" type="text" placeholder="Title">
          </div>

          <div class="field">
            <label for="title">Description</label>
            <textarea [formControl]="form.controls['description']" placeholder="Describe your work"></textarea>
          </div>

          <technology [work]="selectedWork"
            (saveTechnologies)="setTechnologies($event)"
            (unsavedChangesEvent)="setUnsavedChanges($event)">
          </technology>

          <file-upload (fileUploaded)="getFile($event)"></file-upload>

          <div class="field">
            <label for="title">Link</label>
            <div class="ui labeled input">
              <div class="ui label">
                http://
              </div>
              <input type="text" [formControl]="form.controls['link']" placeholder="yourwork.com">
            </div>
          </div>

          <div class="ui buttons">
            <button (click)="setState('list')" class="ui button" type="button">Cancel</button>
            <div class="or"></div>
            <button class="ui positive button" [class.disabled]="unsavedChanges" type="submit">Save</button>
          </div>

        </form>

      </div>
      <!-- End edit work -->

      <!-- List all works -->
      <div *ngIf="states.list">

        <div class="ui large middle aligned list">
          <div class="item" *ngFor="let work of (works | async)">

            <div class="right floated content">
              <button class="mini ui button" (click)="selectWork(work)">Edit</button>
              <button class="mini ui button" (click)="deleteWork(work)">Delete</button>
            </div>

            <div class="content">
              {{ work?.title }}
            </div>

          </div>
        </div>

        <button (click)="setState('add')" class="ui button" type="button">Add work</button>

      </div>
      <!-- End list -->

    </div>
  `
})
export class FormEditWorkComponent implements OnInit, OnChanges {

  states: {
    list: boolean,
    edit: boolean,
    add: boolean
  };

  private errorMessage: string;
  private selectedWork: Work;
  private form: FormGroup;
  private addForm: FormGroup;
  private image: any;
  private technologies: string[];
  private unsavedChanges: boolean = false;

  @Input() works;
  @Input() open;
  @Output() sendMessage = new EventEmitter();
  @Output() toggleUIComponent = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private workActions: WorkActions,
    private _fb: FormBuilder) {

    this.resetStates();

    this.technologies = [];
  }

  ngOnInit() {
    this.initAddFormGroup();
  }

  ngOnChanges(changes: SimpleChanges) {
    let openChanges = changes['open'];
    if (openChanges.currentValue === true) {
      if (this.states.list === false && this.states.edit === false && this.states.add === false) {
        this.states.list = true;
      }
    }
    else {
      this.resetStates();
    }
  }

  toggleOpen(): void {
    this.toggleUIComponent.emit('works');
  }

  initFormGroup(work: Work) {
    this.form = this._fb.group({
      '_id': [work._id, Validators.required],
      'title': [work.title, Validators.required],
      'description': [work.description],
      'link': [work.link],
      'image': [work.image],
    });
  }

  initAddFormGroup() {
    this.addForm = this._fb.group({
       'title': ['', Validators.required],
       'description': [''],
       'link': [''],
       'image': [''],
     });
  }

  resetStates() {
    this.states = {
      list: false,
      edit: false,
      add: false
    };
  }

  onSubmit(work: Work, valid: boolean): void {
    if (valid) {
      if (this.image) {
        work.image = this.image.filename;
      }

      if (this.technologies) work.technologies = this.technologies;

      this.store.dispatch(this.workActions.saveWork(work));
      this.sendMessage.emit(new Message('Updated successfully!', 'Your changes was saved', 'positive'));
      this.setState('list');
    }
  }

  onSubmitAdd(work: Work, valid: boolean): void {
    if (valid) {
      if (this.image) {
        work.image = this.image.filename;
      }

      if (this.technologies) work.technologies = this.technologies;

      this.store.dispatch(this.workActions.addWork(work));
      this.sendMessage.emit(new Message('Added successfully', 'Your work has been added', 'positive'));
      this.setState('list');
      this.initAddFormGroup();
    }
  }

  selectWork(work: Work): void {
    this.selectedWork = work;

    this.initFormGroup(this.selectedWork);

    this.setState('edit');
  }

  // Delete a work
  deleteWork(work: Work): void {
    this.store.dispatch(this.workActions.deleteWork(work));
    this.sendMessage.emit(new Message('Removed successfully!', 'Work was removed successfully', 'info'));
  }

  setState(state: string): void {
    this.states = {
      list: false,
      edit: false,
      add: false
    };

    this.states[state] = true;
  }

  getFile(event): void {
    this.image = event;
  }

  // Dispatched from child component
  setTechnologies(event): void {
    this.technologies = event.data;
  }

  setUnsavedChanges(event: boolean): void {
    this.unsavedChanges = event;
  }
}
