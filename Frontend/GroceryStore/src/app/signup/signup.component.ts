import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { REGEX } from '../util/constants';
import { MustMatch } from '../util/validators/MustMatch.Validator';
import { AuthService } from 'src/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastmsgService } from 'src/services/toaster/toastmsg.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public dialog: MatDialog,
    private toast: ToastmsgService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      cnfpassword: ['', [Validators.required, Validators.maxLength(8)]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      contact: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    },
      {
        validator: [MustMatch('password', 'cnfpassword')]
      });
  }

  onSignup() {
    this.loading = true;
    const param = { ...this.signupForm.value }
    delete param.cnfpassword;
    this.auth.signup(param).subscribe((res) => {
      console.log(res);
      this.loading = false;
      this.dialog.closeAll();
      this.toast.success('You successfully signed up, Now please login to keep shopping');
    },
      error => {
        this.loading = false;
        this.dialog.closeAll();
        console.log('Err =>', error);
        this.toast.error(error.error.message);
      });
  }

}
