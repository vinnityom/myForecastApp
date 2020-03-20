import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetWeatherService } from './get-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-forecast-app';

  public getWeatherForm: FormGroup;
  public days: Array<any> = [];
  public isSearchRunning: boolean = false;
  public isSearchFailed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private getWeatherService: GetWeatherService,
  ) {
    this.getWeatherForm = formBuilder.group({
      city: '',
    })
  }
  
  public async getWeather(formValue: { city: string }): Promise<void> {
    this.days = [];
    this.isSearchFailed = false;
    this.isSearchRunning = true;
    
    try {
      const days = await this.getWeatherService.getWhether(formValue.city);
      this.days = days;
    } catch(error) {
      const notFoundCode = 404;
      
      if (error.cod = notFoundCode) {
        this.isSearchFailed = true;
      }
    }

    this.isSearchRunning = false;
  }
}
