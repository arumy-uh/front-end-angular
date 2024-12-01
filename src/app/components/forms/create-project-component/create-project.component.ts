import { Component } from "@angular/core";
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { FormComponent } from "../base/form.component";
import { ProjectsService } from "../../../services/projects.service";

@Component({
    selector:'create-project-component',
    templateUrl:'./create-project.component.html',
    styleUrl: './create-project.component.css',
    imports:[FormComponent, MatDialogModule, MatButtonModule]
})
export class CreateProjectComponent{
    title:string = "Crear proyecto"; 
    constructor(private projectsService:ProjectsService, 
        public dialogRef: MatDialogRef<CreateProjectComponent>){

    }

    save(data:any){   
        this.projectsService.createProject(data).subscribe((response)=>{
            this.dialogRef.close(); 
        });  
    }
}