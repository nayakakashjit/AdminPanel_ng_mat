import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@app/core/auth/auth.service';
import { StorageService } from '@app/core/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public isLoggedIn$!: Observable<boolean>;
  public user: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  public ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.get_user();
  }

  public onLogout() {
    this.authService.logout();
  }

  public toggleSidenav() {
    this.drawer.toggle();
  }

  public get_user() {
    if (this.storageService.getUser().data) {
      this.user = this.storageService.getUser().data[0];
    }
  }
}
