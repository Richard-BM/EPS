import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonUiModule } from '../commonUi/commonUi.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DragDropModule } from 'primeng/dragdrop';
import { FormsModule } from '@angular/forms';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentAssistantComponent } from './components/appointmentAssistant/appointmentAssistant.component';
import { WizardModule } from '../wizard/wizard.module';
import { TabViewModule } from 'primeng/tabview';
import { AppointmentEditService } from './services/appointmentEditService.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppointmentGeneralService } from './services/appointmentGeneralService.service';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [
        OverviewComponent,
        AppointmentComponent,
        AppointmentAssistantComponent
    ],
    entryComponents: [AppointmentAssistantComponent
    ],
  imports: [
      CommonModule,
      TranslateModule,
      CommonUiModule,
      MultiSelectModule,
      ToolbarModule,
      CalendarModule,
      ButtonModule,
      TooltipModule,
      TableModule,
      SplitButtonModule,
      DragDropModule,
      FormsModule,
      WizardModule,
      TabViewModule,
      DropdownModule,
      InputTextModule,
      InputNumberModule,
      DynamicDialogModule,
      ConfirmDialogModule,
      MessageModule,
      ToastModule
    ],
    providers: [
        AppointmentEditService,
        AppointmentGeneralService
    ]
})
export class DashboardModule { }
