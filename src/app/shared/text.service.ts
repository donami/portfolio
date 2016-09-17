import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Text } from './text';

@Injectable()
export class TextService {

  private apiUrl = 'http://localhost:3001/api/text/';  // URL to web api

  constructor(private http: Http) {
  }

  getText(id: string): Promise<Text> {
    return this.http.get(this.apiUrl + '/' + id)
                  .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError)
  }

  getTextList(): Promise<Text[]> {
    return this.http.get(this.apiUrl)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  createText(text: Text): Promise<Text> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(text);

    return this.http.post(this.apiUrl, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updateText(text: Text): Promise<Text> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(text);

    return this.http.put(this.apiUrl + '/' + text._id, body, options)
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
