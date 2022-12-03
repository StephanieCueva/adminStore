import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FirebaseCodeErrorService } from '../../services/firebase-error.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,

    private firebaseError: FirebaseCodeErrorService
  ) {
    this.form = this.fb.group({
      email: ['reynaldo@gmail.com', [Validators.required, Validators.email]],
      password: ['Rey@123', Validators.required],
    });
  }

  submit() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.loading = true;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['users/dashboard']);
        //this.toastr.success('Welcome to the app');
      })
      .catch((error) => {
        this.loading = false;
        console.log(error.code);
        //this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
