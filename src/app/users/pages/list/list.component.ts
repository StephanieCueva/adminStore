import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  usuarios: any[] = [];
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'opciones'];
  users = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formulario: FormGroup;
  //users: User[] = [];
  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.getAll();
    this.formulario = this.fb.group({
      email: [
        'reynaldoquispe@gmail.com',
        [Validators.required, Validators.email],
      ],
      nombre: ['Reynaldo', Validators.required],
      edad: [25, Validators.required],
      sexo: ['Masculino', Validators.required],
      pais: ['Peru', Validators.required],
      cantidadProductosComprados: [2, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAll();
  }
  onSubmitUser() {
    Swal.fire({
      title: '¿Está seguro que desea agregar este registro?',
      text: 'Esta operación es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.addUser(this.formulario.value);
        Swal.fire(
          'Usuario agregado!',
          'El usuario fue registrado con éxito',
          'success'
        );
      }
    });
  }
  getAll() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users.data = data;
    });
  }
  deleteUser(user: User) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este registro?',
      text: 'Esta operación es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user);
        Swal.fire(
          'Eliminado!',
          'El registro fue eliminado con éxito',
          'success'
        );
      }
    });
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  onCreate(user?: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    if (user) {
      dialogConfig.data = user;
    }
    const dialogRef = this.dialog.open(UserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
