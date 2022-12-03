import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  rol: any[] = [
    'Administrador',
    'Vendedor',
    'Operador logistico',
    'Teleoperador',
  ];
  sexo: any[] = ['Masculino', 'Femenino'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rol: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      sexo: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
  agregarUsuario() {
    const user: User = {
      usuario: this.form.value.usuario,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      rol: this.form.value.rol,
      email: this.form.value.email,
      telefono: this.form.value.telefono,
      sexo: this.form.value.sexo,
      fecha: this.form.value.fecha,
      ciudad: '',
      clave: '',
    };

    if (this.data) {
      console.log('EXISTE ID');
      this.userService.editUser(user, this.data.id).then(() => {
        this._snackBar.open('El usuario fue editado con exito!', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
    }

    if (!this.data) {
      console.log('ESLEEEE');
      this.userService.addUser(user).then((data) => {
        this._snackBar.open('El usuario fue agregado con exito!', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
    }

    this.dialogRef.close();
  }
  // createForm() {
  //   let emailregex: RegExp =
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   this.formGroup = this.formBuilder.group({
  //     email: [
  //       null,
  //       [Validators.required, Validators.pattern(emailregex)],
  //       this.checkInUseEmail,
  //     ],
  //     name: [null, Validators.required],
  //     password: [null, [Validators.required, this.checkPassword]],
  //     description: [
  //       null,
  //       [
  //         Validators.required,
  //         Validators.minLength(5),
  //         Validators.maxLength(10),
  //       ],
  //     ],
  //     validate: '',
  //   });
  // }

  // setChangeValidate() {
  //   this.formGroup
  //     .get('validate')
  //     .valueChanges.subscribe((validate: string) => {
  //       if (validate == '1') {
  //         this.formGroup
  //           .get('name')
  //           .setValidators([Validators.required, Validators.minLength(3)]);
  //         this.titleAlert = 'You need to specify at least 3 characters';
  //       } else {
  //         this.formGroup.get('name').setValidators(Validators.required);
  //       }
  //       this.formGroup.get('name').updateValueAndValidity();
  //     });
  // }

  // get name() {
  //   return this.formGroup.get('name') as FormControl;
  // }

  // checkPassword(control: { value: any }) {
  //   let enteredPassword = control.value;
  //   let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return !passwordCheck.test(enteredPassword) && enteredPassword
  //     ? { requirements: true }
  //     : null;
  // }

  // checkInUseEmail(control: { value: string }) {
  //   // mimic http database access
  //   let db = ['tony@gmail.com'];
  //   return new Observable(
  //     (observer: {
  //       next: (arg0: { alreadyInUse: boolean } | null) => void;
  //       complete: () => void;
  //     }) => {
  //       setTimeout(() => {
  //         let result =
  //           db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
  //         observer.next(result);
  //         observer.complete();
  //       }, 4000);
  //     }
  //   );
  // }

  // getErrorEmail() {
  //   return this.formGroup.get('email').hasError('required')
  //     ? 'Field is required'
  //     : this.formGroup.get('email').hasError('pattern')
  //     ? 'Not a valid emailaddress'
  //     : this.formGroup.get('email').hasError('alreadyInUse')
  //     ? 'This emailaddress is already in use'
  //     : '';
  // }

  // getErrorPassword() {
  //   return this.formGroup.get('password').hasError('required')
  //     ? 'Field is required (at least eight characters, one uppercase letter and one number)'
  //     : this.formGroup.get('password').hasError('requirements')
  //     ? 'Password needs to be at least eight characters, one uppercase letter and one number'
  //     : '';
  // }

  // onSubmit(post: any) {
  //   this.post = post;
  // }
}
