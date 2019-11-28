import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStorageService } from 'src/services/storage/local-storage.service';
import { SignupComponent } from '../signup/signup.component';
import { ToastmsgService } from 'src/services/toaster/toastmsg.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = '';
  password = "";
  loading = false;
  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private lStorage: LocalStorageService,
    private toast: ToastmsgService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.loading = true;
    this.auth.postApiCall('auth/login', {
      "email": this.userName,
      "password": this.password
    }).subscribe(res => {
      this.lStorage.setStorageVal('authToken', res.data);
      this.lStorage.setStorageVal('userName', res.user.name);
      this.lStorage.setStorageVal('userRole', res.user.role);
      // setTimeout(() => {
      this.loading = false;
      this.auth.updateLoginStatus(true);
      this.dialog.closeAll();
      this.toast.success('You Successfully loggedin! Enjoy shopping');
      // }, 1000);
    }, error => {
      console.log('Err =>', error);
      this.toast.error('Something Went Wrong');
    }
    );
  }
  onNoClick() {
    this.dialog.closeAll();
    this.dialog.open(SignupComponent, {
      width: '350px',
      data: { name: 'Signup' }
    });
  }

}
