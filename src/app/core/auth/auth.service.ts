import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.storageService.isLoggedIn());
  public loggedResponse = new BehaviorSubject<any>({});

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
    private storageService: StorageService
  ) { }

  public login(user: User) {
    if (user.email !== '' && user.password !== '') {
      this.httpService.post('login', user)
        .pipe(
          tap(response => {
            this.loggedResponse.next(response);
            if (response.status === 'success') {
              this.storageService.saveUser(response);
              this.router.navigate(['/home']);
              const checkLogin = this.storageService.isLoggedIn();
              this.loggedIn.next(checkLogin);
            }
          }),
          catchError((error) => {
            console.log('error', error);
            this.loggedResponse.next(error);
            return of(null)
          })
        )
        .subscribe()
    }
  }

  public logout() {
    this.httpService.get('logout').subscribe(
      (response) => {
        this.loggedIn.next(false);
        this.storageService.clean();
        this.router.navigate(['/']);
        this.loggedResponse.next(response);
      },
      (error) => {
        this.loggedResponse.next(error);
      }
    )
  }
}
