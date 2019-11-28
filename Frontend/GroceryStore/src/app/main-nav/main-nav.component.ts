import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStorageService } from 'src/services/storage/local-storage.service';
import { ToastmsgService } from 'src/services/toaster/toastmsg.service';


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
    private toast: ToastmsgService
  ) {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.userName = this.lStorage.getStorageVal('userName');
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.lStorage.getStorageVal('userName')) {
      this.isLoggedIn = true;
      this.userName = this.lStorage.getStorageVal('userName');
    }
  }

  dialogOpened(dialogName: string) {
    this.openDialog.emit(dialogName);
  }

  onLogout() {
    this.authService.updateLoginStatus(false);
    this.lStorage.clearStorage();
    this.toast.success('Logged out Successfully!')
  }



}
