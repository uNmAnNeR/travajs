import Compose from './Compose';
import { ValidationError } from '../errors';


export default
function Required (vs, msg=Required.ErrorMessage) {
  vs = Compose(vs);
  return function (d, ...args) {
    if (d === undefined) return new ValidationError(msg);
    return vs(d, ...args);
  }
}
Required.ErrorMessage = "Attribute is required";
