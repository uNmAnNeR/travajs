// @flow
import { ValidationError } from '../errors';
import { type MixedValidator, type Validator } from './types';


export default
function Check (fn: (value: any) => boolean, errorMsg: any=Check.ErrorMessage): Validator {
  return function (value: any, ...args: *) {
    return fn(value) ? value : new ValidationError(errorMsg);
  };
}
Check.ErrorMessage = "Incorrect value";
