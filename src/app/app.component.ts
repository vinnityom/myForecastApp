import { Component } from '@angular/core';
import { GetWeatherService } from './get-weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-forecast-app';

  public days: Array<any> = [];
  public isSearchRunning: boolean = false;
  public isSearchFailed: boolean;
  public querySubscription: Subscription;

  private searchParams: Observable<any> = this.route.queryParams;

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

  private updateSearch(params: Partial<any>): void {
    this.router.navigate(['.'], {
      queryParams: params, 
      queryParamsHandling: 'merge'
    })
  }
  
  public async getWeather(city: string): Promise<void> {
    this.days = [];
    this.isSearchFailed = false;
    this.isSearchRunning = true;
    
    try {
      const days = await this.getWeatherService.getWhether(city);
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
