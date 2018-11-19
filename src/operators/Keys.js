import Compose from './Compose';
import Required from './Required';
import { ValidationError } from '../errors';
import { isValueAccessor } from '../utils';


export default
function Keys (vMap) {
  return function (coll, opts) {
    let errors;
    const valid = {};

    Object.keys(vMap).forEach(k => {
      let validator = Compose(vMap[k]);
      // make keys required by default
      if (!isValueAccessor(validator)) validator = Required(validator);

      const res = validator(coll[k], k, coll, opts);
      if (res instanceof Error) {
        if (!errors) errors = {};
        errors[k] = ValidationError.extractData(res);
      } else if (k in coll || res !== undefined) {
        valid[k] = res;
      }
    });

    return errors ?
      new ValidationError(errors) :
      valid;
  }
}
