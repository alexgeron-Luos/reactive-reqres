import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UsersStore } from '../services/users.store';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  form: FormGroup;
  user: User;
  constructor(
    private fb: FormBuilder,
    private userStore: UsersStore,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['toto@toto.fr', Validators.required],
      first_name: ['alex', Validators.required],
      last_name: ['geron', Validators.required],
      avatar: [
        'https://cdn-icons-png.flaticon.com/512/147/147140.png',
        Validators.required,
      ],
    });
  }

  save() {
    const newUser: Partial<User> = this.form.value;
    this.userStore.saveUser(newUser);
    this.router.navigateByUrl('/');
  }
}
