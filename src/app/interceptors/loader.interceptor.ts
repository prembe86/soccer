import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private loaderService: LoaderService = inject(LoaderService);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
        return event;
      })
    );
  }
}
