import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { DialogModel } from '../../models/dialog.model';

@Component({
    selector:'dialog-component',
    templateUrl:'./dialog.component.html',
    styleUrl: './dialog.component.css',
    imports: [ CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogComponent{
    readonly data = inject<DialogModel>(MAT_DIALOG_DATA);
    constructor(public dialogRef: MatDialogRef<DialogComponent>){
    }
    cancel(){
        this.dialogRef.close(); 
    }
}