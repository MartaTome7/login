import { Component, VERSION } from '@angular/core';
import { HttpAuthenticationService } from './authentication/httpauthentication.service';
import { User } from './authentication/login/user';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUser: User;
  name = 'Angular ' + VERSION.major;

  constructor(private httpAuthenticationService: HttpAuthenticationService) {
    this.httpAuthenticationService.user.subscribe(
      (x) => (this.currentUser = x)
    );
  }
}
