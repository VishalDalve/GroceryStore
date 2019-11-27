import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStorageService } from 'src/services/storage/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = '';
  password = "";
  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private lStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.auth.postApiCall('auth/login', {
      "email": this.userName,
      "password": this.password
    }).subscribe(res => {
      this.lStorage.setStorageVal('authToken', res.data);
      this.lStorage.setStorageVal('userName', res.user.name);
      this.lStorage.setStorageVal('userRole', res.user.role);
      this.auth.updateLoginStatus(true);
    }, error => alert('Something Went Wrong')
    );
  }
  onNoClick() {
    this.dialog.closeAll();
  }

}
