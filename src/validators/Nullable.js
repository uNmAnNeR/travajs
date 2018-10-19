import { composeValidators } from '../utils';


export default
function Nullable (vs, defaultValue=null) {
  vs = composeValidators(vs);

  return function (d, ...args) {
    if (d == null) return [null, defaultValue];
    return vs(d, ...args);
  };
}
