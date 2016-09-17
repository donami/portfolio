import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextService } from '../shared/text.service';
import { Text } from '../shared/text';
import * as marked from 'marked';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  providers: [TextService],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent implements OnInit {

  text: Text;
  errorMessage: string;

  constructor(private textService: TextService) { }

  ngOnInit() {
    this.findTextById('57dae89148d7b92e8732d0fb');
  }

  findTextById(id: string): void {
    this.textService.getText(id)
      .then(
        text => {
          this.text = text;
          this.text.content = this.parseMarkdown(text.content);
        },
        error => this.errorMessage = <any>error
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
