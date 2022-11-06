import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from './services/auth.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reactive-reqres';

  constructor(private router: Router, public auth: AuthStore) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
