import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'weather-list-item',
  templateUrl: './weather-list-item.component.html',
  styleUrls: ['./weather-list-item.component.css']
})
export class WeatherListItemComponent {
  @Input('day') day: any;

  public date: any;
  public dayTemp: number;
  public nightTemp: number;
  public description: string;

  constructor() {
  }

  ngOnInit(): void {
    this.date = moment(new Date(this.day.dt)).format('DD.MM');

    const { day, night } = this.day.temp;
    this.dayTemp = day;
    this.nightTemp = night;

    this.description = this.day.weather[0].description;
  }
}
