import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as marked from 'marked';

import { AppState } from '../../reducers';
import * as TextActions from '../../actions/text.actions';
import { Text } from '../../shared/text.interface';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent implements OnInit {

  text: Text;
  errorMessage: string;

  constructor(private store: Store<AppState>) {
    this.store.select('text')
      .subscribe( (text: Text) => {
        this.text = text;
      });
  }

  ngOnInit() {
    this.store.dispatch(new TextActions.getText('57dae89148d7b92e8732d0fb'));
  }

  // Parse markdown
  parseMarkdown(text: string): string {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });

    return marked(text);
  }

}
