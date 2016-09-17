import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkService } from '../../work.service';
import { Work } from '../../work';

@Component({
  selector: 'formEditWork',
  providers: [WorkService],
  template: `
    <div class="ui raised segment">
      <h3 (click)="setState('list')" class="pointer">Edit works</h3>

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
          <div class="item" *ngFor="let work of works">

            <div class="right floated content">
              <button class="mini ui button" (click)="selectWork(work)">Edit</button>
              <button class="mini ui button" (click)="deleteWork(work)">Delete</button>
            </div>

            <div class="content">
              {{ work?.title }}
            </div>

          </div>
        </div>

      </div>
      <!-- End list -->

    </div>
  `
})
export class FormEditWorkComponent implements OnInit {

  states: {
    list: boolean,
    edit: boolean
  };

  private works: Work[];
  private errorMessage: string;
  private selectedWork: Work;
  private form: FormGroup;

  constructor(private workService: WorkService, private _fb: FormBuilder) {
    this.states = {
      list: false,
      edit: false,
    };
  }

  ngOnInit() {
    this.getList();
  }

  initFormGroup(work: Work) {
    this.form = this._fb.group({
      '_id': [work._id, Validators.required],
      'title': [work.title, Validators.required]
    });
  }

  getList(): void {
    this.workService.getAllWorks()
      .then(
        (works) => this.works = works,
        (err) => this.errorMessage = err
      );
  }

  onSubmit(work: Work, isValid: boolean): void {
    if (isValid) {
      this.workService.editWork(work)
        .then(
          (work) => {
            this.works.map(obj => {
              if (work._id == obj._id) {
                obj.title = work.title;
              }
              return obj;
            });

            // Change the state back to list view
            this.setState('list');
          },
          (err) => this.errorMessage = err
        );
    }
  }

  selectWork(work: Work): void {
    this.selectedWork = work;

    this.initFormGroup(this.selectedWork);

    this.setState('edit');
  }

  // Delete a work
  deleteWork(work: Work): void {
    this.workService.deleteWork(work)
      .then(
        (response) => {
            let index = this.works.indexOf(work);
            this.works.splice(index, 1);
        },
        (err) => console.log(err)
      );
  }

  setState(state: string): void {
    this.states = {
      list: false,
      edit: false,
    };

    this.states[state] = true;
  }
}
