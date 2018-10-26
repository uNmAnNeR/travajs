import Compose from './Compose';


export default
function Required (vs, msg=Required.ErrorMessage) {
  vs = Compose(vs);
  return function (d, ...args) {
    if (d === undefined) return [msg];
    return vs(d, ...args);
  }
}
Required.ErrorMessage = "Attribute is required";
