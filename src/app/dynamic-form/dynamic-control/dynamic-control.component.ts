import { Component, OnInit, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { DFormControl, DFormField, DFormFieldOptions, DFormFieldMultiselect } from 'dform-model';
import { SelectItem } from 'primeng/primeng';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

export const DYNAMIC_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicControlComponent),
  multi: true
};

// TODO : change to load components dynamically
@Component({
  selector: 'df-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.css'],
  providers: [DYNAMIC_CONTROL_VALUE_ACCESSOR]
})
export class DynamicControlComponent implements OnInit, ControlValueAccessor {
  controlObject: DFormControl;
  options: SelectItem[];
  excluded: SelectItem[];

  @Output() controlChange = new EventEmitter();

  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() { }

  ngOnInit() {
  }

  getOptions(): SelectItem[] {
    return this.fieldOptions.classifier.map(val => {
      return {
        value: val.value,
        label: val.displayValue
      };
    });
  }

  getSelected(): SelectItem[] {
    return this.fieldMultiselect.value.map(val => {
      return {
        value: val.value,
        label: val.displayValue
      };
    });
  }

  getExcluded(): SelectItem[] {
    return this.fieldMultiselect.excluded.map(val => {
      return {
        value: val.value,
        label: val.displayValue
      };
    });
  }

  @Input()
  set control(control: DFormControl) {
    console.log('Got control: ', control);
    this.controlObject = control;
    this.controlChange.emit(this.controlObject);

    if (this.controlObject !== control) {
      return;
    } else if (Object.keys(this.controlObject).indexOf('classifier') > -1) {
      this.options = this.getOptions();
    } else if (Object.keys(this.controlObject).indexOf('excluded') > -1) {
      this.excluded = this.getExcluded();
    }
  }

  get control(): DFormControl {
    return this.controlObject;
  }

  get field(): DFormField {
    return this.controlObject as DFormField;
  }

  set field(val: DFormField) {
    this.controlObject = val;
  }

  get fieldOptions(): DFormFieldOptions {
    return (this.controlObject as DFormFieldOptions);
  }

  set fieldOptions(val: DFormFieldOptions) {
    this.controlObject = val;
  }

  get fieldMultiselect(): DFormFieldMultiselect {
    return (this.controlObject as DFormFieldMultiselect);
  }

  set fieldMultiselect(val: DFormFieldMultiselect) {
    this.controlObject = val;
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
