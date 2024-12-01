import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, retry, throwError } from "rxjs";

export const ServerErrorInterceptor:HttpInterceptorFn = (req, next)=>
    next(req).pipe(
        catchError((error:HttpErrorResponse) =>{
          return throwError(()=> error)
        })
      ); 
