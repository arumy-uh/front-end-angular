import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormComponent } from "../base/form.component";
import { ProjectsService } from "../../../services/projects.service";
import { ProjectModel } from "../../../models/project.model";

@Component({
    selector:'edit-project-component',
    templateUrl:'./edit-project.component.html',
    styleUrl: './edit-project.component.css',
    imports:[FormComponent, MatDialogModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProjectComponent{
    title:string = "Editar proyecto"; 
    id!:number;
    dataProject:any = signal('');
    readonly data = inject<any>(MAT_DIALOG_DATA);

    constructor(private projectsService:ProjectsService,
        public dialogRef: MatDialogRef<EditProjectComponent>
    ){ 
        this.id = this.data.id; 
    }
    
    ngOnInit(): void {
        this.getProject();  
    }
    getProject(){
        this.projectsService.getProject(this.id).subscribe((response)=>{ 
            this.dataProject.set(response); 
        });
       
   }
   save(data:ProjectModel){   
        data.id= this.id; 
        this.projectsService.updateProject(this.id , data).subscribe((response)=>{
            this.dialogRef.close(); 
        });
   }
}