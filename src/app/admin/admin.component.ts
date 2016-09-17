import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [WorkService],
  directives: [REACTIVE_FORM_DIRECTIVES],
  animations: [
    trigger('segmentState', [
      state('inactive', style({
        opacity: 0,
        height: 0
      })),
      state('active', style({
        height: '*',
        opacity: 1
      })),
      transition('inactive <=> active', [
        animate('0.2s 12ms ease-in')
      ]),
    ])
  ]
})
export class AdminComponent {
  form: FormGroup;
  title: AbstractControl;
  message: {
    type: string,
    title: string,
    message: string
  };
  segment: {
    state: string
  };

  constructor(private workService: WorkService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      'title': ['', Validators.required],
    });

    this.segment = {
      state: 'inactive'
    };

    this.title = this.form.controls['title'];
  }

  onSubmit(form: any): void {
    this.workService.addWork(form.title)
      .then(
        work => {
          this.toggleState('inactive');
          (<AbstractControl>this.form.controls['title']).setValue('');

          this.message = {
            type: 'success',
            title: 'Added successfully',
            message: 'Work was added successfully',
          };
        }
      );
  }

  toggleState(state?: string): void {
    if (state) {
      this.segment.state = state;
      return;
    }

    if (this.segment.state == 'active') {
      this.segment.state = 'inactive';
    }
    else {
      this.segment.state = 'active';
    }
  }
}
