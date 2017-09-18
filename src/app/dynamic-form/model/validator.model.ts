export const VALIDATOR_TYPE = {
  REQUIRED: 'Required',
  REGEX: 'Regex',
  MAX_ROWS: 'MaxRows',
  MIN_ROWS: 'MinRows',
  MIN_LENGTH: 'MinLength',
  MAX_LENGTH: 'MaxLength',
};

export class DValidator {
  type: string;
}

export class DValidatorRegex extends DValidator {
  regex: string;
}

export class DValidatorNumber extends DValidator {
  number: number;
}
