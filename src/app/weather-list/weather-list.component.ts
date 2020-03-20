import { Component, Input } from '@angular/core';

@Component({
  selector: 'weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent {
  @Input('days') days: Array<any>;

  constructor() { }

  ngOnInit() {
    console.log('DAYZZ: ', this.days);
  }

}
