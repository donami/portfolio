import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as marked from 'marked';

import { AppState } from '../../reducers';
import { Text } from '../../shared/text';
import * as TextActions from '../../actions/text.actions';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  text: Text;

  constructor(private store: Store<AppState>) {
    this.store.select('text').subscribe((text: Text) => this.text = text);
  }

  ngOnInit() {
    this.store.dispatch(new TextActions.getText('terms'));
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
