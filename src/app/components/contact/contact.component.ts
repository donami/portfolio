import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as MessageActions from '../../actions/message.actions';
import * as TextActions from '../../actions/text.actions';
import { Text } from '../../shared/text.interface';
import { Message } from '../../shared/message';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  text: AbstractControl;

  contentText: Text;
  errorMessage: string;
  submitted: boolean;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {

    this.store.select('text')
      .subscribe( (text: Text) => {
        this.contentText = text;
      });

  }

  ngOnInit() {
    this.initForm();
    this.store.dispatch(new TextActions.getText('contact'));
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'text': ['', Validators.required],
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.text = this.form.controls['text'];

    this.submitted = false;
  }

  onSubmit(form: any, valid: boolean): void {
    this.submitted = true;

    if (valid) {
      this.store.dispatch(new MessageActions.addMessage(new Message('Thanks!', 'Your message was successfully sent, we will get back to you as soon as possible', 'positive')));
      this.initForm();
    }
  }

}
