import Compose from './Compose';
import { ValidationError } from '../errors';

// TODO flow
// TODO Currently works only for Arrays
export default
function Each (validator, eachOpts=Each.DEFAULTS) {
  validator = Compose(validator);

  return function (coll, opts) {
    let errors;
    const valid = [];

    for (let i=0; i<coll.length; i++) {
      const res = validator(coll[i], i, coll, opts);
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
