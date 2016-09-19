import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(public authService: AuthenticationService) {
    this.message = '';
  }

  ngOnInit() {
  }

  login(username: string, password: string): boolean {
    this.message = '';

    if (!this.authService.login(username, password)) {
      this.message = 'Incorrect credentials';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

  isAuthed(): boolean {
    return this.authService.isLoggedIn();
  }

}
