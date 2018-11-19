import Compose from './Compose';
import { asValueAccessor } from '../utils';
import { ValidationError } from '../errors';


export default
function Required (vs, msg=Required.ErrorMessage) {
  vs = Compose(vs);
  return asValueAccessor(function (d, ...args) {
    if (d === undefined) return new ValidationError(msg);
    return vs(d, ...args);
  });
}
Required.ErrorMessage = "Value is required";
