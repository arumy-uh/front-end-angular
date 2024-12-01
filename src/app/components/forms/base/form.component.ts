import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, input, OnChanges, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef} from '@angular/material/dialog'
import { UserService } from '../../../services/user.service';
import { ProjectModel } from '../../../models/project.model';

@Component({
    selector:'form-component',
    templateUrl:'./form.component.html',
    styleUrl: './form.component.css',
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, CommonModule,
        MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent implements OnInit, OnChanges{

    title = input<string>();
    data = input<any>();

    saveProject= output<any>(); 

    projectData!:ProjectModel;
    projectFormGroup!: FormGroup;
    statusType!:any[]; 
    users!:any[];

    errorMessage = signal('El campo es requerido'); 


    constructor(private userService:UserService, public dialogRef: MatDialogRef<FormComponent>){
        this.statusType = [
            {value:'Sin iniciar'},
            {value:'Iniciado'},
            {value:'Planeacion'},
            {value:'En progreso'},
            {value:'Pausado'},
            {value:'Cancelado'},
            {value:'Finalizado'}
        ];  
    }
     
    ngOnInit(): void {
       this.projectFormGroup = new FormGroup({
         Name: new FormControl('', [Validators.required]),
         Description: new FormControl('', [Validators.required]), 
         Status: new FormControl([], [Validators.required]), 
         AssignedTo: new FormControl([], [Validators.required])
       })
       this.getUsers();
    }

    ngOnChanges(changes: any): void {
        if(changes.data){
            this.setDataForm(); 
        }
    }
    get projectControls(){
        return this.projectFormGroup.controls;
    }

    setDataForm(){
        if(this.projectFormGroup !== undefined){
            const {name, status, assignedTo, description} = this.data();
            this.projectFormGroup.get('Name')?.setValue(name); 
            this.projectFormGroup.get('Description')?.setValue(description); 
            this.projectFormGroup.get('Status')?.setValue(status); 
            this.projectFormGroup.get('AssignedTo')?.setValue(assignedTo); 
        }

    }

    getUsers(){
        this.userService.getAllUsers().subscribe((response)=>{
           this.users = response; 
        })
    }

    save(){
       this.projectData = this.projectFormGroup.value;
       return this.saveProject.emit(this.projectData); 
    }

    cancel(){
        this.projectFormGroup.reset(); 
        this.dialogRef.close(); 
    }
}