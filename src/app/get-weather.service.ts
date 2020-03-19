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
      const numberOfDays = '5';
  
      const params = { q: city, cnt: numberOfDays }
      const url = 'https://api.openweathermap.org/data/2.5/forecast/daily?'
  
      return this.http.post(url, null, { params }).subscribe(resolve, reject);
    })
  }
}
