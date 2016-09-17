import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { TextService } from '../shared/text.service';
import { Text } from '../shared/text';
import { MessageComponent } from '../shared/message.component';
import { Message } from '../shared/message';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [TextService],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  text: AbstractControl;

  contentText: Text;
  errorMessage: string;
  submitted: boolean;

  message: Message;

  constructor(private formBuilder: FormBuilder, private textService: TextService) {
    this.initForm();
  }

  ngOnInit() {
    this.getText('57dc1551495d0910dd299156');
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
      this.message = new Message('Thanks!', 'Your message was successfully sent, we will get back to you as soon as possible', 'positive');
      this.initForm();
    }
  }

  getText(id: string): void {
    this.textService.getText(id)
      .then(
        (text) => this.contentText = text,
        (err) => this.errorMessage = err
      );
  }

  closeMessage(event): void {
    this.message = null;
  }

}
