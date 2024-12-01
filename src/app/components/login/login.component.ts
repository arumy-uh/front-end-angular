import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { LoginModel } from "../../models/login.model";
import { Router } from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
@Component({
    selector:'login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit{
    loginFormGroup!: FormGroup;
    loginModel! : LoginModel;
    router = inject(Router);
    hide:boolean = true; 
    errorMessage = signal('El campo es requerido'); 

    constructor( private loginService: LoginService){
    }

    ngOnInit(): void {
        this.loginFormGroup = new FormGroup({
            UserName: new FormControl('', [Validators.required]),
            Password: new FormControl('', [Validators.required])
        });
    }

    get projectControls(){
        return this.loginFormGroup.controls;
    }

    login(): void{
        this.loginModel = {
            UserName: this.loginFormGroup.get('UserName')?.value,
            Password : this.loginFormGroup.get('Password')?.value
        };

         this.loginService.login(this.loginModel).subscribe(response =>{
            if(response){
                this.router.navigate(['/home']); 
            }
         }); 
    }
    register(){
        this.router.navigate(['/register']); 
    }

}