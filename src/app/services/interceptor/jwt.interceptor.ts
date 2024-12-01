import { HttpInterceptorFn } from "@angular/common/http";

export const JwtInterceptor:HttpInterceptorFn = (req, next)=>{
       const token_JWT = localStorage.getItem('token_JWT');  
        if(token_JWT ){
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token_JWT}`
                }
            });
            return next(authReq);
        }else{
            return next(req);
        }
}