import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn            // {1}
      .pipe(
        take(1),                                  // {2} 
        map((isLoggedIn: boolean) => {            // {3}
          if (!isLoggedIn){
            this.router.navigate(['/account']);   // {4}
            return false;
          }
          return true;
        })
      )
  }
  
}
/* 
First we are going to retrieve the isLoggedIn ({1}) getter from the AuthService, which is an Observable. 
Since we are only interested in checking the value from the Observalbe a single time (if the user is logged in or not), we will use the take operator ({2}). 
We will verify the value emitted by the BehaviorSubject ({3}) and 
if not logged in we will navigate to the login screen ({4}) and return false. 
The AuthGuard will return true in case the user is logged in, meaning the user can access the route (path: ‘’) which renders the HomeComponent.
*/