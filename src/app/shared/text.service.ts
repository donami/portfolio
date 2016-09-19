import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Text } from './text.interface';

import { Observable } from 'rxjs'

@Injectable()
export class TextService {

  private apiUrl = 'http://localhost:3001/api/text/';  // URL to web api

  constructor(private http: Http) {
  }

  getText(id: string): Observable<Text> {
    return this.http.get(this.apiUrl + '/' + id)
        .map(res => res.json());
  }

  getTextList(): Observable<Text[]> {
    return this.http.get(this.apiUrl)
                    .map((response: Response) => response.json())
                      .catch( (error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createText(text: Text): Observable<Text> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(text);

    return this.http.post(this.apiUrl, body, options)
      .map( (response) => response.json() )
      .catch( (err) => Observable.throw(err.json().error));
  }

  addText(text: Text): Observable<Text> {
    return this.http.post(this.apiUrl, text)
            .map(res => res.json());
  }

  saveText(text: Text): Observable<Text> {
    return this.http.put(this.apiUrl + '/' + text._id, text)
            .map(res => res.json());
  }

  updateText(text: Text): Observable<Text> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(text);

    return this.http.put(this.apiUrl + '/' + text._id, body, options)
      .map( (response: Response) => response.json() )
      .catch( (err) => Observable.throw(err.json().error));
  }

  deleteText(text: Text): Observable<Text> {
    return this.http.delete(this.apiUrl + '/' + text._id)
      .map( (response: Response) => response.json() );
  }

}
