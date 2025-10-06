import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ImageCacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Solo interceptamos GET requests de imágenes
    if (req.method !== 'GET' || !req.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      return next.handle(req);
    }

    // Intentar obtener del cache
    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    // Si no está en cache, hacer la petición y guardar en cache
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event.clone());
        }
      })
    );
  }
}