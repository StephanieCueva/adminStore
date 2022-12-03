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
    console.log('User created');
    console.log(this.formulario.value);
    this.userService.addUser(this.formulario.value);
  }
  getAll() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users.data = data;
      //console.log(this.users);
    });
  }
  deleteUser(user: User) {
    let decision = confirm('Are you sure?');
    if (decision === true) {
      console.log('eliminando');
      this.userService.deleteUser(user);
    }
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
    console.log('user', user);

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
