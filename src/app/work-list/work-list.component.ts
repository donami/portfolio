import { Component, OnInit } from '@angular/core';
import { Work } from '../work';
import { WorkService } from '../work.service';

import '../rxjs-operators';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css'],
  providers: [WorkService]
})
export class WorkListComponent implements OnInit {
  works: Work[];
  errorMessage: string;

  constructor(private workService: WorkService) { }

  ngOnInit() {
    this.getWorks();
  }

  getWorks(): void {
    this.workService.getAllWorks()
                       .then(
                         works => this.works = works,
                         error =>  this.errorMessage = <any>error);
  }

  addWork(title: string) {
    if (!title) return;

    this.workService.addWork(title)
                        .then(
                          work => this.works.push(work),
                          error => this.errorMessage = <any>error);
  }

}
