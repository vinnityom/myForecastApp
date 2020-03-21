import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { GetWeatherService } from './get-weather-service/get-weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Day } from './day';
import { SearchResultDirective } from './search-result.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SearchResultDirective, { static: true }) searchResult: SearchResultDirective;
  
  title = 'my-forecast-app';
  
  public isSearchRunning: boolean = false;
  public querySubscription: Subscription;

  public searchParams: Observable<any> = this.route.queryParams;

  private searchResultViewContainerRef: ViewContainerRef;

  constructor(
    private getWeatherService: GetWeatherService,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.querySubscription = this.searchParams.subscribe((queryParams) => {
      if (!!queryParams.city) {
        this.searchByParametersFromQuery(queryParams);
      }
    });
  }

  ngOnInit(): void {
    this.searchResultViewContainerRef = this.searchResult.viewContainerRef;
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
    });
  }
  
  public async getWeather(city: string): Promise<void> {
    this.searchResultViewContainerRef.clear();
    
    try {
      const days = await this.getWeatherService.getWhether(city);
      
      this.embedWeatherListComponent(days);
    } catch(error) {
      const notFoundCode = 404;
      
      if (error.code = notFoundCode) {
        this.embedNotFoundComponent();
      }
    }

    this.isSearchRunning = false;
  }

  private embedWeatherListComponent(days: Day[]): void {
    this.searchResultViewContainerRef = this.searchResult.viewContainerRef;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WeatherListComponent);
    
    const componentRef = this.searchResultViewContainerRef.createComponent(componentFactory);
    (<WeatherListComponent>componentRef.instance).days = days;
  }

  private embedNotFoundComponent(): void {
    this.searchResultViewContainerRef = this.searchResult.viewContainerRef;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NotFoundComponent);
    this.searchResultViewContainerRef.createComponent(componentFactory);
  }
}
