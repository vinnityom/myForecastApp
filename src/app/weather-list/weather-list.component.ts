import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent {
  @Input('days') days: Array<any>;

  constructor() { }

  public sort(by: string, direction: string): void {
    const sortingMethodsDispatch = {
      date: () => this.sortByDate(direction),
      temperature: () => this.sortByTemperature(direction),
    };

    sortingMethodsDispatch[by]();
  }

  private sortByDate(direction: string): void {
    const compareFn = this.getCompareFn(direction);

    this.days = this.days.slice().sort((a, b) => compareFn(new Date(a.dt_txt), new Date(b.dt_txt)));
  }

  private sortByTemperature(direction: string): void {
    const compareFn = this.getCompareFn(direction);

    this.days = this.days.slice().sort((a, b) => compareFn(a.main.temp, b.main.temp));    
  }

  private getCompareFn(direction: string): (a: any, b: any) => number {
    const callbackDispatch = {
      forward: (a, b) => a - b,
      backwards: (a, b) => b - a,
    };

    return callbackDispatch[direction];
  }
}
