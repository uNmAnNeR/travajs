// @flow
import Compose from './Compose';
import Required from './Required';
import { ValidationError } from '../errors';
import { isValueAccessor, isObject } from '../utils';
import { type MixedValidator, type Validator } from './types';


export default
function Keys (vMap: { [string]: MixedValidator }): Validator {
  return function (coll: { [string]: any }, ...args: *) {
    let errors;
    const valid = {};

    Object.keys(vMap).forEach(k => {
      let validator = Compose(vMap[k]);
      // make keys required by default
      if (!isValueAccessor(validator)) validator = Required(validator);

      const res = validator(coll[k], k, coll, ...args);
      if (res instanceof Error) {
        if (!errors) errors = {};
        errors[k] = ValidationError.extractData(res);
      } else if (isObject(coll) && k in coll || res !== undefined) {
        valid[k] = res;
      }
    });

    return errors ?
      new ValidationError(errors) :
      valid;
  }
}
