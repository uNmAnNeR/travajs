// @flow
import { ValidationError } from '../errors';
import { prepareErrorMessage } from '../utils';
import { type MixedValidator, type Validator } from './types';


export default
function Check (fn: (value: any) => boolean, errorMsg: any=Check.ErrorMessage): Validator {
  return function (value: any, ...args: *) {
    return fn(value, ...args) ? value : new ValidationError(prepareErrorMessage(errorMsg, value, ...args));
  };
}
Check.ErrorMessage = "Incorrect value";
