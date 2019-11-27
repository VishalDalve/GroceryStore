import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { REGEX } from '../util/constants';
import { MustMatch } from '../util/validators/MustMatch.Validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public signupDetail = {
    email: '',
    password: '',
    cnfpassword: '',
    name: '',
    address: '',
    contact: ''
  }
  constructor(private formBuilder: FormBuilder) { }

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



}
