import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SearchComponent } from './pages/search/search.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';

const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'listado', component: ListComponent },
      { path: 'buscar', component: SearchComponent },
      { path: 'contact', component: ContactComponent },
      { path: ':id', component: UserComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
