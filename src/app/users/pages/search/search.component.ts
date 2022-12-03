import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  termino: string = '';
  heroes: User[] = [];
  UserSeleccionado: User | undefined;
  constructor(private userService: UsersService) {}

  buscando() {
    this.userService.getUsers().subscribe((heroes) => (this.heroes = heroes));
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.UserSeleccionado = undefined;
      return;
    }

    const user: User = event.option.value;
    this.termino = user.nombre;

    // this.userService
    //   .getUsers(user.id!)
    //   .subscribe((user) => (this.UserSeleccionado = user));
  }
}
