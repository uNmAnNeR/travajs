// @flow
import Compose from './Compose';
import Required from './Required';
import { ValidationError } from '../errors';
import { isValueAccessor } from '../utils';
import { type MixedValidator, type Validator } from './types';


type EachOptions = {
  errorsTo: Class<Object> | Class<Array<any>>;
  requiredMessage?: any;
}
// TODO Currently works only for Arrays
export default
function Each (mv: MixedValidator, eachOpts: EachOptions=Each.DEFAULTS): Validator {
  let v: Validator = Compose(mv);
  // make keys required by default
  if (!isValueAccessor(v)) v = Required(v, eachOpts.requiredMessage);

  return function (coll, opts) {
    let errors;
    const valid = [];

    for (let i=0; i<coll.length; i++) {
      const res = v(coll[i], i, coll, opts);
      if (res instanceof Error) {
        const errorData = ValidationError.extractData(res);
        if (eachOpts.errorsTo === Array) {
          if (!errors) errors = [];
          errors.push(errorData);
        } else {
          if (!errors) errors = {};
          errors[i] = errorData;
        }
      } else {
        valid.push(res);
      }
    }

    return errors ?
      new ValidationError(errors) :
      valid;
  }
}
Each.DEFAULTS = {
  errorsTo: Object,
};
