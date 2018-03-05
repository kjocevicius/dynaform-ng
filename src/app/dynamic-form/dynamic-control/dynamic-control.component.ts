import { DFormControl, DFormField, DFormFieldOptions, DFormFieldMultiselect, Option, DFormCurrencyField } from 'dynaform-model';
import { Component, OnInit, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';

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

  get options(): Option[] {
    return this.fieldOptions.classifier;
  }

  get selected(): Option[] {
    return this.fieldMultiselect.value;
  }

  get excluded(): Option[] {
    return this.fieldMultiselect.excluded;
  }

  @Input()
  set control(control: DFormControl) {
    this.controlObject = control;
    this.controlChange.emit(this.controlObject);
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

  get currencyOptions(): CurrencyMaskConfig {
    const control = this.controlObject as DFormCurrencyField;
    return {
      align: 'right',
      allowNegative: true,
      allowZero: true,
      precision: control.precision || 2,
      prefix: control.prefix || '',
      suffix: control.suffix || '',
      decimal: control.decimalSepparator || ',',
      thousands: control.thousandsSepparator || '.'
    };
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
