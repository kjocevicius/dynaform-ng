import { DValidator } from './validator.model';

export const FIELD_TYPE = {
  FIELD: 'Field',
  FIELD_DATE: 'Date',
  FIELD_TEXTBOX: 'Textbox',
  FIELD_DROPDOWN: 'Dropdown',
  FIELD_LABEL: 'Label',
  FIELD_MULTISELECT: 'Multiselect',
  FIELD_TEXTBOX_CURRENCY: 'TextboxCurrency',
  FIELD_CHECKBOX: 'Checkbox',
};

export const CONTAINER_TYPE = {
  CONTAINER: 'Container',
  CONTAINER_REPEAT: 'RepeatingContainer',
};

export const CONTAINER_TYPES = Object.keys(CONTAINER_TYPE).map(k => CONTAINER_TYPE[k]);
export const FIELD_TYPES = Object.keys(FIELD_TYPE).map(k => FIELD_TYPE[k]);

export const CONTROL_VAL_TYPE = {
  DATE: [FIELD_TYPE.FIELD_DATE],
  OPTION: [FIELD_TYPE.FIELD_DROPDOWN],
  OPTIONS: [FIELD_TYPE.FIELD_MULTISELECT]
};

export class DForm {
  version: string;
  formName: string;
  formSymbolicName: string;
  controls: DFormControl[];
}

export class DFormControl {
  name: string;
  label: string;
  type: string;
  validators: DValidator[];
}

export class DFormContainer extends DFormControl {
  optional: boolean;
  horizontal: boolean;
  repeat: boolean;
  controls: DFormControl[];
}

export class DFormField extends DFormControl {
  value: any;
}

export class DFormFieldOptions extends DFormField {
  classifier: Option[];
}

export class DFormFieldMultiselect extends DFormField {
  excluded: Option[];
}

export class Option {
  value: any;
  displayValue: string;
}
