import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = new HttpHeaders()
    .set('x-rapidapi-host', 'v3.football.api-sports.io')
    .set('x-rapidapi-key', 'f1d7b9bc3d7306b05020dc80b5881197');
  const authReq = req.clone({
    headers,
  });
  let loaderService = inject(LoaderService);
  loaderService.show();
  return next(authReq);
};
