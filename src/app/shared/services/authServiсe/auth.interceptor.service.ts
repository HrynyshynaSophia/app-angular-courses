import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpHeaders,
} from '@angular/common/http';
import { LoadingService } from '../loading-service/loading-service.service';
import { finalize } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn:'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    token = localStorage.getItem('token');
    constructor(public loadingService: LoadingService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.loadingService.toggleLoading(true);
        let modifiedRequest = req;
        if (this.token) {
            const headers = new HttpHeaders().append('token', this.token);
            modifiedRequest = req.clone({ headers });
        }
        return next.handle(modifiedRequest).pipe(
            finalize(
                ()=>{
                    this.loadingService.toggleLoading(false);
                }
            )
        )
    }
}
