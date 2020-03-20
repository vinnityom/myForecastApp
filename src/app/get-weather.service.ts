import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetWeatherInterceptor } from './get-weather.interceptor';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  constructor(
    private http: HttpClient,
  ) {}

  public getWhether(city: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const numberOfIntervals = '40';
  
      const params = { q: city, cnt: numberOfIntervals, units: 'metric' }
      const url = 'https://api.openweathermap.org/data/2.5/forecast?'
  
      return this.http.post(url, null, { params }).subscribe(
        (response: any) => {
          const intervalsInAday = 8;
          const fiveDays = response.list.filter((item, index) => index % intervalsInAday === 0);
          
          resolve(fiveDays);
        },
        (response: any) => {
          reject(response.error);
        }
      );
    })
  }
}
