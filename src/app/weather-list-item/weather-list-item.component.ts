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
  public temperature: number;
  public feelsLike: number;

  constructor() {
  }

  ngOnInit(): void {
    this.date = moment(this.day.date).format('DD.MM');

    const { temperature, feelsLike } = this.day;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
  }
}
