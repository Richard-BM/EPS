import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { FinishResult } from '../../interfaces/finishResult.interface';
import { WizardBaseService } from '../../services/wizardBaseService.service';

@Component({
    selector: 'wizard-modaldialogwizard',
    templateUrl: './modalDialogWizard.component.html',
    styleUrls: ['./modalDialogWizard.component.css'],
    providers: [ConfirmationService]
})
export class ModalDialogWizardComponent implements OnInit {

    public display: boolean;
    public headerTitle: string;
    public displayPreviousButton: boolean;
    public displayNextButton: boolean;
    public displaySaveButton: boolean;
    public currentWizardStepComponent: any;

    constructor(private wizardBaseService: WizardBaseService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
    }

    show(initialComponent: any) {

        this.wizardBaseService.resetSubscriptions();
        this.initSubscriptions();

        this.currentWizardStepComponent = initialComponent;
        this.display = true;
    }

    private initSubscriptions() {

        this.wizardBaseService.onTitleChange.subscribe(title => {
            this.headerTitle = title;
        });

        this.wizardBaseService.onPreviousButtonVisibilityChange.subscribe(visible => {
            this.displayPreviousButton = visible;
        });

        this.wizardBaseService.onNextButtonVisibilityChange.subscribe(visible => {
            this.displayNextButton = visible;
        });

        this.wizardBaseService.onSaveButtonVisibilityChange.subscribe(visible => {
            this.displaySaveButton = visible;
        });

        this.wizardBaseService.onClose.subscribe(success => {
            this.close();
        });

        this.wizardBaseService.onWizardStepChange.subscribe(component => {
            this.currentWizardStepComponent = component;
        });
    }

    private close() {
        this.currentWizardStepComponent = null;
        this.display = false;
    }

    public onCancel() {

        this.confirmationService.confirm({
            accept: () => {
                this.wizardBaseService.cancel();
                this.close();
            }
        });
    }

    public onPrevious() {
        this.wizardBaseService.previous();
    }

    public onNext() {
        this.wizardBaseService.next();
    }

    public onSave() {
        this.wizardBaseService.save();
    }
}
