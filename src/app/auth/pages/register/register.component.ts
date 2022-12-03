import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrarUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth // private toastr: ToastrService
  ) {
    this.registrarUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['/auth/login']);
      })
      .catch((error) => {
        console.log(error);
        //this.toastr.error(this.firebaseError(error.code), 'Error');
      });
  }
}
