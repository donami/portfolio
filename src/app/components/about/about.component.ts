import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as marked from 'marked';

import { AppState } from '../../reducers';
import * as TextActions from '../../actions/text.actions';
import { Text } from '../../shared/text.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {

  text: Text;
  errorMessage: string;

  constructor(
    private store: Store<AppState>,
    // private textActions: TextActions
  ) {
    this.store.select('text')
                .subscribe( (text: Text) => {
                  this.text = text
                });
  }

  ngOnInit() {
    this.store.dispatch(new TextActions.getText('57db409680a35d2f240087ce'));
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
