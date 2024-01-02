import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = new HttpHeaders()
    .set('x-rapidapi-host', 'v3.football.api-sports.io')
    .set('x-rapidapi-key', 'df6a5ce01417f57fa1ef9af581bb0db1');
  const authReq = req.clone({
    headers,
  });
  let loaderService = inject(LoaderService);
  loaderService.show();
  return next(authReq);
};
