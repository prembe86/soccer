import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { PARTIAL_URLS_TO_CACHE } from '../constants/soccer-updates-constant';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  cacheMap = new Map<string, HttpResponse<unknown>>();
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isReqeustCachable(request)) {
      return next.handle(request);
    } else {
      const url = request.url.toLowerCase();
      if (this.cacheMap.has(url)) {
        return of(this.cacheMap.get(url) as HttpResponse<unknown>);
      } else {
        return next.handle(request).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              this.cacheMap.set(url, event);
            }
          })
        );
      }
    }
  }

  isReqeustCachable(req: HttpRequest<unknown>): boolean {
    if (req.method === 'GET') {
      const urls = PARTIAL_URLS_TO_CACHE;
      for (let i = 0; i < urls.length; i++) {
        if (req.url.toLowerCase().includes(urls[i].toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }
}
