import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../model/user';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private subject = new BehaviorSubject<User[]>([]);

  users$: Observable<User[]> = this.subject.asObservable();
  nextId: number = 0;
  currentPage: number = 1;

  constructor(private http: HttpClient) {
    this.loadUsersByPage(1);
  }

  loadUsersByPage(index: number) {
    const url = environment.apiUrl + 'users?page=' + index;
    this.http
      .get<User[]>(url)
      .pipe(
        map((response: any) => response['data']),
        catchError((err) => {
          const message = 'Could not load users';

          console.log(message, err);
          return throwError(err);
        }),
        tap((users: any) => {
          let usersList: User[] = this.subject.getValue();

          users.forEach((user: User) => {
            index = usersList.findIndex((x) => x.id == user.id);
            if (index === -1) {
              usersList.push(user);
            }
          });
          this.nextId = usersList.length;
          return this.subject.next(usersList);
        }),
        shareReplay()
      )
      .subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  saveUser(user: Partial<User>) {
    const newUser: User = {
      id: this.nextId,
      email: user.email!,
      first_name: user.first_name!,
      last_name: user.last_name!,
      avatar: user.avatar!,
    };
    let newUsersList: User[] = this.subject.getValue();
    newUsersList.push(newUser);
    this.subject.next(newUsersList);

    const url = environment.apiUrl + 'users';
    return this.http.post<User>(url, newUser).pipe(
      catchError((err) => {
        const message = 'Could not save user';
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  deleteUser(user: any) {
    let usersList: User[] = this.subject.getValue();
    const newUsersList = usersList.filter((usr) => {
      return usr.id !== user.id;
    });
    this.nextId = newUsersList.length;
    this.subject.next(newUsersList);

    const url = environment.apiUrl + 'users';
    return this.http.delete(url, user.id).pipe(
      catchError((err) => {
        const message = 'Could not save user';
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }
}
