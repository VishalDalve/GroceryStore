import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStorageService } from 'src/services/storage/local-storage.service';
import { ToastmsgService } from 'src/services/toaster/toastmsg.service';
import { STORAGE } from '../util/constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  @Output() openDialog = new EventEmitter();
  isLoggedIn = false;
  userName = ''

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private lStorage: LocalStorageService,
    private toast: ToastmsgService,
    private router: Router
  ) {

    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.userName = this.lStorage.getStorageVal('userName');
      console.log(isLoggedIn)
    })
    if (this.lStorage.getStorageVal(STORAGE.TOKEN)) {
      this.isLoggedIn = true;
      this.userName = this.lStorage.getStorageVal(STORAGE.USER_NAME);
    }
  }

  public get role(): string {
    return this.lStorage.getStorageVal(STORAGE.USER_ROLE);
  }

  dialogOpened(dialogName: string) {
    this.openDialog.emit(dialogName);
  }

  onLogout() {
    this.authService.updateLoginStatus(false);
    this.lStorage.clearStorage();
    this.toast.success('You successfully loggedout!')
    this.router.navigate(['']);
  }



}
