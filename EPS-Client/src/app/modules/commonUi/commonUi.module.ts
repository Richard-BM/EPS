import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CheckboxDialogComponent } from './components/checkboxDialog/checkboxDialog.component';


@NgModule({
    declarations: [
        TableComponent,
        CheckboxDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        TableModule,
        TooltipModule,
        CalendarModule,
        MultiSelectModule,
        SplitButtonModule,
        MenuModule,
        CheckboxModule,
        InputNumberModule,
        InputTextModule,
        TooltipModule,
        MessageModule,
    ],
    exports: [
        TableComponent,
        CheckboxDialogComponent,
    ],
    entryComponents: [
        CheckboxDialogComponent
    ],
})
export class CommonUiModule { }
