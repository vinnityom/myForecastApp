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
    
    try {
      const response = await this.getWeatherService.getWhether(formValue.city);
      console.log(response);
      this.days = response.list;
    } catch(error) {
      console.log(error);
    }
  }
}
