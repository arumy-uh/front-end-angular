import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { LoginModel } from "../models/login.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    urlAPI:string = environment.apiUrl;
    isLoggedIn:boolean = false; 
    headers = new HttpHeaders();
    constructor(private http:HttpClient){
        this.urlAPI = this.urlAPI + 'api/auth/login';
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }
    
    
    login(login: LoginModel): Observable<boolean>{
        let data = JSON.stringify(login); 
        return this.http.post<any>(this.urlAPI, data, {headers:this.headers}).pipe(
           map((response)=>{
                localStorage.setItem('token_JWT', response.token);
                return true; 
           })
        ); 

    }

    validateToken(token:string) : Observable<any>{
        return this.http.get<any>(`${this.urlAPI}/validateToken?token=${token}`); 
    }

    logOut(): void {
        localStorage.removeItem('token_JWT');
    }

    
}