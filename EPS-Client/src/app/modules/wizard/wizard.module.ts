import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogWizardComponent } from './components/modalDialogWizard/modalDialogWizard.component';
import { DialogModule } from 'primeng/dialog';
import { WizardBaseService } from './services/wizardBaseService.service';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [ModalDialogWizardComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DialogModule,
        ButtonModule,
        ConfirmDialogModule
    ],
    exports: [ModalDialogWizardComponent],
    providers: [WizardBaseService]
})
export class WizardModule { }
