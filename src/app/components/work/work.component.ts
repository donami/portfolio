import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { WorkActions } from '../../actions';
import { Work } from '../../models/work';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  work: Work;

  constructor(
    private store: Store<AppState>,
    private workActions: WorkActions,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store.select('work')
      .subscribe(work => this.work = work);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.store.dispatch(this.workActions.getWork(id));
    });
  }


}
