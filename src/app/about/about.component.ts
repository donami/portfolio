import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextService } from '../shared/text.service';
import { Text } from '../shared/text';
import * as marked from 'marked';

@Component({
  selector: 'app-about',
  providers: [TextService],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {

  text: Text;
  errorMessage: string;

  constructor(private textService: TextService) { }

  ngOnInit() {
    this.getText('57db409680a35d2f240087ce');
  }

  getText(id: string): void {
    this.textService.getText(id)
      .then(
        (text) => {
          this.text = text;
          this.text.content = this.parseMarkdown(text.content);
        },
        (err) => this.errorMessage = err
    );
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
