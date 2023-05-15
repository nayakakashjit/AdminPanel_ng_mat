import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedResponse = new BehaviorSubject<any>({});

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) { }

  public login(user: User){
    if (user.email !== '' && user.password !== '' ) {
      this.httpService.post('login', user)
      .pipe(
        tap(response => {
          console.log(response);
          this.loggedIn.next(true);
          this.loggedResponse.next(response)
          this.router.navigate(['/home']);
        }),
        catchError((error) => {
          console.log(error);
          this.loggedResponse.next(error);
          return of(null)
        })
      )
      .subscribe()
    }
  }

  public logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}
