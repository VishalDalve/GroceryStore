import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = '';
  password = "";
  constructor(public dialog: MatDialog, public auth: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.auth.updateLoginStatus(true);
  }
  onNoClick() {
    this.dialog.closeAll();
  }

}
