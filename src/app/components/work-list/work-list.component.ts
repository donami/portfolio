import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Work } from '../../models/work';
import { WorkListItemComponent } from './work-list-item.component';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
  directives: [WorkListItemComponent]
})
export class WorkListComponent {
  works: Observable<any>;
  errorMessage: string;

  constructor(private store: Store<AppState>) {
    this.works = store.select('works');
  }

}
