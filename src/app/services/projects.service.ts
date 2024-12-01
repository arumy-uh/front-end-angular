import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { ProjectModel } from "../models/project.model";

@Injectable({
    providedIn: 'root'
})
export class ProjectsService{
    urlAPI:string = environment.apiUrl;
    headers = new HttpHeaders();

    constructor(private http:HttpClient){
        this.urlAPI = this.urlAPI + 'api/projects';
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProject(id:number): Observable<any>{
        return this.http.get<any>(`${this.urlAPI}/${id}`, {headers:this.headers}); 
    }
    getAllProjects(): Observable<any>{
        return this.http.get<any>(this.urlAPI, {headers:this.headers}); 
    }
    createProject(project:ProjectModel): Observable<any> {
        return this.http.post(this.urlAPI, project, {headers:this.headers});
    }
    updateProject(id:number, project:ProjectModel): Observable<any>{
        return this.http.put<any>(`${this.urlAPI}/${id}`, project, {headers:this.headers});
    }
    deleteProject(id:any): Observable<any>{
        return this.http.delete(`${this.urlAPI}/${id}`, {headers:this.headers});
    }
}