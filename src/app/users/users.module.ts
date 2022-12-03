import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SearchComponent } from './pages/search/search.component';
import { UserComponent } from './pages/user/user.component';
import { MaterialModule } from '../material/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { ContactComponent } from './pages/contact/contact.component';
@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    SearchComponent,
    UserComponent,
    DashboardComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HighchartsChartModule,
  ],
  entryComponents: [UserComponent],
})
export class UsersModule {}
