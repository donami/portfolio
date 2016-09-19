import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Work } from '../../../models/work';
import { Message } from '../../../shared/message';
import { WorkActions } from '../../../actions';
import { AppState } from '../../../reducers';

@Component({
  selector: 'formEditWork',
  template: `
    <div class="ui raised segment">
      <h3 (click)="setState('list')" class="pointer">Edit works</h3>

      <!-- Add work -->
      <div *ngIf="states.add">
        <form [formGroup]="addForm" (ngSubmit)="onSubmitAdd(addForm.value, addForm.valid)" class="ui form" id="add-work-form">

          <div class="field">
            <label for="title">Title</label>
            <input type="text" [formControl]="addForm.controls['title']" placeholder="The title of your work">
          </div>

          <div class="ui buttons">
            <button class="ui button" (click)="setState('list')" type="button">Cancel</button>
            <div class="or"></div>
            <button class="ui positive button" type="submit">Add</button>
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

          <div class="ui buttons">
            <button (click)="setState('list')" class="ui button" type="button">Cancel</button>
            <div class="or"></div>
            <button class="ui positive button" type="submit">Save</button>
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
export class FormEditWorkComponent implements OnInit {

  states: {
    list: boolean,
    edit: boolean,
    add: boolean
  };

  private errorMessage: string;
  private selectedWork: Work;
  private form: FormGroup;
  private addForm: FormGroup;

  @Input() works;
  @Output() sendMessage = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private workActions: WorkActions,
    private _fb: FormBuilder) {

    this.states = {
      list: false,
      edit: false,
      add: false
    };

  }

  ngOnInit() {
    this.initAddFormGroup();
  }

  initFormGroup(work: Work) {
    this.form = this._fb.group({
      '_id': [work._id, Validators.required],
      'title': [work.title, Validators.required]
    });
  }

  initAddFormGroup() {
    this.addForm = this._fb.group({ 'title': ['', Validators.required] });
  }

  onSubmit(work: Work, valid: boolean): void {
    if (valid) {
      this.store.dispatch(this.workActions.saveWork(work));
      this.sendMessage.emit(new Message('Updated successfully!', 'Your changes was saved', 'positive'));
      this.setState('list');
    }
  }

  onSubmitAdd(work: Work, valid: boolean): void {
    if (valid) {
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
}
