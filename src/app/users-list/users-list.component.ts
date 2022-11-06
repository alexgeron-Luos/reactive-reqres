import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UsersStore } from '../services/users.store';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Input()
  users: User[] | any = [];
  faTrash = faTrash;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;

  activeUser: User | any;

  constructor(private usersStore: UsersStore) {}

  ngOnInit(): void {}

  openUserDetail(user: User) {
    this.activeUser = user;
  }

  onBackToSearch() {
    this.activeUser = null;
  }

  onDeleteUser(user: User) {
    this.usersStore.deleteUser(user);
  }
}
