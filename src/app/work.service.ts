import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Work } from './work';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class WorkService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://localhost:3001/api/works';  // URL to web api

  constructor(private http: Http) {}

  // Get all works
  getAllWorks(): Promise<Work[]> {
    return this.http.get(this.apiUrl)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  // Add work
  addWork (title: string): Promise<Work> {
    let body = JSON.stringify({ title });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Edit work
  editWork (work: Work): Promise<Work> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(work);

    return this.http.put(this.apiUrl + '/' + work._id, body, options)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  // Delete work
  deleteWork (work: Work): Promise<Work> {
    return this.http.delete(this.apiUrl + '/' + work._id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

}
