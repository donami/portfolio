import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Work } from '../models/work';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://localhost:3001/api/works';  // URL to web api

  constructor(private http: Http) {}

  // Get all works
  getAllWorks(): Observable<Work[]> {
    return this.http.get(this.apiUrl)
                    .map( (response) => response.json() )
                    .catch( (error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get a single work
  getWork(id): Observable<Work> {
    return this.http.get(this.apiUrl + '/' + id)
      .map( (response: Response) => response.json() )
      .catch( (error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Add work
  addWork (title: string): Observable<Work> {
    let body = JSON.stringify({ title });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl, body, options)
      .map( (response) => response.json() )
      .catch( (error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addWorkObs(work: Work): Observable<Work> {
    return this.http.post(this.apiUrl, work)
            .map(res => res.json());
  }

  saveWork(work: Work): Observable<Work> {
    return this.http.put(this.apiUrl + '/' + work._id, work)
            .map(res => res.json());
  }

  // Delete work
  deleteWork (work: Work): Observable<Work> {
    return this.http.delete(this.apiUrl + '/' + work._id)
      .map( (response) => response.json() )
      .catch( (error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
