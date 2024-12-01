import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from "../../services/user.service";

@Component({
    selector:'user-component',
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, CommonModule]
})
export class UserComponent implements OnInit{
    userFormGroup!: FormGroup;
    router = inject(Router);
    hide:boolean = true; 
    errorMessage = signal('El campo es requerido'); 

    constructor( private userService: UserService){
    }

    ngOnInit(): void {
        this.userFormGroup = new FormGroup({
            FirstName: new FormControl('', [Validators.required]),
            LastName: new FormControl('', [Validators.required]),
            Email: new FormControl('', [Validators.required]),
            UserName: new FormControl('', [Validators.required]),
            Password: new FormControl('', [Validators.required])
        });
    }

    get userControls(){
        return this.userFormGroup.controls;
    }

    register(): void{
        this.userService.createUser(this.userFormGroup.value).subscribe((response)=>{
           this.router.navigate(['/login']);
        })
    }
    cancel(){
        this.router.navigate(['/login']); 
    }

}