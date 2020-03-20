import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Day } from '../day';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  constructor(
    private http: HttpClient,
  ) {}

  public getWhether(city: string): Promise<Day[]> {
    return new Promise((resolve, reject) => {
      const numberOfIntervals = '40';
  
      const params = { q: city, cnt: numberOfIntervals, units: 'metric' }
      const url = 'https://api.openweathermap.org/data/2.5/forecast?'
  
      return this.http.post(url, null, { params }).subscribe(
        (response: HttpResponse<unknown>) => {
          const processedResponse = this.processResponse(response);
          
          resolve(processedResponse);
        },
        (response: HttpErrorResponse) => {
          const processedError = this.processError(response);

          reject(processedError);
        }
      );
    })
  }

  private processResponse(response: any): Array<Day> {
    const intervalsInADay = 8;
    const fiveDays = response.list.filter((item, index) => index % intervalsInADay === 0);

    const days = fiveDays.map((unprocessedDay: any) => {
      const { dt_txt, main: { temp, feels_like } } = unprocessedDay;
      
      return {
        date: new Date(dt_txt),
        temperature: temp,
        feelsLike: feels_like,
      }
    });

    return days;
  }

  private processError(response: any): { code: string, message: string } {
    const { cod, message } = response;

    return { code: cod, message};
  }
}
