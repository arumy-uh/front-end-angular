 import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../login.service';
import { catchError, map, of } from 'rxjs';

export const LoginGuardService: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const token = localStorage.getItem('token_JWT') || "" ; 
    const router = inject(Router);
    const authLogin = inject(LoginService); 
    
    if( token !== ""){
      return authLogin.validateToken(token).pipe(
        map(data => {
             if(data?.isSuccess){
                  return true
             } else{
                authLogin.logOut(); 
                router.navigate(['/login'])
                return false;
             }
        }),
        catchError(error => {
          authLogin.logOut(); 
          router.navigate(['/login'])
          return of(false);
        })
      )
    }else{
      authLogin.logOut(); 
      router.navigate(['/login'])
      return false;
    }
   
}
