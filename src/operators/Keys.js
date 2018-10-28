import Compose from './Compose';
import { ValidationError } from '../errors';


export default
function Keys (vMap) {
  return function (coll, opts) {
    let errors;
    const valid = {};

    Object.keys(vMap).forEach(k => {
      const validator = Compose(vMap[k]);
      const res = validator(coll[k], k, coll, opts);
      if (res instanceof Error) {
        if (!errors) errors = {};
        errors[k] = ValidationError.extractErrorData(res);
      } else if (k in coll) {
        valid[k] = res;
      }
    });

    return errors ?
      new ValidationError(errors) :
      valid;
  }
}
