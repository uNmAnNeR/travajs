// @flow
import Compose from './Compose';
import { asValueAccessor } from '../utils';
import { ValidationError } from '../errors';
import { type MixedValidator, type Validator } from './types';


export default
function Required (vs: MixedValidator, errorMsg: any=Required.ErrorMessage): Validator {
  const v = Compose(vs);

  return asValueAccessor(function (value, ...args) {
    if (value === undefined) return new ValidationError(errorMsg);
    return v(value, ...args);
  });
}
Required.ErrorMessage = "Value is required";
