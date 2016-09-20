import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'technology',
  styles: [`
    .technologies {
      margin-bottom: 20px;

      button.add {
        margin-bottom: 20px;
      }
    }

    .buttons {
      margin-top: 20px;
    }
  `],
  template: `
    <div class="technologies">
      <h4 class="ui dividing header">Technologies</h4>

      <div class="ui grid tech-list">
        <div class="row" *ngFor="let technology of technologies; let i = index">
          <div class="ten wide column">
            <input type="text" [formControl]="technology" placeholder="Technology name"/>
          </div>
          <div class="six wide column" style="text-align:right">
            <button class="ui negative button" type="button" (click)="remove(i)">Remove</button>
          </div>
        </div>
      </div>

      <div class="buttons">
        <button (click)="add()" type="button" class="ui button add">Add technology</button>
        <button (click)="save()" type="button" class="ui positive button">Save</button>
      </div>

    </div>
  `
})
export class AddTechnologyComponent implements OnInit {

  @Input() work;
  @Output() saveTechnologies = new EventEmitter();
  @Output() unsavedChangesEvent = new EventEmitter();

  private technologies: FormControl[];
  private unsavedChanges: boolean = false;

  constructor() {
    this.technologies = [];
  }

  ngOnInit() {
    this.initSavedTechnologies();
  }

  // If editing a work, load saved technologies if there is any
  initSavedTechnologies(): void {
    if (this.work) {
      this.work.technologies.forEach(obj => {
        this.technologies.push(new FormControl(obj));
      });
    }
  }

  // Add technology to the list
  add(): void {
    let tech = new FormControl('');
    this.technologies.push(tech);
    this.unsavedChanges = true;
    this.unsavedChangesEvent.emit(true);
  }

  // Save the data and notify parent component
  save(): void {
    let data = this.technologies.map(obj => obj.value);

    this.saveTechnologies.emit({ data: data, unsavedChanges: this.unsavedChanges });
    this.unsavedChanges = false;
    this.unsavedChangesEvent.emit(false);
  }

  // Remove technology form control from list
  remove(index): void {
    this.technologies.splice(index, 1);
    this.unsavedChanges = true;
    this.unsavedChangesEvent.emit(true);
  }
}
