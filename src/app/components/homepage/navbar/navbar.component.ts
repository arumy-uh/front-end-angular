import { Component, inject } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { LoginService } from "../../../services/login.service";
import { Router } from "@angular/router";

@Component({
    selector: 'nav-bar', 
    templateUrl: './navbar.component.html', 
    styleUrl: './navbar.component.css',
    imports:[MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule]
})

export class NavbarComponent{
    router = inject(Router);
    constructor(private loginService: LoginService){

    }
    logOut(){
        this.loginService.logOut(); 
        this.router.navigate(['/login']); 
    }
}