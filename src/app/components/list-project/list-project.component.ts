import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ProjectsService } from "../../services/projects.service";
import { CreateProjectComponent } from "../forms/create-project-component/create-project.component";
import { EditProjectComponent } from "../forms/edit-project-component/edit-project.component";
import { SelectionModel } from "@angular/cdk/collections";
import { DialogModel } from "../../models/dialog.model";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
    selector: 'list-project-component', 
    templateUrl: './list-project.component.html', 
    styleUrl: './list-project.component.css',
    imports:[MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, 
        MatSortModule, MatInputModule, MatFormFieldModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProjectComponent implements AfterViewInit{
    dataSource:any = new MatTableDataSource();
    columnsTable:string[] = ['name', 'description', 'status', 'assignedTo', 'edit', 'delete'];
    dataRow:any;
    filter:any; 
    dialogModel!: DialogModel; 

    complete!:number;
    cancel!:number; 
    progress!:number; 
    initial!:number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    selection = new SelectionModel<any>(false)

    readonly dialog = inject(MatDialog);

    constructor(private projectService: ProjectsService){
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllProjects(); 
    }

    openDialogCreateProject() {
        const dialogRef = this.dialog.open(CreateProjectComponent,{
            width: '650px',
        }); 

        dialogRef.afterClosed().subscribe((result:any) => {
            this.getAllProjects(); 
        });
    }

    selectRow(row:any){
        this.dataRow = row;
    }
    
    openDialogEditProject() {
        this.dataRow = this.selection.selected[0];
        const dialogRef =  this.dialog.open(EditProjectComponent,{
            width: '650px',
            data:this.dataRow
        });
            
        dialogRef.afterClosed().subscribe((result:any) => {
            this.getAllProjects(); 
        });
    }

    openDialogMessageDelete(){
        this.dialogModel = {
            title : 'Eliminar proyecto', 
            message : '¿Está seguro de eliminar el proyecto?',
            btnAccept: true,
            btnCancel: true,
            functBtnAccept : ()=> this.deletProject()
        }
        
        const dialogRef = this.dialog.open(DialogComponent,{
            data: this.dialogModel
        });
        dialogRef.afterClosed().subscribe((result:any) => {
            this.getAllProjects(); 
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }

    cleanFilter(){
        this.filter ="";
        this.getAllProjects(); 
    }

    getAllProjects(){
        this.projectService.getAllProjects().subscribe((response:any[])=>{
            this.dataSource.data = response; 
            this.complete = response.filter(project => project.status === 'Finalizado').length; 
            this.initial = response.filter(project => project.status === 'Iniciado').length; 
            this.progress = response.filter(project => project.status === 'En progreso').length; 
            this.cancel = response.filter(project => project.status === 'Cancelado').length; 
        });
    }

    deletProject(){
        this.dataRow = this.selection.selected[0];
        this.projectService.deleteProject(this.dataRow.id).subscribe(()=>{
            this.getAllProjects(); 
            this.dialog.closeAll(); 
        });
    }
}