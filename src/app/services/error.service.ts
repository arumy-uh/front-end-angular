import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getServerMessage(error: HttpErrorResponse): string {
        let message:any; 
        switch(error.status){
            case 404: 
                message = "No se encontró la información"; 
            break; 
            default:
                message = 'Ocurrió un error en el servidor, intenta más tarde'; 
            break;
        }
        
        return message;
    }
}