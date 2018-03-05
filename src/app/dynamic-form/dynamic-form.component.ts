import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DForm, DValidator, DValidatorRegex, DValidatorNumber, VALIDATOR_TYPE } from 'dynaform-model';
import { DynamicControlService } from './service/dynamic-control.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'df-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  ngFormGroup: FormGroup;
  formObject: DForm;

  @Output() formGroupChange = new EventEmitter();

  constructor(
    private dynamicControlService: DynamicControlService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  isValid(): boolean {
    return this.formGroup ? this.formGroup.valid : true;
  }

  @Input()
  set form(form: any) {
    this.formObject = form as DForm;
    this.formGroup = form ? this.dynamicControlService.buildForm(form) : null;

    // This method causes 'isValid()' value change so we need to force it's detection
    this.changeDetector.detectChanges();
  }

  @Input()
  set formGroup(val: FormGroup) {
    this.ngFormGroup = val;
    this.formGroupChange.emit(val);
  }

  get formGroup(): FormGroup {
    return this.ngFormGroup;
  }

}
