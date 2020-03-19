import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

@Injectable()
export class GetWeatherInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const APP_ID = '38e76ac30c61b85e7da876f978b8be39';

    const whetherRequest = request.clone({
      params: request.params.set('appid', APP_ID)
    });

    return next.handle(whetherRequest).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('Server response: ', event);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              console.log('Error: ', error);
            }
          }
        }
      )
    )
  }
}
