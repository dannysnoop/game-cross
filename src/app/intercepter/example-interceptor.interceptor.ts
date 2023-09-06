import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token= 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3d2VjaGFtMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTY1ODA1NjF9.6Jp626GaaVckiCaa1LZ01Bc5uo0nsRXj4Pq2lWYWL0UVsVB-Derj8rx7VaogFX-Q1UQYr2NnL7QZTai2LM55Uw'
    return next.handle(httpRequest.clone({ setHeaders: { authorization: `Bearer ${access_token}`  }
    }));
  }
}
