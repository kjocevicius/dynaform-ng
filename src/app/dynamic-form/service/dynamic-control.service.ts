import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import {
  DForm, DFormControl, DFormField,
  VALIDATOR_TYPE, DValidator, DValidatorRegex, DValidatorNumber,
  CONTROL_VAL_TYPE, Option, CONTAINER_TYPE, CONTAINER_TYPES, DFormContainer
} from 'dynaform-model';

@Injectable()
export class DynamicControlService {

  constructor() { }

  buildFormControl(dynamicControl: DFormField): any {
    const fc = new FormControl();
    this.applyValue(dynamicControl, fc);
    return fc;
  }

  applyValue(dynamicControl: DFormField, fc: FormControl) {
    const value = this.getValue(dynamicControl);
    fc.setValue(dynamicControl.value);
  }

  applyValidators(dynamicControl: DFormControl, fc: AbstractControl, includeOptional: boolean) {
    const isContainer = CONTAINER_TYPES.indexOf(dynamicControl.type) > -1;

    // Skip optional containers if includeOptional=false
    if (isContainer && !includeOptional && (dynamicControl as DFormContainer).optional) {
      return;
    }

    if (dynamicControl.validators) {
      const validators = dynamicControl.validators.map(val => this.getValidator(val));
      fc.setValidators(validators);
    }

    if (isContainer) {
      (dynamicControl as DFormContainer).controls.forEach(c => {
        // Don't apply validators to inner optional containers
        this.applyValidators(c, (fc as FormGroup).controls[c.name], false);
      });
    }
  }

  clearValidatorsOfGroup(group: FormGroup) {
    group.setValidators(null);
    Object.keys(group.controls).forEach(v => {
      const abstractControl = group.controls[v];
      this.clearValidators(abstractControl);
    });
  }

  clearValidatorsOfArray(fa: FormArray) {
    fa.setValidators(null);
    fa.controls.forEach(abstractControl => {
      this.clearValidators(abstractControl);
    });
  }

  clearValidatorsOfControl(fc: FormControl) {
    fc.setValidators(null);
  }

  getFormValidationErrors(formGroup: FormGroup): any[] {
    let result = [];
    Object.keys(formGroup.controls).forEach(key => {
      const control: AbstractControl = (formGroup.get(key) as AbstractControl);
      if (control instanceof FormGroup) {
        const subErrors = this.getFormValidationErrors(control as FormGroup);
        result = result.concat(subErrors);
      }

      const controlErrors: ValidationErrors = formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({ controlKey: key, keyError: keyError, errorValue: controlErrors[keyError] });
        });
      }
    });

    return result;
  }

  public buildForm(form: DForm): FormGroup {
    return this.buildFormGroupInner(form.controls);
  }

  public buildFormGroup(form: DFormContainer): FormGroup {
    return this.buildFormGroupInner(form.controls);
  }

  private buildFormGroupInner(controls: DFormControl[], ignoreRepeating: boolean = false): FormGroup {
    const formGroup = {};

    controls.forEach(c => {
      if (CONTAINER_TYPE.CONTAINER_REPEAT === c.type && !ignoreRepeating) {
        formGroup[c.name] = this.buildFormArrayInner((c as DFormContainer).controls);
      } else if (CONTAINER_TYPES.indexOf(c.type) > -1) {
        formGroup[c.name] = this.buildFormGroupInner((c as DFormContainer).controls);
      } else {
        formGroup[c.name] = this.buildFormControl(c as DFormField);
      }
    });
    const group = new FormGroup(formGroup);

    this.applyValidatorsRoot(controls, group);
    return group;
  }

  private buildFormArrayInner(controls: DFormControl[]): FormArray {
    const formArrayItem = this.buildFormGroupInner(controls);
    const formArray = [formArrayItem];
    const result = new FormArray(formArray);
    return result;
  }

  private applyValidatorsRoot(controls: DFormControl[], fc: FormGroup) {
    controls.forEach(c => {
      this.applyValidators(c, fc.controls[c.name], false);
    });
  }

  private clearValidators(abstractControl: AbstractControl) {
    if (abstractControl instanceof FormControl) {
      this.clearValidatorsOfControl(abstractControl);
    } else if (abstractControl instanceof FormGroup) {
      this.clearValidatorsOfGroup(abstractControl);
    } else if (abstractControl instanceof FormArray) {
      this.clearValidatorsOfArray(abstractControl);
    } else {
      throw new Error('Unexpected control type');
    }
  }

  private getValue(control: DFormField): any {
    const val = control.value;

    if (!val) {
      return null;
    } else if (CONTROL_VAL_TYPE.DATE.indexOf(control.type) > -1) {
      return new Date(val);
    } else {
      return val;
    }

  }

  private getValidator(v: DValidator): any {
    switch (v.type) {
      case (VALIDATOR_TYPE.REQUIRED):
        return Validators.required;
      case (VALIDATOR_TYPE.REGEX):
        return Validators.pattern((v as DValidatorRegex).regex);
      case (VALIDATOR_TYPE.MAX_ROWS): // TODO check if it's ok
        return Validators.maxLength((v as DValidatorNumber).number);
      case (VALIDATOR_TYPE.MIN_ROWS): // TODO check if it's ok
        return Validators.minLength((v as DValidatorNumber).number);
      case (VALIDATOR_TYPE.MAX_LENGTH):
        return Validators.maxLength((v as DValidatorNumber).number);
      case (VALIDATOR_TYPE.MIN_LENGTH):
        return Validators.minLength((v as DValidatorNumber).number);
    }
  }

}
