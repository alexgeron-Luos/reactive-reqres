import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UsersStore } from '../services/users.store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(public userStore: UsersStore) {}

  ngOnInit(): void {
    this.onLoadUsers(this.userStore.currentPage);
  }

  onLoadUsers(index: number) {
    this.userStore.currentPage = index;
    this.userStore.loadUsersByPage(index);
    this.users$ = this.userStore.getUsers();
  }
}
