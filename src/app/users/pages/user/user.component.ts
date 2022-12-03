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
      this.userService.editUser(user, this.data.id).then(() => {
        this._snackBar.open('El usuario fue editado con exito!', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
    }

    if (!this.data) {
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
}
