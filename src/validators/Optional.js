import { composeValidators } from '../utils';


export default
function Optional (vs, defaultValue) {
  vs = composeValidators(vs);

  return function (d, ...args) {
    if (d === undefined) return [null, defaultValue];
    return vs(d, ...args);
  };
}
