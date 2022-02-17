import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FinishResult } from '../interfaces/finishResult.interface';

@Injectable({
  providedIn: 'root'
})
export class WizardBaseService {

    onTitleChange = new Subject<string>();
    onPreviousButtonVisibilityChange = new Subject<boolean>();
    onNextButtonVisibilityChange = new Subject<boolean>();
    onSaveButtonVisibilityChange = new Subject<boolean>();
    onCancel = new Subject<void>();
    onPrevious = new Subject<void>();
    onNext = new Subject<void>();
    onSave = new Subject<void>();
    onClose = new Subject<FinishResult>();
    onWizardStepChange = new Subject<any>();

    constructor()
    {

    }

    setTitle(title: string) {
        this.onTitleChange.next(title);
    }

    setPreviousButtonVisibility(visible: boolean) {
        this.onPreviousButtonVisibilityChange.next(visible);
    }

    setNextButtonVisibility(visible: boolean) {
        this.onNextButtonVisibilityChange.next(visible);
    }

    setSaveButtonVisibility(visible: boolean) {
        this.onSaveButtonVisibilityChange.next(visible);
    }

    cancel() {
        this.onCancel.next();
    }

    previous() {
        this.onPrevious.next();
    }

    next() {
        this.onNext.next();
    }

    save() {
        this.onSave.next();
    }

    close(finishResult: FinishResult) {
        this.onClose.next(finishResult);
    }

    changeWizardStep(component: any) {
        this.onWizardStepChange.next(component);
    }

    resetSubscriptions() {

        this.onTitleChange.complete();
        this.onPreviousButtonVisibilityChange.complete();
        this.onNextButtonVisibilityChange.complete();
        this.onSaveButtonVisibilityChange.complete();
        this.onCancel.complete();
        this.onPrevious.complete();
        this.onNext.complete();
        this.onSave.complete();
        this.onClose.complete();
        this.onWizardStepChange.complete();

        this.onTitleChange = new Subject<string>();
        this.onPreviousButtonVisibilityChange = new Subject<boolean>();
        this.onNextButtonVisibilityChange = new Subject<boolean>();
        this.onSaveButtonVisibilityChange = new Subject<boolean>();
        this.onCancel = new Subject<void>();
        this.onPrevious = new Subject<void>();
        this.onNext = new Subject<void>();
        this.onSave = new Subject<void>();
        this.onClose = new Subject<FinishResult>();
        this.onWizardStepChange = new Subject<any>();
    }
}
