import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LocalStorageService } from 'src/services/storage/local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GroceryStore';
  isLoggedIn = false;
  userName = '';

  constructor(
    public dialog: MatDialog,
    private lStorage: LocalStorageService,
  ) {

  }

  loggedIn(authObj: string) {
    this.isLoggedIn = true;
  }

  openDialog(event: String): void {
    if (event === 'login') {
      this.openLoginDialog();
    } else {
      this.openSignupDialog();
    }
  }

  openLoginDialog(): void {
    // console.log(event);
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: { name: 'Login', animal: 'Hi' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '350px',
      data: { name: 'Signup', animal: 'Hi' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Signup dialog was closed');

    });
  }
}
