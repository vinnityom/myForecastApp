import { Component } from '@angular/core';
import { GetWeatherService } from './get-weather-service/get-weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Day } from './day';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-forecast-app';

  public days: Array<Day> = [];
  public isSearchRunning: boolean = false;
  public isSearchFailed: boolean;
  public isSearchResult: boolean = false;
  public querySubscription: Subscription;

  public searchParams: Observable<any> = this.route.queryParams;

  constructor(
    private getWeatherService: GetWeatherService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.querySubscription = this.searchParams.subscribe((queryParams) => {
      if (!!queryParams.city) {
        this.searchByParametersFromQuery(queryParams);
      }
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  private searchByParametersFromQuery(queryParams: { city: string }): void {
    const { city } = queryParams;

    this.getWeather(city);
  }

  public handleGetWeatherFormSubmit(formValue: { city: string }): void {
    const { city } = formValue;
    
    this.updateSearch({ city });
  }

  private updateSearch(params: { city: string }): void {
    this.router.navigate(['.'], {
      queryParams: params, 
      queryParamsHandling: 'merge'
    })
  }
  
  public async getWeather(city: string): Promise<void> {
    this.resetState();
    
    try {
      const days = await this.getWeatherService.getWhether(city);
      this.isSearchResult = true;
      this.days = days;
    } catch(error) {
      const notFoundCode = 404;
      
      if (error.code = notFoundCode) {
        this.isSearchFailed = true;
      }
    }

    this.isSearchRunning = false;
  }

  private resetState(): void {
    this.days = [];
    this.isSearchFailed = false;
    this.isSearchResult = false;
    this.isSearchRunning = true;
  }
}
