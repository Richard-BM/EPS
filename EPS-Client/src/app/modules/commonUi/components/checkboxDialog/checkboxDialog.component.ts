import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-checkboxdialog',
    templateUrl: './checkboxDialog.component.html',
    styleUrls: ['./checkboxDialog.component.css']
})

export class CheckboxDialogComponent {
    checked: boolean;

    constructor(public dialog: DynamicDialogRef, public config: DynamicDialogConfig) {
        
    }

    public diaglogResult(response: boolean) {
        this.dialog.close(response);
    }
}