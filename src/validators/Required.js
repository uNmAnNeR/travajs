import { composeValidators } from '../utils';


export default
function Required (vs, msg=Required.ErrorMessage) {
  vs = composeValidators(vs);
  return function (d, ...args) {
    if (d === undefined) return [msg];
    return vs(d, ...args);
  }
}
Required.ErrorMessage = "Attribute is required";
