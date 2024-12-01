import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserService{
    urlAPI:string = environment.apiUrl;
    headers = new HttpHeaders();

    constructor(private http:HttpClient){
        this.urlAPI = this.urlAPI + 'api/users';
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUser(id:number): Observable<any>{
        return this.http.get<any>(`${this.urlAPI}/${id}`, {headers:this.headers}); 
    }
    getAllUsers(): Observable<any>{
        return this.http.get<any>(this.urlAPI, {headers:this.headers}); 
    }
    createUser(user:UserModel): Observable<any> {
        return this.http.post(this.urlAPI, user, {headers:this.headers});
    }
    updateUser(id:number, user:UserModel): Observable<any>{
        return this.http.put<any>(`${this.urlAPI}/${id}`, user, {headers:this.headers});
    }
    deleteUser(id:any): Observable<any>{
        return this.http.delete(`${this.urlAPI}/${id}`, {headers:this.headers});
    }
}