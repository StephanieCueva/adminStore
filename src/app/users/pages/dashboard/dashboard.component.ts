import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  chartOptions!: {};

  Highcharts = Highcharts;
  users: User[] = [];
  constructor(private userService: UsersService) {
    //this.getUsers();
  }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Mega Vendidos',
      },
      subtitle: {
        text: 'Tecnologico',
      },
      tooltip: {
        split: true,
        valueSuffix: 'millions',
      },
      creditos: {
        enable: false,
      },
      exporting: {
        enable: true,
      },
      series: [
        {
          name: 'Audifonos',
          data: [502, 635, 809, 947, 1402, 3634, 5268],
        },
        {
          name: 'Laptops',
          data: [501, 600, 509, 947, 102, 4634, 2568],
        },
        {
          name: 'Mause',
          data: [601, 435, 709, 247, 102, 2634, 4268],
        },
        {
          name: 'Case',
          data: [291, 435, 609, 247, 102, 3204, 3268],
        },
        {
          name: 'Adaptadores',
          data: [291, 435, 609, 247, 102, 3204, 3268],
        },
      ],
    };
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log('this.users', this.users);
    });
  }
}
