// @flow
import { ValidationError } from '../errors';
import { type MixedValidator, type Validator } from './types';


export default
function Check (fn: (value: any) => boolean, msg: any=Check.ErrorMessage): Validator {
  return function (value: any, ...args: *) {
    return fn(value) ? value : new ValidationError(msg);
  };
}
Check.ErrorMessage = "Incorrect value";
