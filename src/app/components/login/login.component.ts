import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../authentication.service';
import * as MessageActions from '../../actions/message.actions';
import { Message } from '../../shared/message';
import { AppState } from '../../reducers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {}

  login(username: string, password: string): void {

    this.authService.login(username, password)
      .then((res) => {
        this.store.dispatch(new MessageActions.addMessage(new Message('Authenticated!', 'You are now signed in', 'positive')));
        localStorage.setItem('username', res.username);
        this.router.navigate(['admin']);
      })
      .catch(err => {
        let error = err.json();
        if (error.message !== undefined) {
          this.store.dispatch(new MessageActions.addMessage(new Message('Something went wrong', error.message, 'warning')));
        }
        else {
          console.log(err);
        }
      });

  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

  isAuthed(): boolean {
    return this.authService.isLoggedIn();
  }

}
